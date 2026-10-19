# Addis Eats production performance

## Measurement

Lighthouse 13.5.0, Chrome, mobile emulation and simulated throttling. Each
number is the median of three runs against a production build served with
`npm run start` on localhost (never `next dev`). The baseline was captured
before the performance changes. Local Lighthouse runs provide no field INP
data, so INP is recorded as unavailable rather than inferred from Total
Blocking Time. Lab timings vary between runs; CLS was consistent in all three
menu runs.

| Route and stage | Performance | FCP | LCP | Speed Index | TBT | CLS | INP (field) |
|---|---:|---:|---:|---:|---:|---:|---|
| `/` before | 84 | 1.104 s | 3.186 s | 2.445 s | 328.5 ms | 0.000 | Unavailable |
| `/` after image change | 85 | 0.887 s | 3.034 s | 2.346 s | 408.5 ms | 0.000 | Unavailable |
| `/menu` before (text-only fallback) | 49 | 0.825 s | 4.429 s | 2.541 s | 490.4 ms | 0.719 | Unavailable |
| `/menu` after skeleton | 73 | 0.869 s | 4.425 s | 2.675 s | 457.0 ms | 0.000 | Unavailable |
| `/menu` final (optimized hero image) | 75 | 0.921 s | 4.064 s | 3.351 s | 401.0 ms | 0.000 | Unavailable |

Scores were 52, 87, 84 before and 87, 85, 82 after on `/`; on `/menu` they
were 56, 49, 47 before, 80, 73, 73 after the skeleton change, and 81, 75, 75
after the image change. One unusually slow run affected baseline home TBT;
final menu Speed Index ranged from 2.157 s to 3.401 s, so the medians and ranges
matter more than any single score.

## What changed and why

1. **Reserved the menu layout while data loads.** Replaced the text-only
   fallback with a skeleton matching the menu hero, filter controls, and six
   dish cards. This reserves the space the final page needs: menu CLS fell from
   `0.719` to `0.000` in all three runs, and the median Performance score rose
   from 49 to 73. LCP was effectively unchanged (4.429 s to 4.425 s); this was
   a layout-stability fix, not the LCP improvement.
2. **Made the hero photo an early, responsive image request.** Replaced the
   animated CSS background-photo rotation on `/` and `/menu` with one
   `next/image` hero photo, explicit dimensions, responsive `sizes`, `priority`,
   and `fetchPriority="high"`. This also removes CSS background image requests;
   menu-card photos remain `next/image` but are not preloaded. Their responsive
   `sizes` values now match the actual padded grid widths, avoiding oversized
   source selection. Lighthouse now
   identifies the hero `<img>` as the LCP element, and its LCP discovery checks
   pass (`priorityHinted`, `requestDiscoverable`, and `eagerlyLoaded`).
   Compared with the skeleton stage, median LCP improved by 0.362 s on `/menu`;
   compared with the original baseline, it improved by 0.365 s. On `/`, LCP
   improved by 0.151 s from baseline. This image/preload change did the most
   to improve LCP; the skeleton change did the most to prevent layout shift.

The menu Speed Index regressed in its median (2.675 s to 3.351 s) even as its
LCP, TBT, and Performance score improved; this remains a follow-up area. Home
TBT also increased in its median (328.5 ms to 408.5 ms), while the home
Performance score rose by one point. These mixed results are recorded rather
than attributed to an image win.

## Image, font, script, and environment checks

- All photos use `next/image` with explicit `width`, `height`, `sizes`, and
  descriptive `alt` text. The hero is the only prioritized image on `/` and
  `/menu`; the dish-detail route prioritizes its single main dish image.
- All image URLs are local files under `public/img/`, so no remote image hosts
  are needed or allowlisted.
- Inter is loaded through `next/font/google`; Next.js emits self-hosted font
  files at build time instead of requesting Google Fonts from the browser.
  This was already in place for the baseline: there was no font link to
  replace, so the measured CLS improvement is from reserving menu layout with
  the skeleton, not from a font change.
- The app has no third-party script tags or external script integrations to
  defer. If one is introduced, load it with `next/script` using an appropriate
  non-blocking strategy such as `lazyOnload`.
- `.env.example` is tracked, `.env*.local` is gitignored, and no browser
  variable uses the `NEXT_PUBLIC_` prefix. Set a random `SESSION_SECRET` in
  your own `.env.local`; `STAFF_USERS` is optional. See [README.md](./README.md)
  for clone, environment, build, and production-run steps.

## Performance budget (Day 45)

Same measurement setup as above (production build, `npm run start`, mobile
emulation, simulated throttling). Targets come from the brief.

| Measure | Target | Before | After | Met? |
|---|---|---|---|---|
| LCP, throttled (`/menu`) | under 2.5 s | 4.429 s | 4.064 s | No |
| LCP, throttled (`/`) | under 2.5 s | 3.186 s | 3.034 s | No |
| CLS (`/menu`) | under 0.1 | 0.719 | 0.000 | Yes (see note) |
| First Load JS, `/menu` | under 120 kB | not yet measured | not yet measured | Unknown |
| Largest image | under 150 kB | not yet measured | not yet measured | Unknown |
| Lighthouse performance (`/menu`) | 90 or better | 49 | 75 | No |
| Lighthouse performance (`/`) | 90 or better | 84 | 85 | No |

**To fill the two unknown rows:** run `npm run build` then `npm run start`, open
`/menu` with the Network tab (cache disabled, "JS" filter) and add up the
transferred size of the JavaScript files; then filter "Img" and record the
largest transferred image (next/image serves resized files, so this is smaller
than the 192 KB original in `public/img`).

**Cause of each change:** the skeleton reserved the menu layout (CLS); the
single prioritised `next/image` hero is what moved LCP. Details are in "What
changed and why" above.

**Note on the CLS "before":** the 0.719 baseline is the text-only fallback tried
before the skeleton, so that win is mostly undoing a regression rather than
improving a shipped page.

**Targets missed, and what the repo shows about why:**

- LCP and score: Lighthouse reports Total Blocking Time of about 400 ms after
  the changes, which weighs heavily in the performance score, and the LCP element
  (the hero image) is already preloaded with `priority`, so discovery is not the
  remaining delay.
- `lib/data.js` adds a deliberate 300 ms delay in `getDishes()` (simulated
  database latency). `/menu` is rendered per request, so every visit pays it
  before any HTML is sent. This is a known contributor to the slow `/menu` LCP;
  it was left in because it is the exercise's data layer, not an optimisation target.
- Menu Speed Index regressed (2.675 s to 3.351 s) and is recorded as an open follow-up.
