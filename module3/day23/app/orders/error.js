"use client";

import ErrorState from "@/components/ErrorState";

export default function OrdersError({ retry, reset }) {
  return <ErrorState what="your orders" retry={retry} reset={reset} />;
}
