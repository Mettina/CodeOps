# Menu data and paging

## Data source

The menu and reviews are defined in `lib/data.js`. Each dish has an integer `id`,
`name`, `price` (ETB), `category`, `description`, and local `image` path. Dish IDs
are used by menu links, cart items, and orders. Reviews refer to dishes through
`dishId`.

The current menu contains 21 dishes across the categories in `categories`. Data is
held in memory for this demo; it is not persisted between server restarts.

## Pagination and filtering

- Menu pages use the one-based `page` query parameter, for example
  `/menu?page=2`. Optional `search` and `category` parameters are preserved
  while paging, for example `/menu?page=2&search=doro&category=Main`.
- The page size is six dishes. With the current dataset, pages contain 6, 6, 6,
  and 3 dishes.
- Missing, invalid, or non-positive page values default to page 1. A page above
  the available range is clamped to the last page (or page 1 when there are no
  matches).
- Optional `search` is trimmed and case-insensitive; it matches dish name,
  category, or description.
- Optional `category` limits results to the selected menu category. Search and
  category filtering happen before pagination.

## Dishes API

`GET /api/dishes` accepts optional `page`, `search`, and `category` parameters:

```text
/api/dishes?page=2&search=doro&category=Main
```

It returns a JSON object:

```json
{
  "dishes": [
    {
      "id": 1,
      "name": "Doro Wot",
      "price": 240,
      "category": "Main",
      "description": "Slow-cooked chicken stew in spiced berbere sauce with a boiled egg, served with injera.",
      "image": "/img/doro wot.jpg"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 6,
  "totalPages": 1,
  "category": "Main"
}
```

`dishes` contains only the requested page. `total` and `totalPages` describe the
filtered result set. The menu server page supplies its initial page data.

## SWR queries

| Query | SWR key | Refresh rule | Reason |
|---|---|---|---|
| Order status | `/api/orders/${id}` | Poll every 5 seconds; SWR also revalidates on focus and reconnect using its defaults. | Order status can change while the screen is open, so periodic polling keeps it current without an overly frequent request. `fallbackData` from the server renders the first view without a loading spinner. |
| Menu search | `/api/dishes?search=${term}&page=${page}&category=${category}` when the debounced term is non-empty; otherwise `null`. | No interval; fetch on a debounced key change, with SWR's default focus/reconnect revalidation. | Search data changes only when the user changes the search or paging/filter inputs. `keepPreviousData` keeps the existing list visible until the new result arrives. |

The shared `lib/fetcher.js` is used by both queries. It parses JSON and throws an
error for non-OK HTTP responses, so SWR exposes failures through its `error`
result.

This project uses SWR, not TanStack Query, so it has no `staleTime` option. SWR
uses its revalidation and deduplication defaults; the order query's explicit
`refreshInterval` is 5000 ms, and menu search has no polling interval.
SWR deduplicates concurrent requests that share the same key (2 seconds by
default). The current screen has one consumer per key, so verify this behavior
only if the same key is later rendered by multiple components.

## Day 45: where every piece of data is fetched

Rule: **server unless the person triggers it** (types, or it must keep refreshing).

| Data | Where | Code | Why |
|---|---|---|---|
| Menu and dishes | Server | `app/menu/page.js` calls `getDishPage`; `app/menu/[id]/page.js` calls `getDish` (static via `generateStaticParams`) | Public, indexable, cacheable. Crawlers get full HTML. |
| Order history | Server | `app/orders/page.js` and `app/my-orders/page.js` call `listOrders(session.user)` | Private; the query is scoped to the session, never to an id sent by the browser. |
| Order status | Server first, then polled on the client | `app/orders/[id]/page.js` loads the order with `getOrder(id, session.user)` and passes it as `fallbackData` to `components/OrderStatus.jsx`, which polls `/api/orders/${id}` every 5 s | Data is on arrival (no spinner); it can change while the page is open. |
| Menu search | Client, debounced | `components/FilterShell.jsx`: 300 ms `setTimeout`, then SWR on `/api/dishes?search=...` | Triggered by typing, so it cannot run on the server ahead of time. The first view is seeded with `initialData` from the server. |
| Cart | Client store | `context/CartContext.jsx`, shown by `components/CartView.jsx` | It belongs to this browser and never leaves it. |

The two client queries are the two the brief asks for: **one polled query**
(order status, `refreshInterval: 5000`) and **one debounced search** (menu search,
300 ms). Both are seeded with server data, so neither shows a spinner on arrival.

How to verify (Network tab, "Fetch/XHR" filter, cache disabled):

- Type `doro` quickly in the menu search: one `/api/dishes?search=doro...` request after you pause, not one per letter.
- Open `/orders/<your id>`: the order is on screen immediately; a request to `/api/orders/<id>` repeats about every 5 seconds.

## Day 46: aggregation, sorting and paging (where each piece runs)

| Data | Where it is computed | What crosses to the browser |
|---|---|---|
| Revenue by neighbourhood | `revenueByArea()` in `lib/stats.js`, called in `app/dashboard/page.js` (server). Cancelled orders excluded; area names normalised. | One row per neighbourhood (at most 7 for the sample data) |
| Orders per day | `ordersPerDay()` in `lib/stats.js` (server). Last 14 days in Addis Ababa time, zeros included. | 14 rows |
| Order table | `queryOrders()` sorts, then slices one page (10 rows). | Table HTML for 10 rows; the table is a server component, so there is no table code in the bundle |
| Sort and page | `readTableParams()` reads `?sort=&dir=&page=` and rejects anything not on the allowlist. | Nothing: they are plain links |

The dashboard sends **21 summary rows plus 10 table rows**, not every order. Sample data
(`?data=sample`, `lib/sampleOrders.js`) is generated on the server per request and never stored.
Sortable columns: `id`, `date`, `area`, `total`, `status`. An invalid value falls back to
`date`, `desc`, page 1; a page past the end is clamped to the last page.

## Day 47-48: the live stream, formatting and writes

| Data | Where | Key / rule | Reason |
|---|---|---|---|
| Delivery status and courier position | Server first, then a stream | `app/track/[id]/page.js` computes the first snapshot with `trackingFor(order)` and passes it as `initial`; `TrackingLive.jsx` opens one `EventSource` on `/api/orders/${id}/stream`. The server pushes a snapshot every 2 s and closes the stream when the order is `delivered` or `cancelled`. The client closes it on unmount. | Updates are frequent and one-way, so server-sent events beat polling (wasted requests) and WebSockets (a second protocol, and serverless hosting will not hold one open). Order status itself still polls with SWR on `/orders/[id]`; two mechanisms are used on purpose, one per screen. |
| Prices and times | Formatted at the edge | `lib/format.js` (`etb`, `when`, `relative`, `clockTime`), each `Intl` formatter built once, locale and `Africa/Addis_Ababa` named | Same text on the server and in the browser, so no hydration mismatch. Money stays an integer in the data. |
| CSV export | Client, from rows already on screen | `lib/csv.js` `toCsv` quotes commas, quotes and newlines; `download` uses a Blob and revokes the URL | Instant and free for a few rows. Past a few thousand rows it must move to a route handler. |
| Place order (write) | Server action | `placeOrder` reads a hidden `idempotencyKey` (made once per form in `CheckoutForm.jsx`); `findOrderByKey(owner, key)` returns the order already made | A double tap on a slow connection cannot create two orders. The button is also disabled while pending. |
