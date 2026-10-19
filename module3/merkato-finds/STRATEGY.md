# Rendering strategy

Markers come from the production build route table: `○` static, `●` prerendered from static params, `ƒ` rendered on demand.
Confirm them against your own `npm run build` output. The root layout does not read cookies, so public pages stay static.

| Route | Strategy | Marker | Reason |
|---|---|---|---|
| `/`, `/shop`, `/search`, category pages | Static | `○` | No request-specific data; the client leaf does the filtering. |
| `/product/[id]` | Static via `generateStaticParams` | `●` | All 12 ids are known at build time; `dynamicParams = false` makes any other id a 404. |
| `/cart`, `/wishlist` | Static | `○` | Contents come from this browser's store after mount. |
| `/about`, `/contact`, `/sell` | Static | `○` | Fixed content. |
| `/login`, `/signup` | Dynamic | `ƒ` | Read `searchParams` (return link, error flag). |
| `/checkout`, `/orders`, `/account`, `/order-success` | Dynamic | `ƒ` | Read the session cookie; `/order-success` also reads `?id=`. |
| `/sitemap.xml`, `/robots.txt` | Static | `○` | Generated from the catalog at build time. |

Chosen on purpose: a page that reads cookies is dynamic and private, so it carries `robots: noindex` as well as being
absent from the sitemap; a page with no per-request data is static.
