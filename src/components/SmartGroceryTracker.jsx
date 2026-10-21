import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Clock, ShieldCheck, AlertCircle, CheckCircle, Sparkles, Trash2, Info, Calendar } from 'lucide-react';

export default function SmartGroceryTracker({ onShowToast }) {
  const { trackerItems, markTrackerConsumed, removeTrackerItem } = useCart();
  const { currentUser } = useAuth();
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'urgent' | 'fresh' | 'consumed'

  // Calculate days passed and status
  const processedItems = trackerItems.map((item) => {
    const purchaseDate = new Date(item.purchasedAt || new Date());
    const now = new Date();
    const diffTime = Math.abs(now - purchaseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const remainingDays = Math.max(0, item.expiry_days - diffDays);

    let status = 'fresh';
    let statusLabel = 'Sangat Segar';
    let statusColor = '#10b981';
    let statusBg = '#ecfdf5';

    if (item.status === 'consumed') {
      status = 'consumed';
      statusLabel = 'Sudah Dikonsumsi';
      statusColor = '#64748b';
      statusBg = '#f1f5f9';
    } else if (remainingDays === 0) {
      status = 'expired';
      statusLabel = 'Lewat Masa Simpan';
      statusColor = '#ef4444';
      statusBg = '#fef2f2';
    } else if (remainingDays <= 2) {
      status = 'urgent';
      statusLabel = 'Konsumsi Segera!';
      statusColor = '#f59e0b';
      statusBg = '#fffbeb';
    }

    const freshnessPercent = Math.max(0, Math.min(100, Math.round((remainingDays / (item.expiry_days || 1)) * 100)));

    return {
      ...item,
      remainingDays,
      freshnessPercent,
      status,
      statusLabel,
      statusColor,
      statusBg
    };
  });

  const filtered = processedItems.filter((item) => {
    if (filterTab === 'all') return item.status !== 'consumed';
    if (filterTab === 'urgent') return item.status === 'urgent' || item.status === 'expired';
    if (filterTab === 'fresh') return item.status === 'fresh';
    if (filterTab === 'consumed') return item.status === 'consumed';
    return true;
  });

  const urgentCount = processedItems.filter((i) => (i.status === 'urgent' || i.status === 'expired') && i.status !== 'consumed').length;

  const handleMarkConsumed = (trackerId, name) => {
    markTrackerConsumed(trackerId);
    if (onShowToast) {
      onShowToast(`Bagus! ${name} ditandai sudah dikonsumsi.`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Intro */}
      <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1">
            <Sparkles size={14} /> Smart Grocery & Freshness Tracker
          </div>
          <h2 className="text-xl font-bold mb-1">
            Pantau Kesegaran Bahan Makanan Anda
          </h2>
          <p className="text-xs text-emerald-100 leading-relaxed">
            Dvh Smart Tracker secara otomatis memantau masa simpan sayur, daging, dan makanan yang Anda beli agar selalu diolah pada puncak kesegarannya dan mencegah food waste.
          </p>
        </div>
        <div className="absolute right-4 -bottom-6 text-7xl opacity-20 select-none">
          🥬
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              filterTab === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Aktif Disimpan ({processedItems.filter((i) => i.status !== 'consumed').length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('urgent')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              filterTab === 'urgent'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <AlertCircle size={13} />
            Perlu Segera Dimasak ({urgentCount})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('fresh')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              filterTab === 'fresh'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Masih Sangat Segar
          </button>

          <button
            type="button"
            onClick={() => setFilterTab('consumed')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              filterTab === 'consumed'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Sudah Dikonsumsi
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Pengguna: <strong className="text-slate-800">{currentUser?.name}</strong>
        </div>
      </div>

      {/* Item Cards */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-4xl mb-2">🥗</div>
          <h4 className="font-bold text-slate-700 text-sm">Tidak Ada Item pada Kategori Ini</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Bahan makanan segar yang Anda beli melalui checkout Dvh Grocery akan otomatis tercatat di sini dengan estimasi masa simpannya.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.trackerId}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: item.statusBg, color: item.statusColor }}
                      >
                        {item.statusLabel}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar size={11} /> {item.purchasedAt ? new Date(item.purchasedAt).toLocaleDateString('id-ID') : 'Hari ini'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 truncate mt-1">
                      {item.name}
                    </h4>
                    <div className="text-xs text-slate-500">{item.unit}</div>
                  </div>
                </div>

                {/* Freshness Bar */}
                {item.status !== 'consumed' && (
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" />
                        Sisa Masa Simpan:
                      </span>
                      <strong style={{ color: item.statusColor }}>
                        {item.remainingDays > 0 ? `${item.remainingDays} Hari Lagi` : 'Harus segera diolah'}
                      </strong>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.freshnessPercent}%`,
                          backgroundColor: item.statusColor
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Storage Tip */}
                <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-start gap-2 mb-3">
                  <Info size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <strong className="text-slate-700">Tips Penyimpanan:</strong> {item.storageTip}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                {item.status !== 'consumed' ? (
                  <button
                    type="button"
                    onClick={() => handleMarkConsumed(item.trackerId, item.name)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle size={14} /> Tandai Sudah Dikonsumsi / Habis
                  </button>
                ) : (
                  <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1">
                    <CheckCircle size={13} className="text-slate-400" /> Bahan makanan telah dinikmati
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => removeTrackerItem(item.trackerId)}
                  className="text-slate-300 hover:text-rose-500 p-1.5 transition-colors"
                  title="Hapus dari daftar tracker"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
