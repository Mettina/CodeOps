const FALLBACK_PATH = "/my-orders";
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
    pathname === "/dashboard" ||
    pathname === "/kitchen" ||
    pathname === "/my-orders" ||
    pathname === "/orders" ||
    pathname.startsWith("/orders/") || pathname.startsWith("/track/");

  return isAllowedPath
    ? `${pathname}${destination.search}${destination.hash}`
    : FALLBACK_PATH;
}
