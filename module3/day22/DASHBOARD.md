# Addis Eats dashboard (Day 46: data representation)

## What was built

| Screen | Who | What it shows |
|---|---|---|
| `/dashboard` | Staff only | Revenue by neighbourhood (bar), orders per day (line), each followed by the same data as a table, then a sortable, paged table of all orders. |
| `/orders` | Signed-in customer | Their own orders in the same table: sorted and paged from the URL, with a real empty state. |

Try it: `STAFF_USERS=chef` in `.env.local`, `npm run build && npm run start`, sign in as `chef`,
open `/dashboard?data=sample` (48 generated orders over 14 days; nothing is stored).

## Chart or table?

| Question | Answer | Why |
|---|---|---|
| Which neighbourhood earns most? | Bar chart | The shape and the ranking are the point. |
| Are orders growing? | Line chart | Change over time. |
| What did order 1032 cost? | Table row | One exact value to look up. |
| Payment split, delivery time against distance | Not built | There is no payment or distance data yet. If added: a horizontal bar, and a scatter. No pie. |

## Requirements, one by one

| Requirement | Where it is met |
|---|---|
| Aggregation on the server, only summaries cross | `lib/stats.js` (`revenueByArea`, `ordersPerDay`), called in `app/dashboard/page.js`. The chart props are mapped to `{area, revenue}` and `{label, orders}`: 7 + 14 rows for the sample data. |
| Charts are client leaves on a server page, with heading, unit and fixed height | `components/RevenueChart.jsx` and `OrdersChart.jsx` are the only client code on the page. Each has an `h2` naming the unit (and the date range for the line) and sits in `.chart-box`, a fixed CSS height of 320 px (280 px on phones). |
| Formatted in ETB | `lib/format.js` has one `etb()` formatter, used by the axis, the tooltip, the bar labels and the tables. The Y axis has an explicit `width`. |
| Readable without colour | Single series, so no colour key exists. Bars carry their value as a printed label, the line has dots, and every chart has its table. |
| Every chart has its data in a table | `components/DataTable.jsx` under each chart (`caption`, `th scope`). |
| Real table markup | `components/OrderTable.jsx` and `DataTable.jsx`: `table`, `caption`, `thead`, `th scope="col"`, row headers with `th scope="row"`. No divs. Numbers are right-aligned with tabular figures. |
| Sorting in the URL | `?sort=total&dir=desc`. Header links, with `aria-sort` on the active column. `readTableParams()` allowlists the sort key, direction and page. |
| Paging in the URL with `Link` | `components/Pager.jsx`: `?page=3`, real links, `aria-current="page"`, `rel=prev/next`. |
| Four states, each demonstrable | See below. |

## The four states

| State | Where it is written | Force it |
|---|---|---|
| Loading | `app/dashboard/loading.js`, `app/orders/loading.js`: skeletons with the same heights as the real content. | `/dashboard?demo=slow&data=sample` (waits 2.5 s) |
| Empty | `components/EmptyState.jsx`. Dashboard: "No orders yet" with a link to preview sample data. Orders: "Browse the menu to place your first order" with a link to `/menu`. | `?demo=empty`, or a new account on `/orders` |
| Error | `components/ErrorState.jsx` via `error.js` in both segments, with a retry button. | `?demo=error` |
| Loaded | The pages themselves. | `?data=sample` on the dashboard |

The demo flags run only after the session (and, on the dashboard, the staff role) has been checked.
They change what is displayed; they never touch stored orders.

## Honest-chart rules applied

- The bar axis is `domain={[0, "auto"]}`: bars start at zero.
- Units are named in the headings ("ETB", "number of orders") and the Y axis of the line is labelled.
- The time range is stated: "Orders per day, 5 Oct to 18 Oct 2026", and days with no orders are drawn as zero rather than skipped.
- One scale per chart, one series per chart.
- Cancelled orders are excluded from both charts, and the headings say so.

## Check yourself

- **Does every bar chart axis start at zero?** Yes: `domain={[0, "auto"]}` in `RevenueChart.jsx`.
- **Can you read every chart with the colour removed?** Yes: values are printed on the bars, the line has markers, and a table sits under each.
- **How many rows cross the network for the dashboard?** Three kinds, all small: 7 neighbourhood rows, 14 day rows and 10 table rows (sample data). Not 48 orders, and not four thousand.
- **Does the table survive being copied into a spreadsheet?** Yes, because it is a real `table`. Select it and paste: columns stay columns.
- **Can you link someone directly to page three sorted by total?** `/dashboard?sort=total&dir=desc&page=3` (staff must be signed in; others are sent to sign-in and returned to that exact URL).
- **What does a brand-new customer see on the orders page?** "No orders yet. Browse the menu to place your first order." with a Browse the menu button.

## Known limits

- Orders live in server memory (see README), so on a serverless host they can vanish between requests. The sample-data flag exists so the dashboard can still be demonstrated.
- Sign-in is name-only, as before. Staff access is an allowlist for learning, not production authentication.
- Recharts was added in this step. Run `npm install` once to refresh `package-lock.json`, then commit it.
