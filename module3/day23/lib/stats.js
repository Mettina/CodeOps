// [DAY 46] Aggregation and table queries. Everything here runs on the server:
// the browser receives a handful of summary rows, never the orders themselves.

export const PAGE_SIZE = 10;
export const RANGE_DAYS = 14;

const DAY_MS = 24 * 60 * 60 * 1000;
const ADDIS_OFFSET_MS = 3 * 60 * 60 * 1000; // Africa/Addis_Ababa is UTC+3, no DST

// "2026-10-18" for the calendar day an instant falls on in Addis Ababa.
export function dayKey(date) {
  return new Date(new Date(date).getTime() + ADDIS_OFFSET_MS).toISOString().slice(0, 10);
}

const dayLabel = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const labelOf = (key) => dayLabel.format(new Date(`${key}T00:00:00Z`));

// "bole" and " Bole " are one neighbourhood. Short all-caps names such as CMC stay as typed.
export function normalizeArea(area) {
  const clean = String(area ?? "").trim().replace(/\s+/g, " ");
  if (!clean) return "Unknown";
  if (clean.length <= 3 && clean === clean.toUpperCase()) return clean; // CMC
  return clean.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

const counted = (orders) => orders.filter((order) => order.status !== "cancelled");

// Revenue by neighbourhood, largest first. Cancelled orders earn nothing.
export function revenueByArea(orders) {
  const totals = new Map();
  for (const order of counted(orders)) {
    const area = normalizeArea(order.area);
    const row = totals.get(area) ?? { area, revenue: 0, orders: 0 };
    row.revenue += order.total;
    row.orders += 1;
    totals.set(area, row);
  }
  return [...totals.values()].sort((a, b) => b.revenue - a.revenue || a.area.localeCompare(b.area));
}

// One row per day for the last RANGE_DAYS days, zeros included, so the line
// never skips a quiet day and the stated range is the range drawn.
export function ordersPerDay(orders, now = new Date()) {
  const todayKey = dayKey(now);
  const today = Date.parse(`${todayKey}T00:00:00Z`);
  const keys = Array.from({ length: RANGE_DAYS }, (_, i) =>
    new Date(today - (RANGE_DAYS - 1 - i) * DAY_MS).toISOString().slice(0, 10)
  );
  const counts = new Map(keys.map((key) => [key, 0]));
  for (const order of counted(orders)) {
    const key = dayKey(order.createdAt);
    if (counts.has(key)) counts.set(key, counts.get(key) + 1);
  }
  const rows = keys.map((key) => ({ date: key, label: labelOf(key), orders: counts.get(key) }));
  const rangeLabel = `${rows[0].label} to ${rows.at(-1).label} ${todayKey.slice(0, 4)}`;
  return { rows, rangeLabel };
}

// ---- Sorting and paging, read from the URL -------------------------------

const COMPARE = {
  id: (a, b) => a.id - b.id,
  date: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
  area: (a, b) => normalizeArea(a.area).localeCompare(normalizeArea(b.area)),
  total: (a, b) => a.total - b.total,
  status: (a, b) => String(a.status).localeCompare(String(b.status)),
};

export const SORT_KEYS = Object.keys(COMPARE);

// Never trust the URL: unknown sort keys, directions and page numbers fall
// back to the defaults rather than reaching a query.
export function readTableParams(searchParams = {}) {
  const one = (value) => (Array.isArray(value) ? value[0] : value);
  const sortRaw = one(searchParams.sort);
  const sort = SORT_KEYS.includes(sortRaw) ? sortRaw : "date";
  const dir = one(searchParams.dir) === "asc" ? "asc" : "desc";
  const pageNumber = Number(one(searchParams.page));
  const page = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  return { sort, dir, page };
}

export function queryOrders(orders, { sort, dir, page }) {
  const sign = dir === "asc" ? 1 : -1;
  const sorted = [...orders].sort((a, b) => sign * COMPARE[sort](a, b) || b.id - a.id);
  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = Math.min(page, pages);
  const start = (current - 1) * PAGE_SIZE;
  return {
    rows: sorted.slice(start, start + PAGE_SIZE),
    total,
    page: current,
    pages,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(start + PAGE_SIZE, total),
  };
}
