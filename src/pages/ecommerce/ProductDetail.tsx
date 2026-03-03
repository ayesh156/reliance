import React, { useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { mockProducts, type Size } from '../../data/mockData';
import {
  ArrowLeft, ShoppingBag, Heart, Star, Truck, Shield, RotateCcw,
  Minus, Plus, Share2, Check,
} from 'lucide-react';
import { toast } from 'sonner';

const formatPrice = (n: number) => `Rs. ${n.toLocaleString('en-LK')}`;

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const dark = theme === 'dark';

  const product = mockProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className={`text-2xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Product Not Found</h2>
        <NavLink to="/store/shop" className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium ${
          dark ? 'bg-white text-black' : 'bg-brand-900 text-white'
        }`}>
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </NavLink>
      </div>
    );
  }

  const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isOutOfStock = product.status === 'out-of-stock';

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    if (!selectedColor) { toast.error('Please select a color'); return; }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/store/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs mb-6">
        <NavLink to="/store" className={`${dark ? 'text-neutral-500 hover:text-neutral-300' : 'text-gray-400 hover:text-gray-600'}`}>Home</NavLink>
        <span className={dark ? 'text-neutral-600' : 'text-gray-300'}>/</span>
        <NavLink to="/store/shop" className={`${dark ? 'text-neutral-500 hover:text-neutral-300' : 'text-gray-400 hover:text-gray-600'}`}>Shop</NavLink>
        <span className={dark ? 'text-neutral-600' : 'text-gray-300'}>/</span>
        <NavLink to={`/store/shop?category=${encodeURIComponent(product.category)}`} className={`${dark ? 'text-neutral-500 hover:text-neutral-300' : 'text-gray-400 hover:text-gray-600'}`}>
          {product.category}
        </NavLink>
        <span className={dark ? 'text-neutral-600' : 'text-gray-300'}>/</span>
        <span className={dark ? 'text-neutral-300' : 'text-gray-700'}>{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className={`relative aspect-[3/4] rounded-3xl overflow-hidden border ${
            dark ? 'border-neutral-800/60' : 'border-gray-200'
          }`}>
            <img
              src={product.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=90'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="px-6 py-2 bg-black/80 text-white text-sm font-semibold rounded-full">Out of Stock</span>
              </div>
            )}
            {product.status === 'low-stock' && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-amber-500/90 text-white text-xs font-semibold rounded-full">Only {product.stock} left!</span>
            )}
            <button className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all ${
              dark ? 'bg-black/30 text-white hover:bg-black/50' : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}>
              <Heart className="w-5 h-5" />
            </button>
          </div>
          {/* Thumbnail strip (simulated) */}
          <div className="flex gap-3">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                  i === 0
                    ? dark ? 'border-white' : 'border-brand-900'
                    : dark ? 'border-neutral-800 opacity-50 hover:opacity-100' : 'border-gray-200 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80'}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className={`text-xs uppercase tracking-wider mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>
              {product.brand} • {product.category}
            </p>
            <h1 className={`font-display text-2xl lg:text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-brand-900'}`}>
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : dark ? 'text-neutral-700' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className={`text-xs ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>4.5 (23 reviews)</span>
            </div>
          </div>

          <div className={`flex items-baseline gap-3 pb-6 border-b ${dark ? 'border-neutral-800/60' : 'border-gray-200'}`}>
            <span className={`text-3xl font-bold ${dark ? 'text-white' : 'text-brand-900'}`}>
              {formatPrice(product.sellingPrice)}
            </span>
            {product.costPrice < product.sellingPrice && (
              <span className={`text-sm line-through ${dark ? 'text-neutral-600' : 'text-gray-400'}`}>
                {formatPrice(Math.round(product.sellingPrice * 1.3))}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <p className={`text-sm leading-relaxed ${dark ? 'text-neutral-300' : 'text-gray-600'}`}>
              {product.description || `Premium ${product.fabricType.toLowerCase()} ${product.name.toLowerCase()} from our exclusive ${product.category} collection. Designed for comfort and style, perfect for any occasion.`}
            </p>
            <div className={`flex items-center gap-4 mt-3 text-xs ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>
              <span>SKU: {product.sku}</span>
              <span>•</span>
              <span>Fabric: {product.fabricType}</span>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className={`text-sm font-semibold ${dark ? 'text-neutral-300' : 'text-gray-700'}`}>Size</h4>
              <button className={`text-xs underline ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={isOutOfStock}
                  className={`min-w-[44px] h-11 px-4 rounded-xl border text-sm font-medium transition-all ${
                    selectedSize === size
                      ? dark ? 'bg-white text-black border-white' : 'bg-brand-900 text-white border-brand-900'
                      : isOutOfStock
                        ? dark ? 'border-neutral-800 text-neutral-600 cursor-not-allowed' : 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : dark ? 'border-neutral-700 text-neutral-300 hover:border-neutral-500' : 'border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${dark ? 'text-neutral-300' : 'text-gray-700'}`}>
              Color{selectedColor && <span className="font-normal ml-2">— {selectedColor}</span>}
            </h4>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  disabled={isOutOfStock}
                  className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? dark ? 'border-white scale-110' : 'border-brand-900 scale-110'
                      : dark ? 'border-neutral-700 hover:border-neutral-500' : 'border-gray-200 hover:border-gray-400'
                  }`}
                  title={color}
                >
                  <span
                    className="absolute inset-1 rounded-full"
                    style={{ backgroundColor: color.toLowerCase().replace(/ /g, '') === 'white' ? '#f5f5f5' : color.toLowerCase().split('/')[0].split('&')[0].trim().replace(/ /g, '') }}
                  />
                  {selectedColor === color && (
                    <Check className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow-md" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${dark ? 'text-neutral-300' : 'text-gray-700'}`}>Quantity</h4>
            <div className={`inline-flex items-center rounded-xl border ${dark ? 'border-neutral-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={isOutOfStock}
                className={`p-3 transition-all ${dark ? 'hover:bg-neutral-800 text-neutral-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className={`w-12 text-center text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                disabled={isOutOfStock}
                className={`p-3 transition-all ${dark ? 'hover:bg-neutral-800 text-neutral-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {!isOutOfStock && product.stock <= 10 && (
              <span className={`ml-3 text-xs ${dark ? 'text-amber-400' : 'text-amber-600'}`}>Only {product.stock} left in stock</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                isOutOfStock
                  ? 'bg-neutral-500 text-neutral-300 cursor-not-allowed'
                  : addedToCart
                    ? 'bg-green-500 text-white shadow-lg'
                    : dark
                      ? 'bg-white text-black hover:bg-neutral-100 shadow-lg shadow-white/10'
                      : 'bg-brand-900 text-white hover:bg-brand-800 shadow-lg shadow-brand-900/20'
              }`}
            >
              {isOutOfStock ? 'Out of Stock' : addedToCart ? <><Check className="w-4 h-4" /> Added!</> : <><ShoppingBag className="w-4 h-4" /> Add to Cart</>}
            </button>
            {!isOutOfStock && (
              <button
                onClick={handleBuyNow}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border transition-all ${
                  dark ? 'border-neutral-600 text-neutral-200 hover:bg-neutral-800' : 'border-brand-900 text-brand-900 hover:bg-brand-900/5'
                }`}
              >
                Buy Now
              </button>
            )}
            <button className={`p-3.5 rounded-full border transition-all ${
              dark ? 'border-neutral-700 text-neutral-400 hover:bg-neutral-800' : 'border-gray-200 text-gray-500 hover:bg-gray-100'
            }`}>
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Trust */}
          <div className={`grid grid-cols-3 gap-4 pt-4 border-t ${dark ? 'border-neutral-800/60' : 'border-gray-200'}`}>
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'Over Rs. 5,000' },
              { icon: RotateCcw, label: 'Easy Returns', sub: '7 days' },
              { icon: Shield, label: 'Secure Pay', sub: 'SSL Protected' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <item.icon className={`w-5 h-5 mx-auto mb-1.5 ${dark ? 'text-neutral-400' : 'text-gray-500'}`} />
                <p className={`text-xs font-medium ${dark ? 'text-neutral-300' : 'text-gray-700'}`}>{item.label}</p>
                <p className={`text-[10px] ${dark ? 'text-neutral-600' : 'text-gray-400'}`}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 lg:mt-24">
          <h2 className={`font-display text-2xl font-bold mb-8 ${dark ? 'text-white' : 'text-brand-900'}`}>You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map(p => (
              <NavLink
                key={p.id}
                to={`/store/product/${p.id}`}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                  dark
                    ? 'bg-brand-900/40 border-neutral-800/60 hover:border-neutral-600'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={p.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500'} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className={`text-[10px] uppercase tracking-wider mb-1 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{p.category}</p>
                  <h3 className={`font-medium text-sm leading-snug mb-2 line-clamp-1 ${dark ? 'text-neutral-200' : 'text-gray-800'}`}>{p.name}</h3>
                  <p className={`font-bold text-sm ${dark ? 'text-white' : 'text-brand-900'}`}>{formatPrice(p.sellingPrice)}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
