import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import useFetch from "./hooks/useFetch.js";
import { useCart } from "./cart/CartProvider.jsx";

const categories = [
  "All",
  "Main",
  "Vegan",
  "Grill",
];

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

  const {
    data: dishes,
    loading,
    error,
  } = useFetch("/dishes.json");

  const { dispatch, itemCount } = useCart();

  const shown = useMemo(() => {
    if (!dishes) {
      return [];
    }

    return dishes.filter((dish) => {
      const matchesCategory =
        category === "All" ||
        dish.category === category;

      const matchesSearch = dish.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [dishes, category, search]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    document.title = `Menu (${shown.length} dishes)`;
  }, [shown.length]);

  function addToCart(dish) {
    dispatch({
      type: "ADD",
      payload: dish,
    });
  }

  function openCart() {
    window.dispatchEvent(
      new CustomEvent("open-cart")
    );
  }

  if (loading) {
    return (
      <section className="menu">
        <div className="loading-state">
          Loading menu...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu">
        <div className="error-state">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="menu">

      <div className="menu-controls">

        <CategoryBar
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />

        <button
          className="menu-cart-button"
          onClick={openCart}
        >
          Your Cart ({itemCount})
        </button>

      </div>

      <input
        ref={searchRef}
        type="search"
        className="search-input"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <DishList
        dishes={shown}
        onAdd={addToCart}
      />

    </section>
  );
}