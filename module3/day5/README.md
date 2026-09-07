# Addis Eats - day5

A React-based Ethiopian food menu application built as the Week 1 Mini-Project. The application brings together data fetching, category filtering, searching, React Context, useReducer, custom hooks, and a shared shopping cart.

## Project Overview

Addis Eats is a simple Ethiopian food ordering application where users can browse dishes, filter them by category, search for dishes, add dishes to a cart, change quantities, remove items, and clear the cart.

The project was built with React and Vite while practicing modern React concepts.

## Features

* Fetched Ethiopian food menu
* Loading state while the menu is being fetched
* Error handling for failed requests
* Request cleanup using AbortController
* Search dishes by name
* Filter dishes by category
* Add dishes to a shared cart
* Increase item quantity
* Remove items from the cart
* Clear the entire cart
* Automatically calculate the cart total
* Display cart item count in the header
* Shared cart state using React Context
* Cart transitions managed with useReducer
* useMemo for menu filtering and provider values
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
│   │   └── CartProvider.jsx
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
│   ├── OrderForm.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md
```

## How the Application Works

### Menu Fetching

The custom useFetch hook requests the menu from:

```text
/dishes.json
```

The hook provides:

```javascript
{
  data,
  loading,
  error
}
```

An AbortController is used to cancel the request when the component is cleaned up.

### Category Filtering

Users can filter dishes by:

* All
* Main
* Vegan
* Grill

### Searching

The search field allows users to search for dishes by name.

For example:

```text
Search: Doro
```

will display dishes containing "Doro".

### Cart Context

The cart is shared between components using React Context.

The CartProvider provides:

```javascript
items
dispatch
total
itemCount
```

This allows the Header and OrderForm to access the same cart state.

### Cart Reducer

The reducer manages the cart transitions.

Supported actions:

```text
ADD
REMOVE
CLEAR
```

Example:

```javascript
dispatch({
  type: "ADD",
  payload: dish
});
```

### Cart Total

The total is calculated using:

```text
price × quantity
```
for every item in the cart.


## Running the Project

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Testing the Cart

1. Click Add on a dish.
2. Check that the cart count increases.
3. Add the same dish again.
4. Check that its quantity increases.
5. Click the remove button to decrease the quantity.
6. Click Clear cart.
7. Confirm that the cart becomes empty.
8. Add items and verify that the total updates correctly.




