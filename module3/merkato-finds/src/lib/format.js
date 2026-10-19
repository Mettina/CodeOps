// The one formatting module (Day 47). Every price and time in the app goes through here.
// Each Intl formatter is built ONCE at module level and always names its locale and
// time zone, so the server and the browser print the same text (no hydration mismatch).
const money = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

const dateTime = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa", // EAT, UTC+3, no daylight saving
});

// etb(1450) -> "ETB 1,450"
export const etb = (value) => money.format(Number(value));

// when("2026-10-18T15:40:00Z") -> "18 Oct 2026, 18:40" (Addis time)
export const when = (iso) => dateTime.format(new Date(iso));

// A short, readable reference for an order id: 7 -> "MF-00007".
export const orderRef = (id) => `MF-${String(id).padStart(5, "0")}`;
