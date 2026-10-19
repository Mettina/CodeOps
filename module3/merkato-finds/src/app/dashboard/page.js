import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowUpRight, BarChart3, PackageCheck, Truck, Wallet } from "lucide-react";
import { etb, orderRef, when } from "@/lib/format";
import { getDashboardData } from "@/lib/dashboard";
import { listAllOrders } from "@/lib/orderStore";
import { getSession } from "@/lib/session";
import { isStaff } from "@/lib/staff";
import { trackingFor } from "@/lib/tracking";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Staff dashboard | Merkato Finds",
  robots: { index: false, follow: false },
};

function OrdersTrend({ rows }) {
  const highest = Math.max(1, ...rows.map((row) => row.orders));
  const points = rows.map((row, index) => {
    const x = 24 + (index * 652) / Math.max(1, rows.length - 1);
    const y = 180 - (row.orders / highest) * 150;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg className="dashboard-trend" viewBox="0 0 700 220" role="img" aria-label="Orders per day over the last 14 days">
      <line x1="24" y1="180" x2="676" y2="180" className="trend-axis" />
      <polyline points={points} className="trend-line" />
      {rows.map((row, index) => {
        const x = 24 + (index * 652) / Math.max(1, rows.length - 1);
        const y = 180 - (row.orders / highest) * 150;
        return <circle key={row.date} cx={x} cy={y} r="4" className="trend-point" />;
      })}
      <text x="24" y="207" className="trend-label">{rows[0]?.label}</text>
      <text x="676" y="207" textAnchor="end" className="trend-label">{rows.at(-1)?.label}</text>
    </svg>
  );
}

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const session = await getSession();
  if (!session) redirect("/login?next=%2Fdashboard");
  if (!isStaff(session)) notFound();

  const orders = listAllOrders();
  const now = Date.now();
  const data = getDashboardData(orders, new Date(now));
  const maxCityRevenue = Math.max(1, ...data.cityRevenue.map((row) => row.revenue));
  const first = (value) => Array.isArray(value) ? value[0] : value;
  const sortKeys = ["date", "city", "total", "status"];
  const sort = sortKeys.includes(first(params?.sort)) ? first(params.sort) : "date";
  const direction = first(params?.dir) === "asc" ? "asc" : "desc";
  const requestedPage = Number(first(params?.page));
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const compare = {
    date: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    city: (a, b) => a.customer.city.localeCompare(b.customer.city),
    total: (a, b) => a.total - b.total,
    status: (a, b) => trackingFor(a, now).status.localeCompare(trackingFor(b, now).status),
  }[sort];
  const sign = direction === "asc" ? 1 : -1;
  const sortedOrders = [...orders].sort((a, b) => sign * compare(a, b) || b.id - a.id);
  const pageSize = 10;
  const pages = Math.max(1, Math.ceil(sortedOrders.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visibleOrders = sortedOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const dashboardHref = (updates = {}) => {
    const values = {
      sort,
      dir: direction,
      page: currentPage > 1 ? String(currentPage) : "",
      ...updates,
    };
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) if (value) query.set(key, value);
    const search = query.toString();
    return `/dashboard${search ? `?${search}` : ""}#orders`;
  };

  return (
    <section className="page-shell staff-dashboard">
      <div className="page-intro dashboard-intro">
        <span className="eyebrow">MERKATO FINDS · STAFF</span>
        <h1>Dashboard<span className="title-period">.</span></h1>
        <p>Marketplace orders and simulated delivery progress.</p>
      </div>

      <div className="dashboard-notice" role="note">
        Demo dashboard: orders are stored in memory and delivery progress is simulated. Figures are not persistent or live business records.
      </div>

      <div className="dashboard-metrics">
        <article className="dashboard-metric"><PackageCheck /><span>All orders</span><strong>{data.totalOrders}</strong><small>{data.cancelled} cancelled</small></article>
        <article className="dashboard-metric"><Wallet /><span>Revenue</span><strong>{etb(data.revenue)}</strong><small>Cancelled orders excluded</small></article>
        <article className="dashboard-metric"><Truck /><span>Awaiting / preparing</span><strong>{data.awaiting}</strong><small>Simulation status</small></article>
        <article className="dashboard-metric"><BarChart3 /><span>On the way</span><strong>{data.onTheWay}</strong><small>{data.delivered} delivered</small></article>
      </div>

      <div className="dashboard-charts">
        <section className="dashboard-card" aria-labelledby="city-revenue-title">
          <h2 id="city-revenue-title">Revenue by city <span>(ETB · cancelled orders excluded)</span></h2>
          {data.cityRevenue.length ? (
            <>
              <div className="city-bars" aria-hidden="true">
                {data.cityRevenue.map((row) => (
                  <div className="city-bar-row" key={row.city}>
                    <span>{row.city}</span>
                    <span className="city-bar-track"><span style={{ width: `${(row.revenue / maxCityRevenue) * 100}%` }} /></span>
                    <strong>{etb(row.revenue)}</strong>
                  </div>
                ))}
              </div>
              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <caption>Revenue by city, also shown in the chart</caption>
                  <thead><tr><th scope="col">City</th><th scope="col">Orders</th><th scope="col">Revenue</th></tr></thead>
                  <tbody>{data.cityRevenue.map((row) => <tr key={row.city}><th scope="row">{row.city}</th><td>{row.orders}</td><td>{etb(row.revenue)}</td></tr>)}</tbody>
                </table>
              </div>
            </>
          ) : <p className="dashboard-empty-chart">Revenue will appear when a customer places an order.</p>}
        </section>

        <section className="dashboard-card" aria-labelledby="daily-orders-title">
          <h2 id="daily-orders-title">Orders per day <span>(last 14 days · cancelled orders excluded)</span></h2>
          <OrdersTrend rows={data.dailyOrders} />
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <caption>Orders per day, also shown in the chart</caption>
              <thead><tr><th scope="col">Day</th><th scope="col">Orders</th></tr></thead>
              <tbody>{data.dailyOrders.map((row) => <tr key={row.date}><th scope="row">{row.label}</th><td>{row.orders}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="dashboard-card dashboard-orders" id="orders" aria-labelledby="all-orders-title">
        <div className="dashboard-section-heading">
          <div><span className="eyebrow">FULFILMENT</span><h2 id="all-orders-title">Recent orders</h2></div>
          <span>{orders.length} total</span>
        </div>
        {orders.length ? (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <caption>Most recent marketplace orders</caption>
              <thead><tr>
                <th scope="col" aria-sort={sort === "date" ? direction === "asc" ? "ascending" : "descending" : undefined}><Link href={dashboardHref({ sort: "date", dir: sort === "date" && direction === "asc" ? "desc" : "asc", page: "" })}>Order / placed{sort === "date" ? direction === "asc" ? " ▲" : " ▼" : ""}</Link></th>
                <th scope="col">Customer</th>
                <th scope="col" aria-sort={sort === "city" ? direction === "asc" ? "ascending" : "descending" : undefined}><Link href={dashboardHref({ sort: "city", dir: sort === "city" && direction === "asc" ? "desc" : "asc", page: "" })}>Delivery area{sort === "city" ? direction === "asc" ? " ▲" : " ▼" : ""}</Link></th>
                <th scope="col" aria-sort={sort === "status" ? direction === "asc" ? "ascending" : "descending" : undefined}><Link href={dashboardHref({ sort: "status", dir: sort === "status" && direction === "asc" ? "desc" : "asc", page: "" })}>Status{sort === "status" ? direction === "asc" ? " ▲" : " ▼" : ""}</Link></th>
                <th scope="col" aria-sort={sort === "total" ? direction === "asc" ? "ascending" : "descending" : undefined}><Link href={dashboardHref({ sort: "total", dir: sort === "total" && direction === "asc" ? "desc" : "asc", page: "" })}>Total{sort === "total" ? direction === "asc" ? " ▲" : " ▼" : ""}</Link></th>
                <th scope="col">Details</th>
              </tr></thead>
              <tbody>
                {visibleOrders.map((order) => {
                  const status = trackingFor(order, now).status;
                  return (
                    <tr key={order.id}>
                      <th scope="row"><time dateTime={order.createdAt}>{orderRef(order.id)}</time><small>{when(order.createdAt)}</small></th>
                      <td>{order.customer.name}</td>
                      <td>{order.customer.area}, {order.customer.city}</td>
                      <td><span className={`dashboard-status dashboard-status-${status.replaceAll(" ", "-")}`}>{status}</span></td>
                      <td>{etb(order.total)}</td>
                      <td><Link className="dashboard-track-link" href={`/track/${order.id}`}>Track <ArrowUpRight size={14} /></Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <nav className="dashboard-pager" aria-label="Order pages">
              <span>Showing {visibleOrders.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, orders.length)} of {orders.length}</span>
              <div>
                {currentPage > 1 && <Link href={dashboardHref({ page: String(currentPage - 1) })}>Previous</Link>}
                <span>Page {currentPage} of {pages}</span>
                {currentPage < pages && <Link href={dashboardHref({ page: String(currentPage + 1) })}>Next</Link>}
              </div>
            </nav>
          </div>
        ) : (
          <div className="dashboard-empty">
            <PackageCheck size={34} />
            <h3>No orders yet</h3>
            <p>Marketplace orders will appear here after a customer checks out.</p>
            <Link href="/shop" className="button button-outline">Browse the shop</Link>
          </div>
        )}
      </section>
    </section>
  );
}
