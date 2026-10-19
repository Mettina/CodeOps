// In-memory order store (a demo: it resets on restart, and on a serverless host it can
// differ between instances). A database is the real fix; see FUTURE.md.
const store = (globalThis.__merkatoOrders ??= { orders: [], nextId: 1 });

// Idempotent write: the same (owner, key) pair always gives back the SAME order, so a
// double tap or a retry on a slow connection cannot create two orders.
export function findOrderByKey(owner, key) {
  if (!key) return null;
  return store.orders.find((o) => o.owner === owner && o.idempotencyKey === key) ?? null;
}

export function saveOrder(order, idempotencyKey) {
  const saved = {
    ...(idempotencyKey ? { idempotencyKey } : {}),
    id: store.nextId++,
    createdAt: new Date().toISOString(),
    status: "received",
    ...order,
  };
  store.orders.unshift(saved);
  return saved;
}

export function listOrders(owner) {
  return store.orders.filter((o) => o.owner === owner);
}

export function listAllOrders() {
  return store.orders;
}

// Ownership is part of the lookup: someone else's id simply is not found.
export function getOrder(id, owner) {
  return store.orders.find((o) => o.id === Number(id) && o.owner === owner) ?? null;
}

export function getOrderForStaff(id) {
  return store.orders.find((o) => o.id === Number(id)) ?? null;
}

export function markCancelled(id, owner) {
  const order = getOrder(id, owner);
  if (!order) return null;
  order.status = "cancelled";
  return order;
}
