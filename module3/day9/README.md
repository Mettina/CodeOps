# Addis Eats

An Ethiopian food ordering app built with React, React Router, and Vite.
Browse a menu, add dishes to a cart, and check out — with client-side
validation, error boundaries, lazy-loaded routes, and a keyboard- and
screen-reader-accessible checkout form.

## Running it locally

```bash
git clone <this-repo-url>
cd <repo-folder>
npm install
npm run dev
```

Then open the URL shown in your terminal (typically `http://localhost:5173`).

No environment variables or external services are required — the menu
data is served from a static `dishes.json` file in `public/`.

## Routes

| Path          | Renders                          | Notes                          |
|---------------|-----------------------------------|---------------------------------|
| `/`           | Home                              |                                  |
| `/menu`       | Menu (dish grid, search, filters) | Wrapped in an error boundary    |
| `/menu/:id`   | Dish detail                       | Dynamic route                   |
| `/cart`       | Cart                              | Wrapped in a separate error boundary |
| `/checkout`   | Checkout form                     | Requires sign-in; lazy-loaded behind Suspense |
| `/signin`     | Sign in                           |                                  |
| `*`           | Not found                         | Catch-all                       |

## What's implemented

- Menu fetched from a static JSON file, with visible loading, error, and
  empty states.
- Category filter reflected in the URL's query string; a dynamic
  `/menu/:id` route reads its own dish by id.
- Cart state (Zustand) readable from the header badge and the cart page
  independently.
- A checkout form with field-level validation, touched-based error
  display, full ARIA wiring, and a simulated submit that can succeed or
  fail.
- A dish quick-view modal built with `createPortal`, closing on Escape,
  trapping focus while open, and returning focus to the trigger on close.
- Independent error boundaries around the menu and cart regions, so a
  failure in one doesn't take down the other; a third around the
  lazy-loaded checkout route catches chunk-load failures the same way.
- One measured, fixed unnecessary re-render (`CategoryBar`), documented
  with before/after evidence in `PROFILE.md`.

See `README.md` inside the checkout-related files for the field-by-field
validation rules and why each one exists, and `PROFILE.md` for the
profiling investigation.

## Testing notes

Every route was verified with a cold load (typed directly into the
address bar, then hard-refreshed) rather than only navigated to from
within the app. The checkout form was verified for full keyboard-only
operation and for error visibility under a greyscale/colorblindness
emulation, not color alone.