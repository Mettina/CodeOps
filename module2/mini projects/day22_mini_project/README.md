# Birr Watch

Birr Watch is a single-page currency converter that uses live Ethiopian Birr (ETB) exchange rates.

The app allows users to:

* Convert an amount from ETB to a selected currency.
* View live exchange rates.
* Add currencies to a watchlist.
* Prevent duplicate currencies in the watchlist.
* Remove currencies from the watchlist.
* See an empty-state message when the watchlist is empty.
* Save the watchlist using `localStorage`.
* Save and restore the last selected currency after a page reload.
* Display loading and error states when loading exchange rates.

## API

Birr Watch uses the ExchangeRate API to load live ETB exchange rates.

API endpoint:

`https://api.exchangerate-api.com/v4/latest/ETB`

The app fetches the rates when the page starts and stores them in the JavaScript state object.

## Technologies

* HTML
* CSS
* JavaScript
* Fetch API
* LocalStorage

## How to Open

Open `index.html` in a browser.

For the best experience, open the project using **Live Server** in VS Code.

## Project Files


day22_mini_project/
│
├── index.html
├── styles.css
├── app.js
└── README.md


## State → Render → Events

The application follows the state → render → events approach.

The `state` object stores the application data, including:

* Exchange rates
* Watchlist
* Selected currency
* Amount
* Loading state
* Error state

The `render()` function updates the interface from the current state.

User events update the state and then render the updated interface.

