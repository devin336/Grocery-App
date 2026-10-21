import React from 'react';
import { useCart } from '../context/CartContext';
import QuantitySelector from './QuantitySelector';
import { Sparkles, Clock, Flame } from 'lucide-react';

export default function ProductCard({ product, onOpenDetail, onShowToast }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((i) => i.id === product.id);
  const currentQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    const res = addToCart(product, 1);
    if (res && res.message) {
      if (onShowToast) onShowToast(res.message, 'warning');
    } else {
      if (onShowToast) onShowToast(`${product.name} ditambahkan ke keranjang`, 'success');
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
      className="dvh-card-product group"
      onClick={() => onOpenDetail(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpenDetail(product);
      }}
    >
      {/* Top Image Box */}
      <div className="dvh-card-img-wrap">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="dvh-card-img"
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
            <Flame size={12} className="inline mr-1 animate-pulse" /> Flash Sale
          </span>
        ) : product.badge ? (
          <span className="dvh-badge-tag">
            {product.badge}
          </span>
        ) : null}

        {/* Freshness / Expiry Tracker indicator */}
        {product.expiry_days && product.expiry_days <= 14 && (
          <div className="dvh-freshness-pill" title={`Daya simpan segar: ${product.expiry_days} hari`}>
            <Clock size={11} />
            <span>Segar ~{product.expiry_days}hr</span>
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="dvh-card-body">
        <div className="dvh-card-unit">{product.unit || 'per pack'}</div>

        <h3 className="dvh-card-title line-clamp-2" title={product.name}>
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="dvh-card-price-row">
          <div>
            {product.original_price && product.original_price > product.price && (
              <span className="dvh-card-price-orig">
                {formatPrice(product.original_price)}
              </span>
            )}
            <div className="dvh-card-price-final">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Interactive Quantity Controller */}
          <div onClick={(e) => e.stopPropagation()}>
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
