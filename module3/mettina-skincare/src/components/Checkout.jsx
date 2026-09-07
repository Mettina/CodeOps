import React from "react";
import { PAYMENT_METHODS } from "../data.js";

export default function Checkout({
  cartItems,
  cartTotal,
  paymentMethod,
  onPaymentMethodChange,
  onPlaceOrder,
  confirmedOrder,
  onBackToShop,
}) {
  if (confirmedOrder) {
    return (
      <div className="checkout-page">
        <div className="checkout-card order-confirmation">
          <h3>Order placed </h3>
          <p>Order number: <strong>{confirmedOrder.number}</strong></p>
          <p>Paying via: <strong>{confirmedOrder.method}</strong></p>
          <p>Total: <strong>{confirmedOrder.total.toLocaleString()} ETB</strong></p>
          
          <button className="place-order-btn" onClick={onBackToShop}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-grid">
        <div className="checkout-card">
          <h4>Order Summary</h4>
          {cartItems.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map(({ product, qty, price }) => (
                <div className="cart-item" key={product.code}>
                  <span className="name">
                    {product.product_name} × {qty}
                  </span>
                  <span>{(price * qty).toLocaleString()} ETB</span>
                </div>
              ))}
              <div className="cart-total">
                <span>Total</span>
                <span>{cartTotal.toLocaleString()} ETB</span>
              </div>
            </>
          )}
        </div>

        <div className="checkout-card">
          <h4>Payment Method</h4>
          {PAYMENT_METHODS.map((m) => (
            <label className="payment-option" key={m.key}>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === m.key}
                onChange={() => onPaymentMethodChange(m.key)}
              />
              {m.label}
            </label>
          ))}

          <button className="place-order-btn" disabled={cartItems.length === 0} onClick={onPlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
