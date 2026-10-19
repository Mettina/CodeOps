import { notFound, redirect } from "next/navigation";
import OrderStatus from "@/components/OrderStatus";
import { getOrder } from "@/lib/orderStore";
import { getSession } from "@/lib/session";

// [EXERCISE 2] Private route: own title + description, kept out of search results.
export const metadata = {
  title: "Order status",
  description: "Track the status of your Addis Eats order.",
  robots: { index: false, follow: false },
};

export default async function OrderPage({ params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(`/orders/${id}`)}`);
  }

  const order = getOrder(id, session.user);

  if (!order) {
    notFound();
  }

  return (
    <section>
      <h1>Order status</h1>
      <OrderStatus id={id} fallbackData={order} />
    </section>
  );
}
