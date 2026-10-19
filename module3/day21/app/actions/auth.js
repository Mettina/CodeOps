"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/session";
import { cleanIdentity } from "@/lib/identity";
import { getSafeNextPath } from "@/lib/redirects";

export async function signIn(formData) {
  const next = getSafeNextPath(formData.get("next"));
  const identity = cleanIdentity(formData.get("name"), formData.get("email"));

  if (!identity) {
    // Works without JavaScript: back to the form with a message. The email is
    // never put in the URL.
    redirect(`/signin?error=1&next=${encodeURIComponent(next)}`);
  }

  await createSession(identity);
  redirect(next);
}

export async function signOut() {
  await destroySession();
  redirect("/");
}
