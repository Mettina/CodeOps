"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/session";

export async function signIn(formData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const requestedNext = String(formData.get("next") ?? "");
  const next =
    requestedNext === "/checkout" || /^\/orders(?:\/|$)/.test(requestedNext)
      ? requestedNext
      : "/my-orders";
  await createSession(name);
  redirect(next);
}

export async function signOut() {
  await destroySession();
  redirect("/");
}
