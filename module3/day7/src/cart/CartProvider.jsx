import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { cartReducer } from "./cartReducer.js";

const CartContext = createContext(null);

// Exercise 5: CartProvider holds the reducer (via useReducer) and
// provides items, dispatch, and the derived total/itemCount to
// everything below it through context.
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

  // Exercise 6: memoise the provider value with useMemo.
  //
  // What this prevents: every render of CartProvider (e.g. from a
  // parent re-rendering for an unrelated reason) creates a brand-new
  // `value` object literal by default. Context consumers re-render
  // whenever the value they read from context changes *by reference*,
  // even if none of the individual fields (items/dispatch/total/
  // itemCount) actually changed. That would force Header, Menu, and
  // OrderForm to all re-render on every CartProvider render, not just
  // when the cart itself changes. Memoising `value` on
  // [items, total, itemCount] means consumers only re-render when one
  // of those actually changes (dispatch is already stable from
  // useReducer, so it isn't a dependency).
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

// Week 1 requirement: the hook the header cart badge and the checkout
// panel both call to read the cart -- no prop drilling between them.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}