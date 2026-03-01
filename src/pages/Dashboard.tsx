import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../lib/utils';
import { mockProducts, mockInvoices, mockDailySales, topSellingProducts, categoryRevenue } from '../data/mockData';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const Dashboard: React.FC = () => {
  const { theme } = useTheme();

  const totalOrders = mockInvoices.length;
  const totalProducts = mockProducts.length;
  const lowStockCount = mockProducts.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length;
  const pendingInvoices = mockInvoices.filter(i => i.status === 'pending' || i.status === 'partial');
  const todayRevenue = mockDailySales[mockDailySales.length - 1]?.revenue || 0;

  const stats = [
    { label: 'Today Revenue', value: formatCurrency(todayRevenue), icon: DollarSign, change: '+12.5%', up: true, accent: 'bg-white text-black dark:bg-white dark:text-black' },
    { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingBag, change: '+8.2%', up: true, accent: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200' },
    { label: 'Total Products', value: totalProducts.toString(), icon: Package, change: '+3', up: true, accent: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200' },
    { label: 'Low Stock Items', value: lowStockCount.toString(), icon: AlertTriangle, change: lowStockCount > 0 ? 'Needs attention' : 'All good', up: false, accent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  ];

  const recentInvoices = [...mockInvoices].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const chartData = mockDailySales.slice(-14).map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: d.revenue,
    profit: d.profit,
  }));

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Dashboard
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>
            Welcome back — here's your store overview
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`relative overflow-hidden rounded-2xl border p-3 sm:p-5 transition-all hover:shadow-lg ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border-neutral-800/60'
              : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-neutral-500/5 to-transparent rounded-full blur-2xl" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{stat.label}</p>
                <p className={`text-2xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
                  stat.up ? 'text-green-500' : 'text-red-400'
                }`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.accent}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <div className={`col-span-1 lg:col-span-2 rounded-2xl border p-3 sm:p-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border-neutral-800/60'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Revenue Overview</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>Last 14 days</p>
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'
            }`}>
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">+18.5%</span>
            </div>
          </div>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme === 'dark' ? '#ffffff' : '#171717'} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={theme === 'dark' ? '#ffffff' : '#171717'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#262626' : '#e5e5e5'} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: theme === 'dark' ? '#737373' : '#a3a3a3' }} />
                <YAxis tick={{ fontSize: 11, fill: theme === 'dark' ? '#737373' : '#a3a3a3' }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{
                    background: theme === 'dark' ? '#171717' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#262626' : '#e5e5e5'}`,
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#fff' : '#171717',
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke={theme === 'dark' ? '#ffffff' : '#171717'} strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Revenue */}
        <div className={`rounded-2xl border p-3 sm:p-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border-neutral-800/60'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h3 className={`text-base sm:text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Category Revenue</h3>
          <div className="space-y-3">
            {categoryRevenue.map((cat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>{cat.name}</span>
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{cat.percentage}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-100'}`}>
                  <div
                    className={`h-full rounded-full transition-all ${theme === 'dark' ? 'bg-white' : 'bg-brand-900'}`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Top Selling Products */}
        <div className={`rounded-2xl border p-3 sm:p-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border-neutral-800/60'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h3 className={`text-base sm:text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Top Selling Products</h3>
          <div className="h-44 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSellingProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#262626' : '#e5e5e5'} />
                <XAxis type="number" tick={{ fontSize: 11, fill: theme === 'dark' ? '#737373' : '#a3a3a3' }} />
                <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fill: theme === 'dark' ? '#a3a3a3' : '#525252' }} />
                <Tooltip
                  contentStyle={{
                    background: theme === 'dark' ? '#171717' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#262626' : '#e5e5e5'}`,
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#fff' : '#171717',
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="unitsSold" fill={theme === 'dark' ? '#ffffff' : '#171717'} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className={`rounded-2xl border p-3 sm:p-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 border-neutral-800/60'
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Invoices</h3>
            <button className={`text-sm flex items-center gap-1 ${
              theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            }`}>
              <Eye className="w-4 h-4" /> View All
            </button>
          </div>
          <div className="space-y-3">
            {recentInvoices.map(inv => (
              <div key={inv.id} className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                theme === 'dark' ? 'hover:bg-neutral-800/40' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                    theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {inv.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{inv.customerName}</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>{inv.invoiceNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(inv.total)}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    inv.status === 'paid'
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                      : inv.status === 'partial'
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : inv.status === 'pending'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-neutral-500/10 text-neutral-500 border border-neutral-500/20'
                  }`}>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Payments Summary */}
      {pendingInvoices.length > 0 && (
        <div className={`rounded-2xl border p-3 sm:p-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-amber-950/20 to-neutral-950/80 border-amber-900/30'
            : 'bg-amber-50 border-amber-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-amber-300' : 'text-amber-800'}`}>
              {pendingInvoices.length} Pending Payment{pendingInvoices.length > 1 ? 's' : ''}
            </h3>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-amber-400/70' : 'text-amber-700'}`}>
            Outstanding: {formatCurrency(pendingInvoices.reduce((sum, i) => sum + (i.total - i.paidAmount), 0))}
          </p>
        </div>
      )}
    </div>
  );
};
