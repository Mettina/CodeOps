import { Link } from "react-router-dom";
import useFetch from "./hooks/useFetch.js";
import { loadAllDishes } from "./api.js";
import Dish from "./Dish.jsx";
import { useCartStore } from "./cart/cartStore.js";

export default function Home() {
  const { data: dishes, loading, error } = useFetch(
    (signal) => loadAllDishes(signal),
    []
  );

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const featured = dishes ? dishes.slice(0, 4) : [];

  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: "url(/images/hero-plate.jpg)" }}
      >
       
        <div className="hero-overlay">
          <p className="hero-eyebrow">Traditional &amp; fresh</p>
          <h1 className="hero-title">Authentic Ethiopian Flavors</h1>
          <p className="hero-subtitle">
            Classic recipes. Fresh ingredients. Made with love.
          </p>
        </div>
      </section>

      <section className="featured-section">
        <div className="featured-header">
          <h2>Popular Dishes</h2>
          <Link to="/menu" className="view-all-link">
            View full menu 
          </Link>
        </div>

        {loading && <div className="loading-state">Loading dishes...</div>}
        {error && <div className="error-state">{error}</div>}

        {!loading && !error && (
          <div className="dish-list">
            {featured.map((dish) => {
              const inCart = items.find((item) => item.id === dish.id);
              const quantity = inCart?.quantity ?? 0;

              return (
                <Dish
                  key={dish.id}
                  dish={dish}
                  quantity={quantity}
                  atMax={quantity >= 5}
                  onIncrement={addItem}
                  onDecrement={(d) => removeItem(d.id)}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}