import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { X, LogOut, Package, MapPin, Sparkles, User, Phone, Mail, Clock, ChevronRight, ShieldCheck } from 'lucide-react';
import SmartGroceryTracker from './SmartGroceryTracker';

export default function ProfileModal({ isOpen, onClose, onOpenOrderTracker, onShowToast }) {
  const { currentUser, logout, getUserAddresses } = useAuth();
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'tracker' | 'addresses'

  if (!isOpen || !currentUser) return null;

  const addresses = getUserAddresses();
  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  const handleLogout = () => {
    logout();
    onClose();
    if (onShowToast) {
      onShowToast('Berhasil keluar. Sesi Anda telah dibersihkan secara aman.', 'info');
    }
  };

  return (
    <div className="dvh-modal-overlay" onClick={onClose}>
      <div
        className="dvh-modal-content max-w-3xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Profile Hero */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser.name}`}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl bg-white/20 p-1 object-cover border-2 border-white/40 shadow-md"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-xl font-bold truncate">{currentUser.name}</h2>
                <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                  ⭐ Dvh VIP Club
                </span>
              </div>
              <div className="text-xs text-emerald-100 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail size={12} /> {currentUser.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {currentUser.phone}
                </span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-200">
                Data Terisolasi • User ID: <code className="bg-black/20 px-1.5 py-0.5 rounded font-mono text-white">{currentUser.id}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`text-xs font-bold py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package size={15} />
            <span>Riwayat Pesanan ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tracker')}
            className={`text-xs font-bold py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'tracker'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles size={15} />
            <span>Smart Grocery Tracker</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`text-xs font-bold py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin size={15} />
            <span>Alamat Saya ({addresses.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-4xl mb-2">📦</div>
                  <h4 className="font-bold text-slate-800 text-sm">Belum Ada Riwayat Pesanan</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Pesanan yang Anda buat akan tersimpan khusus di akun Anda di sini.
                  </p>
                </div>
              ) : (
                orders.map((order) => {
                  const statusColors = {
                    'Diproses': 'bg-amber-100 text-amber-800 border-amber-200',
                    'Sedang Diantar': 'bg-blue-100 text-blue-800 border-blue-200',
                    'Selesai': 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }[order.status] || 'bg-slate-100 text-slate-700 border-slate-200';

                  return (
                    <div
                      key={order.id}
                      className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                            <span>#{order.id}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {order.date} • {order.paymentMethod}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            if (onOpenOrderTracker) onOpenOrderTracker(order);
                          }}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span>Lacak Pengiriman</span>
                          <ChevronRight size={13} />
                        </button>
                      </div>

                      {/* Items */}
                      <div className="space-y-1.5">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-slate-700 truncate max-w-sm">
                              {item.quantity}x {item.name} ({item.unit})
                            </span>
                            <span className="font-semibold text-slate-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-slate-500">
                          Pengiriman ke: <strong className="text-slate-700">{order.address?.split(',')[0]}</strong>
                        </span>
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block">Total Transaksi</span>
                          <strong className="text-emerald-600 text-sm font-black">
                            {formatPrice(order.total)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: Smart Grocery Tracker */}
          {activeTab === 'tracker' && (
            <SmartGroceryTracker onShowToast={onShowToast} />
          )}

          {/* TAB 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Alamat Tersimpan Akun Ini
              </h3>
              {addresses.map((addr, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">{addr.label}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Alamat Utama
                      </span>
                    )}
                  </div>
                  <div className="font-medium text-slate-700">{addr.recipient} ({addr.phone})</div>
                  <div className="text-slate-500">{addr.address}</div>
                  {addr.notes && (
                    <div className="text-amber-800 text-[11px] font-medium pt-1">
                      Catatan: {addr.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Logout Button */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Semua data keranjang dan riwayat pesanan Anda terenkripsi aman</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <LogOut size={15} />
            <span>Keluar Akun (Hard Logout)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
