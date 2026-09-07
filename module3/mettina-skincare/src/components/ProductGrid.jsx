import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({
  status,
  filteredProducts,
  sortBy,
  onSortChange,
  showFavoritesOnly,
  cart,
  favorites,
  onAddToCart,
  onIncreaseQty,
  onDecreaseQty,
  onToggleFavorite,
}) {
  return (
    <>
      <div className="toolbar">
        <div>
          <h2 id="products">Skin Care Products</h2>
          <p>
            {status === "ready"
              ? `Showing ${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`
              : "Showing our popular products"}
          </p>
        </div>

        <div className="sort">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      <section className="cards">
        {status === "loading" && (
          <div className="state-box">
            <h3>Loading products…</h3>
            <p>Fetching live skincare data.</p>
          </div>
        )}

        {status === "error" && (
          <div className="state-box">
            <h3>Couldn't load products</h3>
            <p>Check your connection and reload the page.</p>
          </div>
        )}

        {status === "ready" && filteredProducts.length === 0 && (
          <div className="state-box">
            <h3>No products match your filters</h3>
            <p>
              {showFavoritesOnly
                ? "You haven't favorited anything yet."
                : "Try clearing a filter or searching a different term."}
            </p>
          </div>
        )}

        {status === "ready" &&
          filteredProducts.map((p) => (
            <ProductCard
              key={p.code}
              product={p}
              inCart={cart[p.code]}
              isFavorite={!!favorites[p.code]}
              onAddToCart={onAddToCart}
              onIncreaseQty={onIncreaseQty}
              onDecreaseQty={onDecreaseQty}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
      </section>
    </>
  );
}
