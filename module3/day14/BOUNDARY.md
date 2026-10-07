# BOUNDARY.md: Addis Eats server/client sort

A component is **Server** unless it needs state, handlers, effects, context or a browser API.
"use client" appears in **7 files**. Every other component is a server component or
is client only because a client file imports it.

| Component / file | Runs on | Justification |
|---|---|---|
| `app/layout.js` | Server | Renders the shell and passes `children` into Providers; imports Providers (client boundary) and Header (server). |
| `app/providers.jsx` | **Client** (`"use client"`) | Context holds state, so the provider must be client; isolated here so layout stays on the server. |
| `context/CartContext.jsx` | Client (by import) | Uses `useReducer` and context; only imported from client files, so it needs no directive of its own. |
| `components/Header.jsx` | Server | Static links; the one stateful part is split out into CartBadge. |
| `components/CartBadge.jsx` | **Client** (`"use client"`) | Reads the cart count from context and links to the cart. |
| `app/cart/page.js` | **Client** (`"use client"`) | Reads cart items from context and renders the cart contents. |
| `app/page.js` | Server | Static intro and a link. |
| `app/menu/page.js` | Server | `async`, awaits `getDishes()` directly; no hooks or loading/error state. |
| `app/menu/loading.js` | Server | Static fallback shown while the menu page awaits. |
| `app/menu/error.js` | **Client** (`"use client"`) | Error boundaries must be client components: they hold error state and call `retry` (Next 16.3) in the browser to re-render the segment. |
| `components/FilterShell.jsx` | **Client** (`"use client"`) | Holds the selected category; receives the server-rendered DishList through `children` and filters it with a CSS rule on `data-category`. |
| `components/CategoryBar.jsx` | Client (by import) | Has click handlers but is only imported by FilterShell, which is already client. |
| `components/DishList.jsx` | Server | Pure markup from data; ships no JavaScript. |
| `components/DishCard.jsx` | Server | Markup from data; its button is a separate client leaf. |
| `components/AddToCartButton.jsx` | **Client** (`"use client"`) | `onClick` writing to the cart; receives only `id`, `name`, `price`. |
| `components/CancelButton.jsx` | **Client** (`"use client"`) | Uses `useActionState` to submit a cancellation server action and show pending/error feedback. |
| `app/dish/[id]/page.js` | Server | `async`, `Promise.all` for dish and reviews; `notFound()` for the empty case. |
| `app/dish/[id]/loading.js` | Server | Static fallback for the dish route. |
| `app/dish/[id]/not-found.js` | Server | Static message for a missing dish. |
| `lib/data.js` | Server only | Data layer (`getDishes`, `getDish`, `getReviews`); never imported by a client file. |

## Check yourself

- **How many files contain "use client"?** Seven: `providers.jsx`, `CartBadge.jsx`, `AddToCartButton.jsx`, `FilterShell.jsx`, `error.js`, `cart/page.js`, and `CancelButton.jsx`.
- **Does the menu page work with every fetching hook deleted?** Yes. There are no fetching hooks; the page awaits its data.
- **Is DishList shipped to the browser?** No. `FilterShell` never imports it; it arrives as `children`, already rendered. Proof: after `npm run build`, search `.next/static/chunks` for a string only DishList contains (e.g. `dish-list`); it will not be found there but will be in `.next/server`.
- **Does layout.js import anything that carries the directive?** Only `Providers`, the one intended boundary. `Header` is a server component.
- **Why does error.js need "use client"?** Because an error boundary keeps state about the failure and `retry` re-renders the segment in the browser, which only client React can do.
