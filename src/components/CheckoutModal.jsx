import React, { useState } from 'react';
import { X, MapPin, CreditCard, Clock, ChevronRight, ShieldCheck, Check, Smartphone, Building, Banknote } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, onShowOrderTracker, onShowToast }) {
  const { currentUser, getUserAddresses } = useAuth();
  const {
    cartItems,
    subtotal,
    shippingFee,
    serviceFee,
    discountAmount,
    finalTotal,
    appliedVoucher,
    createOrder
  } = useCart();

  const savedAddresses = getUserAddresses();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [courierNote, setCourierNote] = useState('');
  const [deliverySpeed, setDeliverySpeed] = useState('15_min');
  const [paymentMethod, setPaymentMethod] = useState('GoPay');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentAddress = savedAddresses[selectedAddressIndex] || {
    label: 'Alamat Pengiriman',
    recipient: currentUser?.name || 'Pelanggan Dvh',
    phone: currentUser?.phone || '081234567890',
    address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan'
  };

  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  const paymentOptions = [
    {
      group: 'E-Wallet (Instan & Cepat)',
      options: [
        { id: 'GoPay', name: 'GoPay', icon: '🟢', sub: 'Hubungkan akun GoPay' },
        { id: 'OVO', name: 'OVO Cash', icon: '🟣', sub: 'OVO Points tersedia' },
        { id: 'ShopeePay', name: 'ShopeePay', icon: '🟠', sub: 'Cashback koin' },
        { id: 'DANA', name: 'DANA Dompet Digital', icon: '🔵', sub: 'Saldo instan' }
      ]
    },
    {
      group: 'Transfer Bank (Virtual Account Otomatis)',
      options: [
        { id: 'BCA_VA', name: 'BCA Virtual Account', icon: '🏦', sub: 'Verifikasi instan 24 jam' },
        { id: 'Mandiri_VA', name: 'Mandiri Virtual Account', icon: '🏦', sub: 'Livin by Mandiri' },
        { id: 'BRI_VA', name: 'BRI Virtual Account (BRIVA)', icon: '🏦', sub: 'BRImo' }
      ]
    },
    {
      group: 'Bayar di Tempat',
      options: [
        { id: 'COD', name: 'Cash On Delivery (COD)', icon: '💵', sub: 'Bayar tunai ke kurir saat barang tiba' }
      ]
    }
  ];

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        address: currentAddress,
        courierNote: courierNote.trim() || currentAddress.notes || 'Pagar hitam, tolong bel bila sampai',
        paymentMethod: paymentMethod,
        deliverySpeed: deliverySpeed
      });

      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if not supported
      }

      if (onShowToast) {
        onShowToast(`Pesanan #${order?.id} berhasil dibuat! Kurir bersiap mengantar 15 menit.`, 'success');
      }

      onClose();
      if (onShowOrderTracker) {
        onShowOrderTracker(order);
      }
    }, 600);
  };

  return (
    <div className="dvh-modal-overlay" onClick={onClose}>
      <div
        className="dvh-modal-content max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} className="text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-800">Checkout & Pembayaran</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Section 1: Alamat Pengiriman */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin size={15} className="text-emerald-600" /> Alamat Pengiriman
            </h3>

            {savedAddresses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedAddresses.map((addr, idx) => (
                  <div
                    key={addr.id || idx}
                    onClick={() => setSelectedAddressIndex(idx)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedAddressIndex === idx
                        ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        {addr.label}
                        {addr.isDefault && (
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-normal">
                            Utama
                          </span>
                        )}
                      </span>
                      {selectedAddressIndex === idx && (
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="font-medium text-slate-700">{addr.recipient} ({addr.phone})</div>
                    <p className="text-slate-500 line-clamp-2 mt-1">{addr.address}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                {currentAddress.address}
              </div>
            )}

            {/* Courier Note Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Catatan Khusus untuk Kurir (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Pagar warna hitam / titip di meja satpam / bel rusak"
                value={courierNote}
                onChange={(e) => setCourierNote(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Section 2: Kecepatan Pengiriman */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={15} className="text-emerald-600" /> Waktu Pengiriman
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setDeliverySpeed('15_min')}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                  deliverySpeed === '15_min'
                    ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-2xl">⚡</div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    Dvh Flash 15 Menit
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Super Kilat
                    </span>
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    Estimasi tiba dalam 12 - 15 menit langsung dari Dark Store Senopati.
                  </div>
                </div>
              </div>

              <div
                onClick={() => setDeliverySpeed('scheduled')}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                  deliverySpeed === 'scheduled'
                    ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-2xl">📅</div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">Jadwal Pagi Hari (Besok)</div>
                  <div className="text-slate-500 mt-0.5">
                    Dikirim besok pagi antara pukul 07:00 - 08:30 WIB agar bahan tetap paling segar.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Metode Pembayaran */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard size={15} className="text-emerald-600" /> Metode Pembayaran
            </h3>

            <div className="space-y-3">
              {paymentOptions.map((group) => (
                <div key={group.group} className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400">{group.group}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.options.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          paymentMethod === opt.id
                            ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 font-semibold'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span className="text-lg">{opt.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-slate-800 font-bold truncate">{opt.name}</div>
                          <div className="text-[11px] text-slate-400 truncate">{opt.sub}</div>
                        </div>
                        {paymentMethod === opt.id && (
                          <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                            ✓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Ringkasan Pembayaran */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-800 text-sm mb-2">Rincian Pembayaran</div>
            <div className="flex justify-between text-slate-600">
              <span>Subtotal ({cartItems.length} Produk)</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Biaya Pengiriman Quick-Commerce</span>
              {shippingFee === 0 ? (
                <span className="font-bold text-emerald-600">GRATIS</span>
              ) : (
                <span className="font-semibold">{formatPrice(shippingFee)}</span>
              )}
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Biaya Layanan</span>
              <span className="font-semibold">{formatPrice(serviceFee)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Diskon Promo Voucher ({appliedVoucher?.code})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2 mt-2">
              <span>Total Pembayaran Akhir</span>
              <span className="text-emerald-600 text-base">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>

        {/* Footer Place Order Button */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            type="button"
            disabled={isSubmitting || cartItems.length === 0}
            onClick={handlePlaceOrder}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-between text-sm disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Memproses Pesanan...' : 'Buat Pesanan & Bayar'}</span>
            <span className="font-black">{formatPrice(finalTotal)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
