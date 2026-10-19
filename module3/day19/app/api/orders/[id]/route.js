import { errorResponse } from "@/lib/errors";
import { getOrder } from "@/lib/orderStore";
import { getSession } from "@/lib/session";

export async function GET(_request, { params }) {
  const session = await getSession();
  if (!session) {
    return errorResponse(401, "UNAUTHORIZED", "Please sign in to view orders.");
  }

  const { id } = await params;
  const order = getOrder(id, session.user);

  if (!order) {
    return errorResponse(404, "NOT_FOUND", `Order ${id} not found.`);
  }

  return Response.json(order);
}
