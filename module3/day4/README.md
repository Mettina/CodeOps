# Addis Eats — Day 3

The static menu becomes a working ordering screen: clickable category chips
filter the dishes, an order total grows in ETB, and a controlled delivery
form validates a TeleBirr number live.

## What it is

- `CategoryBar` — stateless, receives `selected`/`onSelect` as props, highlights the active chip.
- `Menu` — owns the `category` state (lifted here so it can drive both `CategoryBar` and the filtered list) plus the running `orderTotal`.
- `DishList` — renders the filtered dishes with an empty state.
- `Dish` — owns its own `count` state, reports each "Add" click up via `onAdd`.
- `OrderForm` — one `form` state object `{ name, phone, area }`, one `handleChange`, live TeleBirr validation, submit disabled until valid.

## How to run

```bash
npm install
npm run dev
```
