import { memo } from "react";
import PropTypes from "prop-types";
import { useTheme } from "./theme/ThemeContext.jsx";

// Exercise 7: wrapped in React.memo so a re-render of DishList (e.g.
// because the cart changed) only re-renders the one Dish whose own
// props (quantity/atMax) actually changed -- not all of them. This only
// works because DishList now passes stable props (see the comment
// there); memo alone wouldn't have helped against a fresh function prop
// every render.
//
// Exercise 1: this is the "deeply nested component" (App > Menu >
// DishList > Dish) that reads ThemeContext directly via useTheme(),
// with no theme prop passed through Menu or DishList.
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

  return (
    <div className={`dish dish--${theme}`}>

      {image && (
        <img
          className="dish-image"
          src={image}
          alt={name}
          loading="lazy"
        />
      )}

      <div className="dish-body">

        <h3>
          {name}

          {spicy === true && (
            <span className="badge">
              • Spicy
            </span>
          )}
        </h3>

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