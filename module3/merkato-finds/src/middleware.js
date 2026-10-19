import { NextResponse } from "next/server";

// Layer 1 of 2 for private pages: is there a cookie with a VALID signature? The page (or
// action) then checks the session again itself; middleware alone is never the only check.
function decodeHex(value) {
  if (!/^[\da-f]{64}$/i.test(value)) return null;
  return Uint8Array.from(value.match(/.{2}/g), (byte) => Number.parseInt(byte, 16));
}

async function hasValidSession(raw, secret) {
  if (!raw || !secret) return false;
  const separator = raw.lastIndexOf(".");
  if (separator < 1) return false;

  const payload = raw.slice(0, separator);
  const provided = decodeHex(raw.slice(separator + 1));
  if (!provided) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expected = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))
  );

  let difference = 0;
  for (let i = 0; i < expected.length; i += 1) difference |= expected[i] ^ provided[i];
  return difference === 0;
}

export async function middleware(request) {
  // Server Action POSTs must reach the action: each action checks the session itself and
  // answers in a form the browser understands (a redirect here would break it).
  if (request.method === "POST" && request.headers.has("next-action")) {
    return NextResponse.next();
  }

  const raw = request.cookies.get("session")?.value;
  if (await hasValidSession(raw, process.env.SESSION_SECRET)) return NextResponse.next();

  const url = new URL("/login", request.url);
  url.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(url);
}

// Narrow on purpose: public pages, static files and images never run middleware.
export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/account/:path*", "/dashboard/:path*", "/order-success/:path*"],
};
