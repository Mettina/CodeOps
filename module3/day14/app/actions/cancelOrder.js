"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { getOrder, markCancelled } from "@/lib/orderStore";

export async function cancelOrder(_previousState, formData) {
  const session = await getSession();
  if (!session) {
    return { ok: false, message: "Please sign in to cancel an order." };
  }

  const id = Number(formData.get("id"));
  const order = Number.isInteger(id) ? getOrder(id) : null;
  if (!order) {
    return { ok: false, message: "Order not found." };
  }

  if (order.owner !== session.user) {
    return { ok: false, message: "You can only cancel your own orders." };
  }
  if (order.status === "cancelled") {
    return { ok: false, message: "This order is already cancelled." };
  }

  markCancelled(id);
  revalidatePath("/orders");
  revalidatePath("/my-orders");
  return { ok: true, message: "Order cancelled." };
}
