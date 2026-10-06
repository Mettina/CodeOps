"use client";

import { useCart } from "@/context/CartContext";

// Receives plain data only (id, name, price). No callbacks cross the boundary.
export default function AddToCartButton({ id, name, price }) {
  const { addDish } = useCart();
  return (
    <button type="button" className="button" onClick={() => addDish({ id, name, price })}>
      Add to cart
    </button>
  );
}
