# Rendering Strategy — Addis Eats

Every route in the app, its rendering strategy, and the reason it's chosen.

| Route | Strategy | Why |
|-------|----------|-----|
| `/` | Static (revalidate 60s) | Marketing home page; content rarely changes but should refresh periodically. |
| `/_not-found` | Static | Built-in 404 shell; no per-request data. |
| `/menu` | Static (revalidate 60s) + streamed Suspense | Menu data changes slowly; a revalidate window keeps it fresh without full dynamic rendering. The dish list is streamed so the sidebar never waits for the dishes. |
| `/menu/[slug]` | SSG (generateStaticParams) | Each dish page is fully known at build time — one page per dish, served from CDN. |
| `/checkout` | Dynamic | Reads `cookies()` to determine the user's cart; must run per request. |