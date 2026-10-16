# Day 18 Lighthouse baseline

Lighthouse was run against an isolated Day 18 production build served locally
at `http://127.0.0.1:3018`. The existing app on port 3000 was left running.
Each URL was audited three times; the table records the median result. An
earlier attempt against port 3000 was discarded after verifying that server
was `next dev`, not a production build.

## Test setup

- Lighthouse 13.5.0; Chrome 154.0.0.0 (headless)
- Mobile emulation: Moto G Power (2022)
- Simulated throttling: 150 ms RTT, 1,638.4 Kbps throughput, 4x CPU slowdown
- Production server: `npm run start` after `npm run build`

## Results

| Page | LCP | CLS | INP | TBT (lab diagnostic) | Performance score |
|---|---:|---:|---|---:|---:|
| `/` | 2.76 s | 0.000 | Not available | 252 ms | 97 |
| `/menu` | 3.36 s | 0.719 | Not available | 401 ms | 61 |

Lighthouse's navigation-mode lab audit did not produce an INP value, and
`localhost` has no Chrome UX Report (CrUX) field data. TBT is reported as a lab
responsiveness diagnostic; it is **not** an INP measurement or substitute.
Collect INP from real user interactions using field data (CrUX/PageSpeed Insights
after deployment) or real-user monitoring. See
[web.dev's INP measurement guide](https://web.dev/articles/inp#how_to_measure_inp).

The `/menu` CLS result is high: Lighthouse attributed one large shift to the
menu layout container. This should be investigated as a follow-up performance
exercise. These measurements are a throttled local baseline, not field
performance data.
