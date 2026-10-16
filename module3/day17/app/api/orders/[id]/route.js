import { errorResponse } from "@/lib/errors";
import { getOrder } from "@/lib/orderStore";

export async function GET(_request, { params }) {
  const { id } = await params;
  const order = getOrder(id);

  if (!order) {
    return errorResponse(404, "NOT_FOUND", `Order ${id} not found.`);
  }

  return Response.json(order);
}
