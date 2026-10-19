# Presentation notes (8 minutes). Say it aloud once, with a timer.

Open these five files in tabs BEFORE you start:
1. `src/app/product/[id]/page.js` (server component)
2. `src/components/CheckoutForm.js` (client component)
3. `src/app/actions/cancelOrder.js` (protected action; or `placeOrder.js`)
4. `src/app/orders/page.js` (data query)
5. `src/app/actions/placeOrder.js` together with `src/lib/orders.js` (the refactor)

## Timing

| Minutes | Say / do |
|---|---|
| 0-1 | "Merkato Finds helps someone in Ethiopia discover products from independent local sellers and order them." One sentence on who and what. No code. |
| 1-3 | Live URL: shop, filter a category, open a product, add to bag, wishlist a second one, checkout, place the order, open `/orders`. |
| 3-5 | ONE technical decision (see below). |
| 5-6 | The attacks, refused. Show the results in VERIFY.md and point at the line that refused each. |
| 6-7 | PERF.md: before, after, the cause. Say honestly which targets were missed. |
| 7-8 | What you cut (FUTURE.md) and what you would do with another week. |

## The one decision (pick one; all true of this code)

- **The server decides the price.** Before, checkout built the order in the browser and saved it to localStorage, so the browser decided the total. Now the browser sends only product ids and quantities; `createOrder` looks each id up in the catalog and computes the total, and the owner comes from the session.
- **Ownership is part of the lookup.** `getOrder(id, session.user)` takes the owner as an argument, so a wrong id cannot return someone else's order even if a page forgets to check.
- **A static product page with a small client leaf.** `/product/[id]` is prerendered with its own metadata; only quantity and the bag buttons are client code (`ProductActions.js`).

## Files: what to say

| File | Why |
|---|---|
| `product/[id]/page.js` | Server component: it only renders catalog data, metadata and JSON-LD, so it can be static and indexable. It used to be a client page. |
| `CheckoutForm.js` | Has to be a client component: it reads the bag from localStorage, holds form state and uses `useFormState`/`useFormStatus`. The server action it calls does the real work. |
| `cancelOrder.js` | Two checks inside the action: `getSession()` (L9), then the owner-scoped `getOrder` (L14). Hiding the button proves nothing. |
| `orders/page.js` | Runs on the server; `listOrders(session.user)` scopes the list to the owner. |
| `placeOrder.js` + `lib/orders.js` | Refactor: before, the order was built in the browser; now the action checks the session, makes the write idempotent, validates, and prices from the catalog. |

## Questions you will be asked

| Question | Answer from this project |
|---|---|
| Why is this a client component? | `CheckoutForm` needs the browser's bag (localStorage), form state and the pending status. |
| What happens if I call this action signed out? | `getSession()` returns null and the action returns "Please sign in..."; middleware lets action POSTs through on purpose so the action can answer. |
| Why this rendering strategy? | Pages that read the cookie are dynamic (`ƒ`); product pages are static from `generateStaticParams`. See STRATEGY.md. |
| What would you do with another week? | A database, real credentials, an account-bound bag, listing filters in the URL, tests (FUTURE.md). |
| Hardest part? | Be honest. For example: moving the order logic from the browser to the server without breaking the checkout flow. |

"I do not know" is fine once, followed by how you would find out.
