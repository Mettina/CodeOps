# Metages Asebe — Portfolio (React + Vite)

A single-page portfolio (Home, Portfolio, About Me, Resume, Contact) with a
light/dark theme toggle, scroll-spy navigation, and a validated contact form —
built as a React app with Vite.

## Folder structure

```
react-portfolio/
├── index.html                     Vite entry HTML (mounts #root)
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                   React root render
│   ├── App.jsx                    Layout: Sidebar + Navbar + all sections
│   ├── context/
│   │   └── ThemeContext.jsx       Light/dark theme state + localStorage
│   ├── hooks/
│   │   └── useScrollSpy.js        IntersectionObserver-based active-link tracking
│   ├── data/
│   │   └── navLinks.js            Single source of truth for nav items
│   ├── components/
│   │   ├── Sidebar.jsx            Profile card (photo, role, socials, CTA)
│   │   ├── Navbar.jsx             Pill nav + theme toggle + "Let's Talk"
│   │   ├── PanelSection.jsx       Reusable section shell (used by 3 sections)
│   │   ├── ContactForm.jsx        Controlled form, validation, submit state
│   │   └── icons.jsx              All inline SVG icons as components
│   ├── sections/
│   │   ├── Hero.jsx               "Home" — headline, CTAs, explore badge
│   │   ├── Portfolio.jsx
│   │   ├── About.jsx
│   │   ├── Resume.jsx
│   │   └── Contact.jsx            Info column + <ContactForm />
│   ├── assets/
│   │   └── images/
│   │       └── avatar-placeholder.svg   Swap for a real photo
│   └── styles/
│       └── index.css              All styling (theme variables + layout)
└── README.md
```

## Getting started

```bash
npm install
npm run dev       # starts a local dev server (usually http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Customizing

- **Photo:** replace `src/assets/images/avatar-placeholder.svg` with a real
  image and update the `import` at the top of `src/components/Sidebar.jsx`.
- **Colors:** edit the CSS variables at the top of `src/styles/index.css`
  (`:root` for light mode, `[data-theme="dark"]` for dark mode).
- **Nav / sections:** add or remove entries in `src/data/navLinks.js` — the
  navbar and scroll-spy both read from this list, so make sure any new link's
  `id` matches a section's `id` in `src/App.jsx`.
- **Section content:** `Portfolio.jsx`, `About.jsx`, and `Resume.jsx` are thin
  wrappers around `<PanelSection>` — replace their placeholder text with real
  content (or expand them into their own layouts as your content grows).
- **Contact form:** `ContactForm.jsx` currently *simulates* sending (see the
  `setTimeout` in `handleSubmit`). Swap it for a real request — Formspree,
  EmailJS, or your own API route.
- **Resume/CV download:** wire the "Download CV" button in `Hero.jsx` to a
  real PDF (e.g. place it in `public/` and link to `/your-cv.pdf`).
