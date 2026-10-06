"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section>
      <h1>Your cart</h1>
      {items.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link className="button" href="/menu">Browse the menu</Link>
        </>
      ) : (
        <>
          <ul className="dish-list">
            {items.map((item) => (
              <li className="dish-card" key={item.id}>
                <span>{item.name} × {item.qty}</span>
                <span className="price">{item.price * item.qty} ETB</span>
              </li>
            ))}
          </ul>
          <p className="price">Total: {total} ETB</p>
          <Link className="button" href="/menu">Continue shopping</Link>
        </>
      )}
    </section>
  );
}
