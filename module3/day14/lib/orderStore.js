const store = (globalThis.__orders ??= { orders: [], nextId: 1 });

export function saveOrder(order) {
  const saved = {
    id: store.nextId++,
    createdAt: new Date().toISOString(),
    status: "placed",
    ...order,
  };
  store.orders.unshift(saved);
  return saved;
}

export function listOrders() {
  return store.orders;
}

export function getOrder(id) {
  return store.orders.find((order) => order.id === Number(id)) ?? null;
}

export function markCancelled(id) {
  const order = getOrder(id);
  if (order) {
    order.status = "cancelled";
  }
}
