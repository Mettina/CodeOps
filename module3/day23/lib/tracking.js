// [DAY 47] Demo delivery data. There is no real courier, so the courier's
// position and status are SIMULATED from the order's age. Both the server
// render and the stream call trackingFor(order), so they always agree.
// Coordinates are [lat, lng] (Leaflet order; GeoJSON would be [lng, lat]).

export const KITCHEN = { name: "Addis Eats kitchen", position: [9.0107, 38.7612] };

// Rough centres of the neighbourhoods used in the app. Unknown areas fall back to Bole.
const AREAS = {
  bole: [8.995, 38.7896],
  piassa: [9.0365, 38.7469],
  kazanchis: [9.0192, 38.7728],
  sarbet: [8.9876, 38.7389],
  cmc: [9.0, 38.8284],
  megenagna: [9.0205, 38.8029],
  gerji: [8.9976, 38.8167],
};

export function deliveryPosition(area) {
  return AREAS[String(area ?? "").trim().toLowerCase()] ?? AREAS.bole;
}

// Demo timeline, in seconds since the order was placed.
const STEPS = [
  { status: "placed", at: 0 },
  { status: "preparing", at: 15 },
  { status: "on the way", at: 40 },
  { status: "delivered", at: 100 },
];
const ON_THE_WAY = 40;
const DELIVERED = 100;

const lerp = (a, b, t) => a + (b - a) * t;

// Returns the live picture for one order at one instant.
export function trackingFor(order, now = Date.now()) {
  const dropoff = deliveryPosition(order.area);
  const age = Math.max(0, (now - new Date(order.createdAt).getTime()) / 1000);
  const etaIso = new Date(new Date(order.createdAt).getTime() + DELIVERED * 1000).toISOString();

  // A cancelled order never moves.
  if (order.status === "cancelled") {
    return { status: "cancelled", courier: null, dropoff, etaIso: null };
  }

  let status = "placed";
  for (const step of STEPS) if (age >= step.at) status = step.status;

  let courier = null;
  if (status === "on the way") {
    const t = Math.min(1, (age - ON_THE_WAY) / (DELIVERED - ON_THE_WAY));
    courier = [lerp(KITCHEN.position[0], dropoff[0], t), lerp(KITCHEN.position[1], dropoff[1], t)];
  } else if (status === "delivered") {
    courier = dropoff;
  } else {
    courier = KITCHEN.position; // still at the kitchen
  }
  return { status, courier, dropoff, etaIso };
}
