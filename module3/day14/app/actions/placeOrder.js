"use server";

import { revalidatePath } from "next/cache";
import { createOrder } from "@/lib/orders";
import { saveOrder } from "@/lib/orderStore";

export async function placeOrder(_previousState, input) {
  const result = await createOrder(input);

  if (result.status !== 201) {
    return {
      ok: false,
      fieldErrors: result.error.fieldErrors ?? {},
      message: result.error.message,
      order: null,
    };
  }

  const order = saveOrder(result.order);
  revalidatePath("/orders");
  return { ok: true, fieldErrors: {}, message: "", order };
}
