// Attack 3: a crafted return link. Only same-site paths on this allowlist are accepted;
// everything else (absolute URLs, //host, backslashes, unknown paths) falls back.
const FALLBACK_PATH = "/account";
const REDIRECT_ORIGIN = "http://localhost";

export function getSafeNextPath(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return FALLBACK_PATH;
  }

  const destination = new URL(value, REDIRECT_ORIGIN);
  const pathname = destination.pathname;
  const isAllowedPath =
    pathname === "/checkout" ||
    pathname === "/account" ||
    pathname === "/dashboard" ||
    pathname === "/orders" ||
    pathname === "/order-success" ||
    /^\/track\/\d+$/.test(pathname);

  return isAllowedPath
    ? `${pathname}${destination.search}${destination.hash}`
    : FALLBACK_PATH;
}
