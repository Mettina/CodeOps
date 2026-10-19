"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { placeOrder } from "@/app/actions/placeOrder";
import { CITIES, DELIVERY_FEE } from "@/lib/orders";
import { etb } from "@/lib/format";
import { useStore } from "./StoreProvider";
import SubmitButton from "./SubmitButton";

const initialState = { ok: false, fieldErrors: {}, message: "" };

function FieldError({ id, text }) {
  return text ? <small id={id} className="field-error" role="alert">{text}</small> : null;
}

export default function CheckoutForm({ user }) {
  const { cart, cartTotal, ready } = useStore();
  const [state, formAction] = useFormState(placeOrder, initialState);
  const [form, setForm] = useState({ name: user?.name ?? "", phone: "", city: "Addis Ababa", area: "", address: "", notes: "" });
  // One key per form, made after mount (not during render) so server HTML and browser agree.
  const [idempotencyKey, setIdempotencyKey] = useState("");
  useEffect(() => setIdempotencyKey(crypto.randomUUID()), []);

  const delivery = cart.length ? DELIVERY_FEE : 0;
  const errors = state.fieldErrors ?? {};
  function update(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  // The bag is read from localStorage after mount, so wait for it before showing "empty".
  if (!ready) return <section className="page-shell" aria-busy="true"><p>Loading your bag...</p></section>;
  if (!cart.length) return <section className="page-shell empty-state checkout-empty"><h2>Your bag is empty</h2><p>Add a few finds before checking out.</p><Link href="/shop" className="button button-dark">Browse products <ArrowRight size={17} /></Link></section>;

  return (
    <section className="page-shell checkout-page">
      <Link href="/cart" className="back-link"><ArrowLeft size={16} /> Back to bag</Link>
      <div className="page-intro checkout-intro"><span className="eyebrow">ALMOST YOURS</span><h1>Checkout<span className="title-period">.</span></h1><p>Tell us where your finds should go.</p></div>
      <div className="checkout-layout">
        <form className="checkout-form" action={formAction} noValidate={false}>
          {/* The browser says WHICH products and HOW MANY; the server decides the prices. */}
          <input type="hidden" name="items" value={JSON.stringify(cart.map((i) => ({ id: i.id, quantity: i.quantity })))} />
          <input type="hidden" name="idempotencyKey" value={idempotencyKey} />
          {state.message && <p className="field-error form-error" role="alert">{state.message}</p>}
          <FieldError id="items-error" text={errors.items} />
          <div className="form-section"><span className="form-step">01</span><div><h2>Delivery details</h2><p>How can we get in touch with you?</p></div></div>
          <div className="form-grid">
            <label>Full name<input name="name" value={form.name} onChange={update} placeholder="Your full name" autoComplete="name" aria-describedby="name-error" required /><FieldError id="name-error" text={errors.name} /></label>
            <label>Phone number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={update} placeholder="+251 9..." pattern="(?:\+251|0)[79][0-9]{8}" title="Use an Ethiopian mobile number, e.g. 0912345678" aria-describedby="phone-error" required /><FieldError id="phone-error" text={errors.phone} /></label>
            <label>City<select name="city" value={form.city} onChange={update} aria-describedby="city-error">{CITIES.map((c) => <option key={c}>{c}</option>)}</select><FieldError id="city-error" text={errors.city} /></label>
            <label>Area / neighborhood<input name="area" value={form.area} onChange={update} placeholder="e.g. Bole, Kazanchis" aria-describedby="area-error" required /><FieldError id="area-error" text={errors.area} /></label>
            <label className="full-field">Delivery address<input name="address" value={form.address} onChange={update} placeholder="Street, building, nearby landmark" aria-describedby="address-error" required /><FieldError id="address-error" text={errors.address} /></label>
            <label className="full-field">Delivery notes <span className="optional-label">(optional)</span><textarea name="notes" value={form.notes} onChange={update} placeholder="Anything the delivery person should know?" rows="3" /><FieldError id="notes-error" text={errors.notes} /></label>
          </div>
          <div className="form-section payment-section"><span className="form-step">02</span><div><h2>Payment method</h2><p>Choose how you would like to pay.</p></div></div>
          <label className="payment-option"><input type="radio" name="payment" defaultChecked /><span><strong>Cash on delivery</strong><small>Pay when your order arrives</small></span><span className="payment-pill">DEMO</span></label>
          <p className="demo-note">This is a demonstration checkout. No payment will be collected.</p>
          <SubmitButton className="button button-dark place-order-button" pendingText="Placing order...">Place demo order <ArrowRight size={17} /></SubmitButton>
        </form>
        <aside className="order-summary checkout-summary">
          <span className="eyebrow">YOUR SELECTION</span><h2>Order summary</h2>
          {cart.map((item) => (
            <div className="checkout-product" key={item.id}>
              <img src={item.image} alt={item.name} loading="lazy" decoding="async" width="64" height="64" />
              <div><strong>{item.name}</strong><small>Qty {item.quantity}</small></div>
              <span>{etb(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Subtotal</span><span>{etb(cartTotal)}</span></div>
          <div className="summary-row"><span>Delivery</span><span>{etb(delivery)}</span></div>
          <div className="summary-row summary-total"><strong>Total</strong><strong>{etb(cartTotal + delivery)}</strong></div>
          <div className="secure-note"><ShieldCheck size={17} /> The server re-checks every price when you place the order.</div>
        </aside>
      </div>
    </section>
  );
}
