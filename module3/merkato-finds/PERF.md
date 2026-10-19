# Merkato Finds performance

## How to measure (do this for BOTH columns)

Lighthouse in Chrome DevTools, **mobile**, simulated throttling, a private window, a production build
(`npm run build && npm run start`, or the deployed URL). Run each page three times and record the **median**.
Never use `next dev`. Lighthouse gives no field INP, so write "unavailable" rather than guessing from Total Blocking Time.

- **Before** column: build the ORIGINAL `merkato-finds-finished-project.zip` (the version before the Day 49 changes) and measure it.
- **After** column: this project, then again on the deployed URL.

## Budget

| Measure | Target | Before (original zip) | After (local) | After (deployed) | Met? |
|---|---|---|---|---|---|
| LCP, `/` (mobile, throttled) | under 2.5 s | ☐ | ☐ | ☐ | ☐ |
| LCP, `/product/1` | under 2.5 s | ☐ | ☐ | ☐ | ☐ |
| CLS, `/` | under 0.1 | ☐ | ☐ | ☐ | ☐ |
| INP | under 200 ms | unavailable | unavailable | unavailable | n/a |
| First Load JS, `/shop` | under 120 kB | ☐ | ☐ | ☐ | ☐ |
| Largest image transferred, `/shop` | under 150 kB | ☐ | ☐ | ☐ | ☐ |
| Lighthouse performance, `/` | 90 or better | ☐ | ☐ | ☐ | ☐ |

Fill every cell from your own runs. If a target is missed, say so in the next section instead of leaving it blank.

## What changed and why (the cause of each change)

These are the changes made to performance. I have **not** measured them (they were made without running a build),
so the effect on each number is for you to record above, not something to assume.

1. **Fonts through `next/font/google`** (`src/app/layout.js`) instead of a CSS `@import` of Google Fonts. The `@import`
   made the browser fetch a stylesheet, then the font files, before text could paint. Now the fonts are self-hosted at
   build time with `display: swap`. Expected effect: earlier first paint.
2. **The hero image and the product detail image use `next/image` with `priority`** and a `sizes` value
   (`src/app/page.js`, `src/app/product/[id]/page.js`). They are the LCP elements; `priority` preloads them and `sizes`
   stops the browser fetching a desktop-sized file on a phone. Unsplash is allowed in `next.config.js` (`images.remotePatterns`).
3. **Product-card images use `next/image` with `fill` and `sizes`** (`ProductCard.js`), so each card gets a resized, modern-format
   file instead of the 1000 px original. Expected effect: smaller image bytes on `/shop` and the home page.
4. **Below-the-fold images are lazy** (`loading="lazy"`, `decoding="async"`, explicit `width`/`height`): category cards, the
   maker banner, bag and checkout thumbnails. Expected effect: less work at load, and no layout shift from late images.
5. **The product page is a server component, prerendered** (`generateStaticParams`) instead of a client page that read the id
   from the URL and rendered after JavaScript loaded. Only quantity and the bag buttons ship as client code (`ProductActions.js`).

## Known costs, not fixed (see FUTURE.md)

- The catalog is bundled into the client listing page, which is fine at 12 products and would not be at 12,000.
- Category cards, the maker banner and the about-page image are still plain `<img>` pointing at Unsplash.
- Product photos come from a third-party host, so their speed is partly outside this project's control.
