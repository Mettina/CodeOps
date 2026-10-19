# Merkato Finds

A marketplace for discovering products from Ethiopian sellers: browse, search and filter a catalog,
save a wishlist, fill a bag, and check out. Built with Next.js (App Router, v14) for the IBT College
Canada CodeOps frontend capstone. Prices are in ETB; checkout is a demo (cash on delivery, nothing is charged).

**Live URL:** `PASTE-YOUR-VERCEL-URL-HERE`  (replace after deploying, then check that it opens)

## Run it from a fresh clone

```bash
git clone <repo-url> && cd <repo>
npm install
cp .env.example .env.local        # Windows PowerShell: Copy-Item .env.example .env.local
# put a random value in SESSION_SECRET:
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
npm run preflight                 # imports, env vars, .gitignore, image hosts
npm run build && npm run start    # http://localhost:3000
```

Needs Node.js 18.17 or newer. Use `npm run dev` only while developing; test and demo with `build` then `start`.
The first build downloads the two Google fonts, and product photos load from Unsplash, so both need internet.

## Environment variables

| Variable | Needed | What it is |
|---|---|---|
| `SESSION_SECRET` | Yes | Signs the session cookie. Signing in throws without it. Use a different value per environment. |
| `STAFF_EMAILS` | For staff dashboard | Comma-separated sign-in email addresses allowed to see `/dashboard`. Demo-only: sign-in has no password or verified email. |
| `SITE_URL` | Optional | Public URL for metadata, sitemap and robots. Unset on Vercel: the Vercel domain is used; locally it is `http://localhost:3000`. |

No variable uses the `NEXT_PUBLIC_` prefix. Never commit `.env.local`.

## Try the main flow

1. `/login`: any name and email (there is no password, see Known limits). 2. `/shop`: add products to the bag, save one to the wishlist.
3. `/cart` then `/checkout`: phone `0912345678`, pick a city, **Place demo order**. 4. `/orders`: view simulated status, track the demo route, or cancel before dispatch.
5. For the staff dashboard, add your sign-in email to `STAFF_EMAILS` in `.env.local` (comma-separated for multiple staff), restart the server, then open `/dashboard`.

## Routes

| Route | Behaviour |
|---|---|
| `/`, `/shop`, `/search`, `/fashion`, `/electronics`, `/home-living`, `/beauty`, `/handmade`, `/accessories` | Public. Server pages with a client filter/sort/search leaf. |
| `/product/[id]` | Public. Static, one page per product, own title, description, share image and JSON-LD. |
| `/cart`, `/wishlist` | Browser-only (localStorage). |
| `/login`, `/signup` | Name + email, signed cookie, safe return link. |
| `/checkout`, `/order-success`, `/orders`, `/account`, `/track/[id]` | Signed in only; customer order pages are owner-scoped. Tracking progress is simulated. |
| `/dashboard` | Signed-in staff email allowlist only (`STAFF_EMAILS`); revenue summaries, daily orders, and a sortable/paged all-orders table. |
| `/about`, `/contact`, `/sell` | Public information pages (the forms are demos). |
| `/sitemap.xml`, `/robots.txt` | Generated; private routes are excluded. |

## Documents

[AUTH.md](./AUTH.md) layers and the attacks · [DATA.md](./DATA.md) where each piece of data lives ·
[STRATEGY.md](./STRATEGY.md) rendering per route · [PERF.md](./PERF.md) budget, before and after ·
[DEPLOY.md](./DEPLOY.md) interaction audit and deploy steps · [VERIFY.md](./VERIFY.md) verification battery ·
[FUTURE.md](./FUTURE.md) what was cut and why · [PRESENT.md](./PRESENT.md) presentation notes.

## Known limits

- Orders are held in server memory (`src/lib/orderStore.js`). They reset on restart and, on a serverless host,
  can disappear between requests. A database is the real fix (see FUTURE.md).
- Delivery progress, map positions, and estimated delivery times are simulated for demonstration; there is no courier, seller dispatch, GPS feed, or real tracking integration.
- Sign-in has no password and the email is not verified. It is a learning exercise, not production authentication.
- Because sign-in is passwordless and unverified, `STAFF_EMAILS` is only a demo allowlist, not secure production staff authorization.
- The bag and wishlist live in the browser's localStorage, so they are per browser, not per account.
- The contact, seller and newsletter forms are visual demos and send nothing.
