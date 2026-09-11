import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "./theme/ThemeContext.jsx";

function Dish({
  dish,
  quantity = 0,
  atMax = false,
  onIncrement,
  onDecrement,
}) {
  const { theme } = useTheme();

  const {
    name,
    price,
    currency = "ETB",
    spicy = false,
    image,
  } = dish;
  
  if (name === "Doro") {
    throw new Error("Deliberate test error for Exercise 2");
  }
  return (
    <div className={`dish dish--${theme}`}>

      <Link to={`/menu/${dish.id}`} className="dish-link">

        {image && (
          <img
            className="dish-image"
            src={image}
            alt={name}
            loading="lazy"
          />
        )}

        <h3>
          {name}

          {spicy === true && (
            <span className="badge">
              • Spicy
            </span>
          )}
        </h3>

      </Link>

      <div className="dish-body">

        <div className="dish-row">

          <p>
            {price} {currency}
          </p>

          {quantity === 0 ? (
            <button
              className="add-btn"
              onClick={() => onIncrement(dish)}
            >
              Add
            </button>
          ) : (
            <div className="qty-stepper">
              <button
                className="qty-btn"
                onClick={() => onDecrement(dish)}
                aria-label={`Remove one ${name}`}
              >
                −
              </button>

              <span className="qty-value">
                {quantity}
              </span>

              <button
                className="qty-btn"
                onClick={() => onIncrement(dish)}
                disabled={atMax}
                aria-label={`Add one more ${name}`}
              >
                +
              </button>
            </div>
          )}

        </div>

        {atMax && (
          <p className="qty-max-note">
            Max {quantity} per order
          </p>
        )}

      </div>

    </div>
  );
}

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string,
    spicy: PropTypes.bool,
    image: PropTypes.string,
  }).isRequired,
  quantity: PropTypes.number,
  atMax: PropTypes.bool,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

Dish.displayName = "Dish";

export default memo(Dish);