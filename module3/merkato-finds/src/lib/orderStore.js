// Order store. Every function is async.
//
// - On Vercel, add an Upstash Redis database (Project > Storage). It adds the REST URL and
//   token variables below, and orders then live in Redis, so every serverless instance sees
//   the same orders.
// - With no database variables (local development), orders stay in server memory, which is
//   fine for `npm run dev` but resets on restart and differs between serverless instances.

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

const memory = (globalThis.__merkatoOrders ??= { orders: [], nextId: 1 });

async function redis(commands) {
  const response = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Order database error (${response.status})`);
  const results = await response.json();
  const failed = results.find((entry) => entry.error);
  if (failed) throw new Error(`Order database error: ${failed.error}`);
  return results.map((entry) => entry.result);
}

const parse = (value) => (value ? JSON.parse(value) : null);
const orderKey = (id) => `merkato:order:${id}`;
const idemKey = (owner, key) => `merkato:idem:${owner}:${key}`;

// Idempotent write: the same (owner, key) pair always gives back the SAME order, so a
// double tap or a retry on a slow connection cannot create two orders.
export async function findOrderByKey(owner, key) {
  if (!key) return null;
  if (!useRedis) {
    return memory.orders.find((o) => o.owner === owner && o.idempotencyKey === key) ?? null;
  }
  const [id] = await redis([["GET", idemKey(owner, key)]]);
  if (!id) return null;
  const [raw] = await redis([["GET", orderKey(id)]]);
  return parse(raw);
}

export async function saveOrder(order, idempotencyKey) {
  if (!useRedis) {
    const saved = {
      ...(idempotencyKey ? { idempotencyKey } : {}),
      id: memory.nextId++,
      createdAt: new Date().toISOString(),
      status: "received",
      ...order,
    };
    memory.orders.unshift(saved);
    return saved;
  }
  const [id] = await redis([["INCR", "merkato:nextId"]]);
  const saved = {
    ...(idempotencyKey ? { idempotencyKey } : {}),
    id,
    createdAt: new Date().toISOString(),
    status: "received",
    ...order,
  };
  const commands = [
    ["SET", orderKey(id), JSON.stringify(saved)],
    ["LPUSH", "merkato:orderIds", String(id)],
  ];
  if (idempotencyKey) commands.push(["SET", idemKey(order.owner, idempotencyKey), String(id), "EX", "86400"]);
  await redis(commands);
  return saved;
}

async function loadAll() {
  if (!useRedis) return memory.orders;
  const [ids] = await redis([["LRANGE", "merkato:orderIds", "0", "199"]]);
  if (!ids?.length) return [];
  const [raws] = await redis([["MGET", ...ids.map(orderKey)]]);
  return raws.map(parse).filter(Boolean);
}

export async function listOrders(owner) {
  return (await loadAll()).filter((o) => o.owner === owner);
}

export async function listAllOrders() {
  return loadAll();
}

async function loadOne(id) {
  const numeric = Number(id);
  if (!Number.isInteger(numeric) || numeric < 1) return null;
  if (!useRedis) return memory.orders.find((o) => o.id === numeric) ?? null;
  const [raw] = await redis([["GET", orderKey(numeric)]]);
  return parse(raw);
}

// Ownership is part of the lookup: someone else's id simply is not found.
export async function getOrder(id, owner) {
  const order = await loadOne(id);
  return order && order.owner === owner ? order : null;
}

export async function getOrderForStaff(id) {
  return loadOne(id);
}

export async function markCancelled(id, owner) {
  const order = await getOrder(id, owner);
  if (!order) return null;
  order.status = "cancelled";
  if (useRedis) await redis([["SET", orderKey(order.id), JSON.stringify(order)]]);
  return order;
}
