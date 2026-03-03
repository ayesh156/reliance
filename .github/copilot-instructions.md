# AI Coding Agent Instructions for Reliance Fashion Management System

## 🏪 Project Brief

**Reliance** is a **premium fashion & clothing business management system** built for a Sri Lankan clothing store located in **Matara, Sri Lanka**. It combines a powerful **Admin Panel** (inventory, invoices, customers, suppliers, reports) with a beautiful **customer-facing E-commerce storefront** — all in a single React application.

> **Think like a world-class fashion-tech software engineer.** Every pixel matters. Every interaction should feel luxurious, smooth, and intentional — like walking into a premium clothing boutique.

### Business Context
- **Store:** Reliance — a clothing/fashion retail shop in Matara, Southern Province, Sri Lanka
- **Products:** Men's, Women's, Kids clothing, Footwear, Accessories, Sportswear, Denim, Formal, Traditional wear
- **Currency:** Sri Lankan Rupees (LKR) — formatted as `Rs. 1,500.00`
- **Target:** Local retail + online presence, WhatsApp-first communication
- **Dual Interface:** Admin management dashboard + Customer shopping storefront

---

## ⚡ CRITICAL: Build Verification Rule (MANDATORY)

### 🔴 EVERY function, feature, or section MUST be verified with a build before moving on.

After completing **ANY** change — no matter how small — you MUST:

```bash
cd reliance
npx vite build 2>&1 | Select-Object -Last 20
```

**Rules:**
1. **Build after every feature completion** — not at the end, not later, NOW
2. **Zero errors required** — the build MUST pass cleanly before proceeding
3. **Fix errors immediately** — do NOT continue to the next task with broken code
4. **Large chunk warnings are acceptable** — these are optimization hints, not blockers
5. **TypeScript errors count as failures** — `tsc -b` runs as part of `vite build`

### Pre-Commit Verification:
```bash
# MUST run this before any commit
cd reliance
npx vite build
```
If the build fails → **fix ALL errors first** → rebuild → confirm zero errors → only then commit.

---

## ⚡ CRITICAL: Task Management & Length Limit Prevention

**IMPORTANT:** When given large/complex tasks, follow these rules to avoid "response hit the length limit" errors:

### Breaking Down Large Tasks:
1. **Never attempt to complete everything in one response** — Split into logical subtasks
2. **Prioritize working code over lengthy explanations** — Code first, explain briefly
3. **Create files incrementally** — One file at a time for large components
4. **Use efficient patterns** — Reuse existing code patterns from the codebase
5. **Stop and continue** — If a task is large, complete part of it and indicate what's next

### Creative Task Execution:
1. **Analyze the request** — Understand the full scope before starting
2. **Plan the approach** — Identify all files that need to be created/modified
3. **Execute in phases:**
   - Phase 1: Core structure (routes, navigation, basic page)
   - Phase 2: UI components and styling
   - Phase 3: Functionality and interactions
   - Phase 4: Polish and refinements
4. **Build & verify after each phase** — Never skip this step
5. **Communicate progress** — Brief updates on what's done and what's next

---

## 🌐 Language Understanding (Singlish/Sri Lankan English Support)

**IMPORTANT:** The user may provide instructions in **Singlish** (Sri Lankan English mix — a blend of Sinhala transliterated in English letters mixed with English words). You MUST:

1. **Understand Singlish instructions** and interpret them correctly in English
2. **Respond in clear English** regardless of input language
3. **Common Singlish patterns to recognize:**
   - "hadanna" = create/build/make
   - "danna" = put/add
   - "balanna" = look/check/see
   - "eka"/"ekak" = one/this/that thing
   - "wage" = like/similar to
   - "ekata" = to it/for it
   - "anuwa" = according to
   - "page eka" = this page
   - "component ekak" = a component
   - "work karanawa" = working/functioning
   - "error enawa" = getting error
   - "fix karanna" = fix it
   - "add karanna" = add it
   - "delete karanna" = delete it
   - "update karanna" = update it
   - "design eka" = the design
   - "modal ekak" = a modal
   - "button ekak" = a button
   - "form ekak" = a form
   - "table ekak" = a table
   - "hondai" = good/nice
   - "hondatama" = properly/well
   - "wenas karanna" = change it
   - "thawa" = more/another
   - "puluwan" = can/possible
   - "behe" = cannot/not possible
   - "monawada" = what
   - "kohomada" = how
   - "aeyi" = why

---

## 📁 Project Architecture

### Technology Stack
- **React 19** with TypeScript (strict mode)
- **Vite 7** for lightning-fast development
- **Tailwind CSS 3.4** for utility-first styling
- **React Router 6** with `HashRouter` for SPA routing
- **Recharts** for charts & analytics
- **Lucide React** for icons
- **Sonner** for toast notifications
- **JsBarcode** for barcode generation
- **jsPDF + jspdf-autotable** for PDF report exports
- **date-fns** for date formatting
- **No backend** — frontend-only with mock data (localStorage persistence for theme & cart)

### Deployment
- **Render.com** — Static site deployment
- **Build command:** `npm install && npm run build`
- **Publish directory:** `dist/`
- **SPA routing:** `/* → /index.html` rewrite rule
- **Dev port:** `5174`

### Directory Structure
```
reliance/
├── .github/
│   └── copilot-instructions.md    # This file — AI coding rules
├── public/
│   ├── _redirects                 # SPA redirect for Netlify/Render
│   ├── sw.js                      # Service worker placeholder
│   └── images/                    # favicon.ico, logo.jpg
├── src/
│   ├── App.tsx                    # Root: Router, Providers, all Routes
│   ├── main.tsx                   # React DOM entry
│   ├── index.css                  # Tailwind directives + global styles
│   ├── components/
│   │   ├── Layout.tsx             # Admin sidebar + header layout
│   │   ├── ThermalReceipt.tsx     # 80mm thermal receipt print component
│   │   ├── ecommerce/
│   │   │   └── EcommerceLayout.tsx # Store header + footer + nav
│   │   ├── modals/
│   │   │   ├── DeleteConfirmationModal.tsx
│   │   │   └── InvoiceWizardModal.tsx
│   │   └── ui/
│   │       ├── DatePicker.tsx
│   │       ├── ImageUpload.tsx
│   │       ├── SearchableComboBox.tsx
│   │       └── TimePicker.tsx
│   ├── contexts/
│   │   ├── ThemeContext.tsx        # Dark/light mode (localStorage: 'reliance-theme')
│   │   └── CartContext.tsx         # E-commerce cart (localStorage: 'reliance-cart')
│   ├── data/
│   │   └── mockData.ts            # All interfaces, types, and mock data
│   ├── lib/
│   │   └── utils.ts               # cn(), formatCurrency(), formatDate(), etc.
│   └── pages/
│       ├── Dashboard.tsx           # Revenue stats, charts, alerts
│       ├── Products.tsx            # Full CRUD, barcode, grid/table view
│       ├── ProductLabels.tsx       # Barcode label printing
│       ├── Categories.tsx          # Category CRUD, grid/table view
│       ├── Invoices.tsx            # Invoice management, payments, receipts
│       ├── CreateInvoice.tsx       # 3-step invoice wizard
│       ├── Suppliers.tsx           # Supplier CRUD, payments, reminders
│       ├── Customers.tsx           # Customer CRUD, payments, loyalty
│       ├── Reports.tsx             # 5-tab reports with charts + PDF export
│       ├── Settings.tsx            # Business, Appearance, Invoice, Reminders
│       └── ecommerce/
│           ├── StoreFront.tsx      # Homepage: hero, featured, arrivals
│           ├── ShopPage.tsx        # Browse: filters, sort, search
│           ├── ProductDetail.tsx   # Size/colour picker, add to cart
│           ├── CartPage.tsx        # Cart summary + checkout
│           ├── CategoriesPage.tsx  # Category grid
│           ├── AboutPage.tsx       # Store story + values
│           └── ContactPage.tsx     # Contact form + info
├── tailwind.config.js
├── vite.config.ts
├── render.yaml                    # Render.com deployment blueprint
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── package.json
```

---

## 🎨 Design System & Theme

### Brand Identity
Reliance is a **fashion brand** — the design should feel elegant, sophisticated, and premium. Think **Zara**, **H&M**, or **Uniqlo** admin panels crossed with a modern luxury storefront.

### Theme Implementation
The system supports **dark/light mode** via `ThemeContext`. **Default is dark mode.** Always implement both themes:

```tsx
import { useTheme } from '../contexts/ThemeContext';  // or '../../contexts/ThemeContext'

const { theme } = useTheme();
const dark = theme === 'dark';  // Common shorthand used throughout codebase
```

### Colour Palette

```
Brand (Neutral Monochrome):
  brand-50:  #fafafa     brand-500: #737373
  brand-100: #f5f5f5     brand-600: #525252
  brand-200: #e5e5e5     brand-700: #404040
  brand-300: #d4d4d4     brand-800: #262626
  brand-400: #a3a3a3     brand-900: #171717
                          brand-950: #0a0a0a

Dark Mode:
  Background:   bg-neutral-950 (#0a0a0a)
  Cards/Panels: bg-neutral-900/50 with border-neutral-800/60
  Hover:        bg-neutral-800/30
  Text:         text-white (primary), text-neutral-400 (secondary), text-neutral-500 (muted)
  Borders:      border-neutral-800, border-neutral-700/50

Light Mode:
  Background:   bg-gray-50
  Cards/Panels: bg-white with border-gray-200
  Hover:        bg-gray-50
  Text:         text-gray-900 (primary), text-gray-600 (secondary), text-gray-400 (muted)
  Borders:      border-gray-200, border-gray-100

Status Colours:
  Success/Paid:    green-500 (#22c55e) — bg-green-500/10 text-green-400
  Warning/Pending: amber-500 (#f59e0b) — bg-amber-500/10 text-amber-400
  Error/Cancelled: red-500 (#ef4444)   — bg-red-500/10 text-red-400
  Info:            blue-500 (#3b82f6)  — bg-blue-500/10 text-blue-400
```

### Typography
```
Body/UI:     font-sans  → Inter, system-ui, sans-serif
Display:     font-display → 'Playfair Display', Georgia, serif
```
- Use `font-display` for storefront hero headings, about page titles, and marketing text
- Use `font-sans` (default) for everything else — admin UI, data, forms, buttons

### No Dynamic Accent System
Unlike eco-system, **Reliance does NOT use CSS variable-based dynamic accent colours**. Colours are used directly via Tailwind classes. The brand feel is **monochrome luxury** with subtle green for success states.

---

## 📝 UI Component Patterns (MUST FOLLOW)

### 1. Card Component Style
```tsx
<div className={`rounded-2xl border p-4 sm:p-6 ${
  dark
    ? 'bg-neutral-900/50 border-neutral-800/60'
    : 'bg-white border-gray-200 shadow-sm'
}`}>
  {/* Content */}
</div>
```

### 2. Button Styles
```tsx
// Primary button (dark mode: white on dark, dark on light)
<button className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg ${
  dark
    ? 'bg-white text-black hover:bg-neutral-200'
    : 'bg-brand-900 text-white hover:bg-brand-800'
}`}>

// Secondary / Ghost button
<button className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
  dark
    ? 'bg-neutral-800 text-neutral-300 border-neutral-700/50 hover:bg-neutral-700/50'
    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
}`}>

// Danger button
<button className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20">
```

### 3. Input Fields
```tsx
<input className={`w-full px-4 py-2.5 rounded-xl border transition-all text-sm ${
  dark
    ? 'bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-neutral-600 focus:ring-2 focus:ring-white/10'
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200'
}`} />
```

### 4. Table Design
```tsx
<div className={`rounded-2xl border overflow-hidden ${
  dark ? 'border-neutral-800/60' : 'border-gray-200'
}`}>
  <table className="w-full">
    <thead className={dark ? 'bg-neutral-800/50' : 'bg-gray-50'}>
      <tr>
        <th className={`px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold uppercase tracking-wider ${
          dark ? 'text-neutral-400' : 'text-gray-600'
        }`}>Column</th>
      </tr>
    </thead>
    <tbody className={`divide-y ${dark ? 'divide-neutral-800/50' : 'divide-gray-100'}`}>
      <tr className={`transition-colors ${dark ? 'hover:bg-neutral-800/30' : 'hover:bg-gray-50'}`}>
        <td className={`px-4 sm:px-6 py-3 sm:py-4 text-sm ${dark ? 'text-neutral-300' : 'text-gray-700'}`}>
          Content
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 5. Status Badges
```tsx
<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
  status === 'active' || status === 'paid'
    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
    : status === 'pending' || status === 'partial'
    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
    : 'bg-red-500/10 text-red-400 border border-red-500/20'
}`}>
  <span className="w-1.5 h-1.5 rounded-full bg-current" />
  {status}
</span>
```

### 6. Page Header Pattern
```tsx
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
  <div className="min-w-0">
    <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold truncate ${
      dark ? 'text-white' : 'text-gray-900'
    }`}>
      Page Title
    </h1>
    <p className={`text-xs sm:text-sm mt-1 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>
      Page description
    </p>
  </div>
  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
    {/* Action buttons */}
  </div>
</div>
```

### 7. Modal Pattern
```tsx
{/* Overlay */}
{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    <div className={`relative w-full max-w-[95vw] sm:max-w-lg lg:max-w-2xl rounded-2xl border overflow-hidden max-h-[90vh] overflow-y-auto ${
      dark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 flex items-center justify-between p-4 border-b ${
        dark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Title</h2>
        <button onClick={onClose}><X className="w-5 h-5" /></button>
      </div>
      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Content */}
      </div>
      {/* Footer */}
      <div className={`sticky bottom-0 flex justify-end gap-2 p-4 border-t ${
        dark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'
      }`}>
        <button onClick={onClose}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  </div>
)}
```

---

## 📝 Component Creation Guidelines

### When Creating New Components:

1. **Always use TypeScript** with proper interfaces:
```tsx
interface ComponentProps {
  title: string;
  items: ItemType[];
  onAction: (id: string) => void;
  isLoading?: boolean;
}

export const Component: React.FC<ComponentProps> = ({ title, items, onAction, isLoading = false }) => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  // ...
};
```

2. **Always import and use theme**:
```tsx
import { useTheme } from '../contexts/ThemeContext';
```

3. **Use Lucide icons**:
```tsx
import { Package, Search, Plus, Edit, Trash2 } from 'lucide-react';
```

4. **Implement responsive design** (mobile-first):
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
```

5. **Add smooth transitions**:
```tsx
className="transition-all duration-200"
```

6. **Build & verify immediately after creating the component** — do NOT move to the next task without confirming zero build errors.

---

## 💰 Currency Formatting (Sri Lankan Rupees)

Always use the existing `formatCurrency` from `lib/utils.ts`:
```tsx
import { formatCurrency } from '../lib/utils';

// Usage
<span>{formatCurrency(15000)}</span>  // → Rs. 15,000.00
```

**Never hardcode currency formatting** — always use `formatCurrency()`.

---

## 📱 MANDATORY: Mobile & Tablet Responsive Design

**CRITICAL:** Every new page, modal, and component MUST be fully responsive for **mobile (320px+)**, **tablet (768px+)**, and **desktop (1024px+)** from the start.

### Responsive Checklist for Every New Component

- [ ] Test at 320px width (small phones)
- [ ] Test at 375px width (iPhone)
- [ ] Test at 768px width (tablet portrait)
- [ ] Test at 1024px width (tablet landscape / small desktop)
- [ ] Test at 1280px+ (desktop)
- [ ] Touch targets are at least 44×44px on mobile
- [ ] Text is readable without zooming
- [ ] No horizontal overflow/scrolling
- [ ] Tables use horizontal scroll wrapper on mobile or switch to card layout
- [ ] Modals are full-screen on mobile, centered on desktop

### Key Responsive Patterns Used in This Codebase

```tsx
// Grid layouts — always start from 1 column
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"

// Flex direction — stack on mobile, row on desktop
className="flex flex-col sm:flex-row gap-3 sm:gap-4"

// Text scaling
className="text-sm sm:text-base lg:text-lg"

// Spacing scaling
className="p-3 sm:p-4 lg:p-6"

// Hide/show elements
className="hidden lg:flex"   // Desktop only
className="flex lg:hidden"   // Mobile only

// Modal sizing
className="w-full max-w-[95vw] sm:max-w-lg lg:max-w-2xl"

// Padding for mobile bottom bars
className="pb-24 lg:pb-8"

// Truncation for long text on mobile
className="truncate min-w-0"
```

---

## 🔄 State Management Patterns

### Local State (used throughout)
```tsx
const [items, setItems] = useState<ItemType[]>([]);
const [search, setSearch] = useState('');
const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
```

### Form State
```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
});

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

### Modal State
```tsx
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

const openEditModal = (item: ItemType) => {
  setSelectedItem(item);
  setIsModalOpen(true);
};
```

---

## 🖨️ Printing Patterns

### Window.open + iframe fallback (for mobile)
The codebase uses a mobile-compatible print approach:
```tsx
const handlePrint = useCallback(() => {
  const printHTML = buildPrintHTML();

  // Attempt 1: window.open (works on desktop)
  const win = window.open('', '_blank');
  if (win) {
    win.document.write(printHTML);
    win.document.close();
    win.onload = () => setTimeout(() => { win.focus(); win.print(); win.close(); }, 600);
    return;
  }

  // Attempt 2: hidden iframe fallback (mobile browsers that block popups)
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;top:-10000px;left:-10000px;width:210mm;height:297mm;border:none;';
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument;
  if (doc) {
    doc.open();
    doc.write(printHTML);
    doc.close();
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 800);
  }
}, []);
```

### Thermal receipt printing
See `ThermalReceipt.tsx` for the 80mm thermal receipt format used in invoices.

### Print HTML requirements:
- Always include `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
- Embed Google Fonts via `<link>` for Inter font
- Include `-apple-system` as fallback for iOS
- Add `@page { margin: ... }` for proper paper margins
- Use `print-color-adjust: exact` for colour preservation

---

## 📊 Charts & Reports

### Chart library: Recharts
```tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="#22c55e20" />
  </AreaChart>
</ResponsiveContainer>
```

### PDF Export: jsPDF
```tsx
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const doc = new jsPDF();
doc.text('Report Title', 14, 15);
(doc as any).autoTable({ /* table config */ });
doc.save('report.pdf');
```

---

## 🛒 E-commerce Storefront Guidelines

### Cart Context
```tsx
import { useCart } from '../contexts/CartContext';

const { addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
```

### Storefront Design Language
The storefront uses a more **editorial, luxury fashion** aesthetic:
- Hero sections with `font-display` (Playfair Display) headings
- Full-bleed images with overlay text
- Elegant transitions and hover effects
- Subtle animations for product cards
- Professional product image grids
- Location references to **Matara** (No. 123, Main Street, Matara)

### WhatsApp Integration
All storefront pages include a floating WhatsApp button:
```tsx
<a href="https://wa.me/94771234567" target="_blank"
   className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600">
  <WhatsApp icon />
</a>
```

---

## 🗂️ Data Types Reference (mockData.ts)

| Type | Key Fields | Count |
|------|-----------|-------|
| `Category` | id, name, slug, description, image, productCount, status | 15 |
| `Product` | id, sku, barcode, name, category, brand, sizes[], colors[], fabricType, costPrice, sellingPrice, stock, image | 16 |
| `Supplier` | id, name, contact, email, phone, supplyCategory, payments[], reminders[], rating, outstandingBalance | 12 |
| `Customer` | id, name, email, phone, NIC, type, loyaltyPoints, payments[], reminders[], outstandingBalance | 12 |
| `Invoice` | id, invoiceNumber, customer*, items[], payments[], reminders[], subtotal, discount, tax, total, status | 12 |
| `InvoiceItem` | productId, productName, sku, barcode, size, color, quantity, unitPrice, discount, total | — |
| `DailySales` | date, revenue, orders, profit | 30 |
| `Size` | XS, S, M, L, XL, XXL, 28–38, FREE | Enum |
| `FabricType` | Cotton, Denim, Linen, Polyester, Silk, Wool, Chiffon, Satin, Leather, Nylon, Blend, Other | Enum |
| `CustomerType` | Regular, VIP, Wholesale, Walk-in, Corporate, Online, Referral, Other | Enum |
| `SupplyCategory` | Fabrics, Ready-Made, Leather, Denim, Traditional, Sportswear, Accessories, Formal, Kids, Other | Enum |

---

## 📐 Routing Reference

### Admin Routes (wrapped in `<Layout>`)
| Path | Component | Section |
|------|-----------|---------|
| `/` | `Dashboard` | Home dashboard |
| `/products` | `Products` | Product management |
| `/products/labels` | `ProductLabels` | Barcode label printing |
| `/categories` | `Categories` | Category management |
| `/invoices` | `Invoices` | Invoice management |
| `/invoices/create` | `CreateInvoice` | New invoice wizard |
| `/suppliers` | `Suppliers` | Supplier management |
| `/customers` | `Customers` | Customer management |
| `/reports` | `Reports` | Reports & analytics |
| `/settings` | `Settings` | App settings |

### Storefront Routes (wrapped in `<EcommerceLayout>`)
| Path | Component | Section |
|------|-----------|---------|
| `/store` | `StoreFront` | Homepage |
| `/store/shop` | `ShopPage` | Browse/filter products |
| `/store/product/:id` | `ProductDetail` | Product details |
| `/store/cart` | `CartPage` | Shopping cart |
| `/store/categories` | `CategoriesPage` | Category browsing |
| `/store/about` | `AboutPage` | About us |
| `/store/contact` | `ContactPage` | Contact info + form |

---

## ✅ Code Quality Checklist

Before submitting ANY code, ensure:

- [ ] TypeScript interfaces/types are properly defined
- [ ] Both dark and light themes are implemented
- [ ] Components are fully responsive (320px → 1280px+)
- [ ] Smooth transitions/animations are added
- [ ] Icons use Lucide React (not raw SVGs)
- [ ] Currency uses `formatCurrency()` (Rs. format)
- [ ] Error states are handled
- [ ] Loading states are implemented where appropriate
- [ ] Touch targets are ≥ 44×44px on mobile
- [ ] No horizontal overflow on any screen size
- [ ] **`npx vite build` passes with ZERO errors**

---

## 🚫 Things to AVOID

1. **Never skip the build check** — run `npx vite build` after every change
2. **Never use inline styles** except for dynamic print HTML — use Tailwind classes
3. **Never hardcode colours** outside the design system — use theme-aware classes
4. **Never ignore TypeScript errors** — fix them properly
5. **Never skip responsive design** — everything must work from 320px
6. **Never forget dark mode** — always implement both themes
7. **Never use `alert()`** — use sonner toast or modal dialogs
8. **Never use `console.log` in production** — remove debug logs
9. **Never use `BrowserRouter`** — this project uses `HashRouter`
10. **Never use emerald/teal accent system** — this is NOT eco-system; Reliance uses neutral/brand palette
11. **Never use template strings inside regular strings** — always use backticks for dynamic classNames
12. **Never commit without building** — if it doesn't build, it doesn't ship

---

## 📚 Reference Files

When creating new components, reference these existing files for patterns:

| Pattern | File |
|---------|------|
| Page layout with stats + charts | `src/pages/Dashboard.tsx` |
| Full CRUD page with grid/table view | `src/pages/Products.tsx`, `src/pages/Categories.tsx` |
| Form with many fields | `src/pages/Customers.tsx`, `src/pages/Suppliers.tsx` |
| Invoice wizard (multi-step) | `src/pages/CreateInvoice.tsx` |
| Reports with tabs + charts + PDF | `src/pages/Reports.tsx` |
| Print-optimized page | `src/pages/ProductLabels.tsx` |
| Thermal receipt | `src/components/ThermalReceipt.tsx` |
| Admin layout/sidebar | `src/components/Layout.tsx` |
| E-commerce store layout | `src/components/ecommerce/EcommerceLayout.tsx` |
| Storefront hero + sections | `src/pages/ecommerce/StoreFront.tsx` |
| Product detail with cart | `src/pages/ecommerce/ProductDetail.tsx` |
| Theme context | `src/contexts/ThemeContext.tsx` |
| Cart context | `src/contexts/CartContext.tsx` |
| Reusable UI components | `src/components/ui/` |
| Modals | `src/components/modals/` |
| All data types & mock data | `src/data/mockData.ts` |
| Utility functions | `src/lib/utils.ts` |
| Tailwind config & brand colours | `tailwind.config.js` |

---

## 🚀 Development Commands

```bash
# Start dev server (port 5174)
npm run dev

# Build for production (MUST pass with zero errors)
npm run build
# or
npx vite build

# TypeScript check only
npx tsc -b

# Preview production build
npm run preview
```

---

## 🌐 Deployment: Render.com

Deployed as a **static site** on Render.com using `render.yaml`:

- **Service type:** `static`
- **Build:** `npm install && npm run build`
- **Publish:** `dist/`
- **Routing:** `/* → /index.html` (SPA rewrite)
- **Security headers:** X-Content-Type-Options, X-Frame-Options
- **Cache:** Immutable caching for `/assets/*`

### Deployment Checklist:
1. ✅ Run `npx vite build` — zero errors
2. ✅ Git add & commit all changes
3. ✅ Push to `main` branch
4. ✅ Render auto-deploys from main

---

## 🆘 Getting Help

If instructions are unclear or you need more context:
1. Ask for clarification in English
2. Reference similar existing components in the codebase
3. Follow the established patterns strictly
4. When in doubt, prioritize user experience and visual consistency
5. **Always build and verify before declaring done**

---

**Remember:** You are building a **premium, world-class** fashion management system. Every component should look like it belongs in a **luxury retail brand's** internal toolkit. Think minimalist, elegant, and polished. Build it. Verify it. Ship it. 🏪
