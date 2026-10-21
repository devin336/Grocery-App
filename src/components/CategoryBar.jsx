import React from 'react';
import {
  Carrot,
  Fish,
  Snowflake,
  Coffee,
  Cookie,
  Utensils,
  Sandwich,
  LayoutGrid
} from 'lucide-react';

export default function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
  const iconMap = {
    'cat-1': Carrot,
    'cat-2': Fish,
    'cat-3': Snowflake,
    'cat-4': Coffee,
    'cat-5': Cookie,
    'cat-6': Utensils,
    'cat-7': Sandwich
  };

  return (
    <div className="py-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 min-w-max pb-1">
        {/* All Products pill */}
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedCategory === null
              ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/10'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <LayoutGrid size={15} />
          <span>Semua (525+ Produk)</span>
        </button>

        {/* 7 Category Pills */}
        {categories.map((cat) => {
          const IconComp = iconMap[cat.id] || LayoutGrid;
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <IconComp size={15} className={isSelected ? 'text-white' : 'text-emerald-600'} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
