import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../lib/utils';
import {
  mockProducts as initialProducts,
  FABRIC_TYPES,
  CLOTHING_SIZES,
  WAIST_SIZES,
  COMMON_COLORS,
  mockCategories,
  type Product,
  type Size,
  type FabricType,
} from '../data/mockData';
import { toast } from 'sonner';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';
import { SearchableComboBox, type ComboBoxOption } from '../components/ui/SearchableComboBox';
import { ImageUpload } from '../components/ui/ImageUpload';
import {
  Search, Plus, Package, Edit, Trash2, Eye, Filter, Calendar,
  Grid3X3, List, X, ChevronLeft, ChevronRight, SortAsc, SortDesc,
  ChevronsLeft, ChevronsRight, Save, Ruler, Palette, Shirt,
  Watch, Footprints, Zap, Briefcase, Crown, Gem, Baby, ImagePlus,
} from 'lucide-react';

/** Map of colour names → approximate hex values for dots */
const COLOR_HEX_MAP: Record<string, string> = {
  'Black': '#000000', 'White': '#FFFFFF', 'Navy': '#001F3F', 'Red': '#E53E3E',
  'Blue': '#3B82F6', 'Grey': '#9CA3AF', 'Brown': '#92400E', 'Cream': '#FFFDD0',
  'Olive': '#6B7821', 'Maroon': '#7F1D1D', 'Pink': '#EC4899', 'Beige': '#D2B48C',
  'Charcoal': '#36454F', 'Forest Green': '#228B22', 'Burgundy': '#800020',
  'Tan': '#D2B48C', 'Sage': '#87AE73', 'Ivory': '#FFFFF0', 'Lavender': '#E6E6FA',
  'Rust': '#B7410E', 'Yellow': '#EAB308', 'Orange': '#F97316', 'Teal': '#14B8A6',
  'Coral': '#FF7F50',
};

// ===== INLINE CALENDAR COMPONENT =====
const InlineCalendar: React.FC<{
  value: string;
  onChange: (date: string) => void;
  dark: boolean;
  onClose: () => void;
}> = ({ value, onChange, dark, onClose }) => {
  const [viewDate, setViewDate] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const daysInMonth = new Date(viewDate.year, viewDate.month + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewDate.year, viewDate.month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);
  const selectedDate = value ? new Date(value) : null;

  const prevMonth = () => setViewDate(prev => prev.month === 0 ? { year: prev.year - 1, month: 11 } : { ...prev, month: prev.month - 1 });
  const nextMonth = () => setViewDate(prev => prev.month === 11 ? { year: prev.year + 1, month: 0 } : { ...prev, month: prev.month + 1 });

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const isSelected = (day: number) => selectedDate && selectedDate.getFullYear() === viewDate.year && selectedDate.getMonth() === viewDate.month && selectedDate.getDate() === day;
  const isToday = (day: number) => { const t = new Date(); return t.getFullYear() === viewDate.year && t.getMonth() === viewDate.month && t.getDate() === day; };

  return (
    <div className={`p-3 rounded-xl border shadow-xl ${dark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <button onClick={prevMonth} className={`p-1 rounded-lg ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'}`}><ChevronLeft className="w-4 h-4" /></button>
        <span className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{monthNames[viewDate.month]} {viewDate.year}</span>
        <button onClick={nextMonth} className={`p-1 rounded-lg ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'}`}><ChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className={`text-[10px] font-medium py-1 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{d}</div>
        ))}
        {blanks.map(b => <div key={`bl-${b}`} />)}
        {days.map(day => (
          <button
            key={day}
            onClick={() => {
              const m = (viewDate.month + 1).toString().padStart(2, '0');
              const d = day.toString().padStart(2, '0');
              onChange(`${viewDate.year}-${m}-${d}`);
              onClose();
            }}
            className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
              isSelected(day)
                ? dark ? 'bg-white text-black' : 'bg-brand-900 text-white'
                : isToday(day)
                ? dark ? 'bg-neutral-800 text-white ring-1 ring-neutral-600' : 'bg-gray-100 text-gray-900 ring-1 ring-gray-300'
                : dark ? 'text-neutral-300 hover:bg-neutral-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export const Products: React.FC = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  // ─── Category icon helper ───
  const categoryIcon = (category: string) => {
    const cls = 'w-10 h-10';
    if (category === "Men's Wear") return <Shirt className={`${cls} text-blue-400`} />;
    if (category === "Women's Wear") return <Gem className={`${cls} text-pink-400`} />;
    if (category === 'Denim') return <Ruler className={`${cls} text-indigo-400`} />;
    if (category === "Kids' Wear") return <Baby className={`${cls} text-yellow-400`} />;
    if (category === 'Accessories') return <Watch className={`${cls} text-amber-400`} />;
    if (category === 'Footwear') return <Footprints className={`${cls} text-orange-400`} />;
    if (category === 'Sportswear') return <Zap className={`${cls} text-green-400`} />;
    if (category === 'Formal Wear') return <Briefcase className={`${cls} text-slate-400`} />;
    if (category === 'Traditional') return <Crown className={`${cls} text-rose-400`} />;
    return <Package className={`${cls} text-neutral-500`} />;
  };

  // ─── State ───
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fabricFilter, setFabricFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [showFilters, setShowFilters] = useState(false);
  const [colorFilter, setColorFilter] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showStartCal, setShowStartCal] = useState(false);
  const [showEndCal, setShowEndCal] = useState(false);
  const startCalRef = useRef<HTMLDivElement>(null);
  const endCalRef = useRef<HTMLDivElement>(null);

  // Click outside to close calendars
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (showStartCal && startCalRef.current && !startCalRef.current.contains(e.target as Node)) setShowStartCal(false);
      if (showEndCal && endCalRef.current && !endCalRef.current.contains(e.target as Node)) setShowEndCal(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showStartCal, showEndCal]);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formFabricType, setFormFabricType] = useState<FabricType>('Cotton');
  const [formSizes, setFormSizes] = useState<Size[]>([]);
  const [formColors, setFormColors] = useState<string[]>([]);
  const [formCostPrice, setFormCostPrice] = useState('');
  const [formSellingPrice, setFormSellingPrice] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formLowStockThreshold, setFormLowStockThreshold] = useState('10');
  const [formImage, setFormImage] = useState<string | undefined>();

  const gridPerPageOptions = [8, 12, 16, 24];
  const tablePerPageOptions = [5, 10, 20, 50];
  const perPageOptions = viewMode === 'list' ? tablePerPageOptions : gridPerPageOptions;

  useEffect(() => { setItemsPerPage(viewMode === 'list' ? 10 : 8); }, [viewMode]);

  // ─── Derived data ───
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  const activeFilterCount = [
    categoryFilter !== 'all' ? 1 : 0,
    statusFilter !== 'all' ? 1 : 0,
    fabricFilter !== 'all' ? 1 : 0,
    colorFilter.length > 0 ? 1 : 0,
    (minPrice || maxPrice) ? 1 : 0,
    (dateFrom || dateTo) ? 1 : 0,
  ].reduce((s, v) => s + v, 0);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchFabric = fabricFilter === 'all' || p.fabricType === fabricFilter;
      const matchColor = colorFilter.length === 0 || p.colors.some(c => colorFilter.includes(c));
      const matchPrice = (!minPrice || p.sellingPrice >= parseFloat(minPrice)) && (!maxPrice || p.sellingPrice <= parseFloat(maxPrice));
      const matchDate = (!dateFrom || new Date(p.createdAt) >= new Date(dateFrom)) && (!dateTo || new Date(p.createdAt) <= new Date(dateTo + 'T23:59:59'));
      return matchSearch && matchCategory && matchStatus && matchFabric && matchColor && matchPrice && matchDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [products, searchQuery, categoryFilter, statusFilter, fabricFilter, colorFilter, minPrice, maxPrice, dateFrom, dateTo, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, categoryFilter, statusFilter, fabricFilter, colorFilter, minPrice, maxPrice, dateFrom, dateTo, viewMode, itemsPerPage]);

  // ─── ComboBox options ───
  const categoryOptions: ComboBoxOption[] = useMemo(() => [
    { value: 'all', label: 'All Categories' },
    ...mockCategories.filter(c => c.status === 'active').map(c => ({
      value: c.name,
      label: c.name,
      count: products.filter(p => p.category === c.name).length,
    })),
  ], [products]);

  const statusOptions: ComboBoxOption[] = [
    { value: 'all', label: 'All Status' },
    { value: 'in-stock', label: 'In Stock', colorDot: '#22c55e' },
    { value: 'low-stock', label: 'Low Stock', colorDot: '#f59e0b' },
    { value: 'out-of-stock', label: 'Out of Stock', colorDot: '#ef4444' },
  ];

  const fabricOptions: ComboBoxOption[] = useMemo(() => [
    { value: 'all', label: 'All Fabrics' },
    ...FABRIC_TYPES.map(f => ({
      value: f,
      label: f,
      count: products.filter(p => p.fabricType === f).length,
    })),
  ], [products]);

  // Form combobox options
  const formCategoryOptions: ComboBoxOption[] = useMemo(() =>
    mockCategories.filter(c => c.status === 'active').map(c => ({ value: c.name, label: c.name })),
    []
  );

  const formBrandOptions: ComboBoxOption[] = useMemo(() =>
    brands.map(b => ({ value: b, label: b })),
    [brands]
  );

  const formFabricOptions: ComboBoxOption[] = FABRIC_TYPES.map(f => ({ value: f, label: f }));

  const sizeOptions: ComboBoxOption[] = useMemo(() => [
    ...CLOTHING_SIZES.map(s => ({ value: s, label: s })),
    ...WAIST_SIZES.map(s => ({ value: s, label: s })),
    { value: 'FREE', label: 'FREE' },
  ], []);

  const colorOptions: ComboBoxOption[] = useMemo(() =>
    COMMON_COLORS.map(c => ({
      value: c,
      label: c,
      colorDot: COLOR_HEX_MAP[c] || '#9ca3af',
    })),
    []
  );

  // ─── Form helpers ───
  const resetForm = useCallback(() => {
    setFormName(''); setFormSku(''); setFormCategory(''); setFormBrand('');
    setFormDescription(''); setFormFabricType('Cotton'); setFormSizes([]);
    setFormColors([]); setFormCostPrice(''); setFormSellingPrice('');
    setFormStock(''); setFormLowStockThreshold('10'); setFormImage(undefined);
  }, []);

  const openAddModal = () => { resetForm(); setShowAddModal(true); };

  const openEditModal = (p: Product) => {
    setSelectedProduct(p);
    setFormName(p.name); setFormSku(p.sku); setFormCategory(p.category); setFormBrand(p.brand);
    setFormDescription(p.description || ''); setFormFabricType(p.fabricType); setFormSizes([...p.sizes]);
    setFormColors([...p.colors]); setFormCostPrice(p.costPrice.toString()); setFormSellingPrice(p.sellingPrice.toString());
    setFormStock(p.stock.toString()); setFormLowStockThreshold(p.lowStockThreshold.toString());
    setFormImage(p.image);
    setShowEditModal(true);
  };

  const handleSaveProduct = (isEdit: boolean) => {
    if (!formName.trim()) { toast.error('Product name required'); return; }
    if (!formSku.trim()) { toast.error('SKU required'); return; }
    if (formSizes.length === 0) { toast.error('Select at least one size'); return; }
    if (formColors.length === 0) { toast.error('Select at least one color'); return; }
    if (!formCostPrice || !formSellingPrice) { toast.error('Prices required'); return; }

    const stock = parseInt(formStock) || 0;
    const threshold = parseInt(formLowStockThreshold) || 10;
    const status: Product['status'] = stock === 0 ? 'out-of-stock' : stock <= threshold ? 'low-stock' : 'in-stock';

    if (isEdit && selectedProduct) {
      setProducts(prev => prev.map(p => p.id === selectedProduct.id ? {
        ...p, name: formName, sku: formSku, category: formCategory || 'Uncategorized', brand: formBrand || 'Unbranded',
        description: formDescription || undefined, fabricType: formFabricType, sizes: formSizes, colors: formColors,
        costPrice: parseFloat(formCostPrice) || 0, sellingPrice: parseFloat(formSellingPrice) || 0,
        stock, lowStockThreshold: threshold, status, image: formImage,
      } : p));
      setShowEditModal(false);
      toast.success('Product updated', { description: formName });
    } else {
      const newProduct: Product = {
        id: `p-${Date.now()}`, sku: formSku, name: formName,
        category: formCategory || 'Uncategorized', brand: formBrand || 'Unbranded',
        description: formDescription || undefined, fabricType: formFabricType, sizes: formSizes, colors: formColors,
        costPrice: parseFloat(formCostPrice) || 0, sellingPrice: parseFloat(formSellingPrice) || 0,
        stock, lowStockThreshold: threshold, status, image: formImage, createdAt: new Date().toISOString(),
      };
      setProducts(prev => [newProduct, ...prev]);
      setShowAddModal(false);
      toast.success('Product added', { description: formName });
    }
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
    toast.success('Product deleted', { description: selectedProduct.name });
    setSelectedProduct(null);
  };

  // ─── Status badge ───
  const statusBadge = (status: Product['status']) => {
    const styles = {
      'in-stock': 'bg-green-500/10 text-green-500 border-green-500/20',
      'low-stock': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      'out-of-stock': 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    const labels = { 'in-stock': 'In Stock', 'low-stock': 'Low Stock', 'out-of-stock': 'Out of Stock' };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${styles[status]}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {labels[status]}
      </span>
    );
  };

  const hasActiveFilters = searchQuery || categoryFilter !== 'all' || statusFilter !== 'all' || fabricFilter !== 'all' || colorFilter.length > 0 || !!minPrice || !!maxPrice || !!dateFrom || !!dateTo;
  const clearFilters = () => { setSearchQuery(''); setCategoryFilter('all'); setStatusFilter('all'); setFabricFilter('all'); setColorFilter([]); setMinPrice(''); setMaxPrice(''); setDateFrom(''); setDateTo(''); };

  // ─── Pagination ───
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push('...'); pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1); pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('...'); pages.push(totalPages);
    }
    return pages;
  };

  // ─── Shared styles ───
  const inputClass = `w-full px-3 py-2 rounded-xl border text-sm transition-all ${
    dark
      ? 'bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-white/30'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400'
  }`;
  const labelClass = `block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`;

  // ═══════════════════════════════════════
  //  Product Form Modal (Add / Edit)
  // ═══════════════════════════════════════
  const renderProductForm = (isEdit: boolean) => {
    const isOpen = isEdit ? showEditModal : showAddModal;
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} />
        <div className={`relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden ${
          dark ? 'bg-neutral-950 border border-neutral-800' : 'bg-gray-50 border border-gray-200'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between px-4 sm:px-5 py-4 border-b ${dark ? 'border-neutral-800' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
            <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className={`p-2 rounded-xl ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-200 text-gray-500'}`}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
            {/* Image Upload */}
            <div className={`p-4 rounded-xl border ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                <ImagePlus className="w-4 h-4" /> Product Image
              </h3>
              <ImageUpload value={formImage} onChange={setFormImage} dark={dark} />
            </div>

            {/* Basic Info */}
            <div className={`p-4 rounded-xl border ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                <Package className="w-4 h-4" /> Basic Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Product Name *</label>
                  <input value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g., Classic Denim Jeans" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>SKU *</label>
                  <input value={formSku} onChange={e => setFormSku(e.target.value)} placeholder="e.g., REL-DJ-001" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Fabric Type</label>
                  <SearchableComboBox
                    options={formFabricOptions}
                    value={formFabricType}
                    onValueChange={(v) => setFormFabricType(v as FabricType)}
                    placeholder="Select fabric…"
                    searchPlaceholder="Search fabrics…"
                    dark={dark}
                  />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <SearchableComboBox
                    options={formCategoryOptions}
                    value={formCategory}
                    onValueChange={setFormCategory}
                    placeholder="Select category…"
                    searchPlaceholder="Search categories…"
                    dark={dark}
                    allowCustom
                  />
                </div>
                <div>
                  <label className={labelClass}>Brand</label>
                  <SearchableComboBox
                    options={formBrandOptions}
                    value={formBrand}
                    onValueChange={setFormBrand}
                    placeholder="Select brand…"
                    searchPlaceholder="Search brands…"
                    dark={dark}
                    allowCustom
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea value={formDescription} onChange={e => setFormDescription(e.target.value)} placeholder="Product description…" rows={2} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className={`p-4 rounded-xl border ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                <Ruler className="w-4 h-4" /> Sizes *
                <span className={`text-xs font-normal ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{formSizes.length} selected</span>
              </h3>
              <SearchableComboBox
                multi
                options={sizeOptions}
                value={formSizes}
                onValueChange={(vals) => setFormSizes(vals as Size[])}
                placeholder="Select sizes…"
                searchPlaceholder="Search sizes…"
                dark={dark}
              />
            </div>

            {/* Colors */}
            <div className={`p-4 rounded-xl border ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                <Palette className="w-4 h-4" /> Colors *
                <span className={`text-xs font-normal ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{formColors.length} selected</span>
              </h3>
              <SearchableComboBox
                multi
                options={colorOptions}
                value={formColors}
                onValueChange={setFormColors}
                placeholder="Select colors…"
                searchPlaceholder="Search colors…"
                dark={dark}
                allowCustom
              />
            </div>

            {/* Pricing & Stock */}
            <div className={`p-4 rounded-xl border ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                <Shirt className="w-4 h-4" /> Pricing & Stock
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Cost Price (LKR) *</label>
                  <input type="number" value={formCostPrice} onChange={e => setFormCostPrice(e.target.value)} placeholder="0.00" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Selling Price (LKR) *</label>
                  <input type="number" value={formSellingPrice} onChange={e => setFormSellingPrice(e.target.value)} placeholder="0.00" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Stock Quantity</label>
                  <input type="number" value={formStock} onChange={e => setFormStock(e.target.value)} placeholder="0" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Low Stock Alert</label>
                  <input type="number" value={formLowStockThreshold} onChange={e => setFormLowStockThreshold(e.target.value)} placeholder="10" className={inputClass} />
                </div>
              </div>
              {formCostPrice && formSellingPrice && (
                <div className={`mt-3 p-2 rounded-lg text-xs ${dark ? 'bg-neutral-800/50 text-neutral-300' : 'bg-gray-50 text-gray-600'}`}>
                  Margin: <strong className={parseFloat(formSellingPrice) > parseFloat(formCostPrice) ? 'text-green-500' : 'text-red-400'}>
                    {formatCurrency(parseFloat(formSellingPrice) - parseFloat(formCostPrice))}
                  </strong>{' '}
                  ({((parseFloat(formSellingPrice) - parseFloat(formCostPrice)) / (parseFloat(formCostPrice) || 1) * 100).toFixed(1)}%)
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between px-4 sm:px-5 py-4 border-t ${dark ? 'border-neutral-800' : 'border-gray-200'}`}>
            <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
              dark ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>Cancel</button>
            <button onClick={() => handleSaveProduct(isEdit)} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium ${
              dark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-brand-900 text-white hover:bg-brand-800'
            }`}>
              <Save className="w-4 h-4" />{isEdit ? 'Update' : 'Add Product'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  //  View Product Modal
  // ═══════════════════════════════════════
  const renderViewModal = () => {
    if (!showViewModal || !selectedProduct) return null;
    const p = selectedProduct;
    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowViewModal(false)} />
        <div className={`relative w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden ${
          dark ? 'bg-neutral-950 border border-neutral-800' : 'bg-gray-50 border border-gray-200'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between px-4 sm:px-5 py-4 border-b ${dark ? 'border-neutral-800' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Product Details</h2>
            <button onClick={() => setShowViewModal(false)} className={`p-2 rounded-xl ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-200 text-gray-500'}`}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
            {/* Image — blurred backdrop + full product */}
            <div className={`h-44 sm:h-52 rounded-xl overflow-hidden relative ${dark ? 'bg-neutral-900' : 'bg-gray-100'}`}>
              {p.image ? (
                <>
                  <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30 pointer-events-none" aria-hidden="true" />
                  <img
                    src={p.image}
                    alt={p.name}
                    className="relative w-full h-full object-contain p-3 z-[1]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const blur = e.currentTarget.previousElementSibling as HTMLElement;
                      if (blur) blur.style.display = 'none';
                    }}
                  />
                </>
              ) : null}
              <div style={{ display: p.image ? 'none' : 'flex' }} className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-[1]">
                {categoryIcon(p.category)}
                <span className={`text-xs ${dark ? 'text-neutral-600' : 'text-gray-400'}`}>{p.category}</span>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{p.name}</h3>
                <p className={`text-xs mt-0.5 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{p.sku}</p>
              </div>
              {statusBadge(p.status)}
            </div>
            {p.description && <p className={`text-sm ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{p.description}</p>}

            <div className="grid grid-cols-2 gap-3">
              {([['Category', p.category], ['Brand', p.brand], ['Fabric', p.fabricType], ['Stock', `${p.stock} units`], ['Cost', formatCurrency(p.costPrice)], ['Selling', formatCurrency(p.sellingPrice)]] as [string, string][]).map(([label, val]) => (
                <div key={label} className={`p-2.5 rounded-lg ${dark ? 'bg-neutral-900/50 border border-neutral-800/60' : 'bg-gray-50 border border-gray-200'}`}>
                  <p className={`text-[10px] uppercase tracking-wider ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{label}</p>
                  <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{val}</p>
                </div>
              ))}
            </div>

            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Sizes</p>
              <div className="flex flex-wrap gap-1.5">
                {p.sizes.map(s => (
                  <span key={s} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${dark ? 'bg-neutral-800 text-neutral-300' : 'bg-gray-100 text-gray-600'}`}>{s}</span>
                ))}
              </div>
            </div>

            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Colors</p>
              <div className="flex flex-wrap gap-1.5">
                {p.colors.map(c => (
                  <span key={c} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${dark ? 'bg-neutral-800 text-neutral-300' : 'bg-gray-100 text-gray-600'}`}>
                    {COLOR_HEX_MAP[c] && <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: COLOR_HEX_MAP[c] }} />}
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className={`p-3 rounded-xl text-xs ${dark ? 'bg-neutral-800/30 text-neutral-500' : 'bg-gray-50 text-gray-400'}`}>
              Profit margin: <strong className={p.sellingPrice > p.costPrice ? 'text-green-500' : 'text-red-400'}>
                {formatCurrency(p.sellingPrice - p.costPrice)}
              </strong> ({((p.sellingPrice - p.costPrice) / (p.costPrice || 1) * 100).toFixed(1)}%)
            </div>
          </div>

          {/* Footer */}
          <div className={`flex gap-2 px-4 sm:px-5 py-4 border-t ${dark ? 'border-neutral-800' : 'border-gray-200'}`}>
            <button onClick={() => { setShowViewModal(false); openEditModal(p); }} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium ${
              dark ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              <Edit className="w-4 h-4" /> Edit
            </button>
            <button onClick={() => { setShowViewModal(false); setShowDeleteModal(true); }} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  //  MAIN RENDER
  // ═══════════════════════════════════════
  return (
    <div className="space-y-4 sm:space-y-6 pb-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Products</h1>
          <p className={`mt-0.5 text-sm ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>
            Manage your clothing inventory — {filteredProducts.length} items
          </p>
        </div>
        <button onClick={openAddModal} className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm shadow-lg transition-all ${
          dark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-brand-900 text-white hover:bg-brand-800'
        }`}>
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* ─── Search + Filters Bar ─── */}
      <div className={`p-3 sm:p-4 rounded-2xl border ${dark ? 'bg-neutral-900/30 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
        {/* Row 1: Search + Inline Filters + Controls */}
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Search */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 min-w-0 ${
            dark ? 'bg-neutral-800/50 border-neutral-700/50' : 'bg-gray-50 border-gray-200'
          }`}>
            <Search className={`w-4 h-4 flex-shrink-0 ${dark ? 'text-neutral-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search products, SKU, brand…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`bg-transparent border-none outline-none flex-1 min-w-0 text-sm ${
                dark ? 'text-white placeholder-neutral-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className={`p-0.5 rounded ${dark ? 'hover:bg-neutral-700 text-neutral-400' : 'hover:bg-gray-200 text-gray-400'}`}>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Inline quick filters — desktop only */}
          <div className="hidden lg:flex items-center gap-2">
            <SearchableComboBox
              options={categoryOptions}
              value={categoryFilter}
              onValueChange={(v) => setCategoryFilter(v || 'all')}
              placeholder="Category"
              searchPlaceholder="Search categories…"
              dark={dark}
              triggerClassName="min-w-[150px]"
            />
            <SearchableComboBox
              options={statusOptions}
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v || 'all')}
              placeholder="Status"
              searchPlaceholder="Search…"
              dark={dark}
              triggerClassName="min-w-[130px]"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              showFilters || activeFilterCount > 0
                ? dark ? 'bg-white text-black border-white' : 'bg-brand-900 text-white border-brand-900'
                : dark ? 'border-neutral-700 text-neutral-400 hover:border-neutral-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}>
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className={`ml-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${dark ? 'bg-black/20' : 'bg-white/30'}`}>
                  {activeFilterCount}
                </span>
              )}
            </button>
            <div className={`flex rounded-xl border overflow-hidden ${dark ? 'border-neutral-700' : 'border-gray-200'}`}>
              <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? dark ? 'bg-white text-black' : 'bg-brand-900 text-white'
                  : dark ? 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? dark ? 'bg-white text-black' : 'bg-brand-900 text-white'
                  : dark ? 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}>
                <List className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
              title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
              className={`p-2 rounded-xl border transition-colors ${
                dark ? 'border-neutral-700 hover:bg-neutral-800 text-neutral-400' : 'border-gray-200 hover:bg-gray-50 text-gray-500'
              }`}
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
            {hasActiveFilters && (
              <button onClick={clearFilters} className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs ${
                dark ? 'text-neutral-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'
              }`}>
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* ─── Expanded Filters Panel ─── */}
        {showFilters && (
          <div className={`mt-3 pt-3 border-t ${dark ? 'border-neutral-800/60' : 'border-gray-200'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Category — mobile/tablet only (already inline on lg) */}
              <div className="lg:hidden">
                <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Category</label>
                <SearchableComboBox
                  options={categoryOptions}
                  value={categoryFilter}
                  onValueChange={(v) => setCategoryFilter(v || 'all')}
                  placeholder="All Categories"
                  searchPlaceholder="Search categories…"
                  dark={dark}
                />
              </div>
              {/* Status — mobile/tablet only */}
              <div className="lg:hidden">
                <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Status</label>
                <SearchableComboBox
                  options={statusOptions}
                  value={statusFilter}
                  onValueChange={(v) => setStatusFilter(v || 'all')}
                  placeholder="All Status"
                  searchPlaceholder="Search…"
                  dark={dark}
                />
              </div>
              {/* Fabric Type */}
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Fabric Type</label>
                <SearchableComboBox
                  options={fabricOptions}
                  value={fabricFilter}
                  onValueChange={(v) => setFabricFilter(v || 'all')}
                  placeholder="All Fabrics"
                  searchPlaceholder="Search fabrics…"
                  dark={dark}
                />
              </div>
              {/* Colors — multi-select */}
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>
                  Colors {colorFilter.length > 0 && <span className="text-[10px] opacity-60">({colorFilter.length})</span>}
                </label>
                <SearchableComboBox
                  multi
                  options={colorOptions}
                  value={colorFilter}
                  onValueChange={setColorFilter}
                  placeholder="Any Color"
                  searchPlaceholder="Search colors…"
                  dark={dark}
                />
              </div>
              {/* Price Range */}
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Price Range (LKR)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className={`w-full px-2.5 py-2 rounded-xl border text-sm ${
                      dark
                        ? 'bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  <span className={`text-xs ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className={`w-full px-2.5 py-2 rounded-xl border text-sm ${
                      dark
                        ? 'bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>
              {/* Date From */}
              <div className="relative" ref={startCalRef}>
                <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Date From</label>
                <button onClick={() => { setShowStartCal(!showStartCal); setShowEndCal(false); }} className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-sm text-left ${dark ? 'bg-neutral-800/50 border-neutral-700/50' : 'bg-white border-gray-200'} ${dateFrom ? dark ? 'text-white' : 'text-gray-900' : dark ? 'text-neutral-500' : 'text-gray-400'}`}>
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  {dateFrom ? new Date(dateFrom).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}
                  {dateFrom && <X className="w-3 h-3 ml-auto hover:text-red-400" onClick={(e) => { e.stopPropagation(); setDateFrom(''); }} />}
                </button>
                {showStartCal && <div className="absolute top-full left-0 mt-1 z-50"><InlineCalendar dark={dark} value={dateFrom} onChange={setDateFrom} onClose={() => setShowStartCal(false)} /></div>}
              </div>
              {/* Date To */}
              <div className="relative" ref={endCalRef}>
                <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Date To</label>
                <button onClick={() => { setShowEndCal(!showEndCal); setShowStartCal(false); }} className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-sm text-left ${dark ? 'bg-neutral-800/50 border-neutral-700/50' : 'bg-white border-gray-200'} ${dateTo ? dark ? 'text-white' : 'text-gray-900' : dark ? 'text-neutral-500' : 'text-gray-400'}`}>
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  {dateTo ? new Date(dateTo).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}
                  {dateTo && <X className="w-3 h-3 ml-auto hover:text-red-400" onClick={(e) => { e.stopPropagation(); setDateTo(''); }} />}
                </button>
                {showEndCal && <div className="absolute top-full left-0 mt-1 z-50"><InlineCalendar dark={dark} value={dateTo} onChange={setDateTo} onClose={() => setShowEndCal(false)} /></div>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Content ─── */}
      {filteredProducts.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-16 rounded-2xl border ${dark ? 'bg-neutral-900/30 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
          <Package className={`w-12 h-12 mb-3 ${dark ? 'text-neutral-700' : 'text-gray-300'}`} />
          <p className={`text-sm font-medium ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>No products found</p>
          <button onClick={openAddModal} className={`mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium ${
            dark ? 'bg-white text-black' : 'bg-brand-900 text-white'
          }`}>
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* ═══ GRID VIEW ═══ */
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {paginatedProducts.map(product => (
            <div key={product.id} className={`group rounded-xl sm:rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
              dark
                ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border-neutral-800/60 hover:border-neutral-700'
                : 'bg-white border-gray-200 shadow-sm hover:border-gray-300'
            }`}>
              {/* Image — blurred backdrop + full product */}
              <div className={`h-36 sm:h-40 lg:h-48 overflow-hidden relative ${dark ? 'bg-neutral-900' : 'bg-gray-100'}`}>
                {product.image && (
                  <>
                    <img src={product.image} alt="" className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30 pointer-events-none" aria-hidden="true" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative w-full h-full object-contain p-1.5 sm:p-2 z-[1] transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const blur = e.currentTarget.previousElementSibling as HTMLElement;
                        if (blur) blur.style.display = 'none';
                        const fb = e.currentTarget.closest('.group')?.querySelector('[data-img-fallback]') as HTMLElement;
                        if (fb) fb.style.display = 'flex';
                      }}
                    />
                  </>
                )}
                <div data-img-fallback style={{ display: product.image ? 'none' : 'flex' }} className="absolute inset-0 flex-col items-center justify-center gap-2 z-[1]">
                  {categoryIcon(product.category)}
                  <span className={`text-[10px] font-medium ${dark ? 'text-neutral-600' : 'text-gray-400'}`}>{product.category}</span>
                </div>
                <div className="absolute top-2 right-2 z-[2]">
                  {statusBadge(product.status)}
                </div>
              </div>

              {/* Card body */}
              <div className="p-2.5 sm:p-3 lg:p-4 space-y-1.5 sm:space-y-2.5">
                <div className="min-w-0">
                  <p className={`text-xs sm:text-sm font-semibold truncate ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                  <p className={`text-[10px] mt-0.5 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{product.sku}</p>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${dark ? 'bg-neutral-800 text-neutral-400' : 'bg-gray-100 text-gray-500'}`}>{product.category}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${dark ? 'bg-neutral-800 text-neutral-400' : 'bg-gray-100 text-gray-500'}`}>{product.fabricType}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm sm:text-base font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(product.sellingPrice)}</p>
                    <p className={`hidden sm:block text-[10px] ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Cost: {formatCurrency(product.costPrice)}</p>
                  </div>
                  <div className={`text-right text-[10px] ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>
                    Stock: <strong className={`text-xs ${
                      product.status === 'out-of-stock' ? 'text-red-400' : product.status === 'low-stock' ? 'text-amber-400' : dark ? 'text-white' : 'text-gray-900'
                    }`}>{product.stock}</strong>
                  </div>
                </div>

                {/* Color dots */}
                <div className="hidden sm:flex items-center gap-1 flex-wrap">
                  {product.colors.slice(0, 5).map(c => (
                    <span
                      key={c}
                      title={c}
                      className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: COLOR_HEX_MAP[c] || '#9ca3af' }}
                    />
                  ))}
                  {product.colors.length > 5 && (
                    <span className={`text-[9px] ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>+{product.colors.length - 5}</span>
                  )}
                </div>

                {/* Actions */}
                <div className={`flex gap-1 pt-2 border-t ${dark ? 'border-neutral-800' : 'border-gray-100'}`}>
                  <button onClick={() => { setSelectedProduct(product); setShowViewModal(true); }} className={`flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                    dark ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}>
                    <Eye className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> <span className="hidden xs:inline sm:inline">View</span>
                  </button>
                  <button onClick={() => openEditModal(product)} className={`flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                    dark ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                  }`}>
                    <Edit className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> <span className="hidden xs:inline sm:inline">Edit</span>
                  </button>
                  <button onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }} className={`flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                    dark ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'
                  }`}>
                    <Trash2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> <span className="hidden xs:inline sm:inline">Del</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ═══ LIST VIEW ═══ */
        <>
          {/* Desktop Table */}
          <div className={`hidden md:block rounded-2xl border overflow-hidden ${dark ? 'border-neutral-800/60' : 'border-gray-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={dark ? 'bg-neutral-800/50' : 'bg-gray-50'}>
                  <tr>
                    {['Product', 'SKU', 'Category', 'Fabric', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                      <th key={h} className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${dark ? 'divide-neutral-800/50' : 'divide-gray-100'}`}>
                  {paginatedProducts.map(product => (
                    <tr key={product.id} className={`transition-colors ${dark ? 'hover:bg-neutral-800/20' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 min-w-[2.5rem] rounded-lg overflow-hidden relative flex items-center justify-center border ${
                            dark ? 'border-neutral-700/50 bg-neutral-800' : 'border-gray-200 bg-gray-50'
                          }`}>
                            {product.image && (
                              <img
                                src={product.image}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  (e.currentTarget.nextElementSibling as HTMLElement)?.style.setProperty('display', 'flex');
                                }}
                              />
                            )}
                            <div style={{ display: product.image ? 'none' : 'flex' }} className="absolute inset-0 flex items-center justify-center">
                              <span className="scale-75">{categoryIcon(product.category)}</span>
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm font-medium truncate max-w-[180px] ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                            <div className="flex gap-1 mt-0.5">
                              {product.colors.slice(0, 4).map(c => (
                                <span
                                  key={c}
                                  title={c}
                                  className="w-3 h-3 rounded-full border border-black/10 dark:border-white/10"
                                  style={{ backgroundColor: COLOR_HEX_MAP[c] || '#9ca3af' }}
                                />
                              ))}
                              {product.colors.length > 4 && (
                                <span className={`text-[9px] ml-0.5 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>+{product.colors.length - 4}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-4 py-3 text-xs whitespace-nowrap ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{product.sku}</td>
                      <td className={`px-4 py-3 text-xs whitespace-nowrap ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{product.category}</td>
                      <td className={`px-4 py-3 text-xs whitespace-nowrap ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{product.fabricType}</td>
                      <td className={`px-4 py-3 text-sm font-semibold whitespace-nowrap ${dark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(product.sellingPrice)}</td>
                      <td className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                        product.status === 'out-of-stock' ? 'text-red-400' : product.status === 'low-stock' ? 'text-amber-400' : dark ? 'text-white' : 'text-gray-900'
                      }`}>{product.stock}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{statusBadge(product.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setSelectedProduct(product); setShowViewModal(true); }} className={`p-1.5 rounded-lg transition-colors ${
                            dark ? 'hover:bg-neutral-700 text-neutral-400' : 'hover:bg-gray-100 text-gray-400'
                          }`}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => openEditModal(product)} className={`p-1.5 rounded-lg transition-colors ${
                            dark ? 'hover:bg-neutral-700 text-neutral-400' : 'hover:bg-gray-100 text-gray-400'
                          }`}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }} className={`p-1.5 rounded-lg transition-colors ${
                            dark ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-400'
                          }`}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards for List Mode */}
          <div className="md:hidden space-y-2">
            {paginatedProducts.map(product => (
              <div key={product.id} className={`rounded-xl border p-3 ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden relative flex items-center justify-center border ${
                    dark ? 'border-neutral-700/50 bg-neutral-800' : 'border-gray-200 bg-gray-50'
                  }`}>
                    {product.image && (
                      <img
                        src={product.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          (e.currentTarget.nextElementSibling as HTMLElement)?.style.setProperty('display', 'flex');
                        }}
                      />
                    )}
                    <div style={{ display: product.image ? 'none' : 'flex' }} className="absolute inset-0 flex items-center justify-center">
                      <span className="scale-75">{categoryIcon(product.category)}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className={`text-sm font-bold leading-tight truncate ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                        <p className={`text-[10px] ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{product.sku} &middot; {product.fabricType}</p>
                      </div>
                      {statusBadge(product.status)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div>
                    <span className={dark ? 'text-neutral-500' : 'text-gray-400'}>Price</span>
                    <p className={`font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(product.sellingPrice)}</p>
                  </div>
                  <div>
                    <span className={dark ? 'text-neutral-500' : 'text-gray-400'}>Stock</span>
                    <p className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{product.stock}</p>
                  </div>
                  <div>
                    <span className={dark ? 'text-neutral-500' : 'text-gray-400'}>Category</span>
                    <p className={`truncate ${dark ? 'text-neutral-300' : 'text-gray-700'}`}>{product.category}</p>
                  </div>
                </div>
                <div className={`flex gap-1 pt-2 border-t ${dark ? 'border-neutral-800' : 'border-gray-100'}`}>
                  <button onClick={() => { setSelectedProduct(product); setShowViewModal(true); }} className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${
                    dark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                  }`}>View</button>
                  <button onClick={() => openEditModal(product)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${
                    dark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'
                  }`}>Edit</button>
                  <button onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }} className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${
                    dark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'
                  }`}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ─── Pagination ─── */}
      {filteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <p className={`text-xs ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className={`p-1.5 rounded-lg disabled:opacity-30 ${
              dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'
            }`}>
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className={`p-1.5 rounded-lg disabled:opacity-30 ${
              dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'
            }`}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className={`sm:hidden px-2 text-xs font-medium ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>
              {currentPage} / {totalPages}
            </span>
            <div className="hidden sm:flex items-center gap-1">
              {getPageNumbers().map((pg, i) =>
                typeof pg === 'number' ? (
                  <button key={i} onClick={() => setCurrentPage(pg)} className={`w-8 h-8 rounded-lg text-xs font-medium ${
                    currentPage === pg
                      ? dark ? 'bg-white text-black' : 'bg-brand-900 text-white'
                      : dark ? 'text-neutral-400 hover:bg-neutral-800' : 'text-gray-500 hover:bg-gray-100'
                  }`}>{pg}</button>
                ) : (
                  <span key={i} className={`px-1 ${dark ? 'text-neutral-600' : 'text-gray-300'}`}>&hellip;</span>
                )
              )}
            </div>
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className={`p-1.5 rounded-lg disabled:opacity-30 ${
              dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'
            }`}>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className={`p-1.5 rounded-lg disabled:opacity-30 ${
              dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'
            }`}>
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Show:</span>
            <div className={`flex items-center rounded-lg border overflow-hidden ${dark ? 'border-neutral-700' : 'border-gray-200'}`}>
              {perPageOptions.map(opt => (
                <button key={opt} onClick={() => setItemsPerPage(opt)} className={`px-2.5 py-1 text-xs font-medium transition-all ${
                  itemsPerPage === opt
                    ? dark ? 'bg-white text-black shadow-md' : 'bg-brand-900 text-white shadow-md'
                    : dark ? 'text-neutral-400 hover:bg-neutral-800' : 'text-gray-500 hover:bg-gray-50'
                }`}>{opt}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Modals ─── */}
      {renderProductForm(false)}
      {renderProductForm(true)}
      {renderViewModal()}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        itemName={selectedProduct?.name}
      />
    </div>
  );
};
