import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { mockCategories } from '../data/mockData';
import {
  Search,
  Plus,
  FolderOpen,
  Edit,
  Trash2,
  MoreVertical,
  ShoppingBag,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export const Categories: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockCategories.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProducts = mockCategories.reduce((s, c) => s + c.productCount, 0);
  const activeCount = mockCategories.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Categories</h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>
            Organize your clothing collections — {activeCount} active categories
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-neutral-800 to-brand-950 text-white rounded-xl font-medium shadow-lg transition-all dark:from-white dark:to-neutral-200 dark:text-black">
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Categories', value: mockCategories.length, icon: FolderOpen },
          { label: 'Active Categories', value: activeCount, icon: ToggleRight },
          { label: 'Total Products', value: totalProducts, icon: ShoppingBag },
        ].map((stat, i) => (
          <div key={i} className={`rounded-2xl border p-3 sm:p-5 ${
            theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-neutral-800 text-neutral-300' : 'bg-gray-100 text-gray-600'}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className={`rounded-2xl border p-4 ${
        theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-white/30 focus:ring-2 focus:ring-white/10'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200'
            }`}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(category => (
          <div key={category.id} className={`group rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border-neutral-800/60 hover:border-neutral-700'
              : 'bg-white border-gray-200 shadow-sm hover:border-gray-300'
          }`}>
            {/* Category Image Placeholder */}
            <div className={`h-32 flex items-center justify-center relative ${
              theme === 'dark' ? 'bg-neutral-800/50' : 'bg-gray-50'
            }`}>
              <FolderOpen className={`w-10 h-10 ${theme === 'dark' ? 'text-neutral-700' : 'text-gray-300'}`} />
              {/* Status */}
              <div className="absolute top-3 right-3">
                {category.status === 'active' ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                    <ToggleRight className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-500/10 text-neutral-400 border border-neutral-500/20">
                    <ToggleLeft className="w-3 h-3" /> Inactive
                  </span>
                )}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{category.name}</h3>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{category.description}</p>
                </div>
                <button className={`p-1.5 rounded-lg transition-all ${
                  theme === 'dark' ? 'hover:bg-neutral-800 text-neutral-500' : 'hover:bg-gray-100 text-gray-400'
                }`}>
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className={`flex items-center justify-between mt-4 pt-3 border-t ${
                theme === 'dark' ? 'border-neutral-800' : 'border-gray-100'
              }`}>
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>
                    {category.productCount} Products
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className={`p-1.5 rounded-lg transition-all ${
                    theme === 'dark' ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-gray-100 text-gray-400'
                  }`}>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className={`p-1.5 rounded-lg transition-all ${
                    theme === 'dark' ? 'hover:bg-red-500/10 text-neutral-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-400 hover:text-red-500'
                  }`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={`text-center py-16 rounded-2xl border ${
          theme === 'dark' ? 'bg-neutral-900/30 border-neutral-800/60 text-neutral-500' : 'bg-gray-50 border-gray-200 text-gray-400'
        }`}>
          <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No categories found</p>
        </div>
      )}
    </div>
  );
};
