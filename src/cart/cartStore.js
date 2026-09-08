import { create } from "zustand";
import { MAX_QUANTITY } from "./cartReducer.js";

// Exercise 4: same behavior as cartReducer.js (see that file), but as a
// zustand store instead of a reducer + Context. No provider needed --
// any component can `import { useCartStore } from "./cartStore.js"` and
// call the hook directly. Not wired into the app yet -- that's
// exercise 5, one component at a time.
//
// `set` replaces the store's state (merged shallowly with what you
// return, same idea as setState). `get` reads the current state from
// inside an action -- used here in addItem to find the existing item
// without needing it as a closure argument.
export const useCartStore = create((set, get) => ({
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
}));

// Plain functions (not hooks) so components can derive total/itemCount
// the same way CartProvider's useMemo values used to work -- pass one
// of these to useCartStore(selectTotal) to subscribe to just the
// derived value, not the whole items array.
export function selectTotal(state) {
  return state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

export function selectItemCount(state) {
  return state.items.reduce((count, item) => count + item.quantity, 0);
}
