# Triage and what was cut (Day 49)

## The plan (written down before building)

| List | Item | Status |
|---|---|---|
| **Must** | Sign in, and the three layers on every private route and action | Done, [AUTH.md](./AUTH.md) |
| **Must** | Main flow: menu, cart, checkout, order, then follow it on `/track/[id]` | Done (Day 49 added the "Track your delivery" link after checkout) |
| **Must** | A live URL that opens, with every variable set | See README for the URL |
| **Should** | Empty, loading and error states on every screen | Done; `/my-orders` got a real empty state on Day 49 |
| **Should** | Keyboard, 44 px targets, no double submit | Done on Day 48 |
| **Should** | AUTH.md, DATA.md, PERF.md, README | Written; PERF.md deployed column is filled from the live URL |
| **Could** | Everything in the next section | Cut on purpose |

Order of work: fix what is broken, finish the main flow, verify the attacks, fix empty states,
then documents and a rehearsal. No new feature after the halfway point.

## Found and fixed on Day 49

- A signed-out visitor opening `/track/5` was sent back to `/my-orders` after signing in, because
  the safe-redirect allowlist did not include `/track/`. It does now (`lib/redirects.js`).
- `/track` was missing from `robots.txt`; it is now disallowed with the other private routes.
- AUTH.md still said sign-in was "name only" and pointed at old line numbers; both corrected.

## Cut, and why (judgement, not oversight)

| Cut | Why it was cut | What I would do with another week |
|---|---|---|
| A real database | Module 4. Orders live in server memory, so on a serverless host an order can vanish between requests. | Postgres, with the owner and idempotency key as columns and a unique index on `(owner, key)`. |
| Real authentication | Sign-in has no password and the email is not verified. | Passwords with hashing, or an emailed one-time link; rate-limit sign-in. |
| A real courier | There is no courier app. Position and status are simulated from the order's age (`lib/tracking.js`). | Courier endpoint that writes the position; the stream stays as it is. |
| A kitchen write action (set status to preparing/delivered) | Nothing in the main flow needs it. When added, it must repeat the staff check itself, not rely on the page. | Add it with the same `getSession()` plus role check as `/kitchen`. |
| Payments (TeleBirr) | Out of scope for this module. | Test keys on Preview, live keys only on Production. |
| Amharic and the Ethiopian calendar | `Intl` cannot do the calendar; needs a library and a decision about the audience. | Decide with real users first. |
| Validate-on-blur on the checkout form | Server-side validation already refuses bad input. | Add `onBlur` messages. |
| Pause the stream when the tab is hidden | Nice, not needed for a demo. | `visibilitychange` listener to close and reopen the `EventSource`. |
| Tests | No automated tests. Checks are manual (see VERIFY.md) plus `npm run preflight` and `scripts/test-csv.mjs`. | Unit tests for `toCsv`, `getSafeNextPath`, `trackingFor`; one end-to-end test of the three attacks. |
| Menu Speed Index and the 300 ms simulated latency | Recorded as open in PERF.md. | Cache `getDishes()`; remove the artificial wait. |
