import { listOrders } from "@/lib/orderStore";

export const dynamic = "force-dynamic";

export default function OrdersPage() {
  const orders = listOrders();

  return (
    <section>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p className="status">No orders yet.</p>
      ) : (
        <ul className="dish-list">
          {orders.map((order) => (
            <li key={order.id} className="dish-card">
              <div>
                #{order.id} · {order.name} · {order.area}
                <span className="meta"> {order.total} ETB</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
