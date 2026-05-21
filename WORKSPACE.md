# Reliance — Workspace State

## Project Status: Active Development

Last updated: 2026-05-21

---

## Completed Features

### Ecommerce Storefront
- [x] `EcommerceLayout` — sticky navbar with hover mega menu (New Arrivals, Men, Women, Accessories), backdrop-blur header, cart badge, wishlist badge, mobile drawer with accordion categories
- [x] `StoreFront` — editorial split hero, trust badges, Collections grid, BestSellers carousel, Featured Products, testimonials, store location map, BrandEthos/newsletter
- [x] `Collections` — asymmetric 3-column masonry grid with hover zoom + slide-in CTA
- [x] `BestSellers` — horizontal scroll carousel, rank badges, QuickAdd drawer trigger, wishlist toggle
- [x] `BrandEthos` — split layout: brand values (Leaf/Hammer/Wind icons) + newsletter form with success state
- [x] `ShopPage` — product grid/list toggle, sidebar filters (category, price, fabric), search, sort, mobile filter drawer
- [x] `ProductDetail` — image gallery, size/color selector, quantity, add to cart, buy now, related products
- [x] `CartPage` — editorial typography, sharp-edge design, quantity stepper, promo code input, order summary, trust signals
- [x] `WishlistPage` — grid of saved items, remove on hover, add to cart, empty state
- [x] `QuickAddDrawer` — slide-in from right, size boxes, color swatches, wishlist toggle, body scroll lock, Escape key close

### State & Context
- [x] `CartContext` — items, add/remove/update, localStorage, `quickAddProduct`/`openQuickAdd`/`closeQuickAdd`
- [x] `WishlistContext` — items, `toggleWishlist`, `isInWishlist`, localStorage
- [x] `ThemeContext` — dark/light toggle, persisted

### Admin System
- [x] `Layout` — collapsible sidebar, sticky header, mobile overlay drawer, "Back to Website" link
- [x] All admin pages: Dashboard, Products, ProductLabels, Categories, Invoices, CreateInvoice, Suppliers, Customers, Reports, Settings

---

## Recent Changes

### Routing Restructure (2026-05-21)
- **Store moved from `/store` to `/`** — ecommerce is now the root
- **Admin moved from `/` to `/system`** — all admin routes prefixed with `/system/`
- Legacy `/store/*` redirects added for backward compatibility
- All `NavLink` and `navigate()` calls updated across 9+ files
- **Bug fixed:** All `/store/shop`, `/store/cart`, `/store/product/:id` etc. paths updated to `/shop`, `/cart`, `/product/:id` after the route restructure

### Navigation Cross-Links
- Store navbar User icon → `/system`
- Store top bar "Admin System" text → `/system`
- Store mobile drawer "Admin System" link → `/system`
- Admin "Visit Store" button → `/`
- Admin mobile sidebar "Back to Website" → `/`

---

## Known Issues / TODO

- [ ] `ProductDetail` — wishlist heart button is not yet wired to `WishlistContext` (uses static button)
- [ ] `ProductDetail` — thumbnail strip shows same image 3x (mock data has single image per product)
- [ ] `ShopPage` — URL search params (`?category=`, `?filter=`) are read on mount but not reactive to browser back/forward
- [ ] Checkout flow — "Proceed to Checkout" button has no implementation (payment gateway not integrated)
- [ ] Admin auth — no login/logout flow, admin is publicly accessible at `/#/system`
- [ ] Real data — all data is from `mockData.ts`, no backend API connected

---

## Environment

```
Node: check with node -v
Package Manager: npm
Dev server: npm run dev  →  http://localhost:5174
Build: npm run build
Preview: npm run preview
```
