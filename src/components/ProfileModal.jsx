import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, LogOut, Package, MapPin, Sparkles, User, Phone, Mail, Clock, ChevronRight, ShieldCheck } from 'lucide-react';
import SmartGroceryTracker from './SmartGroceryTracker';

export default function ProfileModal({ isOpen, isEmbedded = false, onClose, onOpenOrderTracker, onShowToast }) {
  const { currentUser, logout, getUserAddresses } = useAuth();
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses'

  if (!isOpen || !currentUser) return null;

  const addresses = getUserAddresses();
  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    if (onShowToast) {
      onShowToast('Berhasil keluar. Sesi Anda telah dibersihkan secara aman.', 'info');
    }
  };

  const content = (
    <div className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 flex flex-col ${isEmbedded ? '' : 'max-w-md max-h-[90vh]'}`}>
      {/* Header Profile Card */}
      <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white relative">
        {!isEmbedded && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        )}

        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser.name}`}
            alt={currentUser.name}
            className="w-14 h-14 rounded-2xl bg-white/20 p-0.5 object-cover border-2 border-white/40 shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h2 className="text-base font-black truncate">{currentUser.name}</h2>
              <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-full shadow-2xs">
                Siswa
              </span>
            </div>
            <div className="text-[11px] text-emerald-100 flex items-center gap-2 truncate">
              <span className="truncate">{currentUser.email}</span>
            </div>
            <div className="text-[10px] text-emerald-200 mt-1">
              User ID: <code className="bg-black/20 px-1 py-0.2 rounded font-mono text-white">{currentUser.id}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50 px-3 gap-1 pt-1">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`text-xs font-bold py-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package size={14} />
          <span>Riwayat Pesanan ({orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('addresses')}
          className={`text-xs font-bold py-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'addresses'
              ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin size={14} />
          <span>Alamat Kost / Rumah</span>
        </button>
      </div>

      {/* Body Content */}
      <div className="p-3.5 space-y-3 flex-1 overflow-y-auto">
        {activeTab === 'orders' ? (
          orders.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-2xl border border-slate-100 p-4">
              Belum ada transaksi pesanan di akun ini.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <span className="text-xs font-black text-slate-900 block">#{order.id}</span>
                    <span className="text-[10px] text-slate-400">{order.date} • {order.paymentMethod}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {order.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-slate-600 text-[11px]">
                      <span className="truncate max-w-[200px]">{item.quantity}x {item.name}</span>
                      <span className="font-bold text-slate-800">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <button
                    type="button"
                    onClick={() => onOpenOrderTracker && onOpenOrderTracker(order)}
                    className="text-emerald-700 font-extrabold text-[11px] flex items-center gap-1 hover:underline"
                  >
                    <span>Lacak Kurir 15m</span>
                    <ChevronRight size={12} />
                  </button>
                  <strong className="text-emerald-600 font-black text-xs">
                    Total: {formatPrice(order.total)}
                  </strong>
                </div>
              </div>
            ))
          )
        ) : (
          <div className="space-y-2">
            {addresses.map((addr, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1">
                <div className="font-black text-slate-800 flex items-center justify-between">
                  <span>{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                      Utama
                    </span>
                  )}
                </div>
                <div className="text-slate-600 font-medium">{addr.recipient} ({addr.phone})</div>
                <div className="text-slate-500 text-[11px]">{addr.address}</div>
                {addr.notes && (
                  <div className="text-amber-800 text-[10px] pt-0.5">Catatan: {addr.notes}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Logout Button */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-medium">Data terisolasi aman</span>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-3.5 py-2 rounded-xl transition-all shadow-2xs"
        >
          <LogOut size={13} />
          <span>Keluar Akun (Logout)</span>
        </button>
      </div>
    </div>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <div className="dvh-modal-overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
}
