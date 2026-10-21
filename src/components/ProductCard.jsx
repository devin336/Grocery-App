import React from 'react';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';
import { Clock, Flame, Star } from 'lucide-react';

export default function ProductCard({ product, onOpenDetail, onShowToast }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((i) => i.id === product.id);
  const currentQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    const res = addToCart(product, 1);
    if (res && res.message) {
      if (onShowToast) onShowToast(res.message, 'warning');
    } else {
      if (onShowToast) onShowToast(`${product.name} masuk keranjang!`, 'success');
    }
  };

  const handleIncrement = () => {
    const res = updateQuantity(product.id, currentQty + 1);
    if (res && res.message) {
      if (onShowToast) onShowToast(res.message, 'warning');
    }
  };

  const handleDecrement = () => {
    updateQuantity(product.id, currentQty - 1);
  };

  const formatPrice = (val) => {
    return 'Rp ' + Number(val || 0).toLocaleString('id-ID');
  };

  const discount = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div
      className="dvh-card-product group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 p-2.5 flex flex-col justify-between"
      onClick={() => onOpenDetail(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpenDetail(product);
      }}
    >
      {/* Top Image Box */}
      <div className="dvh-card-img-wrap rounded-xl overflow-hidden aspect-square bg-slate-50 relative flex items-center justify-center">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="dvh-card-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80';
          }}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="dvh-badge-discount">
            {discount}% OFF
          </span>
        )}

        {/* Product Tag / Flash Sale Badge */}
        {product.is_flash_sale ? (
          <span className="dvh-badge-flash">
            <Flame size={11} className="inline mr-0.5 animate-pulse" /> Flash Sale
          </span>
        ) : product.badge ? (
          <span className="dvh-badge-tag">
            {product.badge}
          </span>
        ) : null}

        {/* Freshness / Expiry Tracker indicator */}
        {product.expiry_days && product.expiry_days <= 14 && (
          <div className="dvh-freshness-pill" title={`Daya simpan segar: ${product.expiry_days} hari`}>
            <Clock size={10} />
            <span>~{product.expiry_days}hr</span>
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="dvh-card-body pt-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-0.5">
            <span className="truncate max-w-[100px]">{product.unit || 'pack'}</span>
            <span className="flex items-center gap-0.5 text-amber-500 font-bold">
              <Star size={11} fill="currentColor" /> {product.rating || '4.8'}
            </span>
          </div>

          <h3 className="dvh-card-title text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-2" title={product.name}>
            {product.name}
          </h3>
        </div>

        {/* Price Row & Morphing Quantity Button */}
        <div className="dvh-card-price-row flex items-end justify-between gap-1 pt-1 border-t border-slate-100/80">
          <div className="flex-1 min-w-0">
            {product.original_price && product.original_price > product.price && (
              <span className="dvh-card-price-orig text-[10px] text-slate-400 line-through block leading-tight">
                {formatPrice(product.original_price)}
              </span>
            )}
            <div className="dvh-card-price-final text-xs sm:text-sm font-extrabold text-emerald-600 truncate">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Quantity Selector */}
          <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
            <QuantitySelector
              quantity={currentQty}
              stock={product.stock}
              onAdd={handleAdd}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
