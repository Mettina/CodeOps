# Verification battery: run on the DEPLOYED URL, in a private window

Live URL: `____________________`   Date: ________   Commit: ________

Record pass or fail and what you saw. Anything that fails is either fixed or written into [FUTURE.md](./FUTURE.md).

## Security (20% of the mark)

| # | Check | How | Expected | Result |
|---|---|---|---|---|
| 1 | Attack 1: signed out, call an action | Window 1 on `/checkout` with the form filled; Window 2: `/account` > Sign out; Window 1: Place demo order | "Please sign in before placing an order." and no order. Line: `placeOrder.js` L11 | ☐ |
| 2 | Attack 2: someone else's record | As B on `/orders`, change the Cancel form's hidden `id` to A's order id (snippet in AUTH.md) | "Order not found."; A's order still `received`. Line: `cancelOrder.js` L14 | ☐ |
| 3 | Attack 3: crafted return link | `/login?next=https://example.com`, then sign in | Lands on `/account`, never example.com. Line: `redirects.js` L6-L26 | ☐ |
| 4 | Id changed in a private URL | As B: `/order-success?id=<A id>` | 404 | ☐ |
| 5 | Price tampering | Edit the hidden `items` input on `/checkout` (add `"price":1`), submit | Total on `/orders` matches the catalog prices | ☐ |
| 6 | Private pages signed out | Open `/orders`, `/account`, `/checkout` in a private window | Redirected to `/login?next=...` | ☐ |
| 7 | Secrets in the bundle | DevTools > Sources, search for your real `SESSION_SECRET` value | Nothing found | ☐ |

## Performance and accessibility (15%)

| # | Check | How | Target | Result |
|---|---|---|---|---|
| 8 | LCP, CLS, INP | Lighthouse, mobile, throttled, deployed (fill PERF.md) | under 2.5 s, 0.1, 200 ms | ☐ |
| 9 | Keyboard only | Mouse away: Tab, Enter, Escape through home, shop, product, bag, checkout, orders | Every function reachable, focus always visible, "Skip to content" works | ☐ |
| 10 | Real phone | Open the live URL on a phone | Usable, "Add to bag" visible without hover, targets easy to tap | ☐ |
| 11 | Images | Network tab, Img filter, on `/shop` | Nothing over about 150 kB | ☐ |
| 12 | Headings and alt text | View source on `/`, `/shop`, `/product/1` | One `h1`, `alt` on every image | ☐ |

## Discovery and correctness

| # | Check | How | Expected | Result |
|---|---|---|---|---|
| 13 | View source on a product page | `/product/3` | Its own `<title>`, absolute `og:image`, canonical, JSON-LD | ☐ |
| 14 | Share card | Send a product URL to yourself in a chat app | A card with that product's picture | ☐ |
| 15 | `/sitemap.xml`, `/robots.txt` | Open both | 12 product URLs; `/cart /checkout /orders /order-success /account /login /signup /wishlist` disallowed | ☐ |
| 16 | Brand-new account | New email; visit `/orders`, `/account`, `/cart`, `/wishlist`, `/checkout` before ordering | Friendly empty states, no crash | ☐ |
| 17 | Main flow, end to end | Login > add 2 products > bag > checkout > Place demo order > view `/orders` > cancel | Completes with no error | ☐ |
| 18 | Double tap | Tap Place demo order twice fast | One order in `/orders` | ☐ |
| 19 | Unknown product id | `/product/999` | The 404 page, not a crash | ☐ |
| 20 | The clone test | `git clone` into a new folder, follow the README exactly | It runs | ☐ |

## The last commit

| # | Check | How | Result |
|---|---|---|---|
| 21 | Everything pushed | `git status` is clean | ☐ |
| 22 | Deployment is current | Vercel's latest deployment shows the last commit | ☐ |
| 23 | No secret in the repository | `.env.local` never committed; `git log -p -S SESSION_SECRET` shows only variable names | ☐ |
| 24 | README has the live URL and it opens | Click it | ☐ |
| 25 | The documents exist and are true | AUTH.md, DATA.md, PERF.md, FUTURE.md | ☐ |

Note on the in-memory order store: on Vercel an order can disappear between requests. If checks 17 or 18 fail for that
reason, record it as the known limit in FUTURE.md rather than as a new bug.
