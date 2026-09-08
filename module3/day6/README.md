# Addis Eats - day5

A React-based Ethiopian food menu application built as the Week 1 Mini-Project. The application brings together data fetching, category filtering, searching, React Context, useReducer, custom hooks, and a shared shopping cart.

## Project Overview

Addis Eats is a simple Ethiopian food ordering application where users can browse dishes, filter them by category, search for dishes, add dishes to a cart, change quantities, remove items, and clear the cart.

The project was built with React and Vite while practicing modern React concepts.

## Features

* Fetched Ethiopian food menu, re-fetched whenever the category filter changes
* Loading state while the menu is being fetched
* Error handling for failed requests
* Request cleanup using AbortController
* Search dishes by name (client-side, on top of the category-filtered fetch)
* Add dishes to a shared cart, with a max quantity per dish (20)
* A quantity stepper (− qty +) per dish once it's in the cart
* Remove items from the cart
* Clear the entire cart
* Automatically calculate the cart total
* Display cart item count as a badge in the header
* Light/dark theme via ThemeContext, read from Dish.jsx three levels deep
* Shared cart state using React Context
* Cart transitions managed with useReducer
* useMemo for menu filtering and provider values; useCallback for cart handlers
* React.memo on Dish so unrelated dish cards don't re-render on cart changes
* Automatically focus the search field
* Responsive styling
* TeleBirr phone number validation
* Delivery information form

## Project Structure

```text
day5/
│
├── public/
│   └── dishes.json
│
├── src/
│   ├── cart/
│   │   ├── cartReducer.js
│   │   ├── cartReducer.checks.js   <- Exercise 3: direct plain-object calls
│   │   └── CartProvider.jsx
│   │
│   ├── theme/
│   │   └── ThemeContext.jsx        <- Exercise 1
│   │
│   ├── exercises/
│   │   └── DeliveryFormComparison.jsx  <- Exercise 4 (standalone, not wired into the app)
│   │
│   ├── hooks/
│   │   └── useFetch.js
│   │
│   ├── api.js
│   ├── App.jsx
│   ├── CategoryBar.jsx
│   ├── Dish.jsx
│   ├── DishList.jsx
│   ├── Header.jsx
│   ├── Menu.jsx
│   ├── MenuStats.jsx               <- Exercise 2's second useFetch usage
│   ├── OrderForm.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md
```

## Exercises checklist

Each exercise is marked with a comment in the relevant file (search for `Exercise N`).

1. ThemeContext ("light"/"dark") — `theme/ThemeContext.jsx`, read in `Dish.jsx`.
2. `useFetch` in its own file, used in two components — `Menu.jsx` and `MenuStats.jsx`.
3. Pure `cartReducer`, called directly with plain objects — `cart/cartReducer.js` + `cart/cartReducer.checks.js` (`node src/cart/cartReducer.checks.js`).
4. Three `useState` calls converted to `useReducer`, both kept for comparison — `exercises/DeliveryFormComparison.jsx` (standalone practice file, not rendered by the app).
5. `CartProvider` with `useReducer`, providing items/dispatch/total — `cart/CartProvider.jsx`.
6. Provider value memoised with `useMemo`, commented — `cart/CartProvider.jsx`.
7. `React.memo` + `useCallback` on the dish list, profiled — `Dish.jsx` (memo), `Menu.jsx` (useCallback for add/remove). To see the effect: open React DevTools Profiler, record, add one dish to the cart, stop recording. Before this change, every dish card would light up as re-rendered; now only the one you clicked does.






