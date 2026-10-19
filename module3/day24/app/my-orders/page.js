import Link from "next/link";
import { redirect } from "next/navigation";
import CancelButton from "@/components/CancelButton";
import EmptyState from "@/components/EmptyState";
import { signOut } from "@/app/actions/auth";
import { etb } from "@/lib/format";
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
        Signed in as {session.name}{" "}
        <button type="submit" className="button">Sign out</button>
      </form>
      {/* [DAY 49] A brand-new account sees a reason and a next step, not a blank list. */}
      {mine.length === 0 && (
        <EmptyState title="No orders yet" action={{ href: "/menu", label: "Browse the menu" }}>
          Browse the menu to place your first order. It will show up here, and you can track it live.
        </EmptyState>
      )}
      <ul className="dish-list">
        {mine.map((order) => (
          <li key={order.id} className="dish-card">
            <div>
              <Link href={`/orders/${order.id}`}>Order {order.id}</Link>
              {" · "}{etb(order.total)} · {order.status}
            </div>
            <CancelButton id={order.id} status={order.status} />
          </li>
        ))}
      </ul>
    </section>
  );
}
