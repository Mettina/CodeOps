import { useState, useEffect, useRef } from "react";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import { loadDishes } from "./api.js";

const categories = ["All", "Main", "Vegan", "Grill"];

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  const searchRef = useRef(null);

  // Refetch whenever `category` changes. Abort any in-flight request on
  // cleanup so a slow, stale response can't overwrite newer data.
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    loadDishes(category, controller.signal)
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // cleanup fired, ignore
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [category]);

  // Auto-focus the search field once, on mount.
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  function addToTotal(price) {
    setOrderTotal((total) => total + price);
  }

  const shown = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  useEffect(() => {
    document.title = `Menu (${shown.length} dishes)`;
  }, [shown.length]);

  if (loading) {
    return (
      <section className="menu">
        <CategoryBar categories={categories} selected={category} onSelect={setCategory} />
        <p className="loading-state">Loading menu…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu">
        <CategoryBar categories={categories} selected={category} onSelect={setCategory} />
        <p className="error-state">Couldn't load the menu: {error}</p>
      </section>
    );
  }

  return (
    <section className="menu">
      <CategoryBar categories={categories} selected={category} onSelect={setCategory} />

      <input
        ref={searchRef}
        type="search"
        className="search-input"
        placeholder="Search dishes…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DishList dishes={shown} onAdd={addToTotal} />

      <div className="order-total">
        Order total: <strong>{orderTotal} ETB</strong>
      </div>
    </section>
  );
}
