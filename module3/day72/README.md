# Addis Eats — Week 1 Routing Project

A React Router application for an Ethiopian food delivery service. Built across the Day 6 exercises, this project turns the existing menu/cart app into a fully routed, multi-screen experience: a landing page, a shareable filtered menu, individual dish pages, a persistent cart, and an authenticated checkout flow.

## What you can do

- Browse a landing page and jump into the menu
- Filter dishes by category and search by name
- Share a link to a specific filtered view (e.g. `/menu?category=Vegan`)
- View any dish on its own page
- Add dishes to a cart that survives navigation between screens
- Sign in before checking out, and land back on checkout automatically after signing in
- Get a friendly "not found" page for bad URLs, instead of a crash

## Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page welcoming the user, with a link into the menu. This is the **index route** — it renders when the path matches `/` exactly, nested inside `Layout`. |
| `/menu` | `Menu` | The full dish list. Supports category filtering and text search. The selected category is stored in the URL's query string (`?category=Vegan`) via `useSearchParams`, so any filtered view can be copied, shared, or reopened directly. |
| `/menu/:id` | `DishDetail` | A single dish's detail page. Reads the `id` URL parameter with `useParams`, looks up the matching dish, and shows its image, price, and an "Add to Cart" button. Shows a "Dish not found" message (not a crash) if the `id` doesn't match any dish. |
| `/cart` | `OrderForm` | Shows everything currently in the cart, the running total, and a "Proceed to Checkout" link. Lets you remove individual items or clear the cart. |
| `/signin` | `SignIn` | A simple mock sign-in form (name only — no real authentication). On submit, it signs the user in and sends them back to wherever they were trying to go before being redirected here (e.g. `/checkout`). |
| `/checkout` | `Checkout` (guarded by `RequireAuth`) | The delivery details form (name, phone, delivery area) and order submission. **Protected** — if you're not signed in, visiting this route redirects you to `/signin` first; after signing in, you're sent straight back here. |
| `*` (any unmatched path) | `NotFound` | Catch-all for any URL that doesn't match a defined route (e.g. a typo or a stale link). Shown inside the same `Layout`, so the header/nav/footer stay visible. |

All routes above are nested inside a shared **`Layout`** route at `/`, which renders the header, navigation, an `<Outlet />` for the active page, and a footer — so the site's frame stays consistent while only the page content changes.

## Key architecture notes

- **`CartProvider` is mounted above `BrowserRouter`** (in `main.jsx`), so cart state is never affected by route changes and survives navigation between every screen.
- **`RequireAuth`** is a small wrapper component that checks auth state via `useAuth()`. If there's no signed-in user, it redirects to `/signin`, passing the attempted destination along in route state (`location`) so `SignIn` can send the user back to the right place after they sign in.
- **`NavLink`** is used for the main navigation (Home / Menu / Cart / Checkout) so the currently active screen is visibly highlighted; plain **`Link`** is used elsewhere (e.g. the logo, "Back to Menu") where active-state styling isn't needed.
- **Note:** both cart and sign-in state are held in memory (`useState`/`useReducer`), not persisted to `localStorage` or a backend. A full page refresh will clear the cart and sign you out — this is expected behavior for this project's scope, not a bug.

## Files of note

- `App.jsx` — the route table
- `Layout.jsx` — shared header/nav/footer frame with `Outlet`
- `DishDetail.jsx` — dynamic `/menu/:id` page
- `auth/RequireAuth.jsx` — route guard for `/checkout`
- `auth/AuthContext.jsx` — mock authentication state
- `cart/CartProvider.jsx` — cart state, mounted above the router

## Running locally

```bash
npm install
npm run dev
```