# Mini-Project day11 Next.js

A Next.js App Router project demonstrating file-based routing.

## Run

```bash
npm install
npm run dev
Open http://localhost:3000

Routes
URL	File
/	app/page.js
/menu	app/menu/page.js
/menu/[id]	app/menu/[id]/page.js
/cart	app/cart/page.js
/checkout	app/checkout/page.js
Special Files
File	Purpose
app/layout.js	Root layout with nav
app/not-found.js	Global 404
app/menu/loading.js	Loading UI for menu
app/menu/error.js	Error UI for menu
app/menu/[id]/not-found.js	Dish not found
Components
Located in app/menu/_components/ (non-routable):

CategoryBar.js

DishList.js

GoToCheckoutButton.js

