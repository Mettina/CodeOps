"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { placeOrder } from "@/app/actions/placeOrder";
import { useCart } from "@/context/CartContext";

const initialState = { ok: false, fieldErrors: {}, message: "", order: null };

export default function CheckoutForm({ fallback }) {
  const { items, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(placeOrder, initialState);

  useEffect(() => {
    if (state.ok && items.length > 0) {
      clearCart();
    }
  }, [state, items.length, clearCart]);

  return (
    <>
      {state.ok ? (
        <p className="status checkout-status" role="status">
          Order submitted successfully. Total: {state.order.total} ETB. Your cart is now empty.
        </p>
      ) : items.length === 0 ? (
        <div className="checkout-empty">
          <p className="status">Your cart is empty. Add dishes from the menu before checking out.</p>
          <Link className="button" href="/menu">Browse the menu</Link>
        </div>
      ) : (
        <>
          <h2>Delivery details</h2>
          <form className="order-form checkout-form" action={formAction}>
            <input
              type="hidden"
              name="items"
              value={JSON.stringify(items.map((item) => ({ dishId: item.id, quantity: item.qty })))}
            />
            {renderDeliveryFields(state.fieldErrors)}
            {state.fieldErrors.items && (
              <p className="field-error" role="alert">{state.fieldErrors.items}</p>
            )}
            {state.message && <p className="field-error" role="alert">{state.message}</p>}
            <button type="submit" className="button" disabled={isPending}>
              {isPending ? "Placing order..." : "Place order"}
            </button>
          </form>
        </>
      )}

      <noscript>{fallback}</noscript>
    </>
  );
}

function renderDeliveryFields(fieldErrors) {
  return ["name", "phone", "area"].map((field) => (
    <div className="order-field" key={field}>
      <label htmlFor={`order-${field}`}>
        {field === "area" ? "Delivery area" : field[0].toUpperCase() + field.slice(1)}
      </label>
      <input
        id={`order-${field}`}
        name={field}
        type={field === "phone" ? "tel" : "text"}
        placeholder={
          field === "name"
            ? "Enter your full name"
            : field === "phone"
              ? "e.g. +251 912 345 678"
              : "e.g. Bole, Piazza, or Arat Kilo"
        }
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
  ));
}