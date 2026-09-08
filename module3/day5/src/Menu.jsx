import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import useFetch from "./hooks/useFetch.js";
import { loadDishes } from "./api.js";
import { useCart } from "./cart/CartProvider.jsx";

const categories = [
  "All",
  "Main",
  "Vegan",
  "Grill",
];

// Exercise 1 usage note: Menu is the "deeply nested component" that
// reads ThemeContext -- see Dish.jsx, which is nested App > Menu >
// DishList > Dish, three levels down, with no theme prop passed
// through any of them.
export default function Menu() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

  // Week 1 requirement: category filter driving the fetch. `category`
  // is in the deps array, so picking a new category re-runs the fetch
  // (not just a re-filter of already-loaded data) -- all three fetch
  // states (loading/error/data) are rendered below.
  const {
    data: dishes,
    loading,
    error,
  } = useFetch(
    (signal) => loadDishes(category, signal),
    [category]
  );

  const { dispatch } = useCart();

  // `shown` only needs to filter by search now -- category filtering
  // already happened server-side (simulated) inside loadDishes.
  const shown = useMemo(() => {
    if (!dishes) {
      return [];
    }

    return dishes.filter((dish) =>
      dish.name
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );
  }, [dishes, search]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    document.title = `Menu (${shown.length} dishes)`;
  }, [shown.length]);

  // Exercise 7: wrapped in useCallback so the function reference passed
  // down to DishList/Dish stays stable across Menu re-renders (e.g.
  // when `search` changes). `dispatch` from useReducer is itself stable,
  // so an empty dep array is correct here.
  const addToCart = useCallback((dish) => {
    dispatch({
      type: "ADD",
      payload: dish,
    });
  }, [dispatch]);

  const removeFromCart = useCallback((dish) => {
    dispatch({
      type: "REMOVE",
      payload: dish.id,
    });
  }, [dispatch]);

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

      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

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
        onRemove={removeFromCart}
      />

    </section>
  );
}