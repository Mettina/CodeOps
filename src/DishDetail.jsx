import { useParams, Link } from "react-router-dom";
import useFetch from "./hooks/useFetch.js";
import { loadAllDishes } from "./api.js";
import { useTheme } from "./theme/ThemeContext.jsx";
import { useCartStore } from "./cart/cartStore.js";

export default function DishDetail() {
  const { id } = useParams();
  const { theme } = useTheme();
  
  const addItem = useCartStore((state) => state.addItem);

  const {
    data: dishes,
    loading,
    error,
  } = useFetch((signal) => loadAllDishes(signal), []);

  if (loading) {
    return (
      <section className="dish-detail">
        <div className="loading-state">Loading dish...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dish-detail">
        <div className="error-state">{error}</div>
      </section>
    );
  }

  const dish = dishes.find((d) => String(d.id) === id);

  if (!dish) {
    return (
      <section className="dish-detail">
        <h2>Dish not found</h2>
        <p>We couldn't find a dish with id "{id}".</p>
        <Link to="/menu">Back to Menu</Link>
      </section>
    );
  }

  const { name, price, currency = "ETB", spicy, image } = dish;

  function addToCart() {
    addItem(dish);
  }

  return (
    <section className={`dish-detail dish-detail--${theme}`}>
      <Link to="/menu" className="back-link">
         Back to Menu
      </Link>

      {image && (
        <img
          className="dish-detail-image"
          src={image}
          alt={name}
        />
      )}

      <h2>
        {name}
        {spicy && <span className="badge">• Spicy</span>}
      </h2>

      <p className="dish-detail-price">
        {price} {currency}
      </p>

      <button className="add-btn" onClick={addToCart}>
        Add to Cart
      </button>
    </section>
  );
}