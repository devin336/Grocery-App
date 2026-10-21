import React from 'react';
import { Plus, Minus, AlertCircle } from 'lucide-react';

export default function QuantitySelector({
  quantity = 0,
  stock = 99,
  onAdd,
  onIncrement,
  onDecrement,
  size = 'medium', // 'small' | 'medium' | 'large'
  disabled = false,
  showLabel = true
}) {
  const isOutOfStock = stock <= 0;
  const isMaxStock = quantity >= stock;

  const sizeClasses = {
    small: {
      btn: 'h-7 w-7 text-xs',
      container: 'h-7 text-xs px-1',
      addBtn: 'py-1 px-3 text-xs'
    },
    medium: {
      btn: 'h-8 w-8 text-sm',
      container: 'h-8 text-sm px-1.5',
      addBtn: 'py-1.5 px-4 text-sm'
    },
    large: {
      btn: 'h-10 w-10 text-base',
      container: 'h-10 text-base px-2',
      addBtn: 'py-2 px-6 text-base font-semibold'
    }
  }[size] || {
    btn: 'h-8 w-8 text-sm',
    container: 'h-8 text-sm px-1.5',
    addBtn: 'py-1.5 px-4 text-sm'
  };

  if (isOutOfStock) {
    return (
      <button
        disabled
        className="dvh-qty-outofstock"
        title="Maaf, stok produk habis"
      >
        Habis
      </button>
    );
  }

  if (quantity === 0) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onAdd();
        }}
        className={`dvh-btn-add ${sizeClasses.addBtn}`}
        title={`Tambah ke keranjang (Tersedia ${stock})`}
      >
        <Plus size={size === 'small' ? 14 : 16} strokeWidth={2.5} />
        {showLabel && <span>Tambah</span>}
      </button>
    );
  }

  return (
    <div
      className={`dvh-qty-controller ${sizeClasses.container}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDecrement();
        }}
        className="dvh-qty-btn dvh-qty-btn-minus"
        title="Kurangi kuantitas"
      >
        <Minus size={size === 'small' ? 13 : 15} strokeWidth={2.5} />
      </button>

      <span className="dvh-qty-value font-bold" title={`Kuantitas: ${quantity}`}>
        {quantity}
      </span>

      <button
        type="button"
        disabled={isMaxStock || disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!isMaxStock) onIncrement();
        }}
        className={`dvh-qty-btn dvh-qty-btn-plus ${isMaxStock ? 'opacity-40 cursor-not-allowed' : ''}`}
        title={isMaxStock ? `Stok maksimal (${stock})` : 'Tambah kuantitas'}
      >
        <Plus size={size === 'small' ? 13 : 15} strokeWidth={2.5} />
      </button>
    </div>
  );
}
