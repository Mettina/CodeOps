import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import TrackingLive from "@/components/TrackingLive";
import { orderRef } from "@/lib/format";
import { getOrder, getOrderForStaff } from "@/lib/orderStore";
import { getSession } from "@/lib/session";
import { isStaff } from "@/lib/staff";
import { trackingFor } from "@/lib/tracking";
import "../../tracking.css";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Track delivery | Merkato Finds",
  robots: { index: false, follow: false },
};

export default async function TrackPage({ params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect(`/login?next=${encodeURIComponent(`/track/${id}`)}`);

  const staff = isStaff(session);
  const order = staff ? await getOrderForStaff(id) : await getOrder(id, session.user);
  if (!order) notFound();

  const tracking = trackingFor(order);
  const initial = { ...tracking, at: new Date().toISOString() };
  const safeOrder = {
    id: order.id,
    reference: orderRef(order.id),
    createdAt: order.createdAt,
    total: order.total,
    customer: { name: order.customer.name },
    area: order.customer.area,
    city: order.customer.city,
  };

  return (
    <section className="page-shell tracking-page">
      <div className="page-intro">
        <span className="eyebrow">DELIVERY DEMO</span>
        <h1>Track your delivery<span className="title-period">.</span></h1>
        <p>Follow simulated progress for order {safeOrder.reference}.</p>
      </div>
      <TrackingLive order={safeOrder} initial={initial} />
      <p className="tracking-back"><Link href={staff ? "/dashboard" : "/orders"}>{staff ? "Back to dashboard" : "Back to my orders"}</Link></p>
    </section>
  );
}