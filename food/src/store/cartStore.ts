import { Cart } from "@/Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
    cart: Cart[];
    addToCart: (newData: Cart) => void;
    updateCartData: (id: string, updateData: Cart) => void;
    removeFromCart: (id: string) => void;
    initializeCart: (data: Cart[]) => void;
}

const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (newData: Cart) => {
                set((state) => ({
                    cart: [...state.cart, newData], // Only updating the cart array
                }));
            },
            updateCartData: (id: string, updateData: Cart) => {
                set((state) => ({
                    cart: state.cart.map((item) => (item.id === id ? updateData : item)), // Only updating the cart array
                }));
            },
            removeFromCart: (id: string) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== id), // Only updating the cart array
                }));
            },
            initializeCart: (data) => {
                set(() => ({
                    cart: data,
                }));
            },
        }),
        {
            name: "cartStore",
        }
    )
);

export default useCartStore;
