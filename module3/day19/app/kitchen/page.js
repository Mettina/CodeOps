import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listAllOrders } from "@/lib/orderStore";

export const dynamic = "force-dynamic";

// [EXERCISE 2] Private route: own title + description, kept out of search results.
export const metadata = {
  title: "Kitchen orders",
  description: "Staff view of incoming orders.",
  robots: { index: false, follow: false },
};

export default async function KitchenPage() {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=%2Fkitchen");
  }
  if (session.role !== "staff") {
    notFound();
  }

  const orders = listAllOrders();

  return (
    <section>
      <h1>Kitchen orders</h1>
      {orders.length === 0 ? (
        <p className="status">No orders yet.</p>
      ) : (
        <ul className="dish-list">
          {orders.map((order) => (
            <li key={order.id} className="dish-card">
              <h2>Order {order.id} · {order.status}</h2>
              <p>{order.name} · {order.area}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.dishId}>
                    {item.quantity} × {item.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
