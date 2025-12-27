import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

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
            name: "astroplanet-auth",
            partialize: (state) => ({ user: state.user, token: state.token }),
        }
    )
);
