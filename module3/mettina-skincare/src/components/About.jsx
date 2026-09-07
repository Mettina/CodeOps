import React from "react";

export default function About({ onNavigate }) {
  return (
    <div className="checkout-page">
      <h2 className="checkout-title">About Mettina Skin Care</h2>

      <div className="checkout-card">
        <h4>Our Story</h4>
        <p className="about-text">
          Mettina Skin Care is a small, everyday skincare shop built around one idea: good
          routines don't need to be complicated. We bring together simple, effective
          cleansers, moisturizers, serums, sunscreens, and toners so you can build a routine
          that actually fits your life.
        </p>
      </div>

      <div className="checkout-card">
        <h4>What We Believe</h4>
        <p className="about-text">
          Healthy skin starts with consistency, not a 12-step routine. We focus on
          well-reviewed, widely available products across every skin type and budget, so
          finding the right fit doesn't take hours of research.
        </p>
      </div>

      <button className="place-order-btn" onClick={() => onNavigate("shop")}>
        Browse Products
      </button>
    </div>
  );
}
