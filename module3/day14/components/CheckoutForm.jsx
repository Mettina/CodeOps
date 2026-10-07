"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { submitOrder } from "@/app/actions/orders";
import { useCart } from "@/context/CartContext";

const initialState = { status: 0, fieldErrors: {}, message: "", order: null };

export default function CheckoutForm() {
  const { items, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [state, formAction, isPending] = useActionState(submitOrder, initialState);

  useEffect(() => {
    if (state.status === 201) {
      clearCart();
    }
  }, [state.status, clearCart]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  if (state.status === 201) {
    return (
      <p className="status" role="status">
        Order submitted successfully. Total: {state.order.total} ETB. Your cart is now empty.
      </p>
    );
  }
  if (items.length === 0) {
    return (
      <div>
        <p className="status">Your cart is empty. Add dishes from the menu before checking out.</p>
        <Link className="button" href="/menu">Browse the menu</Link>
      </div>
    );
  }

  return (
    <>
      <h2>Delivery details</h2>
      <form className="order-form" action={formAction}>
        <input
          type="hidden"
          name="items"
          value={JSON.stringify(items.map((item) => ({ dishId: item.id, quantity: item.qty })))}
        />
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
              aria-invalid={Boolean(state.fieldErrors[field])}
              aria-describedby={state.fieldErrors[field] ? `order-${field}-error` : undefined}
              required
            />
            {state.fieldErrors[field] && (
              <p id={`order-${field}-error`} className="field-error" role="alert">
                {state.fieldErrors[field]}
              </p>
            )}
          </div>
        ))}
        {state.fieldErrors.items && <p className="field-error" role="alert">{state.fieldErrors.items}</p>}
        {state.message && <p className="field-error" role="alert">{state.message}</p>}
        <button type="submit" className="button" disabled={isPending}>
          {isPending ? "Placing order..." : "Place order"}
        </button>
      </form>
    </>
  );
}