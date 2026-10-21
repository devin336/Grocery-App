import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, MapPin, Sparkles, SlidersHorizontal, User, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top Quick Delivery Info Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="flex items-center gap-1 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-2xs animate-pulse">
            <Zap size={11} fill="currentColor" /> 15 MENIT SAMPAI
          </span>
          <span className="truncate text-emerald-100 hidden sm:inline">
            Dikirim ke: <strong className="text-white">{currentUser?.name}</strong> • Dark Store Senopati (Jakarta Selatan)
          </span>
        </div>

        {/* User Isolation Switcher */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleToggleDemoUser}
            className="flex items-center gap-1.5 text-[11px] bg-white/15 hover:bg-white/25 px-3 py-0.5 rounded-full transition-all text-white font-bold border border-white/20"
            title="Ganti akun untuk menguji isolasi keranjang & pesanan"
          >
            <RefreshCw size={11} />
            <span>Ganti Akun Demo ({currentUser?.id === 'user_dvh_001' ? 'User A -> User B' : 'User B -> User A'})</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none flex-shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-600/30">
            🥬
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
              <span>Dvh Grocery</span>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block mt-0.5">
              Quick Commerce 15m
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari bayam, susu, apel, daging, beras..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-xs font-semibold pl-10 pr-8 py-2.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-slate-200/80 focus:border-emerald-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs"
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
            className={`p-2.5 rounded-2xl border text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-2xs ${
              hasActiveFilters
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Filter Harga & Kategori"
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Smart Freshness Tracker Button */}
          <button
            type="button"
            onClick={onOpenTracker}
            className="hidden md:flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-2xl transition-all shadow-2xs"
            title="Pantau kesegaran bahan belanjaan Anda"
          >
            <Sparkles size={14} className="text-emerald-600" />
            <span>Smart Tracker</span>
          </button>

          {/* User Profile */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs font-bold text-slate-800 shadow-2xs"
            title="Profil Pengguna & Riwayat Transaksi"
          >
            <img
              src={currentUser?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser?.name}`}
              alt={currentUser?.name}
              className="w-7 h-7 rounded-xl object-cover bg-emerald-100 flex-shrink-0"
            />
            <span className="hidden lg:inline truncate max-w-[90px]">
              {currentUser?.name?.split(' ')[0]}
            </span>
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3.5 py-2.5 rounded-2xl shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 text-xs hover:scale-[1.02]"
            title="Buka Keranjang Belanja"
          >
            <div className="relative">
              <ShoppingBag size={17} />
              {totalItems > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-bounce">
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
