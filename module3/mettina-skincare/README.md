# Mettina Skin Care

A React data-driven skincare storefront.l
`index.html` / `style.css` design, wired to live data from
[Open Beauty Facts](https://world.openbeautyfacts.org) (a free, no-key,
community-run cosmetics product database).

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
mettina-skincare/
├── index.html          # Vite entry HTML
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # React root, imports style.css
│   ├── App.jsx                 # Shared state + data fetching, assembles the pages
│   ├── data.js                 # Constants (categories, price ranges, payment methods) + helper functions
│   ├── style.css               #  CSS 
│   └── components/
│       ├── Header.jsx           # Logo, nav links, search, cart dropdown
│       ├── Sidebar.jsx          # Category / price / favorites filters
│       ├── Hero.jsx             # Banner section
│       ├── ProductGrid.jsx      # Toolbar (sort/count) + card grid
│       ├── ProductCard.jsx      # A single product card
│       ├── Footer.jsx
│       ├── Checkout.jsx         # Independent checkout page (order summary + payment)
│       ├── About.jsx
│       └── Contact.jsx          # Simulated contact form (no backend)
```

`App.jsx` holds all shared state (products, cart, favorites, filters, current page) and
passes it down as props — each component in `components/` is otherwise self-contained
and only knows about the props it's given.

## What's real vs. simulated

- **Products, images, brand names, categories** — real, fetched live from
  Open Beauty Facts across 5 categories (Cleansers, Moisturizers, Serums,
  Sunscreen, Toners), matching sidebar exactly.
- **Prices (ETB)** — Open Beauty Facts doesn't include pricing data, so
  prices are generated deterministically per product (same product always
  shows the same price) so the Price filter and Sort-by-price have
  something real to work with. This is worth mentioning if asked, since
  it's not live pricing.
.
- **NEW / SALE / BEST badges** — assigned deterministically per product for
  visual variety, same reasoning as the price simulation.

## Features implemented

- Live API fetch (`useEffect` + `fetch` + `Promise.allSettled` across 5 categories)
- Card-based product display
- Category filtering (real data)
- Search by product name
- Price filtering
- Sort by Featured / Price / Newest (real creation date from the API)
- Cart: add, quantity +/- controls, remove, running total, dropdown panel
- Wishlist: heart-to-save on each card, separate dropdown, move items to cart
- Checkout flow: order summary, payment method selection (Cash on Delivery,
  Telebirr, Bank Transfer, Card), order confirmation with a generated order
  number. This is a simulated checkout — no real payment is processed.

