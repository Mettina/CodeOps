# Addis Eats

A server-first Next.js App Router menu and ordering app. Read [STRATEGY.md](./STRATEGY.md)
for the rendering decision for every route and [BOUNDARY.md](./BOUNDARY.md) for the
server/client component map.

## Run

Run commands from this directory:

```bash
npm install
npm run build
npm run start
```

Use `npm run dev` for development. The checkout page requires `SESSION_SECRET` in
`.env.local`; the provided local configuration includes a development value.

## Routes

| Route | Behavior |
|---|---|
| `/` | Static landing page. |
| `/menu` | Server-rendered menu pages (`?page=N`) with category filters and debounced SWR search by dish, category, or description. |
| `/menu/[id]` | Dish detail pages generated from known dish IDs; unknown dishes render not-found UI. |
| `/cart` | Client cart and running total. |
| `/checkout` | Session-guarded checkout using a validated server action. |
| `/signin` | Creates a signed session and returns the user to checkout or My Orders. |
| `/my-orders` | Shows only the signed-in user's orders; cancellation checks ownership in the server action. |
| `/orders` | Server-rendered order list. |

Requests to `/checkout` and `/orders` (including their nested routes) require a
valid signed session cookie. Unauthenticated requests are sent to `/signin` and
returned to their original path after sign-in.

### Build output

Verified with `npm run build` on Next.js 16.3.8 after adding query-string menu paging:

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
looked up on the server rather than trusted from the browser.

Try the endpoint contracts against `npm run start`:

```bash
curl.exe -i http://localhost:3000/api/dishes/not-a-dish
curl.exe -i -X POST http://localhost:3000/api/orders `
  -H "Content-Type: application/json" `
  --data-raw '{"name":"Almaz","phone":"0912","area":"Bole","items":[{"dishId":1,"quantity":1}]}'
```

The dish lookup returns `404`; the invalid phone number returns `422` with
`fieldErrors.phone`.

## Rendering and boundary notes

- `/menu` reads the page, category, and search query parameters and renders the selected dish page on the server.
- `/menu/[id]` uses `generateStaticParams()` and `notFound()` for invalid IDs.
- The menu's category selector wraps server-rendered dish cards through `children`.
- Menu paging uses `/menu?page=N`; category and search terms are preserved in the URL, and the initial results are rendered on the server. Search debounces requests to `/api/dishes?search=...&page=N` through SWR. An empty search uses a null SWR key and sends no search request. While typing, the Network tab shows one `/api/dishes` fetch after the 300 ms pause rather than a request for every keystroke; previous results stay visible while the response loads. See [DATA.md](./DATA.md) for every SWR query key and refresh policy.
- To show a dish photo, place it under `public/img/` and add its path to that dish's `image` property in `lib/data.js` (for example, `image: "/img/doro wot.jpg"`). Cards use Next.js Image and hide the image area until a path is provided.
- Client directives are kept on interactive leaves and stateful pages; the root layout
  remains a Server Component.
- Checkout and cancellation actions enforce authentication/ownership on the server.
