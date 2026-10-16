import { NextResponse } from "next/server";

function decodeHex(value) {
  if (!/^[\da-f]{64}$/i.test(value)) {
    return null;
  }

  return Uint8Array.from(value.match(/.{2}/g), (byte) => Number.parseInt(byte, 16));
}

async function hasValidSession(raw, secret) {
  if (!raw || !secret) {
    return false;
  }

  const separator = raw.lastIndexOf(".");
  if (separator < 1) {
    return false;
  }

  let user;
  try {
    user = decodeURIComponent(raw.slice(0, separator));
  } catch {
    return false;
  }

  const providedSignature = decodeHex(raw.slice(separator + 1));
  if (!providedSignature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expectedSignature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(user))
  );

  let difference = 0;
  for (let index = 0; index < expectedSignature.length; index += 1) {
    difference |= expectedSignature[index] ^ providedSignature[index];
  }

  return difference === 0;
}

export async function middleware(request) {
  const rawSession = request.cookies.get("session")?.value;
  const validSession = await hasValidSession(rawSession, process.env.SESSION_SECRET);

  if (validSession) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};
