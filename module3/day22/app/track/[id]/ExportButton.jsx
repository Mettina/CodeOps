"use client";
// [DAY 47 · EXERCISE 7] CSV export of the order history. The rows are already on
// screen (passed from the server page), so the file is built in the browser:
// instant, nothing on the server. Past a few thousand rows it should be a route handler.
import { download, toCsv } from "@/lib/csv";
import { when } from "@/lib/format";

export default function ExportButton({ orders }) {
  function onClick() {
    const rows = orders.map((o) => ({
      order: o.id,
      placed: when(o.createdAt),
      name: o.name,
      area: o.area,
      items: o.items.map((i) => `${i.quantity} x ${i.name}`).join("; "),
      total_etb: o.total,
      status: o.status,
    }));
    download(toCsv(rows), "addis-eats-orders.csv");
  }
  return (
    <button type="button" className="button" onClick={onClick} disabled={orders.length === 0}>
      Export orders (CSV)
    </button>
  );
}
