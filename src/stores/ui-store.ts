import { create } from "zustand";

interface UIState {
    // Mobile menu
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;

    // Modals
    activeModal: string | null;
    modalData: Record<string, unknown>;
    openModal: (name: string, data?: Record<string, unknown>) => void;
    closeModal: () => void;

    // Search
    isSearchOpen: boolean;
    searchQuery: string;
    toggleSearch: () => void;
    setSearchQuery: (query: string) => void;

    // Loading states
    isPageLoading: boolean;
    setPageLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>()((set, get) => ({
    // Mobile menu
    isMobileMenuOpen: false,
    toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),

    // Modals
    activeModal: null,
    modalData: {},
    openModal: (name: string, data = {}) =>
        set({ activeModal: name, modalData: data }),
    closeModal: () => set({ activeModal: null, modalData: {} }),

    // Search
    isSearchOpen: false,
    searchQuery: "",
    toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),
    setSearchQuery: (searchQuery: string) => set({ searchQuery }),

    // Loading
    isPageLoading: false,
    setPageLoading: (isPageLoading: boolean) => set({ isPageLoading }),
}));
