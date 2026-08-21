# Signup Form

A simple Signup Form built with HTML, CSS, and JavaScript. The project validates user information, prevents duplicate phone numbers, and stores registered users in the browser using localStorage.

## Features

- Full name validation
- Ethiopian phone number validation
- Email field
- Password field
- Prevents duplicate phone numbers
- Saves users using localStorage
- Restores saved users after refreshing the page
- Displays registered users on the page
- Shows clear validation and success messages

## Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Regular Expressions (Regex)
- JSON

## Phone Number Validation

The application uses this regular expression:

```js
/^(?:\+251|0)[79]\d{8}$/