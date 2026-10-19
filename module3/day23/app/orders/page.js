import { redirect } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import OrderTable from "@/components/OrderTable";
import Pager from "@/components/Pager";
import { applyDemo } from "@/lib/demo";
import { listOrders } from "@/lib/orderStore";
import { getSession } from "@/lib/session";
import { queryOrders, readTableParams } from "@/lib/stats";
import { buildHref, first } from "@/lib/url";

export const dynamic = "force-dynamic";

// [EXERCISE 2] Private route: own title + description, kept out of search results.
export const metadata = {
  title: "Orders",
  description: "Your Addis Eats orders.",
  robots: { index: false, follow: false },
};

export default async function OrdersPage({ searchParams }) {
  const sp = await searchParams;
  const session = await getSession();
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(buildHref("/orders", sp))}`);
  }

  // [DAY 46] ?demo=slow|error|empty shows each state on demand.
  const demo = await applyDemo(sp.demo);
  const keep = { demo };

  // The query is scoped to the session's own user: the URL cannot widen it.
  const orders = demo === "empty" ? [] : listOrders(session.user);

  const table = readTableParams(sp);
  const result = queryOrders(orders, table);
  const sortHref = (key, dir) => buildHref("/orders", { ...keep, sort: key, dir });
  const pageHref = (page) =>
    buildHref("/orders", { ...keep, sort: table.sort, dir: table.dir, page: page > 1 ? page : undefined });

  return (
    <section>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <EmptyState title="No orders yet" action={{ href: "/menu", label: "Browse the menu" }}>
          Browse the menu to place your first order. It will show up here once you have.
        </EmptyState>
      ) : (
        <>
          <OrderTable
            rows={result.rows}
            caption="Your orders. Use the column headings to sort."
            sort={table.sort}
            dir={table.dir}
            sortHref={sortHref}
            linkOrders
          />
          <Pager {...result} hrefFor={pageHref} />
        </>
      )}
    </section>
  );
}
