import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";
import { setUnauthorizedHandler } from "@/lib/api/client";
import { validateToken, isJwtExpired } from "@/lib/api/auth";

const STORAGE_KEY = "astroplanet-auth";

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;

    // Computed
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,

            setUser: (user: User | null) => {
                set({ user });
            },

            setToken: (token: string | null) => {
                set({ token });
            },

            login: (user: User, token: string) => {
                set({ user, token, isLoading: false });
            },

            logout: () => {
                set({ user: null, token: null });
            },

            setLoading: (isLoading: boolean) => {
                set({ isLoading });
            },

            isAuthenticated: () => {
                return !!get().token && !!get().user;
            },
        }),
        {
            name: STORAGE_KEY,
            partialize: (state) => ({ user: state.user, token: state.token }),
            onRehydrateStorage: () => (state, error) => {
                if (error || typeof window === "undefined") return;

                // Wire the global 401 handler so any expired-JWT response
                // anywhere in the app force-logs the user out.
                setUnauthorizedHandler(() => {
                    useAuthStore.getState().logout();
                });

                // Cross-tab sync: when localStorage changes in another tab,
                // re-read our slice so this tab reflects login/logout there.
                // Guard with a flag on the window object so we only attach once
                // even if rehydrate fires multiple times (e.g. via storage event
                // triggering another rehydrate).
                const w = window as Window & { __astroplanetAuthSyncWired?: boolean };
                if (!w.__astroplanetAuthSyncWired) {
                    w.__astroplanetAuthSyncWired = true;
                    window.addEventListener("storage", (e) => {
                        if (e.key === STORAGE_KEY) {
                            void useAuthStore.persist.rehydrate();
                        }
                    });
                }

                // Passive token validation. Two rules, both learned from a bug
                // where a hard refresh logged users out:
                //  1. A token whose own `exp` has passed is dead - log out at once,
                //     no request needed.
                //  2. Otherwise ask the server, but log out ONLY on a definitive
                //     rejection ("invalid"). "unknown" (throttled host, CORS-blocked
                //     preflight, offline) keeps the session; the global 401 handler
                //     above still ends it the moment a real request is refused.
                // The server check is deferred so it lands after the page-load
                // burst of ~37 asset requests, which is what was tripping the host's
                // per-IP limit and returning a 429 to this very call.
                if (state?.token) {
                    const token = state.token;
                    if (isJwtExpired(token, Date.now())) {
                        useAuthStore.getState().logout();
                        return;
                    }
                    window.setTimeout(() => {
                        // The user may have logged out or re-logged in meanwhile;
                        // only act if this exact token is still the live one.
                        if (useAuthStore.getState().token !== token) return;
                        void validateToken(token).then((verdict) => {
                            if (verdict === "invalid" && useAuthStore.getState().token === token) {
                                useAuthStore.getState().logout();
                            }
                        });
                    }, 4000);
                }
            },
        }
    )
);
