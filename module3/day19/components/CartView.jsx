// [EXERCISE 2 support] Moved here from app/cart/page.js. A "use client" PAGE cannot export
// metadata, so the interactive part is now a client leaf and the page is a server component.
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartView() {
  const { items, addDish, decreaseDish, removeDish } = useCart();
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
              <li className="dish-card cart-item" key={item.id}>
                <span className="cart-item-name">{item.name}</span>
                <div className="cart-item-controls" aria-label={`${item.name} quantity controls`}>
                  <button
                    type="button"
                    className="quantity-button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => decreaseDish(item.id)}
                  >
                    −
                  </button>
                  <span className="cart-item-quantity" aria-live="polite">{item.qty}</span>
                  <button
                    type="button"
                    className="quantity-button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => addDish(item)}
                  >
                    +
                  </button>
                </div>
                <span className="price cart-item-price">{item.price * item.qty} ETB</span>
                <button
                  type="button"
                  className="cart-item-remove"
                  onClick={() => removeDish(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="price">Total: {total} ETB</p>
          <Link className="button" href="/menu">Continue shopping</Link>
          {" "}
          <Link className="button" href="/signin?next=%2Fcheckout">Proceed to checkout</Link>
        </>
      )}
    </section>
  );
}
