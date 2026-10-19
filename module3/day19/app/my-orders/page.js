import Link from "next/link";
import { redirect } from "next/navigation";
import CancelButton from "@/components/CancelButton";
import { signOut } from "@/app/actions/auth";
import { listOrders } from "@/lib/orderStore";
import { getSession } from "@/lib/session";

// [EXERCISE 2] Private route: own title + description, kept out of search results.
export const metadata = {
  title: "My orders",
  description: "Your Addis Eats order history.",
  robots: { index: false, follow: false },
};

export default async function MyOrdersPage() {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=%2Fmy-orders");
  }

  const mine = listOrders(session.user);
  return (
    <section>
      <h1>My orders</h1>
      <form action={signOut}>
        Signed in as {session.user}{" "}
        <button type="submit" className="button">Sign out</button>
      </form>
      {mine.length === 0 && <p className="status">No orders yet.</p>}
      <ul className="dish-list">
        {mine.map((order) => (
          <li key={order.id} className="dish-card">
            <div>
              <Link href={`/orders/${order.id}`}>Order {order.id}</Link>
              {" · "}{order.total} ETB · {order.status}
            </div>
            <CancelButton id={order.id} status={order.status} />
          </li>
        ))}
      </ul>
    </section>
  );
}
