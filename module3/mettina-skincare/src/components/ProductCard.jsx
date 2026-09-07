import React from "react";

export default function ProductCard({ product, inCart, isFavorite, onAddToCart, onIncreaseQty, onDecreaseQty, onToggleFavorite }) {
  const p = product;

  return (
    <article className="product-card">
      <div className="product-image">
        {p.badge && <span className={`badge ${p.badge.cls}`}>{p.badge.text}</span>}
        <button
          className="favorite-heart"
          onClick={() => onToggleFavorite(p)}
          aria-pressed={isFavorite}
          aria-label="Toggle favorite"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        {p.image_url ? (
          <img src={p.image_url} alt={p.product_name} loading="lazy" />
        ) : (
          <div className="product-placeholder">{p.categoryLabel}</div>
        )}
      </div>

      <div className="product-info">
        <p className="category">{p.categoryLabel}</p>
        <h3>{p.product_name}</h3>
        <p className="description">
          {p.brands ? `By ${p.brands.split(",")[0].trim()}.` : "Skincare product."}
        </p>

        <div className="product-bottom">
          <div>
            {p.badge?.cls === "sale" && (
              <span className="old-price">{Math.round(p.price * 1.2).toLocaleString()} ETB</span>
            )}
            <strong>{p.price.toLocaleString()} ETB</strong>
          </div>

          {inCart ? (
            <div className="qty-control card-qty-control">
              <button onClick={() => onDecreaseQty(p.code)}>−</button>
              <span>{inCart.qty}</span>
              <button onClick={() => onIncreaseQty(p.code)}>+</button>
            </div>
          ) : (
            <button onClick={() => onAddToCart(p)}>Add to Cart</button>
          )}
        </div>
      </div>
    </article>
  );
}
