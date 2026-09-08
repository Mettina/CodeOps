import PropTypes from "prop-types";
import Dish from "./Dish.jsx";
import { useCartStore } from "./cart/cartStore.js";
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
  // Exercise 5: narrow selector -- still needs the whole items array
  // (it looks up each dish's own line by id), but selecting only
  // `state.items` means DishList won't re-render for store changes
  // that don't touch items (there aren't any yet, but this is the
  // pattern: select exactly the slice you use, nothing more).
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