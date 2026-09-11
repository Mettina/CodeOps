import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore, selectTotal } from "./cart/cartStore.js";
import { useAuth } from "./auth/AuthContext.jsx";
import { validate } from "./Validate.js";
import Field from "./Field.jsx";
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
  const [submitError, setSubmitError] = useState(null);// exe7
  const phoneInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

  if (!canSubmit) return;
  setSubmitting(true);
  setSubmitError(null);
  setTimeout(() => {                          
    setSubmitting(false);
    const didFail = Math.random() < 0.5;      
    if (didFail) {
      setSubmitError("Network error — please try again.");
      phoneInputRef.current?.focus();
    } else {
      setSubmitError(null);
      setSubmitted(true);
      clear();
    }
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

              <Field
               label="Name"
               name="name"
               value={form.name}
               onChange={handleChange}
               onBlur={handleBlur}
               placeholder="Your name"
               error={errors.name}
               touched={touched.name}
             />

             <Field
               label="Phone"
               name="phone"
                type="tel"
                inputRef={phoneInputRef}
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0912345678"
                error={errors.phone}
                touched={touched.phone}
             />
             
         <Field label="Delivery area" name="area" error={errors.area} touched={touched.area}>
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
            </Field>

            <Field
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="want u say something!"
            />
            
            {submitError && (
             <p role="alert" className="hint hint-bad">
              {submitError}
             </p>
            )}
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