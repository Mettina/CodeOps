import { Link } from "react-router-dom";
import { useCartStore, selectTotal } from "./cart/cartStore.js";

export default function OrderForm() {
  // Exercise 5: three narrow selectors instead of one useCart() that
  // pulled the whole context value. OrderForm now only re-renders when
  // items or the derived total change -- itemCount changes elsewhere
  // don't touch this component at all (it doesn't read itemCount).
  const items = useCartStore((state) => state.items);
  const removeItemAction = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore(selectTotal);

  function removeItem(id) {
    removeItemAction(id);
  }

  function clearCart() {
    clear();
  }

  return (
    <section id="cart-section" className="cart-section">

      <div className="cart-header">
        <h2>Your Cart</h2>
      </div>

      {items.length === 0 ? (

        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/menu" className="checkout-btn">
            Back to Menu
          </Link>
        </div>

      ) : (

        <>
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity} × {item.price} ETB
                  </p>
                </div>

                <strong>
                  {item.price * item.quantity} ETB
                </strong>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  −
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total</span>
            <strong>{total} ETB</strong>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>

          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </>

      )}

    </section>
  );
}