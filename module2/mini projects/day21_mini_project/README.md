# Signup Form

A simple Signup Form built with HTML, CSS, and JavaScript- The project validates user information, prevents duplicate phone numbers, and stores registered users in the browser using localStorage-

# Features
-Full name validation.
-Ethiopian phone number validation.
-Email field.
-Password field.
-Prevents duplicate phone numbers.
-Saves users using localStorage.
-Restores saved users after refreshing the page.
-Displays registered users on the page.
-Shows clear validation and success messages.
# Technologies Used
-HTML5.
-CSS3.
-JavaScript.
-LocalStorage.
-Regular Expressions (Regex).
-JSON
# Phone Number Validation
The application uses this regular expression:

/^(?:\+251|0)[79]\d{8}$/

It accepts Ethiopian phone numbers such as:

0912345678
0789989898
+251912345678

# How It Works
-The user enters their full name and phone number.
-JavaScript validates the information.
-The phone number must match the Ethiopian phone format.
-The application checks localStorage for existing users.
-If the phone number is already registered, an error message is displayed.
-If the information is valid, a new user is created.
-The users array is converted to JSON and saved in localStorage.
-Saved users are displayed on the page.
-The saved users remain available after refreshing the browser.