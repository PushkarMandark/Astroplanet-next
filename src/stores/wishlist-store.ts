import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

export interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
    regularPrice?: number;
    onSale?: boolean;
}

interface WishlistState {
    items: WishlistItem[];

    // Actions
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    toggleItem: (product: Product) => void;
    clearWishlist: () => void;

    // Computed
    isInWishlist: (productId: number) => boolean;
    getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id);

                if (!existingItem) {
                    const newItem: WishlistItem = {
                        id: product.id,
                        name: product.name,
                        price: parseFloat(product.price) || 0,
                        image: product.images?.[0]?.src || "/images/placeholder.svg",
                        slug: product.slug,
                        regularPrice: product.regular_price ? parseFloat(product.regular_price) : undefined,
                        onSale: product.on_sale,
                    };
                    set({ items: [...items, newItem] });
                }
            },

            removeItem: (productId: number) => {
                set({ items: get().items.filter((item) => item.id !== productId) });
            },

            toggleItem: (product: Product) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    get().removeItem(product.id);
                } else {
                    get().addItem(product);
                }
            },

            clearWishlist: () => {
                set({ items: [] });
            },

            isInWishlist: (productId: number) => {
                return get().items.some((item) => item.id === productId);
            },

            getItemCount: () => {
                return get().items.length;
            },
        }),
        {
            name: "astroplanet-wishlist",
        }
    )
);
