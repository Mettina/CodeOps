import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "session";
const STAFF_USERS = new Set(
  (process.env.STAFF_USERS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
);

export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function isValidName(name) {
  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    name.trim().length <= 100
  );
}

export function isValidEmail(email) {
  return (
    typeof email === "string" &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function sign(value) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set in .env.local");
  }

  return createHmac("sha256", secret).update(value).digest("hex");
}

export async function createSession(email, name) {
  if (!isValidEmail(email) || !isValidName(name)) {
    throw new Error("A valid name and email address are required to create a session.");
  }

  const user = normalizeEmail(email);
  const displayName = name.trim();
  const payload = `${user}|${displayName}`;
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, {
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

  const payload = raw.slice(0, dot);
  const fields = payload.split("|");
  if (fields.length !== 2) return null;

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

  let user;
  let name;
  [user, name] = fields;

  if (
    !isValidEmail(user) ||
    user !== normalizeEmail(user) ||
    !isValidName(name) ||
    name !== name.trim()
  ) {
    return null;
  }

  return {
    user,
    email: user,
    name,
    role: STAFF_USERS.has(user) ? "staff" : "customer",
  };
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
