import { revalidatePath } from "next/cache";
import { errorResponse } from "@/lib/errors";
import { createOrder } from "@/lib/orders";
import { saveOrder } from "@/lib/orderStore";

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

  const result = await createOrder(body);
  if (result.status === 422) {
    return errorResponse(422, result.error.code, result.error.message, result.error.fieldErrors);
  }

  const order = saveOrder(result.order);
  revalidatePath("/orders");
  return Response.json({ order }, { status: result.status });
}
