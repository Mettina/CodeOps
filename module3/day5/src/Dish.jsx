import PropTypes from "prop-types";

export default function Dish({
  name,
  price,
  currency = "ETB",
  spicy = false,
  onAdd,
}) {
  return (
    <div className="dish">

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

        <button
          className="add-btn"
          onClick={onAdd}
        >
          Add
        </button>

      </div>

    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
};