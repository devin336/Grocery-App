import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, MapPin, Phone, MessageSquare, ArrowRight, Sparkles, Navigation, PackageCheck, Bike } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderTrackerModal({ order, onClose, onOpenGroceryTracker }) {
  const { updateOrderStatus } = useCart();
  const [currentStep, setCurrentStep] = useState(order?.step || 1);
  const [etaSeconds, setEtaSeconds] = useState(14 * 60); // 14 mins

  useEffect(() => {
    if (order?.step) {
      setCurrentStep(order.step);
    }
  }, [order?.step]);

  // ETA Countdown timer
  useEffect(() => {
    if (currentStep >= 4) return;
    const interval = setInterval(() => {
      setEtaSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStep]);

  if (!order) return null;

  const minutes = Math.floor(etaSeconds / 60);
  const seconds = etaSeconds % 60;
  const formattedCountdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const steps = [
    { num: 1, title: 'Pesanan Diterima', desc: 'Diverifikasi oleh sistem Dvh Hub', icon: PackageCheck },
    { num: 2, title: 'Bahan Segar Sedang Dikemas', desc: 'Picker memilih produk kualitas terbaik di Dark Store', icon: Sparkles },
    { num: 3, title: 'Kurir OTW Mengantar', desc: 'Menuju lokasi Anda dengan insulated cooler bag', icon: Bike },
    { num: 4, title: 'Pesanan Tiba & Selesai', desc: 'Bahan segar siap dimasak atau disimpan di kulkas', icon: CheckCircle2 }
  ];

  const handleNextSimulationStep = () => {
    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);

      let status = 'Diproses';
      if (next === 3) status = 'Sedang Diantar';
      if (next === 4) status = 'Selesai';

      updateOrderStatus(order.id, { step: next, status });
    }
  };

  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  return (
    <div className="dvh-modal-overlay" onClick={onClose}>
      <div
        className="dvh-modal-content max-w-xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-emerald-600 text-white rounded-t-2xl">
          <div>
            <div className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">
              Smart Quick-Commerce Tracker
            </div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              Pesanan #{order.id}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-100 hover:text-white hover:bg-emerald-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* ETA Hero Card */}
          <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md flex items-center justify-between">
            <div>
              <div className="text-xs text-emerald-100 flex items-center gap-1.5 font-medium">
                <Clock size={14} /> Estimasi Pesanan Tiba
              </div>
              <div className="text-3xl font-black tracking-tight mt-0.5">
                {currentStep === 4 ? 'Sudah Sampai! 🎉' : `${formattedCountdown} Menit`}
              </div>
              <div className="text-xs text-emerald-100 mt-1">
                {currentStep === 4
                  ? 'Bahan segar Anda telah tiba di tujuan.'
                  : 'Garansi sampai tepat waktu dalam 15 menit.'}
              </div>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl">
              {currentStep === 4 ? '🏡' : currentStep === 3 ? '🛵' : '🥦'}
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status Pengiriman Realtime
              </h3>
              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={handleNextSimulationStep}
                  className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                >
                  Simulasi Langkah Selanjutnya ⚡
                </button>
              )}
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {steps.map((st) => {
                const isPassed = currentStep >= st.num;
                const isCurrent = currentStep === st.num;
                const IconComponent = st.icon;

                return (
                  <div key={st.num} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 scale-110'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? '✓' : st.num}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <IconComponent
                          size={16}
                          className={isCurrent ? 'text-emerald-600' : isPassed ? 'text-emerald-500' : 'text-slate-400'}
                        />
                        <h4
                          className={`text-xs font-bold ${
                            isCurrent ? 'text-emerald-700 text-sm' : isPassed ? 'text-slate-800' : 'text-slate-400'
                          }`}
                        >
                          {st.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Info Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                🛵
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  {order.courier?.name || 'Budi Santoso'}
                  <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-semibold">
                    ⭐ 4.9
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {order.courier?.motor || 'Honda Vario 160 (B 4821 KLO)'}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                  Insulated Cooler Bag Aktif (Bahan Segar Terjaga)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Menghubungi kurir: ${order.courier?.phone || '0812-9988-7766'}`)}
                className="p-2.5 rounded-full bg-white border border-slate-200 text-emerald-600 hover:bg-emerald-50 shadow-sm"
                title="Telepon Kurir"
              >
                <Phone size={16} />
              </button>
              <button
                type="button"
                onClick={() => alert('Fitur chat kurir siap melayani')}
                className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm"
                title="Chat Kurir"
              >
                <MessageSquare size={16} />
              </button>
            </div>
          </div>

          {/* Destination Address & Note */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin size={15} className="text-emerald-600" /> Lokasi Pengiriman
            </div>
            <div className="font-semibold text-slate-800">{order.recipient} ({order.phone})</div>
            <div className="text-slate-500">{order.address}</div>
            {order.notes && (
              <div className="p-2 bg-amber-50 rounded-lg text-amber-900 border border-amber-200 text-[11px]">
                <strong>Catatan:</strong> {order.notes}
              </div>
            )}
          </div>

          {/* Items Purchased Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Barang Belanjaan ({order.items?.length || 0} Macam)
              </h4>
              <span className="text-xs font-bold text-emerald-600">
                Total: {formatPrice(order.total)}
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-8 h-8 rounded object-cover flex-shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-semibold text-slate-800 truncate">{item.name}</div>
                      <div className="text-slate-400 text-[11px]">{item.quantity}x • {item.unit}</div>
                    </div>
                  </div>
                  <span className="font-bold text-slate-700 flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenGroceryTracker) onOpenGroceryTracker();
            }}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-600/20 text-xs flex items-center justify-center gap-2"
          >
            <Sparkles size={15} />
            <span>Pantau di Smart Grocery Tracker</span>
          </button>
        </div>
      </div>
    </div>
  );
}
