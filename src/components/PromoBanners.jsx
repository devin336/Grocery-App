import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Clock, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function PromoBanners({ onSelectFlashSale, onSelectFreshProduce }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      tag: '⚡ FLASH SALE HARI INI',
      title: 'Diskon Spesial Hingga 45%',
      subtitle: 'Bahan segar, daging, dan kebutuhan dapur favorit dengan harga promo kilat!',
      btnText: 'Lihat Flash Sale',
      action: onSelectFlashSale,
      bg: 'from-amber-600 via-orange-600 to-rose-600',
      badgeBg: 'bg-amber-300 text-amber-950',
      icon: Zap,
      emoji: '⚡'
    },
    {
      id: 2,
      tag: '🚀 QUICK COMMERCE 15 MENIT',
      title: 'Belanja Tiba Cepat & Dingin',
      subtitle: 'Diantar langsung dari Dark Store terdekat dengan insulated cooler bag higienis.',
      btnText: 'Belanja Sekarang',
      action: () => {},
      bg: 'from-emerald-700 via-teal-700 to-emerald-900',
      badgeBg: 'bg-emerald-300 text-emerald-950',
      icon: Clock,
      emoji: '🛵'
    },
    {
      id: 3,
      tag: '🌱 100% SEGAR DARI KEBUN',
      title: 'Sayur & Buah Segar Panen Hari Ini',
      subtitle: 'Kualitas hidroponik organik tanpa pestisida berbahaya, dipetik langsung subuh tadi.',
      btnText: 'Pilih Sayur Segar',
      action: onSelectFreshProduce,
      bg: 'from-teal-800 via-emerald-800 to-cyan-900',
      badgeBg: 'bg-teal-200 text-teal-950',
      icon: Sparkles,
      emoji: '🥑'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners.length]);

  const activeBanner = banners[currentSlide];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all mb-6">
      <div
        className={`bg-gradient-to-r ${activeBanner.bg} text-white p-6 sm:p-8 flex items-center justify-between min-h-[170px] relative transition-all duration-700`}
      >
        <div className="max-w-xl z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md bg-white/20 text-white">
            <activeBanner.icon size={13} />
            <span>{activeBanner.tag}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            {activeBanner.title}
          </h2>

          <p className="text-xs sm:text-sm text-white/90 line-clamp-2 max-w-md">
            {activeBanner.subtitle}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={activeBanner.action}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 group"
            >
              <span>{activeBanner.btnText}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Decorative Graphic */}
        <div className="text-7xl sm:text-8xl select-none opacity-40 sm:opacity-90 transition-transform duration-500 hover:scale-110">
          {activeBanner.emoji}
        </div>
      </div>

      {/* Prev / Next controls */}
      <button
        type="button"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Slide selanjutnya"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {banners.map((b, idx) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
            }`}
            aria-label={`Pindah ke slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
