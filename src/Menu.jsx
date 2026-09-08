import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import useFetch from "./hooks/useFetch.js";
import { loadDishes } from "./api.js";
import { useCartStore } from "./cart/cartStore.js";

const categories = [
  "All",
  "Main",
  "Vegan",
  "Grill",
];


export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

  function handleCategoryChange(newCategory) {
    if (newCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: newCategory });
    }
  }

  const {
    data: dishes,
    loading,
    error,
  } = useFetch(
    (signal) => loadDishes(category, signal),
    [category]
  );

  // Exercise 5: narrow selectors -- Menu never reads items/total, only
  // the two actions it calls, so cart changes never re-render Menu.
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  
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

  
  const addToCart = useCallback((dish) => {
    addItem(dish);
  }, [addItem]);

  const removeFromCart = useCallback((dish) => {
    removeItem(dish.id);
  }, [removeItem]);

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
        onSelect={handleCategoryChange}
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