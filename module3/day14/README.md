# Addis Eats: Sorting the Boundary

Next.js (app router) menu app. Data is fetched in async server components, `"use client"` sits only on
interactive leaves, the cart provider is isolated in `app/providers.jsx`, and a client `FilterShell`
wraps the server `DishList` through `children`. See [BOUNDARY.md](./BOUNDARY.md) for every component.

## Run

```bash
npm install
npm run build  
npm run dev
```

## Bundle measurement: First Load JS for `/menu`

Run `npm run build` and read the `/menu` row of the route table. If your Next version does not print sizes, add up the JS transferred for `/menu` in the browser Network tab (disable cache, hard reload), and use the same method for both numbers.

| | First Load JS for `/menu` |
|---|---|
| Before (client page with `useFetch`, `"use client"` high in the tree) | ___ kB |
| After (this sorted version) | ___ kB |

**Explanation (write in your own words after measuring):** The drop comes from the fetching hook and
its state logic no longer shipping, components that were client only because of a high-level directive
now staying on the server, and the dish cards arriving as HTML instead of JavaScript.

## Exercise log

1. Menu page converted to an async server component.
2. `useFetch` and its loading/error state deleted from the route.
3. `grep -rl "use client" app components context` listed every directive.
4. Directives moved down to the smallest components that need them.
5. Cart provider extracted into `app/providers.jsx`.
6. `DishList` wrapped in `FilterShell` through `children`.
7. Before/after First Load JS recorded above.
