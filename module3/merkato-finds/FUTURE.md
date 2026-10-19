# Triage and what was cut (Day 49)

## The plan (written down before building)

| List | Item | Status |
|---|---|---|
| **Must** | Real sign-in (signed cookie), middleware plus a check on every private page and action | Done: [AUTH.md](./AUTH.md) |
| **Must** | Main flow: browse, bag, checkout, a server-held order, view and cancel it | Done: the order is built on the server, priced from the catalog, owned by the session |
| **Must** | A live URL that opens, with every variable set | See the README for the URL |
| **Should** | Per-product metadata, sitemap, robots, JSON-LD | Done |
| **Should** | Keyboard, 44 px targets, nothing hover-only, no double submit | Done: [DEPLOY.md](./DEPLOY.md) |
| **Should** | Empty, loading and error states | Done (bag, wishlist, orders, checkout, 404, error boundary) |
| **Should** | AUTH.md, DATA.md, PERF.md, README | Written; PERF.md cells are filled from your own measurements |
| **Could** | Everything in the next section | Cut on purpose |

## Found and fixed on Day 49

- **No authentication at all**, although the sign-in pages looked real: the password boxes did nothing and the account page
  was open to anyone. Sign-in is now a signed cookie and the private pages are gated.
- **Checkout trusted the browser:** the order, its prices and its total were built in the browser and saved to localStorage.
  A server action now prices every line from the catalog and records the owner from the session.
- **The product page was a client page** with one shared title for all products and no sitemap. It is now static with its own metadata.
- **`.gitignore` contained `.env*`,** which would have hidden `.env.example` from git. Fixed, and the preflight script checks it.
- **Google Fonts were loaded with a render-blocking CSS `@import`.** Replaced with `next/font`.
- **"Add to bag" appeared only on mouse hover,** so it was missing on tablets. It now shows on touch and on keyboard focus.
- **Tap targets of 28 to 34 px** (wishlist heart, quantity buttons, filter chips) raised to 44 px, and a visible focus ring added.

## Cut, and why (judgement, not oversight)

| Cut | Why it was cut | What I would do with another week |
|---|---|---|
| A real database | Module 4. Orders live in server memory, so on a serverless host an order can vanish between requests. | Postgres, with owner and idempotency key as columns and a unique index on `(owner, key)`. |
| Passwords and email verification | Out of scope for this module; sign-in has no password. | Hashed passwords or an emailed one-time link, and rate-limited sign-in. |
| Payments | The demo is cash on delivery only. | TeleBirr with test keys on Preview and live keys only on Production. |
| Bag tied to the account | The bag is localStorage, so it is per browser, not per account. | Store the bag server-side once there is a database. |
| Listing filters in the URL | Search, sort and category live in client state, so a filtered view cannot be shared or bookmarked. | Move them to `searchParams` and filter on the server. |
| Server-side catalog and an API | The catalog is a static module bundled into the client listing. | Route handlers or a database query, with paging. |
| Converting every `<img>` to `next/image` | Remaining ones are below the fold, and I could not check their layout without running the app. | Convert them and measure. |
| Working contact, seller and newsletter forms | They are visual demos that send nothing. | A server action that stores or emails the message. |
| Seller accounts and real product management | Beyond the capstone's scope. | A seller role, product CRUD, and image uploads. |
| Reviews and ratings that users can write | The numbers are static sample data. | A reviews table tied to orders. |
| Automated tests | Checks are manual (see [VERIFY.md](./VERIFY.md)) plus `npm run preflight`. | Unit tests for `createOrder`, `getSafeNextPath` and ownership; one end-to-end test of the attacks. |
| A screen-reader audit | Keyboard and target sizes were checked; a screen reader was not. | Test with NVDA or VoiceOver and fix what it finds. |
| Real delivery tracking | `/track/[id]` simulates a courier route and timed status changes for the demo. | Integrate a real delivery provider, persist provider events, and verify webhook signatures before showing real shipment status. |
