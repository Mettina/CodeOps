import { getDish } from "@/lib/data";
import { errorResponse } from "@/lib/errors";

export async function GET(_request, { params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return errorResponse(404, "NOT_FOUND", `Dish ${id} not found.`);
  }

  return Response.json(dish);
}