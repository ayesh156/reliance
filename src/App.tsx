import { useEffect } from 'react';
import './index.css';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { Layout } from './components/Layout';
import { Toaster } from 'sonner';
import { useTheme } from './contexts/ThemeContext';

// Admin pages
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Categories } from './pages/Categories';
import { Invoices } from './pages/Invoices';
import { CreateInvoice } from './pages/CreateInvoice';
import { Suppliers } from './pages/Suppliers';
import { Customers } from './pages/Customers';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

// Ecommerce pages
import { EcommerceLayout } from './components/ecommerce/EcommerceLayout';
import { StoreFront } from './pages/ecommerce/StoreFront';
import { ShopPage } from './pages/ecommerce/ShopPage';
import { ProductDetail } from './pages/ecommerce/ProductDetail';
import { CartPage } from './pages/ecommerce/CartPage';
import { CategoriesPage } from './pages/ecommerce/CategoriesPage';
import { AboutPage } from './pages/ecommerce/AboutPage';
import { ContactPage } from './pages/ecommerce/ContactPage';

function ThemedToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      position="top-right"
      theme={theme}
      toastOptions={{
        style: {
          background: theme === 'dark' ? '#171717' : '#ffffff',
          border: theme === 'dark' ? '1px solid #262626' : '1px solid #e5e5e5',
          color: theme === 'dark' ? '#ffffff' : '#171717',
        },
      }}
    />
  );
}

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Wrapper to render admin pages inside the admin Layout
function AdminPage({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <ThemedToaster />
        <HashRouter>
          <ScrollToTop />
          <Routes>
            {/* Admin Panel */}
            <Route path="/" element={<AdminPage><Dashboard /></AdminPage>} />
            <Route path="/products" element={<AdminPage><Products /></AdminPage>} />
            <Route path="/categories" element={<AdminPage><Categories /></AdminPage>} />
            <Route path="/invoices" element={<AdminPage><Invoices /></AdminPage>} />
            <Route path="/invoices/create" element={<AdminPage><CreateInvoice /></AdminPage>} />
            <Route path="/suppliers" element={<AdminPage><Suppliers /></AdminPage>} />
            <Route path="/customers" element={<AdminPage><Customers /></AdminPage>} />
            <Route path="/reports" element={<AdminPage><Reports /></AdminPage>} />
            <Route path="/settings" element={<AdminPage><Settings /></AdminPage>} />

            {/* Ecommerce Store */}
            <Route path="/store" element={<EcommerceLayout />}>
              <Route index element={<StoreFront />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
