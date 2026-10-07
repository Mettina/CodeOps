"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutForm() {
  const { items, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setFieldErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ dishId: i.id, quantity: i.qty })),
        }),
      });
      const body = await res.json().catch(() => null);

      if (res.status === 201) {
        clearCart();
        setStatus("success");
        return;
      }
      if (res.status === 422) {
        setFieldErrors(body?.error?.fieldErrors ?? {});
        setMessage(body?.error?.message ?? "Please correct the highlighted fields.");
        setStatus("idle");
        return;
      }
      setMessage(body?.error?.message ?? `Something went wrong (status ${res.status}).`);
      setStatus("error");
    } catch {
      setMessage("Could not reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="status" role="status">Order submitted successfully. Your cart is now empty.</p>;
  }
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <h2>Delivery details</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        {["name", "phone", "area"].map((field) => (
          <div className="order-field" key={field}>
            <label htmlFor={`order-${field}`}>
              {field === "area" ? "Delivery area" : field[0].toUpperCase() + field.slice(1)}
            </label>
            <input
              id={`order-${field}`}
              name={field}
              type={field === "phone" ? "tel" : "text"}
              value={form[field]}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors[field])}
              aria-describedby={fieldErrors[field] ? `order-${field}-error` : undefined}
              required
            />
            {fieldErrors[field] && (
              <p id={`order-${field}-error`} className="field-error" role="alert">
                {fieldErrors[field]}
              </p>
            )}
          </div>
        ))}
        {fieldErrors.items && <p className="field-error" role="alert">{fieldErrors.items}</p>}
        {message && <p className="field-error" role="alert">{message}</p>}
        <button type="submit" className="button" disabled={status === "submitting"}>
          {status === "submitting" ? "Placing order..." : "Place order"}
        </button>
      </form>
    </>
  );
}