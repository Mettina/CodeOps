"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/session";
import { getSafeNextPath } from "@/lib/redirects";

export async function signIn(formData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const next = getSafeNextPath(formData.get("next"));
  await createSession(name);
  redirect(next);
}

export async function signOut() {
  await destroySession();
  redirect("/");
}
