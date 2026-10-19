import Link from "next/link";
import { etb, formatDateTime } from "@/lib/format";

const COLUMNS = [
  { key: "id", label: "Order" },
  { key: "date", label: "Placed" },
  { key: "area", label: "Area" },
  { key: "total", label: "Total", numeric: true },
  { key: "status", label: "Status" },
];

// Server component: real table markup, nothing shipped to the browser.
// sortHref(key, dir) builds the URL for a header link; sort/dir mark the active column.
export default function OrderTable({ rows, caption, sort, dir, sortHref, linkOrders = false }) {
  return (
    <div className="table-scroll" role="region" aria-label={`${caption} (scrolls sideways on narrow screens)`} tabIndex={0}>
      <table className="data-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {COLUMNS.map((col) => {
              const active = sort === col.key;
              // First click: numbers and dates start high-to-low, text starts A to Z.
              const firstDir = col.key === "area" || col.key === "status" ? "asc" : "desc";
              const nextDir = active ? (dir === "asc" ? "desc" : "asc") : firstDir;
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={col.numeric ? "num" : undefined}
                  aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : undefined}
                >
                  <Link href={sortHref(col.key, nextDir)} className="sort-link">
                    {col.label}
                    <span aria-hidden="true">{active ? (dir === "asc" ? " ▲" : " ▼") : ""}</span>
                  </Link>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((order) => (
            <tr key={order.id}>
              <th scope="row">
                {linkOrders ? <Link href={`/orders/${order.id}`}>#{order.id}</Link> : `#${order.id}`}
              </th>
              <td><time dateTime={order.createdAt}>{formatDateTime(order.createdAt)}</time></td>
              <td>{order.area}</td>
              <td className="num">{etb(order.total)}</td>
              <td className="status-cell">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
