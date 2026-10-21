"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { createOrder, readOrderInput } from "@/lib/orders";
import { findOrderByKey, saveOrder } from "@/lib/orderStore";

export async function placeOrder(_previousState, formData) {
  // Check 1: signed in. The owner comes from the session, never from the form.
  const session = await getSession();
  if (!session) {
    return { ok: false, fieldErrors: {}, message: "Please sign in before placing an order." };
  }

  // A repeat of the same submission returns the order we already made (idempotent).
  const rawKey = formData.get("idempotencyKey");
  const key = typeof rawKey === "string" && rawKey.length <= 64 ? rawKey : "";
  const existing = await findOrderByKey(session.user, key);
  if (existing) redirect(`/order-success?id=${existing.id}`);

  // Check 2: validate on the server and price every line from the catalog.
  const result = createOrder(readOrderInput(formData));
  if (!result.ok) return { ok: false, fieldErrors: result.fieldErrors, message: result.message };

  const order = await saveOrder({ ...result.order, owner: session.user }, key);
  revalidatePath("/orders");
  revalidatePath("/dashboard");
  redirect(`/order-success?id=${order.id}`);
}
