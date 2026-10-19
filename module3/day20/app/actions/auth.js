"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  isValidEmail,
  isValidName,
  normalizeEmail,
} from "@/lib/session";
import { getSafeNextPath } from "@/lib/redirects";

export async function signIn(formData) {
  const next = getSafeNextPath(formData.get("next"));
  const submittedName = formData.get("name");
  const submittedEmail = formData.get("email");
  const name = typeof submittedName === "string" ? submittedName.trim() : "";
  const email = typeof submittedEmail === "string"
    ? normalizeEmail(submittedEmail)
    : "";

  if (!isValidName(name) || !isValidEmail(email)) {
    const params = new URLSearchParams({ error: "invalid-input", next });
    redirect(`/signin?${params.toString()}`);
  }

  await createSession(email, name);
  redirect(next);
}

export async function signOut() {
  await destroySession();
  redirect("/");
}
