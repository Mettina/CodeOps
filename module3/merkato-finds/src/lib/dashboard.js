import { trackingFor } from "@/lib/tracking";

export const DASHBOARD_RANGE_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;
const ADDIS_OFFSET_MS = 3 * 60 * 60 * 1000;

function dayKey(date) {
  return new Date(new Date(date).getTime() + ADDIS_OFFSET_MS).toISOString().slice(0, 10);
}

const dayLabel = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

export function getDashboardData(orders, now = new Date()) {
  const nowMs = now.getTime();
  const activeOrders = orders.filter((order) => order.status !== "cancelled");
  const statusCounts = activeOrders.reduce((counts, order) => {
    const status = trackingFor(order, nowMs).status;
    counts[status] = (counts[status] ?? 0) + 1;
    return counts;
  }, {});

  const cityRevenue = new Map();
  for (const order of activeOrders) {
    const city = String(order.customer?.city ?? "Unknown").trim() || "Unknown";
    const totals = cityRevenue.get(city) ?? { city, revenue: 0, orders: 0 };
    totals.revenue += order.total;
    totals.orders += 1;
    cityRevenue.set(city, totals);
  }

  const todayKey = dayKey(now);
  const today = Date.parse(`${todayKey}T00:00:00Z`);
  const dates = Array.from({ length: DASHBOARD_RANGE_DAYS }, (_, index) =>
    new Date(today - (DASHBOARD_RANGE_DAYS - 1 - index) * DAY_MS).toISOString().slice(0, 10)
  );
  const dailyCounts = new Map(dates.map((date) => [date, 0]));
  for (const order of activeOrders) {
    const date = dayKey(order.createdAt);
    if (dailyCounts.has(date)) dailyCounts.set(date, dailyCounts.get(date) + 1);
  }

  const dailyOrders = dates.map((date) => ({
    date,
    label: dayLabel.format(new Date(`${date}T00:00:00Z`)),
    orders: dailyCounts.get(date),
  }));
  const cityRows = [...cityRevenue.values()].sort(
    (a, b) => b.revenue - a.revenue || a.city.localeCompare(b.city)
  );

  return {
    totalOrders: orders.length,
    revenue: activeOrders.reduce((total, order) => total + order.total, 0),
    awaiting: (statusCounts.received ?? 0) + (statusCounts.preparing ?? 0),
    onTheWay: statusCounts["on the way"] ?? 0,
    delivered: statusCounts.delivered ?? 0,
    cancelled: orders.length - activeOrders.length,
    cityRevenue: cityRows,
    dailyOrders,
  };
}
