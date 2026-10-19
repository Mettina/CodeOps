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
