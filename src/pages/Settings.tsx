import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  Store,
  Bell,
  Shield,
  Palette,
  Globe,
  Sun,
  Moon,
  Save,
  Upload,
  Mail,
  Phone,
  MapPin,
  Clock,
  Receipt,
  CreditCard,
} from 'lucide-react';

type SettingsTab = 'general' | 'appearance' | 'notifications' | 'invoice' | 'payment' | 'security';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [storeName, setStoreName] = useState('RELIANCE Fashion');
  const [storePhone, setStorePhone] = useState('011-2345678');
  const [storeEmail, setStoreEmail] = useState('info@reliance.lk');
  const [storeAddress, setStoreAddress] = useState('No. 123, Galle Road, Colombo 03, Sri Lanka');
  const [currency, setCurrency] = useState('LKR');
  const [taxRate, setTaxRate] = useState('0');
  const [invoicePrefix, setInvoicePrefix] = useState('INV');
  const [invoiceFooter, setInvoiceFooter] = useState('Thank you for shopping at RELIANCE! Exchange within 7 days with receipt.');
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const tabs: { key: SettingsTab; label: string; icon: React.ElementType }[] = [
    { key: 'general', label: 'General', icon: Store },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'invoice', label: 'Invoice', icon: Receipt },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'security', label: 'Security', icon: Shield },
  ];

  const inputClass = `w-full px-4 py-2.5 rounded-xl border transition-all ${
    theme === 'dark'
      ? 'bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-white/30 focus:ring-2 focus:ring-white/10'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200'
  }`;

  const labelClass = `block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`;

  const cardClass = `rounded-2xl border p-3 sm:p-5 ${
    theme === 'dark' ? 'bg-neutral-900/50 border-neutral-800/60' : 'bg-white border-gray-200 shadow-sm'
  }`;

  const toggleSwitch = (enabled: boolean, onToggle: () => void) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled
          ? theme === 'dark' ? 'bg-white' : 'bg-brand-900'
          : theme === 'dark' ? 'bg-neutral-700' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-4 w-4 rounded-full transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      } ${enabled ? theme === 'dark' ? 'bg-black' : 'bg-white' : theme === 'dark' ? 'bg-neutral-400' : 'bg-white'}`} />
    </button>
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>
            Configure your store preferences
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-neutral-800 to-brand-950 text-white rounded-xl font-medium shadow-lg transition-all dark:from-white dark:to-neutral-200 dark:text-black">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className={`lg:w-56 flex-shrink-0 ${cardClass}`}>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? theme === 'dark'
                      ? 'bg-white text-black'
                      : 'bg-brand-900 text-white'
                    : theme === 'dark'
                      ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {/* General */}
          {activeTab === 'general' && (
            <>
              <div className={cardClass}>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Store Information</h3>
                <div className="space-y-4">
                  {/* Logo Upload */}
                  <div>
                    <label className={labelClass}>Store Logo</label>
                    <div className={`flex items-center gap-4 p-4 rounded-xl border-2 border-dashed ${
                      theme === 'dark' ? 'border-neutral-700 hover:border-neutral-600' : 'border-gray-300 hover:border-gray-400'
                    } transition-all cursor-pointer`}>
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-2xl tracking-wider">R</span>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Upload new logo</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>PNG, JPG up to 2MB</p>
                      </div>
                      <Upload className={`w-5 h-5 ml-auto ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}><Store className="w-3.5 h-3.5 inline mr-1" />Store Name</label>
                      <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}><Phone className="w-3.5 h-3.5 inline mr-1" />Phone</label>
                      <input type="text" value={storePhone} onChange={e => setStorePhone(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}><Mail className="w-3.5 h-3.5 inline mr-1" />Email</label>
                      <input type="email" value={storeEmail} onChange={e => setStoreEmail(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}><Globe className="w-3.5 h-3.5 inline mr-1" />Currency</label>
                      <select value={currency} onChange={e => setCurrency(e.target.value)} className={inputClass}>
                        <option value="LKR">LKR (Rs.)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}><MapPin className="w-3.5 h-3.5 inline mr-1" />Address</label>
                    <textarea
                      value={storeAddress}
                      onChange={e => setStoreAddress(e.target.value)}
                      rows={2}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className={cardClass}>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Business Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
                    { day: 'Saturday', hours: '9:00 AM - 9:00 PM' },
                    { day: 'Sunday', hours: '10:00 AM - 6:00 PM' },
                  ].map((schedule, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${
                      theme === 'dark' ? 'bg-neutral-800/30' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>{schedule.day}</span>
                      </div>
                      <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className={cardClass}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Theme & Appearance</h3>
              <div className="space-y-6">
                {/* Theme Mode */}
                <div>
                  <label className={labelClass}>Theme Mode</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { if (theme !== 'light') toggleTheme(); }}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        theme === 'light'
                          ? 'border-brand-900 bg-brand-900/5'
                          : theme === 'dark'
                            ? 'border-neutral-700 hover:border-neutral-600 bg-neutral-800/30'
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-brand-900' : theme === 'dark' ? 'text-neutral-400' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Light</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>Clean & bright</p>
                      </div>
                    </button>
                    <button
                      onClick={() => { if (theme !== 'dark') toggleTheme(); }}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-white bg-white/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Dark</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>Easy on eyes</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Brand Color Preview */}
                <div>
                  <label className={labelClass}>Brand Colors</label>
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-neutral-800/30' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`}>Primary Palette</span>
                    </div>
                    <div className="flex gap-1">
                      {['#0a0a0a', '#171717', '#262626', '#404040', '#525252', '#737373', '#a3a3a3', '#d4d4d4', '#e5e5e5', '#f5f5f5', '#ffffff'].map(col => (
                        <div key={col} style={{ background: col }} className="flex-1 h-8 first:rounded-l-lg last:rounded-r-lg border border-neutral-600/20" />
                      ))}
                    </div>
                    <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>
                      Monochrome palette inspired by the RELIANCE brand identity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Invoice Settings */}
          {activeTab === 'invoice' && (
            <div className={cardClass}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Invoice Configuration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Invoice Prefix</label>
                    <input type="text" value={invoicePrefix} onChange={e => setInvoicePrefix(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Tax Rate (%)</label>
                    <input type="text" value={taxRate} onChange={e => setTaxRate(e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Invoice Footer Note</label>
                  <textarea value={invoiceFooter} onChange={e => setInvoiceFooter(e.target.value)} rows={3} className={inputClass} />
                </div>
                {/* Invoice Preview */}
                <div>
                  <label className={labelClass}>Preview</label>
                  <div className={`p-6 rounded-xl border ${
                    theme === 'dark' ? 'bg-neutral-800/30 border-neutral-700/50' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <span className="text-black font-bold text-sm">R</span>
                        </div>
                        <div>
                          <p className={`font-bold text-sm tracking-wider ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>RELIANCE</p>
                          <p className={`text-[10px] ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>{storePhone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{invoicePrefix}-2026-001</p>
                        <p className={`text-[10px] ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>March 1, 2026</p>
                      </div>
                    </div>
                    <div className={`border-t pt-2 ${theme === 'dark' ? 'border-neutral-700' : 'border-gray-200'}`}>
                      <p className={`text-[10px] italic ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>{invoiceFooter}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className={cardClass}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Payment Methods</h3>
              <div className="space-y-3">
                {[
                  { name: 'Cash', description: 'Accept cash payments', enabled: true },
                  { name: 'Card (Visa/Master)', description: 'Credit & debit card payments', enabled: true },
                  { name: 'Bank Transfer', description: 'Direct bank deposits', enabled: true },
                  { name: 'Credit Sales', description: 'Allow customer credit accounts', enabled: true },
                  { name: 'Mobile Payment', description: 'FriMi, eZ Cash, etc.', enabled: false },
                ].map((method, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-neutral-800/30 hover:bg-neutral-800/50' : 'bg-gray-50 hover:bg-gray-100'
                  } transition-colors`}>
                    <div className="flex items-center gap-3">
                      <CreditCard className={`w-5 h-5 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{method.name}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>{method.description}</p>
                      </div>
                    </div>
                    {toggleSwitch(method.enabled, () => {})}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className={cardClass}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Low Stock Alerts', desc: 'Get notified when products reach low stock threshold', enabled: lowStockAlert, toggle: () => setLowStockAlert(!lowStockAlert) },
                  { label: 'Email Notifications', desc: 'Receive daily sales summary via email', enabled: emailNotifications, toggle: () => setEmailNotifications(!emailNotifications) },
                  { label: 'SMS Notifications', desc: 'Get SMS alerts for important events', enabled: smsNotifications, toggle: () => setSmsNotifications(!smsNotifications) },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${
                    theme === 'dark' ? 'bg-neutral-800/30' : 'bg-gray-50'
                  }`}>
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>{item.desc}</p>
                    </div>
                    {toggleSwitch(item.enabled, item.toggle)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className={cardClass}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Current Password</label>
                  <input type="password" placeholder="••••••••" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>New Password</label>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Confirm Password</label>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>
                </div>
                <button className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  theme === 'dark'
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-brand-900 text-white hover:bg-brand-800'
                }`}>
                  Update Password
                </button>

                <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-gray-200'}`}>
                  <h4 className={`text-base font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Active Sessions</h4>
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-neutral-800/30' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50'
                        }`}>
                          <Globe className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Current Device</p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-gray-400'}`}>Chrome · Windows · Colombo, LK</p>
                        </div>
                      </div>
                      <span className="text-xs text-green-500 font-medium">Active now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
