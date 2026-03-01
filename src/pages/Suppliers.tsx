import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../lib/utils';
import { mockSuppliers } from '../data/mockData';
import {
  Search,
  Plus,
  Truck,
  Phone,
  Mail,
  MapPin,
  Star,
  Edit,
  Trash2,
  MoreVertical,
  Package,
  DollarSign,
} from 'lucide-react';

export const Suppliers: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockSuppliers.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalOutstanding = mockSuppliers.reduce((s, sp) => s + sp.outstandingBalance, 0);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Suppliers</h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>
            Manage your fabric & clothing suppliers
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-neutral-800 to-brand-950 text-white rounded-xl font-medium shadow-lg transition-all dark:from-white dark:to-neutral-200 dark:text-black">
          <Plus className="w-5 h-5" />
          Add Supplier
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Suppliers', value: mockSuppliers.length, icon: Truck },
          { label: 'Active Suppliers', value: mockSuppliers.filter(s => s.status === 'active').length, icon: Package },
          { label: 'Outstanding Balance', value: formatCurrency(totalOutstanding), icon: DollarSign },
        ].map((stat, i) => (
          <div key={i} className={`rounded-2xl border p-3 sm:p-5 ${
            theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-neutral-800 text-neutral-300' : 'bg-gray-100 text-gray-600'}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
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
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-white/30'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400'
              }`}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  statusFilter === s
                    ? theme === 'dark'
                      ? 'bg-white text-black border-white'
                      : 'bg-brand-900 text-white border-brand-900'
                    : theme === 'dark'
                      ? 'bg-neutral-800/50 border-neutral-700/50 text-neutral-400 hover:text-white hover:bg-neutral-800'
                      : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(supplier => (
          <div key={supplier.id} className={`rounded-2xl border p-3 sm:p-5 transition-all hover:shadow-lg ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border-neutral-800/60 hover:border-neutral-700'
              : 'bg-white border-gray-200 shadow-sm hover:border-gray-300'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                  theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                  {supplier.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{supplier.name}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{supplier.supplyType}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < supplier.rating ? 'text-amber-400 fill-amber-400' : theme === 'dark' ? 'text-neutral-700' : 'text-gray-300'}`} />
                    ))}
                    <span className={`text-xs ml-1 ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>{supplier.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                  supplier.status === 'active'
                    ? 'bg-green-500/10 text-green-500 border-green-500/20'
                    : 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
                }`}>
                  {supplier.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <button className={`p-1.5 rounded-lg transition-all ${
                  theme === 'dark' ? 'hover:bg-neutral-800 text-neutral-500' : 'hover:bg-gray-100 text-gray-400'
                }`}>
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t grid grid-cols-2 gap-4 ${
              theme === 'dark' ? 'border-neutral-800' : 'border-gray-100'
            }`}>
              <div>
                <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>Contact Person</p>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>{supplier.contactPerson}</p>
              </div>
              <div>
                <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>Total Orders</p>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>{supplier.totalOrders}</p>
              </div>
            </div>

            <div className={`mt-3 space-y-1.5`}>
              <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>
                <Phone className="w-3.5 h-3.5" /> {supplier.phone}
              </div>
              <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>
                <Mail className="w-3.5 h-3.5" /> {supplier.email}
              </div>
              <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>
                <MapPin className="w-3.5 h-3.5" /> {supplier.address}
              </div>
            </div>

            {supplier.outstandingBalance > 0 && (
              <div className={`mt-3 p-3 rounded-xl ${
                theme === 'dark' ? 'bg-amber-950/20 border border-amber-800/30' : 'bg-amber-50 border border-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>Outstanding Balance</span>
                  <span className={`text-sm font-bold ${theme === 'dark' ? 'text-amber-300' : 'text-amber-800'}`}>{formatCurrency(supplier.outstandingBalance)}</span>
                </div>
              </div>
            )}

            <div className={`flex items-center gap-2 mt-4 pt-3 border-t ${
              theme === 'dark' ? 'border-neutral-800' : 'border-gray-100'
            }`}>
              <button className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                theme === 'dark' ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' : 'hover:bg-gray-50 text-gray-500 hover:text-gray-900'
              }`}>
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                theme === 'dark' ? 'hover:bg-red-500/10 text-neutral-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-500 hover:text-red-500'
              }`}>
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={`text-center py-16 rounded-2xl border ${
          theme === 'dark' ? 'bg-neutral-900/30 border-neutral-800/60 text-neutral-500' : 'bg-gray-50 border-gray-200 text-gray-400'
        }`}>
          <Truck className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No suppliers found</p>
        </div>
      )}
    </div>
  );
};
