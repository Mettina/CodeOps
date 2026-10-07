"use server";

import { createOrder } from "@/lib/orders";

export async function submitOrder(_previousState, formData) {
  let items;

  try {
    items = JSON.parse(formData.get("items") ?? "");
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }

    return {
      status: 422,
      message: "Please correct the highlighted fields.",
      fieldErrors: { items: "Order items are invalid." },
    };
  }

  const result = await createOrder({
    name: formData.get("name"),
    phone: formData.get("phone"),
    area: formData.get("area"),
    items,
  });

  if (result.status === 422) {
    return {
      status: result.status,
      message: result.error.message,
      fieldErrors: result.error.fieldErrors,
    };
  }

  return result;
}
