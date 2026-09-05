# Addis Eats — Day 2

Same static menu as Day 1, rebuilt with typed, pattern-rich components:
PropTypes and a currency default on `Dish`, a conditional spicy badge,
a `Card` wrapper built on `children`, and a `Menu` that filters by
category with an early-return empty state.

## What it is

- `Dish` — validates `name`/`price` as required props via PropTypes, defaults
  `currency` to `"ETB"`, and shows a "Spicy" badge only when `spicy === true`.
- `Card` — a reusable wrapper that renders whatever `children` it's given.
- `Menu` — filters `dishes` by a `category` prop and returns an empty-state
  message early when nothing matches.

## How to run

```bash
npm install
npm run dev
```
