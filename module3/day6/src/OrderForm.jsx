import { useState } from "react";
import { useCart } from "./cart/CartProvider.jsx";

const TELEBIRR_PATTERN =
  /^(?:\+251|0)9\d{8}$/;

export default function OrderForm() {
  const {
    items,
    dispatch,
    total,
  } = useCart();

  const [checkoutOpen, setCheckoutOpen] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const [submitted, setSubmitted] =
    useState(false);

  function handleChange(e) {
    const {
      name,
      value,
    } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setSubmitted(false);
  }

  function removeItem(id) {
    dispatch({
      type: "REMOVE",
      payload: id,
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR",
    });

    setCheckoutOpen(false);
  }

  function handleCheckout() {
    setCheckoutOpen(true);
  }

  const phoneIsValid =
    TELEBIRR_PATTERN.test(form.phone);

  const canSubmit =
    form.name.trim() !== "" &&
    form.area.trim() !== "" &&
    phoneIsValid &&
    items.length > 0;

  function handleSubmit(e) {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    setSubmitted(true);
  }

  return (
    <section
      id="cart-section"
      className="cart-section"
    >

      <div className="cart-header">

        <h2>Your Cart</h2>

      </div>

      {items.length === 0 ? (

        <div className="empty-cart">

          <p>
            Your cart is empty.
          </p>

        </div>

      ) : (

        <>

          <div className="cart-items">

            {items.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    {item.quantity} ×{" "}
                    {item.price} ETB
                  </p>
                </div>

                <strong>
                  {item.price *
                    item.quantity}{" "}
                  ETB
                </strong>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  −
                </button>

              </div>

            ))}

          </div>

          <div className="cart-total">

            <span>Total</span>

            <strong>
              {total} ETB
            </strong>

          </div>

          {!checkoutOpen ? (

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>

          ) : (

            <form
              id="delivery-details"
              className="order-form checkout-form"
              onSubmit={handleSubmit}
            >

              <h2>
                Delivery details
              </h2>

              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />

              <label htmlFor="phone">
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="0912345678"
              />

              <label htmlFor="area">
                Delivery area
              </label>

              <input
                id="area"
                name="area"
                type="text"
                value={form.area}
                onChange={handleChange}
                placeholder="Bole, Addis Ababa"
              />

              <p
                className={
                  form.phone === ""
                    ? "hint"
                    : phoneIsValid
                    ? "hint hint-ok"
                    : "hint hint-bad"
                }
              >
                {form.phone === ""
                  ? "."
                  : phoneIsValid
                  ? "Phone number is valid."
                  : "Use 0912345678 or +251912345678."}
              </p>

              <button
                type="submit"
                disabled={!canSubmit}
              >
                Place Order
              </button>

              {submitted && (
                <p className="confirmation">
                  Order submitted successfully!
                </p>
              )}

            </form>

          )}

          <button
            className="clear-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </>

      )}

    </section>
  );
}