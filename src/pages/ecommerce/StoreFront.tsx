import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { mockProducts, mockCategories } from '../../data/mockData';
import { ArrowRight, Star, Truck, Shield, RotateCcw, Sparkles, TrendingUp, Headphones, CreditCard, Gift, MapPin, Clock } from 'lucide-react';

const formatPrice = (n: number) => `Rs. ${n.toLocaleString('en-LK')}`;

const featuredProducts = mockProducts.filter(p => p.status === 'in-stock').slice(0, 8);
const newArrivals = [...mockProducts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
const activeCategories = mockCategories.filter(c => c.status === 'active').slice(0, 6);

const testimonials = [
  { name: 'Sachini M.', city: 'Colombo', text: 'Absolutely love the quality! The maxi dress I bought is my new favourite. Will shop again!', rating: 5, avatar: 'SM' },
  { name: 'Ashan B.', city: 'Kaduwela', text: 'The formal suit was perfectly tailored. World-class quality at great prices. Highly recommend.', rating: 5, avatar: 'AB' },
  { name: 'Tharushi H.', city: 'Colombo', text: 'Best clothing store in Sri Lanka! Amazing collection and the staff are so helpful.', rating: 4, avatar: 'TH' },
];

export const StoreFront: React.FC = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
            alt="Fashion"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${dark
            ? 'bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-950/40'
            : 'bg-gradient-to-r from-white/95 via-white/80 to-white/30'
          }`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-0">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 ${
              dark ? 'bg-white/10 text-white/80 backdrop-blur-sm' : 'bg-brand-900/10 text-brand-800'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              New Season Collection 2026
            </div>

            <h1 className={`font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 ${
              dark ? 'text-white' : 'text-brand-900'
            }`}>
              Elevate Your
              <span className="block mt-1">
                <span className={`${dark ? 'text-neutral-300' : 'text-neutral-500'}`}>Style</span>
              </span>
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed mb-8 max-w-lg ${
              dark ? 'text-neutral-300' : 'text-gray-600'
            }`}>
              Discover curated fashion collections crafted for the modern Sri Lankan lifestyle. 
              From casual essentials to statement pieces.
            </p>

            <div className="flex flex-wrap gap-4">
              <NavLink
                to="/store/shop"
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 shadow-xl ${
                  dark
                    ? 'bg-white text-black hover:bg-neutral-100 shadow-white/10'
                    : 'bg-brand-900 text-white hover:bg-brand-800 shadow-brand-900/30'
                }`}
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </NavLink>
              <NavLink
                to="/store/categories"
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all border ${
                  dark
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-brand-900/30 text-brand-900 hover:bg-brand-900/5'
                }`}
              >
                Browse Categories
              </NavLink>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-8 sm:mt-12">
              {[
                { label: 'Products', value: `${mockProducts.length}+` },
                { label: 'Categories', value: `${activeCategories.length}+` },
                { label: 'Happy Clients', value: '2K+' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className={`text-2xl font-bold ${dark ? 'text-white' : 'text-brand-900'}`}>{stat.value}</p>
                  <p className={`text-xs ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={`py-6 border-y ${dark ? 'bg-brand-900/30 border-neutral-800/60' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: Truck, title: 'Free Delivery', desc: 'On orders over Rs. 5,000' },
              { icon: Shield, title: 'Secure Payment', desc: 'Cash, Card & Bank Transfer' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy' },
              { icon: Star, title: 'Premium Quality', desc: 'Hand-picked collections' },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-3 py-2">
                <div className={`p-2.5 rounded-xl ${dark ? 'bg-neutral-800/50' : 'bg-white shadow-sm'}`}>
                  <item.icon className={`w-5 h-5 ${dark ? 'text-neutral-300' : 'text-brand-700'}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                  <p className={`text-xs ${dark ? 'text-neutral-500' : 'text-gray-500'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Browse by</p>
            <h2 className={`font-display text-3xl lg:text-4xl font-bold ${dark ? 'text-white' : 'text-brand-900'}`}>Categories</h2>
          </div>
          <NavLink to="/store/categories" className={`hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors ${
            dark ? 'text-neutral-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
          }`}>
            View All <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {activeCategories.map(cat => (
            <NavLink
              key={cat.id}
              to={`/store/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
            >
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80'}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">{cat.name}</p>
                <p className="text-white/60 text-xs mt-0.5">{cat.productCount} items</p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className={`py-16 lg:py-20 ${dark ? 'bg-brand-900/20' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>
                <TrendingUp className="w-3.5 h-3.5 inline mr-1.5" />Trending Now
              </p>
              <h2 className={`font-display text-3xl lg:text-4xl font-bold ${dark ? 'text-white' : 'text-brand-900'}`}>Featured Products</h2>
            </div>
            <NavLink to="/store/shop" className={`hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors ${
              dark ? 'text-neutral-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}>
              Shop All <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map(product => (
              <NavLink
                key={product.id}
                to={`/store/product/${product.id}`}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                  dark
                    ? 'bg-brand-900/40 border-neutral-800/60 hover:border-neutral-600'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.status === 'low-stock' && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500/90 text-white text-[10px] font-semibold rounded-full backdrop-blur-sm">
                      Few Left
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="p-4">
                  <p className={`text-[10px] uppercase tracking-wider mb-1 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{product.category}</p>
                  <h3 className={`font-medium text-sm leading-snug mb-2 line-clamp-2 ${dark ? 'text-neutral-200' : 'text-gray-800'}`}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className={`font-bold text-sm ${dark ? 'text-white' : 'text-brand-900'}`}>{formatPrice(product.sellingPrice)}</p>
                    <div className="flex items-center gap-1">
                      {product.colors.slice(0, 3).map(color => (
                        <span
                          key={color}
                          title={color}
                          className={`w-3 h-3 rounded-full border ${dark ? 'border-neutral-600' : 'border-gray-300'}`}
                          style={{ backgroundColor: color.toLowerCase().replace(/ /g, '') === 'white' ? '#f5f5f5' : color.toLowerCase().split('/')[0].split('&')[0].trim().replace(/ /g, '') }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className={`text-[10px] ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>

          <div className="flex justify-center mt-10 sm:hidden">
            <NavLink to="/store/shop" className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${
              dark ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}>
              View All Products <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
            alt="Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28 text-center">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] mb-3">Limited Time</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Season End Sale
          </h2>
          <p className="text-white/70 text-base lg:text-lg mb-8 max-w-lg mx-auto">
            Up to 40% off on selected items. Don't miss out on our exclusive end-of-season deals.
          </p>
          <NavLink
            to="/store/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-neutral-100 transition-all shadow-xl"
          >
            Shop the Sale
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Just In</p>
            <h2 className={`font-display text-3xl lg:text-4xl font-bold ${dark ? 'text-white' : 'text-brand-900'}`}>New Arrivals</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, idx) => (
            <NavLink
              key={product.id}
              to={`/store/product/${product.id}`}
              className={`group flex gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                idx === 0 ? 'sm:col-span-2 sm:flex-row' : 'flex-row'
              } ${
                dark
                  ? 'bg-brand-900/30 border-neutral-800/60 hover:border-neutral-600'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className={`${idx === 0 ? 'w-28 sm:w-40 lg:w-52' : 'w-24'} aspect-square rounded-xl overflow-hidden flex-shrink-0`}>
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <p className={`text-[10px] uppercase tracking-wider mb-1 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{product.category}</p>
                <h3 className={`font-medium text-sm leading-snug mb-1 truncate ${dark ? 'text-neutral-200' : 'text-gray-800'}`}>{product.name}</h3>
                <p className={`font-bold text-sm ${dark ? 'text-white' : 'text-brand-900'}`}>{formatPrice(product.sellingPrice)}</p>
                <p className={`text-[10px] mt-1.5 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>
                  {product.sizes.join(', ')}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-16 lg:py-20 ${dark ? 'bg-brand-900/20' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>What People Say</p>
            <h2 className={`font-display text-3xl lg:text-4xl font-bold ${dark ? 'text-white' : 'text-brand-900'}`}>Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border ${
                dark
                  ? 'bg-brand-900/40 border-neutral-800/60'
                  : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-amber-400 fill-amber-400' : dark ? 'text-neutral-700' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed mb-5 ${dark ? 'text-neutral-300' : 'text-gray-600'}`}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                    dark ? 'bg-neutral-800 text-neutral-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{t.name}</p>
                    <p className={`text-xs ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Reliance */}
      <section className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="text-center mb-12">
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Why Shop With Us</p>
          <h2 className={`font-display text-3xl lg:text-4xl font-bold ${dark ? 'text-white' : 'text-brand-900'}`}>The Reliance Difference</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Gift, title: 'Curated Collections', desc: 'Hand-picked fashion from global and local brands, carefully selected for quality and style.' },
            { icon: CreditCard, title: 'Flexible Payments', desc: 'Pay by cash, card, or bank transfer. We make it easy for you to shop your way.' },
            { icon: Headphones, title: 'Personal Styling', desc: 'Our friendly staff help you find the perfect outfit for any occasion — from casual to couture.' },
            { icon: MapPin, title: 'Visit Our Store', desc: 'Located in Makandura, Matara. Walk in and experience our complete collection firsthand.' },
            { icon: Clock, title: 'Extended Hours', desc: 'Open Mon-Sat 9AM-8PM and Sundays 10AM-6PM. Shop at your convenience.' },
            { icon: Star, title: 'Loyalty Rewards', desc: 'Earn points on every purchase. Regular customers enjoy exclusive discounts and early access.' },
          ].map(item => (
            <div key={item.title} className={`group p-6 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1 ${
              dark
                ? 'bg-brand-900/30 border-neutral-800/60 hover:border-neutral-600'
                : 'bg-white border-gray-200 hover:shadow-lg hover:border-gray-300'
            }`}>
              <div className={`inline-flex p-3.5 rounded-2xl mb-4 transition-colors ${
                dark ? 'bg-neutral-800 group-hover:bg-neutral-700' : 'bg-gray-50 group-hover:bg-gray-100 shadow-sm'
              }`}>
                <item.icon className={`w-6 h-6 ${dark ? 'text-neutral-300' : 'text-brand-700'}`} />
              </div>
              <h3 className={`font-semibold text-base mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
              <p className={`text-sm leading-relaxed ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Gallery Style */}
      <section className={`py-16 lg:py-20 ${dark ? 'bg-brand-900/20' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>@reliance.fashion</p>
            <h2 className={`font-display text-3xl lg:text-4xl font-bold ${dark ? 'text-white' : 'text-brand-900'}`}>Follow Our Style</h2>
            <p className={`text-sm mt-2 ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>Tag us on Instagram for a chance to be featured</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {[
              'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
              'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
              'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80',
              'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
              'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
              'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
            ].map((img, idx) => (
              <a href="#" key={idx} className="group relative aspect-square rounded-xl overflow-hidden">
                <img src={img} alt={`Fashion ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">View Post</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Store Location */}
      <section className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-3 ${dark ? 'text-neutral-500' : 'text-gray-400'}`}>Find Us</p>
            <h2 className={`font-display text-3xl lg:text-4xl font-bold mb-5 ${dark ? 'text-white' : 'text-brand-900'}`}>Visit Our Store</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dark ? 'text-neutral-300' : 'text-gray-600'}`}>
              Come experience our full collection in person. Our Makandura, Matara store offers a premium shopping experience with helpful staff ready to assist you.
            </p>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Makandura, Matara, Sri Lanka' },
                { icon: Headphones, label: '071 135 0123 / 041 226 8739' },
                { icon: Clock, label: 'Mon — Sat: 9AM — 8PM, Sun: 10AM — 6PM' },
              ].map(item => (
                <div key={item.label} className={`flex items-center gap-3 text-sm ${dark ? 'text-neutral-300' : 'text-gray-600'}`}>
                  <div className={`p-2 rounded-lg ${dark ? 'bg-neutral-800' : 'bg-gray-100'}`}>
                    <item.icon className={`w-4 h-4 ${dark ? 'text-neutral-400' : 'text-gray-500'}`} />
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <NavLink
              to="/store/contact"
              className={`inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-lg ${
                dark
                  ? 'bg-white text-black hover:bg-neutral-100 shadow-white/10'
                  : 'bg-brand-900 text-white hover:bg-brand-800 shadow-brand-900/30'
              }`}
            >
              Get Directions <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
          <div className={`rounded-3xl overflow-hidden border h-[300px] lg:h-[400px] ${dark ? 'border-neutral-800/60' : 'border-gray-200'}`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15895.751068654!2d80.5169!3d5.9549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae13f57d92e1e5b%3A0x5c0c0c0c0c0c0c0c!2sMatara%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1690000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0, filter: dark ? 'invert(0.9) hue-rotate(180deg)' : 'none' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className={`rounded-3xl p-8 lg:p-12 text-center border ${
          dark ? 'bg-brand-900/40 border-neutral-800/60' : 'bg-gray-50 border-gray-200'
        }`}>
          <h2 className={`font-display text-2xl lg:text-3xl font-bold mb-3 ${dark ? 'text-white' : 'text-brand-900'}`}>
            Stay in the Loop
          </h2>
          <p className={`text-sm mb-6 max-w-md mx-auto ${dark ? 'text-neutral-400' : 'text-gray-500'}`}>
            Subscribe to get exclusive offers, new arrivals, and style tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-5 py-3 rounded-full border text-sm ${
                dark
                  ? 'bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-neutral-500/30`}
            />
            <button className={`px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg ${
              dark
                ? 'bg-white text-black hover:bg-neutral-100'
                : 'bg-brand-900 text-white hover:bg-brand-800'
            }`}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
