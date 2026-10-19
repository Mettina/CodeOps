// Builds /path?a=1&b=2#hash, skipping empty values. Sorting and paging links
// are made with this, so the state of the screen always lives in the URL.
export function buildHref(base, params = {}, hash = "") {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  }
  const text = query.toString();
  return `${base}${text ? `?${text}` : ""}${hash ? `#${hash}` : ""}`;
}

export const first = (value) => (Array.isArray(value) ? value[0] : value);
