# Addis Eats

Order Ethiopian food online and follow the delivery live. A Next.js (App Router) app built for the
IBT College Canada CodeOps course: server-first rendering, signed-session authentication with
owner-checked actions, a staff dashboard with charts, and a live delivery tracking page with a map.

**Live URL:** `PASTE-YOUR-VERCEL-URL-HERE`  (replace after deploying, then check that it opens)

## Run it from a fresh clone

```bash
git clone <repo-url> && cd <repo>
npm install
cp .env.example .env.local        # Windows PowerShell: Copy-Item .env.example .env.local
# put a random value in SESSION_SECRET:
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
npm run preflight                 # imports, env vars, images, .gitignore
npm run build && npm run start    # http://localhost:3000
```

Use `npm run dev` only while developing; measure and demo with `build` then `start`.

## Environment variables

| Variable | Needed | What it is |
|---|---|---|
| `SESSION_SECRET` | Yes | Signs the session cookie. The app throws without it. Use a different value per environment. |
| `STAFF_USERS` | Optional | Comma-separated names or emails that get the staff role (`/dashboard`, `/kitchen`). |
| `SITE_URL` | Optional | Public URL for metadata, sitemap and robots. Unset on Vercel: the Vercel domain is used; locally it is `http://localhost:3000`. |

No variable uses the `NEXT_PUBLIC_` prefix. Never commit `.env.local`.

## Try the main flow

1. `/signin` with any name and an email. 2. `/menu`: add dishes. 3. `/checkout`: phone `0912345678`,
pick an area, **Place order**. 4. **Track your delivery**: map, live status, CSV export on the page.
The demo courier is simulated from the order's age: preparing at 15 s, on the way at 40 s, delivered at 100 s.
Staff: set `STAFF_USERS=chef`, sign in as `chef`, open `/dashboard?data=sample`.

## Routes

| Route | Behaviour |
|---|---|
| `/`, `/menu`, `/menu/[id]` | Public. Menu has paging, category filter and debounced search. |
| `/cart` | Client cart. |
| `/checkout` | Signed in. Validated server action, disabled while pending, idempotent. |
| `/signin` | Name + email, signed cookie, safe return link. |
| `/my-orders`, `/orders`, `/orders/[id]` | Signed in; only the owner's orders. |
| `/track/[id]` | Signed in, owner only. Leaflet map, live status over server-sent events, CSV export. |
| `/dashboard`, `/kitchen` | Staff only, checked on the server. |
| `/api/dishes`, `/api/dishes/[id]` | Public JSON. |
| `/api/orders`, `/api/orders/[id]`, `/api/orders/[id]/stream` | Signed in; owner-scoped; the stream is `text/event-stream`. |

## Documents

[AUTH.md](./AUTH.md) layers and the attacks · [DATA.md](./DATA.md) where each query runs ·
[PERF.md](./PERF.md) budget, before and after · [STRATEGY.md](./STRATEGY.md) rendering per route ·
[BOUNDARY.md](./BOUNDARY.md) server/client map · [DASHBOARD.md](./DASHBOARD.md) charts vs tables ·
[DEPLOY.md](./DEPLOY.md) interaction audit and deploy steps · [VERIFY.md](./VERIFY.md) verification battery ·
[FUTURE.md](./FUTURE.md) what was cut and why · [PRESENT.md](./PRESENT.md) presentation notes.

## Known limits

- Orders are held in server memory (`lib/orderStore.js`). They reset on restart and, on a serverless host,
  can disappear between requests. A database is the real fix (see FUTURE.md).
- Sign-in has no password and the email is not verified. It is a learning exercise, not production authentication.
- The courier is simulated; there is no real courier app.
