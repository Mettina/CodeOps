"use client";

import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useStore } from "./StoreProvider";

// The only interactive part of the product page. The page itself is a server component
// (static, indexable, with its own metadata); quantity and the bag need the browser.
export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const saved = isWishlisted(product.id);
  return (
    <>
      <div className="quantity-row">
        <span>Quantity</span>
        <div className="quantity-control">
          <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
          <span aria-live="polite">{quantity}</span>
          <button type="button" onClick={() => setQuantity(Math.min(20, quantity + 1))} aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div className="detail-actions">
        <button type="button" className="button button-dark" onClick={() => { addToCart(product, quantity); setAdded(true); }}>
          {added ? "Added to your bag ✓" : "Add to bag"} <ShoppingBag size={17} />
        </button>
        <button type="button" aria-pressed={saved} className={`button button-outline ${saved ? "saved-outline" : ""}`} onClick={() => toggleWishlist(product)}>
          <Heart size={17} fill={saved ? "currentColor" : "none"} />{saved ? "Saved" : "Save"}
        </button>
      </div>
    </>
  );
}
