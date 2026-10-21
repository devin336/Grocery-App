/**
 * Dvh Grocery | Smart Grocery & Budget Safety Tracker (PWA)
 * Designed for one-handed mobile supermarket shopping with real-time budget safety
 */

// ==========================================
// 1. DATA MODELS & CONSTANTS
// ==========================================
const STORAGE_KEYS = {
  ACTIVE_USER: 'dvh_grocery_active_user_v2',
  CART: 'dvh_grocery_cart_v2',
  HISTORY: 'dvh_grocery_history_v2',
  PRICE_LOOKUP: 'dvh_grocery_lookup_v2',
  BUDGET: 'dvh_grocery_budget_v2',
  INITIALIZED: 'dvh_grocery_init_v2'
};

const CATEGORIES = [
  { id: 'all', name: 'Semua', icon: 'layout-grid', color: 'bg-slate-700 text-slate-200 border-slate-600' },
  { id: 'sayur', name: 'Sayur Mayur', icon: 'salad', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { id: 'minuman', name: 'Minuman & Susu', icon: 'coffee', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { id: 'sembako', name: 'Bumbu & Sembako', icon: 'wheat', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { id: 'kebersihan', name: 'Kebersihan & Mandi', icon: 'sparkles', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { id: 'buah', name: 'Buah Segar', icon: 'apple', color: 'bg-lime-500/20 text-lime-300 border-lime-500/30' },
  { id: 'daging', name: 'Daging & Lauk', icon: 'drumstick', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  { id: 'camilan', name: 'Camilan & Snack', icon: 'cookie', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  { id: 'peralatan', name: 'Peralatan', icon: 'wrench', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { id: 'lainnya', name: 'Lainnya', icon: 'tag', color: 'bg-slate-700 text-slate-200 border-slate-600' }
];

const UNITS = ['pcs', 'ikat', 'kg', 'liter', 'botol', 'pack', 'kaleng'];

// Default initial items in cart
const MOCK_ITEMS = [
  {
    id: 'mock-1',
    name: 'Bayam Hijau Hidroponik (Ikat)',
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
    name: 'Air Mineral Aqua 1.5L',
    category: 'minuman',
    unit: 'botol',
    qty: 2,
    unitPrice: 7000,
    lastMonthPrice: 6500,
    discountRaw: '0',
    createdAt: Date.now() - 300000
  },
  {
    id: 'mock-3',
    name: 'Minyak Goreng Sawit 2L',
    category: 'sembako',
    unit: 'liter',
    qty: 1,
    unitPrice: 38000,
    lastMonthPrice: 42000,
    discountRaw: '10%',
    createdAt: Date.now() - 200000
  },
  {
    id: 'mock-4',
    name: 'Sabun Mandi Cair Refill 450ml',
    category: 'kebersihan',
    unit: 'pack',
    qty: 1,
    unitPrice: 24000,
    lastMonthPrice: 24000,
    discountRaw: '50%+20%',
    createdAt: Date.now() - 100000
  },
  {
    id: 'mock-5',
    name: 'Susu UHT Ultra Milk Full Cream 1L',
    category: 'minuman',
    unit: 'liter',
    qty: 1,
    unitPrice: 19500,
    lastMonthPrice: 18500,
    discountRaw: '0',
    createdAt: Date.now() - 50000
  }
];

// 1-Tap Quick Catalog Carousel items (User can tap + to add immediately)
const QUICK_CATALOG_ITEMS = [
  { name: 'Bayam Hijau Segar', category: 'sayur', unit: 'ikat', price: 6000, lastMonthPrice: 5500, discount: '' },
  { name: 'Kangkung Hidroponik', category: 'sayur', unit: 'ikat', price: 5000, lastMonthPrice: 5000, discount: '' },
  { name: 'Brokoli Hijau 500g', category: 'sayur', unit: 'pack', price: 18000, lastMonthPrice: 20000, discount: '' },
  { name: 'Wortel Berastagi', category: 'sayur', unit: 'kg', price: 12000, lastMonthPrice: 12000, discount: '' },
  { name: 'Air Aqua 1.5L', category: 'minuman', unit: 'botol', price: 7000, lastMonthPrice: 6500, discount: '' },
  { name: 'Le Minerale 600ml', category: 'minuman', unit: 'botol', price: 3500, lastMonthPrice: 3500, discount: '' },
  { name: 'Coca-Cola Pet 390ml', category: 'minuman', unit: 'botol', price: 6500, lastMonthPrice: 6500, discount: '' },
  { name: 'Sprite Kaleng 330ml', category: 'minuman', unit: 'kaleng', price: 7500, lastMonthPrice: 7000, discount: '' },
  { name: 'Susu Ultra Milk 1L', category: 'minuman', unit: 'liter', price: 19500, lastMonthPrice: 18500, discount: '' },
  { name: 'Kopi Cold Brew 220ml', category: 'minuman', unit: 'botol', price: 11000, lastMonthPrice: 11000, discount: '' },
  { name: 'Pocari Sweat 500ml', category: 'minuman', unit: 'botol', price: 8000, lastMonthPrice: 7500, discount: '' },
  { name: 'Beras Pulen 5kg', category: 'sembako', unit: 'pack', price: 72000, lastMonthPrice: 68000, discount: '' },
  { name: 'Telur Ayam 1kg', category: 'sembako', unit: 'kg', price: 31000, lastMonthPrice: 32000, discount: '' },
  { name: 'Minyak Sawit 2L', category: 'sembako', unit: 'liter', price: 38000, lastMonthPrice: 42000, discount: '10%' },
  { name: 'Daging Ayam Fillet', category: 'daging', unit: 'kg', price: 29000, lastMonthPrice: 28000, discount: '' }
];

// Product lookup database for instant autofill
const MOCK_LOOKUP = {
  // Sayur Mayur
  'bayam hijau hidroponik (ikat)': { price: 6000, unit: 'ikat', category: 'sayur' },
  'bayam': { price: 6000, unit: 'ikat', category: 'sayur' },
  'kangkung segar (ikat)': { price: 5000, unit: 'ikat', category: 'sayur' },
  'kangkung': { price: 5000, unit: 'ikat', category: 'sayur' },
  'brokoli hijau segar 500g': { price: 18000, unit: 'pack', category: 'sayur' },
  'brokoli': { price: 18000, unit: 'pack', category: 'sayur' },
  'wortel berastagi 500g': { price: 12000, unit: 'kg', category: 'sayur' },
  'wortel': { price: 12000, unit: 'kg', category: 'sayur' },
  'pakcoy hidroponik 250g': { price: 7500, unit: 'pack', category: 'sayur' },
  'pakcoy': { price: 7500, unit: 'pack', category: 'sayur' },
  'selada keriting fresh 250g': { price: 8000, unit: 'pack', category: 'sayur' },
  'selada': { price: 8000, unit: 'pack', category: 'sayur' },
  'buncis muda 500g': { price: 11000, unit: 'pack', category: 'sayur' },
  'buncis': { price: 11000, unit: 'pack', category: 'sayur' },
  'kubis / kol putih 1kg': { price: 10000, unit: 'kg', category: 'sayur' },
  'kol': { price: 10000, unit: 'kg', category: 'sayur' },
  'terong ungu 500g': { price: 8500, unit: 'kg', category: 'sayur' },
  'terong': { price: 8500, unit: 'kg', category: 'sayur' },
  'tomat merah segar 500g': { price: 9000, unit: 'kg', category: 'sayur' },
  'tomat': { price: 9000, unit: 'kg', category: 'sayur' },
  'sawi putih 1kg': { price: 12000, unit: 'kg', category: 'sayur' },
  'sawi': { price: 12000, unit: 'kg', category: 'sayur' },
  'jamur tiram 250g': { price: 7000, unit: 'pack', category: 'sayur' },
  'jamur': { price: 7000, unit: 'pack', category: 'sayur' },

  // Minuman & Susu
  'air mineral aqua 1.5l': { price: 7000, unit: 'botol', category: 'minuman' },
  'aqua': { price: 7000, unit: 'botol', category: 'minuman' },
  'air mineral le minerale 600ml': { price: 3500, unit: 'botol', category: 'minuman' },
  'le minerale': { price: 3500, unit: 'botol', category: 'minuman' },
  'air mineral club 1.5l': { price: 5000, unit: 'botol', category: 'minuman' },
  'coca-cola pet 390ml': { price: 6500, unit: 'botol', category: 'minuman' },
  'coca cola': { price: 6500, unit: 'botol', category: 'minuman' },
  'coca-cola': { price: 6500, unit: 'botol', category: 'minuman' },
  'sprite kaleng 330ml': { price: 7500, unit: 'kaleng', category: 'minuman' },
  'sprite': { price: 7500, unit: 'kaleng', category: 'minuman' },
  'fanta merah strawberry 390ml': { price: 6500, unit: 'botol', category: 'minuman' },
  'fanta': { price: 6500, unit: 'botol', category: 'minuman' },
  'susu uht ultra milk full cream 1l': { price: 19500, unit: 'liter', category: 'minuman' },
  'susu ultra milk': { price: 19500, unit: 'liter', category: 'minuman' },
  'ultra milk': { price: 19500, unit: 'liter', category: 'minuman' },
  'susu': { price: 19500, unit: 'liter', category: 'minuman' },
  'susu bear brand steril 189ml': { price: 10500, unit: 'kaleng', category: 'minuman' },
  'bear brand': { price: 10500, unit: 'kaleng', category: 'minuman' },
  'kopi nescape cold brew 220ml': { price: 11000, unit: 'botol', category: 'minuman' },
  'kopi': { price: 11000, unit: 'botol', category: 'minuman' },
  'teh pucuk harum 350ml': { price: 4000, unit: 'botol', category: 'minuman' },
  'teh pucuk': { price: 4000, unit: 'botol', category: 'minuman' },
  'pocari sweat botol 500ml': { price: 8000, unit: 'botol', category: 'minuman' },
  'pocari': { price: 8000, unit: 'botol', category: 'minuman' },
  'buavita jus jambu 250ml': { price: 8500, unit: 'pack', category: 'minuman' },
  'buavita': { price: 8500, unit: 'pack', category: 'minuman' },
  'milo susu uht kotak 180ml': { price: 6000, unit: 'pack', category: 'minuman' },
  'milo': { price: 6000, unit: 'pack', category: 'minuman' },

  // Bumbu & Sembako
  'beras pulen super 5kg': { price: 72000, unit: 'pack', category: 'sembako' },
  'beras': { price: 72000, unit: 'pack', category: 'sembako' },
  'minyak goreng sawit 2l': { price: 38000, unit: 'liter', category: 'sembako' },
  'minyak goreng': { price: 38000, unit: 'liter', category: 'sembako' },
  'minyak': { price: 38000, unit: 'liter', category: 'sembako' },
  'telur ayam negeri 1kg': { price: 31000, unit: 'kg', category: 'sembako' },
  'telur': { price: 31000, unit: 'kg', category: 'sembako' },
  'gula pasir gulaku 1kg': { price: 17500, unit: 'kg', category: 'sembako' },
  'gula': { price: 17500, unit: 'kg', category: 'sembako' },
  'garam dapur beriodium 250g': { price: 4500, unit: 'pcs', category: 'sembako' },
  'garam': { price: 4500, unit: 'pcs', category: 'sembako' },
  'kecap manis bango 550ml': { price: 23500, unit: 'botol', category: 'sembako' },
  'kecap': { price: 23500, unit: 'botol', category: 'sembako' },
  'indomie goreng original (dus/40pcs)': { price: 115000, unit: 'pack', category: 'sembako' },
  'mie instan': { price: 3500, unit: 'pcs', category: 'sembako' },
  'indomie': { price: 3500, unit: 'pcs', category: 'sembako' },

  // Kebersihan & Mandi
  'sabun mandi cair refill 450ml': { price: 24000, unit: 'pack', category: 'kebersihan' },
  'sabun mandi': { price: 24000, unit: 'pack', category: 'kebersihan' },
  'sabun': { price: 24000, unit: 'pack', category: 'kebersihan' },
  'deterjen bubuk attack 800g': { price: 26500, unit: 'pack', category: 'kebersihan' },
  'deterjen': { price: 26500, unit: 'pack', category: 'kebersihan' },
  'sampo pantene anti dandruff 160ml': { price: 27000, unit: 'botol', category: 'kebersihan' },
  'sampo': { price: 27000, unit: 'botol', category: 'kebersihan' },
  'pasta gigi pepsodent 190g': { price: 14500, unit: 'pcs', category: 'kebersihan' },
  'pepsodent': { price: 14500, unit: 'pcs', category: 'kebersihan' },

  // Peralatan
  'wajan anti lengket': { price: 100000, unit: 'pcs', category: 'peralatan' },
  'wajan': { price: 100000, unit: 'pcs', category: 'peralatan' }
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
      } catch (e) {
        // Ignored
      }
    }
  }

  playBeep(freq = 440, type = 'sine', duration = 0.08, volume = 0.05) {
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
    } catch (e) {
      // Audio fallback
    }
  }

  tap() {
    this.vibrate(12);
    this.playBeep(520, 'sine', 0.04, 0.03);
  }

  increment() {
    this.vibrate(18);
    this.playBeep(680, 'sine', 0.05, 0.04);
  }

  decrement() {
    this.vibrate(18);
    this.playBeep(420, 'triangle', 0.05, 0.04);
  }

  success() {
    this.vibrate([25, 40, 35]);
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      [523, 659, 784, 1046].forEach((f, i) => {
        setTimeout(() => this.playBeep(f, 'sine', 0.09, 0.05), i * 65);
      });
    } catch (e) {}
  }

  dangerAlert() {
    this.vibrate([80, 50, 100, 50, 120]);
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      this.playBeep(320, 'sawtooth', 0.15, 0.08);
      setTimeout(() => this.playBeep(260, 'sawtooth', 0.25, 0.09), 140);
    } catch (e) {}
  }
}

const feedback = new FeedbackEngine();

// ==========================================
// 3. DISCOUNT & CALCULATION ENGINE [F-03]
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

    // Case 1: Multi-tiered percentage e.g. "50%+20%"
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
    }
    // Case 2: Contains '%' symbol e.g. "25%"
    else if (str.includes('%')) {
      const pct = parseFloat(str.replace(/[^0-9.]/g, ''));
      if (!isNaN(pct) && pct > 0) {
        finalUnitPrice = Math.max(0, Math.round(unitPrice * (1 - Math.min(100, pct) / 100)));
        discountText = `${pct}%`;
      }
    }
    // Case 3: Pure number without %
    else {
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

// ==========================================
// 4. UTILITIES & FORMATTERS
// ==========================================
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
// 5. APPLICATION STATE STORE
// ==========================================
class GroceryStore {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_USER) || 'null');
    
    // Auto-login to Devin if not authenticated so user sees the app immediately
    if (!this.currentUser) {
      this.currentUser = {
        username: 'devin',
        name: 'Devin (Anak Kos)',
        pin: '1234',
        loginAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
    }

    this.cart = [];
    this.history = [];
    this.priceLookup = { ...MOCK_LOOKUP };
    this.budgetLimit = 350000; // Target Belanja Grosir Per Bulan Rp 350.000
    this.currentTab = 'belanja'; // 'belanja' | 'riwayat' | 'anggaran'
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.listeners = [];

    this.loadState();
  }

  getKey(key) {
    const user = (this.currentUser && this.currentUser.username)
      ? this.currentUser.username.toLowerCase().trim()
      : 'devin';
    return `dvh_grocery_${user}_${key}_v2`;
  }

  login(username, pin = '1234') {
    const cleanUser = String(username || 'devin').toLowerCase().trim();
    const displayName = cleanUser === 'devin' 
      ? 'Devin (Anak Kos)' 
      : cleanUser === 'rian'
      ? 'Rian (Anak Kos)'
      : cleanUser.charAt(0).toUpperCase() + cleanUser.slice(1);
    
    this.currentUser = {
      username: cleanUser,
      name: displayName,
      pin: pin || '1234',
      loginAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
    this.loadState();
    this.notify(true);
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
    this.notify(true);
  }

  loadState() {
    try {
      const savedCart = localStorage.getItem(this.getKey('cart'));
      const savedHistory = localStorage.getItem(this.getKey('history'));
      const savedLookup = localStorage.getItem(this.getKey('lookup'));
      const savedBudget = localStorage.getItem(this.getKey('budget'));

      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      } else {
        this.cart = [...MOCK_ITEMS];
        this.saveState();
      }

      if (savedHistory) {
        this.history = JSON.parse(savedHistory);
      } else {
        this.history = [
          {
            id: 'trip-past-1',
            date: Date.now() - 2592000000, // 30 hari lalu
            totalSpent: 312000,
            totalSaved: 48000,
            budgetLimit: 350000,
            itemCount: 6,
            items: [
              { name: 'Beras Pulen 5kg', qty: 1, unit: 'pack', subtotal: 68000 },
              { name: 'Minyak Goreng 2L', qty: 2, unit: 'liter', subtotal: 84000 },
              { name: 'Deterjen Bubuk 800g', qty: 1, unit: 'pack', subtotal: 28000 },
              { name: 'Bayam Hijau', qty: 3, unit: 'ikat', subtotal: 16500 },
              { name: 'Air Aqua 1.5L', qty: 4, unit: 'botol', subtotal: 26000 },
              { name: 'Telur Ayam 1kg', qty: 1, unit: 'kg', subtotal: 32000 }
            ]
          }
        ];
        this.saveState();
      }

      if (savedLookup) {
        this.priceLookup = { ...MOCK_LOOKUP, ...JSON.parse(savedLookup) };
      } else {
        this.priceLookup = { ...MOCK_LOOKUP };
      }

      if (savedBudget) {
        this.budgetLimit = parseInt(savedBudget, 10) || 350000;
      }
    } catch (e) {
      console.warn('Error loading state from localStorage:', e);
      this.cart = [...MOCK_ITEMS];
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.getKey('cart'), JSON.stringify(this.cart));
      localStorage.setItem(this.getKey('history'), JSON.stringify(this.history));
      localStorage.setItem(this.getKey('lookup'), JSON.stringify(this.priceLookup));
      localStorage.setItem(this.getKey('budget'), String(this.budgetLimit));
    } catch (e) {
      console.warn('Error saving state:', e);
    }
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify(force = false) {
    this.saveState();
    this.listeners.forEach(fn => fn(this));
  }

  // ==========================================
  // CART OPERATIONS [F-01, F-02]
  // ==========================================
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

    // Update lookup table
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

    // Update priceLookup table
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

    let budgetStatus = 'safe'; // Green: < 90%
    if (totalSpent > this.budgetLimit) {
      budgetStatus = 'danger'; // Red: > 100%
    } else if (rawPercentage >= 90) {
      budgetStatus = 'warning'; // Amber: 90% - 100%
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
// 6. UI CONTROLLER
// ==========================================
class GroceryUIController {
  constructor() {
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
    // Auth Views
    this.viewLoginScreen = document.getElementById('view-login-screen');
    this.formLogin = document.getElementById('form-login');
    this.inputLoginUsername = document.getElementById('login-username');
    this.inputLoginPin = document.getElementById('login-pin');
    this.btnQuickLoginRian = document.getElementById('btn-quick-login-rian');
    this.btnLogout = document.getElementById('btn-logout');
    this.btnTabLogout = document.getElementById('btn-tab-logout');
    this.headerUserName = document.getElementById('header-user-name');
    this.tabAccountUser = document.getElementById('tab-account-user');

    // Header Elements
    this.headerContainer = document.getElementById('sticky-header-container');
    this.headerTotalSpent = document.getElementById('header-total-spent');
    this.headerBudgetLimit = document.getElementById('header-budget-limit');
    this.headerRemaining = document.getElementById('header-remaining');
    this.headerRemainingLabel = document.getElementById('header-remaining-label');
    this.headerProgressBar = document.getElementById('header-progress-bar');
    this.headerProgressPercent = document.getElementById('header-progress-percent');
    this.headerStatusBadge = document.getElementById('header-status-badge');
    this.totalSavedBadge = document.getElementById('total-saved-badge');

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

    // Modal: Item Add/Edit
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

    // Modal: Budget Edit
    this.modalBudget = document.getElementById('modal-budget');
    this.inputBudget = document.getElementById('input-budget');
    this.formBudget = document.getElementById('form-budget');
    this.btnOpenBudgetModal = document.getElementById('btn-open-budget-modal');

    // Modal: Overbudget Danger Warning
    this.modalDanger = document.getElementById('modal-danger');
    this.dangerSpentText = document.getElementById('danger-spent-text');
    this.dangerLimitText = document.getElementById('danger-limit-text');
    this.dangerOverAmount = document.getElementById('danger-over-amount');
    this.btnDangerProceed = document.getElementById('btn-danger-proceed');
    this.btnDangerAdjust = document.getElementById('btn-danger-adjust');

    // Modal: Confirm Delete
    this.modalConfirmDelete = document.getElementById('modal-confirm-delete');
    this.deleteItemNameText = document.getElementById('delete-item-name-text');
    this.btnConfirmDelete = document.getElementById('btn-confirm-delete');
    this.btnCancelDelete = document.getElementById('btn-cancel-delete');

    // Modal: Finish Trip Celebration
    this.modalFinishTrip = document.getElementById('modal-finish-trip');
    this.finishSummaryTotal = document.getElementById('finish-summary-total');
    this.finishSummarySaved = document.getElementById('finish-summary-saved');
    this.finishSummaryCount = document.getElementById('finish-summary-count');
    this.btnFinishDone = document.getElementById('btn-finish-done');

    // Riwayat Tab Elements
    this.historyList = document.getElementById('history-list');
    this.historyEmptyState = document.getElementById('history-empty-state');
    this.historyTotalTrips = document.getElementById('history-total-trips');
    this.historyAllSpent = document.getElementById('history-all-spent');

    // Anggaran Tab Elements
    this.budgetPageLimit = document.getElementById('budget-page-limit');
    this.budgetPageCurrent = document.getElementById('budget-page-current');
    this.budgetPagePercent = document.getElementById('budget-page-percent');
    this.budgetBreakdownContainer = document.getElementById('budget-breakdown-container');
    this.budgetGaugeBar = document.getElementById('budget-gauge-bar');
  }

  bindEvents() {
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

    // Live preview inside Add/Edit Item modal
    [this.inputItemPrice, this.inputItemDiscount, this.inputItemQty].forEach(el => {
      el?.addEventListener('input', () => {
        this.updateModalCalculationPreview();
      });
    });

    // Modal Stepper inside modal
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

    // Budget Header Click to Open Budget Modal
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

    // Quick Budget Preset Buttons
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

    // Quick Runner: Muat Skenario Uji Kasus Devin
    document.getElementById('btn-load-dt2-scenarios')?.addEventListener('click', () => {
      feedback.success();
      this.loadDT2TestScenarios();
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

    // Currency input formatting on blur
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

    // Authentication listeners
    this.formLogin?.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = this.inputLoginUsername?.value.trim() || 'devin';
      const p = this.inputLoginPin?.value.trim() || '1234';
      feedback.success();
      store.login(u, p);
      this.updateAuthView();
    });

    this.btnQuickLoginRian?.addEventListener('click', () => {
      feedback.success();
      store.login('devin', '1234');
      this.updateAuthView();
    });

    const handleLogout = () => {
      feedback.tap();
      if (confirm('Kunci sesi belanja dan keluar akun? Data belanja Anda tetap aman tersimpan.')) {
        store.logout();
        this.updateAuthView();
      }
    };

    this.btnLogout?.addEventListener('click', handleLogout);
    this.btnTabLogout?.addEventListener('click', handleLogout);
  }

  updateAuthView() {
    if (!store.currentUser) {
      this.viewLoginScreen?.classList.remove('hidden');
    } else {
      this.viewLoginScreen?.classList.add('hidden');
      if (this.headerUserName) this.headerUserName.textContent = store.currentUser.username;
      if (this.tabAccountUser) this.tabAccountUser.textContent = store.currentUser.name;
      this.render();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  // Navigation & Tab Switching
  switchTab(tab) {
    feedback.tap();
    store.currentTab = tab;

    // Reset styles
    [this.navBelanja, this.navRiwayat, this.navAnggaran].forEach(el => {
      if (!el) return;
      el.classList.remove('text-emerald-400', 'font-bold');
      el.classList.add('text-slate-400');
      const icon = el.querySelector('.nav-icon-container');
      if (icon) {
        icon.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'ring-2', 'ring-emerald-500/40');
      }
    });

    [this.tabBelanja, this.tabRiwayat, this.tabAnggaran].forEach(el => {
      if (el) el.classList.add('hidden');
    });

    // Activate active tab
    if (tab === 'belanja') {
      this.tabBelanja?.classList.remove('hidden');
      this.navBelanja?.classList.add('text-emerald-400', 'font-bold');
      this.navBelanja?.classList.remove('text-slate-400');
      this.navBelanja?.querySelector('.nav-icon-container')?.classList.add('bg-emerald-500/20', 'text-emerald-400', 'ring-2', 'ring-emerald-500/40');
      this.floatingAddBtn?.classList.remove('hidden');
    } else if (tab === 'riwayat') {
      this.tabRiwayat?.classList.remove('hidden');
      this.navRiwayat?.classList.add('text-emerald-400', 'font-bold');
      this.navRiwayat?.classList.remove('text-slate-400');
      this.navRiwayat?.querySelector('.nav-icon-container')?.classList.add('bg-emerald-500/20', 'text-emerald-400', 'ring-2', 'ring-emerald-500/40');
      this.floatingAddBtn?.classList.add('hidden');
      this.renderHistoryList();
    } else if (tab === 'anggaran') {
      this.tabAnggaran?.classList.remove('hidden');
      this.navAnggaran?.classList.add('text-emerald-400', 'font-bold');
      this.navAnggaran?.classList.remove('text-slate-400');
      this.navAnggaran?.querySelector('.nav-icon-container')?.classList.add('bg-emerald-500/20', 'text-emerald-400', 'ring-2', 'ring-emerald-500/40');
      this.floatingAddBtn?.classList.add('hidden');
      this.renderAnggaranPage();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Auto Lookup [F-01]
  handleProductLookup(typedName) {
    const found = store.lookupProduct(typedName);
    if (found && typedName.trim().length >= 3) {
      this.autoLookupNotice.innerHTML = `
        <div class="flex items-center gap-1.5 text-xs text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 rounded-lg px-2.5 py-1.5 animate-fadeIn">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 text-cyan-400 shrink-0"></i>
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

  // Modal Controls: Add / Edit
  openAddItemModal(itemToEdit = null) {
    this.editingItemId = itemToEdit ? itemToEdit.id : null;
    this.formItem.reset();
    this.autoLookupNotice.classList.add('hidden');

    if (itemToEdit) {
      this.modalItemTitle.textContent = 'Edit Barang Belanja';
      this.inputItemName.value = itemToEdit.name;
      this.inputItemCategory.value = itemToEdit.category;
      this.inputItemUnit.value = itemToEdit.unit;
      this.inputItemQty.value = itemToEdit.qty;
      this.inputItemPrice.value = formatRupiahNumber(itemToEdit.unitPrice);
      this.inputItemLastPrice.value = itemToEdit.lastMonthPrice ? formatRupiahNumber(itemToEdit.lastMonthPrice) : '';
      this.inputItemDiscount.value = itemToEdit.discountRaw || '';
    } else {
      this.modalItemTitle.textContent = 'Tambah Barang Baru';
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

      // Check if newly added item pushed total into overbudget [F-05]
      const summary = store.getCartSummary();
      if (summary.budgetStatus === 'danger' && !this.overbudgetWarningSuppressed) {
        this.triggerOverbudgetDanger(summary);
      }
    }

    this.closeItemModal();
  }

  // Budget Edit Modal
  openBudgetModal() {
    this.inputBudget.value = formatRupiahNumber(store.budgetLimit);
    this.modalBudget.classList.remove('hidden');
    setTimeout(() => this.inputBudget.focus(), 100);
  }

  closeBudgetModal() {
    this.modalBudget.classList.add('hidden');
  }

  // Danger Modal [F-05]
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

  // Test Runner Preloader
  loadDT2TestScenarios() {
    this.overbudgetWarningSuppressed = false;
    store.budgetLimit = 350000;
    
    store.cart = [
      {
        id: 'dt2-1',
        name: 'Bayam Hijau Hidroponik (Ikat)',
        category: 'sayur',
        unit: 'ikat',
        qty: 3,
        unitPrice: 6000,
        lastMonthPrice: 5500, // Fluktuasi Naik (Rp 5.500 -> Rp 6.000)
        discountRaw: '0',
        createdAt: Date.now() - 60000
      },
      {
        id: 'dt2-2',
        name: 'Air Mineral Aqua 1.5L',
        category: 'minuman',
        unit: 'botol',
        qty: 4,
        unitPrice: 7000,
        lastMonthPrice: 6500,
        discountRaw: '0',
        createdAt: Date.now() - 50000
      },
      {
        id: 'dt2-3',
        name: 'Brokoli Hijau Segar 500g',
        category: 'sayur',
        unit: 'pack',
        qty: 1,
        unitPrice: 18000,
        lastMonthPrice: 20000, // Fluktuasi Turun Hemat (Rp 20.000 -> Rp 18.000)
        discountRaw: '0',
        createdAt: Date.now() - 40000
      },
      {
        id: 'dt2-4',
        name: 'Sabun Mandi Refill 450ml',
        category: 'kebersihan',
        unit: 'pack',
        qty: 2,
        unitPrice: 24000,
        lastMonthPrice: 24000,
        discountRaw: '50%+20%', // Diskon Kompound 50%+20% (Harga jadi Rp 9.600)
        createdAt: Date.now() - 30000
      },
      {
        id: 'dt2-5',
        name: 'Minyak Goreng Sawit 2L',
        category: 'sembako',
        unit: 'liter',
        qty: 2,
        unitPrice: 38000,
        lastMonthPrice: 42000,
        discountRaw: '10%', // Diskon Tunggal 10%
        createdAt: Date.now() - 20000
      },
      {
        id: 'dt2-6',
        name: 'Beras Pulen Super 5kg',
        category: 'sembako',
        unit: 'pack',
        qty: 2,
        unitPrice: 74000,
        lastMonthPrice: 68000,
        discountRaw: '0',
        createdAt: Date.now() - 10000
      }
    ];

    store.notify();
    alert('✅ Data Uji Kasus Devin berhasil dimuat!\n\n1. Skenario Kategori Murni: Sayur Mayur (Bayam, Brokoli) & Minuman (Aqua 1.5L)\n2. Skenario Diskon Bertingkat: Sabun 50%+20% (Hemat 60%)\n3. Skenario Komparasi Harga: Bayam (Naik ↑), Brokoli (Turun ↓), Sabun (Stabil =)\n4. Cek Gauge: Total anggaran mendekati batas limit!');
  }

  // Confirm Delete Modal
  openConfirmDeleteModal(item) {
    this.pendingDeleteItem = item;
    this.deleteItemNameText.textContent = `"${item.name}"`;
    this.modalConfirmDelete.classList.remove('hidden');
  }

  closeConfirmDeleteModal() {
    this.modalConfirmDelete.classList.add('hidden');
    this.pendingDeleteItem = null;
  }

  // Finish Trip Modal
  handleFinishShopping() {
    if (store.cart.length === 0) {
      alert('Keranjang belanja masih kosong!');
      return;
    }

    const confirmFinish = confirm('Selesaikan dan simpan belanjaan hari ini? Seluruh item akan diarsipkan ke Tab Riwayat dan harga terbarunya disimpan sebagai acuan bulan depan.');
    if (!confirmFinish) return;

    feedback.success();

    // Trigger celebration confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    const trip = store.finishCurrentTrip();

    this.finishSummaryTotal.textContent = formatRupiah(trip.totalSpent);
    this.finishSummarySaved.textContent = formatRupiah(trip.totalSaved);
    this.finishSummaryCount.textContent = `${trip.itemCount} Barang`;

    this.modalFinishTrip.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  closeFinishTripModal() {
    this.modalFinishTrip.classList.add('hidden');
  }

  // Main Render Method
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

  // Sticky Header & Budget Safety
  renderHeaderBudget() {
    const summary = store.getCartSummary();

    this.headerTotalSpent.textContent = formatRupiah(summary.totalSpent);
    this.headerBudgetLimit.textContent = formatRupiah(store.budgetLimit);

    if (summary.remainingBudget >= 0) {
      this.headerRemaining.textContent = formatRupiah(summary.remainingBudget);
      this.headerRemaining.classList.remove('text-rose-400');
      this.headerRemaining.classList.add('text-emerald-400');
      this.headerRemainingLabel.textContent = 'Sisa Anggaran';
    } else {
      this.headerRemaining.textContent = `- ${formatRupiah(Math.abs(summary.remainingBudget))}`;
      this.headerRemaining.classList.remove('text-emerald-400');
      this.headerRemaining.classList.add('text-rose-400');
      this.headerRemainingLabel.textContent = 'Defisit Overbudget!';
    }

    this.headerProgressBar.style.width = `${summary.budgetUsagePercent}%`;
    this.headerProgressPercent.textContent = `${Math.round(summary.rawPercentage)}%`;

    this.headerContainer.classList.remove('animate-danger-pulse', 'border-rose-500/70', 'border-amber-500/50');
    this.headerProgressBar.classList.remove('bg-emerald-500', 'bg-amber-500', 'bg-rose-500');

    const overbudgetTopBanner = document.getElementById('overbudget-top-banner');

    if (summary.budgetStatus === 'safe') {
      this.headerProgressBar.classList.add('bg-emerald-500');
      this.headerStatusBadge.className = 'text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1';
      this.headerStatusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Aman`;
      if (overbudgetTopBanner) overbudgetTopBanner.classList.add('hidden');
    } else if (summary.budgetStatus === 'warning') {
      this.headerProgressBar.classList.add('bg-amber-500');
      this.headerContainer.classList.add('border-amber-500/50');
      this.headerStatusBadge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 animate-soft-pulse';
      this.headerStatusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Waspada (${Math.round(summary.rawPercentage)}%)`;
      if (overbudgetTopBanner) overbudgetTopBanner.classList.add('hidden');
    } else {
      this.headerProgressBar.classList.add('bg-rose-500');
      this.headerContainer.classList.add('animate-danger-pulse', 'border-rose-500/70');
      this.headerStatusBadge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white flex items-center gap-1';
      this.headerStatusBadge.innerHTML = `<i data-lucide="alert-triangle" class="w-3 h-3"></i> OVERBUDGET!`;
      if (overbudgetTopBanner) overbudgetTopBanner.classList.remove('hidden');
    }

    if (summary.totalSaved > 0) {
      this.totalSavedBadge.innerHTML = `
        <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
          <i data-lucide="tag" class="w-3.5 h-3.5 text-emerald-400"></i>
          <span>Total Hemat: ${formatRupiah(summary.totalSaved)}</span>
        </div>
      `;
      this.totalSavedBadge.classList.remove('hidden');
    } else {
      this.totalSavedBadge.classList.add('hidden');
    }
  }

  // Category Filter Pills
  renderCategoryFilters() {
    if (!this.categoryFiltersContainer) return;
    this.categoryFiltersContainer.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const isSelected = store.selectedCategory === cat.id;
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = `shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 flex items-center gap-1.5 tap-effect ${
        isSelected
          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
          : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
      }`;
      pill.innerHTML = `
        <i data-lucide="${cat.icon}" class="w-3.5 h-3.5"></i>
        <span>${cat.name}</span>
      `;

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

  // 1-Tap Quick Catalog Carousel
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
      card.className = 'shrink-0 w-36 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col justify-between shadow-sm hover:border-emerald-500/50 transition-all';
      
      const catObj = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[1];

      card.innerHTML = `
        <div>
          <span class="text-[9px] font-bold px-1.5 py-0.5 rounded ${catObj.color} inline-block mb-1">
            ${catObj.name}
          </span>
          <h4 class="text-xs font-bold text-slate-100 truncate" title="${item.name}">${item.name}</h4>
          <div class="text-[11px] font-mono-num font-extrabold text-emerald-400 mt-0.5">
            ${formatRupiah(item.price)}
          </div>
        </div>

        <button 
          type="button" 
          class="mt-2 w-full py-1 px-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30 text-[10px] font-extrabold flex items-center justify-center gap-1 tap-effect transition-all"
        >
          <i data-lucide="plus" class="w-3 h-3"></i>
          <span>Tambah</span>
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

  // Cart List & Item Cards
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
          <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-2 text-slate-500"></i>
          <p class="text-sm font-medium">Tidak ada barang yang cocok dengan "${store.searchQuery}"</p>
          <button type="button" class="mt-3 text-xs text-emerald-400 underline font-semibold" id="btn-reset-filters">Reset Pencarian & Kategori</button>
        </div>
      `;
      document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
        store.searchQuery = '';
        store.selectedCategory = 'all';
        if (this.searchInput) this.searchInput.value = '';
        this.clearSearchBtn?.classList.add('hidden');
        this.render();
      });
      if (window.lucide) window.lucide.createIcons();
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
    card.className = 'grocery-card relative bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3.5 shadow-lg backdrop-blur-md hover:border-slate-700/80 transition-all';
    card.dataset.itemId = item.id;

    const totals = Calculator.getItemTotals(item);
    const catObj = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[1];

    // Price Comparator Badge
    let priceComparatorBadge = '';
    if (item.lastMonthPrice !== null && item.lastMonthPrice !== undefined && item.lastMonthPrice > 0) {
      const diff = item.unitPrice - item.lastMonthPrice;
      if (diff > 0) {
        priceComparatorBadge = `
          <span class="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <i data-lucide="trending-up" class="w-3 h-3 text-rose-400"></i>
            &uarr; +${formatRupiah(diff)} (Naik)
          </span>
        `;
      } else if (diff < 0) {
        priceComparatorBadge = `
          <span class="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <i data-lucide="trending-down" class="w-3 h-3 text-emerald-400"></i>
            &darr; -${formatRupiah(Math.abs(diff))} (Hemat)
          </span>
        `;
      } else {
        priceComparatorBadge = `
          <span class="inline-flex items-center gap-0.5 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-700/50 text-slate-300 border border-slate-600/50">
            <i data-lucide="equal" class="w-3 h-3 text-slate-400"></i>
            = ${formatRupiah(item.unitPrice)} (Stabil)
          </span>
        `;
      }
    } else {
      priceComparatorBadge = `
        <span class="inline-flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30">
          <i data-lucide="sparkle" class="w-3 h-3 text-sky-400"></i>
          Barang Baru
        </span>
      `;
    }

    // Discount Badge & Price Display
    let discountBadgeHtml = '';
    let unitPriceHtml = '';

    if (totals.isDiscounted) {
      discountBadgeHtml = `
        <span class="inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
          <i data-lucide="percent" class="w-3 h-3 text-amber-400"></i>
          Diskon ${totals.discountText}
        </span>
        <span class="text-[11px] font-semibold text-emerald-400">
          Hemat ${formatRupiah(totals.totalSaving)}
        </span>
      `;
      unitPriceHtml = `
        <div class="flex items-baseline gap-1.5 flex-wrap">
          <span class="text-sm font-bold text-emerald-300 font-mono-num">${formatRupiah(totals.finalUnitPrice)}</span>
          <span class="text-xs text-slate-500 line-through font-mono-num">${formatRupiah(item.unitPrice)}</span>
          <span class="text-xs text-slate-400">/${item.unit}</span>
        </div>
      `;
    } else {
      unitPriceHtml = `
        <div class="flex items-baseline gap-1">
          <span class="text-sm font-semibold text-slate-200 font-mono-num">${formatRupiah(item.unitPrice)}</span>
          <span class="text-xs text-slate-400">/${item.unit}</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5 flex-wrap mb-1">
            <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${catObj.color}">
              ${catObj.name}
            </span>
            ${priceComparatorBadge}
          </div>

          <h3 class="text-base font-bold text-slate-100 truncate pr-2 item-title cursor-pointer" title="${item.name}">
            ${item.name}
          </h3>
          ${unitPriceHtml}

          <div class="flex items-center gap-2 mt-1 flex-wrap">
            ${discountBadgeHtml}
          </div>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <button type="button" class="btn-edit-item touch-target w-8 h-8 rounded-lg bg-slate-800/80 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 tap-effect" title="Edit Barang">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button type="button" class="btn-delete-item touch-target w-8 h-8 rounded-lg bg-slate-800/80 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 tap-effect" title="Hapus Barang">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <div class="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div>
          <span class="text-[11px] text-slate-400 block font-medium">Subtotal</span>
          <span class="text-base font-extrabold text-slate-50 font-mono-num tracking-tight">${formatRupiah(totals.subtotal)}</span>
        </div>

        <div class="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700/60 shadow-inner">
          <button type="button" class="btn-stepper-minus touch-target w-11 h-11 rounded-lg bg-slate-700/70 text-slate-200 active:bg-rose-600 active:text-white tap-effect font-black text-xl flex items-center justify-center">
            <i data-lucide="minus" class="w-5 h-5"></i>
          </button>
          <div class="w-12 text-center">
            <span class="font-extrabold text-base text-slate-100 font-mono-num">${item.qty}</span>
            <span class="text-[10px] text-slate-400 block -mt-1">${item.unit}</span>
          </div>
          <button type="button" class="btn-stepper-plus touch-target w-11 h-11 rounded-lg bg-emerald-600 text-slate-950 active:bg-emerald-400 tap-effect font-black text-xl flex items-center justify-center shadow-sm">
            <i data-lucide="plus" class="w-5 h-5"></i>
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

  // Riwayat Tab
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
    if (this.historyTotalTrips) this.historyTotalTrips.textContent = `${history.length} Kali Belanja`;
    if (this.historyAllSpent) this.historyAllSpent.textContent = formatRupiah(totalSpentAll);

    history.forEach(trip => {
      const tripCard = document.createElement('div');
      tripCard.className = 'bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md space-y-3';
      
      const itemsListHtml = (trip.items || []).slice(0, 4).map(it => `
        <div class="flex items-center justify-between text-xs py-1 border-b border-slate-800/60 last:border-0">
          <span class="text-slate-300 truncate max-w-[200px]">${it.name} (${it.qty} ${it.unit})</span>
          <span class="font-mono-num text-slate-200 font-semibold">${formatRupiah(it.subtotal)}</span>
        </div>
      `).join('');

      tripCard.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <i data-lucide="check" class="w-4 h-4"></i>
            </div>
            <div>
              <span class="text-xs font-bold text-slate-100 block">${formatDateIndo(trip.date)}</span>
              <span class="text-[10px] text-slate-400">${trip.itemCount || 0} macam barang</span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-sm font-black text-emerald-400 font-mono-num block">${formatRupiah(trip.totalSpent)}</span>
            ${trip.totalSaved > 0 ? `<span class="text-[10px] text-amber-400 font-semibold">Hemat ${formatRupiah(trip.totalSaved)}</span>` : ''}
          </div>
        </div>

        <div class="bg-slate-950/60 rounded-xl p-2.5 space-y-1">
          ${itemsListHtml}
          ${(trip.items || []).length > 4 ? `<div class="text-[10px] text-slate-500 text-center pt-1">+ ${(trip.items || []).length - 4} barang lainnya</div>` : ''}
        </div>
      `;

      this.historyList.appendChild(tripCard);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Anggaran Tab
  renderAnggaranPage() {
    const summary = store.getCartSummary();

    if (this.budgetPageLimit) this.budgetPageLimit.textContent = formatRupiah(store.budgetLimit);
    if (this.budgetPageCurrent) this.budgetPageCurrent.textContent = formatRupiah(summary.totalSpent);
    if (this.budgetPagePercent) {
      this.budgetPagePercent.textContent = `${Math.round(summary.rawPercentage)}% Digunakan`;
      this.budgetPagePercent.className = summary.budgetStatus === 'danger' ? 'font-bold text-rose-400' : 'font-bold text-emerald-400';
    }

    if (this.budgetGaugeBar) {
      this.budgetGaugeBar.style.width = `${summary.budgetUsagePercent}%`;
      this.budgetGaugeBar.className = `h-full rounded-full transition-all duration-300 ${
        summary.budgetStatus === 'danger' ? 'bg-rose-500' : summary.budgetStatus === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
      }`;
    }

    // Category breakdown
    if (this.budgetBreakdownContainer) {
      this.budgetBreakdownContainer.innerHTML = '';
      const spend = summary.categorySpend || {};
      const catKeys = Object.keys(spend);

      if (catKeys.length === 0) {
        this.budgetBreakdownContainer.innerHTML = `
          <div class="text-center py-4 text-xs text-slate-500">
            Keranjang belanja kosong. Belum ada pengeluaran kategori.
          </div>
        `;
      } else {
        catKeys.forEach(catId => {
          const catObj = CATEGORIES.find(c => c.id === catId) || { name: catId, color: 'bg-slate-700' };
          const amount = spend[catId];
          const pct = summary.totalSpent > 0 ? Math.round((amount / summary.totalSpent) * 100) : 0;

          const row = document.createElement('div');
          row.className = 'space-y-1 text-xs';
          row.innerHTML = `
            <div class="flex items-center justify-between">
              <span class="text-slate-300 font-medium">${catObj.name}</span>
              <span class="font-mono-num font-bold text-slate-100">${formatRupiah(amount)} (${pct}%)</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: ${pct}%"></div>
            </div>
          `;
          this.budgetBreakdownContainer.appendChild(row);
        });
      }
    }
  }
}

// ==========================================
// 7. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  window.appController = new GroceryUIController();
});
