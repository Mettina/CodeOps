import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Check, PackageCheck, ArrowRight } from "lucide-react";
import ClearCart from "@/components/ClearCart";
import { etb, orderRef } from "@/lib/format";
import { getOrder } from "@/lib/orderStore";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Order received | Merkato Finds",
  robots: { index: false, follow: false },
};

export default async function OrderSuccessPage({ searchParams }) {
  const sp = await searchParams;
  const session = await getSession();
  if (!session) redirect("/login?next=%2Forders");

  // Owner-scoped lookup: another account's id is simply "not found".
  const order = await getOrder(sp?.id, session.user);
  if (!order) notFound();

  return (
    <section className="page-shell success-page">
      <ClearCart />
      <div className="success-card">
        <div className="success-check"><Check size={32} /></div>
        <span className="eyebrow">THAT&apos;S A GOOD FIND</span>
        <h1>Order received<span className="title-period">.</span></h1>
        <p>Thanks for exploring Merkato Finds. Your demo order has been recorded.</p>
        <div className="success-order">
          <span>Order reference</span><strong>{orderRef(order.id)}</strong>
          <span>Order total</span><strong>{etb(order.total)}</strong>
          <span>Delivery to</span><strong>{order.customer.area}, {order.customer.city}</strong>
        </div>
        <div className="success-note"><PackageCheck size={20} /><span><strong>What happens next?</strong><small>Track the simulated progress here; this demo does not contact a seller or arrange a real delivery.</small></span></div>
        <Link href={`/track/${order.id}`} className="button button-outline">Track delivery</Link>{" "}
        <Link href="/orders" className="button button-outline">View my orders</Link>{" "}
        <Link href="/shop" className="button button-dark">Keep exploring <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}
