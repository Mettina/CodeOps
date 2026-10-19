import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import DataTable from "@/components/DataTable";
import EmptyState from "@/components/EmptyState";
import OrderTable from "@/components/OrderTable";
import OrdersChart from "@/components/OrdersChart";
import Pager from "@/components/Pager";
import RevenueChart from "@/components/RevenueChart";
import { applyDemo } from "@/lib/demo";
import { etb } from "@/lib/format";
import { listAllOrders } from "@/lib/orderStore";
import { getSampleOrders } from "@/lib/sampleOrders";
import { getSession } from "@/lib/session";
import { ordersPerDay, queryOrders, readTableParams, revenueByArea } from "@/lib/stats";
import { buildHref, first } from "@/lib/url";

export const dynamic = "force-dynamic";

// Private staff screen: kept out of search results.
export const metadata = {
  title: "Dashboard",
  description: "Staff dashboard: revenue, orders over time and the order table.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage({ searchParams }) {
  const sp = await searchParams;

  // Layer 2 (layer 1 is middleware.js): session, then role, before any order is read.
  const session = await getSession();
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(buildHref("/dashboard", sp))}`);
  }
  if (session.role !== "staff") {
    notFound();
  }

  // ?demo=slow|error|empty and ?data=sample make every state demonstrable on demand.
  const demo = await applyDemo(sp.demo);
  const sample = first(sp.data) === "sample";
  const keep = { data: sample ? "sample" : undefined, demo };

  const orders = demo === "empty" ? [] : sample ? await getSampleOrders() : listAllOrders();

  // Aggregate on the server. The browser gets one row per neighbourhood and one
  // per day: 7 + 14 rows, not every order.
  const byArea = revenueByArea(orders);
  const perDay = ordersPerDay(orders);

  const table = readTableParams(sp);
  const result = queryOrders(orders, table);
  const sortHref = (key, dir) => buildHref("/dashboard", { ...keep, sort: key, dir }, "orders");
  const pageHref = (page) =>
    buildHref("/dashboard", { ...keep, sort: table.sort, dir: table.dir, page: page > 1 ? page : undefined }, "orders");

  const totalRevenue = byArea.reduce((sum, row) => sum + row.revenue, 0);

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <p className="meta">
        {sample ? "Showing generated sample orders. " : "Showing live orders. "}
        {orders.length} orders, {etb(totalRevenue)} revenue (cancelled orders earn nothing).
      </p>

      <nav className="demo-links" aria-label="Demonstrate each state">
        <span>Show:</span>
        <Link href="/dashboard">Live data</Link>
        <Link href="/dashboard?data=sample">Sample data</Link>
        <Link href="/dashboard?demo=empty">Empty</Link>
        <Link href="/dashboard?demo=slow&data=sample">Loading (2.5 s)</Link>
        <Link href="/dashboard?demo=error">Error</Link>
      </nav>

      {orders.length === 0 ? (
        <EmptyState title="No orders yet" action={{ href: "/dashboard?data=sample", label: "Preview with sample data" }}>
          Charts and the order table appear as soon as customers check out. Until then you can
          preview the dashboard with sample data.
        </EmptyState>
      ) : (
        <>
          <section className="panel" aria-labelledby="revenue-heading">
            <h2 id="revenue-heading">Revenue by neighbourhood (ETB, cancelled orders excluded)</h2>
            {byArea.length === 0 ? (
              <p className="status">Every order so far was cancelled, so there is no revenue to chart.</p>
            ) : (
              <>
                <RevenueChart data={byArea.map(({ area, revenue }) => ({ area, revenue }))} />
                <DataTable
                  caption="Revenue by neighbourhood, the same data as the chart"
                  columns={[
                    { key: "area", label: "Neighbourhood" },
                    { key: "orders", label: "Orders", numeric: true },
                    { key: "revenue", label: "Revenue", numeric: true, format: etb },
                  ]}
                  rows={byArea}
                />
              </>
            )}
          </section>

          <section className="panel" aria-labelledby="daily-heading">
            <h2 id="daily-heading">Orders per day, {perDay.rangeLabel} (number of orders)</h2>
            <OrdersChart data={perDay.rows.map(({ label, orders }) => ({ label, orders }))} />
            <DataTable
              caption={`Orders per day, ${perDay.rangeLabel}, the same data as the chart`}
              columns={[
                { key: "label", label: "Day" },
                { key: "orders", label: "Orders", numeric: true },
              ]}
              rows={perDay.rows}
            />
          </section>

          <section className="panel" id="orders" aria-labelledby="orders-heading">
            <h2 id="orders-heading">All orders</h2>
            <OrderTable
              rows={result.rows}
              caption="All orders. Use the column headings to sort."
              sort={table.sort}
              dir={table.dir}
              sortHref={sortHref}
            />
            <Pager {...result} hrefFor={pageHref} />
          </section>
        </>
      )}
    </section>
  );
}
