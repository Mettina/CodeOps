import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { decodeIdentity, encodeIdentity } from "@/lib/identity";

const COOKIE = "session";

function sign(value) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set (copy .env.example to .env.local)");
  }
  return createHmac("sha256", secret).update(value).digest("hex");
}

// identity: { name, email } already cleaned by cleanIdentity().
export async function createSession(identity) {
  const jar = await cookies();
  const payload = encodeIdentity(identity);
  jar.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true, // JavaScript cannot read it
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

// Returns { user, name, email } or null.
//   user = the email: the key that owns orders (every ownership check uses it)
//   name = what the person typed, for display only
export async function getSession() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;

  const dot = raw.lastIndexOf(".");
  if (dot < 1) return null;

  const payload = raw.slice(0, dot);
  const signature = raw.slice(dot + 1);
  const given = Buffer.from(signature, "hex");
  const expected = Buffer.from(sign(payload), "hex");
  if (
    given.length !== expected.length ||
    given.toString("hex") !== signature ||
    !timingSafeEqual(given, expected)
  ) {
    return null;
  }

  const identity = decodeIdentity(payload);
  if (!identity) return null;
  return { user: identity.email, name: identity.name, email: identity.email };
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
