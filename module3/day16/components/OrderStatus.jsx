"use client";

import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function OrderStatus({ id }) {
  const { data: order, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher);

  if (isLoading) {
    return <p className="status" role="status">Loading order...</p>;
  }

  if (error) {
    return <p className="status" role="alert">{error.message}</p>;
  }

  return (
    <div className="dish-card">
      <p>Order {order.id}</p>
      <p>{order.name} · {order.area}</p>
      <p className="meta">{order.total} ETB · {order.status}</p>
      <Link href="/orders">Back to orders</Link>
    </div>
  );
}
