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
