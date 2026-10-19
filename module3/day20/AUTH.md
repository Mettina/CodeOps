# Addis Eats authentication and authorization

This document describes the security boundaries for Day 17. It is a learning
exercise, not production authentication: sign-in accepts a name and email
address without verifying email ownership or requiring a password, and the
in-memory order store is not durable.

## Session and role

- `lib/session.js` is the server-side session helper used by pages, server
  actions, and route handlers. `getSession()` reads the `session` cookie,
  verifies its HMAC-SHA256 signature with `SESSION_SECRET`, and returns the
  normalized email identity and server-derived role. Invalid or absent cookies return
  `null`.
- The cookie is `httpOnly`, `sameSite: "lax"`, scoped to `/`, and valid for seven
  days. `secure` is set to `true` in production and `false` for local HTTP
  development. JavaScript cannot read an HttpOnly cookie through
  `document.cookie`.
- `SESSION_SECRET` is read only by server code and must not use a `NEXT_PUBLIC_`
  name. Do not commit `.env.local`. The signing key is not needed by the client.
- `STAFF_USERS` is a server-only, comma-separated allowlist, for example
  `STAFF_USERS=chef@example.com,manager@example.com`. Emails are normalized to
  lowercase before comparison. The role is derived after signature validation;
  users cannot select or submit their own role. An absent list grants no staff
  roles.

## Protected routes and enforcement layers

The middleware matcher is deliberately limited to `/checkout`, `/kitchen`,
`/my-orders`, and `/orders`, including nested paths. It does not match menu
routes, API routes, `/_next/static` chunks, or public image paths. Middleware
validates the signed cookie with Web Crypto (the Edge-compatible equivalent of
the Node-based session helper), redirects signed-out page requests to sign-in,
and puts the original path and query in `next`. It lets Next.js Server Action
POSTs reach the action, because each action must perform its own session and
ownership checks and return an action-compatible response.

## Access decisions

| Principal | Public menu and dish data | Own checkout and orders | Other customers' orders | All orders / kitchen |
|---|---|---|---|---|
| Signed-out visitor | Read | No; sent to sign-in or rejected by the server boundary. | No | No |
| Signed-in customer | Read | Yes; reads and mutations use the signed-in session identity. | No; a foreign or missing order is not found. | No |
| Signed-in staff member | Read | Yes; still limited to orders owned by that account on customer routes. | No on customer routes. | Yes; the server verifies the staff role before reading all orders. |
| Client/browser input | Read public endpoints | Never establishes identity or ownership; submitted order IDs and role values are not authority. | No | No |

Sign-in currently signs the entered name and normalized email address into the
session cookie. The email is the order-ownership identity. The app does not
verify email ownership, check a password, or create durable accounts. Anyone
can enter another person's email and impersonate that identity in this demo.
Staff status comes only from the server-side `STAFF_USERS` allowlist. This is
the exercise's authorization model, not production-grade account authentication.

| Route/resource | Middleware | Server page/handler | What the layer proves |
|---|---|---|---|
| `/checkout` | Requires a valid signed cookie; preserves path in `next`. | `app/checkout/page.js` calls `getSession()` before rendering. `placeOrder` checks the session again before saving. | Page and mutation both require an authenticated user; new order ownership is taken from that session, not the request. |
| `/my-orders` | Requires a valid signed cookie and preserves `next`. | `app/my-orders/page.js` calls `getSession()` and queries `listOrders(session.user)`. | The page requires a session and returns only that user's orders. |
| `/orders` | Requires a valid signed cookie and preserves `next`. | `app/orders/page.js` calls `getSession()` and queries `listOrders(session.user)`. | Another account's order is not included in the list. |
| `/orders/[id]` | Requires a valid signed cookie and preserves the detail URL in `next`. | `app/orders/[id]/page.js` calls `getSession()` and uses `getOrder(id, session.user)`. `GET /api/orders/[id]` repeats the session and owner-scoped lookup. | The requested ID is not authority; an order is returned only when its owner matches the session. A foreign or missing order is not found. |
| `/kitchen` | Requires a valid signed cookie and preserves `next`. | `app/kitchen/page.js` calls `getSession()`, checks `session.role === "staff"`, then calls `listAllOrders()`. | Only a server-verified staff role can read across account ownership. Non-staff users receive not found. |
| `POST /api/orders` | Not included in the page matcher. | The route handler calls `getSession()` before reading/creating the order and assigns `owner: session.user`. | API access does not rely on middleware; only an authenticated account can create an order for itself. |
| Server action `placeOrder` | Not a route matcher. | Calls `getSession()` before validation or saving. | A forged client request cannot create an order while signed out; owner comes from the session. |
| Server action `cancelOrder` | Not a route matcher. | Calls `getSession()`, calls `getOrder(id, session.user)`, then `markCancelled(id, session.user)`. | A session and matching owner are required before order state changes. A foreign order behaves as not found. |
| Server actions `signIn` / `signOut` | Not a route matcher. | `signIn` validates the name and email, normalizes the email, signs both into the session, and validates `next`; `signOut` deletes the cookie. | These are session lifecycle actions, not order mutations. Email is not verified, so sign-in is not suitable as production authentication. |
| `GET /api/dishes` and `GET /api/dishes/[id]` | Not matched. | Public read-only handlers. | Menu data is intentionally public. |

The server action functions are not protected merely because a button or form is
hidden. Each order mutation repeats its authentication and ownership checks at
the server boundary. API handlers similarly enforce their own checks rather
than relying on middleware.

## Key enforcement locations

- Middleware's signed-cookie gate and redirect are in
  [`middleware.js`](./middleware.js#L52); the narrow route matcher is at
  [`middleware.js`](./middleware.js#L69).
- Cookie flags and signature verification are in
  [`session.js`](./lib/session.js#L21) and
  [`session.js`](./lib/session.js#L32).
- Attack 1 is stopped at middleware redirect
  ([`middleware.js`](./middleware.js#L65)) and independently at the action's
  session guard ([`placeOrder.js`](./app/actions/placeOrder.js#L43)).
- Attack 2 is stopped by the owner-scoped lookup before mutation in
  [`cancelOrder.js`](./app/actions/cancelOrder.js#L14).
- Attack 3 is stopped by
  [`getSafeNextPath`](./lib/redirects.js#L4), called by both the sign-in page
  and the [`signIn` action](./app/actions/auth.js#L11).
- Staff access is refused before the all-orders query in
  [`kitchen/page.js`](./app/kitchen/page.js#L12).

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

## Day20 local verification

The production build completed successfully. HTTP checks against the local
development server returned:

- Signed-out `GET /checkout` and `GET /orders/1`: `307` to sign-in with the
  requested path preserved.
- Signed-out `POST /api/orders`: `401 UNAUTHORIZED`.
- Two synthetic signed sessions could each create an order (`201`) and read
  their own order (`200`); the second session reading the first session's order
  returned `404 NOT_FOUND`.
- An external `next` on `/signin` rendered `/my-orders` as the safe destination.
- `GET /api/dishes/not-a-dish`: `404`; `/robots.txt` and `/sitemap.xml`: `200`.

The ownership check created two synthetic orders in the running development
server's process-local store. They are test data and disappear when that server
process restarts.

The session implementation sets `HttpOnly`, `SameSite=Lax`, `Path=/`, a
seven-day `Max-Age`, and `Secure` only in production. Browser DevTools cookie
inspection and browser-submitted sign-in/sign-out were not repeated in this
verification, so the flags are confirmed from source rather than a DevTools
capture.

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
