import Link from "next/link";
import { redirect } from "next/navigation";
import { listOrders } from "@/lib/orderStore";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=%2Forders");
  }

  const orders = listOrders(session.user);

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
                <Link href={`/orders/${order.id}`}>Order {order.id}</Link>
                {" · "}{order.name} · {order.area}
                <span className="meta"> {order.total} ETB · {order.status}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
