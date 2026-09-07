export const CATEGORIES = [
  { slug: "cleansers", sidebarLabel: "Cleansers", cardLabel: "Cleanser", base: 600 },
  { slug: "moisturizers", sidebarLabel: "Moisturizers", cardLabel: "Moisturizer", base: 750 },
  { slug: "serums", sidebarLabel: "Serums", cardLabel: "Serum", base: 900 },
  { slug: "sunscreens", sidebarLabel: "Sunscreen", cardLabel: "Sunscreen", base: 1050 },
  { slug: "toners", sidebarLabel: "Toners", cardLabel: "Toner", base: 550 },
];

export const PRICE_RANGES = [
  { key: "under500", label: "Under 500 ETB" },
  { key: "500to1000", label: "500 - 1,000 ETB" },
  { key: "over1000", label: "Over 1,000 ETB" },
];

export const PAYMENT_METHODS = [
  { key: "cod", label: "Cash on Delivery" },
  { key: "telebirr", label: "Telebirr (Mobile Money)" },
  { key: "bank", label: "Bank Transfer" },
  { key: "card", label: "Credit / Debit Card" },
];

const FIELDS = "code,product_name,brands,image_url,ingredients_text,created_t";

export function categoryUrl(slug) {
  return `https://world.openbeautyfacts.org/category/${slug}.json?page_size=24&fields=${FIELDS}`;
}

// Deterministic hash so the same product always gets the same fake price/badge
export function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function simulatedPrice(code, base) {
  const h = hashCode(code);
  const variance = (h % 400) - 150; // spread around the category base
  return Math.max(250, Math.round((base + variance) / 10) * 10);
}

export function priceBucket(price) {
  if (price < 500) return "under500";
  if (price <= 1000) return "500to1000";
  return "over1000";
}

export function badgeFor(code) {
  const h = hashCode(code);
  if (h % 11 === 0) return { text: "BEST", cls: "" };
  if (h % 7 === 0) return { text: "SALE", cls: "sale" };
  if (h % 5 === 0) return { text: "NEW", cls: "" };
  return null;
}

export function generateOrderNumber() {
  return "MSC-" + Math.floor(100000 + Math.random() * 900000);
}
