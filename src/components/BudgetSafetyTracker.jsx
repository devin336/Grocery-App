import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShieldCheck, AlertTriangle, AlertOctagon, TrendingUp, Sparkles, CheckCircle2, ShoppingCart, Sliders, ArrowRight } from 'lucide-react';

export default function BudgetSafetyTracker({ onOpenCart, onShowToast }) {
  const { cartItems, subtotal, totalItems } = useCart();

  // Student grocery budget (persisted in localStorage)
  const [budgetLimit, setBudgetLimit] = useState(() => {
    try {
      const saved = localStorage.getItem('dvh_student_budget');
      return saved ? Number(saved) : 300000; // Default Rp 300.000 for student monthly grocery
    } catch (e) {
      return 300000;
    }
  });

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(budgetLimit);

  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = Number(tempBudget);
    if (val > 0) {
      setBudgetLimit(val);
      localStorage.setItem('dvh_student_budget', val.toString());
      setIsEditingBudget(false);
      if (onShowToast) onShowToast(`Target anggaran bulanan diatur ke ${formatPrice(val)}`, 'success');
    }
  };

  const remainingBudget = budgetLimit - subtotal;
  const usagePercent = Math.min(100, Math.round((subtotal / budgetLimit) * 100));

  // Determine safety status
  let statusColor = '#059669'; // Green
  let statusBadge = '🟢 Zona Aman & Hemat';
  let statusDesc = 'Belanjaan troli Anda masih di bawah 70% budget. Sangat aman!';
  let statusIcon = ShieldCheck;

  if (subtotal > budgetLimit) {
    statusColor = '#ef4444'; // Red
    statusBadge = '🔴 PERINGATAN: Melebihi Anggaran!';
    statusDesc = `Troli melebihi budget sebesar ${formatPrice(Math.abs(remainingBudget))}. Pertimbangkan kurangi camilan!`;
    statusIcon = AlertOctagon;
  } else if (usagePercent >= 75) {
    statusColor = '#f59e0b'; // Amber
    statusBadge = '🟡 Zona Waspada (Mendekati Limit)';
    statusDesc = 'Pengeluaran telah mencapai lebih dari 75% anggaran belanja rantau.';
    statusIcon = AlertTriangle;
  }

  // Category breakdown in trolley
  const categorySpending = {};
  cartItems.forEach((item) => {
    const cat = item.category || 'Lainnya';
    categorySpending[cat] = (categorySpending[cat] || 0) + item.price * item.quantity;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-lg border border-slate-700/60 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400 uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Budget Safety Tracker</span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditingBudget(!isEditingBudget)}
            className="text-[11px] font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-xl transition-all"
          >
            {isEditingBudget ? 'Batal' : 'Ubah Target'}
          </button>
        </div>

        {/* Budget Setting Input Form */}
        {isEditingBudget ? (
          <form onSubmit={handleSaveBudget} className="my-2 p-3 bg-slate-950/80 rounded-2xl border border-slate-700 space-y-2">
            <label className="text-[11px] text-slate-300 font-bold block">
              Tentukan Target Anggaran Belanja (Rp):
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={tempBudget}
                onChange={(e) => setTempBudget(e.target.value)}
                step={25000}
                min={50000}
                className="flex-1 text-xs font-black p-2 bg-slate-800 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3.5 py-2 rounded-xl transition-all"
              >
                Simpan
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="text-[11px] text-slate-400 font-semibold">
              Target Anggaran Belanja Siswa:
            </div>
            <div className="text-2xl font-black text-white tracking-tight">
              {formatPrice(budgetLimit)}
            </div>
          </div>
        )}

        {/* Big Meter Card */}
        <div className="mt-4 p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Terpakai di Troli ({totalItems} item):</span>
            <span className="font-black text-white text-sm">{formatPrice(subtotal)}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${usagePercent}%`,
                backgroundColor: statusColor
              }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="font-extrabold" style={{ color: statusColor }}>
              {statusBadge}
            </span>
            <span className="text-slate-300 font-bold">
              {usagePercent}% dari Limit
            </span>
          </div>
        </div>

        {/* Remaining Budget Pill */}
        <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-700/60">
          <span className="text-slate-300 font-medium">Sisa Uang Belanja Aman:</span>
          <strong className={`font-black text-sm ${remainingBudget < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {formatPrice(remainingBudget)}
          </strong>
        </div>
      </div>

      {/* Safety Alert Box */}
      <div
        className="p-3.5 rounded-2xl border text-xs font-medium space-y-1"
        style={{
          backgroundColor: statusColor === '#ef4444' ? '#fef2f2' : statusColor === '#f59e0b' ? '#fffbeb' : '#ecfdf5',
          borderColor: statusColor === '#ef4444' ? '#fecaca' : statusColor === '#f59e0b' ? '#fde68a' : '#a7f3d0',
          color: statusColor === '#ef4444' ? '#991b1b' : statusColor === '#f59e0b' ? '#92400e' : '#065f46'
        }}
      >
        <div className="font-bold flex items-center gap-1.5 text-xs">
          {React.createElement(statusIcon, { size: 16 })}
          <span>Panduan Penghematan Rantau</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          {statusDesc}
        </p>
      </div>

      {/* Trolley Category Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <ShoppingCart size={15} className="text-emerald-600" />
            <span>Alokasi Belanjaan di Troli</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-bold">
            {cartItems.length} Macam Produk
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs">
            Troli Anda masih kosong. Masukkan kebutuhan pokok atau sayur dari menu Belanja!
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(categorySpending).map(([catName, amount]) => {
              const catPercent = Math.round((amount / subtotal) * 100);
              return (
                <div key={catName} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 truncate">{catName}</span>
                    <span className="font-black text-slate-900">{formatPrice(amount)} ({catPercent}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={onOpenCart}
              className="w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <span>Periksa & Sesuaikan Isi Troli</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Rantau Grocery Tips */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-3.5 space-y-2 text-xs text-slate-600">
        <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1">
          💡 Tips Belanja Troli Supermarket Siswa:
        </h4>
        <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
          <li>Pilih sayur hidroponik lokal seperti bayam & kangkung (tahan 3-4 hari di kulkas kost).</li>
          <li>Ambil telur ayam omega & dada ayam sebagai sumber protein paling hemat per gram.</li>
          <li>Gunakan voucher promo <code className="text-emerald-700 font-bold">DVHCEPAT</code> untuk potongan ongkir gratis.</li>
        </ul>
      </div>
    </div>
  );
}
