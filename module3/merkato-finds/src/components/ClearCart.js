"use client";

import { useEffect } from "react";
import { useStore } from "./StoreProvider";

// The order now exists on the server, so the browser's bag is emptied once it is shown.
export default function ClearCart() {
  const { setCart } = useStore();
  useEffect(() => {
    setCart([]);
  }, [setCart]);
  return null;
}
