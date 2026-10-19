# Addis Eats

A server-first Next.js App Router menu and ordering app. Read [STRATEGY.md](./STRATEGY.md)
for the rendering decision for every route and [BOUNDARY.md](./BOUNDARY.md) for the
server/client component map.

## Run

Run commands from this directory:

```bash
npm install   # first run after Day 46: adds recharts and refreshes package-lock.json
```

After that first install, commit the updated `package-lock.json`; from then on a fresh clone can use `npm ci`.

Create `.env.local` from the committed template and replace the placeholder
session secret with a random value. In PowerShell:

```powershell
Copy-Item .env.example .env.local
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Put the generated value in `SESSION_SECRET`. `STAFF_USERS` is an optional
comma-separated list of staff names or email addresses. Keep these values in `.env.local`;
do not prefix server secrets with `NEXT_PUBLIC_`.

Build and run the production app:

```bash
npm run build
npm run start
```

Use `npm run dev` for development only. Lighthouse measurements should use
`npm run build` followed by `npm run start`.

## Routes

| Route | Behavior |
|---|---|
| `/` | Static landing page. |
| `/menu` | Server-rendered menu pages (`?page=N`) with category filters and debounced SWR search by dish, category, or description. |
| `/menu/[id]` | Dish detail pages generated from known dish IDs; unknown dishes render not-found UI. |
| `/cart` | Client cart and running total. |
| `/checkout` | Session-guarded checkout using a validated server action. |
| `/signin` | Asks for a name and an email, creates a signed session and returns the user to checkout or My Orders. |
| `/my-orders` | Shows only the signed-in user's orders; cancellation checks ownership in the server action. |
| `/orders` | Lists only the signed-in user's orders; detail pages and the order API also enforce ownership. |
| `/dashboard` | Staff-only dashboard (Day 46): revenue bar chart, orders-per-day line, each with its data table, plus a sortable, paged order table. |
| `/kitchen` | Checks the signed-in user's staff role on the server before showing all orders. |

Requests to `/checkout`, `/dashboard`, `/kitchen`, `/my-orders`, and `/orders` (including nested
routes) require a valid signed session cookie. Unauthenticated requests are sent
to `/signin` and returned to their original path after sign-in.
The `/kitchen` page independently checks the session role on the server; non-staff
users receive the not-found page. Since this exercise's sign-in identifies users by
name only, the staff allowlist is for learning and is not production-grade authentication.
See [AUTH.md](./AUTH.md) for the route-by-route security layers and the three attack exercises.

### Performance mini-project (Day 18)

See [PERF.md](./PERF.md) for the throttled production Lighthouse measurements
and the cause of each before/after change. Images are local; no remote image
hosts or third-party scripts are configured. Inter is self-hosted at build time
with `next/font`.

### Day 17 security exercise

Sign-in and sign-out, protected-route redirects, session-scoped order access,
ownership-checked order actions, and server-enforced staff access are implemented.
The three attack tests and their results are recorded in [AUTH.md](./AUTH.md).

### Day 46: data representation

See [DASHBOARD.md](./DASHBOARD.md). To try it: set `STAFF_USERS=chef` in `.env.local`, run
`npm run build && npm run start`, sign in as `chef`, open `/dashboard?data=sample`.
Every state can be shown on demand from the "Show:" links at the top of the dashboard
(`?demo=empty`, `?demo=slow`, `?demo=error`), and the same flags work on `/orders`.

### Build output

Verified with `npm run build` on Next.js 16.3.8:

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ƒ /api/orders/[id]
├ ○ /cart
├ ƒ /checkout
├ ƒ /kitchen
├ ƒ /menu
├   /menu/[id]
│ ├ ● /menu/1
│ ├ ● /menu/2
│ ├ ● /menu/3
│ └ ● [+18 more paths]
├ ƒ /my-orders
├ ƒ /orders
├ ƒ /orders/[id]
└ ƒ /signin

ƒ  Proxy (Middleware)

○  Static
●  Static HTML generated from generateStaticParams
ƒ  Dynamic, server-rendered on demand
```

The installed Next.js build reports route markers but does not print First Load JS
sizes. Measure `/menu` in the production browser Network panel with cache disabled.
The original Day 35 bundle is not present in this project, so no before/after size is
claimed here.

## Checkout and validation

Before placing an order, the user must sign in. `/checkout` checks the session server-side,
and `placeOrder` independently checks it again. With JavaScript enabled, the cart submits
its item IDs and quantities through the action state form. With JavaScript disabled, a
server-rendered fallback lets the user select dishes and submit the same server action.
Both paths and `POST /api/orders` use `lib/validate.js` via `lib/orders.js`; prices are
looked up on the server rather than trusted from the browser. The API requires a valid
session, and order lists and detail lookups are scoped to that session's user.

Try the endpoint contracts against `npm run start`:

```bash
curl.exe -i http://localhost:3000/api/dishes/not-a-dish
curl.exe -i -X POST http://localhost:3000/api/orders `
  -b "session=<your-session-cookie>" `
  -H "Content-Type: application/json" `
  --data-raw '{"name":"Almaz","phone":"0912","area":"Bole","items":[{"dishId":1,"quantity":1}]}'
```

The dish lookup returns `404`; an authenticated request with the invalid phone number
returns `422` with `fieldErrors.phone`.

## Rendering and boundary notes

- `/menu` reads the page, category, and search query parameters and renders the selected dish page on the server.
- `/menu/[id]` uses `generateStaticParams()` and `notFound()` for invalid IDs.
- The menu's category selector wraps server-rendered dish cards through `children`.
- Menu paging uses `/menu?page=N`; category and search terms are preserved in the URL, and the initial results are rendered on the server. Search debounces requests to `/api/dishes?search=...&page=N` through SWR. An empty search uses a null SWR key and sends no search request. While typing, the Network tab shows one `/api/dishes` fetch after the 300 ms pause rather than a request for every keystroke; previous results stay visible while the response loads. See [DATA.md](./DATA.md) for every SWR query key and refresh policy.
- To show a dish photo, place it under `public/img/` and add its path to that dish's `image` property in `lib/data.js` (for example, `image: "/img/doro wot.jpg"`). Cards use Next.js Image and hide the image area until a path is provided.
- Client directives are kept on interactive leaves and stateful pages; the root layout
  remains a Server Component.
- Checkout and cancellation actions enforce authentication/ownership on the server.

## Deployment (Day 45)

**Deployed URL:** _add the Vercel URL here after deploying_

Set these in the host's environment settings (never commit real values):

| Variable | Value |
|---|---|
| `SESSION_SECRET` | a long random string (the app throws without it) |
| `STAFF_USERS` | optional, comma-separated staff names |
| `SITE_URL` | the deployed URL, for example `https://your-project.vercel.app` (no trailing slash) |

`SITE_URL` feeds `metadataBase`, the sitemap, robots and JSON-LD, so deploy once,
copy the URL, set `SITE_URL`, then redeploy.

**Known limitation:** orders are held in server memory (`lib/orderStore.js`). On a
serverless host they can disappear between requests or differ between instances,
so an order may not be found right after placing it. A database is the real fix;
for a demo, place an order and open it straight away, and say so when presenting.

**From a fresh clone:** `npm ci` (once the lockfile includes recharts), copy `.env.example` to `.env.local` and fill it in,
`npm run build`, `npm run start`.

Documents: [AUTH.md](./AUTH.md) (layers and the attacks), [DATA.md](./DATA.md)
(where each query runs), [PERF.md](./PERF.md) (budget, before and after).

## Day 47: Tracking a delivery

| Piece | Where |
|---|---|
| Tracking page (owner-only, `/track/[id]`) | `app/track/[id]/page.js` |
| Leaflet map, `ssr:false` + 320px placeholder | `MapPanel.jsx`, `DeliveryMap.jsx` |
| Live status via `EventSource`, connection indicator, text copy of the map | `TrackingLive.jsx` |
| SSE stream (`data: ...\n\n`, closes on delivered/cancelled) | `app/api/orders/[id]/stream/route.js` |
| Shared formatters `etb`, `when`, `relative`, `clockTime` | `lib/format.js` |
| CSV (`toCsv` quoting, `download` Blob helper) + export button | `lib/csv.js`, `ExportButton.jsx` |
| Simulated courier and status timeline | `lib/tracking.js` |

Run `npm install` (adds `leaflet` and `react-leaflet`). Place an order, open `/orders/<id>` and click **Track delivery**.
The demo courier is simulated from the order's age: placed, preparing (15 s), on the way (40 s), delivered (100 s).

## Day 48: Interaction and deployment

**Live URL:** `PASTE-YOUR-VERCEL-URL-HERE` (replace after the first deploy)

Run it from a fresh clone:

```bash
git clone <repo-url> && cd <repo>
npm install
cp .env.example .env.local      # then set SESSION_SECRET (see the file)
npm run preflight               # imports, env vars, images, .gitignore
npm run build && npm run start  # the same build the platform runs
```

See [DEPLOY.md](./DEPLOY.md) for the interaction audit, the pre-flight checklist,
the per-environment variables and the post-deployment checks.
