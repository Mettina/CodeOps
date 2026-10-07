// No directive here: this file is only ever imported by client components
// (Providers, AddToCartButton, CartBadge), so it joins the client bundle
// through them. Never import it from a server component.
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function reducer(items, action) {
  switch (action.type) {
    case "add": {
      const existing = items.find((i) => i.id === action.dish.id);
      if (existing) {
        return items.map((i) => (i.id === action.dish.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...items, { ...action.dish, qty: 1 }];
    }
    case "clear":
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const addDish = (dish) => dispatch({ type: "add", dish });
  const clearCart = () => dispatch({ type: "clear" });
  return (
    <CartContext.Provider value={{ items, count, addDish, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}
