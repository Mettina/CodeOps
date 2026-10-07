"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  async function handleSubmit(event) {
    event.preventDefault();
    setFieldErrors({});
    setSubmitError("");
    setSubmitted(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setFieldErrors(result.error?.fieldErrors ?? {});
        setSubmitError(result.error?.message ?? "Unable to place your order.");
        return;
      }

      setSubmitted(true);
      clearCart();
    } catch {
      setSubmitError("Could not reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Your cart</h1>
      {items.length === 0 ? (
        <>
          <p>{submitted ? "Order submitted successfully. Your cart is now empty." : "Your cart is empty."}</p>
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
          <h2>Delivery details</h2>
          <form className="order-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="order-name">Name</label>
            <input
              id="order-name"
              name="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "order-name-error" : undefined}
              required
            />
            {fieldErrors.name && <p id="order-name-error" className="field-error">{fieldErrors.name}</p>}

            <label htmlFor="order-phone">Phone</label>
            <input
              id="order-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "order-phone-error" : undefined}
              required
            />
            {fieldErrors.phone && <p id="order-phone-error" className="field-error">{fieldErrors.phone}</p>}

            <label htmlFor="order-area">Delivery area</label>
            <input
              id="order-area"
              name="area"
              value={form.area}
              onChange={(event) => setForm({ ...form, area: event.target.value })}
              aria-invalid={Boolean(fieldErrors.area)}
              aria-describedby={fieldErrors.area ? "order-area-error" : undefined}
              required
            />
            {fieldErrors.area && <p id="order-area-error" className="field-error">{fieldErrors.area}</p>}
            {submitError && <p className="field-error" role="alert">{submitError}</p>}
            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Place order"}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
