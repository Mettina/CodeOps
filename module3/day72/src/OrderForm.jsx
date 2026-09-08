import { Link } from "react-router-dom";
import { useCart } from "./cart/CartProvider.jsx";

export default function OrderForm() {
  const { items, dispatch, total } = useCart();

  function removeItem(id) {
    dispatch({ type: "REMOVE", payload: id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
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