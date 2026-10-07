import { getDish } from "@/lib/data";
import { errorResponse } from "@/lib/errors";
import { validate } from "@/lib/validate";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }

    return errorResponse(422, "VALIDATION_ERROR", "Request body must be valid JSON.", {
      body: "Request body must be valid JSON.",
    });
  }

  const fieldErrors = validate(body);
  if (Object.keys(fieldErrors).length > 0) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Please correct the highlighted fields.",
      fieldErrors
    );
  }

  const dishes = await Promise.all(body.items.map(({ dishId }) => getDish(dishId)));
  if (dishes.some((dish) => !dish)) {
    return errorResponse(422, "VALIDATION_ERROR", "Please correct the highlighted fields.", {
      items: "One or more dishes are not available.",
    });
  }

  const items = body.items.map(({ quantity }, index) => ({
    dishId: dishes[index].id,
    name: dishes[index].name,
    quantity,
    price: dishes[index].price,
  }));
  const order = {
    name: body.name.trim(),
    phone: body.phone,
    area: body.area.trim(),
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };

  return Response.json({ order }, { status: 201 });
}
