# Addis Eats authentication and authorization

This document describes the security boundaries (built on Day 42, assessed in the Day 45 project). It is a learning
exercise, not production authentication: sign-in accepts a name without a
password, and the in-memory order store is not durable.

## Session and role

**Sign-in identity (name and email).** The sign-in form asks for a name and an email
(`lib/identity.js` validates both on the server). The email, lower-cased, is the
account key: `session.user` is the email, and every ownership check (`listOrders`,
`getOrder`, `markCancelled`, the order APIs) compares against it, so two people who
type the same name never share orders. The name is only for display ("Signed in as
Almaz"). The cookie holds both as base64url JSON, signed with HMAC-SHA256, so changing
the email in the cookie breaks the signature. Email addresses are not verified (no
confirmation link), so this is still a learning exercise, not production authentication.
Cookies from the old name-only format are rejected and the visitor is asked to sign in again.

- `lib/session.js` is the server-side session helper used by pages, server
  actions, and route handlers. `getSession()` reads the `session` cookie,
  verifies its HMAC-SHA256 signature with `SESSION_SECRET`, and returns the
  authenticated name, email and server-derived role. Invalid or absent cookies return
  `null`.
- The cookie is `httpOnly`, `sameSite: "lax"`, scoped to `/`, and valid for seven
  days. `secure` is set to `true` in production and `false` for local HTTP
  development. JavaScript cannot read an HttpOnly cookie through
  `document.cookie`.
- `SESSION_SECRET` is read only by server code and must not use a `NEXT_PUBLIC_`
  name. Do not commit `.env.local`. The signing key is not needed by the client.
- `STAFF_USERS` is a server-only, comma-separated allowlist, for example
  `STAFF_USERS=chef,manager` (each entry may be a name or an email address). The role is derived after signature validation;
  users cannot select or submit their own role. An absent list grants no staff
  roles.

## Protected routes and enforcement layers

The middleware matcher is deliberately limited to `/checkout`, `/dashboard`, `/kitchen`,
`/my-orders`, `/orders` and `/track`, including nested paths. It does not match menu
routes, API routes, `/_next/static` chunks, or public image paths. Middleware
validates the signed cookie with Web Crypto (the Edge-compatible equivalent of
the Node-based session helper), redirects signed-out page requests to sign-in,
and puts the original path and query in `next`. It lets Next.js Server Action
POSTs reach the action, because each action must perform its own session and
ownership checks and return an action-compatible response.

| Route/resource | Middleware | Server page/handler | What the layer proves |
|---|---|---|---|
| `/menu`, `/menu/[id]`, `/` | Not matched (public by design). | Server pages render public dish data only. | Nothing private is reachable here; the pages stay indexable. |
| `/checkout` | Requires a valid signed cookie; preserves path in `next`. | `app/checkout/page.js` calls `getSession()` before rendering. `placeOrder` checks the session again before saving. | Page and mutation both require an authenticated user; new order ownership is taken from that session, not the request. |
| `/my-orders` | Requires a valid signed cookie and preserves `next`. | `app/my-orders/page.js` calls `getSession()` and queries `listOrders(session.user)`. | The page requires a session and returns only that user's orders. |
| `/orders` | Requires a valid signed cookie and preserves `next`. | `app/orders/page.js` calls `getSession()` and queries `listOrders(session.user)`; sorting and paging run on that already-scoped list. | Another account's order is not included in the list, whatever `?sort=` or `?page=` says. |
| `/orders/[id]` | Requires a valid signed cookie and preserves the detail URL in `next`. | `app/orders/[id]/page.js` calls `getSession()` and uses `getOrder(id, session.user)`. `GET /api/orders/[id]` repeats the session and owner-scoped lookup. | The requested ID is not authority; an order is returned only when its owner matches the session. A foreign or missing order is not found. |
| `/dashboard` (Day 46) | Requires a valid signed cookie and preserves the path and query in `next`. | `app/dashboard/page.js` calls `getSession()`, checks `session.role === "staff"` (non-staff get not found), and only then reads orders. The demo flags run after those checks. | Aggregates and the all-orders table are staff-only. Only summary rows reach the browser, and sort/page values are validated by `readTableParams` before use. |
| `/kitchen` | Requires a valid signed cookie and preserves `next`. | `app/kitchen/page.js` calls `getSession()`, checks `session.role === "staff"`, then calls `listAllOrders()`. | Only a server-verified staff role can read across account ownership. Non-staff users receive not found. |
| `POST /api/orders` | Not included in the page matcher. | The route handler calls `getSession()` before reading/creating the order and assigns `owner: session.user`. | API access does not rely on middleware; only an authenticated account can create an order for itself. |
| `/track/[id]` (Day 47) | Requires a valid signed cookie; preserves `next`. | `app/track/[id]/page.js` calls `getSession()` and `getOrder(id, session.user)`; a foreign or missing id is not found. | Someone else's delivery (and its map position) cannot be opened by changing the id. |
| `GET /api/orders/[id]/stream` (Day 47) | Not matched (API routes never are). | `stream/route.js` calls `getSession()` (401), then `getOrder(id, session.user)` (404), and re-reads the order on every tick with the same owner. | The live stream is as private as the order itself; it does not rely on the page that opened it. |
| Server action `placeOrder` | Not a route matcher. | Calls `getSession()` before validation or saving. Day 48: a per-form idempotency key means a repeated submit returns the order already made (`findOrderByKey(session.user, key)`), scoped to the same owner. | A forged client request cannot create an order while signed out; owner comes from the session; a double tap cannot create two orders. |
| Server action `cancelOrder` | Not a route matcher. | Calls `getSession()`, calls `getOrder(id, session.user)`, then `markCancelled(id, session.user)`. | A session and matching owner are required before order state changes. A foreign order behaves as not found. |
| Server actions `signIn` / `signOut` | Not a route matcher. | `signIn` creates the signed cookie and validates `next`; `signOut` deletes the cookie. | These are session lifecycle actions, not order mutations. Sign-in takes a name and an unverified email, with no password, so it is not production authentication. |
| `GET /api/dishes` and `GET /api/dishes/[id]` | Not matched. | Public read-only handlers. | Menu data is intentionally public. |

The server action functions are not protected merely because a button or form is
hidden. Each order mutation repeats its authentication and ownership checks at
the server boundary. API handlers similarly enforce their own checks rather
than relying on middleware.

## Key enforcement locations

- Middleware's signed-cookie gate and redirect are in
  [`middleware.js`](./middleware.js#L47); the narrow route matcher is at
  [`middleware.js`](./middleware.js#L67).
- Cookie flags and signature verification are in
  [`session.js`](./lib/session.js#L24) (`createSession`) and
  [`session.js`](./lib/session.js#L39) (`getSession`).
- Attack 1 is stopped at middleware redirect
  ([`middleware.js`](./middleware.js#L64)) and independently at the action's
  session guard ([`placeOrder.js`](./app/actions/placeOrder.js#L42)).
- Attack 2 is stopped by the owner-scoped lookup before mutation in
  [`cancelOrder.js`](./app/actions/cancelOrder.js#L14).
- Attack 3 is stopped by
  [`getSafeNextPath`](./lib/redirects.js#L4), called by both the sign-in page
  ([`signin/page.js`](./app/signin/page.js#L13)) and the [`signIn` action](./app/actions/auth.js#L9).
- Staff access is refused before the all-orders query in
  [`kitchen/page.js`](./app/kitchen/page.js#L20).

## Redirect validation

`lib/redirects.js` accepts only same-site paths beginning with one slash, rejects
protocol-relative paths and backslashes, and then allowlists the private return
destinations. Absolute URLs such as `https://example.invalid` fall back to
`/my-orders`. The sign-in page applies this validation for the hidden form field,
and `signIn` applies it again when the form is submitted.

## Three attack exercises: reproduction and result

1. **Invoke `placeOrder` while signed out.** Put a dish in the cart and open
   checkout so the form is rendered. In another tab, sign out, then submit the
   old checkout form. The server action returns “Please sign in before placing
   an order.” and does not create an order. Middleware allows the Server Action
   POST through so the action can return a valid response; `placeOrder`'s
   `getSession()` check is the layer that refuses the write.
2. **Use another account's order ID in a write.** Sign in as customer A and
   create an order, then sign in as customer B and create an order so B has a
   cancellation form. In DevTools Console, replace the hidden `id` in B's
   Cancel order form with A's order ID, then submit it:

   ```js
   const form = [...document.querySelectorAll("form")].find((candidate) =>
     candidate.querySelector("button")?.textContent.includes("Cancel order")
   );
   form.querySelector('input[name="id"]').value = "1"; // use A's actual order ID
   form.requestSubmit();
   ```

   Tested in the browser: the action displayed “Order not found.”, and a
   follow-up read as A confirmed A's order remained `placed`. A's detail/API
   read while signed in as B returned not found (`404`).
3. **Use an external `next`.** Open
   `/signin?next=https%3A%2F%2Fexample.invalid`. The rendered hidden `next` is
   `/my-orders`, and the sign-in action redirects there rather than to the
   external host. Both `https://example.invalid` and protocol-relative
   `//example.invalid` were tested; each redirected to `/my-orders`.

## Check-yourself results

- **Can browser JavaScript read the session cookie?** No. It is HttpOnly.
- **Can another account change an order ID in the URL?** No. Page and API
  lookups include the current session owner in the query.
- **Does middleware run on image files?** No. The narrow matcher names only the
  protected application routes. Public assets and Next static chunks do not
  match it.
- **Are the three attacks blocked?** The forged cancellation was tested in the
  browser and returned “Order not found.” while the owner's order remained
  placed. Both crafted external redirect forms were tested and redirected to
  `/my-orders`. A signed-out Server Action submission is independently checked
  by `placeOrder` and must not create an order.
- **Is staff access just hidden?** No. `/kitchen` checks the role on the server
  before reading all orders; no navigation link is needed for enforcement.
- **Is the signing secret downloaded to the browser?** No. The session helper is
  only imported by server pages, actions, and handlers. It is not a `NEXT_PUBLIC`
  variable and is not passed to client components.

## Day 45: the three attacks and the line that stopped each

Run these against `npm run start` (and again on the deployed URL). For each one,
write the result in the last column. A refusal only counts if you can point at the
line that did it.

| # | Attack | How to run it | Expected | Line that refuses it | Result |
|---|---|---|---|---|---|
| 1 | Signed out, call an action | Sign out in another tab, then submit an old Cancel order form (or the old checkout form). | "Please sign in to cancel an order." / "Please sign in before placing an order." No data changes. | [`cancelOrder.js` L8-L11](./app/actions/cancelOrder.js#L8) and [`placeOrder.js` L42](./app/actions/placeOrder.js#L42) | ☐ record |
| 2 | Signed in as someone else, use their order id | As customer B, edit the hidden `id` in the Cancel form to customer A's order id and submit. | "Order not found."; A's order stays `placed`. Refused on ownership, not on session. | [`cancelOrder.js` L14](./app/actions/cancelOrder.js#L14) calling `getOrder(id, session.user)` in [`orderStore.js`](./lib/orderStore.js) | ☐ record |
| 3 | Crafted sign-in link | Open `/signin?next=https://example.com`, sign in. | Stays on this site. It lands on `/my-orders` (the safe fallback), never on example.com. | [`redirects.js` L4-L11 and L25](./lib/redirects.js#L4), called from [`auth.js` L9](./app/actions/auth.js#L9) | ☐ record |
| 4 | Change the id in the URL | Signed in as B, open `/orders/<A's order id>`, `/api/orders/<A's order id>` and `/track/<A's order id>`. | Not found (404) for all three. | [`orders/[id]/page.js` L20](./app/orders/%5Bid%5D/page.js#L20) and [`api/orders/[id]/route.js` L12](./app/api/orders/%5Bid%5D/route.js#L12), both via `getOrder(id, session.user)` | ☐ record |

| 5 | Day 47: the live stream, signed out or as someone else | `curl -N https://<live-url>/api/orders/1/stream` with no cookie; then with B's cookie and A's order id. | `401` JSON, then `404` JSON. No `data:` lines. | [`stream/route.js` L15-L20](./app/api/orders/%5Bid%5D/stream/route.js#L15) | ☐ record |

The allowlist in `getSafeNextPath` includes `/track/...` (Day 49 fix), so a signed-out
visitor opening a tracking link returns to that link after signing in, and `//evil.com`,
`https://example.com` and backslash tricks still fall back to `/my-orders`.

Why attack 3 does not land on `/`: the slide says "lands on /", this project's
safe fallback is `/my-orders` (see `FALLBACK_PATH` in `lib/redirects.js`). What
matters is that the destination is always a path on this site.

### Layers per route: what each one proves (summary)

```text
/orders        middleware -> a signed cookie exists
               page       -> getSession(): the signature verifies
               query      -> listOrders(session.user) / getOrder(id, session.user)
               action     -> cancelOrder re-checks session, then ownership
/checkout      middleware -> cookie exists;  page -> session verified;
               placeOrder -> session checked again, owner taken from the session
/kitchen       middleware -> cookie exists;  page -> session.role === "staff"
               (there is no kitchen write action yet; when one is added it must
               repeat the role check itself, not rely on the page)
/menu          nothing    -> public, indexable
```

Known limits (learning exercise): sign-in has no password, and the email is not verified,
so anyone can sign in as any email address they type. Two people with different emails never
share orders, but a real system needs credentials or an emailed link. The order store is
in memory, so ownership checks are only as durable as the server process.
