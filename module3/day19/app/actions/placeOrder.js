"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createOrder } from "@/lib/orders";
import { saveOrder } from "@/lib/orderStore";
import { getSession } from "@/lib/session";

function readOrderInput(formData) {
  const serializedItems = formData.get("items");
  let items;

  if (typeof serializedItems === "string") {
    try {
      items = JSON.parse(serializedItems);
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      items = null;
    }
  } else {
    items = formData.getAll("dishId").map((entry) => {
      const dishId = typeof entry === "string" ? entry : "";
      const quantity = formData.get(`quantity-${dishId}`);
      return {
        dishId: Number(dishId),
        quantity: typeof quantity === "string" ? Number(quantity) : Number.NaN,
      };
    });
  }

  return {
    name: formData.get("name"),
    phone: formData.get("phone"),
    area: formData.get("area"),
    items,
  };
}

export async function placeOrder(previousStateOrFormData, submittedFormData) {
  const progressiveSubmission = submittedFormData === undefined;
  const formData = progressiveSubmission ? previousStateOrFormData : submittedFormData;
  const session = await getSession();
  if (!session) {
    if (progressiveSubmission) redirect("/signin?next=%2Fcheckout");
    return {
      ok: false,
      fieldErrors: {},
      message: "Please sign in before placing an order.",
      order: null,
    };
  }

  const result = await createOrder(readOrderInput(formData));

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
  if (progressiveSubmission) redirect("/checkout?placed=1");
  return { ok: true, fieldErrors: {}, message: "", order };
}
