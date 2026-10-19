# Day 48: Interaction pass and deployment

## 1. Interaction audit (exercises 1 to 4)

| Exercise | What was checked | Result |
|---|---|---|
| 1. No clickable `div` | Searched every `onClick` in `app/` and `components/` | None found: all handlers are on `<button>`; navigation is `<Link>` |
| 1. Visible focus | `:focus-visible` rule for links, buttons, chips; inputs now use a solid 3px ring (was a faint 20% green) | Done, `globals.css` (Day 48 block) |
| 2. Keyboard only | Tab / Enter / Escape through menu, cart, checkout, orders, tracking page | Fill in after your own run (see section 5) |
| 3. Double submit | Button `disabled` + `aria-busy` while pending, **and** an idempotency key so a repeat returns the same order | Done: `CheckoutForm.jsx`, `placeOrder.js`, `orderStore.js` |
| 4. Touch targets | Every button, link, chip, quantity button and input is at least 44 x 44 px, with gaps | Done, `globals.css` (Day 48 block) |
| 4. Hover | Searched `:hover` rules: they only restyle; nothing is revealed by hover | Nothing hidden |
| Forms | `onSubmit`-style form actions (Enter works), `type="tel"` + `inputMode="tel"` on phone | Done |

## 2. Pre-flight checklist (exercise 5)

| Check | How | Status |
|---|---|---|
| Build succeeds | `npm run build` | run it, read the route table |
| Every variable listed | `npm run preflight` compares code with `.env.example` | passes |
| No secret is public | No `NEXT_PUBLIC_` variables exist; preflight flags any secret-looking one | passes |
| `metadataBase` is production | `lib/site.js`: `SITE_URL`, else the Vercel production domain, else the preview URL, else localhost | done |
| Remote image hosts | All dish images are local files in `public/img` and use `next/image`, so no `remotePatterns` needed | n/a |
| Case-sensitive imports | `npm run preflight` checks every import's exact capitalisation | passes |

## 3. Variables per environment (set in Vercel > Settings > Environment Variables)

| Variable | Development | Preview | Production |
|---|---|---|---|
| `SESSION_SECRET` | any (`.env.local`) | its own random value | a different strong random value |
| `STAFF_USERS` | `chef,manager@example.com` | test names | real staff only |
| `SITE_URL` | `http://localhost:3000` | leave unset | leave unset, or your real domain |

## 4. Deploy

1. Push to GitHub (`.env.local` is ignored).
2. Vercel > Add New > Project > import the repository. Framework is detected as Next.js.
3. Add the variables above **before** deploying (Preview and Production separately).
4. Deploy. Put the URL at the top of the README.

## 5. After it is live (in a private window)

- [ ] Signed out: `/menu` works; `/orders`, `/my-orders`, `/checkout`, `/track/1` send you to sign-in
- [ ] The three Day 45 attacks are refused (open someone else's order id, hit `/dashboard` as a customer, tamper with the cookie)
- [ ] Share the URL with yourself: the preview card shows an image
- [ ] `/sitemap.xml` lists real routes; `/robots.txt` disallows `/cart` and `/checkout`
- [ ] Lighthouse (mobile, throttled) numbers copied into `PERF.md`
- [ ] Place one order, double-tap Place order: only one order appears in `/orders`

## 6. Known limit of this demo

Orders are kept **in server memory** (`lib/orderStore.js`). On Vercel each request may run on a
different, short-lived instance, so an order can disappear between pages. Locally it is fine.
A real deployment needs a database (Module 4). Say this in your README so a reviewer is not surprised.
