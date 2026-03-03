import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, Size } from '../data/mockData';

export interface CartItem {
  product: Product;
  size: Size;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: Size, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: Size, color: string) => void;
  updateQuantity: (productId: string, size: Size, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('reliance-cart');
      if (saved) {
        try { return JSON.parse(saved); } catch { return []; }
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('reliance-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, size: Size, color: string, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.size === size && i.color === color
      );
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, size, color, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: Size, color: string) => {
    setItems(prev => prev.filter(
      i => !(i.product.id === productId && i.size === size && i.color === color)
    ));
  };

  const updateQuantity = (productId: string, size: Size, color: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId, size, color);
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.size === size && i.color === color
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.sellingPrice * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, totalPrice, isCartOpen, setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
