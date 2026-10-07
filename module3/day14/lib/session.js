import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "session";

function sign(value) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set in .env.local");
  }

  return createHmac("sha256", secret).update(value).digest("hex");
}

export async function createSession(user) {
  const jar = await cookies();
  jar.set(COOKIE, `${encodeURIComponent(user)}.${sign(user)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;

  const dot = raw.lastIndexOf(".");
  if (dot < 1) return null;

  let user;
  try {
    user = decodeURIComponent(raw.slice(0, dot));
  } catch {
    return null;
  }

  const signature = raw.slice(dot + 1);
  const given = Buffer.from(signature, "hex");
  const expected = Buffer.from(sign(user), "hex");
  if (
    given.length !== expected.length ||
    given.toString("hex") !== signature ||
    !timingSafeEqual(given, expected)
  ) {
    return null;
  }

  return { user };
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
