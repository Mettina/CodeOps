export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const dish = action.payload;

      const existingItem = state.find(
        (item) => item.id === dish.id
      );

      if (existingItem) {
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