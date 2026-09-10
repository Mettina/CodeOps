// Exercise 3: a pure cartReducer with add, remove, and clear. Pure
// means: given the same (state, action) it always returns the same new
// state, with no side effects (no fetch, no DOM, no randomness) -- which
// is exactly what makes it callable directly with plain objects, no
// React involved at all. See cartReducer.checks.js for that direct
// call-through of every case.
export const MAX_QUANTITY = 20;

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const dish = action.payload;

      const existingItem = state.find(
        (item) => item.id === dish.id
      );

      if (existingItem) {
        if (existingItem.quantity >= MAX_QUANTITY) {
          return state;
        }

        return state.map((item) =>
          item.id === dish.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...state,
        {
          ...dish,
          quantity: 1,
        },
      ];
    }

    case "REMOVE": {
      const id = action.payload;

      return state
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0);
    }

    case "CLEAR":
      return [];

    default:
      return state;
  }
}