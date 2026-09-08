import PropTypes from "prop-types";
import Dish from "./Dish.jsx";
import { useCart } from "./cart/CartProvider.jsx";
import { MAX_QUANTITY } from "./cart/cartReducer.js";

// Exercise 7 note: `onAdd`/`onRemove` here are the useCallback-wrapped
// functions from Menu.jsx. Passing them straight through (instead of
// wrapping each in a fresh `() => onAdd(dish)` arrow on every render,
// which is what this used to do) is what makes React.memo(Dish) below
// actually work -- a new function reference on every render would defeat
// memoisation for every dish, every time, regardless of which one
// changed.
export default function DishList({
  dishes,
  onAdd,
  onRemove,
}) {
  const { items } = useCart();

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