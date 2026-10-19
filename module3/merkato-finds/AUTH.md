# Merkato Finds authentication and authorization

A learning exercise, not production authentication: sign-in takes a name and an email with **no
password**, and the email is not verified. What is real is the structure: a signed session cookie,
session checks on private pages and actions, ownership built into every customer order lookup, and a safe return link.

## Session

- `src/lib/session.js`: `createSession` writes the cookie `session = base64url({n: name, e: email}).HMAC-SHA256`,
  signed with `SESSION_SECRET`. `getSession()` re-computes the signature (constant-time compare) and returns
  `{ user, name, email }` or `null`. Changing the email in the cookie breaks the signature.
- Cookie flags: `httpOnly` (JavaScript cannot read it), `sameSite: "lax"`, `path: "/"`, seven days,
  `secure` in production. See [`session.js` L16-L24](./src/lib/session.js#L16).
- `session.user` is the lower-cased email. It is the **owner key**: every order lookup compares against it.
- `SESSION_SECRET` is read only on the server and is not a `NEXT_PUBLIC_` variable.

## Layers per route

| Route / resource | Layer 1: middleware | Layer 2: page or action | What the layers prove |
|---|---|---|---|
| `/`, `/shop`, `/product/[id]`, category pages | Not matched (public by design) | Public catalog data only | Nothing private is reachable here. |
| `/checkout` | Needs a validly signed cookie, else redirect to `/login?next=...` | `checkout/page.js` L13 calls `getSession()` | Signed in. |
| `placeOrder` (server action) | Not a route: action POSTs pass through on purpose | `placeOrder.js` L11 `getSession()`; owner comes from the session; prices come from the catalog (`lib/orders.js`); `findOrderByKey` (L19) makes a repeat submit return the same order | A forged request cannot create an order while signed out, cannot set its own owner or prices, and a double tap cannot create two. |
| `/orders` | Same cookie gate | `orders/page.js` L15 session, L19 `listOrders(session.user)` | Only the owner's orders are returned. |
| `/track/[id]` and its event stream | Page and route handler verify the signed session | Customer order lookup is owner-scoped; `STAFF_EMAILS` allows staff to inspect any order | Tracking is demo data; unauthorized order IDs return not found. |
| `/dashboard` | Same cookie gate | `dashboard/page.js` checks `isStaff(session)` before reading all orders | Only configured staff emails see the staff dashboard. |
| `/order-success?id=` | Same cookie gate | `order-success/page.js` L16 session, L20 `getOrder(id, session.user)` | Another account's id is "not found". |
| `cancelOrder` (server action) | Not a route | `cancelOrder.js` L9 session, L14 `getOrder(id, session.user)`, then L18 `markCancelled(id, session.user)` | A session and a matching owner are both required before state changes. |
| `/account` | Same cookie gate | `account/page.js` L14 session | Signed in; shows only this person's name, email and order count. |
| `/login`, `/signup`, `signIn`, `signOut` | Not matched | `signIn` validates input and the return link, then creates the cookie | Session lifecycle, not order data. |

Middleware ([`middleware.js` L35](./src/middleware.js#L35)) verifies the HMAC with Web Crypto and redirects
signed-out requests. Its matcher ([L52](./src/middleware.js#L52)) names the private routes, so public pages,
static files and images never run it. Middleware is never the only check: every page and action repeats the session check.

## Staff dashboard demo access

`STAFF_EMAILS` is a comma-separated allowlist read by `src/lib/staff.js`. Set it in `.env.local` and in each deployment
environment for any account that should open `/dashboard`. Staff also need to sign in normally. Since this learning app
does not use passwords or verify email ownership, this allowlist is **not production-grade authorization**: anyone can
currently claim an allowlisted email at sign-in. Use a real identity provider and server-verified staff roles before
exposing customer data or staff operations in production.

## Redirect validation (attack 3)

`getSafeNextPath` ([`redirects.js` L6](./src/lib/redirects.js#L6)) accepts only same-site paths that start with one
slash, rejects `//host` and backslashes, then allowlists `/checkout`, `/account`, `/dashboard`, `/orders`,
`/order-success` and numeric `/track/[id]` paths.
Everything else falls back to `/account` ([L26](./src/lib/redirects.js#L26)). It is called by the login page
([`login/page.js` L8](./src/app/login/page.js#L8)) and again by the action ([`auth.js` L11](./src/app/actions/auth.js#L11)).

## The attacks: how to run them, and the line that refuses each

Run on `npm run start`, then again on the deployed URL. A refusal only counts if you can point at the line.

| # | Attack | How to run it | Expected | Line that refuses it | Result |
|---|---|---|---|---|---|
| 1 | Signed out, call an action | Window 1: signed in, bag filled, on `/checkout` with the form filled in. Window 2: `/account`, click **Sign out**. Window 1: click **Place demo order**. | "Please sign in before placing an order." No order is created. | [`placeOrder.js` L11](./src/app/actions/placeOrder.js#L11); also `cancelOrder.js` L9 | ☐ record |
| 2 | Signed in as someone else, use their order id in a write | As B on `/orders`, change the hidden `id` of the Cancel form to A's order id (snippet below), submit. | "Order not found."; A's order stays `received`. Refused on ownership, not on session. | [`cancelOrder.js` L14](./src/app/actions/cancelOrder.js#L14) via `getOrder(id, session.user)` in [`orderStore.js`](./src/lib/orderStore.js) | ☐ record |
| 3 | Crafted sign-in link | Open `/login?next=https://example.com`, sign in. | Lands on `/account`, never on example.com. | [`redirects.js` L6-L26](./src/lib/redirects.js#L6) | ☐ record |
| 4 | Change the id in the URL | As B open `/order-success?id=<A's order id>`. | Not found (404). `/orders` lists only B's orders. | [`order-success/page.js` L20](./src/app/order-success/page.js#L20) | ☐ record |
| 5 | Tamper with the price | On `/checkout`, in DevTools edit the hidden `items` input (add `"price":1` or change a quantity), submit. | The total on `/orders` is computed from the catalog, never from the browser. | [`orders.js` `createOrder`](./src/lib/orders.js): looks each id up in `products` | ☐ record |

```js
// Attack 2, in the DevTools Console on /orders as customer B (use A's real order id)
const form = [...document.querySelectorAll("form")].find((f) => f.textContent.includes("Cancel order"));
form.querySelector('input[name="id"]').value = "1";
form.requestSubmit();
```

## Logic checks run on the code

The pure logic was exercised outside the browser: catalog pricing ignores a browser-supplied price, an unknown id
or a bad quantity is dropped, an empty bag is refused, another owner's id returns nothing and cannot be cancelled, an
idempotency key returns the same order, each crafted `next` falls back to `/account`, and the middleware accepts a validly
signed cookie while refusing a missing one, a wrong secret, and a swapped payload with an old signature.

## Known limits

- No password and no email verification: anyone can sign in as any email address they type.
- The order store is in memory, so ownership checks are only as durable as the server process.
- Server Action POSTs bypass middleware by design; that is why each action checks the session itself.
