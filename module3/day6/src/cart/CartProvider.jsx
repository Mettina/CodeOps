import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { cartReducer } from "./cartReducer.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce(
      (count, item) =>
        count + item.quantity,
      0
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      dispatch,
      total,
      itemCount,
    }),
    [items, total, itemCount]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}