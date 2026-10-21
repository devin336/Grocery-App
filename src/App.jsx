import React, { useState, useMemo } from 'react';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { categories, products } from './data/products';

import Navbar from './components/Navbar';
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
import FilterDrawer from './components/FilterDrawer';
import Toast from './components/Toast';

import {
  Flame,
  Sparkles,
  TrendingUp,
  Carrot,
  ShieldCheck,
  Clock,
  Truck,
  RotateCcw,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const { currentUser, isAuthenticated, isLoadingAuth } = useAuth();
  const { activeTrackingOrder, setActiveTrackingOrder } = useCart();

  // Navigation & Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);

  // Home View State: 'home' | 'tracker_view'
  const [currentView, setCurrentView] = useState('home');

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

  // Display pagination / items per page
  const [visibleCount, setVisibleCount] = useState(24);

  // Toast notification state
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

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Min Price
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }

    // Max Price
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    // Flash sale only
    if (filters.flashSaleOnly) {
      result = result.filter((p) => p.is_flash_sale);
    }

    // Fresh only (< 7 days)
    if (filters.freshOnly) {
      result = result.filter((p) => p.expiry_days && p.expiry_days <= 7);
    }

    // In stock only
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sorting
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
    return products.filter((p) => p.is_flash_sale).slice(0, 8);
  }, [products]);

  const bestSellerItems = useMemo(() => {
    return products.filter((p) => p.rating >= 4.8).slice(0, 8);
  }, [products]);

  const freshProduceItems = useMemo(() => {
    return products.filter((p) => p.category_id === 'cat-1').slice(0, 8);
  }, [products]);

  // MANDATORY AUTHENTICATION GUARD
  // If not logged in, catalog, cart, checkout, profile are strictly inaccessible.
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-300">
            Memuat Dvh Grocery...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return <AuthModal onShowToast={showToast} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Global Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenTracker={() => setCurrentView((v) => (v === 'home' ? 'tracker_view' : 'home'))}
        onOpenFilter={() => setIsFilterOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-5 w-full">
        {/* Toggle between Home Catalog and Smart Freshness Tracker View */}
        {currentView === 'tracker_view' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentView('home')}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                ← Kembali ke Belanja Produk
              </button>
            </div>
            <SmartGroceryTracker onShowToast={showToast} />
          </div>
        ) : (
          /* HOME VIEW */
          <div className="space-y-8">
            {/* Promo Carousel Banners */}
            {!searchQuery && !selectedCategory && (
              <PromoBanners
                onSelectFlashSale={() => {
                  setFilters((prev) => ({ ...prev, flashSaleOnly: true }));
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                onSelectFreshProduce={() => {
                  setSelectedCategory('Sayur & Buah Segar');
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
              />
            )}

            {/* Quick Categories Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Kategori Pilihan (7 Kategori Segar)
                </h3>
                {selectedCategory && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
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
                  setVisibleCount(24);
                }}
              />
            </div>

            {/* If user is searching or filtering, show search results directly */}
            {searchQuery || hasActiveFilters ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {searchQuery
                        ? `Hasil Pencarian: "${searchQuery}"`
                        : selectedCategory
                        ? `Kategori: ${selectedCategory}`
                        : 'Hasil Filter Produk'}
                    </h2>
                    <span className="text-xs text-slate-500">
                      Ditemukan {filteredProducts.length} dari 525+ produk segar
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <RotateCcw size={12} />
                    <span>Reset Semua Filter</span>
                  </button>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-6">
                    <div className="text-5xl mb-3">🔍</div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">
                      Produk Tidak Ditemukan
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                      Coba ganti kata kunci pencarian atau sesuaikan filter harga dan kategori Anda.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
                    >
                      Tampilkan Semua 525+ Produk
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
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

                {/* Load More Button */}
                {filteredProducts.length > visibleCount && (
                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 24)}
                      className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs py-3 px-8 rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
                    >
                      <span>Muat Lebih Banyak ({filteredProducts.length - visibleCount} produk tersisa)</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* DEFAULT HOME CURATED SECTIONS */
              <div className="space-y-10">
                {/* Section 1: Flash Sale Kilat */}
                <section className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-amber-500 text-white shadow-sm shadow-amber-500/20">
                        <Flame size={18} />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                          <span>⚡ Flash Sale Hari Ini</span>
                          <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                            Berakhir Dalam 02:45:10
                          </span>
                        </h2>
                        <span className="text-xs text-slate-500 hidden sm:inline">
                          Potongan harga fantastis untuk stok terbatas
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, flashSaleOnly: true }))}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      Lihat Semua ({products.filter((p) => p.is_flash_sale).length}) →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-4">
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

                {/* Section 2: Sayur & Buah Segar Hari Ini */}
                <section className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/20">
                        <Carrot size={18} />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                          🌱 Sayur & Buah Segar Pagi Ini
                        </h2>
                        <span className="text-xs text-slate-500 hidden sm:inline">
                          Panen hidroponik segar, terlacak kesegarannya di Smart Grocery Tracker
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCategory('Sayur & Buah Segar')}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      Lihat Semua ({products.filter((p) => p.category_id === 'cat-1').length}) →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-4">
                    {freshProduceItems.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onOpenDetail={setSelectedProduct}
                        onShowToast={showToast}
                      />
                    ))}
                  </div>
                </section>

                {/* Section 3: Produk Terlaris (Best Seller) */}
                <section className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-600/20">
                        <TrendingUp size={18} />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                          🔥 Paling Banyak Dibeli (Best Seller)
                        </h2>
                        <span className="text-xs text-slate-500 hidden sm:inline">
                          Rating tertinggi ⭐ 4.8+ dari ribuan pelanggan Dvh Grocery
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, sortBy: 'rating' }))}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      Urutkan Rating Tertinggi →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-4">
                    {bestSellerItems.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onOpenDetail={setSelectedProduct}
                        onShowToast={showToast}
                      />
                    ))}
                  </div>
                </section>

                {/* Section 4: Seluruh Katalog Produk (525+ Produk) */}
                <section className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                        🛒 Seluruh Katalog Dvh Grocery (525+ Produk Siap Antar)
                      </h2>
                      <span className="text-xs text-slate-500">
                        Semua stok bahan pangan, lauk segar, susu, dan kebutuhan harian
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(true)}
                      className="text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <SlidersHorizontal size={13} />
                      <span>Filter & Urutkan</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
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
                    <div className="text-center pt-6">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((prev) => prev + 30)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-8 rounded-xl shadow-md shadow-emerald-600/20 transition-all inline-flex items-center gap-2"
                      >
                        <span>Tampilkan Lebih Banyak ({products.length - visibleCount} Produk Lagi)</span>
                        <ChevronDown size={15} />
                      </button>
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="mt-16 bg-white border-t border-slate-200 text-xs text-slate-500 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-black text-slate-900 text-base">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">
                D
              </span>
              <span>Dvh Grocery</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Smart Grocery & Quick Commerce Tracker. Belanja kebutuhan dapur, makanan segar, dan minuman dingin sampai dalam 15 menit.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">
              Keunggulan Layanan
            </h4>
            <div className="flex items-center gap-1.5"><Truck size={13} className="text-emerald-600" /> Pengiriman 15 Menit Kilat</div>
            <div className="flex items-center gap-1.5"><Clock size={13} className="text-emerald-600" /> Smart Freshness Tracker</div>
            <div className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-emerald-600" /> Garansi Bahan 100% Segar</div>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">
              Area Dark Store Aktif
            </h4>
            <p className="text-[11px]">Dark Store Senopati • SCBD • Sudirman • Kebayoran • Thamrin • Kuningan</p>
          </div>

          <div className="space-y-1 text-right md:text-left">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">
              Data Privacy Guard
            </h4>
            <p className="text-[11px]">
              Sistem isolasi pengguna terenkripsi. Sesi aktif terikat pada ID: <code className="text-emerald-700 font-mono font-bold">{currentUser?.id}</code>
            </p>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onShowToast={showToast}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onShowToast={showToast}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onShowOrderTracker={(order) => {
          setActiveTrackingOrder(order);
          setIsTrackerModalOpen(true);
        }}
        onShowToast={showToast}
      />

      {/* Live Order Tracker Modal */}
      {isTrackerModalOpen && activeTrackingOrder && (
        <OrderTrackerModal
          order={activeTrackingOrder}
          onClose={() => setIsTrackerModalOpen(false)}
          onOpenGroceryTracker={() => {
            setIsTrackerModalOpen(false);
            setCurrentView('tracker_view');
          }}
        />
      )}

      {/* User Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenOrderTracker={(order) => {
          setActiveTrackingOrder(order);
          setIsTrackerModalOpen(true);
        }}
        onShowToast={showToast}
      />

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
