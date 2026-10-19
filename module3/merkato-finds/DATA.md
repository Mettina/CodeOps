# Merkato Finds: where each piece of data lives

Rule used: **server unless the person triggers it** (types, or it belongs to this browser).

## Sources

- **Catalog:** `src/data/products.js`: 6 categories and 12 products (`id` is a string, `price` an integer in ETB).
  It is a static module, not a database. There are no catalog API routes.
- **Orders:** `src/lib/orderStore.js`, an in-memory list on the server, written only by the `placeOrder` and
  `cancelOrder` server actions and read only through owner-scoped functions.
- **Delivery progress:** `src/lib/tracking.js` calculates a clearly labeled demonstration timeline from the
  order time and destination city. `/track/[id]` streams those updates; it is not connected to a carrier or GPS.
- **Bag and wishlist:** the browser's localStorage, through `StoreProvider`.

## Queries and writes

| Data | Where | Code | Why |
|---|---|---|---|
| Product detail | Server, static | `product/[id]/page.js` reads the catalog; `generateStaticParams` prerenders all 12; `generateMetadata` gives each its own title, description and share image | Public, indexable, cacheable. An unknown id is a 404. |
| Home, category and shop pages | Server shell + client leaf | The server page renders the heading and meta; `ListingPage` (client) filters, sorts and searches the catalog in memory | Filtering is triggered by typing and clicking, and 12 items need no network call. The whole catalog is in that client bundle, which is fine at this size (see FUTURE.md). |
| Search, sort, category filter | Client, in memory | `ListingPage.js` `useMemo` | Triggered by the person. The state is not in the URL (cut, see FUTURE.md). |
| Bag and wishlist | Client | `StoreProvider.js`, mirrored to localStorage after mount | They belong to this browser and never leave it. Read after mount so the server HTML and the browser agree. |
| Place an order | Server action | `placeOrder.js`: session, idempotency key, `createOrder` validates and prices from the catalog | The browser only says which ids and how many; the server decides prices, owner and totals. |
| Order list | Server | `orders/page.js` `listOrders(session.user)` | Private; scoped to the session, never to an id from the browser. |
| One order | Server | `order-success/page.js` `getOrder(id, session.user)` | The id is not authority; ownership is part of the lookup. |
| Cancel an order | Server action | `cancelOrder.js` | Session, then owner-scoped lookup, then the write. |
| Track an order | Server page + event stream | `track/[id]/page.js`, `api/orders/[id]/stream/route.js`, `lib/tracking.js` | Owner-only for customers; staff allowlist may inspect any order. Status, route and ETA are simulated. |
| Staff dashboard | Server page | `dashboard/page.js`, `lib/dashboard.js` | Requires a signed-in email listed in `STAFF_EMAILS`; totals and charts are aggregated on the server. |
| Prices and times | Formatted at the edge | `src/lib/format.js` (`etb`, `when`, `orderRef`); each `Intl` formatter is built once and names its locale and `Africa/Addis_Ababa` | Same text on server and browser; money stays an integer in the data. |
