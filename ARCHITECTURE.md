# Reliance — Architecture

## System Overview

Reliance is a dual-purpose web application combining a **customer-facing ecommerce storefront** and an **internal admin management system**, both served from the same Vite + React SPA.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Routing | React Router DOM v6 (`HashRouter`) |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Notifications | Sonner |
| Charts | Recharts |
| PDF/Barcodes | jsPDF, JSBarcode |
| State | React Context API |
| Persistence | localStorage |

> **Why HashRouter?** The app is deployed as a static site (Render, Vercel). HashRouter avoids 404s on direct URL access without server-side rewrite rules. All URLs are prefixed with `/#/`.

---

## Route Structure

```
/#/                          → Ecommerce Storefront (EcommerceLayout)
/#/shop                      → Shop / Product Listing
/#/product/:id               → Product Detail
/#/cart                      → Shopping Cart
/#/wishlist                  → Wishlist
/#/categories                → Category Browser
/#/about                     → About Page
/#/contact                   → Contact Page

/#/system                    → Admin Dashboard (Layout)
/#/system/products           → Product Management
/#/system/products/labels    → Barcode Label Printer
/#/system/categories         → Category Management
/#/system/invoices           → Invoice List
/#/system/invoices/create    → Invoice Creator
/#/system/suppliers          → Supplier Management
/#/system/customers          → Customer Management
/#/system/reports            → Reports & Analytics
/#/system/settings           → System Settings
```

**Legacy redirects:** `/store` and `/store/*` → `/` (for old bookmarks)

---

## Layout Architecture

```
App.tsx
├── ThemeProvider          (dark/light mode)
├── CartProvider           (cart state + QuickAdd drawer state)
├── WishlistProvider       (wishlist state)
└── HashRouter
    ├── EcommerceLayout    (store shell — sticky nav, footer, QuickAddDrawer)
    │   └── <Outlet />     (store pages render here)
    └── AdminPage wrapper  (Layout component — sidebar, header)
        └── {children}     (admin pages render here)
```

---

## State Management

All state is managed via React Context. No external state library.

| Context | File | Manages |
|---|---|---|
| `ThemeContext` | `src/contexts/ThemeContext.tsx` | `theme`, `toggleTheme` |
| `CartContext` | `src/contexts/CartContext.tsx` | cart items, totals, `isCartOpen`, `quickAddProduct` |
| `WishlistContext` | `src/contexts/WishlistContext.tsx` | wishlist items, `isInWishlist`, `toggleWishlist` |

---

## Folder Structure

```
src/
├── App.tsx                        # Root router + provider tree
├── main.tsx                       # React DOM entry point
├── index.css                      # Tailwind base + global styles
│
├── components/
│   ├── Layout.tsx                 # Admin sidebar + header shell
│   ├── ecommerce/
│   │   └── EcommerceLayout.tsx    # Store navbar + footer + QuickAddDrawer
│   ├── sections/                  # Reusable homepage sections
│   │   ├── Hero.tsx               # (inline in StoreFront)
│   │   ├── Collections.tsx        # Asymmetric collections grid
│   │   ├── BestSellers.tsx        # Horizontal scroll product carousel
│   │   └── BrandEthos.tsx         # Values + newsletter split section
│   └── ui/
│       └── QuickAddDrawer.tsx     # Slide-in size/color selector drawer
│
├── contexts/
│   ├── CartContext.tsx
│   ├── WishlistContext.tsx
│   └── ThemeContext.tsx
│
├── pages/
│   ├── Dashboard.tsx              # Admin pages
│   ├── Products.tsx
│   ├── ProductLabels.tsx
│   ├── Categories.tsx
│   ├── Invoices.tsx
│   ├── CreateInvoice.tsx
│   ├── Suppliers.tsx
│   ├── Customers.tsx
│   ├── Reports.tsx
│   ├── Settings.tsx
│   └── ecommerce/
│       ├── StoreFront.tsx         # Home page (assembles sections)
│       ├── ShopPage.tsx           # Product listing + filters
│       ├── ProductDetail.tsx      # Single product view
│       ├── CartPage.tsx           # Cart + order summary
│       ├── WishlistPage.tsx       # Saved items
│       ├── CategoriesPage.tsx
│       ├── AboutPage.tsx
│       └── ContactPage.tsx
│
├── data/
│   └── mockData.ts                # All mock products, categories, invoices
│
└── lib/
    └── utils.ts                   # cn() helper (clsx + tailwind-merge)
```

---

## Deployment

| Platform | Config File | Notes |
|---|---|---|
| Render | `render.yaml` | Static site, rewrites `/*` → `/index.html` |
| Vercel | `vercel.json` | Rewrites `(.*)` → `/index.html` |
