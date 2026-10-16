import { notFound } from "next/navigation";
import OrderStatus from "@/components/OrderStatus";
import { getOrder } from "@/lib/orderStore";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = getOrder(id);

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
