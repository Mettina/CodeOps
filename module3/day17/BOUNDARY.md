# Addis Eats server/client boundary

Only components that need browser state, event handlers, effects, or context are
client components. There are **8 files with `"use client"`**.

| Component / file | Runs on | Justification |
|---|---|---|
| `app/layout.js` | Server | Renders the document shell and passes children to Providers; Header remains server-rendered. |
| `app/providers.jsx` | **Client** | Cart context requires client state; the provider is isolated from the root layout. |
| `context/CartContext.jsx` | Client by import | Implements the reducer and context used only from client components. |
| `components/Header.jsx` | Server | Static navigation; CartBadge is the interactive leaf. |
| `components/CartBadge.jsx` | **Client** | Reads the live cart count from context. |
| `components/Footer.jsx` | Server | Static site-wide branding and footer navigation. |
| `app/page.js` | Server | Static landing content. |
| `app/not-found.js` | Server | Static fallback for unknown routes. |
| `app/menu/layout.js` | Server | Shared server layout for menu and dish-detail routes. |
| `app/menu/page.js` | Server | Reads the `page`, `category`, and `search` query parameters, loads the requested menu page, and passes initial data to FilterShell. |
| `app/menu/loading.js` | Server | Static streaming fallback. |
| `app/menu/error.js` | **Client** | Error boundaries keep retry state and invoke Next.js `retry` in the browser. |
| `app/menu/[id]/page.js` | Server | Loads the dish and reviews and calls `notFound()` for unknown IDs. |
| `app/menu/[id]/loading.js` | Server | Static streaming fallback for a dish detail. |
| `app/menu/[id]/not-found.js` | Server | Static missing-dish message. |
| `app/cart/page.js` | **Client** | Reads and displays the browser-local cart context. |
| `app/checkout/page.js` | Server | Checks the session cookie before rendering checkout. |
| `components/CheckoutForm.jsx` | **Client** | Uses cart context and `useActionState`; it receives the server-rendered no-script checkout as a slot. |
| `components/NoJsCheckoutForm.jsx` | Server | Renders the no-script dish selector and submits the same server action without sending the dish list through client props. |
| `components/FilterShell.jsx` | **Client** | Holds debounced search state, uses SWR for paged searches with previous-data retention, and renders the current page with category and pagination links. |
| `components/CategoryBar.jsx` | Client by import | Its click handlers are used inside FilterShell's client boundary. |
| `components/DishList.jsx` | Client by import | Renders the current page's dish cards from server-provided initial data or SWR search results. |
| `components/DishCard.jsx` | Client by import | Renders each dish, its optional optimized local image, and AddToCartButton. |
| `components/AddToCartButton.jsx` | **Client** | Adds plain dish data to the cart on click. |
| `components/CancelButton.jsx` | **Client** | Submits the cancellation action and displays pending/error feedback. |
| `app/signin/page.js` | Server | Renders a form that invokes a server action. |
| `app/my-orders/page.js` | Server | Reads the session and filters server-side orders for that user. |
| `app/orders/page.js` | Server | Reads server-side order data on demand. |
| `middleware.js` | Middleware | Verifies the signed session cookie only for `/checkout` and `/orders` routes and redirects unauthenticated requests to sign-in. |
| `lib/data.js` | Server only | Provides menu and review data; it is not imported by a client component. |
| `app/actions/*` | Server only | Validates and performs authenticated mutations on the server. |
| `app/api/*/route.js` | Server only | Handles API requests and returns server-side responses. |

## Check yourself

- **How many files have `"use client"`?** Eight: Providers, CartBadge, AddToCartButton, CancelButton, FilterShell, CheckoutForm, the cart page, and the menu error boundary.
- **How does menu search work?** FilterShell debounces a request to `/api/dishes?search=...&page=...` through SWR and keeps previous results visible while the next page loads. The search term is reflected in the URL; an empty term uses a null SWR key.
- **How does menu paging work?** The server reads `/menu?page=N` and renders that page; category, search, and pagination update the query string. The API applies search and category filters before slicing results into pages of six.
- **Can checkout submit with JavaScript disabled?** Yes. The no-script form submits dish IDs, quantities, and delivery details to `placeOrder`; the server validates the same schema and redirects after success.
- **Where is ownership enforced for cancellation?** Inside `cancelOrder`, which reads the session and compares the order owner before changing its status.
