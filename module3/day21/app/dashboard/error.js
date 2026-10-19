"use client";

import ErrorState from "@/components/ErrorState";

export default function DashboardError({ retry, reset }) {
  return <ErrorState what="the dashboard" retry={retry} reset={reset} />;
}
