import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import {
  ShoppingBag, Trash2, Minus, Plus, ArrowLeft, ArrowRight,
  Shield, Truck, Tag,
} from 'lucide-react';

const formatPrice = (n: number) => `Rs. ${n.toLocaleString('en-LK')}`;

export const CartPage: React.FC = () => {
  const { theme } = useTheme();
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const dark = theme === 'dark';

  const deliveryFee = totalPrice >= 5000 ? 0 : 350;
  const grandTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className={`inline-flex p-6 rounded-full mb-6 ${dark ? 'bg-neutral-900' : 'bg-gray-100'}`}>
          <ShoppingBag className={`w-16 h-16 ${dark ? 'text-neutral-700' : 'text-gray-300'}`} />
        </div>
        <h2 className={`text-2xl font-display font-bold mb-3 ${dark ? 'text-white' : 'text-brand-900'}`}>Your cart is empty</h2>
        <p className={`text-sm mb-8 max-w-md mx-auto ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>
          Discover our latest collections and add your favourite items to the cart.
        </p>
        <NavLink
          to="/store/shop"
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-lg ${
            dark ? 'bg-white text-black hover:bg-neutral-100' : 'bg-brand-900 text-white hover:bg-brand-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </NavLink>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs mb-6">
        <NavLink to="/store" className={`${dark ? 'text-neutral-500 hover:text-neutral-300' : 'text-gray-400 hover:text-gray-600'}`}>Home</NavLink>
        <span className={dark ? 'text-neutral-600' : 'text-gray-300'}>/</span>
        <span className={dark ? 'text-neutral-300' : 'text-gray-700'}>Shopping Cart</span>
      </div>

      <h1 className={`font-display text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-brand-900'}`}>Shopping Cart</h1>
      <p className={`text-sm mb-8 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}`}
              className={`flex gap-4 p-4 rounded-2xl border transition-all ${
                dark ? 'bg-brand-900/30 border-neutral-800/60' : 'bg-white border-gray-200'
              }`}
            >
              <NavLink to={`/store/product/${item.product.id}`} className="w-24 sm:w-32 aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80'}
                  alt={item.product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </NavLink>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <NavLink to={`/store/product/${item.product.id}`} className={`font-medium text-sm hover:underline ${dark ? 'text-neutral-200' : 'text-gray-800'}`}>
                    {item.product.name}
                  </NavLink>
                  <p className={`text-xs mt-1 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>
                    Size: {item.size} • Color: {item.color}
                  </p>
                  <p className={`font-bold text-sm mt-2 ${dark ? 'text-white' : 'text-brand-900'}`}>
                    {formatPrice(item.product.sellingPrice)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className={`inline-flex items-center rounded-xl border ${dark ? 'border-neutral-700' : 'border-gray-200'}`}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                      className={`p-2 transition-all ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className={`w-8 text-center text-xs font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                      className={`p-2 transition-all ${dark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-500'}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${dark ? 'text-white' : 'text-brand-900'}`}>
                      {formatPrice(item.product.sellingPrice * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                      className={`p-2 rounded-xl transition-all ${dark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-500 hover:bg-red-50'}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <NavLink to="/store/shop" className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
              dark ? 'text-neutral-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}>
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </NavLink>
            <button
              onClick={clearCart}
              className={`text-xs font-medium transition-colors ${dark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'}`}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className={`sticky top-24 p-6 rounded-2xl border ${
            dark ? 'bg-brand-900/30 border-neutral-800/60' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`font-semibold text-lg mb-5 ${dark ? 'text-white' : 'text-gray-900'}`}>Order Summary</h3>

            <div className="space-y-3 mb-5">
              <div className={`flex justify-between text-sm ${dark ? 'text-neutral-300' : 'text-gray-600'}`}>
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className={`flex justify-between text-sm ${dark ? 'text-neutral-300' : 'text-gray-600'}`}>
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-500 font-medium' : ''}>
                  {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className={`text-xs ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>
                  Add {formatPrice(5000 - totalPrice)} more for free delivery
                </p>
              )}
            </div>

            {/* Promo Code */}
            <div className={`flex gap-2 mb-5 pb-5 border-b ${dark ? 'border-neutral-800/60' : 'border-gray-200'}`}>
              <div className="relative flex-1">
                <Tag className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dark ? 'text-neutral-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Promo code"
                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm ${
                    dark
                      ? 'bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                  } focus:outline-none`}
                />
              </div>
              <button className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                dark ? 'border-neutral-600 text-neutral-300 hover:bg-neutral-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}>
                Apply
              </button>
            </div>

            <div className={`flex justify-between items-center mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">{formatPrice(grandTotal)}</span>
            </div>

            <button className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all shadow-lg ${
              dark
                ? 'bg-white text-black hover:bg-neutral-100 shadow-white/10'
                : 'bg-brand-900 text-white hover:bg-brand-800 shadow-brand-900/20'
            }`}>
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust */}
            <div className={`mt-5 pt-5 border-t space-y-3 ${dark ? 'border-neutral-800/60' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2.5">
                <Shield className={`w-4 h-4 ${dark ? 'text-neutral-500' : 'text-gray-400'}`} />
                <span className={`text-xs ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Secure SSL Checkout</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className={`w-4 h-4 ${dark ? 'text-neutral-500' : 'text-gray-400'}`} />
                <span className={`text-xs ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Island-wide delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
