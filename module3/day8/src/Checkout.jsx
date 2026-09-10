import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore, selectTotal } from "./cart/cartStore.js";
import { useAuth } from "./auth/AuthContext.jsx";

const TELEBIRR_PATTERN = /^(?:\+251|0)9\d{8}$/;

export default function Checkout() {

  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore(selectTotal);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
   // exe1 
  const [form, setForm] = useState({ name: "", phone: "", area: "" ,notes:""});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setSubmitted(false);
  }

  const phoneIsValid = TELEBIRR_PATTERN.test(form.phone);

  const canSubmit =
    form.name.trim() !== "" &&
    form.area.trim() !== "" &&
    phoneIsValid &&
    items.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    clear();
  }

  function handleSignOut() {
    signOut();
    navigate("/");
  }

  if (items.length === 0 && !submitted) {
    return (
      <section className="checkout">
        <h2>Checkout</h2>
        <p>Your cart is empty. Add some dishes before checking out.</p>
      </section>
    );
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>
      <p>Welcome, {user.name}! <button className="clear-btn" onClick={handleSignOut}>Sign Out</button></p>

      {!submitted ? (
        <>
          <div className="cart-total">
            <span>Total</span>
            <strong>{total} ETB</strong>
          </div>

          <form
            id="delivery-details"
            className="order-form checkout-form"
            onSubmit={handleSubmit}
          >
            <h2>Delivery details</h2>

            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="0912345678"
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

            <select
               id="area"
               name="area"
               value={form.area}
               onChange={handleChange}
            >
               <option value="">-- choose an area --</option>
               <option value="Bole">Bole</option>
               <option value="Kazanchis">Kazanchis</option>
               <option value="Megenagna">Megenagna</option>
               <option value="Piassa">Piassa</option>
            </select>
            <label htmlFor="note">Notes</label>
            <input
              id="note"
              name="notes"
              type="text"
              value={form.notes}
              onChange={handleChange}
              placeholder="want u say something!"
            />
            <button type="submit" disabled={!canSubmit}>
              Place Order
            </button>
          </form>
        </>
      ) : (
        <p className="confirmation">Order submitted successfully!</p>
      )}
    </section>
  );
}