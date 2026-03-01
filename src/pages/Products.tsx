import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../lib/utils';
import { mockProducts as initialProducts, FABRIC_TYPES, CLOTHING_SIZES, WAIST_SIZES, COMMON_COLORS, type Product, type Size, type FabricType } from '../data/mockData';
import { toast } from 'sonner';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';
import {
  Search, Plus, Package, Edit, Trash2, Eye, Filter,
  Grid3X3, List, X, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, Save, Ruler, Palette, Shirt,
} from 'lucide-react';



export const Products: React.FC = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fabricFilter, setFabricFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [showFilters, setShowFilters] = useState(false);

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

  const gridPerPageOptions = [8, 12, 16, 24];
  const tablePerPageOptions = [5, 10, 20, 50];
  const perPageOptions = viewMode === 'list' ? tablePerPageOptions : gridPerPageOptions;

  useEffect(() => { setItemsPerPage(viewMode === 'list' ? 10 : 8); }, [viewMode]);

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  const activeFilterCount = [categoryFilter !== 'all' ? 1 : 0, statusFilter !== 'all' ? 1 : 0, fabricFilter !== 'all' ? 1 : 0].reduce((s, v) => s + v, 0);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchFabric = fabricFilter === 'all' || p.fabricType === fabricFilter;
      return matchSearch && matchCategory && matchStatus && matchFabric;
    });
  }, [products, searchQuery, categoryFilter, statusFilter, fabricFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, categoryFilter, statusFilter, fabricFilter, viewMode, itemsPerPage]);

  const resetForm = () => {
    setFormName(''); setFormSku(''); setFormCategory(''); setFormBrand(''); setFormDescription('');
    setFormFabricType('Cotton'); setFormSizes([]); setFormColors([]);
    setFormCostPrice(''); setFormSellingPrice(''); setFormStock(''); setFormLowStockThreshold('10');
  };

  const openAddModal = () => { resetForm(); setShowAddModal(true); };

  const openEditModal = (p: Product) => {
    setSelectedProduct(p);
    setFormName(p.name); setFormSku(p.sku); setFormCategory(p.category); setFormBrand(p.brand);
    setFormDescription(p.description || ''); setFormFabricType(p.fabricType); setFormSizes([...p.sizes]);
    setFormColors([...p.colors]); setFormCostPrice(p.costPrice.toString()); setFormSellingPrice(p.sellingPrice.toString());
    setFormStock(p.stock.toString()); setFormLowStockThreshold(p.lowStockThreshold.toString());
    setShowEditModal(true);
  };

  const toggleSize = (size: Size) => {
    setFormSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (color: string) => {
    setFormColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
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
        stock, lowStockThreshold: threshold, status,
      } : p));
      setShowEditModal(false);
      toast.success('Product updated', { description: formName });
    } else {
      const newProduct: Product = {
        id: `p-${Date.now()}`, sku: formSku, name: formName,
        category: formCategory || 'Uncategorized', brand: formBrand || 'Unbranded',
        description: formDescription || undefined, fabricType: formFabricType, sizes: formSizes, colors: formColors,
        costPrice: parseFloat(formCostPrice) || 0, sellingPrice: parseFloat(formSellingPrice) || 0,
        stock, lowStockThreshold: threshold, status, createdAt: new Date().toISOString(),
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

  const statusBadge = (status: Product['status']) => {
    const styles = { 'in-stock': 'bg-green-500/10 text-green-500 border-green-500/20', 'low-stock': 'bg-amber-500/10 text-amber-500 border-amber-500/20', 'out-of-stock': 'bg-red-500/10 text-red-400 border-red-500/20' };
    const labels = { 'in-stock': 'In Stock', 'low-stock': 'Low Stock', 'out-of-stock': 'Out of Stock' };
    return <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${styles[status]}`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{labels[status]}</span>;
  };

  const hasActiveFilters = searchQuery || categoryFilter !== 'all' || statusFilter !== 'all' || fabricFilter !== 'all';
  const clearFilters = () => { setSearchQuery(''); setCategoryFilter('all'); setStatusFilter('all'); setFabricFilter('all'); };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else if (currentPage <= 3) { for (let i = 1; i <= 4; i++) pages.push(i); pages.push('...'); pages.push(totalPages); }
    else if (currentPage >= totalPages - 2) { pages.push(1); pages.push('...'); for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i); }
    else { pages.push(1); pages.push('...'); for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i); pages.push('...'); pages.push(totalPages); }
    return pages;
  };

  const inputClass = `w-full px-3 py-2 rounded-xl border text-sm transition-all ${dark ? 'bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-white/30' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400'}`;
  const labelClass = `block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`;

  // ===== Product Form Modal (shared for Add/Edit) =====
  const renderProductForm = (isEdit: boolean) => {
    const isOpen = isEdit ? showEditModal : showAddModal;
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} />
        <div className={`relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden ${dark ? 'bg-neutral-950 border border-neutral-800' : 'bg-gray-50 border border-gray-200'}`}>
          <div className={`flex items-center justify-between px-4 sm:px-5 py-4 border-b ${dark ? 'border-neutral-800' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
            <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className={`p-2 rounded-xl ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-200 text-gray-500'}`}><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
            {/* Basic Info */}
            <div className={`p-4 rounded-xl border ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}><Package className="w-4 h-4" /> Basic Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2"><label className={labelClass}>Product Name *</label><input value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g., Classic Denim Jeans" className={inputClass} /></div>
                <div><label className={labelClass}>SKU *</label><input value={formSku} onChange={e => setFormSku(e.target.value)} placeholder="e.g., REL-DJ-001" className={inputClass} /></div>
                <div><label className={labelClass}>Fabric Type</label>
                  <select value={formFabricType} onChange={e => setFormFabricType(e.target.value as FabricType)} className={`${inputClass} appearance-none`}>
                    {FABRIC_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Category</label><input value={formCategory} onChange={e => setFormCategory(e.target.value)} placeholder="e.g., T-Shirts" className={inputClass} list="cat-list" /><datalist id="cat-list">{categories.map(c => <option key={c} value={c} />)}</datalist></div>
                <div><label className={labelClass}>Brand</label><input value={formBrand} onChange={e => setFormBrand(e.target.value)} placeholder="e.g., Levi's" className={inputClass} list="brand-list" /><datalist id="brand-list">{brands.map(b => <option key={b} value={b} />)}</datalist></div>
                <div className="sm:col-span-2"><label className={labelClass}>Description</label><textarea value={formDescription} onChange={e => setFormDescription(e.target.value)} placeholder="Product description..." rows={2} className={inputClass} /></div>
              </div>
            </div>

            {/* Sizes */}
            <div className={`p-4 rounded-xl border ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}><Ruler className="w-4 h-4" /> Sizes * <span className={`text-xs font-normal ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{formSizes.length} selected</span></h3>
              <div className="space-y-2">
                <p className={`text-[10px] uppercase tracking-wider font-medium ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Clothing</p>
                <div className="flex flex-wrap gap-1.5">
                  {CLOTHING_SIZES.map(size => (
                    <button key={size} onClick={() => toggleSize(size)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${formSizes.includes(size) ? dark ? 'bg-white text-black border-white' : 'bg-brand-900 text-white border-brand-900' : dark ? 'border-neutral-700 text-neutral-400 hover:border-neutral-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>{size}</button>
                  ))}
                </div>
                <p className={`text-[10px] uppercase tracking-wider font-medium mt-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Waist</p>
                <div className="flex flex-wrap gap-1.5">
                  {WAIST_SIZES.map(size => (
                    <button key={size} onClick={() => toggleSize(size)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${formSizes.includes(size) ? dark ? 'bg-white text-black border-white' : 'bg-brand-900 text-white border-brand-900' : dark ? 'border-neutral-700 text-neutral-400 hover:border-neutral-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>{size}</button>
                  ))}
                  <button onClick={() => toggleSize('FREE')} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${formSizes.includes('FREE') ? dark ? 'bg-white text-black border-white' : 'bg-brand-900 text-white border-brand-900' : dark ? 'border-neutral-700 text-neutral-400 hover:border-neutral-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>FREE</button>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className={`p-4 rounded-xl border ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}><Palette className="w-4 h-4" /> Colors * <span className={`text-xs font-normal ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{formColors.length} selected</span></h3>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_COLORS.map(color => (
                  <button key={color} onClick={() => toggleColor(color)} className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${formColors.includes(color) ? dark ? 'bg-white text-black border-white' : 'bg-brand-900 text-white border-brand-900' : dark ? 'border-neutral-700 text-neutral-400 hover:border-neutral-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>{color}</button>
                ))}
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className={`p-4 rounded-xl border ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}><Shirt className="w-4 h-4" /> Pricing & Stock</h3>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelClass}>Cost Price (LKR) *</label><input type="number" value={formCostPrice} onChange={e => setFormCostPrice(e.target.value)} placeholder="0.00" className={inputClass} /></div>
                <div><label className={labelClass}>Selling Price (LKR) *</label><input type="number" value={formSellingPrice} onChange={e => setFormSellingPrice(e.target.value)} placeholder="0.00" className={inputClass} /></div>
                <div><label className={labelClass}>Stock Quantity</label><input type="number" value={formStock} onChange={e => setFormStock(e.target.value)} placeholder="0" className={inputClass} /></div>
                <div><label className={labelClass}>Low Stock Alert</label><input type="number" value={formLowStockThreshold} onChange={e => setFormLowStockThreshold(e.target.value)} placeholder="10" className={inputClass} /></div>
              </div>
              {formCostPrice && formSellingPrice && (
                <div className={`mt-3 p-2 rounded-lg text-xs ${dark ? 'bg-neutral-800/50 text-neutral-300' : 'bg-gray-50 text-gray-600'}`}>
                  Margin: <strong className={parseFloat(formSellingPrice) > parseFloat(formCostPrice) ? 'text-green-500' : 'text-red-400'}>{formatCurrency(parseFloat(formSellingPrice) - parseFloat(formCostPrice))}</strong> ({((parseFloat(formSellingPrice) - parseFloat(formCostPrice)) / (parseFloat(formCostPrice) || 1) * 100).toFixed(1)}%)
                </div>
              )}
            </div>
          </div>
          <div className={`flex items-center justify-between px-4 sm:px-5 py-4 border-t ${dark ? 'border-neutral-800' : 'border-gray-200'}`}>
            <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className={`px-4 py-2.5 rounded-xl text-sm font-medium ${dark ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Cancel</button>
            <button onClick={() => handleSaveProduct(isEdit)} className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium ${dark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-brand-900 text-white hover:bg-brand-800'}`}><Save className="w-4 h-4" />{isEdit ? 'Update' : 'Add Product'}</button>
          </div>
        </div>
      </div>
    );
  };

  // ===== View Product Modal =====
  const renderViewModal = () => {
    if (!showViewModal || !selectedProduct) return null;
    const p = selectedProduct;
    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowViewModal(false)} />
        <div className={`relative w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-2xl overflow-hidden ${dark ? 'bg-neutral-950 border border-neutral-800' : 'bg-gray-50 border border-gray-200'}`}>
          <div className={`flex items-center justify-between px-4 sm:px-5 py-4 border-b ${dark ? 'border-neutral-800' : 'border-gray-200'}`}>
            <h2 className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Product Details</h2>
            <button onClick={() => setShowViewModal(false)} className={`p-2 rounded-xl ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-200 text-gray-500'}`}><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
            <div className={`h-40 flex items-center justify-center rounded-xl ${dark ? 'bg-neutral-800/50' : 'bg-gray-100'}`}><Package className={`w-16 h-16 ${dark ? 'text-neutral-700' : 'text-gray-300'}`} /></div>
            <div className="flex items-start justify-between">
              <div><h3 className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{p.name}</h3><p className={`text-xs mt-0.5 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{p.sku}</p></div>
              {statusBadge(p.status)}
            </div>
            {p.description && <p className={`text-sm ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{p.description}</p>}
            <div className="grid grid-cols-2 gap-3">
              {[['Category', p.category], ['Brand', p.brand], ['Fabric', p.fabricType], ['Stock', `${p.stock} units`], ['Cost', formatCurrency(p.costPrice)], ['Selling', formatCurrency(p.sellingPrice)]].map(([label, val]) => (
                <div key={label as string} className={`p-2.5 rounded-lg ${dark ? 'bg-neutral-900/50 border border-neutral-800/60' : 'bg-gray-50 border border-gray-200'}`}>
                  <p className={`text-[10px] uppercase tracking-wider ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{label}</p>
                  <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{val}</p>
                </div>
              ))}
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Sizes</p>
              <div className="flex flex-wrap gap-1.5">
                {p.sizes.map(s => <span key={s} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${dark ? 'bg-neutral-800 text-neutral-300' : 'bg-gray-100 text-gray-600'}`}>{s}</span>)}
              </div>
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Colors</p>
              <div className="flex flex-wrap gap-1.5">
                {p.colors.map(c => <span key={c} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${dark ? 'bg-neutral-800 text-neutral-300' : 'bg-gray-100 text-gray-600'}`}>{c}</span>)}
              </div>
            </div>
            <div className={`p-3 rounded-xl text-xs ${dark ? 'bg-neutral-800/30 text-neutral-500' : 'bg-gray-50 text-gray-400'}`}>
              Profit margin: <strong className={p.sellingPrice > p.costPrice ? 'text-green-500' : 'text-red-400'}>{formatCurrency(p.sellingPrice - p.costPrice)}</strong> ({((p.sellingPrice - p.costPrice) / (p.costPrice || 1) * 100).toFixed(1)}%)
            </div>
          </div>
          <div className={`flex gap-2 px-4 sm:px-5 py-4 border-t ${dark ? 'border-neutral-800' : 'border-gray-200'}`}>
            <button onClick={() => { setShowViewModal(false); openEditModal(p); }} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium ${dark ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><Edit className="w-4 h-4" /> Edit</button>
            <button onClick={() => { setShowViewModal(false); setShowDeleteModal(true); }} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20"><Trash2 className="w-4 h-4" /> Delete</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Products</h1>
          <p className={`mt-0.5 text-sm ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Manage your clothing inventory — {filteredProducts.length} items</p>
        </div>
        <button onClick={openAddModal} className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm shadow-lg transition-all ${dark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-brand-900 text-white hover:bg-brand-800'}`}><Plus className="w-5 h-5" /> Add Product</button>
      </div>

      {/* Search + Controls */}
      <div className={`p-3 sm:p-4 rounded-2xl border ${dark ? 'bg-neutral-900/30 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 ${dark ? 'bg-neutral-800/50 border-neutral-700/50' : 'bg-gray-50 border-gray-200'}`}>
            <Search className={`w-4 h-4 flex-shrink-0 ${dark ? 'text-neutral-500' : 'text-gray-400'}`} />
            <input type="text" placeholder="Search products, SKU, brand..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className={`bg-transparent border-none outline-none flex-1 min-w-0 text-sm ${dark ? 'text-white placeholder-neutral-500' : 'text-gray-900 placeholder-gray-400'}`} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${showFilters || activeFilterCount > 0 ? dark ? 'bg-white text-black border-white' : 'bg-brand-900 text-white border-brand-900' : dark ? 'border-neutral-700 text-neutral-400 hover:border-neutral-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              <Filter className="w-3.5 h-3.5" /> Filters
              {activeFilterCount > 0 && <span className={`ml-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${dark ? 'bg-black/20' : 'bg-white/30'}`}>{activeFilterCount}</span>}
            </button>
            <div className={`flex rounded-xl border overflow-hidden ${dark ? 'border-neutral-700' : 'border-gray-200'}`}>
              <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${viewMode === 'grid' ? dark ? 'bg-white text-black' : 'bg-brand-900 text-white' : dark ? 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${viewMode === 'list' ? dark ? 'bg-white text-black' : 'bg-brand-900 text-white' : dark ? 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><List className="w-4 h-4" /></button>
            </div>
            {hasActiveFilters && <button onClick={clearFilters} className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs ${dark ? 'text-neutral-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}><X className="w-3 h-3" /> Clear</button>}
          </div>
        </div>
        {showFilters && (
          <div className={`mt-3 pt-3 border-t grid grid-cols-1 sm:grid-cols-3 gap-3 ${dark ? 'border-neutral-800/60' : 'border-gray-200'}`}>
            <div><label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Category</label>
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className={`w-full px-3 py-2 rounded-xl border text-sm appearance-none ${dark ? 'bg-neutral-800/50 border-neutral-700/50 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                <option value="all">All Categories</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Status</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={`w-full px-3 py-2 rounded-xl border text-sm appearance-none ${dark ? 'bg-neutral-800/50 border-neutral-700/50 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                <option value="all">All Status</option><option value="in-stock">In Stock</option><option value="low-stock">Low Stock</option><option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
            <div><label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Fabric Type</label>
              <select value={fabricFilter} onChange={e => setFabricFilter(e.target.value)} className={`w-full px-3 py-2 rounded-xl border text-sm appearance-none ${dark ? 'bg-neutral-800/50 border-neutral-700/50 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                <option value="all">All Fabrics</option>{FABRIC_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {filteredProducts.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-16 rounded-2xl border ${dark ? 'bg-neutral-900/30 border-neutral-800/60' : 'bg-white border-gray-200'}`}>
          <Package className={`w-12 h-12 mb-3 ${dark ? 'text-neutral-700' : 'text-gray-300'}`} />
          <p className={`text-sm font-medium ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>No products found</p>
          <button onClick={openAddModal} className={`mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium ${dark ? 'bg-white text-black' : 'bg-brand-900 text-white'}`}><Plus className="w-4 h-4" /> Add Product</button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {paginatedProducts.map(product => (
            <div key={product.id} className={`group rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${dark ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border-neutral-800/60 hover:border-neutral-700' : 'bg-white border-gray-200 shadow-sm hover:border-gray-300'}`}>
              <div className={`h-36 sm:h-40 flex items-center justify-center ${dark ? 'bg-neutral-800/50' : 'bg-gray-50'}`}><Package className={`w-10 h-10 ${dark ? 'text-neutral-700' : 'text-gray-300'}`} /></div>
              <div className="p-3 sm:p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1"><p className={`text-sm font-semibold truncate ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</p><p className={`text-[10px] mt-0.5 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{product.sku}</p></div>
                  {statusBadge(product.status)}
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${dark ? 'bg-neutral-800 text-neutral-400' : 'bg-gray-100 text-gray-500'}`}>{product.category}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${dark ? 'bg-neutral-800 text-neutral-400' : 'bg-gray-100 text-gray-500'}`}>{product.fabricType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div><p className={`text-base font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(product.sellingPrice)}</p><p className={`text-[10px] ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Cost: {formatCurrency(product.costPrice)}</p></div>
                  <div className={`text-right text-[10px] ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Stock: <strong className={`text-xs ${product.status === 'out-of-stock' ? 'text-red-400' : product.status === 'low-stock' ? 'text-amber-400' : dark ? 'text-white' : 'text-gray-900'}`}>{product.stock}</strong></div>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  {product.colors.slice(0, 4).map(c => <span key={c} className={`text-[9px] px-1.5 py-0.5 rounded ${dark ? 'bg-neutral-800 text-neutral-400' : 'bg-gray-100 text-gray-500'}`}>{c}</span>)}
                  {product.colors.length > 4 && <span className={`text-[9px] ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>+{product.colors.length - 4}</span>}
                </div>
                <div className={`flex gap-1 pt-2 border-t ${dark ? 'border-neutral-800' : 'border-gray-100'}`}>
                  <button onClick={() => { setSelectedProduct(product); setShowViewModal(true); }} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all ${dark ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}><Eye className="w-3.5 h-3.5" /> View</button>
                  <button onClick={() => openEditModal(product)} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all ${dark ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all ${dark ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className={`hidden sm:block rounded-2xl border overflow-hidden ${dark ? 'border-neutral-800/60' : 'border-gray-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={dark ? 'bg-neutral-800/50' : 'bg-gray-50'}>
                  <tr>
                    {['Product', 'SKU', 'Category', 'Fabric', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                      <th key={h} className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${dark ? 'divide-neutral-800/50' : 'divide-gray-100'}`}>
                  {paginatedProducts.map(product => (
                    <tr key={product.id} className={`transition-colors ${dark ? 'hover:bg-neutral-800/20' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3"><p className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</p><div className="flex gap-1 mt-0.5">{product.colors.slice(0, 3).map(c => <span key={c} className={`text-[9px] px-1 py-0.5 rounded ${dark ? 'bg-neutral-800 text-neutral-500' : 'bg-gray-100 text-gray-400'}`}>{c}</span>)}</div></td>
                      <td className={`px-4 py-3 text-xs ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{product.sku}</td>
                      <td className={`px-4 py-3 text-xs ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{product.category}</td>
                      <td className={`px-4 py-3 text-xs ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{product.fabricType}</td>
                      <td className={`px-4 py-3 text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(product.sellingPrice)}</td>
                      <td className={`px-4 py-3 text-sm font-medium ${product.status === 'out-of-stock' ? 'text-red-400' : product.status === 'low-stock' ? 'text-amber-400' : dark ? 'text-white' : 'text-gray-900'}`}>{product.stock}</td>
                      <td className="px-4 py-3">{statusBadge(product.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setSelectedProduct(product); setShowViewModal(true); }} className={`p-1.5 rounded-lg transition-colors ${dark ? 'hover:bg-neutral-700 text-neutral-400' : 'hover:bg-gray-100 text-gray-400'}`}><Eye className="w-4 h-4" /></button>
                          <button onClick={() => openEditModal(product)} className={`p-1.5 rounded-lg transition-colors ${dark ? 'hover:bg-neutral-700 text-neutral-400' : 'hover:bg-gray-100 text-gray-400'}`}><Edit className="w-4 h-4" /></button>
                          <button onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }} className={`p-1.5 rounded-lg transition-colors ${dark ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-400'}`}><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Mobile Cards for List Mode */}
          <div className="sm:hidden space-y-2">
            {paginatedProducts.map(product => (
              <div key={product.id} className={`rounded-xl border p-3 ${dark ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div><p className={`text-sm font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</p><p className={`text-[10px] ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{product.sku} &middot; {product.fabricType}</p></div>
                  {statusBadge(product.status)}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div><span className={dark ? 'text-neutral-500' : 'text-gray-400'}>Price</span><p className={`font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(product.sellingPrice)}</p></div>
                  <div><span className={dark ? 'text-neutral-500' : 'text-gray-400'}>Stock</span><p className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{product.stock}</p></div>
                  <div><span className={dark ? 'text-neutral-500' : 'text-gray-400'}>Category</span><p className={dark ? 'text-neutral-300' : 'text-gray-700'}>{product.category}</p></div>
                </div>
                <div className={`flex gap-1 pt-2 border-t ${dark ? 'border-neutral-800' : 'border-gray-100'}`}>
                  <button onClick={() => { setSelectedProduct(product); setShowViewModal(true); }} className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${dark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>View</button>
                  <button onClick={() => openEditModal(product)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${dark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>Edit</button>
                  <button onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }} className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${dark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'}`}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <p className={`text-xs ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className={`p-1.5 rounded-lg disabled:opacity-30 ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'}`}><ChevronsLeft className="w-4 h-4" /></button>
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className={`p-1.5 rounded-lg disabled:opacity-30 ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'}`}><ChevronLeft className="w-4 h-4" /></button>
            <span className={`sm:hidden px-2 text-xs font-medium ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{currentPage} / {totalPages}</span>
            <div className="hidden sm:flex items-center gap-1">
              {getPageNumbers().map((pg, i) => typeof pg === 'number' ? <button key={i} onClick={() => setCurrentPage(pg)} className={`w-8 h-8 rounded-lg text-xs font-medium ${currentPage === pg ? dark ? 'bg-white text-black' : 'bg-brand-900 text-white' : dark ? 'text-neutral-400 hover:bg-neutral-800' : 'text-gray-500 hover:bg-gray-100'}`}>{pg}</button> : <span key={i} className={`px-1 ${dark ? 'text-neutral-600' : 'text-gray-300'}`}>&hellip;</span>)}
            </div>
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className={`p-1.5 rounded-lg disabled:opacity-30 ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'}`}><ChevronRight className="w-4 h-4" /></button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className={`p-1.5 rounded-lg disabled:opacity-30 ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'}`}><ChevronsRight className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Show:</span>
            <div className={`flex items-center rounded-lg border overflow-hidden ${dark ? 'border-neutral-700' : 'border-gray-200'}`}>
              {perPageOptions.map(opt => <button key={opt} onClick={() => setItemsPerPage(opt)} className={`px-2.5 py-1 text-xs font-medium transition-all ${itemsPerPage === opt ? dark ? 'bg-white text-black shadow-md' : 'bg-brand-900 text-white shadow-md' : dark ? 'text-neutral-400 hover:bg-neutral-800' : 'text-gray-500 hover:bg-gray-50'}`}>{opt}</button>)}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {renderProductForm(false)}
      {renderProductForm(true)}
      {renderViewModal()}
      <DeleteConfirmationModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteProduct} title="Delete Product" itemName={selectedProduct?.name} />
    </div>
  );
};
