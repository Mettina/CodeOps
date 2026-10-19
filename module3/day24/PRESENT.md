# Presentation notes (8 minutes). Say it aloud once, with a timer.

Open these five files in tabs BEFORE you start:
1. `components/DishCard.jsx` (server component)
2. `app/track/[id]/TrackingLive.jsx` (client component)
3. `app/actions/cancelOrder.js` (protected action)
4. `app/orders/page.js` (data query)
5. `lib/format.js` (the refactor)

## Timing

| Minutes | Say / do |
|---|---|
| 0-1 | "Addis Eats lets someone in Addis order Ethiopian food and follow the delivery live." One sentence on who and what. No code. |
| 1-3 | On the live URL: menu, add two dishes, checkout, place order, click "Track your delivery", show the map, the status changing and the "Live" label. Export the CSV. |
| 3-5 | ONE technical decision (see below). |
| 5-6 | The three attacks, refused. Show the three results in VERIFY.md and point at the line that refused each. |
| 6-7 | PERF.md: before, after, the cause. Say honestly which targets were missed. |
| 7-8 | What you cut (FUTURE.md) and what you would do with another week. |

## The one decision (pick one; these are all true of this code)

- **Ownership in the query, not in the page.** `getOrder(id, session.user)` takes the owner as an argument, so a wrong id cannot return someone else's order even if a page forgets to check. Used by `/orders/[id]`, `/track/[id]`, the API, the stream and `cancelOrder`.
- **Seeded, then live.** The server renders the first status so there is no spinner; `EventSource` only updates it. Chosen over polling (wasted requests) and WebSockets (a second protocol, and serverless will not hold one).
- **Idempotent order placement.** Disabled button is not enough; a per-form key means a repeat submit returns the same order.

## Files: what to say

| File | Why |
|---|---|
| `DishCard.jsx` | Server component: it only renders data and links. The only interactive part, the cart button, is its own small client leaf (`AddToCartButton`), so the card ships no JavaScript of its own. |
| `TrackingLive.jsx` | Has to be a client component: it uses `useState`, `useEffect` and `EventSource`, which exist only in the browser. The map is a further leaf loaded with `ssr:false` because Leaflet touches `window` on import. |
| `cancelOrder.js` | Two checks inside the action itself: `getSession()` (line 8) then the owner-scoped `getOrder` (line 14). Hiding the button proves nothing. |
| `orders/page.js` | Runs on the server; the list is scoped by `listOrders(session.user)` and sort and page come from the URL, validated by an allowlist. |
| `lib/format.js` | Refactor: before, prices were printed by hand (`{dish.price} ETB`) in several components; now every price goes through `etb()`, each `Intl` formatter is built once and names its locale and time zone. |

## Questions you will be asked

| Question | Answer from this project |
|---|---|
| Why is this a client component? | State, effects and `EventSource` need the browser. |
| What happens if I call this action signed out? | `getSession()` returns null and the action returns "Please sign in..."; middleware lets action POSTs through on purpose so the action can answer. |
| Why this rendering strategy? | Anything reading the cookie is dynamic (`ƒ`); menu detail pages are static from `generateStaticParams`. See STRATEGY.md. |
| What would you do with another week? | A database, real credentials, a courier endpoint, tests (FUTURE.md). |
| Hardest part? | Be honest. For example: keeping the stream private and closing it correctly on unmount and on delivery. |

"I do not know" is fine once, followed by how you would find out.
