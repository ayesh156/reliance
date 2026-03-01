import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../lib/utils';
import { mockDailySales, mockProducts, categoryRevenue, topSellingProducts } from '../data/mockData';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Download,
  ArrowUpRight,
  Package,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';

export const Reports: React.FC = () => {
  const { theme } = useTheme();
  const [period, setPeriod] = useState<'7d' | '14d' | '30d'>('14d');

  const daysMap = { '7d': 7, '14d': 14, '30d': 30 };
  const salesData = mockDailySales.slice(-daysMap[period]);
  const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
  const totalProfit = salesData.reduce((s, d) => s + d.profit, 0);
  const totalOrders = salesData.reduce((s, d) => s + d.orders, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const chartSalesData = salesData.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: d.revenue,
    profit: d.profit,
    orders: d.orders,
  }));

  const pieColors = theme === 'dark'
    ? ['#ffffff', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626']
    : ['#171717', '#262626', '#404040', '#525252', '#737373', '#a3a3a3', '#d4d4d4'];

  const stockStatusData = [
    { name: 'In Stock', value: mockProducts.filter(p => p.status === 'in-stock').length },
    { name: 'Low Stock', value: mockProducts.filter(p => p.status === 'low-stock').length },
    { name: 'Out of Stock', value: mockProducts.filter(p => p.status === 'out-of-stock').length },
  ];
  const stockColors = ['#22c55e', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Reports</h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>
            Analytics & business insights
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Period Selector */}
          <div className={`flex rounded-xl border overflow-hidden ${theme === 'dark' ? 'border-neutral-700/50' : 'border-gray-200'}`}>
            {(['7d', '14d', '30d'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  period === p
                    ? theme === 'dark' ? 'bg-white text-black' : 'bg-brand-900 text-white'
                    : theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-800' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {p === '7d' ? '7 Days' : p === '14d' ? '14 Days' : '30 Days'}
              </button>
            ))}
          </div>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
            theme === 'dark'
              ? 'bg-neutral-800/50 border-neutral-700/50 text-neutral-300 hover:bg-neutral-800'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}>
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, change: '+18.5%' },
          { label: 'Total Profit', value: formatCurrency(totalProfit), icon: TrendingUp, change: '+12.3%' },
          { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingBag, change: '+8.1%' },
          { label: 'Avg. Order Value', value: formatCurrency(avgOrderValue), icon: BarChart3, change: '+5.2%' },
        ].map((stat, i) => (
          <div key={i} className={`rounded-2xl border p-3 sm:p-5 ${
            theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-100'}`}>
                <stat.icon className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-500">
                <ArrowUpRight className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <p className={`text-xl font-bold mt-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            <p className={`text-sm mt-0.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue & Profit Chart */}
      <div className={`rounded-2xl border p-3 sm:p-5 ${
        theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Revenue & Profit Trend</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-brand-900'}`} />
              <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-neutral-500' : 'bg-neutral-400'}`} />
              <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>Profit</span>
            </div>
          </div>
        </div>
        <div className="h-52 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartSalesData}>
              <defs>
                <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme === 'dark' ? '#fff' : '#171717'} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={theme === 'dark' ? '#fff' : '#171717'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#262626' : '#e5e5e5'} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: theme === 'dark' ? '#737373' : '#a3a3a3' }} />
              <YAxis tick={{ fontSize: 11, fill: theme === 'dark' ? '#737373' : '#a3a3a3' }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: theme === 'dark' ? '#171717' : '#fff', border: `1px solid ${theme === 'dark' ? '#262626' : '#e5e5e5'}`, borderRadius: '12px', color: theme === 'dark' ? '#fff' : '#171717', fontSize: 12 }}
                formatter={(value: number, name: string) => [formatCurrency(value), name === 'revenue' ? 'Revenue' : 'Profit']}
              />
              <Area type="monotone" dataKey="revenue" stroke={theme === 'dark' ? '#ffffff' : '#171717'} strokeWidth={2} fill="url(#revGrad2)" />
              <Area type="monotone" dataKey="profit" stroke={theme === 'dark' ? '#737373' : '#a3a3a3'} strokeWidth={2} fill="none" strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Category Breakdown Pie */}
        <div className={`rounded-2xl border p-3 sm:p-5 ${
          theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sales by Category</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryRevenue} dataKey="revenue" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={2} stroke={theme === 'dark' ? '#0a0a0a' : '#fff'}>
                  {categoryRevenue.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: theme === 'dark' ? '#171717' : '#fff', border: `1px solid ${theme === 'dark' ? '#262626' : '#e5e5e5'}`, borderRadius: '12px', color: theme === 'dark' ? '#fff' : '#171717', fontSize: 12 }}
                  formatter={(value: number) => [formatCurrency(value)]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {categoryRevenue.slice(0, 5).map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: pieColors[i] }} />
                  <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{c.name}</span>
                </div>
                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Status */}
        <div className={`rounded-2xl border p-3 sm:p-5 ${
          theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Inventory Status</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stockStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={2} stroke={theme === 'dark' ? '#0a0a0a' : '#fff'}>
                  {stockStatusData.map((_, i) => <Cell key={i} fill={stockColors[i]} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: theme === 'dark' ? '#171717' : '#fff', border: `1px solid ${theme === 'dark' ? '#262626' : '#e5e5e5'}`, borderRadius: '12px', color: theme === 'dark' ? '#fff' : '#171717', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {stockStatusData.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: stockColors[i] }} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{s.name}</span>
                </div>
                <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Trend */}
        <div className={`rounded-2xl border p-3 sm:p-5 ${
          theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Daily Orders</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#262626' : '#e5e5e5'} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: theme === 'dark' ? '#737373' : '#a3a3a3' }} />
                <YAxis tick={{ fontSize: 10, fill: theme === 'dark' ? '#737373' : '#a3a3a3' }} />
                <Tooltip
                  contentStyle={{ background: theme === 'dark' ? '#171717' : '#fff', border: `1px solid ${theme === 'dark' ? '#262626' : '#e5e5e5'}`, borderRadius: '12px', color: theme === 'dark' ? '#fff' : '#171717', fontSize: 12 }}
                />
                <Line type="monotone" dataKey="orders" stroke={theme === 'dark' ? '#ffffff' : '#171717'} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-neutral-800/50' : 'bg-gray-50'}`}>
              <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>Total Orders</p>
              <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{totalOrders}</p>
            </div>
            <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-neutral-800/50' : 'bg-gray-50'}`}>
              <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>Avg/Day</p>
              <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{(totalOrders / daysMap[period]).toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className={`rounded-2xl border p-3 sm:p-5 ${
        theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={theme === 'dark' ? 'border-b border-neutral-800' : 'border-b border-gray-200'}>
                {['#', 'Product', 'Units Sold', 'Revenue', 'Share'].map(h => (
                  <th key={h} className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topSellingProducts.map((p, i) => {
                const totalRev = topSellingProducts.reduce((s, x) => s + x.revenue, 0);
                const share = ((p.revenue / totalRev) * 100).toFixed(1);
                return (
                  <tr key={i} className={`${theme === 'dark' ? 'border-b border-neutral-800/50 hover:bg-neutral-800/30' : 'border-b border-gray-100 hover:bg-gray-50'} transition-colors`}>
                    <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-100'}`}>
                          <Package className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`} />
                        </div>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{p.name}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{p.unitsSold}</td>
                    <td className={`px-4 py-3 text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(p.revenue)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-16 h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-100'}`}>
                          <div className={`h-full rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-brand-900'}`} style={{ width: `${share}%` }} />
                        </div>
                        <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{share}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
