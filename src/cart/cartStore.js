import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_QUANTITY } from "./cartReducer.js";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (dish) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === dish.id);

        if (existingItem) {
          if (existingItem.quantity >= MAX_QUANTITY) {
            return;
          }

          set({
            items: items.map((item) =>
              item.id === dish.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          return;
        }

        set({ items: [...items, { ...dish, quantity: 1 }] });
      },

      removeItem: (id) => {
        const items = get()
          .items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0);

        set({ items });
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: "addis-eats-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export function selectTotal(state) {
  return state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

export function selectItemCount(state) {
  return state.items.reduce((count, item) => count + item.quantity, 0);
}