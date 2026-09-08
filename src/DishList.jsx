import PropTypes from "prop-types";
import Dish from "./Dish.jsx";
import { useCartStore } from "./cart/cartStore.js";
import { MAX_QUANTITY } from "./cart/cartReducer.js";


export default function DishList({
  dishes,
  onAdd,
  onRemove,
}) {
  
  const items = useCartStore((state) => state.items);

  if (dishes.length === 0) {
    return (
      <p className="empty-state">
        No dishes in this category yet.
      </p>
    );
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => {
        const inCart = items.find(
          (item) => item.id === dish.id
        );
        const quantity = inCart?.quantity ?? 0;
        const atMax = quantity >= MAX_QUANTITY;

        return (
          <Dish
            key={dish.id}
            dish={dish}
            quantity={quantity}
            atMax={atMax}
            onIncrement={onAdd}
            onDecrement={onRemove}
          />
        );
      })}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};