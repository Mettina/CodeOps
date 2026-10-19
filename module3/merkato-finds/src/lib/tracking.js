export const DELIVERY_STEPS = [
  { status: "received", afterSeconds: 0 },
  { status: "preparing", afterSeconds: 15 },
  { status: "on the way", afterSeconds: 40 },
  { status: "delivered", afterSeconds: 100 },
];

const CITY_CENTERS = {
  "addis ababa": [9.0107, 38.7612],
  adama: [8.5400, 39.2689],
  "bahir dar": [11.5742, 37.3614],
  hawassa: [7.0621, 38.4765],
  "dire dawa": [9.6009, 41.8501],
  mekelle: [13.4967, 39.4753],
};

const ADDIS_AREAS = {
  bole: [8.995, 38.7896],
  piassa: [9.0365, 38.7469],
  kazanchis: [9.0192, 38.7728],
  sarbet: [8.9876, 38.7389],
  cmc: [9.0, 38.8284],
  megenagna: [9.0205, 38.8029],
  gerji: [8.9976, 38.8167],
};

const lerp = (from, to, progress) => from + (to - from) * progress;

export function deliveryPosition(city, area) {
  const cityKey = String(city ?? "").trim().toLowerCase();
  const areaKey = String(area ?? "").trim().toLowerCase();
  if (cityKey === "addis ababa" && ADDIS_AREAS[areaKey]) {
    return { coordinates: ADDIS_AREAS[areaKey], known: true };
  }
  const center = CITY_CENTERS[cityKey];
  return {
    coordinates: center ?? CITY_CENTERS["addis ababa"],
    known: Boolean(center),
  };
}

export function trackingFor(order, now = Date.now()) {
  const city = order.customer?.city ?? order.city;
  const area = order.customer?.area ?? order.area;
  const destination = deliveryPosition(city, area);
  const dropoff = destination.coordinates;
  const createdAt = new Date(order.createdAt).getTime();
  const age = Math.max(0, (now - createdAt) / 1000);
  const etaIso = new Date(createdAt + DELIVERY_STEPS.at(-1).afterSeconds * 1000).toISOString();

  if (order.status === "cancelled") {
    return { status: "cancelled", courier: null, dropoff, etaIso: null, stepIndex: -1, locationKnown: destination.known };
  }

  let stepIndex = 0;
  for (let index = 1; index < DELIVERY_STEPS.length; index += 1) {
    if (age >= DELIVERY_STEPS[index].afterSeconds) stepIndex = index;
  }

  const status = DELIVERY_STEPS[stepIndex].status;
  const hub = [dropoff[0] + 0.008, dropoff[1] - 0.012];
  let courier = hub;
  if (status === "on the way") {
    const start = DELIVERY_STEPS[stepIndex].afterSeconds;
    const end = DELIVERY_STEPS[stepIndex + 1].afterSeconds;
    const progress = Math.min(1, (age - start) / (end - start));
    courier = [lerp(hub[0], dropoff[0], progress), lerp(hub[1], dropoff[1], progress)];
  } else if (status === "delivered") {
    courier = null;
  }

  return { status, courier, dropoff, etaIso, stepIndex, locationKnown: destination.known };
}