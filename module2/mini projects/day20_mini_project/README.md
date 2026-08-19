# Country Facts Page

## Description

A single-page application that fetches and displays country information from the REST Countries API.

The user can search for a country by name and view its capital, population, region, currency, and flag.

The page displays Ethiopia by default when it first loads.

## Features

* Search for a country by name
* Display the country's capital
* Display population with commas
* Display region
* Display currency
* Display country flag
* Show a "Loading..." state while fetching data
* Show a friendly error message when a country is not found
* Default to Ethiopia on first load

## Technologies Used

* HTML
* CSS
* JavaScript
* Fetch API
* Async/Await
* REST Countries API

## API Used

REST Countries API:

https://restcountries.com/v3.1/name/{country}

Example:

https://restcountries.com/v3.1/name/ethiopia

## How to Run

1. Download or clone the project.
2. Open the `index.html` file in a web browser.
3. The page will automatically load Ethiopia's facts.
4. Enter another country name in the search box.
5. Click the Search button.
6. The country information will be displayed.

## Error Handling

The application checks `res.ok` to detect HTTP errors.

It uses `try/catch` to handle network errors and country-not-found errors.

If the country cannot be found, a friendly error message is displayed instead of crashing the application.

## Project Structure

day20_mini_project/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## What I Learned

* How to use `fetch()` to request data from a public API
* How to use `async/await`
* How to check `res.ok`
* How to handle errors with `try/catch`
* How to display loading, success, and error states
* How to manipulate the DOM with JavaScript
* How to use `createElement()` to create HTML elements
* How to work with JSON data from an API
* How to format population numbers with commas
