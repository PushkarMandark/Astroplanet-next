import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";
import { setUnauthorizedHandler } from "@/lib/api/client";
import { validateToken } from "@/lib/api/auth";

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

                // Passive token validation: if we rehydrated a token but the
                // server rejects it, log out so the UI doesn't pretend to be
                // authenticated. Fire-and-forget — the result of this check
                // does not block initial render.
                if (state?.token) {
                    void validateToken(state.token).then((ok) => {
                        if (!ok) {
                            useAuthStore.getState().logout();
                        }
                    });
                }
            },
        }
    )
);
