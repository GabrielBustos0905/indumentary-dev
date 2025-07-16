// src/store/useCartStore.ts
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    productId: string;
    name: string;
    slug: string;
    size: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (productId: string, size: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const { items } = get();
                if (!item.size) {
                    return toast.error("Selecciona un talle antes de agregar.");
                }

                const exists = items.find(
                    (i) => i.productId === item.productId && i.size === item.size
                );

                if (exists) {
                    return toast.error("Ya agregaste este producto con ese talle.");
                }

                const newItems = [...items, item];
                set({ items: newItems });
                return toast.success("Producto añadido al carrito.");
            },

            removeItem: (productId, size) => {
                set({
                    items: get().items.filter(
                        (i) => !(i.productId === productId && i.size === size)
                    ),
                });
                toast.success("Producto eliminado del carrito.");
            },

            clearCart: () => {
                set({ items: [] });
                toast("Carrito vaciado.");
            },
        }),
        {
            name: "cart-storage", // key del localStorage
        }
    )
);
