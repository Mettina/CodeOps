import PropTypes from "prop-types";
import Dish from "./Dish.jsx";

export default function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p className="empty-state">No dishes in this category yet.</p>;
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};
