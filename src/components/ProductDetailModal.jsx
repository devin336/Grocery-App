import React, { useState } from 'react';
import { X, Clock, ShieldCheck, Truck, Sparkles, CheckCircle2, AlertTriangle, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';

export default function ProductDetailModal({ product, onClose, onShowToast }) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  const cartItem = cartItems.find((i) => i.id === product.id);
  const currentQty = cartItem ? cartItem.quantity : 0;
  const [selectedQty, setSelectedQty] = useState(currentQty > 0 ? currentQty : 1);

  const formatPrice = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

  const discount = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleAddToCart = () => {
    const res = addToCart(product, selectedQty);
    if (res && res.message) {
      if (onShowToast) onShowToast(res.message, 'warning');
    } else {
      if (onShowToast) onShowToast(`${selectedQty}x ${product.name} masuk keranjang!`, 'success');
      onClose();
    }
  };

  const handleIncrement = () => {
    if (selectedQty < product.stock) {
      const next = selectedQty + 1;
      setSelectedQty(next);
      if (currentQty > 0) {
        updateQuantity(product.id, next);
      }
    } else {
      if (onShowToast) onShowToast(`Maksimal stok tersedia hanya ${product.stock}`, 'warning');
    }
  };

  const handleDecrement = () => {
    if (selectedQty > 1) {
      const next = selectedQty - 1;
      setSelectedQty(next);
      if (currentQty > 0) {
        updateQuantity(product.id, next);
      }
    }
  };

  return (
    <div className="dvh-modal-overlay" onClick={onClose}>
      <div
        className="dvh-modal-content max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="dvh-modal-close"
          onClick={onClose}
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left: Image & Freshness Badges */}
          <div className="relative flex flex-col items-center">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center relative shadow-sm">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80';
                }}
              />
              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
                  Hemat {discount}%
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  if (onShowToast) onShowToast(!isFavorite ? 'Disimpan ke favorit' : 'Dihapus dari favorit', 'info');
                }}
                className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                  isFavorite ? 'bg-rose-50 text-rose-500 shadow-md' : 'bg-white/80 text-slate-500 hover:text-rose-500'
                }`}
                title="Favorit"
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Smart Freshness Tag Box */}
            <div className="w-full mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Smart Freshness Tracker</span>
                  <span>Masa simpan optimal: <strong>{product.expiry_days} hari</strong></span>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 font-bold rounded-md">
                100% Segar
              </span>
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                {product.category}
              </div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug mb-1">
                {product.name}
              </h2>
              <div className="text-sm text-slate-500 mb-3">
                Satuan: <span className="font-medium text-slate-700">{product.unit}</span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-black text-emerald-600">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>

              {/* Stock status */}
              <div className="mb-4">
                {product.stock > 10 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    Stok Tersedia: <strong className="text-slate-800">{product.stock} pcs</strong>
                  </span>
                ) : product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <AlertTriangle size={13} className="text-amber-600" />
                    Stok Menipis! Sisa <strong>{product.stock} pcs</strong>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
                    Stok Habis
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-b border-slate-100 py-3 mb-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Deskripsi Produk
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-5">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <Truck size={15} className="text-emerald-600" />
                  <span>Garansi 15 Mnt Sampai</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <ShieldCheck size={15} className="text-emerald-600" />
                  <span>Jaminan Kualitas 100%</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity controller */}
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={selectedQty <= 1}
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-slate-900 text-sm">
                    {selectedQty}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={selectedQty >= product.stock}
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>

                {/* Add / Update Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-between text-sm"
                >
                  <span>{currentQty > 0 ? 'Perbarui Keranjang' : '+ Keranjang'}</span>
                  <span>{formatPrice(product.price * selectedQty)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
