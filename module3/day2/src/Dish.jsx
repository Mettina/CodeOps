import PropTypes from "prop-types";

export default function Dish({ name, price, currency = "ETB", spicy = false }) {
  return (
    <div className="dish">
  <h3>{name}</h3>
  {spicy === true && <p className="spicy">Spicy</p>}
  <p className="price">
    {price} {currency}
  </p>
</div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
};
