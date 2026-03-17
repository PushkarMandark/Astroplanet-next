import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CheckoutAddress {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
}

export interface PendingOrder {
    order_id: number;
    order_key: string;
    total: string;
    created_at: string;
}

interface CheckoutState {
    savedAddress: CheckoutAddress | null;
    pendingOrder: PendingOrder | null;

    // Actions
    setSavedAddress: (address: CheckoutAddress) => void;
    clearSavedAddress: () => void;
    setPendingOrder: (order: PendingOrder) => void;
    clearPendingOrder: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
    persist(
        (set) => ({
            savedAddress: null,
            pendingOrder: null,

            setSavedAddress: (address) => set({ savedAddress: address }),
            clearSavedAddress: () => set({ savedAddress: null }),
            
            setPendingOrder: (order) => set({ pendingOrder: order }),
            clearPendingOrder: () => set({ pendingOrder: null }),
        }),
        {
            name: "astroplanet-checkout",
        }
    )
);
