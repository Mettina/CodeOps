
## Third-party scripts

Audited `app/`, `components/`, `context/` and `lib/` for `<script>` tags,
analytics or tag-manager snippets, and external script URLs. None are present,
so there was nothing to migrate to `next/script`. Inter is loaded through
`next/font`, which self-hosts it at build time, so it adds no third-party
request.

If a third-party script is added later (analytics, chat widget), it should use
`next/script` with `strategy="lazyOnload"` so it loads after the page is idle
and stays out of the LCP/TBT path.