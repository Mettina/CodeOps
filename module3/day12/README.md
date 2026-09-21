# Addis Eats — Layouts & Rendering Strategies

A Next.js 16 App Router demo showing per-route rendering strategies:
static generation, incremental regeneration, dynamic rendering, and streaming.

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Build output

```
Route (app)             Revalidate  Expire
┌ ○ /                           1m      1y
├ ○ /_not-found
├ ƒ /checkout
├ ○ /menu
└   /menu/[slug]
  ├ ● /menu/margherita
  ├ ● /menu/carbonara
  └ ● /menu/caesar

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

## Rendering strategy

See [STRATEGY.md](./STRATEGY.md) for the per-route rationale.

## Project structure

```
app/
├── globals.css              # Global styles (header, footer, body)
├── layout.tsx               # Root layout — owns <html> and <body>
├── page.tsx                 # Home (/)
├── checkout/
│   └── page.tsx             # /checkout — dynamic (cookies)
└── menu/
    ├── menu.css             # Menu-scoped styles
    ├── layout.tsx           # Nested layout — sidebar + counter
    ├── page.tsx             # /menu — static + revalidate + Suspense
    └── [slug]/
        └── page.tsx         # /menu/[slug] — SSG via generateStaticParams
```