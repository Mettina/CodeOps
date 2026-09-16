# PROFILE.md — Hardening Addis Eats

## What was profiled

A React DevTools Profiler session was recorded while adding three dishes to
the cart from `/menu`. The recording showed `Header` and `DishList`
re-rendering on every "Add" click, which is expected — both depend on cart
state. Investigating further (see below), the actual unnecessary re-render
turned out to be in a component that *shouldn't* have been affected by
cart or search activity at all: `CategoryBar`.

## The slow / unnecessary render

**Component:** `CategoryBar`

**Trigger:** Typing in the menu's search box (`search` state, owned by
`Menu.jsx`) — an action that has nothing to do with categories.

**Confirmed with `console.log`:** A `console.log("CategoryBar rendered")`
was added temporarily inside the component. Typing **"doro"** (4
keystrokes) into the search box produced **16 log lines** (8 real
re-renders, doubled by React Strict Mode's dev-only double-invoke) — i.e.
`CategoryBar` re-rendered on every single keystroke, even though neither
its `categories`, `selected`, nor (logically) `onSelect` prop should have
needed to change from typing a search term.

## What caused it

Two things, both required to fully explain it:

1. **`CategoryBar` was not memoized.** It's a plain function component, so
   by default it re-renders whenever its parent (`Menu`) re-renders — for
   any reason, not just reasons relevant to `CategoryBar` itself.
2. **`handleCategoryChange` in `Menu.jsx` was not wrapped in `useCallback`.**
   Even if `CategoryBar` had been wrapped in `memo()` alone, this function
   was being recreated as a brand-new reference on every render of `Menu`
   (which happens on every keystroke, since `search` is `Menu`'s own
   state). A memoized component still re-renders if a function prop is a
   new reference each time — so `memo()` by itself would not have fixed
   this.

## The fix

- Wrapped `CategoryBar`'s export in `memo()`.
- Wrapped `handleCategoryChange` in `Menu.jsx` in `useCallback`, with
  `setSearchParams` as its dependency.

Both changes were necessary together; either alone would not have stopped
the re-render.

## After — measured, not assumed

- **`console.log` re-test:** typing "doro" again after the fix produced
  **zero** `"CategoryBar rendered"` log lines.
- **Profiler re-test:** recorded a fresh session, typed in the search box,
  and inspected the resulting commit. "What caused this update?" correctly
  attributed the commit to `Menu` alone. `CategoryBar` does not appear
  anywhere in that commit's flame graph — not even as a skipped/bailed-out
  bar — confirming React never attempted to render it. Total commit render
  time: **2.2ms**, covering `Menu` and `DishList` (which legitimately
  needs to re-filter on search) — `CategoryBar` contributes nothing to
  that number anymore.

## Why `Dish` was ruled out first

Before finding the real issue, `Dish` (rendered in a list inside
`DishList`) was suspected first, since the Profiler's flame graph showed
many thin bars under `DishList` on every "Add" click. A `console.log`
test proved this suspicion wrong: clicking "Add" on one dish only ever
logged that one dish's name, never the others. `Dish` was already
correctly wrapped in `memo()`, and its `onIncrement`/`onDecrement` props
were already stable via `useCallback` in `Menu.jsx`. No change was made
there — confirming the project's rule that no optimisation should be
applied without a measurement proving it's needed.

## Note on the checkout/receipt routes

This app has a `checkout` route but no separate `receipt` route — order
confirmation is shown inline within `Checkout.jsx` after a successful
submit, not as its own page. Only `Checkout` was lazy-loaded behind
`Suspense`, verified via the Network tab: the `Checkout.jsx` chunk is not
requested until the user actually navigates to `/checkout`.