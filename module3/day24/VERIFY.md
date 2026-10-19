# Verification battery (Day 49): run on the DEPLOYED URL, in a private window

Live URL: `____________________`   Date: ________   Commit: ________

Record pass or fail and what you saw. Anything that fails is either fixed or written into [FUTURE.md](./FUTURE.md).

## Security (20% of the mark)

| # | Check | How | Expected | Result |
|---|---|---|---|---|
| 1 | Attack 1: signed out, call an action | Sign out in a second tab, then submit an old checkout form or an old Cancel form | "Please sign in..." and no data changes. Line: `placeOrder.js` L42 / `cancelOrder.js` L8-11 | ☐ |
| 2 | Attack 2: someone else's record | As B, change the hidden `id` in the Cancel form to A's order id (snippet in AUTH.md) | "Order not found."; A's order still `placed`. Line: `cancelOrder.js` L14 | ☐ |
| 3 | Attack 3: crafted return link | `/signin?next=https://example.com`, then sign in | Lands on `/my-orders`, never example.com. Line: `redirects.js` L4-L11 | ☐ |
| 4 | Id changed in a private URL | As B: `/orders/<A id>`, `/api/orders/<A id>`, `/track/<A id>` | 404 for all three | ☐ |
| 5 | Stream, signed out / other user | `curl -N <url>/api/orders/1/stream` with no cookie, then with B's cookie | 401, then 404, no `data:` lines | ☐ |
| 6 | Staff routes as a customer | `/dashboard` and `/kitchen` signed in as a non-staff user | Not found | ☐ |
| 7 | Secrets in the bundle | DevTools > Sources (or view-source), search for `SESSION_SECRET` and your real secret value | Nothing found | ☐ |

## Performance and accessibility (15%)

| # | Check | How | Target | Result |
|---|---|---|---|---|
| 8 | LCP, CLS, INP | Lighthouse, mobile, throttled, deployed (fill PERF.md) | under 2.5 s, 0.1, 200 ms | ☐ |
| 9 | Keyboard only | Mouse away: Tab, Enter, Escape through menu, cart, checkout, orders, track | Every function reachable, focus always visible | ☐ |
| 10 | Real phone | Open the live URL on a phone | Usable, nothing hover-only, targets easy to tap | ☐ |
| 11 | Images | Network tab, Img filter | Nothing over about 150 kB | ☐ |
| 12 | Headings and alt text | View source on `/`, `/menu`, `/menu/1` | One `h1`, `alt` on every image | ☐ |

## Discovery and correctness

| # | Check | How | Expected | Result |
|---|---|---|---|---|
| 13 | View source on the deployed page | `/menu/1` | Absolute `og:image`, one `h1`, JSON-LD | ☐ |
| 14 | Share card | Send the URL to yourself in a chat app | A card with a picture | ☐ |
| 15 | `/sitemap.xml`, `/robots.txt` | Open both | Real routes only; `/cart /checkout /orders /my-orders /track /kitchen /dashboard /signin /api/` disallowed | ☐ |
| 16 | Brand-new account | Sign in with a new email and visit every screen before ordering | Sensible empty states: `/my-orders`, `/orders`, `/cart`, `/checkout`, `/track/1` (not found, not a crash) | ☐ |
| 17 | Main flow, end to end | Menu > add > checkout > Place order > "Track your delivery" > watch it deliver > export CSV | Completes with no error | ☐ |
| 18 | Double tap | Tap Place order twice fast | One order in `/orders` | ☐ |
| 19 | Private window | Repeat 16 in a private window | Works with no session or cache | ☐ |
| 20 | The clone test | `git clone` into a new folder, follow the README exactly | It runs | ☐ |

## The last commit

| # | Check | How | Result |
|---|---|---|---|
| 21 | Everything pushed | `git status` is clean | ☐ |
| 22 | Deployment is current | Vercel's latest deployment shows the last commit | ☐ |
| 23 | No secret in the repository | `git log -p -S SESSION_SECRET` shows only variable names, never a real value; `.env.local` was never committed | ☐ |
| 24 | README has the live URL and it opens | Click it | ☐ |
| 25 | The documents exist and are true | AUTH.md, DATA.md, PERF.md, FUTURE.md | ☐ |

Note on the in-memory order store: on Vercel an order can disappear between requests. If checks
17 or 18 fail for that reason, record it as the known limit in FUTURE.md rather than as a new bug.
