// [DAY 47 · EXERCISE 6] The one shared formatting module: etb, when, relative.
// Every formatter is built ONCE at module level (building one is expensive,
// calling one is cheap) and always names its locale and time zone, so the
// server and the phone print the same text and React never reports a
// hydration mismatch.

const LOCALE = "en-ET"; // money
const DATE_LOCALE = "en-GB"; // "18 Oct 2026, 18:40": day first, 24-hour, as on the sheet
const ZONE = "Africa/Addis_Ababa"; // EAT, UTC+3, no daylight saving

const money = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

const dateTime = new Intl.DateTimeFormat(DATE_LOCALE, {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: ZONE,
});

const clock = new Intl.DateTimeFormat(DATE_LOCALE, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: ZONE,
});

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// etb(14200) -> "ETB 14,200"
export const etb = (value) => money.format(Number(value));

// when("2026-10-18T15:40:00Z") -> "18 Oct 2026, 18:40" (Addis time)
export const when = (iso) => dateTime.format(new Date(iso));

// clockTime(iso) -> "18:40", used for ETAs
export const clockTime = (iso) => clock.format(new Date(iso));

// relative(iso, now) -> "12 minutes ago" / "in 5 minutes"
// `now` is a parameter so the server render and a test can agree on one instant.
export function relative(iso, now = Date.now()) {
  const seconds = Math.round((new Date(iso).getTime() - now) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 45) return rtf.format(0, "second");
  if (abs < 45 * 60) return rtf.format(Math.round(seconds / 60), "minute");
  if (abs < 22 * 3600) return rtf.format(Math.round(seconds / 3600), "hour");
  return rtf.format(Math.round(seconds / 86400), "day");
}

// Kept so Day 46 code (OrderTable) keeps working: same thing as `when`.
export const formatDateTime = when;
