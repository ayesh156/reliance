// ==========================================
// RELIANCE - Clothing Business Mock Data
// ==========================================

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '28' | '30' | '32' | '34' | '36' | '38' | 'FREE';

export type FabricType = 'Cotton' | 'Denim' | 'Linen' | 'Polyester' | 'Silk' | 'Wool' | 'Chiffon' | 'Satin' | 'Leather' | 'Nylon' | 'Blend' | 'Other';

export const ALL_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', 'FREE'];
export const CLOTHING_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const WAIST_SIZES: Size[] = ['28', '30', '32', '34', '36', '38'];
export const FABRIC_TYPES: FabricType[] = ['Cotton', 'Denim', 'Linen', 'Polyester', 'Silk', 'Wool', 'Chiffon', 'Satin', 'Leather', 'Nylon', 'Blend', 'Other'];

export const COMMON_COLORS = [
  'Black', 'White', 'Navy', 'Red', 'Blue', 'Grey', 'Brown', 'Cream', 'Olive',
  'Maroon', 'Pink', 'Beige', 'Charcoal', 'Forest Green', 'Burgundy', 'Tan',
  'Sage', 'Ivory', 'Lavender', 'Rust', 'Yellow', 'Orange', 'Teal', 'Coral',
];

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  productCount: number;
  status: 'active' | 'inactive';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  sizes: Size[];
  colors: string[];
  fabricType: FabricType;
  description?: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  lowStockThreshold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  image?: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  supplyType: string;
  rating: number;
  totalOrders: number;
  outstandingBalance: number;
  status: 'active' | 'inactive';
}

export interface InvoiceItem {
  productId: string;
  productName: string;
  sku: string;
  barcode?: string;
  size: Size;
  color: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface InvoicePayment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'card' | 'bank-transfer' | 'cheque';
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paidAmount: number;
  dueDate: string;
  paymentMethod: 'cash' | 'card' | 'bank-transfer' | 'credit';
  status: 'paid' | 'partial' | 'pending' | 'cancelled';
  payments: InvoicePayment[];
  notes?: string;
  createdAt: string;
}

export interface DailySales {
  date: string;
  revenue: number;
  orders: number;
  profit: number;
}

// ==========================================
// CATEGORIES
// ==========================================
export const mockCategories: Category[] = [
  { id: 'cat-1', name: "Men's Wear", slug: 'mens-wear', description: 'Complete men\'s clothing collection', productCount: 45, status: 'active' },
  { id: 'cat-2', name: "Women's Wear", slug: 'womens-wear', description: 'Trendy women\'s fashion collection', productCount: 62, status: 'active' },
  { id: 'cat-3', name: "Kids' Wear", slug: 'kids-wear', description: 'Children\'s clothing for all ages', productCount: 28, status: 'active' },
  { id: 'cat-4', name: 'Footwear', slug: 'footwear', description: 'Shoes, sandals, and boots', productCount: 34, status: 'active' },
  { id: 'cat-5', name: 'Accessories', slug: 'accessories', description: 'Belts, bags, watches, and more', productCount: 19, status: 'active' },
  { id: 'cat-6', name: 'Sportswear', slug: 'sportswear', description: 'Active & athletic wear', productCount: 22, status: 'active' },
  { id: 'cat-7', name: 'Formal Wear', slug: 'formal-wear', description: 'Suits, blazers, and formal attire', productCount: 15, status: 'active' },
  { id: 'cat-8', name: 'Denim', slug: 'denim', description: 'Jeans, jackets, and denim wear', productCount: 18, status: 'active' },
  { id: 'cat-9', name: 'Traditional', slug: 'traditional', description: 'Sarees, sarongs, and cultural wear', productCount: 12, status: 'active' },
  { id: 'cat-10', name: 'Innerwear', slug: 'innerwear', description: 'Undergarments & loungewear', productCount: 20, status: 'inactive' },
];

// ==========================================
// PRODUCTS
// ==========================================
export const mockProducts: Product[] = [
  { id: 'p-1', sku: 'RL-MT-001', name: 'Classic Crew Neck T-Shirt', category: "Men's Wear", brand: 'Reliance', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Navy'], fabricType: 'Cotton', costPrice: 850, sellingPrice: 1490, stock: 145, lowStockThreshold: 20, status: 'in-stock', createdAt: '2026-01-15' },
  { id: 'p-2', sku: 'RL-MT-002', name: 'Slim Fit Polo Shirt', category: "Men's Wear", brand: 'Reliance', sizes: ['M', 'L', 'XL', 'XXL'], colors: ['Black', 'Charcoal', 'Forest Green'], fabricType: 'Cotton', costPrice: 1200, sellingPrice: 2290, stock: 78, lowStockThreshold: 15, status: 'in-stock', createdAt: '2026-01-18' },
  { id: 'p-3', sku: 'RL-WD-001', name: 'Floral Maxi Dress', category: "Women's Wear", brand: 'Reliance', sizes: ['XS', 'S', 'M', 'L'], colors: ['Blush Pink', 'Ivory', 'Dusty Blue'], fabricType: 'Chiffon', costPrice: 2400, sellingPrice: 4490, stock: 32, lowStockThreshold: 10, status: 'in-stock', createdAt: '2026-01-20' },
  { id: 'p-4', sku: 'RL-MJ-001', name: 'Slim Fit Stretch Jeans', category: 'Denim', brand: 'Reliance', sizes: ['28', '30', '32', '34', '36'], colors: ['Dark Blue', 'Black', 'Light Wash'], fabricType: 'Denim', costPrice: 1800, sellingPrice: 3490, stock: 95, lowStockThreshold: 20, status: 'in-stock', createdAt: '2026-01-22' },
  { id: 'p-5', sku: 'RL-WT-001', name: 'Cotton Casual Blouse', category: "Women's Wear", brand: 'Reliance', sizes: ['S', 'M', 'L'], colors: ['White', 'Cream', 'Sage'], fabricType: 'Cotton', costPrice: 1100, sellingPrice: 1990, stock: 8, lowStockThreshold: 10, status: 'low-stock', createdAt: '2026-02-01' },
  { id: 'p-6', sku: 'RL-KB-001', name: "Kids' Graphic Tee", category: "Kids' Wear", brand: 'Reliance', sizes: ['XS', 'S', 'M'], colors: ['Red', 'Blue', 'Yellow'], fabricType: 'Cotton', costPrice: 550, sellingPrice: 990, stock: 200, lowStockThreshold: 30, status: 'in-stock', createdAt: '2026-02-03' },
  { id: 'p-7', sku: 'RL-AC-001', name: 'Leather Crossbody Bag', category: 'Accessories', brand: 'Reliance', sizes: ['FREE'], colors: ['Black', 'Tan', 'Burgundy'], fabricType: 'Leather', costPrice: 3200, sellingPrice: 5990, stock: 15, lowStockThreshold: 5, status: 'in-stock', createdAt: '2026-02-05' },
  { id: 'p-8', sku: 'RL-FW-001', name: "Men's Leather Oxford Shoes", category: 'Footwear', brand: 'Reliance', sizes: ['38', 'FREE'], colors: ['Black', 'Brown'], fabricType: 'Leather', costPrice: 4500, sellingPrice: 7990, stock: 22, lowStockThreshold: 5, status: 'in-stock', createdAt: '2026-02-07' },
  { id: 'p-9', sku: 'RL-SP-001', name: 'Dry-Fit Running Tank', category: 'Sportswear', brand: 'Reliance', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Neon Green', 'Grey'], fabricType: 'Polyester', costPrice: 950, sellingPrice: 1790, stock: 60, lowStockThreshold: 15, status: 'in-stock', createdAt: '2026-02-10' },
  { id: 'p-10', sku: 'RL-FM-001', name: 'Two-Piece Formal Suit', category: 'Formal Wear', brand: 'Reliance', sizes: ['M', 'L', 'XL'], colors: ['Black', 'Navy', 'Charcoal'], fabricType: 'Polyester', costPrice: 8500, sellingPrice: 14990, stock: 0, lowStockThreshold: 3, status: 'out-of-stock', createdAt: '2026-02-12' },
  { id: 'p-11', sku: 'RL-WS-001', name: "Women's High-Rise Skinny Jeans", category: 'Denim', brand: 'Reliance', sizes: ['28', '30', '32'], colors: ['Black', 'Dark Blue'], fabricType: 'Denim', costPrice: 1650, sellingPrice: 3290, stock: 42, lowStockThreshold: 10, status: 'in-stock', createdAt: '2026-02-14' },
  { id: 'p-12', sku: 'RL-TR-001', name: 'Silk Saree — Wedding Collection', category: 'Traditional', brand: 'Reliance', sizes: ['FREE'], colors: ['Red & Gold', 'Royal Blue', 'Emerald'], fabricType: 'Silk', costPrice: 12000, sellingPrice: 19990, stock: 5, lowStockThreshold: 3, status: 'in-stock', createdAt: '2026-02-16' },
  { id: 'p-13', sku: 'RL-MT-003', name: 'Henley Long Sleeve Shirt', category: "Men's Wear", brand: 'Reliance', sizes: ['S', 'M', 'L', 'XL'], colors: ['Olive', 'Maroon', 'White'], fabricType: 'Cotton', costPrice: 1050, sellingPrice: 1890, stock: 55, lowStockThreshold: 12, status: 'in-stock', createdAt: '2026-02-18' },
  { id: 'p-14', sku: 'RL-WD-002', name: 'Wrap Around Midi Skirt', category: "Women's Wear", brand: 'Reliance', sizes: ['S', 'M', 'L'], colors: ['Black', 'Olive', 'Rust'], fabricType: 'Linen', costPrice: 1400, sellingPrice: 2690, stock: 3, lowStockThreshold: 8, status: 'low-stock', createdAt: '2026-02-20' },
  { id: 'p-15', sku: 'RL-AC-002', name: "Men's Automatic Watch", category: 'Accessories', brand: 'Reliance', sizes: ['FREE'], colors: ['Silver/Black', 'Gold/Brown'], fabricType: 'Other', costPrice: 6800, sellingPrice: 11990, stock: 10, lowStockThreshold: 3, status: 'in-stock', createdAt: '2026-02-22' },
  { id: 'p-16', sku: 'RL-KD-002', name: "Girls' Party Frock", category: "Kids' Wear", brand: 'Reliance', sizes: ['XS', 'S', 'M'], colors: ['Pink', 'Lavender', 'White'], fabricType: 'Satin', costPrice: 1500, sellingPrice: 2990, stock: 25, lowStockThreshold: 8, status: 'in-stock', createdAt: '2026-02-24' },
];

// ==========================================
// SUPPLIERS
// ==========================================
export const mockSuppliers: Supplier[] = [
  { id: 's-1', name: 'Colombo Textiles Ltd', contactPerson: 'Ruwan Perera', phone: '011-2345678', email: 'ruwan@colombotextiles.lk', address: 'No. 45, Galle Road, Colombo 03', supplyType: 'Fabrics & Raw Materials', rating: 4.8, totalOrders: 124, outstandingBalance: 85000, status: 'active' },
  { id: 's-2', name: 'Fashion Hub Imports', contactPerson: 'Amara Silva', phone: '011-9876543', email: 'amara@fashionhub.lk', address: 'No. 12, Union Place, Colombo 02', supplyType: 'Ready-Made Garments', rating: 4.5, totalOrders: 89, outstandingBalance: 120000, status: 'active' },
  { id: 's-3', name: 'Lanka Leather Works', contactPerson: 'Kasun Fernando', phone: '031-2234567', email: 'kasun@lankaLeather.lk', address: 'No. 78, Kandy Road, Kadawatha', supplyType: 'Leather Goods & Footwear', rating: 4.2, totalOrders: 56, outstandingBalance: 0, status: 'active' },
  { id: 's-4', name: 'Denim World PLC', contactPerson: 'Nimal Jayawardena', phone: '011-5567890', email: 'nimal@denimworld.lk', address: 'No. 200, Baseline Road, Colombo 09', supplyType: 'Denim & Casual Wear', rating: 4.6, totalOrders: 78, outstandingBalance: 45000, status: 'active' },
  { id: 's-5', name: 'Elegant Sarees', contactPerson: 'Kumari Rathnayake', phone: '081-2345678', email: 'kumari@elegantSarees.lk', address: 'No. 15, Peradeniya Road, Kandy', supplyType: 'Traditional Wear', rating: 4.9, totalOrders: 34, outstandingBalance: 200000, status: 'active' },
  { id: 's-6', name: 'ActiveWear Solutions', contactPerson: 'Dinesh Gamage', phone: '011-7788990', email: 'dinesh@activewear.lk', address: 'No. 88, Duplication Road, Colombo 04', supplyType: 'Sportswear & Activewear', rating: 3.8, totalOrders: 22, outstandingBalance: 0, status: 'inactive' },
];

// ==========================================
// INVOICES
// ==========================================
export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1', invoiceNumber: 'INV-2026-001', customerName: 'Kamal Gunawardena', customerPhone: '077-1234567', customerEmail: 'kamal@gmail.com',
    items: [
      { productId: 'p-1', productName: 'Classic Crew Neck T-Shirt', sku: 'RL-MT-001', barcode: '8901234567001', size: 'L', color: 'Black', quantity: 3, unitPrice: 1490, discount: 0, total: 4470 },
      { productId: 'p-4', productName: 'Slim Fit Stretch Jeans', sku: 'RL-MJ-001', barcode: '8901234567004', size: '32', color: 'Dark Blue', quantity: 1, unitPrice: 3490, discount: 200, total: 3290 },
    ],
    subtotal: 7760, discount: 200, tax: 0, total: 7560, paidAmount: 7560, dueDate: '2026-03-25', paymentMethod: 'cash', status: 'paid',
    payments: [{ id: 'pay-1', invoiceId: 'inv-1', amount: 7560, paymentDate: '2026-02-25T10:30:00', paymentMethod: 'cash' }],
    createdAt: '2026-02-25T10:30:00',
  },
  {
    id: 'inv-2', invoiceNumber: 'INV-2026-002', customerName: 'Sachini Madhushani', customerPhone: '076-9876543', customerEmail: 'sachini@yahoo.com',
    items: [
      { productId: 'p-3', productName: 'Floral Maxi Dress', sku: 'RL-WD-001', barcode: '8901234567003', size: 'M', color: 'Blush Pink', quantity: 1, unitPrice: 4490, discount: 0, total: 4490 },
      { productId: 'p-7', productName: 'Leather Crossbody Bag', sku: 'RL-AC-001', barcode: '8901234567007', size: 'FREE', color: 'Tan', quantity: 1, unitPrice: 5990, discount: 500, total: 5490 },
    ],
    subtotal: 10480, discount: 500, tax: 0, total: 9980, paidAmount: 5000, dueDate: '2026-03-15', paymentMethod: 'card', status: 'partial',
    payments: [
      { id: 'pay-2a', invoiceId: 'inv-2', amount: 3000, paymentDate: '2026-02-26T14:15:00', paymentMethod: 'card' },
      { id: 'pay-2b', invoiceId: 'inv-2', amount: 2000, paymentDate: '2026-02-28T09:00:00', paymentMethod: 'cash' },
    ],
    createdAt: '2026-02-26T14:15:00',
  },
  {
    id: 'inv-3', invoiceNumber: 'INV-2026-003', customerName: 'Ashan Bandara', customerPhone: '071-5556789',
    items: [
      { productId: 'p-10', productName: 'Two-Piece Formal Suit', sku: 'RL-FM-001', barcode: '8901234567010', size: 'L', color: 'Navy', quantity: 1, unitPrice: 14990, discount: 1000, total: 13990 },
      { productId: 'p-8', productName: "Men's Leather Oxford Shoes", sku: 'RL-FW-001', barcode: '8901234567008', size: 'FREE', color: 'Black', quantity: 1, unitPrice: 7990, discount: 0, total: 7990 },
      { productId: 'p-15', productName: "Men's Automatic Watch", sku: 'RL-AC-002', barcode: '8901234567015', size: 'FREE', color: 'Silver/Black', quantity: 1, unitPrice: 11990, discount: 0, total: 11990 },
    ],
    subtotal: 34970, discount: 1000, tax: 0, total: 33970, paidAmount: 33970, dueDate: '2026-03-27', paymentMethod: 'bank-transfer', status: 'paid',
    payments: [{ id: 'pay-3', invoiceId: 'inv-3', amount: 33970, paymentDate: '2026-02-27T09:00:00', paymentMethod: 'bank-transfer' }],
    createdAt: '2026-02-27T09:00:00',
  },
  {
    id: 'inv-4', invoiceNumber: 'INV-2026-004', customerName: 'Dulani Weerasinghe', customerPhone: '078-3334444', customerEmail: 'dulani.w@gmail.com',
    items: [
      { productId: 'p-12', productName: 'Silk Saree — Wedding Collection', sku: 'RL-TR-001', barcode: '8901234567012', size: 'FREE', color: 'Red & Gold', quantity: 1, unitPrice: 19990, discount: 0, total: 19990 },
    ],
    subtotal: 19990, discount: 0, tax: 0, total: 19990, paidAmount: 0, dueDate: '2026-03-10', paymentMethod: 'credit', status: 'pending',
    payments: [],
    notes: 'Wedding order — promised pick-up in 2 weeks', createdAt: '2026-02-28T11:45:00',
  },
  {
    id: 'inv-5', invoiceNumber: 'INV-2026-005', customerName: 'Lakshan Jayasuriya', customerPhone: '070-1112222',
    items: [
      { productId: 'p-9', productName: 'Dry-Fit Running Tank', sku: 'RL-SP-001', barcode: '8901234567009', size: 'M', color: 'Black', quantity: 2, unitPrice: 1790, discount: 0, total: 3580 },
      { productId: 'p-2', productName: 'Slim Fit Polo Shirt', sku: 'RL-MT-002', barcode: '8901234567002', size: 'L', color: 'Charcoal', quantity: 1, unitPrice: 2290, discount: 0, total: 2290 },
    ],
    subtotal: 5870, discount: 0, tax: 0, total: 5870, paidAmount: 5870, dueDate: '2026-03-31', paymentMethod: 'cash', status: 'paid',
    payments: [{ id: 'pay-5', invoiceId: 'inv-5', amount: 5870, paymentDate: '2026-03-01T08:20:00', paymentMethod: 'cash' }],
    createdAt: '2026-03-01T08:20:00',
  },
  {
    id: 'inv-6', invoiceNumber: 'INV-2026-006', customerName: 'Tharushi Herath', customerPhone: '072-7778888', customerEmail: 'tharushi.h@outlook.com',
    items: [
      { productId: 'p-5', productName: 'Cotton Casual Blouse', sku: 'RL-WT-001', barcode: '8901234567005', size: 'M', color: 'Sage', quantity: 2, unitPrice: 1990, discount: 200, total: 3780 },
      { productId: 'p-14', productName: 'Wrap Around Midi Skirt', sku: 'RL-WD-002', barcode: '8901234567014', size: 'M', color: 'Black', quantity: 1, unitPrice: 2690, discount: 0, total: 2690 },
      { productId: 'p-11', productName: "Women's High-Rise Skinny Jeans", sku: 'RL-WS-001', barcode: '8901234567011', size: '30', color: 'Black', quantity: 1, unitPrice: 3290, discount: 290, total: 3000 },
    ],
    subtotal: 9970, discount: 490, tax: 0, total: 9470, paidAmount: 9470, dueDate: '2026-03-31', paymentMethod: 'card', status: 'paid',
    payments: [{ id: 'pay-6', invoiceId: 'inv-6', amount: 9470, paymentDate: '2026-03-01T12:00:00', paymentMethod: 'card' }],
    createdAt: '2026-03-01T12:00:00',
  },
  {
    id: 'inv-7', invoiceNumber: 'INV-2026-007', customerName: 'Walk-in Customer', customerPhone: '-',
    items: [
      { productId: 'p-6', productName: "Kids' Graphic Tee", sku: 'RL-KB-001', barcode: '8901234567006', size: 'S', color: 'Blue', quantity: 4, unitPrice: 990, discount: 0, total: 3960 },
      { productId: 'p-16', productName: "Girls' Party Frock", sku: 'RL-KD-002', barcode: '8901234567016', size: 'S', color: 'Pink', quantity: 1, unitPrice: 2990, discount: 0, total: 2990 },
    ],
    subtotal: 6950, discount: 0, tax: 0, total: 6950, paidAmount: 6950, dueDate: '2026-03-31', paymentMethod: 'cash', status: 'paid',
    payments: [{ id: 'pay-7', invoiceId: 'inv-7', amount: 6950, paymentDate: '2026-03-01T15:30:00', paymentMethod: 'cash' }],
    createdAt: '2026-03-01T15:30:00',
  },
  {
    id: 'inv-8', invoiceNumber: 'INV-2026-008', customerName: 'Mahesh Rathnayake', customerPhone: '075-4445555',
    items: [
      { productId: 'p-13', productName: 'Henley Long Sleeve Shirt', sku: 'RL-MT-003', barcode: '8901234567013', size: 'XL', color: 'Olive', quantity: 2, unitPrice: 1890, discount: 0, total: 3780 },
    ],
    subtotal: 3780, discount: 0, tax: 0, total: 3780, paidAmount: 2000, dueDate: '2026-03-15', paymentMethod: 'cash', status: 'partial',
    payments: [{ id: 'pay-8', invoiceId: 'inv-8', amount: 2000, paymentDate: '2026-03-01T16:45:00', paymentMethod: 'cash' }],
    notes: 'Remaining Rs. 1,780 to be paid next week', createdAt: '2026-03-01T16:45:00',
  },
  {
    id: 'inv-9', invoiceNumber: 'INV-2026-009', customerName: 'Nadeeka Perera', customerPhone: '077-8889999', customerEmail: 'nadeeka.p@gmail.com',
    items: [
      { productId: 'p-3', productName: 'Floral Maxi Dress', sku: 'RL-WD-001', barcode: '8901234567003', size: 'S', color: 'Ivory', quantity: 1, unitPrice: 4490, discount: 0, total: 4490 },
      { productId: 'p-14', productName: 'Wrap Around Midi Skirt', sku: 'RL-WD-002', barcode: '8901234567014', size: 'S', color: 'Rust', quantity: 1, unitPrice: 2690, discount: 300, total: 2390 },
      { productId: 'p-7', productName: 'Leather Crossbody Bag', sku: 'RL-AC-001', barcode: '8901234567007', size: 'FREE', color: 'Burgundy', quantity: 1, unitPrice: 5990, discount: 0, total: 5990 },
    ],
    subtotal: 13170, discount: 300, tax: 0, total: 12870, paidAmount: 12870, dueDate: '2026-03-28', paymentMethod: 'card', status: 'paid',
    payments: [{ id: 'pay-9', invoiceId: 'inv-9', amount: 12870, paymentDate: '2026-02-28T14:30:00', paymentMethod: 'card' }],
    createdAt: '2026-02-28T14:30:00',
  },
  {
    id: 'inv-10', invoiceNumber: 'INV-2026-010', customerName: 'Roshan De Silva', customerPhone: '071-6667777',
    items: [
      { productId: 'p-4', productName: 'Slim Fit Stretch Jeans', sku: 'RL-MJ-001', barcode: '8901234567004', size: '34', color: 'Black', quantity: 2, unitPrice: 3490, discount: 0, total: 6980 },
      { productId: 'p-1', productName: 'Classic Crew Neck T-Shirt', sku: 'RL-MT-001', barcode: '8901234567001', size: 'XL', color: 'White', quantity: 3, unitPrice: 1490, discount: 0, total: 4470 },
      { productId: 'p-13', productName: 'Henley Long Sleeve Shirt', sku: 'RL-MT-003', barcode: '8901234567013', size: 'L', color: 'White', quantity: 1, unitPrice: 1890, discount: 0, total: 1890 },
    ],
    subtotal: 13340, discount: 0, tax: 0, total: 13340, paidAmount: 5000, dueDate: '2026-03-08', paymentMethod: 'cash', status: 'partial',
    payments: [{ id: 'pay-10', invoiceId: 'inv-10', amount: 5000, paymentDate: '2026-02-26T11:00:00', paymentMethod: 'cash' }],
    notes: 'Regular customer — 3 jeans + t-shirts bulk purchase', createdAt: '2026-02-26T11:00:00',
  },
  {
    id: 'inv-11', invoiceNumber: 'INV-2026-011', customerName: 'Chamari Fernando', customerPhone: '076-2223333',
    items: [
      { productId: 'p-12', productName: 'Silk Saree — Wedding Collection', sku: 'RL-TR-001', barcode: '8901234567012', size: 'FREE', color: 'Royal Blue', quantity: 2, unitPrice: 19990, discount: 2000, total: 37980 },
      { productId: 'p-5', productName: 'Cotton Casual Blouse', sku: 'RL-WT-001', barcode: '8901234567005', size: 'L', color: 'White', quantity: 1, unitPrice: 1990, discount: 0, total: 1990 },
    ],
    subtotal: 41970, discount: 2000, tax: 0, total: 39970, paidAmount: 0, dueDate: '2026-02-25', paymentMethod: 'credit', status: 'pending',
    payments: [],
    notes: 'OVERDUE — 2 sarees for family wedding. Customer promised payment after wedding.', createdAt: '2026-02-20T16:00:00',
  },
  {
    id: 'inv-12', invoiceNumber: 'INV-2026-012', customerName: 'Walk-in Customer', customerPhone: '-',
    items: [
      { productId: 'p-9', productName: 'Dry-Fit Running Tank', sku: 'RL-SP-001', barcode: '8901234567009', size: 'L', color: 'Neon Green', quantity: 1, unitPrice: 1790, discount: 0, total: 1790 },
    ],
    subtotal: 1790, discount: 0, tax: 0, total: 1790, paidAmount: 1790, dueDate: '2026-03-31', paymentMethod: 'cash', status: 'paid',
    payments: [{ id: 'pay-12', invoiceId: 'inv-12', amount: 1790, paymentDate: '2026-03-01T09:15:00', paymentMethod: 'cash' }],
    createdAt: '2026-03-01T09:15:00',
  },
];

// ==========================================
// DAILY SALES DATA (30 days)
// ==========================================
export const mockDailySales: DailySales[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date('2026-02-01');
  d.setDate(d.getDate() + i);
  const base = 15000 + Math.random() * 35000;
  return {
    date: d.toISOString().split('T')[0],
    revenue: Math.round(base),
    orders: Math.floor(5 + Math.random() * 15),
    profit: Math.round(base * (0.25 + Math.random() * 0.15)),
  };
});

// ==========================================
// TOP SELLING
// ==========================================
export const topSellingProducts = [
  { name: 'Classic Crew Neck T-Shirt', unitsSold: 342, revenue: 509580 },
  { name: 'Slim Fit Stretch Jeans', unitsSold: 218, revenue: 760820 },
  { name: 'Floral Maxi Dress', unitsSold: 156, revenue: 700440 },
  { name: 'Leather Crossbody Bag', unitsSold: 89, revenue: 533110 },
  { name: "Kids' Graphic Tee", unitsSold: 280, revenue: 277200 },
];

export const categoryRevenue = [
  { name: "Men's Wear", revenue: 1250000, percentage: 28 },
  { name: "Women's Wear", revenue: 1100000, percentage: 24 },
  { name: 'Denim', revenue: 680000, percentage: 15 },
  { name: 'Footwear', revenue: 520000, percentage: 11 },
  { name: 'Accessories', revenue: 450000, percentage: 10 },
  { name: "Kids' Wear", revenue: 320000, percentage: 7 },
  { name: 'Others', revenue: 230000, percentage: 5 },
];
