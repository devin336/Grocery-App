/**
 * Dvh Kids Grocery | Belanja Ceria & Uang Saku Pintar
 * Pink Pastel Kids Theme with Complete Account Creation & Login System
 */

// ==========================================
// 1. DATA MODELS & CONSTANTS
// ==========================================
const STORAGE_KEYS = {
  ACTIVE_USER: 'dvh_grocery_active_user_v3',
  ACCOUNTS_LIST: 'dvh_grocery_accounts_v3',
  CART: 'dvh_grocery_cart_v3',
  HISTORY: 'dvh_grocery_history_v3',
  LOOKUP: 'dvh_grocery_lookup_v3'
};

const CATEGORIES = [
  { id: 'all', name: '🌟 Semua', icon: 'sparkles', color: 'bg-pink-100 text-pink-700 border-pink-300' },
  { id: 'sayur', name: '🥬 Sayur Sehat', icon: 'salad', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'minuman', name: '🥤 Minuman & Susu', icon: 'coffee', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
  { id: 'buah', name: '🍎 Buah Manis', icon: 'apple', color: 'bg-lime-100 text-lime-800 border-lime-300' },
  { id: 'camilan', name: '🍪 Biskuit & Camilan', icon: 'cookie', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'daging', name: '🍳 Sarapan & Lauk', icon: 'drumstick', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  { id: 'sembako', name: '🌾 Sembako Dapur', icon: 'wheat', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'kebersihan', name: '🧼 Mandi Wangi', icon: 'sparkles', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'peralatan', name: '🔧 Peralatan', icon: 'wrench', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'lainnya', name: 'Lainnya', icon: 'tag', color: 'bg-slate-100 text-slate-700 border-slate-300' }
];

// Initial mock items for newly created cart
const DEFAULT_KIDS_CART = [
  {
    id: 'mock-1',
    name: 'Bayam Hijau Segar Kelinci',
    category: 'sayur',
    unit: 'ikat',
    qty: 2,
    unitPrice: 6000,
    lastMonthPrice: 5500,
    discountRaw: '0',
    createdAt: Date.now() - 400000
  },
  {
    id: 'mock-2',
    name: 'Susu UHT Ultra Milk Strawberry 200ml',
    category: 'minuman',
    unit: 'kotak',
    qty: 3,
    unitPrice: 6000,
    lastMonthPrice: 5500,
    discountRaw: '0',
    createdAt: Date.now() - 300000
  },
  {
    id: 'mock-3',
    name: 'Biskuit Roma Kelapa Manis',
    category: 'camilan',
    unit: 'pack',
    qty: 1,
    unitPrice: 9500,
    lastMonthPrice: 9500,
    discountRaw: '10%',
    createdAt: Date.now() - 200000
  },
  {
    id: 'mock-4',
    name: 'Pisang Cavendish Sunpride',
    category: 'buah',
    unit: 'sisir',
    qty: 1,
    unitPrice: 18000,
    lastMonthPrice: 20000,
    discountRaw: '0',
    createdAt: Date.now() - 100000
  },
  {
    id: 'mock-5',
    name: 'Sosis Kanzler Singles Original',
    category: 'daging',
    unit: 'pcs',
    qty: 2,
    unitPrice: 9000,
    lastMonthPrice: 9000,
    discountRaw: '50%+20%',
    createdAt: Date.now() - 50000
  }
];

// 1-Tap Quick Catalog Carousel items (User can tap + to add immediately)
const QUICK_CATALOG_ITEMS = [
  { name: 'Bayam Hijau Kelinci', category: 'sayur', unit: 'ikat', price: 6000, lastMonthPrice: 5500, discount: '' },
  { name: 'Wortel Manis Kelinci', category: 'sayur', unit: 'kg', price: 12000, lastMonthPrice: 12000, discount: '' },
  { name: 'Brokoli Hijau Super', category: 'sayur', unit: 'pack', price: 18000, lastMonthPrice: 20000, discount: '' },
  { name: 'Susu Ultra Strawberry', category: 'minuman', unit: 'kotak', price: 6000, lastMonthPrice: 5500, discount: '' },
  { name: 'Yakult Probiotik (5 botol)', category: 'minuman', unit: 'pack', price: 11000, lastMonthPrice: 10500, discount: '' },
  { name: 'Air Aqua Dingin 1.5L', category: 'minuman', unit: 'botol', price: 7000, lastMonthPrice: 6500, discount: '' },
  { name: 'Milo Kotak Cokelat', category: 'minuman', unit: 'kotak', price: 6000, lastMonthPrice: 6000, discount: '' },
  { name: 'Pisang Sunpride Manis', category: 'buah', unit: 'sisir', price: 18000, lastMonthPrice: 20000, discount: '' },
  { name: 'Apel Fuji Merah', category: 'buah', unit: 'kg', price: 38000, lastMonthPrice: 40000, discount: '' },
  { name: 'Wafer Tango Cokelat', category: 'camilan', unit: 'pack', price: 8500, lastMonthPrice: 8500, discount: '' },
  { name: 'Biskuit Marie Susu', category: 'camilan', unit: 'pack', price: 10000, lastMonthPrice: 10000, discount: '' },
  { name: 'Nugget Fiesta Dinosaurus', category: 'daging', unit: 'pack', price: 48000, lastMonthPrice: 46000, discount: '10%' },
  { name: 'Sosis Kanzler Siap Makan', category: 'daging', unit: 'pcs', price: 9000, lastMonthPrice: 9000, discount: '' },
  { name: 'Telur Ayam Rebus 1kg', category: 'daging', unit: 'kg', price: 31000, lastMonthPrice: 32000, discount: '' }
];

// Product lookup database for instant autofill
const MOCK_LOOKUP = {
  // Sayur Sehat
  'bayam hijau segar kelinci': { price: 6000, unit: 'ikat', category: 'sayur' },
  'bayam': { price: 6000, unit: 'ikat', category: 'sayur' },
  'wortel manis kelinci': { price: 12000, unit: 'kg', category: 'sayur' },
  'wortel': { price: 12000, unit: 'kg', category: 'sayur' },
  'brokoli hijau super': { price: 18000, unit: 'pack', category: 'sayur' },
  'brokoli': { price: 18000, unit: 'pack', category: 'sayur' },
  'kangkung segar': { price: 5000, unit: 'ikat', category: 'sayur' },
  'kangkung': { price: 5000, unit: 'ikat', category: 'sayur' },
  'tomat merah segar': { price: 9000, unit: 'kg', category: 'sayur' },
  'tomat': { price: 9000, unit: 'kg', category: 'sayur' },

  // Minuman & Susu
  'susu uht ultra milk strawberry 200ml': { price: 6000, unit: 'kotak', category: 'minuman' },
  'susu ultra strawberry': { price: 6000, unit: 'kotak', category: 'minuman' },
  'susu': { price: 6000, unit: 'kotak', category: 'minuman' },
  'yakult probiotik (5 botol)': { price: 11000, unit: 'pack', category: 'minuman' },
  'yakult': { price: 11000, unit: 'pack', category: 'minuman' },
  'air aqua dingin 1.5l': { price: 7000, unit: 'botol', category: 'minuman' },
  'aqua': { price: 7000, unit: 'botol', category: 'minuman' },
  'milo kotak cokelat': { price: 6000, unit: 'kotak', category: 'minuman' },
  'milo': { price: 6000, unit: 'kotak', category: 'minuman' },
  'susu ultra milk 1l': { price: 19500, unit: 'liter', category: 'minuman' },

  // Buah
  'pisang cavendish sunpride': { price: 18000, unit: 'sisir', category: 'buah' },
  'pisang': { price: 18000, unit: 'sisir', category: 'buah' },
  'apel fuji merah': { price: 38000, unit: 'kg', category: 'buah' },
  'apel': { price: 38000, unit: 'kg', category: 'buah' },
  'jeruk manis': { price: 26000, unit: 'kg', category: 'buah' },
  'jeruk': { price: 26000, unit: 'kg', category: 'buah' },

  // Camilan
  'biskuit roma kelapa manis': { price: 9500, unit: 'pack', category: 'camilan' },
  'biskuit': { price: 9500, unit: 'pack', category: 'camilan' },
  'wafer tango cokelat': { price: 8500, unit: 'pack', category: 'camilan' },
  'wafer': { price: 8500, unit: 'pack', category: 'camilan' },
  'cokelat': { price: 12000, unit: 'pcs', category: 'camilan' },

  // Lauk & Sarapan
  'sosis kanzler singles original': { price: 9000, unit: 'pcs', category: 'daging' },
  'sosis': { price: 9000, unit: 'pcs', category: 'daging' },
  'nugget fiesta dinosaurus': { price: 48000, unit: 'pack', category: 'daging' },
  'nugget': { price: 48000, unit: 'pack', category: 'daging' },
  'telur ayam rebus 1kg': { price: 31000, unit: 'kg', category: 'daging' },
  'telur': { price: 31000, unit: 'kg', category: 'daging' }
};

// ==========================================
// 2. AUDIO & HAPTIC SYSTEM
// ==========================================
class FeedbackEngine {
  constructor() {
    this.audioCtx = null;
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  vibrate(pattern = 15) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  playBeep(freq = 520, type = 'sine', duration = 0.08, volume = 0.06) {
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  tap() {
    this.vibrate(10);
    this.playBeep(580, 'sine', 0.04, 0.03);
  }

  increment() {
    this.vibrate(15);
    this.playBeep(780, 'sine', 0.06, 0.05);
  }

  decrement() {
    this.vibrate(15);
    this.playBeep(440, 'triangle', 0.06, 0.04);
  }

  success() {
    this.vibrate([30, 40, 30]);
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      [587, 659, 784, 880, 1046].forEach((f, i) => {
        setTimeout(() => this.playBeep(f, 'sine', 0.1, 0.06), i * 70);
      });
    } catch (e) {}
  }

  dangerAlert() {
    this.vibrate([90, 50, 90, 50, 100]);
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      this.playBeep(340, 'sawtooth', 0.15, 0.08);
      setTimeout(() => this.playBeep(280, 'sawtooth', 0.25, 0.09), 140);
    } catch (e) {}
  }
}

const feedback = new FeedbackEngine();

// ==========================================
// 3. DISCOUNT & CALCULATION ENGINE
// ==========================================
const Calculator = {
  calculateDiscount(unitPrice, discountRaw) {
    if (!discountRaw || String(discountRaw).trim() === '') {
      return {
        finalUnitPrice: unitPrice,
        savingPerUnit: 0,
        discountText: null,
        isDiscounted: false
      };
    }

    const str = String(discountRaw).trim();
    let finalUnitPrice = unitPrice;
    let discountText = '';

    if (str.includes('+')) {
      const parts = str.split('+').map(p => p.trim());
      let current = unitPrice;
      let validParts = [];

      parts.forEach(p => {
        const num = parseFloat(p.replace(/[^0-9.]/g, ''));
        if (!isNaN(num) && num > 0) {
          validParts.push(`${num}%`);
          current = current * (1 - num / 100);
        }
      });

      if (validParts.length > 0) {
        finalUnitPrice = Math.max(0, Math.round(current));
        discountText = validParts.join('+');
      }
    } else if (str.includes('%')) {
      const pct = parseFloat(str.replace(/[^0-9.]/g, ''));
      if (!isNaN(pct) && pct > 0) {
        finalUnitPrice = Math.max(0, Math.round(unitPrice * (1 - Math.min(100, pct) / 100)));
        discountText = `${pct}%`;
      }
    } else {
      const num = parseFloat(str.replace(/[^0-9.]/g, ''));
      if (!isNaN(num) && num > 0) {
        if (num <= 100) {
          finalUnitPrice = Math.max(0, Math.round(unitPrice * (1 - num / 100)));
          discountText = `${num}%`;
        } else {
          finalUnitPrice = Math.max(0, Math.round(unitPrice - num));
          discountText = `-Rp ${formatRupiahNumber(num)}`;
        }
      }
    }

    const savingPerUnit = Math.max(0, unitPrice - finalUnitPrice);
    const isDiscounted = savingPerUnit > 0;

    return {
      finalUnitPrice,
      savingPerUnit,
      discountText: isDiscounted ? discountText : null,
      isDiscounted
    };
  },

  getItemTotals(item) {
    const discountInfo = this.calculateDiscount(item.unitPrice, item.discountRaw);
    const finalUnit = discountInfo.finalUnitPrice;
    const subtotal = finalUnit * (item.qty || 1);
    const totalSaving = discountInfo.savingPerUnit * (item.qty || 1);

    return {
      finalUnitPrice: finalUnit,
      savingPerUnit: discountInfo.savingPerUnit,
      discountText: discountInfo.discountText,
      isDiscounted: discountInfo.isDiscounted,
      subtotal,
      totalSaving
    };
  }
};

function formatRupiah(num) {
  const n = Math.round(Number(num) || 0);
  return 'Rp ' + n.toLocaleString('id-ID');
}

function formatRupiahNumber(num) {
  const n = Math.round(Number(num) || 0);
  return n.toLocaleString('id-ID');
}

function parseRupiahInput(val) {
  if (typeof val === 'number') return val;
  const cleaned = String(val).replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

function formatDateIndo(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ==========================================
// 3.5. FIREBASE INTEGRATION & REALTIME CLOUD SYNC
// ==========================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAhtJ6TS6IxXKe49eb5nZqJgRWTLda3pq4",
  authDomain: "dvh-grocery.firebaseapp.com",
  projectId: "dvh-grocery",
  storageBucket: "dvh-grocery.firebasestorage.app",
  messagingSenderId: "255581478806",
  appId: "1:255581478806:web:5b3774b875587998aac7b7"
};

class FirebaseSyncService {
  constructor() {
    this.db = null;
    this.sessionDocRef = null;
    this.store = null;
    this.debounceTimer = null;
    this.isApplyingCloudUpdate = false;
    this.status = 'initializing';
  }

  init(store) {
    this.store = store;

    // Check if Firebase Compat SDK is present
    if (typeof firebase === 'undefined') {
      console.warn('[Firebase] SDK is not loaded. Operating in Offline LocalStorage mode.');
      this.updateStatus('offline', 'Mode Celengan Lokal');
      return;
    }

    try {
      // Initialize Firebase App
      const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE_CONFIG);
      this.db = firebase.firestore(app);

      // Enable offline persistence if supported
      try {
        this.db.enablePersistence({ synchronizeTabs: true }).catch(err => {
          if (err.code === 'failed-precondition') {
            console.info('[Firebase] Persistence enabled in another tab.');
          } else if (err.code === 'unimplemented') {
            console.info('[Firebase] Persistence not supported by current browser.');
          }
        });
      } catch (e) {}

      this.setupUserDoc();
      this.updateStatus('connecting', 'Menghubungkan Cloud...');

      window.addEventListener('online', () => {
        this.updateStatus('connecting', 'Online, Menyinkronkan...');
        this.syncNow();
      });
      window.addEventListener('offline', () => {
        this.updateStatus('offline', 'Mode Celengan Lokal');
      });

      const syncPill = document.getElementById('cloud-sync-pill');
      if (syncPill) {
        syncPill.style.cursor = 'pointer';
        syncPill.addEventListener('click', () => {
          feedback.tap();
          this.syncNow();
        });
      }

      this.listenToCloud();
    } catch (err) {
      console.error('[Firebase] Initialization error:', err);
      this.updateStatus('offline', 'Mode Celengan Lokal');
    }
  }

  setupUserDoc() {
    if (!this.db) return;
    const user = (this.store && this.store.currentUser && this.store.currentUser.username)
      ? this.store.currentUser.username.toLowerCase().trim()
      : 'guest';
    this.sessionDocRef = this.db.collection('grocery_users').doc(user).collection('sessions').doc('active_trip');
  }

  reconnectForUser() {
    if (!this.db) return;
    this.setupUserDoc();
    this.listenToCloud();
  }

  listenToCloud() {
    if (!this.sessionDocRef) return;

    this.sessionDocRef.onSnapshot(
      { includeMetadataChanges: true },
      (snapshot) => {
        if (this.isApplyingCloudUpdate) return;

        if (snapshot.exists) {
          const cloudData = snapshot.data();
          const fromCache = snapshot.metadata.fromCache;
          const hasPendingWrites = snapshot.metadata.hasPendingWrites;

          this.applyCloudData(cloudData);

          if (hasPendingWrites) {
            this.updateStatus('syncing', 'Menyimpan ke Cloud...');
          } else if (fromCache) {
            this.updateStatus('synced', 'Celengan Cloud (Cache)');
          } else {
            this.updateStatus('synced', 'Celengan Cloud Aktif');
          }
        } else {
          this.syncNow();
        }
      },
      (error) => {
        console.warn('[Firebase] Firestore notice:', error.code, error.message);
        this.updateStatus('offline', 'Mode Celengan Lokal');
      }
    );
  }

  applyCloudData(data) {
    if (!data || !this.store) return;
    this.isApplyingCloudUpdate = true;

    try {
      let stateChanged = false;

      if (Array.isArray(data.cart)) {
        if (JSON.stringify(this.store.cart) !== JSON.stringify(data.cart)) {
          this.store.cart = data.cart;
          stateChanged = true;
        }
      }

      if (typeof data.budgetLimit === 'number' && this.store.budgetLimit !== data.budgetLimit) {
        this.store.budgetLimit = data.budgetLimit;
        stateChanged = true;
      }

      if (data.priceLookup && typeof data.priceLookup === 'object') {
        const mergedLookup = { ...this.store.priceLookup, ...data.priceLookup };
        if (JSON.stringify(this.store.priceLookup) !== JSON.stringify(mergedLookup)) {
          this.store.priceLookup = mergedLookup;
          stateChanged = true;
        }
      }

      if (Array.isArray(data.history)) {
        if (JSON.stringify(this.store.history) !== JSON.stringify(data.history)) {
          this.store.history = data.history;
          stateChanged = true;
        }
      }

      if (stateChanged) {
        this.store.saveUserState();
        this.store.listeners.forEach(fn => fn(this.store));
      }
    } finally {
      this.isApplyingCloudUpdate = false;
    }
  }

  triggerDebouncedSync() {
    if (this.isApplyingCloudUpdate || !this.sessionDocRef) return;

    this.updateStatus('syncing', 'Menyimpan...');

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.syncNow();
    }, 600);
  }

  async syncNow() {
    if (!this.sessionDocRef || !this.store || !this.store.currentUser) return;

    try {
      const payload = {
        cart: this.store.cart,
        budgetLimit: this.store.budgetLimit,
        priceLookup: this.store.priceLookup,
        history: this.store.history,
        user: {
          username: this.store.currentUser.username,
          name: this.store.currentUser.name,
          avatar: this.store.currentUser.avatar || '🍓'
        },
        updatedAt: Date.now()
      };

      await this.sessionDocRef.set(payload, { merge: true });
      this.updateStatus('synced', 'Celengan Cloud Aktif');
    } catch (err) {
      console.warn('[Firebase] Save status (fallback active):', err.code || err);
      this.updateStatus('offline', 'Mode Celengan Lokal');
    }
  }

  updateStatus(status, label) {
    this.status = status;
    const dot = document.getElementById('cloud-sync-dot');
    const text = document.getElementById('cloud-sync-label');
    if (!dot || !text) return;

    text.textContent = label;
    dot.className = 'w-1.5 h-1.5 rounded-full';
    text.className = 'text-[9px] font-bold';

    switch (status) {
      case 'synced':
        dot.className += ' bg-emerald-500';
        text.className += ' text-emerald-600';
        break;
      case 'syncing':
      case 'connecting':
        dot.className += ' bg-amber-400 animate-pulse';
        text.className += ' text-amber-600';
        break;
      case 'offline':
      default:
        dot.className += ' bg-pink-400';
        text.className += ' text-pink-600';
        break;
    }
  }
}

const firebaseSync = new FirebaseSyncService();
window.firebaseSync = firebaseSync;

// ==========================================
// 4. APPLICATION STATE & MULTI-USER STORE
// ==========================================
class GroceryStore {
  constructor() {
    this.accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS_LIST) || '[]');
    
    // Seed default demo account if empty
    if (this.accounts.length === 0) {
      this.accounts = [
        {
          username: 'devin',
          name: 'Devin',
          avatar: '🍓',
          pin: '1234',
          budgetLimit: 250000,
          createdAt: Date.now()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.accounts));
    }

    // Check currently active logged-in user
    this.currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_USER) || 'null');
    
    this.cart = [];
    this.history = [];
    this.priceLookup = { ...MOCK_LOOKUP };
    this.budgetLimit = 250000;
    this.currentTab = 'belanja';
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.listeners = [];

    if (this.currentUser) {
      this.loadUserState();
    }
  }

  getUserKey(key) {
    const username = (this.currentUser && this.currentUser.username)
      ? this.currentUser.username.toLowerCase().trim()
      : 'guest';
    return `dvh_kids_${username}_${key}_v3`;
  }

  // Register a brand new account
  registerAccount({ name, avatar, username, pin, budgetLimit }) {
    const cleanUser = String(username || '').toLowerCase().trim();
    if (!cleanUser) throw new Error('Username wajib diisi!');
    if (!name || !name.trim()) throw new Error('Nama si kecil wajib diisi!');

    // Check if username already exists
    const existing = this.accounts.find(a => a.username.toLowerCase() === cleanUser);
    if (existing) {
      throw new Error(`Username "${cleanUser}" sudah terdaftar. Silakan pilih username lain atau masuk akun.`);
    }

    const newAccount = {
      username: cleanUser,
      name: name.trim(),
      avatar: avatar || '🍓',
      pin: pin || '1234',
      budgetLimit: Math.max(10000, parseRupiahInput(budgetLimit) || 250000),
      createdAt: Date.now()
    };

    this.accounts.push(newAccount);
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.accounts));

    // Automatically log in to the newly created account
    return this.login(newAccount.username, newAccount.pin);
  }

  login(username, pin = '1234') {
    const cleanUser = String(username || '').toLowerCase().trim();
    const account = this.accounts.find(a => a.username.toLowerCase() === cleanUser);

    if (!account) {
      // Auto-fallback creation for Devin/Rian demo
      if (cleanUser === 'devin' || cleanUser === 'rian') {
        const demoAcc = {
          username: cleanUser,
          name: cleanUser === 'devin' ? 'Devin' : 'Rian',
          avatar: cleanUser === 'devin' ? '🍓' : '🐰',
          pin: '1234',
          budgetLimit: 250000,
          createdAt: Date.now()
        };
        this.accounts.push(demoAcc);
        localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.accounts));
        return this.setUserSession(demoAcc);
      }
      throw new Error('Akun tidak ditemukan! Silakan buat akun baru di tab sebelah.');
    }

    if (account.pin && account.pin !== String(pin).trim()) {
      throw new Error('PIN keamanan salah! Silakan coba lagi.');
    }

    return this.setUserSession(account);
  }

  setUserSession(account) {
    this.currentUser = { ...account, loginAt: Date.now() };
    this.budgetLimit = account.budgetLimit || 250000;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
    this.loadUserState();
    if (window.firebaseSync) {
      window.firebaseSync.reconnectForUser();
    }
    this.notify(true);
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
    this.notify(true);
  }

  loadUserState() {
    try {
      const savedCart = localStorage.getItem(this.getUserKey('cart'));
      const savedHistory = localStorage.getItem(this.getUserKey('history'));
      const savedLookup = localStorage.getItem(this.getUserKey('lookup'));
      const savedBudget = localStorage.getItem(this.getUserKey('budget'));

      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      } else {
        this.cart = [...DEFAULT_KIDS_CART];
        this.saveUserState();
      }

      if (savedHistory) {
        this.history = JSON.parse(savedHistory);
      } else {
        this.history = [
          {
            id: 'trip-past-1',
            date: Date.now() - 604800000, // 7 hari lalu
            totalSpent: 98000,
            totalSaved: 24000,
            budgetLimit: this.budgetLimit,
            itemCount: 4,
            items: [
              { name: 'Bayam Hijau Segar', qty: 2, unit: 'ikat', subtotal: 12000 },
              { name: 'Susu Ultra Strawberry', qty: 4, unit: 'kotak', subtotal: 24000 },
              { name: 'Pisang Sunpride', qty: 1, unit: 'sisir', subtotal: 18000 },
              { name: 'Nugget Dinosaurus', qty: 1, unit: 'pack', subtotal: 44000 }
            ]
          }
        ];
        this.saveUserState();
      }

      if (savedLookup) {
        this.priceLookup = { ...MOCK_LOOKUP, ...JSON.parse(savedLookup) };
      } else {
        this.priceLookup = { ...MOCK_LOOKUP };
      }

      if (savedBudget) {
        this.budgetLimit = parseInt(savedBudget, 10) || this.currentUser?.budgetLimit || 250000;
      } else if (this.currentUser?.budgetLimit) {
        this.budgetLimit = this.currentUser.budgetLimit;
      }
    } catch (e) {
      console.warn('Error loading user state:', e);
      this.cart = [...DEFAULT_KIDS_CART];
    }
  }

  saveUserState() {
    if (!this.currentUser) return;
    try {
      localStorage.setItem(this.getUserKey('cart'), JSON.stringify(this.cart));
      localStorage.setItem(this.getUserKey('history'), JSON.stringify(this.history));
      localStorage.setItem(this.getUserKey('lookup'), JSON.stringify(this.priceLookup));
      localStorage.setItem(this.getUserKey('budget'), String(this.budgetLimit));
    } catch (e) {
      console.warn('Error saving user state:', e);
    }
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify(force = false) {
    this.saveUserState();
    if (window.firebaseSync && this.currentUser) {
      window.firebaseSync.triggerDebouncedSync();
    }
    this.listeners.forEach(fn => fn(this));
  }

  // Cart operations
  addItem(item) {
    const newItem = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: item.name.trim(),
      category: item.category || 'sayur',
      unit: item.unit || 'pcs',
      qty: Math.max(0.1, Number(item.qty) || 1),
      unitPrice: Math.max(0, Number(item.unitPrice) || 0),
      lastMonthPrice: item.lastMonthPrice !== undefined && item.lastMonthPrice !== '' ? Number(item.lastMonthPrice) : null,
      discountRaw: item.discountRaw ? String(item.discountRaw).trim() : '',
      createdAt: Date.now()
    };

    const key = newItem.name.toLowerCase().trim();
    this.priceLookup[key] = {
      price: newItem.unitPrice,
      unit: newItem.unit,
      category: newItem.category
    };

    this.cart.unshift(newItem);
    this.notify();
    return newItem;
  }

  updateItem(id, itemData) {
    const idx = this.cart.findIndex(i => i.id === id);
    if (idx !== -1) {
      this.cart[idx] = {
        ...this.cart[idx],
        ...itemData,
        qty: Math.max(0.1, Number(itemData.qty) || 1),
        unitPrice: Math.max(0, Number(itemData.unitPrice) || 0),
        lastMonthPrice: itemData.lastMonthPrice !== undefined && itemData.lastMonthPrice !== '' ? Number(itemData.lastMonthPrice) : null,
        discountRaw: itemData.discountRaw ? String(itemData.discountRaw).trim() : ''
      };

      const key = this.cart[idx].name.toLowerCase().trim();
      this.priceLookup[key] = {
        price: this.cart[idx].unitPrice,
        unit: this.cart[idx].unit,
        category: this.cart[idx].category
      };

      this.notify();
    }
  }

  updateQty(id, delta) {
    const item = this.cart.find(i => i.id === id);
    if (!item) return;

    const newQty = item.qty + delta;
    if (newQty <= 0) {
      return { requestDelete: true, item };
    } else {
      item.qty = Math.round(newQty * 10) / 10;
      this.notify();
      return { requestDelete: false, item };
    }
  }

  deleteItem(id) {
    this.cart = this.cart.filter(i => i.id !== id);
    this.notify();
  }

  setBudget(newLimit) {
    this.budgetLimit = Math.max(0, Number(newLimit) || 0);
    if (this.currentUser) {
      this.currentUser.budgetLimit = this.budgetLimit;
      // Update in accounts array
      const idx = this.accounts.findIndex(a => a.username === this.currentUser.username);
      if (idx !== -1) {
        this.accounts[idx].budgetLimit = this.budgetLimit;
        localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.accounts));
      }
    }
    this.notify();
  }

  lookupProduct(query) {
    if (!query || typeof query !== 'string') return null;
    const clean = query.toLowerCase().trim();
    if (clean.length < 2) return null;

    if (this.priceLookup[clean]) {
      return this.priceLookup[clean];
    }

    const keys = Object.keys(this.priceLookup);
    for (let k of keys) {
      if (k.includes(clean) || clean.includes(k)) {
        return this.priceLookup[k];
      }
    }
    return null;
  }

  finishCurrentTrip() {
    if (this.cart.length === 0) return null;

    const summary = this.getCartSummary();
    const tripRecord = {
      id: 'trip_' + Date.now(),
      date: Date.now(),
      totalSpent: summary.totalSpent,
      totalSaved: summary.totalSaved,
      budgetLimit: this.budgetLimit,
      itemCount: this.cart.length,
      items: this.cart.map(item => {
        const totals = Calculator.getItemTotals(item);
        return {
          name: item.name,
          category: item.category,
          qty: item.qty,
          unit: item.unit,
          finalUnitPrice: totals.finalUnitPrice,
          subtotal: totals.subtotal,
          discountText: totals.discountText
        };
      })
    };

    this.cart.forEach(item => {
      const key = item.name.toLowerCase().trim();
      this.priceLookup[key] = {
        price: item.unitPrice,
        unit: item.unit,
        category: item.category
      };
    });

    this.history.unshift(tripRecord);
    this.cart = [];
    this.notify();
    return tripRecord;
  }

  getCartSummary() {
    let totalSpent = 0;
    let totalSaved = 0;
    let categorySpend = {};

    this.cart.forEach(item => {
      const totals = Calculator.getItemTotals(item);
      totalSpent += totals.subtotal;
      totalSaved += totals.totalSaving;

      categorySpend[item.category] = (categorySpend[item.category] || 0) + totals.subtotal;
    });

    const remainingBudget = this.budgetLimit - totalSpent;
    const rawPercentage = this.budgetLimit > 0 ? (totalSpent / this.budgetLimit) * 100 : 0;
    const budgetUsagePercent = Math.min(100, Math.max(0, rawPercentage));

    let budgetStatus = 'safe';
    if (totalSpent > this.budgetLimit) {
      budgetStatus = 'danger';
    } else if (rawPercentage >= 85) {
      budgetStatus = 'warning';
    }

    return {
      totalSpent,
      totalSaved,
      remainingBudget,
      rawPercentage,
      budgetUsagePercent,
      budgetStatus,
      categorySpend
    };
  }
}

const store = new GroceryStore();

// ==========================================
// 5. UI CONTROLLER (PINK KIDS THEME)
// ==========================================
class GroceryUIController {
  constructor() {
    this.selectedAvatar = '🐰';
    this.initDOMElements();
    this.bindEvents();
    this.editingItemId = null;
    this.pendingDeleteItem = null;
    this.overbudgetWarningSuppressed = false;

    store.subscribe(() => {
      this.render();
    });

    this.render();
    this.updateAuthView();
  }

  initDOMElements() {
    // Auth Views & Forms
    this.viewLoginScreen = document.getElementById('view-login-screen');
    this.authTabBtnLogin = document.getElementById('auth-tab-btn-login');
    this.authTabBtnRegister = document.getElementById('auth-tab-btn-register');
    this.authPanelLogin = document.getElementById('auth-panel-login');
    this.authPanelRegister = document.getElementById('auth-panel-register');
    this.formLogin = document.getElementById('form-login');
    this.formRegister = document.getElementById('form-register');
    this.inputLoginUsername = document.getElementById('login-username');
    this.inputLoginPin = document.getElementById('login-pin');
    this.btnQuickLoginRian = document.getElementById('btn-quick-login-rian');

    // Register Inputs
    this.regName = document.getElementById('reg-name');
    this.regUsername = document.getElementById('reg-username');
    this.regPin = document.getElementById('reg-pin');
    this.regBudget = document.getElementById('reg-budget');
    this.avatarOptions = document.querySelectorAll('.avatar-option-btn');

    // Header Elements
    this.headerAvatarBadge = document.getElementById('header-avatar-badge');
    this.headerContainer = document.getElementById('sticky-header-container');
    this.headerTotalSpent = document.getElementById('header-total-spent');
    this.headerBudgetLimit = document.getElementById('header-budget-limit');
    this.headerRemaining = document.getElementById('header-remaining');
    this.headerRemainingLabel = document.getElementById('header-remaining-label');
    this.headerProgressBar = document.getElementById('header-progress-bar');
    this.headerProgressPercent = document.getElementById('header-progress-percent');
    this.headerStatusBadge = document.getElementById('header-status-badge');
    this.totalSavedBadge = document.getElementById('total-saved-badge');
    this.headerUserName = document.getElementById('header-user-name');
    this.tabAccountUser = document.getElementById('tab-account-user');
    this.btnLogout = document.getElementById('btn-logout');
    this.btnTabLogout = document.getElementById('btn-tab-logout');

    // Tabs & Navigation
    this.tabBelanja = document.getElementById('tab-belanja-content');
    this.tabRiwayat = document.getElementById('tab-riwayat-content');
    this.tabAnggaran = document.getElementById('tab-anggaran-content');
    this.navBelanja = document.getElementById('nav-belanja');
    this.navRiwayat = document.getElementById('nav-riwayat');
    this.navAnggaran = document.getElementById('nav-anggaran');

    // Belanja Tab Controls
    this.searchInput = document.getElementById('search-input');
    this.clearSearchBtn = document.getElementById('clear-search-btn');
    this.categoryFiltersContainer = document.getElementById('category-filters');
    this.quickCatalogCarousel = document.getElementById('quick-catalog-carousel');
    this.cartItemList = document.getElementById('cart-item-list');
    this.cartEmptyState = document.getElementById('cart-empty-state');
    this.floatingAddBtn = document.getElementById('floating-add-btn');
    this.finishShoppingBtn = document.getElementById('btn-finish-shopping');

    // Modals
    this.modalItem = document.getElementById('modal-item');
    this.modalItemTitle = document.getElementById('modal-item-title');
    this.formItem = document.getElementById('form-item');
    this.inputItemName = document.getElementById('item-name');
    this.inputItemCategory = document.getElementById('item-category');
    this.inputItemUnit = document.getElementById('item-unit');
    this.inputItemQty = document.getElementById('item-qty');
    this.inputItemPrice = document.getElementById('item-price');
    this.inputItemDiscount = document.getElementById('item-discount');
    this.inputItemLastPrice = document.getElementById('item-last-price');
    this.autoLookupNotice = document.getElementById('auto-lookup-notice');
    this.modalPreviewSubtotal = document.getElementById('modal-preview-subtotal');
    this.modalPreviewSaving = document.getElementById('modal-preview-saving');
    this.modalCloseBtn = document.getElementById('modal-close-btn');

    this.modalBudget = document.getElementById('modal-budget');
    this.inputBudget = document.getElementById('input-budget');
    this.formBudget = document.getElementById('form-budget');
    this.btnOpenBudgetModal = document.getElementById('btn-open-budget-modal');

    this.modalDanger = document.getElementById('modal-danger');
    this.dangerSpentText = document.getElementById('danger-spent-text');
    this.dangerLimitText = document.getElementById('danger-limit-text');
    this.dangerOverAmount = document.getElementById('danger-over-amount');
    this.btnDangerProceed = document.getElementById('btn-danger-proceed');
    this.btnDangerAdjust = document.getElementById('btn-danger-adjust');

    this.modalConfirmDelete = document.getElementById('modal-confirm-delete');
    this.deleteItemNameText = document.getElementById('delete-item-name-text');
    this.btnConfirmDelete = document.getElementById('btn-confirm-delete');
    this.btnCancelDelete = document.getElementById('btn-cancel-delete');

    this.modalFinishTrip = document.getElementById('modal-finish-trip');
    this.finishSummaryTotal = document.getElementById('finish-summary-total');
    this.finishSummarySaved = document.getElementById('finish-summary-saved');
    this.finishSummaryCount = document.getElementById('finish-summary-count');
    this.btnFinishDone = document.getElementById('btn-finish-done');

    // Riwayat & Anggaran Pages
    this.historyList = document.getElementById('history-list');
    this.historyEmptyState = document.getElementById('history-empty-state');
    this.historyTotalTrips = document.getElementById('history-total-trips');
    this.historyAllSpent = document.getElementById('history-all-spent');

    this.budgetPageLimit = document.getElementById('budget-page-limit');
    this.budgetPageCurrent = document.getElementById('budget-page-current');
    this.budgetPagePercent = document.getElementById('budget-page-percent');
    this.budgetBreakdownContainer = document.getElementById('budget-breakdown-container');
    this.budgetGaugeBar = document.getElementById('budget-gauge-bar');
  }

  bindEvents() {
    // Auth Tab Switching (Masuk vs Daftar)
    this.authTabBtnLogin?.addEventListener('click', () => {
      feedback.tap();
      this.switchAuthTab('login');
    });

    this.authTabBtnRegister?.addEventListener('click', () => {
      feedback.tap();
      this.switchAuthTab('register');
    });

    // Avatar Selection in Register Form
    this.avatarOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        feedback.tap();
        this.selectedAvatar = btn.dataset.avatar || '🐰';
        this.avatarOptions.forEach(b => {
          b.className = 'avatar-option-btn p-2 rounded-2xl border border-pink-200 bg-pink-50/60 text-2xl flex items-center justify-center';
        });
        btn.className = 'avatar-option-btn p-2 rounded-2xl border-2 border-pink-400 bg-pink-100 text-2xl flex items-center justify-center shadow-xs';
      });
    });

    // Budget Presets in Registration
    document.querySelectorAll('.reg-budget-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        feedback.tap();
        const amt = pill.dataset.budget;
        if (this.regBudget) this.regBudget.value = formatRupiahNumber(amt);
      });
    });

    // Login Form Submission
    this.formLogin?.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = this.inputLoginUsername?.value.trim() || 'devin';
      const p = this.inputLoginPin?.value.trim() || '1234';

      try {
        store.login(u, p);
        feedback.success();
        this.updateAuthView();
      } catch (err) {
        feedback.dangerAlert();
        alert(err.message || 'Gagal masuk akun');
      }
    });

    // Register Form Submission
    this.formRegister?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.regName?.value.trim();
      const username = this.regUsername?.value.trim();
      const pin = this.regPin?.value.trim() || '1234';
      const budgetLimit = this.regBudget?.value || '250.000';

      try {
        store.registerAccount({
          name,
          username,
          pin,
          avatar: this.selectedAvatar,
          budgetLimit
        });
        feedback.success();
        if (typeof confetti === 'function') {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
        }
        alert(`🎉 Selamat datang ${name}! Akun ceria kamu berhasil dibuat.`);
        this.updateAuthView();
      } catch (err) {
        feedback.dangerAlert();
        alert(err.message || 'Gagal mendaftar akun');
      }
    });

    // Quick 1-Click Login for Demo
    this.btnQuickLoginRian?.addEventListener('click', () => {
      feedback.success();
      store.login('devin', '1234');
      this.updateAuthView();
    });

    // Logout
    const handleLogout = () => {
      feedback.tap();
      if (confirm('Kunci sesi dan keluar akun? Belanjaanmu tetap aman tersimpan.')) {
        store.logout();
        this.updateAuthView();
      }
    };
    this.btnLogout?.addEventListener('click', handleLogout);
    this.btnTabLogout?.addEventListener('click', handleLogout);

    // Navigation Tabs
    this.navBelanja?.addEventListener('click', () => this.switchTab('belanja'));
    this.navRiwayat?.addEventListener('click', () => this.switchTab('riwayat'));
    this.navAnggaran?.addEventListener('click', () => this.switchTab('anggaran'));

    // Floating Add Button
    this.floatingAddBtn?.addEventListener('click', () => {
      feedback.tap();
      this.openAddItemModal();
    });

    // Close Modal Button
    this.modalCloseBtn?.addEventListener('click', () => {
      feedback.tap();
      this.closeItemModal();
    });

    // Modal backdrop click
    this.modalItem?.addEventListener('click', (e) => {
      if (e.target === this.modalItem) this.closeItemModal();
    });
    this.modalBudget?.addEventListener('click', (e) => {
      if (e.target === this.modalBudget) this.closeBudgetModal();
    });
    this.modalDanger?.addEventListener('click', (e) => {
      if (e.target === this.modalDanger) this.closeDangerModal();
    });
    this.modalConfirmDelete?.addEventListener('click', (e) => {
      if (e.target === this.modalConfirmDelete) this.closeConfirmDeleteModal();
    });
    this.modalFinishTrip?.addEventListener('click', (e) => {
      if (e.target === this.modalFinishTrip) this.closeFinishTripModal();
    });

    // Search Input
    this.searchInput?.addEventListener('input', (e) => {
      store.searchQuery = e.target.value.toLowerCase().trim();
      this.clearSearchBtn?.classList.toggle('hidden', !e.target.value);
      this.renderCartList();
    });

    this.clearSearchBtn?.addEventListener('click', () => {
      feedback.tap();
      this.searchInput.value = '';
      store.searchQuery = '';
      this.clearSearchBtn?.classList.add('hidden');
      this.renderCartList();
    });

    // Auto-Lookup on typing product name
    this.inputItemName?.addEventListener('input', (e) => {
      this.handleProductLookup(e.target.value);
      this.updateModalCalculationPreview();
    });

    [this.inputItemPrice, this.inputItemDiscount, this.inputItemQty].forEach(el => {
      el?.addEventListener('input', () => {
        this.updateModalCalculationPreview();
      });
    });

    // Modal Stepper
    document.getElementById('modal-qty-minus')?.addEventListener('click', () => {
      let q = parseFloat(this.inputItemQty.value) || 1;
      if (q > 1) {
        feedback.decrement();
        this.inputItemQty.value = Math.max(1, Math.round(q - 1));
        this.updateModalCalculationPreview();
      }
    });
    document.getElementById('modal-qty-plus')?.addEventListener('click', () => {
      feedback.increment();
      let q = parseFloat(this.inputItemQty.value) || 1;
      this.inputItemQty.value = Math.round(q + 1);
      this.updateModalCalculationPreview();
    });

    // Form Submit: Add / Edit Item
    this.formItem?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleItemFormSubmit();
    });

    // Budget Header Click
    this.btnOpenBudgetModal?.addEventListener('click', () => {
      feedback.tap();
      this.openBudgetModal();
    });

    // Form Budget Submit
    this.formBudget?.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.success();
      const val = parseRupiahInput(this.inputBudget.value);
      store.setBudget(val);
      this.closeBudgetModal();
    });

    // Quick Budget Presets in Modal
    document.querySelectorAll('.budget-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        feedback.tap();
        const amt = btn.dataset.amount;
        this.inputBudget.value = formatRupiahNumber(amt);
      });
    });

    // Quick Promo Discount Preset Chips
    document.querySelectorAll('.discount-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        feedback.tap();
        this.inputItemDiscount.value = chip.dataset.discount || '';
        this.updateModalCalculationPreview();
      });
    });

    // Test Runner
    document.getElementById('btn-load-dt2-scenarios')?.addEventListener('click', () => {
      feedback.success();
      this.loadTestScenarios();
    });

    // Danger Modal Actions
    this.btnDangerProceed?.addEventListener('click', () => {
      feedback.tap();
      this.overbudgetWarningSuppressed = true;
      this.closeDangerModal();
    });

    this.btnDangerAdjust?.addEventListener('click', () => {
      feedback.tap();
      this.closeDangerModal();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Confirm Delete Actions
    this.btnConfirmDelete?.addEventListener('click', () => {
      if (this.pendingDeleteItem) {
        feedback.tap();
        store.deleteItem(this.pendingDeleteItem.id);
        this.pendingDeleteItem = null;
      }
      this.closeConfirmDeleteModal();
    });

    this.btnCancelDelete?.addEventListener('click', () => {
      this.pendingDeleteItem = null;
      this.closeConfirmDeleteModal();
    });

    // Finish Shopping Trip
    this.finishShoppingBtn?.addEventListener('click', () => {
      this.handleFinishShopping();
    });

    this.btnFinishDone?.addEventListener('click', () => {
      feedback.tap();
      this.closeFinishTripModal();
      this.switchTab('riwayat');
    });

    // Currency blur formatters
    this.inputItemPrice?.addEventListener('blur', (e) => {
      const val = parseRupiahInput(e.target.value);
      if (val > 0) e.target.value = formatRupiahNumber(val);
    });
    this.inputItemLastPrice?.addEventListener('blur', (e) => {
      const val = parseRupiahInput(e.target.value);
      if (val > 0) e.target.value = formatRupiahNumber(val);
    });
    this.inputBudget?.addEventListener('blur', (e) => {
      const val = parseRupiahInput(e.target.value);
      if (val > 0) e.target.value = formatRupiahNumber(val);
    });
  }

  switchAuthTab(tab) {
    if (tab === 'register') {
      this.authTabBtnLogin.className = 'py-2 rounded-xl transition-all duration-200 text-slate-500 hover:text-pink-600 flex items-center justify-center gap-1.5';
      this.authTabBtnRegister.className = 'py-2 rounded-xl transition-all duration-200 bg-white text-pink-600 shadow-sm flex items-center justify-center gap-1.5';
      this.authPanelLogin.classList.add('hidden');
      this.authPanelRegister.classList.remove('hidden');
    } else {
      this.authTabBtnLogin.className = 'py-2 rounded-xl transition-all duration-200 bg-white text-pink-600 shadow-sm flex items-center justify-center gap-1.5';
      this.authTabBtnRegister.className = 'py-2 rounded-xl transition-all duration-200 text-slate-500 hover:text-pink-600 flex items-center justify-center gap-1.5';
      this.authPanelLogin.classList.remove('hidden');
      this.authPanelRegister.classList.add('hidden');
    }
  }

  updateAuthView() {
    if (!store.currentUser) {
      this.viewLoginScreen?.classList.remove('hidden');
    } else {
      this.viewLoginScreen?.classList.add('hidden');
      if (this.headerUserName) this.headerUserName.textContent = store.currentUser.name || store.currentUser.username;
      if (this.tabAccountUser) this.tabAccountUser.textContent = `${store.currentUser.avatar || '🍓'} ${store.currentUser.name || store.currentUser.username}`;
      if (this.headerAvatarBadge) this.headerAvatarBadge.textContent = store.currentUser.avatar || '🍓';
      this.render();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  switchTab(tab) {
    feedback.tap();
    store.currentTab = tab;

    [this.navBelanja, this.navRiwayat, this.navAnggaran].forEach(el => {
      if (!el) return;
      el.classList.remove('text-pink-600', 'font-black');
      el.classList.add('text-slate-400');
      const icon = el.querySelector('.nav-icon-container');
      if (icon) {
        icon.classList.remove('bg-pink-100', 'text-pink-600', 'ring-2', 'ring-pink-300');
      }
    });

    [this.tabBelanja, this.tabRiwayat, this.tabAnggaran].forEach(el => {
      if (el) el.classList.add('hidden');
    });

    if (tab === 'belanja') {
      this.tabBelanja?.classList.remove('hidden');
      this.navBelanja?.classList.add('text-pink-600', 'font-black');
      this.navBelanja?.classList.remove('text-slate-400');
      this.navBelanja?.querySelector('.nav-icon-container')?.classList.add('bg-pink-100', 'text-pink-600', 'ring-2', 'ring-pink-300');
      this.floatingAddBtn?.classList.remove('hidden');
    } else if (tab === 'riwayat') {
      this.tabRiwayat?.classList.remove('hidden');
      this.navRiwayat?.classList.add('text-pink-600', 'font-black');
      this.navRiwayat?.classList.remove('text-slate-400');
      this.navRiwayat?.querySelector('.nav-icon-container')?.classList.add('bg-pink-100', 'text-pink-600', 'ring-2', 'ring-pink-300');
      this.floatingAddBtn?.classList.add('hidden');
      this.renderHistoryList();
    } else if (tab === 'anggaran') {
      this.tabAnggaran?.classList.remove('hidden');
      this.navAnggaran?.classList.add('text-pink-600', 'font-black');
      this.navAnggaran?.classList.remove('text-slate-400');
      this.navAnggaran?.querySelector('.nav-icon-container')?.classList.add('bg-pink-100', 'text-pink-600', 'ring-2', 'ring-pink-300');
      this.floatingAddBtn?.classList.add('hidden');
      this.renderAnggaranPage();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  handleProductLookup(typedName) {
    const found = store.lookupProduct(typedName);
    if (found && typedName.trim().length >= 3) {
      this.autoLookupNotice.innerHTML = `
        <div class="flex items-center gap-1.5 text-xs text-pink-700 bg-pink-100 border border-pink-200 rounded-xl px-2.5 py-1.5">
          <span>✨</span>
          <span>Ditemukan referensi: <b>${formatRupiah(found.price)}</b> / ${found.unit || 'pcs'}</span>
        </div>
      `;
      this.autoLookupNotice.classList.remove('hidden');

      if (!this.inputItemLastPrice.value || this.inputItemLastPrice.value === '0') {
        this.inputItemLastPrice.value = formatRupiahNumber(found.price);
      }
      if (found.category) {
        this.inputItemCategory.value = found.category;
      }
      if (found.unit) {
        this.inputItemUnit.value = found.unit;
      }
      if (window.lucide) window.lucide.createIcons();
    } else {
      this.autoLookupNotice.classList.add('hidden');
    }
  }

  updateModalCalculationPreview() {
    const unitPrice = parseRupiahInput(this.inputItemPrice.value);
    const qty = parseFloat(this.inputItemQty.value) || 1;
    const discountRaw = this.inputItemDiscount.value;

    const discountInfo = Calculator.calculateDiscount(unitPrice, discountRaw);
    const subtotal = discountInfo.finalUnitPrice * qty;
    const totalSaving = discountInfo.savingPerUnit * qty;

    this.modalPreviewSubtotal.textContent = formatRupiah(subtotal);
    if (totalSaving > 0) {
      this.modalPreviewSaving.textContent = `Hemat: ${formatRupiah(totalSaving)} (${discountInfo.discountText})`;
      this.modalPreviewSaving.classList.remove('hidden');
    } else {
      this.modalPreviewSaving.classList.add('hidden');
    }
  }

  openAddItemModal(itemToEdit = null) {
    this.editingItemId = itemToEdit ? itemToEdit.id : null;
    this.formItem.reset();
    this.autoLookupNotice.classList.add('hidden');

    if (itemToEdit) {
      this.modalItemTitle.textContent = 'Edit Jajanan Belanja';
      this.inputItemName.value = itemToEdit.name;
      this.inputItemCategory.value = itemToEdit.category;
      this.inputItemUnit.value = itemToEdit.unit;
      this.inputItemQty.value = itemToEdit.qty;
      this.inputItemPrice.value = formatRupiahNumber(itemToEdit.unitPrice);
      this.inputItemLastPrice.value = itemToEdit.lastMonthPrice ? formatRupiahNumber(itemToEdit.lastMonthPrice) : '';
      this.inputItemDiscount.value = itemToEdit.discountRaw || '';
    } else {
      this.modalItemTitle.textContent = 'Tambah Jajanan Baru 🌸';
      this.inputItemQty.value = '1';
      this.inputItemCategory.value = 'sayur';
      this.inputItemUnit.value = 'pcs';
      this.inputItemDiscount.value = '';
    }

    this.updateModalCalculationPreview();
    this.modalItem.classList.remove('hidden');
    
    setTimeout(() => {
      this.inputItemName.focus();
    }, 100);

    if (window.lucide) window.lucide.createIcons();
  }

  closeItemModal() {
    this.modalItem.classList.add('hidden');
    this.editingItemId = null;
  }

  handleItemFormSubmit() {
    const name = this.inputItemName.value.trim();
    if (!name) {
      alert('Nama barang wajib diisi!');
      return;
    }

    const price = parseRupiahInput(this.inputItemPrice.value);
    if (price <= 0) {
      alert('Harga satuan harus lebih dari Rp 0!');
      return;
    }

    const itemData = {
      name,
      category: this.inputItemCategory.value,
      unit: this.inputItemUnit.value,
      qty: parseFloat(this.inputItemQty.value) || 1,
      unitPrice: price,
      lastMonthPrice: this.inputItemLastPrice.value ? parseRupiahInput(this.inputItemLastPrice.value) : null,
      discountRaw: this.inputItemDiscount.value.trim()
    };

    if (this.editingItemId) {
      store.updateItem(this.editingItemId, itemData);
      feedback.tap();
    } else {
      store.addItem(itemData);
      feedback.increment();

      const summary = store.getCartSummary();
      if (summary.budgetStatus === 'danger' && !this.overbudgetWarningSuppressed) {
        this.triggerOverbudgetDanger(summary);
      }
    }

    this.closeItemModal();
  }

  openBudgetModal() {
    this.inputBudget.value = formatRupiahNumber(store.budgetLimit);
    this.modalBudget.classList.remove('hidden');
    setTimeout(() => this.inputBudget.focus(), 100);
  }

  closeBudgetModal() {
    this.modalBudget.classList.add('hidden');
  }

  triggerOverbudgetDanger(summary) {
    feedback.dangerAlert();
    this.dangerSpentText.textContent = formatRupiah(summary.totalSpent);
    this.dangerLimitText.textContent = formatRupiah(store.budgetLimit);
    const deficit = Math.abs(summary.remainingBudget);
    this.dangerOverAmount.textContent = formatRupiah(deficit);

    this.modalDanger.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  closeDangerModal() {
    this.modalDanger.classList.add('hidden');
  }

  loadTestScenarios() {
    this.overbudgetWarningSuppressed = false;
    store.budgetLimit = 250000;
    
    store.cart = [
      {
        id: 'test-1',
        name: 'Bayam Hijau Segar Kelinci',
        category: 'sayur',
        unit: 'ikat',
        qty: 3,
        unitPrice: 6000,
        lastMonthPrice: 5500,
        discountRaw: '0',
        createdAt: Date.now() - 60000
      },
      {
        id: 'test-2',
        name: 'Susu UHT Ultra Milk Strawberry 200ml',
        category: 'minuman',
        unit: 'kotak',
        qty: 4,
        unitPrice: 6000,
        lastMonthPrice: 6000,
        discountRaw: '0',
        createdAt: Date.now() - 50000
      },
      {
        id: 'test-3',
        name: 'Brokoli Hijau Super',
        category: 'sayur',
        unit: 'pack',
        qty: 1,
        unitPrice: 18000,
        lastMonthPrice: 20000,
        discountRaw: '0',
        createdAt: Date.now() - 40000
      },
      {
        id: 'test-4',
        name: 'Sosis Kanzler Singles',
        category: 'daging',
        unit: 'pcs',
        qty: 2,
        unitPrice: 9000,
        lastMonthPrice: 9000,
        discountRaw: '50%+20%',
        createdAt: Date.now() - 30000
      },
      {
        id: 'test-5',
        name: 'Nugget Fiesta Dinosaurus',
        category: 'daging',
        unit: 'pack',
        qty: 2,
        unitPrice: 48000,
        lastMonthPrice: 46000,
        discountRaw: '10%',
        createdAt: Date.now() - 20000
      }
    ];

    store.notify();
    alert('✅ Data Uji Ceria berhasil dimuat!\n\n1. Kategori Anak: Sayur Sehat Kelinci & Susu Segar\n2. Diskon Bertingkat: Sosis 50%+20%\n3. Celengan: Cek indikator uang saku anak pintar!');
  }

  openConfirmDeleteModal(item) {
    this.pendingDeleteItem = item;
    this.deleteItemNameText.textContent = `"${item.name}"`;
    this.modalConfirmDelete.classList.remove('hidden');
  }

  closeConfirmDeleteModal() {
    this.modalConfirmDelete.classList.add('hidden');
    this.pendingDeleteItem = null;
  }

  handleFinishShopping() {
    if (store.cart.length === 0) {
      alert('Troli belanja si kecil masih kosong!');
      return;
    }

    const confirmFinish = confirm('Selesaikan belanja dan bayar di kasir? Seluruh jajanan akan dicatat di Buku Riwayat!');
    if (!confirmFinish) return;

    feedback.success();

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    const trip = store.finishCurrentTrip();

    this.finishSummaryTotal.textContent = formatRupiah(trip.totalSpent);
    this.finishSummarySaved.textContent = formatRupiah(trip.totalSaved);
    this.finishSummaryCount.textContent = `${trip.itemCount} Macam Barang`;

    this.modalFinishTrip.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  closeFinishTripModal() {
    this.modalFinishTrip.classList.add('hidden');
  }

  render() {
    this.renderHeaderBudget();
    this.renderCategoryFilters();
    this.renderQuickCatalog();
    this.renderCartList();

    if (store.currentTab === 'riwayat') {
      this.renderHistoryList();
    } else if (store.currentTab === 'anggaran') {
      this.renderAnggaranPage();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderHeaderBudget() {
    const summary = store.getCartSummary();

    this.headerTotalSpent.textContent = formatRupiah(summary.totalSpent);
    this.headerBudgetLimit.textContent = formatRupiah(store.budgetLimit);

    if (summary.remainingBudget >= 0) {
      this.headerRemaining.textContent = formatRupiah(summary.remainingBudget);
      this.headerRemaining.className = 'text-base font-black text-emerald-600 font-mono-num tracking-tight leading-tight';
      this.headerRemainingLabel.textContent = 'Sisa Uang Saku';
    } else {
      this.headerRemaining.textContent = `- ${formatRupiah(Math.abs(summary.remainingBudget))}`;
      this.headerRemaining.className = 'text-base font-black text-rose-600 font-mono-num tracking-tight leading-tight';
      this.headerRemainingLabel.textContent = 'Uang Saku Kurang!';
    }

    this.headerProgressBar.style.width = `${summary.budgetUsagePercent}%`;
    this.headerProgressPercent.textContent = `${Math.round(summary.rawPercentage)}%`;

    this.headerContainer.classList.remove('animate-danger-pulse', 'border-rose-400');

    const overbudgetTopBanner = document.getElementById('overbudget-top-banner');

    if (summary.budgetStatus === 'safe') {
      this.headerProgressBar.className = 'h-full rounded-full transition-progress bg-gradient-to-r from-pink-400 to-pink-500';
      this.headerStatusBadge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200 flex items-center gap-1';
      this.headerStatusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-pink-500"></span> 💖 Uang Saku Aman`;
      if (overbudgetTopBanner) overbudgetTopBanner.classList.add('hidden');
    } else if (summary.budgetStatus === 'warning') {
      this.headerProgressBar.className = 'h-full rounded-full transition-progress bg-amber-400';
      this.headerStatusBadge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 animate-soft-pulse';
      this.headerStatusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> ⭐ Sisa Sedikit (${Math.round(summary.rawPercentage)}%)`;
      if (overbudgetTopBanner) overbudgetTopBanner.classList.add('hidden');
    } else {
      this.headerProgressBar.className = 'h-full rounded-full transition-progress bg-rose-500';
      this.headerContainer.classList.add('animate-danger-pulse', 'border-rose-400');
      this.headerStatusBadge.className = 'text-[11px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white flex items-center gap-1';
      this.headerStatusBadge.innerHTML = `<span>🚨</span> UANG SAKU HABIS!`;
      if (overbudgetTopBanner) overbudgetTopBanner.classList.remove('hidden');
    }

    if (summary.totalSaved > 0) {
      this.totalSavedBadge.innerHTML = `
        <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-bold shadow-xs">
          <span>🏷️</span>
          <span>Hemat Diskon: ${formatRupiah(summary.totalSaved)}</span>
        </div>
      `;
      this.totalSavedBadge.classList.remove('hidden');
    } else {
      this.totalSavedBadge.classList.add('hidden');
    }
  }

  renderCategoryFilters() {
    if (!this.categoryFiltersContainer) return;
    this.categoryFiltersContainer.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const isSelected = store.selectedCategory === cat.id;
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = `shrink-0 px-3 py-1.5 rounded-2xl text-xs font-extrabold transition-all duration-150 flex items-center gap-1.5 tap-effect ${
        isSelected
          ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-300'
          : 'bg-white text-pink-700 hover:bg-pink-50 border border-pink-200'
      }`;
      pill.innerHTML = `<span>${cat.name}</span>`;

      pill.addEventListener('click', () => {
        feedback.tap();
        store.selectedCategory = cat.id;
        this.renderCategoryFilters();
        this.renderQuickCatalog();
        this.renderCartList();
      });

      this.categoryFiltersContainer.appendChild(pill);
    });
  }

  renderQuickCatalog() {
    if (!this.quickCatalogCarousel) return;
    this.quickCatalogCarousel.innerHTML = '';

    let items = QUICK_CATALOG_ITEMS;
    if (store.selectedCategory !== 'all') {
      items = items.filter(i => i.category === store.selectedCategory);
      if (items.length === 0) {
        items = QUICK_CATALOG_ITEMS.slice(0, 5);
      }
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'shrink-0 w-36 bg-white border-2 border-pink-200 rounded-2xl p-2.5 flex flex-col justify-between shadow-xs hover:border-pink-400 transition-all';
      
      const catObj = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[1];

      card.innerHTML = `
        <div>
          <span class="text-[9px] font-black px-1.5 py-0.5 rounded-md ${catObj.color} inline-block mb-1">
            ${catObj.name}
          </span>
          <h4 class="text-xs font-black text-slate-800 truncate" title="${item.name}">${item.name}</h4>
          <div class="text-[11px] font-mono-num font-black text-pink-600 mt-0.5">
            ${formatRupiah(item.price)}
          </div>
        </div>

        <button 
          type="button" 
          class="mt-2 w-full py-1.5 px-2 rounded-xl bg-pink-100 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-400 text-pink-700 hover:text-white border border-pink-200 text-[10px] font-black flex items-center justify-center gap-1 tap-effect transition-all"
        >
          <span>+ Tambah</span>
        </button>
      `;

      card.querySelector('button').addEventListener('click', () => {
        feedback.increment();
        store.addItem({
          name: item.name,
          category: item.category,
          unit: item.unit,
          qty: 1,
          unitPrice: item.price,
          lastMonthPrice: item.lastMonthPrice,
          discountRaw: item.discount || ''
        });

        const summary = store.getCartSummary();
        if (summary.budgetStatus === 'danger' && !this.overbudgetWarningSuppressed) {
          this.triggerOverbudgetDanger(summary);
        }
      });

      this.quickCatalogCarousel.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderCartList() {
    let filtered = store.cart;
    if (store.selectedCategory !== 'all') {
      filtered = filtered.filter(i => i.category === store.selectedCategory);
    }
    if (store.searchQuery) {
      filtered = filtered.filter(i => i.name.toLowerCase().includes(store.searchQuery));
    }

    if (store.cart.length === 0) {
      this.cartEmptyState?.classList.remove('hidden');
      this.cartItemList.innerHTML = '';
      if (this.finishShoppingBtn) {
        this.finishShoppingBtn.disabled = true;
        this.finishShoppingBtn.classList.add('opacity-50', 'pointer-events-none');
      }
      return;
    }

    if (this.finishShoppingBtn) {
      this.finishShoppingBtn.disabled = false;
      this.finishShoppingBtn.classList.remove('opacity-50', 'pointer-events-none');
    }

    if (filtered.length === 0) {
      this.cartEmptyState?.classList.add('hidden');
      this.cartItemList.innerHTML = `
        <div class="py-12 text-center text-slate-400">
          <p class="text-sm font-bold text-slate-600">Tidak ada jajanan yang cocok dengan "${store.searchQuery}"</p>
          <button type="button" class="mt-3 text-xs text-pink-600 underline font-black" id="btn-reset-filters">Tampilkan Semua Jajanan</button>
        </div>
      `;
      document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
        store.searchQuery = '';
        store.selectedCategory = 'all';
        if (this.searchInput) this.searchInput.value = '';
        this.clearSearchBtn?.classList.add('hidden');
        this.render();
      });
      return;
    }

    this.cartEmptyState?.classList.add('hidden');
    this.cartItemList.innerHTML = '';

    filtered.forEach(item => {
      const card = this.createItemCard(item);
      this.cartItemList.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'grocery-card relative bg-white border-2 border-pink-200 rounded-3xl p-3.5 shadow-sm hover:border-pink-400 transition-all';
    card.dataset.itemId = item.id;

    const totals = Calculator.getItemTotals(item);
    const catObj = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[1];

    // Price Comparator Badge
    let priceComparatorBadge = '';
    if (item.lastMonthPrice !== null && item.lastMonthPrice !== undefined && item.lastMonthPrice > 0) {
      const diff = item.unitPrice - item.lastMonthPrice;
      if (diff > 0) {
        priceComparatorBadge = `
          <span class="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 border border-rose-200">
            &uarr; +${formatRupiah(diff)} (Naik)
          </span>
        `;
      } else if (diff < 0) {
        priceComparatorBadge = `
          <span class="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200">
            &darr; -${formatRupiah(Math.abs(diff))} (Hemat)
          </span>
        `;
      } else {
        priceComparatorBadge = `
          <span class="inline-flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-pink-50 text-pink-600 border border-pink-200">
            = ${formatRupiah(item.unitPrice)} (Harga Pas)
          </span>
        `;
      }
    } else {
      priceComparatorBadge = `
        <span class="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-sky-100 text-sky-700 border border-sky-200">
          ⭐ Jajanan Baru
        </span>
      `;
    }

    // Discount Badge & Price Display
    let discountBadgeHtml = '';
    let unitPriceHtml = '';

    if (totals.isDiscounted) {
      discountBadgeHtml = `
        <span class="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 border border-amber-300">
          Diskon ${totals.discountText}
        </span>
        <span class="text-[11px] font-bold text-emerald-600">
          Hemat ${formatRupiah(totals.totalSaving)}
        </span>
      `;
      unitPriceHtml = `
        <div class="flex items-baseline gap-1.5 flex-wrap">
          <span class="text-sm font-black text-pink-600 font-mono-num">${formatRupiah(totals.finalUnitPrice)}</span>
          <span class="text-xs text-slate-400 line-through font-mono-num">${formatRupiah(item.unitPrice)}</span>
          <span class="text-xs text-slate-500">/${item.unit}</span>
        </div>
      `;
    } else {
      unitPriceHtml = `
        <div class="flex items-baseline gap-1">
          <span class="text-sm font-black text-pink-600 font-mono-num">${formatRupiah(item.unitPrice)}</span>
          <span class="text-xs text-slate-500">/${item.unit}</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5 flex-wrap mb-1">
            <span class="text-[10px] font-black tracking-wider px-2 py-0.5 rounded-md border ${catObj.color}">
              ${catObj.name}
            </span>
            ${priceComparatorBadge}
          </div>

          <h3 class="text-sm font-black text-slate-800 truncate pr-2 item-title cursor-pointer" title="${item.name}">
            ${item.name}
          </h3>
          ${unitPriceHtml}

          <div class="flex items-center gap-2 mt-1 flex-wrap">
            ${discountBadgeHtml}
          </div>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <button type="button" class="btn-edit-item touch-target w-8 h-8 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 tap-effect" title="Edit">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button type="button" class="btn-delete-item touch-target w-8 h-8 rounded-xl bg-pink-50 text-rose-500 hover:bg-rose-100 tap-effect" title="Hapus">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <div class="pt-2 mt-2 border-t border-pink-100 flex items-center justify-between gap-3">
        <div>
          <span class="text-[11px] text-pink-500 block font-bold">Subtotal</span>
          <span class="text-base font-black text-pink-700 font-mono-num tracking-tight">${formatRupiah(totals.subtotal)}</span>
        </div>

        <div class="flex items-center bg-pink-50 rounded-2xl p-1 border border-pink-200 shadow-inner">
          <button type="button" class="btn-stepper-minus touch-target w-10 h-10 rounded-xl bg-white text-pink-700 active:bg-rose-500 active:text-white tap-effect font-black text-xl flex items-center justify-center shadow-xs">
            <i data-lucide="minus" class="w-4 h-4"></i>
          </button>
          <div class="w-12 text-center">
            <span class="font-black text-base text-pink-700 font-mono-num">${item.qty}</span>
            <span class="text-[10px] text-pink-400 block -mt-1 font-semibold">${item.unit}</span>
          </div>
          <button type="button" class="btn-stepper-plus touch-target w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white active:scale-95 tap-effect font-black text-xl flex items-center justify-center shadow-xs">
            <i data-lucide="plus" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;

    // Event Bindings
    const minusBtn = card.querySelector('.btn-stepper-minus');
    const plusBtn = card.querySelector('.btn-stepper-plus');
    const editBtn = card.querySelector('.btn-edit-item');
    const deleteBtn = card.querySelector('.btn-delete-item');
    const titleEl = card.querySelector('.item-title');

    minusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const res = store.updateQty(item.id, -1);
      if (res && res.requestDelete) {
        feedback.tap();
        this.openConfirmDeleteModal(item);
      } else {
        feedback.decrement();
      }
    });

    plusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      feedback.increment();
      store.updateQty(item.id, 1);

      const summary = store.getCartSummary();
      if (summary.budgetStatus === 'danger' && !this.overbudgetWarningSuppressed) {
        this.triggerOverbudgetDanger(summary);
      }
    });

    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      feedback.tap();
      this.openAddItemModal(item);
    });

    titleEl.addEventListener('click', (e) => {
      e.stopPropagation();
      feedback.tap();
      this.openAddItemModal(item);
    });

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      feedback.tap();
      this.openConfirmDeleteModal(item);
    });

    return card;
  }

  renderHistoryList() {
    if (!this.historyList) return;
    this.historyList.innerHTML = '';

    const history = store.history;
    if (history.length === 0) {
      this.historyEmptyState?.classList.remove('hidden');
      if (this.historyTotalTrips) this.historyTotalTrips.textContent = '0 Kali Belanja';
      if (this.historyAllSpent) this.historyAllSpent.textContent = 'Rp 0';
      return;
    }

    this.historyEmptyState?.classList.add('hidden');
    const totalSpentAll = history.reduce((acc, t) => acc + (t.totalSpent || 0), 0);
    if (this.historyTotalTrips) this.historyTotalTrips.textContent = `${history.length} Kali Belanja ⭐`;
    if (this.historyAllSpent) this.historyAllSpent.textContent = formatRupiah(totalSpentAll);

    history.forEach(trip => {
      const tripCard = document.createElement('div');
      tripCard.className = 'bg-white border-2 border-pink-200 rounded-3xl p-4 shadow-xs space-y-3';
      
      const itemsListHtml = (trip.items || []).slice(0, 4).map(it => `
        <div class="flex items-center justify-between text-xs py-1 border-b border-pink-100 last:border-0 font-medium">
          <span class="text-slate-700 truncate max-w-[200px]">${it.name} (${it.qty} ${it.unit})</span>
          <span class="font-mono-num text-pink-700 font-bold">${formatRupiah(it.subtotal)}</span>
        </div>
      `).join('');

      tripCard.innerHTML = `
        <div class="flex items-center justify-between border-b border-pink-100 pb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-base">
              🌸
            </div>
            <div>
              <span class="text-xs font-black text-pink-700 block">${formatDateIndo(trip.date)}</span>
              <span class="text-[10px] text-pink-500 font-bold">${trip.itemCount || 0} macam jajanan</span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-sm font-black text-pink-700 font-mono-num block">${formatRupiah(trip.totalSpent)}</span>
            ${trip.totalSaved > 0 ? `<span class="text-[10px] text-emerald-600 font-extrabold">Hemat ${formatRupiah(trip.totalSaved)}</span>` : ''}
          </div>
        </div>

        <div class="bg-pink-50 rounded-2xl p-2.5 space-y-1">
          ${itemsListHtml}
          ${(trip.items || []).length > 4 ? `<div class="text-[10px] text-pink-500 text-center pt-1 font-bold">+ ${(trip.items || []).length - 4} jajanan lainnya</div>` : ''}
        </div>
      `;

      this.historyList.appendChild(tripCard);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderAnggaranPage() {
    const summary = store.getCartSummary();

    if (this.budgetPageLimit) this.budgetPageLimit.textContent = formatRupiah(store.budgetLimit);
    if (this.budgetPageCurrent) this.budgetPageCurrent.textContent = formatRupiah(summary.totalSpent);
    if (this.budgetPagePercent) {
      this.budgetPagePercent.textContent = `${Math.round(summary.rawPercentage)}% Digunakan`;
      this.budgetPagePercent.className = summary.budgetStatus === 'danger' ? 'font-black text-rose-600' : 'font-black text-pink-600';
    }

    if (this.budgetGaugeBar) {
      this.budgetGaugeBar.style.width = `${summary.budgetUsagePercent}%`;
      this.budgetGaugeBar.className = `h-full rounded-full transition-all duration-300 ${
        summary.budgetStatus === 'danger' ? 'bg-rose-500' : summary.budgetStatus === 'warning' ? 'bg-amber-400' : 'bg-gradient-to-r from-pink-400 to-pink-500'
      }`;
    }

    if (this.budgetBreakdownContainer) {
      this.budgetBreakdownContainer.innerHTML = '';
      const spend = summary.categorySpend || {};
      const catKeys = Object.keys(spend);

      if (catKeys.length === 0) {
        this.budgetBreakdownContainer.innerHTML = `
          <div class="text-center py-4 text-xs text-pink-400 font-bold">
            Troli masih kosong. Belum ada pengeluaran jajanan.
          </div>
        `;
      } else {
        catKeys.forEach(catId => {
          const catObj = CATEGORIES.find(c => c.id === catId) || { name: catId, color: 'bg-pink-100' };
          const amount = spend[catId];
          const pct = summary.totalSpent > 0 ? Math.round((amount / summary.totalSpent) * 100) : 0;

          const row = document.createElement('div');
          row.className = 'space-y-1 text-xs';
          row.innerHTML = `
            <div class="flex items-center justify-between">
              <span class="text-slate-700 font-bold">${catObj.name}</span>
              <span class="font-mono-num font-black text-pink-700">${formatRupiah(amount)} (${pct}%)</span>
            </div>
            <div class="w-full bg-pink-100 rounded-full h-2 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" style="width: ${pct}%"></div>
            </div>
          `;
          this.budgetBreakdownContainer.appendChild(row);
        });
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.firebaseSync) {
    window.firebaseSync.init(store);
  }
  window.appController = new GroceryUIController();
});
