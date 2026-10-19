"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { getOrder, markCancelled } from "@/lib/orderStore";
import { trackingFor } from "@/lib/tracking";

export async function cancelOrder(_previousState, formData) {
  // Check 1: signed in.
  const session = await getSession();
  if (!session) return { ok: false, message: "Please sign in to cancel an order." };

  // Check 2: the order must belong to THIS session. A foreign id behaves as not found.
  const id = Number(formData.get("id"));
  const order = Number.isInteger(id) ? getOrder(id, session.user) : null;
  if (!order) return { ok: false, message: "Order not found." };
  const status = trackingFor(order).status;
  if (status === "cancelled") return { ok: false, message: "This order is already cancelled." };
  if (status !== "received" && status !== "preparing") {
    return { ok: false, message: "This demo order can only be cancelled before it is on the way." };
  }

  markCancelled(id, session.user);
  revalidatePath("/orders");
  revalidatePath("/dashboard");
  revalidatePath(`/track/${id}`);
  return { ok: true, message: "Order cancelled." };
}
