import React from 'react';
import { ShoppingBag, Wallet, Sparkles, Clock, Receipt, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BottomNav({ activeTab, onSelectTab, onOpenCart }) {
  const { totalItems, subtotal } = useCart();

  const tabs = [
    { id: 'belanja', label: 'Belanja', icon: ShoppingBag },
    { id: 'anggaran', label: 'Anggaran', icon: Wallet, badge: 'Smart' },
    { id: 'kesegaran', label: 'Kesegaran', icon: Sparkles },
    { id: 'riwayat', label: 'Riwayat', icon: Receipt }
  ];

  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-[430px] mx-auto px-4 pb-3 pt-2 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-950/15 p-1.5 flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex-1 py-2 px-1 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105 font-black'
                  : 'text-slate-500 hover:text-slate-800 font-bold'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {tab.id === 'belanja' && totalItems > 0 && !isActive && (
                  <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
                {tab.badge && !isActive && (
                  <span className="absolute -top-1.5 -right-3 bg-amber-400 text-slate-950 text-[8px] font-black px-1 rounded-full uppercase">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 leading-none tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Floating Cart Pill shortcut inside bottom bar */}
        {totalItems > 0 && (
          <button
            type="button"
            onClick={onOpenCart}
            className="ml-1 bg-slate-900 hover:bg-black text-white p-2.5 rounded-2xl flex items-center gap-1.5 shadow-md shadow-slate-900/20 active:scale-95 transition-all text-xs font-black flex-shrink-0"
            title="Buka Troli Belanja"
          >
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-black">
              {totalItems}
            </span>
            <span className="text-[11px] text-emerald-400">
              {formatPrice(subtotal)}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
