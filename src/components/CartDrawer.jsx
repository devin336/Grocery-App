import React, { useState } from 'react';
import { X, Trash2, Tag, ShoppingBag, ArrowRight, Truck, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';

export default function CartDrawer({ isOpen, onClose, onOpenCheckout, onShowToast }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    originalSubtotal,
    totalSavings,
    shippingFee,
    serviceFee,
    discountAmount,
    finalTotal,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    freeShippingThreshold,
    freeShippingRemaining,
    isFreeShipping
  } = useCart();

  const [voucherInput, setVoucherInput] = useState('');

  if (!isOpen) return null;

  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  const handleApplyVoucher = (codeToApply) => {
    const code = codeToApply || voucherInput;
    if (!code) return;
    const res = applyVoucher(code);
    if (res.success) {
      if (onShowToast) onShowToast(res.message, 'success');
      setVoucherInput('');
    } else {
      if (onShowToast) onShowToast(res.message, 'warning');
    }
  };

  const progressPct = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  return (
    <div className="dvh-drawer-overlay" onClick={onClose}>
      <div
        className="dvh-drawer-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="dvh-drawer-header">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-800">
              Keranjang Belanja ({cartItems.length} Produk)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-rose-500 hover:text-rose-700 font-semibold px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                title="Kosongkan seluruh keranjang"
              >
                Kosongkan
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Tutup Keranjang"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Free Shipping Tracker Bar */}
        <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <Truck size={14} className="text-emerald-600" />
              {isFreeShipping ? (
                <span className="text-emerald-700 font-bold">🎉 Selamat! Kamu mendapatkan GRATIS ONGKIR!</span>
              ) : (
                <span>
                  Tambah <strong className="text-emerald-700">{formatPrice(freeShippingRemaining)}</strong> lagi untuk <strong>GRATIS ONGKIR</strong>
                </span>
              )}
            </span>
            <span className="text-emerald-700">{progressPct}%</span>
          </div>
          <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Item List / Empty State */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4">
                <ShoppingBag size={36} />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">
                Keranjang Belanja Kosong
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mb-6">
                Yuk pilih sayur, buah segar, daging, dan kebutuhan dapur favoritmu sekarang!
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-all"
              >
                Mulai Belanja Sekarang
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-slate-200 transition-all"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-slate-50"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate mb-0.5">
                      {item.name}
                    </h4>
                    <div className="text-[11px] text-slate-400 mb-1">
                      {item.unit} • {formatPrice(item.price)}
                    </div>
                    <div className="text-xs font-bold text-emerald-600">
                      Subtotal: {formatPrice(itemTotal)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                      title="Hapus item"
                    >
                      <Trash2 size={14} />
                    </button>
                    <QuantitySelector
                      quantity={item.quantity}
                      stock={item.stock}
                      onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                      onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                      size="small"
                      showLabel={false}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Checkout & Breakdown Section */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-200 bg-white p-5 space-y-4 shadow-lg">
            {/* Voucher Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Punya kode promo? (DVHCEPAT)"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                    className="w-full text-xs font-semibold pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleApplyVoucher()}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
                >
                  Terapkan
                </button>
              </div>

              {/* Quick voucher chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['DVHCEPAT', 'SEGARHEMAT', 'DVHNEW15'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleApplyVoucher(code)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                  >
                    <Sparkles size={10} /> {code}
                  </button>
                ))}
              </div>

              {/* Applied Voucher Pill */}
              {appliedVoucher && (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check size={14} className="text-emerald-600" />
                    <span>
                      Voucher <strong>{appliedVoucher.code}</strong> aktif! ({formatPrice(discountAmount)})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeVoucher}
                    className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-slate-800">{formatPrice(subtotal)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Hemat Diskon Produk</span>
                  <span>-{formatPrice(totalSavings)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Biaya Pengiriman (15 Menit)</span>
                {shippingFee === 0 ? (
                  <span className="font-bold text-emerald-600">GRATIS</span>
                ) : (
                  <span className="font-semibold text-slate-800">{formatPrice(shippingFee)}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan & Pengemasan Ramah Lingkungan</span>
                <span className="font-semibold text-slate-800">{formatPrice(serviceFee)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Potongan Promo Voucher</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2 mt-2">
                <span>Total Pembayaran</span>
                <span className="text-emerald-600 text-base">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-between shadow-md shadow-emerald-600/25 transition-all text-sm group"
            >
              <span>Lanjut ke Checkout</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {formatPrice(finalTotal)} <ArrowRight size={16} />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
