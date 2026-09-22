# Betenga Home Services

Betenga is a React home-service marketplace for discovering, viewing, and booking trusted services such as cleaning, plumbing, electrical work, painting, and home cooking.

## Features

- Responsive home page with service search
- Category and service-detail pages
- Clickable service images and View Service actions
- Login and signup flows with form validation
- Demo account persistence using browser `localStorage`
- Protected booking flow for authenticated users
- Booking form with date, time, address, notes, and payment method
- Responsive navigation with a mobile hamburger menu
- About, Contact, and global Footer pages

## Tech Stack

- React 19
- React Router
- Vite
- ESLint

## Getting Started

From the `home-service-app` directory:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Scripts

```bash
npm run build     
npm run preview   
npm run lint     
```

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page and service search |
| `/services` | All service categories |
| `/services/:slug` | Services in a category |
| `/services/:slug/:serviceSlug` | Service details |
| `/booking/:slug/:serviceSlug` | Protected booking form |
| `/search?q=...` | Search results |
| `/about` | About Betenga |
| `/contact` | Contact details |
| `/signup` | Create an account |
| `/login` | Log in to an account |

## Demo Authentication

This project uses `localStorage` for frontend-only authentication. Signup stores the account under `betengaAccount` and the active login under `betengaSession`. Logout clears only the session so the user can log in again later.



## Project Structure

```text
src/
	components/       Shared navbar, footer, hero, and service components
	data/             Service and category data
	pages/            Route-level pages
	utils/            Validation and helper functions
	assets/           Service and hero images
	App.jsx           Application routes
	index.css         Global and responsive styles
	main.jsx          React entry point
```

