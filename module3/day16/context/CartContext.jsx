// No directive here: this file is only ever imported by client components
// (Providers, AddToCartButton, CartBadge), so it joins the client bundle
// through them. Never import it from a server component.
import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "addis-eats-cart";

function isCartItem(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    Number.isInteger(item.id) &&
    typeof item.name === "string" &&
    Number.isFinite(item.price) &&
    item.price >= 0 &&
    Number.isInteger(item.qty) &&
    item.qty > 0
  );
}

function reducer(items, action) {
  switch (action.type) {
    case "restore":
      return action.items;
    case "add": {
      const existing = items.find((i) => i.id === action.dish.id);
      if (existing) {
        return items.map((i) => (i.id === action.dish.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...items, { ...action.dish, qty: 1 }];
    }
    case "decrease":
      return items.flatMap((item) => {
        if (item.id !== action.id) return [item];
        return item.qty > 1 ? [{ ...item, qty: item.qty - 1 }] : [];
      });
    case "remove":
      return items.filter((item) => item.id !== action.id);
    case "clear":
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (!Array.isArray(parsedCart)) {
          throw new Error("Saved cart must be an array.");
        }

        const validItems = parsedCart.filter(isCartItem);
        if (validItems.length !== parsedCart.length) {
          console.error("Some invalid items in the saved cart were ignored.");
        }
        dispatch({ type: "restore", items: validItems });
      }
    } catch (error) {
      console.error("Could not restore the saved cart.", error);
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Could not save the cart.", error);
    }
  }, [items, storageReady]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const addDish = (dish) => dispatch({ type: "add", dish });
  const decreaseDish = (id) => dispatch({ type: "decrease", id });
  const removeDish = (id) => dispatch({ type: "remove", id });
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);
  return (
    <CartContext.Provider value={{ items, count, addDish, decreaseDish, removeDish, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}
