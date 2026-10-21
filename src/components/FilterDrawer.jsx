import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

export default function FilterDrawer({
  isOpen,
  onClose,
  categories,
  filters,
  onFilterChange,
  onResetFilters
}) {
  if (!isOpen) return null;

  const sortOptions = [
    { id: 'relevance', label: 'Paling Relevan (Default)' },
    { id: 'price_asc', label: 'Harga: Termurah ke Termahal' },
    { id: 'price_desc', label: 'Harga: Termahal ke Termurah' },
    { id: 'rating', label: 'Rating Tertinggi ⭐' },
    { id: 'discount', label: 'Diskon Terbesar 🔥' }
  ];

  return (
    <div className="dvh-drawer-overlay" onClick={onClose}>
      <div
        className="dvh-drawer-content max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="dvh-drawer-header">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-emerald-600" />
            <h2 className="text-base font-bold text-slate-800">Filter & Urutkan</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Urutkan Berdasarkan */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Urutkan Berdasarkan
            </label>
            <div className="space-y-1">
              {sortOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => onFilterChange('sortBy', opt.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                    filters.sortBy === opt.id
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{opt.label}</span>
                  {filters.sortBy === opt.id && <Check size={14} className="text-emerald-600" />}
                </div>
              ))}
            </div>
          </div>

          {/* Rentang Harga */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Rentang Harga (Rp)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Minimum</span>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => onFilterChange('minPrice', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Maksimum</span>
                <input
                  type="number"
                  placeholder="150000"
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Filter Khusus Quick-Commerce */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Kriteria Khusus
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.flashSaleOnly}
                onChange={(e) => onFilterChange('flashSaleOnly', e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span>Hanya Produk Flash Sale ⚡</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.freshOnly}
                onChange={(e) => onFilterChange('freshOnly', e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span>Bahan Segar Panen Cepat (&lt; 7 Hari) 🌱</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span>Hanya yang Tersedia Stok (In Stock)</span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 py-3 px-4 rounded-xl transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-sm"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );
}
