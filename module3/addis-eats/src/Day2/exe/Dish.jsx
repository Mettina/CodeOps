import React from 'react';
import PropTypes from 'prop-types';

function Dish({ name, price, spicy, currency }) {
  return (
    <div className="exercise-dish">
      <h3>{name}</h3>
      <p>Price: {price} {currency}</p>
      
      {/* Exercise 2: Strict boolean comparison guard prevents printing '0' to the UI */}
      {spicy === true && <span className="badge">Spicy Item</span>}
    </div>
  );
}

// Exercise 1: Configures type checks matching the requirement parameters
Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string
};

// Exercise 1: Configures default fallback values
Dish.defaultProps = {
  currency: "ETB",
  spicy: false
};

export default Dish;
