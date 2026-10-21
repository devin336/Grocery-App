import React, { useState, useMemo } from 'react';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { categories, products } from './data/products';

import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import AuthModal from './components/AuthModal';
import PromoBanners from './components/PromoBanners';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import ProfileModal from './components/ProfileModal';
import SmartGroceryTracker from './components/SmartGroceryTracker';
import BudgetSafetyTracker from './components/BudgetSafetyTracker';
import FilterDrawer from './components/FilterDrawer';
import Toast from './components/Toast';

import {
  Flame,
  Sparkles,
  TrendingUp,
  Carrot,
  ShieldCheck,
  Clock,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ShoppingBag,
  Wallet
} from 'lucide-react';

export default function App() {
  const { currentUser, isAuthenticated, isLoadingAuth } = useAuth();
  const { activeTrackingOrder, setActiveTrackingOrder } = useCart();

  // Navigation: 'belanja' | 'anggaran' | 'kesegaran' | 'riwayat'
  const [activeTab, setActiveTab] = useState('belanja');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'relevance',
    minPrice: '',
    maxPrice: '',
    flashSaleOnly: false,
    freshOnly: false,
    inStockOnly: false
  });

  const [visibleCount, setVisibleCount] = useState(20);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      sortBy: 'relevance',
      minPrice: '',
      maxPrice: '',
      flashSaleOnly: false,
      freshOnly: false,
      inStockOnly: false
    });
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const hasActiveFilters = Boolean(
    filters.sortBy !== 'relevance' ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.flashSaleOnly ||
    filters.freshOnly ||
    filters.inStockOnly ||
    selectedCategory
  );

  // Filtered products list
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.flashSaleOnly) {
      result = result.filter((p) => p.is_flash_sale);
    }

    if (filters.freshOnly) {
      result = result.filter((p) => p.expiry_days && p.expiry_days <= 7);
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    if (filters.sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'discount') {
      result.sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, filters]);

  // Section collections
  const flashSaleItems = useMemo(() => {
    return products.filter((p) => p.is_flash_sale).slice(0, 6);
  }, [products]);

  const sayurMayurItems = useMemo(() => {
    return products.filter((p) => p.category_id === 'cat-sayur').slice(0, 6);
  }, [products]);

  const minumanItems = useMemo(() => {
    return products.filter((p) => p.category_id === 'cat-minuman').slice(0, 6);
  }, [products]);

  // Mandatory Auth Guard
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
            Memuat Dvh Grocery PWA...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return <AuthModal onShowToast={showToast} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center selection:bg-emerald-500 selection:text-white">
      {/* Mobile Smartphone Frame: Exactly max-w-[430px] centered */}
      <div className="w-full max-w-[430px] min-h-screen bg-slate-50 flex flex-col relative shadow-2xl border-x border-slate-800/40">
        
        {/* Mobile Top Navbar */}
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (activeTab !== 'belanja') setActiveTab('belanja');
          }}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenProfile={() => setActiveTab('riwayat')}
          onOpenTracker={() => setActiveTab('kesegaran')}
          onOpenFilter={() => setIsFilterOpen(true)}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Scrollable Mobile Body */}
        <main className="flex-1 px-3.5 py-3.5 overflow-y-auto">
          {/* TAB 1: BELANJA (KATALOG LENGKAP & KATEGORI MURNI) */}
          {activeTab === 'belanja' && (
            <div className="space-y-5 pb-24">
              {/* Promo Carousel Banners */}
              {!searchQuery && !selectedCategory && (
                <PromoBanners
                  onSelectFlashSale={() => {
                    setFilters((prev) => ({ ...prev, flashSaleOnly: true }));
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  onSelectFreshProduce={() => {
                    setSelectedCategory('Sayur Mayur');
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                />
              )}

              {/* Pure Categories Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Kategori Pilihan Siswa
                  </h3>
                  {selectedCategory && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      Reset Kategori
                    </button>
                  )}
                </div>

                <CategoryBar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(catName) => {
                    setSelectedCategory(catName);
                    setVisibleCount(20);
                  }}
                />
              </div>

              {/* If Searching or Filter Active */}
              {searchQuery || hasActiveFilters ? (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div>
                      <h2 className="text-sm font-black text-slate-900 leading-tight">
                        {searchQuery
                          ? `Cari: "${searchQuery}"`
                          : selectedCategory
                          ? `${selectedCategory}`
                          : 'Filter Produk'}
                      </h2>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        {filteredProducts.length} produk siap antar
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg flex items-center gap-1"
                    >
                      <RotateCcw size={11} />
                      <span>Reset</span>
                    </button>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-5">
                      <div className="text-4xl mb-2">🔍</div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        Produk Tidak Ditemukan
                      </h4>
                      <p className="text-xs text-slate-500 mb-3">
                        Coba sesuaikan kata kunci atau bersihkan filter harga Anda.
                      </p>
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                      >
                        Tampilkan Semua Produk
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2.5">
                      {filteredProducts.slice(0, visibleCount).map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpenDetail={setSelectedProduct}
                          onShowToast={showToast}
                        />
                      ))}
                    </div>
                  )}

                  {filteredProducts.length > visibleCount && (
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((prev) => prev + 20)}
                        className="w-full bg-white text-slate-800 border border-slate-200 font-extrabold text-xs py-3 rounded-2xl shadow-2xs flex items-center justify-center gap-1.5 active:bg-slate-50"
                      >
                        <span>Muat {filteredProducts.length - visibleCount} Produk Lagi</span>
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Curated Section Feeds */
                <div className="space-y-6">
                  {/* Section 1: Flash Sale Kilat */}
                  <section className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                          <Flame size={14} />
                        </div>
                        <h2 className="text-xs font-black text-slate-900 tracking-tight">
                          ⚡ Flash Sale Kilat (Harga Murah)
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFilters((prev) => ({ ...prev, flashSaleOnly: true }))}
                        className="text-[11px] font-extrabold text-emerald-600"
                      >
                        Lihat Semua →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {flashSaleItems.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpenDetail={setSelectedProduct}
                          onShowToast={showToast}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Section 2: Sayur Mayur Segar (Pure Vegetables) */}
                  <section className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <Carrot size={14} />
                        </div>
                        <h2 className="text-xs font-black text-slate-900 tracking-tight">
                          🥬 Sayur Mayur (Panen Hidroponik)
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('Sayur Mayur')}
                        className="text-[11px] font-extrabold text-emerald-600"
                      >
                        Semua ({products.filter((p) => p.category_id === 'cat-sayur').length}) →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {sayurMayurItems.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpenDetail={setSelectedProduct}
                          onShowToast={showToast}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Section 3: Minuman Dingin, Susu & Soda (Pure Drinks) */}
                  <section className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
                          🥤
                        </div>
                        <h2 className="text-xs font-black text-slate-900 tracking-tight">
                          🥤 Minuman Dingin, Susu & Soda
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('Minuman & Susu')}
                        className="text-[11px] font-extrabold text-emerald-600"
                      >
                        Semua ({products.filter((p) => p.category_id === 'cat-minuman').length}) →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {minumanItems.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpenDetail={setSelectedProduct}
                          onShowToast={showToast}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Section 4: Seluruh Katalog (520+ Produk) */}
                  <section className="space-y-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        🛒 Seluruh Katalog ({products.length} Produk)
                      </h2>
                      <button
                        type="button"
                        onClick={() => setIsFilterOpen(true)}
                        className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-xl shadow-2xs flex items-center gap-1"
                      >
                        <SlidersHorizontal size={12} />
                        <span>Filter</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {products.slice(0, visibleCount).map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onOpenDetail={setSelectedProduct}
                          onShowToast={showToast}
                        />
                      ))}
                    </div>

                    {products.length > visibleCount && (
                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => setVisibleCount((prev) => prev + 24)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3.5 rounded-2xl shadow-md shadow-emerald-600/25 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>Tampilkan {products.length - visibleCount} Produk Lagi</span>
                          <ChevronDown size={15} />
                        </button>
                      </div>
                    )}
                  </section>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ANGGARAN (SMART BUDGET SAFETY TRACKER SISWA RANTAU) */}
          {activeTab === 'anggaran' && (
            <BudgetSafetyTracker
              onOpenCart={() => setIsCartOpen(true)}
              onShowToast={showToast}
            />
          )}

          {/* TAB 3: KESEGARAN (SMART GROCERY TRACKER) */}
          {activeTab === 'kesegaran' && (
            <div className="space-y-4 pb-20">
              <SmartGroceryTracker onShowToast={showToast} />
            </div>
          )}

          {/* TAB 4: RIWAYAT & PROFIL */}
          {activeTab === 'riwayat' && (
            <div className="space-y-4 pb-20">
              <ProfileModal
                isOpen={true}
                isEmbedded={true}
                onClose={() => setActiveTab('belanja')}
                onOpenOrderTracker={(order) => {
                  setActiveTrackingOrder(order);
                  setIsTrackerModalOpen(true);
                }}
                onShowToast={showToast}
              />
            </div>
          )}
        </main>

        {/* Floating Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* MODALS & BOTTOM SHEETS */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onShowToast={showToast}
          />
        )}

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onOpenCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
          onShowToast={showToast}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onShowOrderTracker={(order) => {
            setActiveTrackingOrder(order);
            setIsTrackerModalOpen(true);
          }}
          onShowToast={showToast}
        />

        {isTrackerModalOpen && activeTrackingOrder && (
          <OrderTrackerModal
            order={activeTrackingOrder}
            onClose={() => setIsTrackerModalOpen(false)}
            onOpenGroceryTracker={() => {
              setIsTrackerModalOpen(false);
              setActiveTab('kesegaran');
            }}
          />
        )}

        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    </div>
  );
}
