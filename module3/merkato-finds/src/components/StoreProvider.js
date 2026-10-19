"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("merkato-cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("merkato-wishlist") || "[]"));
    } catch {
      setCart([]);
      setWishlist([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("merkato-cart", JSON.stringify(cart));
      localStorage.setItem("merkato-wishlist", JSON.stringify(wishlist));
    }
  }, [cart, wishlist, ready]);

  const addToCart = (product, quantity = 1) => setCart((items) => {
    const existing = items.find((item) => item.id === product.id);
    return existing
      ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      : [...items, { ...product, quantity }];
  });
  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id));
  const updateQuantity = (id, quantity) => setCart((items) => quantity < 1 ? items.filter((item) => item.id !== id) : items.map((item) => item.id === id ? { ...item, quantity } : item));
  const toggleWishlist = (product) => setWishlist((items) => items.some((item) => item.id === product.id) ? items.filter((item) => item.id !== product.id) : [...items, product]);
  const isWishlisted = (id) => wishlist.some((item) => item.id === id);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(() => ({ cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, isWishlisted, cartCount, cartTotal, ready, setCart }), [cart, wishlist, cartCount, cartTotal, ready]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
