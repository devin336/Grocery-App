import React from 'react';
import {
  Carrot,
  Apple,
  Fish,
  Coffee,
  Snowflake,
  Cookie,
  Utensils,
  Sandwich,
  LayoutGrid,
  Sparkles
} from 'lucide-react';

export default function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
  const iconMap = {
    'cat-sayur': Carrot,
    'cat-buah': Apple,
    'cat-minuman': Coffee,
    'cat-daging': Fish,
    'cat-frozen': Snowflake,
    'cat-snack': Cookie,
    'cat-pokok': Utensils,
    'cat-ready': Sandwich
  };

  return (
    <div className="space-y-2.5">
      {/* Horizontal Scrollable Category Pills */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2.5 min-w-max pb-1">
          {/* Semua Produk Pill */}
          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/25 ring-2 ring-slate-900 scale-[1.02]'
                : 'bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200/90 shadow-2xs'
            }`}
          >
            <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-xs">
              🌟
            </span>
            <span>Semua (520+ Produk)</span>
          </button>

          {/* Individual Category Buttons */}
          {categories.map((cat) => {
            const IconComp = iconMap[cat.id] || LayoutGrid;
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                <span className="text-base leading-none select-none">{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Category Card Grid (Featured Categories) */}
      {!selectedCategory && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-1">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.gradient} text-white flex items-center justify-center text-2xl shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300`}
              >
                {cat.emoji}
              </div>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight line-clamp-1">
                {cat.name}
              </h4>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                {cat.badgeText || 'Pilihan Segar'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
