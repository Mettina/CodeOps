# Rendering strategy

The markers below are from the production build route table. `○` means static,
`●` means prerendered from static params, and `ƒ` means rendered on demand.

| Route | Strategy | Build marker | Reason |
|---|---|---|---|
| `/` | Static | `○` | The landing page contains no request-specific data. |
| `/menu` | Dynamic server rendering | `ƒ` | The selected page and category come from request query parameters; initial dish data is rendered on the server. |
| `/menu/[id]` | Static via `generateStaticParams` | `●` for each generated dish path | The dish IDs are known at build time; ungenerated IDs return 404 and missing data uses `notFound()`. |
| `/cart` | Client | `○` | Cart contents belong to this browser tab and come from client context. |
| `/checkout` | Dynamic | `ƒ` | The page reads the signed-in session cookie before rendering. |
| `/signin` | Dynamic | `ƒ` | The return destination comes from request search parameters. |
| `/my-orders` | Dynamic | `ƒ` | The page reads the session cookie and filters orders for that user. |
| `/orders` | Dynamic | `ƒ` | Orders are read from the server-side in-memory store per request. Sort and page come from `searchParams`. |
| `/dashboard` | Dynamic | `ƒ` | Staff only. Reads the session, live orders and `searchParams` (sort, page, demo flags) on every request. |

## Route handlers

| Endpoint | Strategy | Reason |
|---|---|---|
| `/api/dishes` | Request-time handler | Returns the requested page of menu data, optionally filtered by search term and category. |
| `/api/dishes/[id]` | Request-time handler | Looks up an individual dish and returns a 404 for an unknown ID. |
| `/api/orders` | Request-time handler | Validates each submitted order and writes valid orders. |
