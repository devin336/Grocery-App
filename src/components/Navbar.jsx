import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, MapPin, Sparkles, SlidersHorizontal, User, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Navbar({
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenProfile,
  onOpenTracker,
  onOpenFilter,
  hasActiveFilters
}) {
  const { currentUser, loginAsDemo } = useAuth();
  const { totalItems, subtotal } = useCart();

  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  const handleToggleDemoUser = () => {
    if (currentUser?.id === 'user_dvh_001') {
      loginAsDemo('user_dvh_002');
    } else {
      loginAsDemo('user_dvh_001');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro bar for delivery location & quick isolation switcher */}
      <div className="bg-emerald-700 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <MapPin size={13} className="text-emerald-300 flex-shrink-0" />
          <span className="truncate">
            Dikirim ke: <strong>{currentUser?.name?.split(' ')[0]}</strong> • Jakarta (Dark Store Senopati)
          </span>
          <span className="bg-emerald-500/80 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider flex-shrink-0">
            ⚡ 15 Mnt
          </span>
        </div>

        {/* Quick User Isolation Toggle Switch */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleToggleDemoUser}
            className="flex items-center gap-1 text-[11px] bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-all text-white font-semibold"
            title="Ganti ke akun demo lain untuk menguji isolasi keranjang & pesanan"
          >
            <RefreshCw size={11} />
            <span>Ganti Akun Demo ({currentUser?.id === 'user_dvh_001' ? 'User A -> User B' : 'User B -> User A'})</span>
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-600/20">
            D
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
              <span>Dvh Grocery</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mt-0.5">
              Quick Commerce
            </span>
          </div>
        </div>

        {/* Search Bar & Filter */}
        <div className="flex-1 max-w-xl flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari dari 500+ sayur, buah segar, daging, susu..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-xs font-medium pl-10 pr-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-emerald-500 rounded-xl focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenFilter}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              hasActiveFilters
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Filter & Urutkan Produk"
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2.5">
          {/* Smart Freshness Tracker Shortcut */}
          <button
            type="button"
            onClick={onOpenTracker}
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl transition-all shadow-xs"
            title="Buka Smart Grocery Tracker untuk memantau kesegaran bahan belanjaan"
          >
            <Sparkles size={14} className="text-emerald-600" />
            <span>Smart Tracker</span>
          </button>

          {/* User Profile */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs font-bold text-slate-700"
            title="Profil Pengguna & Riwayat Pesanan"
          >
            <img
              src={currentUser?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser?.name}`}
              alt={currentUser?.name}
              className="w-7 h-7 rounded-lg object-cover bg-emerald-100 flex-shrink-0"
            />
            <span className="hidden lg:inline truncate max-w-[100px]">
              {currentUser?.name?.split(' ')[0]}
            </span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 text-xs"
            title="Lihat Keranjang Belanja"
          >
            <div className="relative">
              <ShoppingBag size={17} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-amber-400 text-slate-900 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">
              {totalItems > 0 ? formatPrice(subtotal) : 'Keranjang'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
