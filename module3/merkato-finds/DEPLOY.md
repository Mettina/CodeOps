# Interaction pass and deployment

## 1. Interaction audit

| Check | What was checked | Result |
|---|---|---|
| No clickable `div`/`span` | Searched every `onClick` in `src/` | None: handlers are on `<button>`; navigation is `<Link>` |
| Buttons have a type | Every non-submit `<button>` got `type="button"` | Done |
| Visible focus | The old CSS had no focus style at all. Added a 3 px `:focus-visible` ring for links, buttons, summary and form fields, plus a "Skip to content" link | Done: `globals.css` (end of file) |
| 44 px targets | Buttons, nav links, filter chips, the heart, quantity buttons, footer links raised to at least 44 x 44 px | Done: `globals.css` |
| Nothing hidden behind hover | "Add to bag" was `opacity: 0` until a mouse hovered the card. It now shows on touch devices (`@media (hover: none)`) and on keyboard focus | Done |
| Double submit | Button disabled while pending (`SubmitButton`), and a per-form idempotency key means a repeat returns the same order | Done: `CheckoutForm.js`, `placeOrder.js`, `orderStore.js` |
| Forms | Real `<form action>`; `type="tel"` with `inputMode="tel"`; `autoComplete`; errors shown next to the field with `role="alert"` | Done |
| Toggle state | Wishlist hearts and filter chips expose `aria-pressed` | Done |
| Reduced motion | Animations and transitions are switched off when the person asks for it | Done |

## 2. Pre-flight checklist

| Check | How | Status |
|---|---|---|
| Build succeeds | `npm run build` | you run it |
| Every variable listed | `npm run preflight` compares code with `.env.example` | passes |
| No secret is public | No `NEXT_PUBLIC_` variables; preflight flags a secret-looking one | passes |
| `metadataBase` is production | `src/lib/site.js`: `SITE_URL`, else the Vercel production domain, else the preview URL, else localhost | done |
| Remote image hosts allowed | `next.config.js` `images.remotePatterns` allows `images.unsplash.com`; preflight checks it | passes |
| Case-sensitive imports | `npm run preflight` checks every import's exact capitalisation | passes |
| `.env.example` is committable | `.gitignore` no longer uses `.env*`; preflight checks it | passes |

## 3. Variables per environment (Vercel: Settings > Environment Variables)

| Variable | Development | Preview | Production |
|---|---|---|---|
| `SESSION_SECRET` | any (`.env.local`) | its own random value | a different strong random value |
| `STAFF_EMAILS` | optional comma-separated staff emails | set the staff emails that may access `/dashboard` | set the staff emails that may access `/dashboard` |
| `SITE_URL` | `http://localhost:3000` | leave unset | leave unset, or your real domain |

## 4. Deploy

1. Push to GitHub (`.env.local` is ignored; `.env.example` is committed).
2. Vercel > Add New > Project > import the repository. The framework is detected as Next.js.
3. Add the variables above **before** deploying (Preview and Production separately).
4. Deploy. Put the URL at the top of the README.

`STAFF_EMAILS` is a demo-only allowlist. Because this app has no password or email verification, it must not be treated as production staff authorization.

## 5. Known limit of this demo

Orders are kept **in server memory** (`src/lib/orderStore.js`). On Vercel each request may run on a different, short-lived
instance, so an order can disappear between pages even though it works locally. A real deployment needs a database.
Say so when you present rather than being surprised by it.
