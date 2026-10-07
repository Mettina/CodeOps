"use server";

import { revalidatePath } from "next/cache";
import { createOrder } from "@/lib/orders";
import { saveOrder } from "@/lib/orderStore";
import { getSession } from "@/lib/session";

export async function placeOrder(_previousState, input) {
  const session = await getSession();
  if (!session) {
    return {
      ok: false,
      fieldErrors: {},
      message: "Please sign in before placing an order.",
      order: null,
    };
  }

  const result = await createOrder(input);

  if (result.status !== 201) {
    return {
      ok: false,
      fieldErrors: result.error.fieldErrors ?? {},
      message: result.error.message,
      order: null,
    };
  }

  const order = saveOrder({ ...result.order, owner: session.user });
  revalidatePath("/orders");
  revalidatePath("/my-orders");
  return { ok: true, fieldErrors: {}, message: "", order };
}
