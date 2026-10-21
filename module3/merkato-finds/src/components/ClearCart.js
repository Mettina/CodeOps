"use client";

import { useEffect } from "react";
import { useStore } from "./StoreProvider";

// The order now exists on the server, so the browser's bag is emptied once it is shown.
// It must wait for `ready`: on a full page load the provider restores the saved bag from
// localStorage AFTER this component first runs, which would bring the old items back.
export default function ClearCart() {
  const { setCart, ready } = useStore();
  useEffect(() => {
    if (ready) setCart([]);
  }, [ready, setCart]);
  return null;
}
