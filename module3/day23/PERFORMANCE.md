
# Historical Lighthouse measurement (superseded)

This earlier production comparison measures the text-only menu fallback
against the previous skeleton. The current before/after mini-project results,
including the fix for the observed layout shift, are recorded in
[PERF.md](./PERF.md).

Lighthouse 13.5.0 ran in Chrome with mobile emulation and simulated throttling,
three times per version. Values below are the medians of those runs. Since the
test target is localhost, field INP data is unavailable; no INP result is
claimed.

| Lighthouse measure | Skeleton baseline | Text fallback | Difference |
|---|---:|---:|---:|
| Performance score | 72 | 48 | -24 points |
| Accessibility score | 96 | 96 | No change |
| Best Practices score | 96 | 96 | No change |
| SEO score | 100 | 100 | No change |
| Agentic Browsing score | 100 | 53 | -47 points |
| First Contentful Paint | 0.937 s | 0.798 s | -0.139 s |
| Largest Contentful Paint | 4.031 s | 4.407 s | +0.377 s |
| Speed Index | 2.725 s | 2.560 s | -0.165 s |
| Total Blocking Time | 462.5 ms | 537.0 ms | +74.5 ms |
| Cumulative Layout Shift | 0.000 | 0.719 | +0.719 |
| Time to Interactive | 4.076 s | 4.506 s | +0.430 s |

The largest consistent regression is CLS: it was 0.000 in all three baseline
runs and 0.719 in all three modified runs. The performance score was 71–85 for
the baseline and 47–50 for the text fallback. The fallback no longer reserves
the menu's layout while content loads, matching the observed layout shift.
Timing metrics vary between runs, so the CLS result is the clearest direct
signal; the score and other timing differences should be treated as indicative,
not exact causal measurements.

## Third-party scripts

Audited `app/`, `components/`, `context/` and `lib/` for `<script>` tags,
analytics or tag-manager snippets, and external script URLs. None are present,
so there was nothing to migrate to `next/script`. Inter is loaded through
`next/font`, which self-hosts it at build time, so it adds no third-party
request.

If a third-party script is added later (analytics, chat widget), it should use
`next/script` with `strategy="lazyOnload"` so it loads after the page is idle
and stays out of the LCP/TBT path.