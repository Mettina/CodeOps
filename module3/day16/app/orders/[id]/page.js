import OrderStatus from "@/components/OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;

  return (
    <section>
      <h1>Order status</h1>
      <OrderStatus id={id} />
    </section>
  );
}
