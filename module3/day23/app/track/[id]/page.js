import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getOrder, listOrders } from "@/lib/orderStore";
import { getSession } from "@/lib/session";
import { trackingFor } from "@/lib/tracking";
import ExportButton from "./ExportButton";
import TrackingLive from "./TrackingLive";

export const dynamic = "force-dynamic";

// [DAY 47] Private route, like /orders/[id]: kept out of search results.
export const metadata = {
  title: "Track delivery",
  description: "Follow your Addis Eats delivery on the map.",
  robots: { index: false, follow: false },
};

export default async function TrackPage({ params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect(`/signin?next=${encodeURIComponent(`/track/${id}`)}`);

  const order = getOrder(id, session.user); // owner-only: someone else's id is a 404
  if (!order) notFound();

  // [EXERCISE 4] Seeded from the server render; the stream only updates it.
  const initial = { id: order.id, ...trackingFor(order), at: new Date().toISOString() };

  return (
    <section>
      <h1>Track order #{order.id}</h1>
      <TrackingLive id={order.id} order={order} initial={initial} />
      <p className="track-actions">
        <ExportButton orders={listOrders(session.user)} />{" "}
        <Link href="/orders">Back to orders</Link>
      </p>
    </section>
  );
}
