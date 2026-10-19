"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/session";
import { cleanIdentity } from "@/lib/identity";
import { getSafeNextPath } from "@/lib/redirects";

// Used by both /login and /signup. There is no password: the name and email are not
// verified, so this is a learning exercise, not production authentication.
export async function signIn(formData) {
  const next = getSafeNextPath(formData.get("next"));
  const identity = cleanIdentity(formData.get("name"), formData.get("email"));

  if (!identity) {
    redirect(`/login?error=1&next=${encodeURIComponent(next)}`);
  }

  await createSession(identity);
  redirect(next);
}

export async function signOut() {
  await destroySession();
  redirect("/");
}
