import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore, selectTotal } from "./cart/cartStore.js";
import { useAuth } from "./auth/AuthContext.jsx";

const TELEBIRR_PATTERN = /^(?:\+251|0)9\d{8}$/;
// exe3
function validate(form) {          
  const errors = {};

  if (form.name.trim() === "") {
    errors.name = "Name is required.";
  }

  if (!TELEBIRR_PATTERN.test(form.phone)) {
  errors.phone = "Please use 0912345678 or +251912345678 ";
  }
  if (form.area.trim() === "") {
  errors.area = "Please choose a delivery area.";
  }
  return errors;
}
export default function Checkout() {

  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore(selectTotal);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
   // exe1 
  const [form, setForm] = useState({ name: "", phone: "", area: "" ,notes:""});
  const [submitted, setSubmitted] = useState(false);
  //exe4
  const [touched, setTouched] = useState({}); 
  const [submitting, setSubmitting] = useState(false);// exe6


  function handleSubmit(e) { 
    e.preventDefault();
   if (!canSubmit) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      clear();
    }, 1000);
  }
  // exe6
  function handleChange(e) {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
  setSubmitted(false);
}
  //exe4
  function handleBlur(e) { 
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  }

    //exe3
  const errors = validate(form); 

  const canSubmit =
    Object.keys(errors).length === 0 &&
    items.length > 0;

  

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
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Your name"
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={touched.name && errors.name ? "name-error" : undefined}
            />
            {
              touched.name && errors.name &&
              (
                 <p  id ="name-error" role ="alert" className="hint hint-bad">{errors.name}</p>
            
             )}

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="0912345678"
              aria-invalid={touched.phone && !!errors.phone}
              aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}

            />
            {touched.phone && errors.phone && (
            <p id="phone-error" role="alert" className="hint hint-bad">{errors.phone}</p>
            )}
             
            <label htmlFor="area">Delivery area</label>
           
            <select
               id="area"
               name="area"
               value={form.area}
               onChange={handleChange}
               onBlur={handleBlur}
               aria-invalid={touched.area && !!errors.area}
               aria-describedby={touched.area && errors.area ? "area-error" : undefined}

            >
               <option value="">-- choose an area --</option>
               <option value="Bole">Bole</option>
               <option value="Kazanchis">Kazanchis</option>
               <option value="Megenagna">Megenagna</option>
               <option value="Piassa">Piassa</option>
          
            </select>
             {touched.area && errors.area && (
             <p  id="area-error" role="alert" className="hint hint-bad">{errors.area}</p>
             )}
            <label htmlFor="notes">Notes</label>
            <input
              id="notes"
              name="notes"
              type="text"
              value={form.notes}
              onChange={handleChange}
              placeholder="want u say something!"
            />
            <button type="submit" disabled={!canSubmit || submitting}>
             {submitting ? "Placing order…" : `Place Order — ${total} ETB`}
            </button>
          </form>
        </>
      ) : (
        <p className="confirmation">Order submitted successfully!</p>
      )}
    </section>
  );
}