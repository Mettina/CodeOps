import Link from "next/link";
import CancelButton from "@/components/CancelButton";
import { signOut } from "@/app/actions/auth";
import { listOrders } from "@/lib/orderStore";
import { getSession } from "@/lib/session";

export default async function MyOrdersPage() {
  const session = await getSession();
  if (!session) {
    return (
      <section>
        <h1>My orders</h1>
        <p><Link href="/signin">Sign in</Link> to see your orders.</p>
      </section>
    );
  }

  const mine = listOrders().filter((order) => order.owner === session.user);
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
              {order.id} · {order.total} ETB · {order.status}
            </div>
            <CancelButton id={order.id} status={order.status} />
          </li>
        ))}
      </ul>
    </section>
  );
}
