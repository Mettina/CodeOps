// [DAY 46] Sample orders so the dashboard has something to chart before real
// customers exist. Generated on request, never stored: ?data=sample on /dashboard.
import { getDishes } from "@/lib/data";
import { dayKey, RANGE_DAYS } from "@/lib/stats";

const DAY_MS = 24 * 60 * 60 * 1000;
const AREAS = ["Bole", "Piassa", "Kazanchis", "Sarbet", "CMC", "Megenagna", "Gerji"];
const NAMES = ["Almaz", "Dawit", "Selam", "Biruk", "Hana", "Yonas", "Meron", "Kidus"];
const STATUSES = ["placed", "preparing", "delivered", "delivered", "delivered", "cancelled"];

// Small seeded generator: the same sample every time, so a chart can be checked.
function seeded(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export async function getSampleOrders(now = new Date()) {
  const dishes = await getDishes();
  const rand = seeded(46);
  const todayStart = Date.parse(`${dayKey(now)}T00:00:00Z`) - 3 * 60 * 60 * 1000;
  const made = [];

  for (let i = 0; i < 48; i += 1) {
    // Squaring the random number leans towards recent days (a rising line) and
    // towards the first areas in the list (one clear winner in the bars).
    const daysAgo = Math.min(RANGE_DAYS - 1, Math.floor(rand() ** 1.5 * RANGE_DAYS));
    const area = AREAS[Math.floor(rand() ** 1.6 * AREAS.length)];
    const when = todayStart - daysAgo * DAY_MS + (8 + rand() * 12) * 60 * 60 * 1000;
    const items = Array.from({ length: 1 + Math.floor(rand() * 3) }, () => {
      const dish = dishes[Math.floor(rand() * dishes.length)];
      return { dishId: dish.id, name: dish.name, quantity: 1 + Math.floor(rand() * 3), price: dish.price };
    });
    made.push({
      createdAt: new Date(Math.min(when, now.getTime())).toISOString(),
      status: STATUSES[Math.floor(rand() * STATUSES.length)],
      owner: "sample",
      name: NAMES[Math.floor(rand() * NAMES.length)],
      area,
      items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });
  }

  made.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  return made.map((order, index) => ({ id: 1001 + index, ...order }));
}
