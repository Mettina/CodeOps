"use client";

import { useCart } from "@/context/CartContext";

// Receives plain data only (id, name, price). No callbacks cross the boundary.
export default function AddToCartButton({ id, name, price }) {
  const { items, addDish, decreaseDish } = useCart();
  const quantity = items.find((item) => item.id === id)?.qty ?? 0;

  if (quantity > 0) {
    return (
      <div className="quantity-control" aria-label={`${name} quantity controls`}>
        <button
          type="button"
          className="quantity-button"
          aria-label={`Decrease ${name} quantity`}
          onClick={() => decreaseDish(id)}
        >
          −
        </button>
        <span className="cart-item-quantity" aria-live="polite">{quantity}</span>
        <button
          type="button"
          className="quantity-button"
          aria-label={`Increase ${name} quantity`}
          onClick={() => addDish({ id, name, price })}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button type="button" className="button" onClick={() => addDish({ id, name, price })}>
      Add to cart
    </button>
  );
}
