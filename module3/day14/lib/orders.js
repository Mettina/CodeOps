import { getDish } from "@/lib/data";
import { validate } from "@/lib/validate";

export async function createOrder(payload) {
  const fieldErrors = validate(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 422,
      error: {
        code: "VALIDATION_ERROR",
        message: "Please correct the highlighted fields.",
        fieldErrors,
      },
    };
  }

  const dishes = await Promise.all(payload.items.map(({ dishId }) => getDish(dishId)));
  if (dishes.some((dish) => !dish)) {
    return {
      status: 422,
      error: {
        code: "VALIDATION_ERROR",
        message: "Please correct the highlighted fields.",
        fieldErrors: { items: "One or more dishes are not available." },
      },
    };
  }

  const items = payload.items.map(({ quantity }, index) => ({
    dishId: dishes[index].id,
    name: dishes[index].name,
    quantity,
    price: dishes[index].price,
  }));

  return {
    status: 201,
    order: {
      name: payload.name.trim(),
      phone: payload.phone,
      area: payload.area.trim(),
      items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    },
  };
}
