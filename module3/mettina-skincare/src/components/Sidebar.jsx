import React from "react";
import { CATEGORIES, PRICE_RANGES } from "../data.js";

export default function Sidebar({
  selectedCategories,
  onToggleCategory,
  selectedPriceRanges,
  onTogglePriceRange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  onClearFilters,
}) {
  return (
    <aside className="sidebar">
      <div className="filter-header">
        <h2>Filters</h2>
        <button onClick={onClearFilters}>Clear</button>
      </div>

      <div className="filter-section">
        <h3>Categories</h3>
        {CATEGORIES.map((c) => (
          <label key={c.slug}>
            <input
              type="checkbox"
              checked={selectedCategories.has(c.slug)}
              onChange={() => onToggleCategory(c.slug)}
            />
            {c.sidebarLabel}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Price</h3>
        {PRICE_RANGES.map((r) => (
          <label key={r.key}>
            <input
              type="checkbox"
              checked={selectedPriceRanges.has(r.key)}
              onChange={() => onTogglePriceRange(r.key)}
            />
            {r.label}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Favorites</h3>
        <label>
          <input type="checkbox" checked={showFavoritesOnly} onChange={onToggleFavoritesOnly} />
          Show Favorites Only ({favoritesCount})
        </label>
      </div>
    </aside>
  );
}
