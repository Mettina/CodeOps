const store = (globalThis.__orders ??= { orders: [], nextId: 1 });

// [DAY 48 · EXERCISE 3] Idempotent write: the same (owner, key) pair always gives
// back the SAME order. A double tap, a retry on a slow connection or a resubmitted
// form cannot create a second order.
export function findOrderByKey(owner, key) {
  if (!key) return null;
  return store.orders.find((order) => order.owner === owner && order.idempotencyKey === key) ?? null;
}

export function saveOrder(order, idempotencyKey) {
  const saved = {
    ...(idempotencyKey ? { idempotencyKey } : {}),
    id: store.nextId++,
    createdAt: new Date().toISOString(),
    status: "placed",
    ...order,
  };
  store.orders.unshift(saved);
  return saved;
}

export function listOrders(owner) {
  return store.orders.filter((order) => order.owner === owner);
}

export function listAllOrders() {
  return store.orders;
}

export function getOrder(id, owner) {
  return (
    store.orders.find(
      (order) => order.id === Number(id) && order.owner === owner
    ) ?? null
  );
}

export function markCancelled(id, owner) {
  const order = getOrder(id, owner);
  if (order) {
    order.status = "cancelled";
  }
}
