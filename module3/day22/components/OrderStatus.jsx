"use client";

import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { etb } from "@/lib/format";

export default function OrderStatus({ id, fallbackData }) {
  const { data: order, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData,
    refreshInterval: 5000,
  });

  if (!order && isLoading) {
    return <p className="status" role="status">Loading order...</p>;
  }

  if (!order && error) {
    return <p className="status" role="alert">{error.message}</p>;
  }

  return (
    <div className="dish-card">
      {error && <p className="status" role="alert">Could not refresh order status: {error.message}</p>}
      <p>Order {order.id}</p>
      <p>{order.name} · {order.area}</p>
      <p className="meta">{etb(order.total)} · {order.status}</p>
      <Link href={`/track/${order.id}`}>Track delivery</Link>{" · "}
      <Link href="/orders">Back to orders</Link>
    </div>
  );
}
