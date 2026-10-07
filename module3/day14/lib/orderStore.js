const store = (globalThis.__orders ??= { orders: [], nextId: 1 });

export function saveOrder(order) {
  const saved = {
    id: store.nextId++,
    createdAt: new Date().toISOString(),
    ...order,
  };
  store.orders.unshift(saved);
  return saved;
}

export function listOrders() {
  return store.orders;
}
