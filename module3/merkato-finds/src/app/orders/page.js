import Link from "next/link";
import { redirect } from "next/navigation";
import { PackageCheck } from "lucide-react";
import CancelButton from "@/components/CancelButton";
import { etb, orderRef, when } from "@/lib/format";
import { listOrders } from "@/lib/orderStore";
import { getSession } from "@/lib/session";
import { trackingFor } from "@/lib/tracking";

export const metadata = {
  title: "My orders | Merkato Finds",
  robots: { index: false, follow: false },
};

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=%2Forders");

  // The query is scoped to the session's owner, never to an id sent by the browser.
  const orders = listOrders(session.user);

  return (
    <section className="page-shell orders-page">
      <div className="page-intro"><span className="eyebrow">THE PAPER TRAIL</span><h1>My orders<span className="title-period">.</span></h1><p>Check in on your marketplace demo orders.</p></div>
      {orders.length ? (
        <div className="orders-list">
          {orders.map((order) => {
            const status = trackingFor(order).status;
            return (
              <article className="order-card" key={order.id}>
                <div className="order-card-top">
                  <div><span className="eyebrow">ORDER REFERENCE</span><h3>{orderRef(order.id)}</h3><small>Placed {when(order.createdAt)}</small></div>
                  <span className="status-pill">{status}</span>
                </div>
                <ul className="order-lines">
                  {order.items.map((line) => <li key={line.id}>{line.quantity} × {line.name}</li>)}
                </ul>
                <div className="order-card-bottom">
                  <span>{order.items.length} product line(s)</span><strong>{etb(order.total)}</strong>
                </div>
                <div className="order-card-actions">
                  {(status === "received" || status === "preparing") && <CancelButton id={order.id} />}
                  <Link href={`/track/${order.id}`} className="button button-outline">Track delivery</Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        // A brand-new account sees a reason and a next step, not a blank list.
        <div className="empty-state"><PackageCheck size={38} /><h2>No orders yet.</h2><p>When you place a demo order, it will show up here.</p><Link href="/shop" className="button button-dark">Explore products ↗</Link></div>
      )}
    </section>
  );
}
