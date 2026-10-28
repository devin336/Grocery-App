/**
 * DVH Space Grocery | Belanja Cerdas & Dompet Kosmik
 * Galaxy Cosmic Nebula Theme with Realtime Cloud Sync & Multi-Device Support
 */

// ==========================================
// 1. DATA MODELS & CONSTANTS
// ==========================================
const STORAGE_KEYS = {
  ACTIVE_USER: 'dvh_grocery_active_user_v3',
  ACCOUNTS_LIST: 'dvh_grocery_accounts_v3',
  CART: 'dvh_grocery_cart_v3',
  HISTORY: 'dvh_grocery_history_v3',
  LOOKUP: 'dvh_grocery_lookup_v3',
  FIREBASE_CONFIG: 'dvh_grocery_firebase_config_v1'
};

const CATEGORIES = [
  { id: 'all', name: '🌟 Semua', icon: 'sparkles', color: 'bg-violet-950/70 text-violet-300 border-violet-500/50 shadow-xs shadow-violet-500/20' },
  { id: 'bahan-pokok', name: '🌾 Bahan Pokok', icon: 'wheat', color: 'bg-yellow-950/70 text-yellow-300 border-yellow-500/50 shadow-xs shadow-yellow-500/20' },
  { id: 'sayur', name: '🥬 Sayur Segar', icon: 'salad', color: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50 shadow-xs shadow-emerald-500/20' },
  { id: 'minuman', name: '🥤 Minuman & Susu', icon: 'coffee', color: 'bg-cyan-950/70 text-cyan-300 border-cyan-500/50 shadow-xs shadow-cyan-500/20' },
  { id: 'buah', name: '🍎 Buah Segar', icon: 'apple', color: 'bg-lime-950/70 text-lime-300 border-lime-500/50 shadow-xs shadow-lime-500/20' },
  { id: 'camilan', name: '🍪 Camilan & Snack', icon: 'cookie', color: 'bg-amber-950/70 text-amber-300 border-amber-500/50 shadow-xs shadow-amber-500/20' },
  { id: 'daging', name: '🥩 Daging & Protein', icon: 'drumstick', color: 'bg-rose-950/70 text-rose-300 border-rose-500/50 shadow-xs shadow-rose-500/20' },
  { id: 'sembako', name: '🌾 Sembako Dapur', icon: 'wheat', color: 'bg-yellow-950/70 text-yellow-300 border-yellow-500/50 shadow-xs shadow-yellow-500/20' },
  { id: 'kebersihan', name: '🧼 Mandi & Perawatan', icon: 'sparkles', color: 'bg-fuchsia-950/70 text-fuchsia-300 border-fuchsia-500/50 shadow-xs shadow-fuchsia-500/20' },
  { id: 'peralatan', name: '🔧 Kebutuhan Rumah', icon: 'wrench', color: 'bg-blue-950/70 text-blue-300 border-blue-500/50 shadow-xs shadow-blue-500/20' },
  { id: 'lainnya', name: '🏷️ Lainnya', icon: 'tag', color: 'bg-slate-900/80 text-slate-300 border-slate-700/60' }
];

// Initial mock items for newly created cart (Contoh Belanja Bulanan Supermarket)
const DEFAULT_KIDS_CART = [
  {
    id: 'cart-beras',
    name: 'Beras Rojolele',
    category: 'bahan-pokok',
    unit: 'karung/5kg',
    qty: 1,
    unitPrice: 74000,
    lastMonthPrice: 68000,
    discountRaw: '0',
    createdAt: Date.now() - 500000
  },
  {
    id: 'cart-minyak',
    name: 'Minyak Goreng 2L',
    category: 'bahan-pokok',
    unit: 'liter',
    qty: 1,
    unitPrice: 43000,
    lastMonthPrice: 43000,
    discountRaw: '0',
    createdAt: Date.now() - 400000
  },
  {
    id: 'cart-sabun',
    name: 'Sabun Cuci',
    category: 'kebersihan',
    unit: 'pcs',
    qty: 1,
    unitPrice: 20000,
    lastMonthPrice: 20000,
    discountRaw: '25%',
    createdAt: Date.now() - 300000
  },
  {
    id: 'cart-wajan',
    name: 'Wajan Penggorengan',
    category: 'peralatan',
    unit: 'pcs',
    qty: 1,
    unitPrice: 100000,
    lastMonthPrice: 100000,
    discountRaw: '50%+20%',
    createdAt: Date.now() - 200000
  },
  {
    id: 'cart-telur',
    name: 'Telur Ayam 1kg',
    category: 'daging',
    unit: 'kg',
    qty: 1,
    unitPrice: 28000,
    lastMonthPrice: 32000,
    discountRaw: '0',
    createdAt: Date.now() - 100000
  },
  {
    id: 'cart-garam',
    name: 'Garam Dapur 500g',
    category: 'bahan-pokok',
    unit: 'pack',
    qty: 1,
    unitPrice: 5000,
    lastMonthPrice: 5000,
    discountRaw: '0',
    createdAt: Date.now() - 50000
  }
];

// 1-Tap Quick Catalog Carousel items (User can tap + to add immediately)
const QUICK_CATALOG_ITEMS = [
  { name: 'Beras Rojolele', category: 'bahan-pokok', unit: 'karung/5kg', price: 74000, lastMonthPrice: 68000, discount: '' },
  { name: 'Minyak Goreng 2L', category: 'bahan-pokok', unit: 'liter', price: 43000, lastMonthPrice: 43000, discount: '' },
  { name: 'Sabun Cuci', category: 'kebersihan', unit: 'pcs', price: 20000, lastMonthPrice: 20000, discount: '25%' },
  { name: 'Wajan Penggorengan', category: 'peralatan', unit: 'pcs', price: 100000, lastMonthPrice: 100000, discount: '50%+20%' },
  { name: 'Telur Ayam 1kg', category: 'daging', unit: 'kg', price: 28000, lastMonthPrice: 32000, discount: '' },
  { name: 'Garam Dapur 500g', category: 'bahan-pokok', unit: 'pack', price: 5000, lastMonthPrice: 5000, discount: '' },
  { name: 'Bayam Hijau Hidroponik', category: 'sayur', unit: 'ikat', price: 6000, lastMonthPrice: 5500, discount: '' },
  { name: 'Susu Ultra Strawberry', category: 'minuman', unit: 'kotak', price: 6000, lastMonthPrice: 5500, discount: '' },
  { name: 'Pisang Sunpride Cavendish', category: 'buah', unit: 'sisir', price: 18000, lastMonthPrice: 20000, discount: '' },
  { name: 'Sosis Kanzler Singles Original', category: 'daging', unit: 'pcs', price: 9000, lastMonthPrice: 9000, discount: '' }
];

// Product lookup database for instant autofill (Lotte Mart Grocery - Puri Indah)
const MOCK_LOOKUP = {
  // Referensi Harga Toko Lotte Mart Puri Indah
  'beras rojolele': { price: 74000, lastMonthPrice: 68000, unit: 'karung/5kg', category: 'bahan-pokok' },
  'beras 5kg': { price: 74000, lastMonthPrice: 68000, unit: 'karung/5kg', category: 'bahan-pokok' },
  'beras': { price: 74000, lastMonthPrice: 68000, unit: 'karung/5kg', category: 'bahan-pokok' },
  'minyak goreng 2l': { price: 43000, lastMonthPrice: 43000, unit: 'liter', category: 'bahan-pokok' },
  'minyak goreng': { price: 43000, lastMonthPrice: 43000, unit: 'liter', category: 'bahan-pokok' },
  'minyak': { price: 43000, lastMonthPrice: 43000, unit: 'liter', category: 'bahan-pokok' },
  'sabun cuci': { price: 20000, lastMonthPrice: 20000, unit: 'pcs', category: 'kebersihan', discount: '25%' },
  'sabun mandi': { price: 15000, lastMonthPrice: 15000, unit: 'pcs', category: 'kebersihan' },
  'sabun': { price: 20000, lastMonthPrice: 20000, unit: 'pcs', category: 'kebersihan' },
  'wajan penggorengan': { price: 100000, lastMonthPrice: 100000, unit: 'pcs', category: 'peralatan', discount: '50%+20%' },
  'wajan': { price: 100000, lastMonthPrice: 100000, unit: 'pcs', category: 'peralatan', discount: '50%+20%' },
  'telur ayam 1kg': { price: 28000, lastMonthPrice: 32000, unit: 'kg', category: 'daging' },
  'telur 1kg': { price: 28000, lastMonthPrice: 32000, unit: 'kg', category: 'daging' },
  'telur': { price: 28000, lastMonthPrice: 32000, unit: 'kg', category: 'daging' },
  'garam dapur 500g': { price: 5000, lastMonthPrice: 5000, unit: 'pack', category: 'bahan-pokok' },
  'garam 500g': { price: 5000, lastMonthPrice: 5000, unit: 'pack', category: 'bahan-pokok' },
  'garam': { price: 5000, lastMonthPrice: 5000, unit: 'pack', category: 'bahan-pokok' },

  // Sayur Sehat
  'bayam hijau segar kelinci': { price: 6000, lastMonthPrice: 5500, unit: 'ikat', category: 'sayur' },
  'bayam': { price: 6000, lastMonthPrice: 5500, unit: 'ikat', category: 'sayur' },
  'wortel manis kelinci': { price: 12000, lastMonthPrice: 12000, unit: 'kg', category: 'sayur' },
  'wortel': { price: 12000, lastMonthPrice: 12000, unit: 'kg', category: 'sayur' },
  'brokoli hijau super': { price: 18000, lastMonthPrice: 20000, unit: 'pack', category: 'sayur' },
  'brokoli': { price: 18000, lastMonthPrice: 20000, unit: 'pack', category: 'sayur' },
  'kangkung segar': { price: 5000, lastMonthPrice: 5000, unit: 'ikat', category: 'sayur' },
  'kangkung': { price: 5000, lastMonthPrice: 5000, unit: 'ikat', category: 'sayur' },
  'tomat merah segar': { price: 9000, lastMonthPrice: 9000, unit: 'kg', category: 'sayur' },
  'tomat': { price: 9000, lastMonthPrice: 9000, unit: 'kg', category: 'sayur' },

  // Minuman & Susu
  'susu uht ultra milk strawberry 200ml': { price: 6000, lastMonthPrice: 5500, unit: 'kotak', category: 'minuman' },
  'susu ultra strawberry': { price: 6000, lastMonthPrice: 5500, unit: 'kotak', category: 'minuman' },
  'susu': { price: 6000, lastMonthPrice: 5500, unit: 'kotak', category: 'minuman' },
  'yakult probiotik (5 botol)': { price: 11000, lastMonthPrice: 10500, unit: 'pack', category: 'minuman' },
  'yakult': { price: 11000, lastMonthPrice: 10500, unit: 'pack', category: 'minuman' },
  'air aqua dingin 1.5l': { price: 7000, lastMonthPrice: 6500, unit: 'botol', category: 'minuman' },
  'aqua': { price: 7000, lastMonthPrice: 6500, unit: 'botol', category: 'minuman' },
  'milo kotak cokelat': { price: 6000, lastMonthPrice: 6000, unit: 'kotak', category: 'minuman' },
  'milo': { price: 6000, lastMonthPrice: 6000, unit: 'kotak', category: 'minuman' },
  'susu ultra milk 1l': { price: 19500, lastMonthPrice: 19500, unit: 'liter', category: 'minuman' },

  // Buah
  'pisang cavendish sunpride': { price: 18000, lastMonthPrice: 20000, unit: 'sisir', category: 'buah' },
  'pisang': { price: 18000, lastMonthPrice: 20000, unit: 'sisir', category: 'buah' },
  'apel fuji merah': { price: 38000, lastMonthPrice: 40000, unit: 'kg', category: 'buah' },
  'apel': { price: 38000, lastMonthPrice: 40000, unit: 'kg', category: 'buah' },
  'jeruk manis': { price: 26000, lastMonthPrice: 26000, unit: 'kg', category: 'buah' },
  'jeruk': { price: 26000, lastMonthPrice: 26000, unit: 'kg', category: 'buah' },

  // Camilan
  'biskuit roma kelapa manis': { price: 9500, lastMonthPrice: 9500, unit: 'pack', category: 'camilan' },
  'biskuit': { price: 9500, lastMonthPrice: 9500, unit: 'pack', category: 'camilan' },
  'wafer tango cokelat': { price: 8500, lastMonthPrice: 8500, unit: 'pack', category: 'camilan' },
  'wafer': { price: 8500, lastMonthPrice: 8500, unit: 'pack', category: 'camilan' },
  'cokelat': { price: 12000, lastMonthPrice: 12000, unit: 'pcs', category: 'camilan' },

  // Lauk & Sarapan
  'sosis kanzler singles original': { price: 9000, lastMonthPrice: 9000, unit: 'pcs', category: 'daging' },
  'sosis': { price: 9000, lastMonthPrice: 9000, unit: 'pcs', category: 'daging' },
  'nugget fiesta dinosaurus': { price: 48000, lastMonthPrice: 46000, unit: 'pack', category: 'daging' },
  'nugget': { price: 48000, lastMonthPrice: 46000, unit: 'pack', category: 'daging' }
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
  const str = String(val || '').trim();
  const isNegative = str.includes('-');
  const cleaned = str.replace(/[^0-9]/g, '');
  const num = parseInt(cleaned, 10) || 0;
  return isNegative ? -num : num;
}

function showToast(msg, type = 'info', icon = '🪐') {
  let toast = document.getElementById('cloud-realtime-toast');
  if (!toast || !msg) return;

  let displayMsg = String(msg);
  // Intercept technical Firebase errors so the user is never exposed to "Firebase: Error"
  if (displayMsg.toLowerCase().includes('firebase') && (type === 'danger' || type === 'error' || type === 'warning')) {
    console.warn('[Firebase Notice Swallowed]:', displayMsg);
    displayMsg = 'Mode Celengan Lokal Aktif (Data Tersimpan Aman)';
    type = 'info';
    icon = '💡';
  }

  const toastText = document.getElementById('cloud-toast-text');
  const toastIcon = document.getElementById('cloud-toast-icon');
  if (toastText) toastText.textContent = displayMsg;
  if (toastIcon) toastIcon.textContent = icon;

  const innerPill = toast.firstElementChild;
  if (innerPill) {
    if (type === 'error' || type === 'danger') {
      innerPill.className = 'px-3.5 py-1.5 rounded-full bg-rose-950/95 text-rose-200 text-xs font-black shadow-2xl backdrop-blur-md flex items-center gap-2 border border-rose-500/80 animate-danger-pulse';
    } else if (type === 'success') {
      innerPill.className = 'px-3.5 py-1.5 rounded-full bg-emerald-950/95 text-emerald-200 text-xs font-black shadow-2xl backdrop-blur-md flex items-center gap-2 border border-emerald-400/80';
    } else if (type === 'warning') {
      innerPill.className = 'px-3.5 py-1.5 rounded-full bg-amber-950/95 text-amber-200 text-xs font-black shadow-2xl backdrop-blur-md flex items-center gap-2 border border-amber-400/80';
    } else {
      innerPill.className = 'px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-xs font-black shadow-2xl backdrop-blur-md flex items-center gap-2 border border-cyan-400/40 glow-cyan';
    }
  }

  toast.classList.remove('opacity-0', '-translate-y-3', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', '-translate-y-3', 'pointer-events-none');
  }, 2800);
}

function getTodayDateString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAhtJ6TS6IxXKe49eb5nZqJgRWTLda3pq4",
  authDomain: "dvh-grocery.firebaseapp.com",
  projectId: "dvh-grocery",
  storageBucket: "dvh-grocery.firebasestorage.app",
  messagingSenderId: "255581478806",
  appId: "1:255581478806:web:5b3774b875587998aac7b7"
};

function getActiveFirebaseConfig() {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG);
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed && parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[Firebase] Error reading custom config:', e);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

function parseFirebaseConfigSnippet(text) {
  if (!text || typeof text !== 'string') return null;
  const clean = text.trim();

  // Try parsing direct JSON
  try {
    const direct = JSON.parse(clean);
    if (direct && (direct.apiKey || direct.projectId)) return direct;
  } catch (e) {}

  // Regex extraction from JavaScript snippet
  const apiKeyMatch = clean.match(/apiKey\s*:\s*["']([^"']+)["']/i);
  const authDomainMatch = clean.match(/authDomain\s*:\s*["']([^"']+)["']/i);
  const projectIdMatch = clean.match(/projectId\s*:\s*["']([^"']+)["']/i);
  const storageBucketMatch = clean.match(/storageBucket\s*:\s*["']([^"']+)["']/i);
  const messagingSenderIdMatch = clean.match(/messagingSenderId\s*:\s*["']([^"']+)["']/i);
  const appIdMatch = clean.match(/appId\s*:\s*["']([^"']+)["']/i);

  if (apiKeyMatch || projectIdMatch) {
    const pId = projectIdMatch ? projectIdMatch[1].trim() : '';
    return {
      apiKey: apiKeyMatch ? apiKeyMatch[1].trim() : '',
      authDomain: authDomainMatch ? authDomainMatch[1].trim() : (pId ? `${pId}.firebaseapp.com` : ''),
      projectId: pId,
      storageBucket: storageBucketMatch ? storageBucketMatch[1].trim() : (pId ? `${pId}.firebasestorage.app` : ''),
      messagingSenderId: messagingSenderIdMatch ? messagingSenderIdMatch[1].trim() : '',
      appId: appIdMatch ? appIdMatch[1].trim() : ''
    };
  }
  return null;
}

class FirebaseSyncService {
  constructor() {
    this.db = null;
    this.cartDocRef = null;
    this.sessionDocRef = null;
    this.store = null;
    this.debounceTimer = null;
    this.isApplyingCloudUpdate = false;
    this.status = 'initializing';
    this.statusDetail = '';
    this.lastError = null;
    this.activeConfig = null;
    this.unsubscribeSnapshot = null;
    this.unsubscribeAccounts = null;
    this.toastTimer = null;
    this.heartbeatTimer = null;
    this.lastCloudUpdatedAt = 0;
  }

  getConfig() {
    return getActiveFirebaseConfig();
  }

  isConfigured() {
    const cfg = this.getConfig();
    return !!(cfg && cfg.apiKey && cfg.projectId);
  }

  showRealtimeToast(msg, icon = '✨') {
    const toast = document.getElementById('cloud-realtime-toast');
    const toastText = document.getElementById('cloud-toast-text');
    const toastIcon = document.getElementById('cloud-toast-icon');
    if (!toast) return;

    if (toastText) toastText.textContent = msg;
    if (toastIcon) toastIcon.textContent = icon;

    toast.classList.remove('opacity-0', '-translate-y-3', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', '-translate-y-3', 'pointer-events-none');
    }, 2800);
  }

  async init(store) {
    this.store = store;

    // Check if Firebase Compat SDK is present
    if (typeof firebase === 'undefined') {
      console.warn('[Firebase] SDK is not loaded. Operating in Offline LocalStorage mode.');
      this.updateStatus('offline', 'Mode Celengan Lokal', 'SDK Firebase belum dimuat.');
      return;
    }

    this.activeConfig = this.getConfig();

    if (!this.isConfigured()) {
      this.updateStatus('offline', 'Atur Firebase Cloud', 'Belum terhubung ke Firestore.');
      return;
    }

    try {
      let app;
      if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
        app = firebase.app();
      } else {
        app = firebase.initializeApp(this.activeConfig);
      }
      this.db = firebase.firestore(app);

      // Listen to cloud accounts list in realtime
      this.listenToAccounts();
      this.fetchAllAccountsFromCloud();

      // If user already logged in, connect user cart session
      if (this.store && this.store.currentUser) {
        await this.reconnectForUser();
      } else {
        this.updateStatus('synced', 'Celengan Cloud Aktif', 'Tersambung ke Google Cloud Firestore.');
      }

      // Online/Offline Listeners
      window.addEventListener('online', () => {
        this.updateStatus('synced', 'Celengan Cloud Aktif', 'Jaringan online kembali.');
      });
      window.addEventListener('offline', () => {
        this.updateStatus('offline', 'Mode Celengan Lokal', 'Koneksi internet terputus.');
      });

    } catch (err) {
      console.warn('[Firebase] Initialization notice:', err);
      this.lastError = err;
      this.updateStatus('offline', 'Mode Celengan Lokal', 'Bekerja dengan penyimpanan lokal.');
    }
  }

  // Save account to Firestore cloud (guaranteed both REST and SDK)
  async saveAccountToCloud(account) {
    if (!account || !account.username) return false;
    const cleanUser = account.username.toLowerCase().trim();
    const cleanAccount = {
      username: cleanUser,
      name: account.name || cleanUser,
      avatar: account.avatar || '🍓',
      pin: String(account.pin || '1234').trim(),
      budgetLimit: Number(account.budgetLimit) || 250000,
      updatedAt: Date.now(),
      createdAt: account.createdAt || Date.now()
    };

    let saved = false;

    // 1. Direct REST Save (Immediate HTTP sync to Firestore Cloud servers)
    try {
      const cfg = this.getConfig();
      if (cfg && cfg.projectId && cfg.apiKey) {
        const url = `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/(default)/documents/grocery_accounts/${cleanUser}?key=${cfg.apiKey}`;
        const restBody = {
          fields: {
            username: { stringValue: cleanUser },
            name: { stringValue: cleanAccount.name },
            avatar: { stringValue: cleanAccount.avatar },
            pin: { stringValue: cleanAccount.pin },
            budgetLimit: { integerValue: String(Math.round(cleanAccount.budgetLimit)) },
            updatedAt: { integerValue: String(cleanAccount.updatedAt) },
            createdAt: { integerValue: String(cleanAccount.createdAt) }
          }
        };
        const res = await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(restBody)
        });
        if (res.ok) {
          console.info('[Firebase REST] Account saved via REST fallback:', cleanUser);
          saved = true;
        }
      }
    } catch (restErr) {
      console.warn('[Firebase REST] Failed to save account via REST:', restErr);
    }

    // 2. Also save via Firestore SDK if available
    if (this.db) {
      try {
        await this.db.collection('grocery_accounts').doc(cleanUser).set(cleanAccount, { merge: true });
        console.info('[Firebase] Account saved to Cloud Firestore:', cleanUser);
        saved = true;
      } catch (e) {
        console.warn('[Firebase] SDK saveAccount error:', e);
      }
    }

    return saved;
  }

  // Fetch a specific account from Cloud
  async fetchAccountFromCloud(cleanUser) {
    if (!cleanUser) return null;
    const u = cleanUser.toLowerCase().trim();

    // 1. Try REST fallback first (instant response across all network states)
    try {
      const cfg = this.getConfig();
      if (cfg && cfg.projectId && cfg.apiKey) {
        const url = `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/(default)/documents/grocery_accounts/${u}?key=${cfg.apiKey}`;
        const res = await fetch(url);
        if (res.ok) {
          const doc = await res.json();
          if (doc && doc.fields) {
            const rawLimit = doc.fields.budgetLimit?.integerValue || doc.fields.budgetLimit?.doubleValue || 250000;
            return {
              username: doc.fields.username?.stringValue || u,
              name: doc.fields.name?.stringValue || u,
              avatar: doc.fields.avatar?.stringValue || '🍓',
              pin: doc.fields.pin?.stringValue || (doc.fields.pin?.integerValue ? String(doc.fields.pin.integerValue) : '1234'),
              budgetLimit: Number(rawLimit) || 250000,
              createdAt: Number(doc.fields.createdAt?.integerValue || Date.now())
            };
          }
        }
      }
    } catch (e) {
      console.warn('[Firebase REST] Error fetching account:', e);
    }

    // 2. Try Firestore SDK
    if (this.db) {
      try {
        const snap = await this.db.collection('grocery_accounts').doc(u).get();
        if (snap.exists) {
          const d = snap.data();
          return {
            username: d.username || u,
            name: d.name || u,
            avatar: d.avatar || '🍓',
            pin: String(d.pin || '1234').trim(),
            budgetLimit: Number(d.budgetLimit) || 250000,
            createdAt: Number(d.createdAt) || Date.now()
          };
        }
      } catch (e) {
        console.warn('[Firebase] SDK fetchAccount error:', e);
      }
    }

    return null;
  }

  // Fetch all accounts from Cloud and merge into store
  async fetchAllAccountsFromCloud() {
    if (!this.store) return [];
    const now = Date.now();
    if (this._lastAccountsFetch && (now - this._lastAccountsFetch < 60000)) {
      return (this.store.accounts || []).map(a => a.username.toLowerCase().trim());
    }
    this._lastAccountsFetch = now;
    try {
      let accountsData = [];

      // 1. Fetch via REST
      const cfg = this.getConfig();
      if (cfg && cfg.projectId && cfg.apiKey) {
        try {
          const url = `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/(default)/documents/grocery_accounts?key=${cfg.apiKey}`;
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (data && data.documents) {
              accountsData = data.documents.map(d => {
                const u = d.fields?.username?.stringValue || d.name.split('/').pop();
                const rawLimit = d.fields?.budgetLimit?.integerValue || d.fields?.budgetLimit?.doubleValue || 250000;
                return {
                  username: u,
                  name: d.fields?.name?.stringValue || u,
                  avatar: d.fields?.avatar?.stringValue || '🍓',
                  pin: d.fields?.pin?.stringValue || (d.fields?.pin?.integerValue ? String(d.fields?.pin.integerValue) : '1234'),
                  budgetLimit: Number(rawLimit) || 250000
                };
              }).filter(a => !!a.username);
            }
          }
        } catch (e) {}
      }

      // 2. Fetch via SDK if REST returned empty
      if (this.db && accountsData.length === 0) {
        try {
          const querySnapshot = await this.db.collection('grocery_accounts').get();
          querySnapshot.forEach(doc => {
            accountsData.push(doc.data());
          });
        } catch (e) {}
      }

      if (accountsData.length > 0) {
        let updated = false;
        accountsData.forEach(cloudAcc => {
          if (!cloudAcc.username) return;
          const u = cloudAcc.username.toLowerCase().trim();
          const idx = this.store.accounts.findIndex(a => a.username.toLowerCase() === u);
          if (idx === -1) {
            this.store.accounts.push({
              username: u,
              name: cloudAcc.name || u,
              avatar: cloudAcc.avatar || '🍓',
              pin: String(cloudAcc.pin || '1234').trim(),
              budgetLimit: Number(cloudAcc.budgetLimit) || 250000,
              createdAt: cloudAcc.createdAt || Date.now()
            });
            updated = true;
          } else {
            this.store.accounts[idx] = { ...this.store.accounts[idx], ...cloudAcc };
            updated = true;
          }
        });
        if (updated) {
          localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.store.accounts));
        }
      }

      if (window.appController && typeof window.appController.renderCloudAccountChips === 'function') {
        window.appController.renderCloudAccountChips();
      }
      return accountsData.map(a => a.username.toLowerCase().trim());
    } catch (err) {
      console.warn('[Firebase] fetchAllAccountsFromCloud error:', err);
      return [];
    }
  }

  // Realtime listener for newly registered accounts across devices
  listenToAccounts() {
    if (!this.db) return;
    try {
      if (this.unsubscribeAccounts) {
        this.unsubscribeAccounts();
        this.unsubscribeAccounts = null;
      }
      this.unsubscribeAccounts = this.db.collection('grocery_accounts').onSnapshot(snap => {
        let changed = false;
        snap.docChanges().forEach(change => {
          const acc = change.doc.data();
          if (acc && acc.username) {
            const u = acc.username.toLowerCase().trim();
            const idx = this.store.accounts.findIndex(a => a.username.toLowerCase() === u);
            if (idx === -1) {
              this.store.accounts.push(acc);
              changed = true;
            } else {
              this.store.accounts[idx] = { ...this.store.accounts[idx], ...acc };
              changed = true;
            }
          }
        });
        if (changed) {
          localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.store.accounts));
        }
      }, err => {
        console.warn('[Firebase] Accounts listener notice:', err);
      });
    } catch (e) {}
  }

  async reconnectForUser() {
    if (!this.store || !this.store.currentUser) return;
    const user = this.store.currentUser.username.toLowerCase().trim();

    try {
      if (this.unsubscribeSnapshot) {
        this.unsubscribeSnapshot();
        this.unsubscribeSnapshot = null;
      }

      if (this.db) {
        this.cartDocRef = this.db.collection('grocery_carts').doc(user);
        this.sessionDocRef = this.db.collection('grocery_users').doc(user).collection('sessions').doc('active_trip');

        // Check if cloud already has saved cart for this user
        try {
          const snap = await this.cartDocRef.get();
          if (snap.exists) {
            const cloudData = snap.data();
            if (cloudData && Array.isArray(cloudData.cart)) {
              this.lastCloudUpdatedAt = cloudData.updatedAt || 0;
              this.applyCloudData(cloudData);
            }
          } else {
            // If no cart on cloud yet, upload current initial state
            await this.syncNow();
          }
        } catch (e) {
          console.warn('[Firebase] Initial cart check error:', e);
        }

        this.listenToCloud();
      } else {
        // Fallback via REST
        await this.checkLatestFromCloud();
      }
    } catch (e) {
      console.warn('[Firebase] reconnectForUser notice (swallowed):', e);
    }
  }

  listenToCloud() {
    if (!this.cartDocRef) return;

    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
      this.unsubscribeSnapshot = null;
    }

    this.unsubscribeSnapshot = this.cartDocRef.onSnapshot(
      { includeMetadataChanges: false },
      (snapshot) => {
        if (this.isApplyingCloudUpdate) return;

        if (snapshot.exists) {
          const cloudData = snapshot.data();
          if (!cloudData) return;

          // If the update was originated by this device, ignore to prevent loop reflection
          if (cloudData.updatedBy && cloudData.updatedBy === this.store.deviceId) {
            this.updateStatus('synced', 'Celengan Cloud Aktif', 'Perubahan kamu tersimpan.');
            return;
          }

          this.lastCloudUpdatedAt = cloudData.updatedAt || Date.now();

          const hasApplied = this.applyCloudData(cloudData);
          if (hasApplied) {
            this.updateStatus('synced', 'Celengan Cloud Aktif', 'Belanjaan disinkronkan seketika.');
            const source = (cloudData.updatedBy && cloudData.updatedBy.startsWith('hp_')) ? 'HP' : 'PC';
            this.showRealtimeToast(`Belanjaan diupdate dari ${source}!`, '✨');
          }
        } else {
          this.syncNow();
        }
      },
      (error) => {
        console.warn('[Firebase] Firestore notice:', error.code, error.message);
        this.lastError = error;
        this.updateStatus('offline', 'Mode Celengan Lokal', 'Penyimpanan lokal aktif.');
      }
    );
  }

  // Heartbeat / REST check for latest cloud updates
  async checkLatestFromCloud() {
    if (!this.store || !this.store.currentUser || this.isApplyingCloudUpdate) return;
    const user = this.store.currentUser.username.toLowerCase().trim();

    try {
      if (this.cartDocRef) {
        const snap = await this.cartDocRef.get();
        if (snap.exists) {
          const cloudData = snap.data();
          if (cloudData && cloudData.updatedBy !== this.store.deviceId) {
            this.lastCloudUpdatedAt = cloudData.updatedAt || Date.now();
            const applied = this.applyCloudData(cloudData);
            if (applied) {
              const source = (cloudData.updatedBy && cloudData.updatedBy.startsWith('hp_')) ? 'HP' : 'PC';
              this.showRealtimeToast(`Belanjaan diupdate dari ${source}!`, '✨');
            }
          }
        }
      }
    } catch (e) {}
  }

  applyCloudData(data) {
    if (!data || !this.store) return false;
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

      if (typeof data.storeLocation === 'string' && this.store.storeLocation !== data.storeLocation) {
        this.store.storeLocation = data.storeLocation;
        stateChanged = true;
      }

      if (Array.isArray(data.customStores)) {
        const mergedStores = Array.from(new Set([...(this.store.customStores || []), ...data.customStores]));
        if (mergedStores.length !== (this.store.customStores || []).length) {
          this.store.customStores = mergedStores;
          localStorage.setItem('dvh_custom_stores_list_v1', JSON.stringify(this.store.customStores));
          stateChanged = true;
        }
      }

      if (typeof data.shoppingDate === 'string' && this.store.shoppingDate !== data.shoppingDate) {
        this.store.shoppingDate = data.shoppingDate;
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
        this.store.notifyFromCloud();
      }
      return stateChanged;
    } finally {
      this.isApplyingCloudUpdate = false;
    }
  }

  triggerDebouncedSync() {
    if (this.isApplyingCloudUpdate || !this.store || !this.store.currentUser) return;

    this.updateStatus('syncing', 'Menyimpan...', 'Menyimpan transaksi ke Firestore...');

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.syncNow();
    }, 400);
  }

  async syncNow() {
    if (!this.store || !this.store.currentUser) return;
    const user = this.store.currentUser.username.toLowerCase().trim();

    try {
      const now = Date.now();
      this.lastCloudUpdatedAt = now;

      const payload = {
        username: user,
        cart: this.store.cart,
        budgetLimit: this.store.budgetLimit,
        storeLocation: this.store.storeLocation || 'Lotte Mart Grocery - Puri Indah',
        customStores: this.store.customStores || [],
        shoppingDate: this.store.shoppingDate || getTodayDateString(),
        priceLookup: this.store.priceLookup,
        history: this.store.history,
        user: {
          username: user,
          name: this.store.currentUser.name,
          avatar: this.store.currentUser.avatar || '🍓'
        },
        updatedAt: now,
        updatedBy: this.store.deviceId
      };

      if (this.cartDocRef) {
        await this.cartDocRef.set(payload, { merge: true });
      }
      if (this.sessionDocRef) {
        await this.sessionDocRef.set(payload, { merge: true });
      }

      this.updateStatus('synced', 'Celengan Cloud Aktif', 'Data belanja berhasil disinkronkan ke Cloud Firestore.');
    } catch (err) {
      console.warn('[Firebase] Save error (offline fallback):', err.code || err);
      this.lastError = err;
      this.updateStatus('offline', 'Mode Celengan Lokal', 'Penyimpanan lokal aktif.');
    }
  }

  async reconfigure(newConfig) {
    if (!newConfig || !newConfig.apiKey || !newConfig.projectId) {
      throw new Error('API Key dan Project ID wajib diisi!');
    }

    localStorage.setItem(STORAGE_KEYS.FIREBASE_CONFIG, JSON.stringify(newConfig));
    this.activeConfig = newConfig;

    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
      this.unsubscribeSnapshot = null;
    }
    if (this.unsubscribeAccounts) {
      this.unsubscribeAccounts();
      this.unsubscribeAccounts = null;
    }

    if (typeof firebase !== 'undefined' && firebase.apps.length) {
      await Promise.all(firebase.apps.map(a => a.delete()));
    }

    const app = firebase.initializeApp(newConfig);
    this.db = firebase.firestore(app);

    this.listenToAccounts();
    this.fetchAllAccountsFromCloud();

    if (this.store && this.store.currentUser) {
      await this.reconnectForUser();
    }
    await this.syncNow();
    return { success: true };
  }

  async resetConfig() {
    localStorage.removeItem(STORAGE_KEYS.FIREBASE_CONFIG);
    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
      this.unsubscribeSnapshot = null;
    }
    if (this.unsubscribeAccounts) {
      this.unsubscribeAccounts();
      this.unsubscribeAccounts = null;
    }
    if (typeof firebase !== 'undefined' && firebase.apps.length) {
      await Promise.all(firebase.apps.map(a => a.delete()));
    }
    this.activeConfig = DEFAULT_FIREBASE_CONFIG;
    this.updateStatus('offline', 'Atur Firebase Cloud', 'Mode lokal celengan diaktifkan.');
  }

  updateStatus(status, label, detail = '') {
    this.status = status;
    this.statusDetail = detail;
    const dot = document.getElementById('cloud-sync-dot');
    const text = document.getElementById('cloud-sync-label');
    if (dot && text) {
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
        case 'error':
          dot.className += ' bg-rose-500';
          text.className += ' text-rose-600';
          break;
        case 'offline':
        default:
          dot.className += ' bg-slate-500';
          text.className += ' text-slate-400';
          break;
      }
    }

    if (window.appController && typeof window.appController.renderFirebaseModalStatus === 'function') {
      window.appController.renderFirebaseModalStatus(status, label, detail);
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
    // Generate unique persistent device ID for client identification (HP vs PC)
    let storedDevId = sessionStorage.getItem('dvh_grocery_device_id');
    if (!storedDevId) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 640;
      storedDevId = (isMobile ? 'hp_' : 'pc_') + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
      sessionStorage.setItem('dvh_grocery_device_id', storedDevId);
    }
    this.deviceId = storedDevId;

    this.accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS_LIST) || '[]');
    
    // Seed default demo accounts if empty (Rian and Devin)
    if (this.accounts.length === 0) {
      this.accounts = [
        {
          username: 'rian',
          name: 'Rian',
          avatar: '🐰',
          pin: '1234',
          budgetLimit: 350000,
          createdAt: Date.now()
        },
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

    // Default to Rian if no user logged in
    this.currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_USER) || 'null');
    if (!this.currentUser) {
      const defaultUser = this.accounts.find(a => a.username === 'rian') || this.accounts[0];
      if (defaultUser) {
        this.currentUser = defaultUser;
        localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
      }
    }
    
    this.storeLocation = 'Lotte Mart Grocery - Puri Indah';
    this.customStores = [];
    try {
      const savedCustomStores = localStorage.getItem('dvh_custom_stores_list_v1');
      if (savedCustomStores) {
        this.customStores = JSON.parse(savedCustomStores);
      }
    } catch (e) {
      this.customStores = [];
    }
    this.shoppingDate = getTodayDateString();
    this.cart = [];
    this.history = [];
    this.priceLookup = { ...MOCK_LOOKUP };
    this.budgetLimit = this.currentUser?.budgetLimit || 350000;
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

  // Register a brand new account and save to Cloud
  async registerAccount({ name, avatar, username, pin, budgetLimit }) {
    const cleanUser = String(username || '').toLowerCase().trim();
    if (!cleanUser) throw new Error('Username wajib diisi!');
    if (!name || !name.trim()) throw new Error('Nama pengguna wajib diisi!');

    // Check if username already exists locally
    const existing = this.accounts.find(a => a.username.toLowerCase() === cleanUser);
    if (existing) {
      throw new Error(`Username "${cleanUser}" sudah terdaftar. Silakan pilih username lain atau masuk akun.`);
    }

    // Check if username already exists in Cloud
    if (window.firebaseSync) {
      const cloudExisting = await window.firebaseSync.fetchAccountFromCloud(cleanUser);
      if (cloudExisting) {
        // Merge into local list
        this.accounts.push(cloudExisting);
        localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.accounts));
        throw new Error(`Username "${cleanUser}" sudah terdaftar di Cloud! Silakan langsung login di tab Masuk Akun.`);
      }
    }

    const newAccount = {
      username: cleanUser,
      name: name.trim(),
      avatar: avatar || '🍓',
      pin: String(pin || '1234').trim(),
      budgetLimit: Math.max(10000, parseRupiahInput(budgetLimit) || 350000),
      createdAt: Date.now()
    };

    this.accounts.push(newAccount);
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.accounts));

    // Save account to Cloud Firestore so any device (HP/PC) can log in
    if (window.firebaseSync) {
      await window.firebaseSync.saveAccountToCloud(newAccount);
    }

    // Automatically log in to the newly created account
    return await this.login(newAccount.username, newAccount.pin);
  }

  async login(username, pin = '1234') {
    const cleanUser = String(username || '').toLowerCase().trim();
    if (!cleanUser) {
      throw new Error('Silakan masukkan nama pengguna / username!');
    }

    let account = this.accounts.find(a => a.username.toLowerCase() === cleanUser);

    // If not found in local memory, check Cloud Firestore!
    if (!account && window.firebaseSync) {
      try {
        const cloudAccount = await window.firebaseSync.fetchAccountFromCloud(cleanUser);
        if (cloudAccount) {
          account = cloudAccount;
          this.accounts.push(account);
          localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.accounts));
        }
      } catch (e) {
        console.warn('[Login Cloud Check]:', e);
      }
    }

    // Jika akun belum pernah terdaftar di HP atau cloud rate-limited, otomatis sediakan sesi akun
    if (!account) {
      const autoAcc = {
        username: cleanUser,
        name: cleanUser.charAt(0).toUpperCase() + cleanUser.slice(1),
        avatar: cleanUser === 'rian' ? '🐰' : (cleanUser === 'devin' ? '🍓' : '🪐'),
        pin: String(pin || '1234').trim(),
        budgetLimit: 350000,
        createdAt: Date.now()
      };
      this.accounts.push(autoAcc);
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(this.accounts));
      if (window.firebaseSync) {
        window.firebaseSync.saveAccountToCloud(autoAcc);
      }
      return await this.setUserSession(autoAcc);
    }

    if (account.pin && account.pin !== String(pin).trim()) {
      throw new Error('PIN keamanan salah! Silakan coba lagi.');
    }

    return await this.setUserSession(account);
  }

  async setUserSession(account) {
    this.currentUser = { ...account, loginAt: Date.now() };
    this.budgetLimit = account.budgetLimit || 350000;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
    this.loadUserState();

    if (window.firebaseSync) {
      try {
        await window.firebaseSync.reconnectForUser();
      } catch (fbErr) {
        console.warn('[Firebase Sync reconnect notice]:', fbErr);
      }
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
      const savedStore = localStorage.getItem(this.getUserKey('store_loc'));
      const savedDate = localStorage.getItem(this.getUserKey('shop_date'));

      if (savedStore) this.storeLocation = savedStore;
      if (savedDate) this.shoppingDate = savedDate;

      const savedCustom = localStorage.getItem(this.getUserKey('custom_stores')) || localStorage.getItem('dvh_custom_stores_list_v1');
      if (savedCustom) {
        try {
          const parsed = JSON.parse(savedCustom);
          if (Array.isArray(parsed)) {
            this.customStores = Array.from(new Set([...(this.customStores || []), ...parsed]));
          }
        } catch (e) {}
      }

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
      localStorage.setItem(this.getUserKey('store_loc'), this.storeLocation || 'Lotte Mart Grocery - Puri Indah');
      localStorage.setItem(this.getUserKey('shop_date'), this.shoppingDate || getTodayDateString());
      localStorage.setItem(this.getUserKey('custom_stores'), JSON.stringify(this.customStores || []));
      localStorage.setItem('dvh_custom_stores_list_v1', JSON.stringify(this.customStores || []));
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

  notifyFromCloud() {
    this.saveUserState();
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

  clearCart() {
    this.cart = [];
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

  addCustomStore(storeName) {
    if (!storeName || typeof storeName !== 'string') return false;
    const clean = storeName.trim();
    if (clean.length < 2) return false;

    if (!Array.isArray(this.customStores)) this.customStores = [];
    if (!this.customStores.includes(clean)) {
      this.customStores.push(clean);
    }
    this.storeLocation = clean;
    this.saveUserState();
    this.notify();
    return true;
  }

  removeCustomStore(storeName) {
    if (!storeName || !Array.isArray(this.customStores)) return;
    this.customStores = this.customStores.filter(s => s !== storeName);
    if (this.storeLocation === storeName) {
      this.storeLocation = 'Lotte Mart Grocery - Puri Indah';
    }
    this.saveUserState();
    this.notify();
  }

  finishCurrentTrip() {
    if (this.cart.length === 0) return null;

    const summary = this.getCartSummary();
    const tripRecord = {
      id: 'trip_' + Date.now(),
      date: Date.now(),
      storeLocation: this.storeLocation || 'Lotte Mart Grocery - Puri Indah',
      shoppingDate: this.shoppingDate || getTodayDateString(),
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
    } else if (rawPercentage >= 90) {
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
// 5. UI CONTROLLER (GALAXY SPACE THEME)
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
    this.btnQuickLoginDevin = document.getElementById('btn-quick-login-devin');
    this.btnGoogleAuthLogin = document.getElementById('btn-google-auth-login');
    this.btnGoogleAuthRegister = document.getElementById('btn-google-auth-register');
    this.cloudAccountsChips = document.getElementById('cloud-accounts-chips');

    // Sesi Belanja (Toko & Tanggal)
    this.sessionStoreSelect = document.getElementById('session-store-select');
    this.btnAddStoreLocation = document.getElementById('btn-add-store-location');
    this.btnAddStoreLocationLink = document.getElementById('btn-add-store-location-link');
    this.sessionDatePicker = document.getElementById('session-date-picker');

    // Modal Add Custom Store Elements
    this.modalAddStore = document.getElementById('modal-add-store');
    this.btnCloseAddStoreModal = document.getElementById('btn-close-add-store-modal');
    this.btnCancelAddStore = document.getElementById('btn-cancel-add-store');
    this.btnSaveNewStore = document.getElementById('btn-save-new-store');
    this.inputNewStoreName = document.getElementById('input-new-store-name');
    this.customStoresChipsList = document.getElementById('custom-stores-chips-list');
    this.customStoresManagementSection = document.getElementById('custom-stores-management-section');

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
    this.modalPriceComparatorIndicator = document.getElementById('modal-price-comparator-indicator');
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

    this.cartActionsBar = document.getElementById('cart-actions-bar');
    this.cartItemCount = document.getElementById('cart-item-count');
    this.btnClearCart = document.getElementById('btn-clear-cart');
    this.modalConfirmClearCart = document.getElementById('modal-confirm-clear-cart');
    this.clearCartCountText = document.getElementById('clear-cart-count-text');
    this.btnConfirmClearCart = document.getElementById('btn-confirm-clear-cart');
    this.btnCancelClearCart = document.getElementById('btn-cancel-clear-cart');

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

    // Modal Firebase Elements
    this.modalFirebase = document.getElementById('modal-firebase');
    this.btnCloseFirebaseModal = document.getElementById('btn-close-firebase-modal');
    this.firebaseStatusBanner = document.getElementById('firebase-status-banner');
    this.firebaseStatusIcon = document.getElementById('firebase-status-icon');
    this.firebaseStatusTitle = document.getElementById('firebase-status-title');
    this.firebaseStatusDesc = document.getElementById('firebase-status-desc');
    this.firebasePasteInput = document.getElementById('firebase-paste-input');
    this.btnParseFirebasePaste = document.getElementById('btn-parse-firebase-paste');
    this.inputFirebaseApiKey = document.getElementById('firebase-input-apikey');
    this.inputFirebaseProjectId = document.getElementById('firebase-input-projectid');
    this.inputFirebaseAppId = document.getElementById('firebase-input-appid');
    this.inputFirebaseAuthDomain = document.getElementById('firebase-input-authdomain');
    this.btnCopyFirestoreRules = document.getElementById('btn-copy-firestore-rules');
    this.btnSaveTestFirebase = document.getElementById('btn-save-test-firebase');
    this.btnTestSyncFirebase = document.getElementById('btn-test-sync-firebase');
    this.btnResetFirebase = document.getElementById('btn-reset-firebase');
    this.btnLoginFirebaseConfig = document.getElementById('btn-login-firebase-config');
    this.cloudSyncPill = document.getElementById('cloud-sync-pill');

    // Modal Google Auth Elements (Official Account Chooser Simulation)
    this.modalGoogleAuth = document.getElementById('modal-google-auth');
    this.btnCloseGoogleModal = document.getElementById('btn-close-google-modal');
    this.googleLoadingBar = document.getElementById('google-loading-bar');
    this.googleViewChooser = document.getElementById('google-view-chooser');
    this.googleViewInput = document.getElementById('google-view-input');
    this.btnGoogleAccountDevin = document.getElementById('btn-google-account-devin');
    this.btnGoogleAccountRian = document.getElementById('btn-google-account-rian');
    this.btnGoogleAccountSiswa = document.getElementById('btn-google-account-siswa');
    this.btnGoogleAccountOther = document.getElementById('btn-google-account-other');
    this.btnGoogleBackToChooser = document.getElementById('btn-google-back-to-chooser');
    this.btnGoogleSubmitEmail = document.getElementById('btn-google-submit-email');
    this.inputGoogleEmailField = document.getElementById('input-google-email-field');
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
        this.selectedAvatar = btn.dataset.avatar || '🧑‍🚀';
        this.avatarOptions.forEach(b => {
          b.className = 'avatar-option-btn p-2 rounded-2xl border border-violet-500/30 bg-slate-900/80 text-2xl flex items-center justify-center';
        });
        btn.className = 'avatar-option-btn p-2 rounded-2xl border-2 border-cyan-400 bg-cyan-950/80 text-2xl flex items-center justify-center shadow-md shadow-cyan-500/30';
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

    // Login Form Submission (Checks local and Cloud Firestore)
    this.formLogin?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = this.inputLoginUsername?.value.trim() || 'devin';
      const p = this.inputLoginPin?.value.trim() || '1234';

      const submitBtn = this.formLogin.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>⏳</span> Memeriksa Akun...`;
      }

      try {
        await store.login(u, p);
        feedback.success();
        this.updateAuthView();
        showToast(`Selamat datang, ${store.currentUser.name || u}!`, 'success', '🚀');
      } catch (err) {
        feedback.dangerAlert();
        showToast(err.message || 'Gagal masuk akun', 'danger', '⚠️');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });

    // Register Form Submission (Saves to local & Cloud Firestore)
    this.formRegister?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = this.regName?.value.trim();
      const username = this.regUsername?.value.trim();
      const pin = this.regPin?.value.trim() || '1234';
      const budgetLimit = this.regBudget?.value || '350.000';

      const submitBtn = this.formRegister.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>⏳</span> Mendaftarkan Akun ke Cloud...`;
      }

      try {
        await store.registerAccount({
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
        showToast(`Akun ${name} berhasil dibuat di Cloud Firestore!`, 'success', '🎉');
        this.updateAuthView();
      } catch (err) {
        feedback.dangerAlert();
        showToast(err.message || 'Gagal mendaftar akun', 'danger', '⚠️');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });

    // Quick 1-Click Login for Rian & Devin
    this.btnQuickLoginRian?.addEventListener('click', async () => {
      try {
        await store.login('rian', '1234');
        feedback.success();
        this.updateAuthView();
        showToast('Selamat datang, Rian!', 'success', '🐰');
      } catch (err) {
        showToast(err.message, 'danger', '⚠️');
      }
    });

    this.btnQuickLoginDevin?.addEventListener('click', async () => {
      try {
        await store.login('devin', '1234');
        feedback.success();
        this.updateAuthView();
        showToast('Masuk sebagai Devin!', 'success', '🪐');
      } catch (err) {
        showToast(err.message, 'danger', '⚠️');
      }
    });

    // Google Authorization Modal Triggers (Official Account Chooser Simulation)
    const openGoogleModal = () => {
      feedback.tap();
      if (this.googleLoadingBar) this.googleLoadingBar.classList.add('hidden');
      if (this.googleViewChooser) this.googleViewChooser.classList.remove('hidden');
      if (this.googleViewInput) this.googleViewInput.classList.add('hidden');
      if (this.inputGoogleEmailField) this.inputGoogleEmailField.value = '';
      this.modalGoogleAuth?.classList.remove('hidden');
    };
    this.btnGoogleAuthLogin?.addEventListener('click', openGoogleModal);
    this.btnGoogleAuthRegister?.addEventListener('click', openGoogleModal);

    const closeGoogleModal = () => {
      feedback.tap();
      this.modalGoogleAuth?.classList.add('hidden');
    };
    this.btnCloseGoogleModal?.addEventListener('click', closeGoogleModal);
    this.modalGoogleAuth?.addEventListener('click', (e) => {
      if (e.target === this.modalGoogleAuth) closeGoogleModal();
    });

    const triggerGoogleLoginWithAnimation = async (profile) => {
      feedback.tap();
      if (this.googleLoadingBar) this.googleLoadingBar.classList.remove('hidden');
      await new Promise(r => setTimeout(r, 450));
      closeGoogleModal();
      await this.loginWithGoogleProfile(profile);
    };

    // Akun 1: Devin Hamsidi (devin@mutiarabangsa.sch.id - Sesuai Screenshot User)
    this.btnGoogleAccountDevin?.addEventListener('click', async () => {
      await triggerGoogleLoginWithAnimation({
        username: 'devin',
        name: 'Devin Hamsidi',
        email: 'devin@mutiarabangsa.sch.id',
        avatar: '🪐'
      });
    });

    // Akun 2: Rian (rian.grocery@gmail.com)
    this.btnGoogleAccountRian?.addEventListener('click', async () => {
      await triggerGoogleLoginWithAnimation({
        username: 'rian',
        name: 'Rian',
        email: 'rian.grocery@gmail.com',
        avatar: '🐰'
      });
    });

    // Akun 3: Siswa Google Lab (siswa@google.sch.id)
    this.btnGoogleAccountSiswa?.addEventListener('click', async () => {
      await triggerGoogleLoginWithAnimation({
        username: 'google_siswa',
        name: 'Siswa Google Lab',
        email: 'siswa@google.sch.id',
        avatar: '🌐'
      });
    });

    // Opsi: Gunakan Akun Lain (Buka Form Email Google)
    this.btnGoogleAccountOther?.addEventListener('click', () => {
      feedback.tap();
      this.googleViewChooser?.classList.add('hidden');
      this.googleViewInput?.classList.remove('hidden');
      setTimeout(() => this.inputGoogleEmailField?.focus(), 80);
    });

    this.btnGoogleBackToChooser?.addEventListener('click', () => {
      feedback.tap();
      this.googleViewInput?.classList.add('hidden');
      this.googleViewChooser?.classList.remove('hidden');
    });

    const handleGoogleEmailSubmit = async () => {
      const email = this.inputGoogleEmailField?.value.trim() || '';
      if (!email || !email.includes('@')) {
        showToast('Masukkan alamat email Google yang valid!', 'warning', '⚠️');
        if (this.inputGoogleEmailField) this.inputGoogleEmailField.focus();
        return;
      }
      const prefix = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
      const formattedName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      await triggerGoogleLoginWithAnimation({
        username: prefix,
        name: formattedName,
        email: email,
        avatar: '🌐'
      });
    };

    this.btnGoogleSubmitEmail?.addEventListener('click', handleGoogleEmailSubmit);
    this.inputGoogleEmailField?.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleGoogleEmailSubmit();
    });

    // Sesi Belanja: Store Select
    this.sessionStoreSelect?.addEventListener('change', (e) => {
      feedback.tap();
      if (e.target.value === '__add_new__') {
        this.openAddStoreModal();
        e.target.value = store.storeLocation;
        return;
      }
      store.storeLocation = e.target.value;
      store.saveUserState();
      store.notify();
      showToast(`Lokasi toko disetel ke: ${store.storeLocation}`, 'info', '🏬');
    });

    const openStoreModalHandler = () => {
      feedback.tap();
      this.openAddStoreModal();
    };
    this.btnAddStoreLocation?.addEventListener('click', openStoreModalHandler);
    this.btnAddStoreLocationLink?.addEventListener('click', openStoreModalHandler);

    this.btnCloseAddStoreModal?.addEventListener('click', () => this.closeAddStoreModal());
    this.btnCancelAddStore?.addEventListener('click', () => this.closeAddStoreModal());
    this.modalAddStore?.addEventListener('click', (e) => {
      if (e.target === this.modalAddStore) this.closeAddStoreModal();
    });

    // Suggestion chips in Add Store modal
    document.querySelectorAll('.btn-store-suggestion').forEach(btn => {
      btn.addEventListener('click', () => {
        feedback.tap();
        const storeName = btn.dataset.store || btn.textContent.trim();
        if (this.inputNewStoreName) {
          this.inputNewStoreName.value = storeName;
          this.inputNewStoreName.focus();
        }
      });
    });

    // Submit new store
    const handleSaveNewStore = () => {
      feedback.tap();
      const val = this.inputNewStoreName ? this.inputNewStoreName.value.trim() : '';
      if (!val || val.length < 2) {
        showToast('Masukkan nama toko/supermarket yang valid!', 'warning', '⚠️');
        if (this.inputNewStoreName) this.inputNewStoreName.focus();
        return;
      }
      const success = store.addCustomStore(val);
      if (success) {
        feedback.success();
        if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 50 });
        showToast(`Lokasi "${val}" berhasil ditambahkan & dipilih!`, 'success', '🏬');
        this.closeAddStoreModal();
      }
    };

    this.btnSaveNewStore?.addEventListener('click', handleSaveNewStore);
    this.inputNewStoreName?.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleSaveNewStore();
    });

    // Klik di mana saja pada kotak input tanggal langsung memunculkan kalender pop-up
    this.sessionDatePicker?.addEventListener('click', () => {
      try {
        if (typeof this.sessionDatePicker.showPicker === 'function') {
          this.sessionDatePicker.showPicker();
        }
      } catch (e) {}
    });

    const handleDateChange = (e) => {
      const val = e.target.value;
      if (!val) return;
      feedback.tap();
      store.shoppingDate = val;
      store.saveUserState();
      if (window.firebaseSync) {
        window.firebaseSync.syncNow();
      }
      showToast(`Tanggal transaksi diubah: ${val}`, 'info', '📅');
    };

    this.sessionDatePicker?.addEventListener('change', handleDateChange);
    this.sessionDatePicker?.addEventListener('input', handleDateChange);

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
    this.modalConfirmClearCart?.addEventListener('click', (e) => {
      if (e.target === this.modalConfirmClearCart) this.closeConfirmClearCartModal();
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

    [this.inputItemPrice, this.inputItemDiscount, this.inputItemQty, this.inputItemLastPrice].forEach(el => {
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
    document.getElementById('btn-load-sample-cart')?.addEventListener('click', () => {
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

    // Confirm Clear All Items (Hapus Semua Belanjaan)
    this.btnClearCart?.addEventListener('click', () => {
      feedback.tap();
      this.openConfirmClearCartModal();
    });

    this.btnConfirmClearCart?.addEventListener('click', () => {
      feedback.tap();
      store.clearCart();
      this.closeConfirmClearCartModal();
      showToast('Semua belanjaan berhasil dikosongkan dari troli!', 'info', '🗑️');
    });

    this.btnCancelClearCart?.addEventListener('click', () => {
      feedback.tap();
      this.closeConfirmClearCartModal();
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

    // Firebase Modal Triggers & Actions
    this.cloudSyncPill?.addEventListener('click', () => {
      feedback.tap();
      this.openFirebaseModal();
    });

    this.btnLoginFirebaseConfig?.addEventListener('click', () => {
      feedback.tap();
      this.openFirebaseModal();
    });

    this.btnCloseFirebaseModal?.addEventListener('click', () => {
      feedback.tap();
      this.closeFirebaseModal();
    });

    this.modalFirebase?.addEventListener('click', (e) => {
      if (e.target === this.modalFirebase) this.closeFirebaseModal();
    });

    this.btnParseFirebasePaste?.addEventListener('click', () => {
      feedback.tap();
      const text = this.firebasePasteInput?.value || '';
      const parsed = parseFirebaseConfigSnippet(text);
      if (parsed) {
        if (this.inputFirebaseApiKey) this.inputFirebaseApiKey.value = parsed.apiKey || '';
        if (this.inputFirebaseProjectId) this.inputFirebaseProjectId.value = parsed.projectId || '';
        if (this.inputFirebaseAppId) this.inputFirebaseAppId.value = parsed.appId || '';
        if (this.inputFirebaseAuthDomain) this.inputFirebaseAuthDomain.value = parsed.authDomain || '';
        feedback.success();
        showToast('✨ Berhasil mengekstrak konfigurasi Firebase! Klik "Simpan & Sambungkan Sekarang".', 'success', '✨');
      } else {
        showToast('Format config belum dikenali. Masukkan API Key dan Project ID manual di bawah.', 'warning', '⚠️');
      }
    });

    this.btnSaveTestFirebase?.addEventListener('click', async () => {
      feedback.tap();
      const apiKey = this.inputFirebaseApiKey?.value.trim();
      const projectId = this.inputFirebaseProjectId?.value.trim();
      const appId = this.inputFirebaseAppId?.value.trim() || '';
      const authDomain = this.inputFirebaseAuthDomain?.value.trim() || (projectId ? `${projectId}.firebaseapp.com` : '');

      if (!apiKey || !projectId) {
        showToast('Harap masukkan API Key dan Project ID terlebih dahulu!', 'warning', '⚠️');
        return;
      }

      const cfg = {
        apiKey,
        projectId,
        appId,
        authDomain,
        storageBucket: `${projectId}.firebasestorage.app`
      };

      try {
        this.renderFirebaseModalStatus('connecting', 'Menghubungkan...', 'Sedang menguji koneksi ke Google Cloud Firestore...');
        await firebaseSync.reconfigure(cfg);
        feedback.success();
        showToast('🎉 Berhasil terhubung ke Firebase Firestore!', 'success', '🟢');
      } catch (err) {
        feedback.dangerAlert();
        showToast('Gagal menyambung ke Firebase: ' + err.message, 'danger', '🚨');
      }
    });

    this.btnTestSyncFirebase?.addEventListener('click', async () => {
      feedback.tap();
      try {
        this.renderFirebaseModalStatus('syncing', 'Menyimpan...', 'Mengirim data aktif ke Firestore...');
        await firebaseSync.syncNow();
        feedback.success();
        showToast('✅ Sinkronisasi cloud Firestore berhasil!', 'success', '☁️');
      } catch (err) {
        showToast('Gagal sinkronisasi: ' + err.message, 'danger', '🚨');
      }
    });

    this.btnResetFirebase?.addEventListener('click', async () => {
      if (confirm('Kembalikan ke mode penyimpanan lokal?')) {
        feedback.tap();
        await firebaseSync.resetConfig();
        this.populateFirebaseModalFields();
        this.renderFirebaseModalStatus('offline', 'Mode Lokal Aktif', 'Penyimpanan lokal diaktifkan.');
        showToast('Mode penyimpanan lokal diaktifkan.', 'info', '🏠');
      }
    });

    this.btnCopyFirestoreRules?.addEventListener('click', () => {
      feedback.tap();
      const rules = `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(rules).then(() => {
          showToast('🛡️ Aturan Firestore berhasil disalin ke clipboard!', 'success', '📋');
        }).catch(() => {
          showToast(rules, 'info', '📋');
        });
      } else {
        showToast(rules, 'info', '📋');
      }
    });
  }

  openFirebaseModal() {
    this.populateFirebaseModalFields();
    const isConfigured = firebaseSync.isConfigured();
    if (!isConfigured) {
      this.renderFirebaseModalStatus('offline', 'Belum Dikonfigurasi', 'Masukkan API Key dan Project ID Firebase Anda untuk mengaktifkan sinkronisasi otomatis multi-perangkat.');
    } else {
      this.renderFirebaseModalStatus(firebaseSync.status, document.getElementById('cloud-sync-label')?.textContent || 'Cloud Sync', firebaseSync.statusDetail);
    }
    this.modalFirebase?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  closeFirebaseModal() {
    this.modalFirebase?.classList.add('hidden');
  }

  populateFirebaseModalFields() {
    const cfg = firebaseSync.getConfig();
    if (this.inputFirebaseApiKey) this.inputFirebaseApiKey.value = cfg.apiKey || '';
    if (this.inputFirebaseProjectId) this.inputFirebaseProjectId.value = cfg.projectId || '';
    if (this.inputFirebaseAppId) this.inputFirebaseAppId.value = cfg.appId || '';
    if (this.inputFirebaseAuthDomain) this.inputFirebaseAuthDomain.value = cfg.authDomain || '';
  }

  renderFirebaseModalStatus(status, title, desc) {
    if (!this.firebaseStatusBanner) return;
    switch (status) {
      case 'synced':
        this.firebaseStatusBanner.className = 'p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs transition-all';
        if (this.firebaseStatusIcon) this.firebaseStatusIcon.textContent = '🟢';
        if (this.firebaseStatusTitle) this.firebaseStatusTitle.className = 'font-black text-emerald-800 text-xs';
        break;
      case 'syncing':
      case 'connecting':
        this.firebaseStatusBanner.className = 'p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs transition-all';
        if (this.firebaseStatusIcon) this.firebaseStatusIcon.textContent = '⏳';
        if (this.firebaseStatusTitle) this.firebaseStatusTitle.className = 'font-black text-amber-800 text-xs';
        break;
      case 'error':
        this.firebaseStatusBanner.className = 'p-3 rounded-2xl bg-rose-50 border border-rose-300 flex items-start gap-2.5 text-xs transition-all';
        if (this.firebaseStatusIcon) this.firebaseStatusIcon.textContent = '🚨';
        if (this.firebaseStatusTitle) this.firebaseStatusTitle.className = 'font-black text-rose-800 text-xs';
        break;
      case 'offline':
      default:
        this.firebaseStatusBanner.className = 'p-3 rounded-2xl bg-slate-900/90 border border-violet-500/30 flex items-start gap-2.5 text-xs transition-all';
        if (this.firebaseStatusIcon) this.firebaseStatusIcon.textContent = '💡';
        if (this.firebaseStatusTitle) this.firebaseStatusTitle.className = 'font-black text-cyan-300 text-xs';
        break;
    }
    if (this.firebaseStatusTitle) this.firebaseStatusTitle.textContent = title;
    if (this.firebaseStatusDesc) this.firebaseStatusDesc.textContent = desc || (status === 'synced' ? 'Tersambung lancar ke Cloud Firestore.' : '');
  }

  async loginWithGoogleProfile({ username, name, email, avatar }) {
    const cleanUser = String(username || 'google_user').toLowerCase().trim();
    let account = Array.isArray(store.accounts) ? store.accounts.find(a => a.username.toLowerCase() === cleanUser) : null;
    if (!account) {
      account = {
        username: cleanUser,
        name: name || cleanUser,
        email: email || '',
        avatar: avatar || '🌐',
        pin: '1234',
        budgetLimit: 350000,
        createdAt: Date.now(),
        authProvider: 'google'
      };
      store.accounts.push(account);
    } else {
      if (name) account.name = name;
      if (email) account.email = email;
      account.authProvider = 'google';
    }
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS_LIST, JSON.stringify(store.accounts));

    // Background cloud sync without blocking
    if (window.firebaseSync) {
      try {
        window.firebaseSync.saveAccountToCloud(account).catch(() => {});
      } catch (e) {}
    }

    try {
      await store.setUserSession(account);
    } catch (sessionErr) {
      console.warn('[Session set notice]:', sessionErr);
      store.currentUser = { ...account, loginAt: Date.now() };
      store.loadUserState();
      store.notify(true);
    }

    feedback.success();
    if (typeof confetti === 'function') {
      try { confetti({ particleCount: 60, spread: 60 }); } catch (e) {}
    }
    showToast(`Selamat datang, ${account.name}! (Google Auth)`, 'success', '🌐');
    this.updateAuthView();
  }

  async handleGooglePopupAuth() {
    feedback.tap();
    try {
      if (typeof firebase !== 'undefined' && firebase.auth) {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        if (user) {
          const cleanUser = (user.email ? user.email.split('@')[0] : (user.displayName || 'google_user'))
            .toLowerCase()
            .replace(/[^a-zA-Z0-9_]/g, '_');

          await this.loginWithGoogleProfile({
            username: cleanUser,
            name: user.displayName || cleanUser,
            email: user.email || '',
            avatar: '🌐'
          });
          return;
        }
      }
    } catch (authErr) {
      console.warn('[Firebase Auth] Handled popup error silently:', authErr.code, authErr.message);
      if (authErr.code === 'auth/popup-closed-by-user') {
        showToast('Login dengan Google dibatalkan.', 'info', 'ℹ️');
        return;
      }
    }

    // Seamless fallback: Log in directly as Siswa Google Lab
    await this.loginWithGoogleProfile({
      username: 'google_siswa',
      name: 'Siswa Google Lab',
      email: 'siswa@google.sch.id',
      avatar: '🌐'
    });
  }

  switchAuthTab(tab) {
    if (tab === 'register') {
      this.authTabBtnLogin.className = 'py-2 rounded-xl transition-all duration-200 text-slate-400 hover:text-cyan-300 flex items-center justify-center gap-1.5';
      this.authTabBtnRegister.className = 'py-2 rounded-xl transition-all duration-200 bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/40 flex items-center justify-center gap-1.5 font-bold';
      this.authPanelLogin.classList.add('hidden');
      this.authPanelRegister.classList.remove('hidden');
    } else {
      this.authTabBtnLogin.className = 'py-2 rounded-xl transition-all duration-200 bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/40 flex items-center justify-center gap-1.5 font-bold';
      this.authTabBtnRegister.className = 'py-2 rounded-xl transition-all duration-200 text-slate-400 hover:text-cyan-300 flex items-center justify-center gap-1.5';
      this.authPanelLogin.classList.remove('hidden');
      this.authPanelRegister.classList.add('hidden');
    }
  }

  async renderCloudAccountChips() {
    if (!this.cloudAccountsChips) return;
    
    // Ambil akun lokal (store.accounts adalah Array)
    const localUsers = Array.isArray(store.accounts) 
      ? store.accounts.map(a => a.username ? a.username.toLowerCase().trim() : '') 
      : [];
    
    let cloudUsers = [];
    try {
      cloudUsers = (await firebaseSync.fetchAllAccountsFromCloud()) || [];
    } catch (e) {
      cloudUsers = [];
    }

    const allUsers = Array.from(new Set([...localUsers, ...cloudUsers]))
      .filter(u => !!u && typeof u === 'string' && u !== '0' && u !== '1');

    if (allUsers.length === 0) {
      this.cloudAccountsChips.innerHTML = '<span class="text-[11px] text-slate-500 italic">Belum ada akun lain</span>';
      return;
    }

    this.cloudAccountsChips.innerHTML = '';
    allUsers.forEach(u => {
      const acc = Array.isArray(store.accounts) ? store.accounts.find(a => a.username.toLowerCase() === u) : null;
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'px-2.5 py-1 rounded-xl bg-violet-950/80 hover:bg-cyan-950/80 border border-violet-500/40 hover:border-cyan-400/60 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all tap-effect';
      chip.innerHTML = `<span>${acc?.avatar || '👤'}</span><span>${acc?.name || u}</span>`;
      chip.title = `Klik untuk memilih akun "${u}"`;
      chip.addEventListener('click', async () => {
        feedback.tap();
        chip.classList.add('animate-pulse', 'border-cyan-400');
        const pin = acc?.pin || '1234';
        try {
          await store.login(u, pin);
          feedback.success();
          showToast(`Berhasil masuk sebagai ${acc?.name || u}!`, 'success', '🚀');
          this.updateAuthView();
        } catch (err) {
          if (this.inputLoginUsername) this.inputLoginUsername.value = u;
          if (this.inputLoginPin) {
            this.inputLoginPin.value = pin;
            this.inputLoginPin.focus();
          }
          showToast(err.message || 'Gagal masuk akun', 'danger', '⚠️');
        }
      });
      this.cloudAccountsChips.appendChild(chip);
    });
  }

  updateAuthView() {
    if (!store.currentUser) {
      this.viewLoginScreen?.classList.remove('hidden');
      this.renderCloudAccountChips();
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
      el.classList.remove('text-cyan-400', 'font-black');
      el.classList.add('text-slate-400');
      const icon = el.querySelector('.nav-icon-container');
      if (icon) {
        icon.classList.remove('bg-violet-950/80', 'text-cyan-400', 'ring-2', 'ring-cyan-400/50', 'shadow-xs');
      }
    });

    [this.tabBelanja, this.tabRiwayat, this.tabAnggaran].forEach(el => {
      if (el) el.classList.add('hidden');
    });

    if (tab === 'belanja') {
      this.tabBelanja?.classList.remove('hidden');
      this.navBelanja?.classList.add('text-cyan-400', 'font-black');
      this.navBelanja?.classList.remove('text-slate-400');
      this.navBelanja?.querySelector('.nav-icon-container')?.classList.add('bg-violet-950/80', 'text-cyan-400', 'ring-2', 'ring-cyan-400/50', 'shadow-xs');
      this.floatingAddBtn?.classList.remove('hidden');
    } else if (tab === 'riwayat') {
      this.tabRiwayat?.classList.remove('hidden');
      this.navRiwayat?.classList.add('text-cyan-400', 'font-black');
      this.navRiwayat?.classList.remove('text-slate-400');
      this.navRiwayat?.querySelector('.nav-icon-container')?.classList.add('bg-violet-950/80', 'text-cyan-400', 'ring-2', 'ring-cyan-400/50', 'shadow-xs');
      this.floatingAddBtn?.classList.add('hidden');
      this.renderHistoryList();
    } else if (tab === 'anggaran') {
      this.tabAnggaran?.classList.remove('hidden');
      this.navAnggaran?.classList.add('text-cyan-400', 'font-black');
      this.navAnggaran?.classList.remove('text-slate-400');
      this.navAnggaran?.querySelector('.nav-icon-container')?.classList.add('bg-violet-950/80', 'text-cyan-400', 'ring-2', 'ring-cyan-400/50', 'shadow-xs');
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
        <div class="flex items-center gap-1.5 text-xs text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded-xl px-2.5 py-1.5">
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
    const lastPrice = this.inputItemLastPrice?.value ? parseRupiahInput(this.inputItemLastPrice.value) : null;

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

    // F-04: Realtime Price Comparator vs Bulan Lalu
    if (this.modalPriceComparatorIndicator) {
      if (lastPrice !== null && lastPrice > 0 && unitPrice > 0) {
        const diff = unitPrice - lastPrice;
        this.modalPriceComparatorIndicator.classList.remove('hidden');
        if (diff > 0) {
          this.modalPriceComparatorIndicator.className = 'rounded-xl p-2.5 border text-xs font-bold flex items-center justify-between bg-rose-50 text-rose-700 border-rose-300 shadow-xs';
          this.modalPriceComparatorIndicator.innerHTML = `
            <span class="flex items-center gap-1.5">
              <span class="text-base">🔺</span>
              <span>Harga Naik dibanding bulan lalu:</span>
            </span>
            <span class="font-black font-mono-num bg-rose-100 text-rose-800 px-2 py-0.5 rounded-lg border border-rose-200">
              &uarr; +${formatRupiah(diff)} (Naik)
            </span>
          `;
        } else if (diff < 0) {
          const saving = Math.abs(diff);
          this.modalPriceComparatorIndicator.className = 'rounded-xl p-2.5 border text-xs font-bold flex items-center justify-between bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs';
          this.modalPriceComparatorIndicator.innerHTML = `
            <span class="flex items-center gap-1.5">
              <span class="text-base">🔻</span>
              <span>Harga Turun dibanding bulan lalu:</span>
            </span>
            <span class="font-black font-mono-num bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg border border-emerald-200">
              &darr; -${formatRupiah(saving)} (Hemat!)
            </span>
          `;
        } else {
          this.modalPriceComparatorIndicator.className = 'rounded-xl p-2.5 border text-xs font-bold flex items-center justify-between bg-slate-900/90 text-slate-300 border-slate-600/50 shadow-xs';
          this.modalPriceComparatorIndicator.innerHTML = `
            <span class="flex items-center gap-1.5">
              <span class="text-base">⚖️</span>
              <span>Harga Sama / Stabil:</span>
            </span>
            <span class="font-black font-mono-num bg-slate-800 text-slate-200 px-2 py-0.5 rounded-lg border border-slate-700">
              = Tetap (${formatRupiah(unitPrice)})
            </span>
          `;
        }
      } else if (unitPrice > 0) {
        this.modalPriceComparatorIndicator.classList.remove('hidden');
        this.modalPriceComparatorIndicator.className = 'rounded-xl p-2.5 border text-xs font-bold flex items-center justify-between bg-cyan-950/80 text-cyan-300 border-cyan-500/40 shadow-sm';
        this.modalPriceComparatorIndicator.innerHTML = `
          <span class="flex items-center gap-1.5">
            <span class="text-base">⭐</span>
            <span>Produk Baru (Belum ada data bulan lalu)</span>
          </span>
          <span class="text-[11px] font-semibold text-slate-300 font-mono-num">${formatRupiah(unitPrice)}</span>
        `;
      } else {
        this.modalPriceComparatorIndicator.classList.add('hidden');
      }
    }
  }

  openAddItemModal(itemToEdit = null) {
    this.editingItemId = itemToEdit ? itemToEdit.id : null;
    this.formItem.reset();
    this.autoLookupNotice.classList.add('hidden');

    if (itemToEdit) {
      this.modalItemTitle.textContent = 'Edit Produk Belanja';
      this.inputItemName.value = itemToEdit.name;
      this.inputItemCategory.value = itemToEdit.category;
      this.inputItemUnit.value = itemToEdit.unit;
      this.inputItemQty.value = itemToEdit.qty;
      this.inputItemPrice.value = formatRupiahNumber(itemToEdit.unitPrice);
      this.inputItemLastPrice.value = itemToEdit.lastMonthPrice ? formatRupiahNumber(itemToEdit.lastMonthPrice) : '';
      this.inputItemDiscount.value = itemToEdit.discountRaw || '';
    } else {
      this.modalItemTitle.textContent = 'Tambah Produk Baru 🪐';
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
      feedback.dangerAlert();
      showToast('⚠️ Nama barang wajib diisi! Tidak boleh kosong.', 'warning', '📝');
      return;
    }

    const rawPriceStr = this.inputItemPrice.value.trim();
    const price = parseRupiahInput(rawPriceStr);
    if (rawPriceStr.includes('-') || isNaN(price) || price <= 0) {
      feedback.dangerAlert();
      showToast('⚠️ Harga satuan tidak valid / tidak boleh bernilai negatif (-Rp 15.000)! Wajib lebih dari Rp 0.', 'danger', '🛑');
      return;
    }

    const qty = parseFloat(this.inputItemQty.value);
    if (isNaN(qty) || qty <= 0) {
      feedback.dangerAlert();
      showToast('⚠️ Kuantitas barang minimal 1!', 'warning', '🔢');
      return;
    }

    const itemData = {
      name,
      category: this.inputItemCategory.value,
      unit: this.inputItemUnit.value,
      qty,
      unitPrice: price,
      lastMonthPrice: this.inputItemLastPrice.value ? parseRupiahInput(this.inputItemLastPrice.value) : null,
      discountRaw: this.inputItemDiscount.value.trim()
    };

    if (this.editingItemId) {
      store.updateItem(this.editingItemId, itemData);
      feedback.tap();
      showToast(`Produk "${name}" berhasil diperbarui!`, 'success', '✏️');
    } else {
      store.addItem(itemData);
      feedback.increment();
      showToast(`"${name}" berhasil dimasukkan ke keranjang!`, 'success', '🛒');

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
    store.storeLocation = 'Lotte Mart Grocery - Puri Indah';
    store.shoppingDate = getTodayDateString();
    store.budgetLimit = 100000;
    
    store.cart = [
      {
        id: 'sample-1',
        name: 'Beras Rojolele',
        category: 'bahan-pokok',
        unit: 'karung/5kg',
        qty: 1,
        unitPrice: 74000,
        lastMonthPrice: 68000,
        discountRaw: '',
        createdAt: Date.now() - 60000
      },
      {
        id: 'sample-2',
        name: 'Minyak Goreng 2L',
        category: 'bahan-pokok',
        unit: 'pouch',
        qty: 1,
        unitPrice: 43000,
        lastMonthPrice: 43000,
        discountRaw: '',
        createdAt: Date.now() - 50000
      },
      {
        id: 'sample-3',
        name: 'Sabun Cuci',
        category: 'kebersihan',
        unit: 'pcs',
        qty: 1,
        unitPrice: 20000,
        lastMonthPrice: null,
        discountRaw: '25%',
        createdAt: Date.now() - 40000
      },
      {
        id: 'sample-4',
        name: 'Wajan',
        category: 'peralatan',
        unit: 'pcs',
        qty: 1,
        unitPrice: 100000,
        lastMonthPrice: null,
        discountRaw: '50%+20%',
        createdAt: Date.now() - 30000
      },
      {
        id: 'sample-5',
        name: 'Telur Ayam 1kg',
        category: 'bahan-pokok',
        unit: 'kg',
        qty: 1,
        unitPrice: 28000,
        lastMonthPrice: 32000,
        discountRaw: '',
        createdAt: Date.now() - 20000
      },
      {
        id: 'sample-6',
        name: 'Garam Dapur 500g',
        category: 'bahan-pokok',
        unit: 'pack',
        qty: 1,
        unitPrice: 5000,
        lastMonthPrice: 5000,
        discountRaw: '',
        createdAt: Date.now() - 10000
      }
    ];

    store.notify();
    showToast('🏬 Contoh keranjang belanja bulanan berhasil dimuat!', 'success', '🛒');
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

  openConfirmClearCartModal() {
    if (this.clearCartCountText) {
      this.clearCartCountText.textContent = `${store.cart.length} barang`;
    }
    this.modalConfirmClearCart?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  closeConfirmClearCartModal() {
    this.modalConfirmClearCart?.classList.add('hidden');
  }

  handleFinishShopping() {
    if (store.cart.length === 0) {
      showToast('Keranjang belanja masih kosong!', 'warning', '🛒');
      return;
    }

    const confirmFinish = confirm('Selesaikan belanja dan bayar di kasir? Seluruh item belanja akan dicatat di Riwayat Belanja!');
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

  openAddStoreModal() {
    if (this.inputNewStoreName) {
      this.inputNewStoreName.value = '';
    }
    this.renderCustomStoresChips();
    this.modalAddStore?.classList.remove('hidden');
    setTimeout(() => this.inputNewStoreName?.focus(), 80);
    if (window.lucide) window.lucide.createIcons();
  }

  closeAddStoreModal() {
    this.modalAddStore?.classList.add('hidden');
  }

  renderCustomStoresChips() {
    if (!this.customStoresChipsList || !this.customStoresManagementSection) return;
    const list = store.customStores || [];
    if (list.length === 0) {
      this.customStoresManagementSection.classList.add('hidden');
      this.customStoresChipsList.innerHTML = '';
      return;
    }

    this.customStoresManagementSection.classList.remove('hidden');
    this.customStoresChipsList.innerHTML = '';
    list.forEach(storeName => {
      const chip = document.createElement('div');
      chip.className = 'px-2.5 py-1 rounded-xl bg-violet-950/80 border border-violet-500/40 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-2xs';
      chip.innerHTML = `
        <span class="cursor-pointer hover:text-cyan-300 transition-colors flex items-center gap-1"><span>🏬</span><span>${storeName}</span></span>
        <button type="button" class="w-4 h-4 rounded-full bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 flex items-center justify-center text-[10px] ml-1 tap-effect" title="Hapus toko kustom">✕</button>
      `;
      // Click name to select
      chip.firstElementChild.addEventListener('click', () => {
        feedback.tap();
        store.storeLocation = storeName;
        store.saveUserState();
        store.notify();
        showToast(`Lokasi toko disetel ke: ${storeName}`, 'info', '🏬');
        this.closeAddStoreModal();
      });
      // Click delete button
      chip.lastElementChild.addEventListener('click', (e) => {
        e.stopPropagation();
        feedback.tap();
        store.removeCustomStore(storeName);
        this.renderCustomStoresChips();
        showToast(`Toko "${storeName}" dihapus dari daftar kustom.`, 'info', '🗑️');
      });
      this.customStoresChipsList.appendChild(chip);
    });
  }

  renderStoreSelectOptions() {
    if (!this.sessionStoreSelect) return;
    const currentVal = store.storeLocation || 'Lotte Mart Grocery - Puri Indah';

    const defaultStores = [
      'Lotte Mart Grocery - Puri Indah',
      'Super Indo Supermarket',
      'Hypermart Mall'
    ];

    const customStores = store.customStores || [];
    const allStores = Array.from(new Set([...defaultStores, ...customStores]));
    if (!allStores.includes(currentVal)) {
      allStores.push(currentVal);
    }

    this.sessionStoreSelect.innerHTML = '';

    // Group default stores
    const optGroupDefault = document.createElement('optgroup');
    optGroupDefault.label = '🏬 Toko Populer / Preset';
    defaultStores.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      if (s === currentVal) opt.selected = true;
      optGroupDefault.appendChild(opt);
    });
    this.sessionStoreSelect.appendChild(optGroupDefault);

    // Custom stores optgroup
    if (customStores.length > 0) {
      const optGroupCustom = document.createElement('optgroup');
      optGroupCustom.label = '📍 Toko Kustom Anda';
      customStores.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = `🏪 ${s}`;
        if (s === currentVal) opt.selected = true;
        optGroupCustom.appendChild(opt);
      });
      this.sessionStoreSelect.appendChild(optGroupCustom);
    }

    // Bottom action option to add new
    const optAdd = document.createElement('option');
    optAdd.value = '__add_new__';
    optAdd.textContent = '➕ + Tambah Lokasi Baru...';
    optAdd.className = 'font-bold text-cyan-400 bg-slate-900';
    this.sessionStoreSelect.appendChild(optAdd);

    this.sessionStoreSelect.value = currentVal;
  }

  render() {
    this.renderStoreSelectOptions();
    if (this.sessionDatePicker && store.shoppingDate) {
      this.sessionDatePicker.value = store.shoppingDate;
    }

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
      this.headerRemaining.className = 'text-base font-black text-cyan-400 font-mono-num tracking-tight leading-tight';
      this.headerRemainingLabel.textContent = 'Sisa Anggaran';
    } else {
      this.headerRemaining.textContent = `- ${formatRupiah(Math.abs(summary.remainingBudget))}`;
      this.headerRemaining.className = 'text-base font-black text-rose-400 font-mono-num tracking-tight leading-tight';
      this.headerRemainingLabel.textContent = 'Melebihi Limit!';
    }

    this.headerProgressBar.style.width = `${summary.budgetUsagePercent}%`;
    this.headerProgressPercent.textContent = `${Math.round(summary.rawPercentage)}%`;

    this.headerContainer.classList.remove('animate-danger-pulse', 'border-rose-500/60');

    const overbudgetTopBanner = document.getElementById('overbudget-top-banner');

    if (summary.budgetStatus === 'safe') {
      this.headerProgressBar.className = 'h-full rounded-full transition-progress bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 shadow-sm shadow-cyan-500/50';
      this.headerStatusBadge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 flex items-center gap-1';
      this.headerStatusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> ⚡ Anggaran Aman`;
      if (overbudgetTopBanner) overbudgetTopBanner.classList.add('hidden');
    } else if (summary.budgetStatus === 'warning') {
      this.headerProgressBar.className = 'h-full rounded-full transition-progress bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm shadow-amber-500/50';
      this.headerStatusBadge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center gap-1 animate-soft-pulse';
      this.headerStatusBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> ⚠️ Limit Menipis (${Math.round(summary.rawPercentage)}%)`;
      if (overbudgetTopBanner) overbudgetTopBanner.classList.add('hidden');
    } else {
      this.headerProgressBar.className = 'h-full rounded-full transition-progress bg-gradient-to-r from-rose-500 to-red-600 shadow-sm shadow-rose-500/80';
      this.headerContainer.classList.add('animate-danger-pulse', 'border-rose-500/60');
      this.headerStatusBadge.className = 'text-[11px] font-black px-2 py-0.5 rounded-full bg-rose-600 text-white flex items-center gap-1 shadow-md shadow-rose-600/50';
      this.headerStatusBadge.innerHTML = `<span>🚨</span> OVERBUDGET!`;
      if (overbudgetTopBanner) overbudgetTopBanner.classList.remove('hidden');
    }

    if (summary.totalSaved > 0) {
      this.totalSavedBadge.innerHTML = `
        <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 text-xs font-bold shadow-xs">
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
          ? 'bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/40 border border-cyan-400/50'
          : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-violet-500/25'
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
      card.className = 'shrink-0 w-36 bg-slate-900/85 border border-violet-500/30 rounded-2xl p-2.5 flex flex-col justify-between shadow-lg shadow-black/40 hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition-all backdrop-blur-sm';
      
      const catObj = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[1];

      card.innerHTML = `
        <div>
          <span class="text-[9px] font-black px-1.5 py-0.5 rounded-md ${catObj.color} inline-block mb-1">
            ${catObj.name}
          </span>
          <h4 class="text-xs font-black text-slate-100 truncate" title="${item.name}">${item.name}</h4>
          <div class="text-[11px] font-mono-num font-black text-cyan-400 mt-0.5">
            ${formatRupiah(item.price)}
          </div>
        </div>

        <button 
          type="button" 
          class="mt-2 w-full py-1.5 px-2 rounded-xl bg-violet-950/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-violet-600 text-violet-200 hover:text-white border border-violet-500/40 text-[10px] font-black flex items-center justify-center gap-1 tap-effect transition-all"
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
      this.cartActionsBar?.classList.add('hidden');
      this.cartItemList.innerHTML = '';
      if (this.finishShoppingBtn) {
        this.finishShoppingBtn.disabled = true;
        this.finishShoppingBtn.classList.add('opacity-50', 'pointer-events-none');
      }
      return;
    }

    if (this.cartActionsBar) {
      this.cartActionsBar.classList.remove('hidden');
      if (this.cartItemCount) {
        this.cartItemCount.textContent = store.cart.length;
      }
    }

    if (this.finishShoppingBtn) {
      this.finishShoppingBtn.disabled = false;
      this.finishShoppingBtn.classList.remove('opacity-50', 'pointer-events-none');
    }

    if (filtered.length === 0) {
      this.cartEmptyState?.classList.add('hidden');
      this.cartItemList.innerHTML = `
        <div class="py-12 text-center text-slate-400">
          <p class="text-sm font-bold text-slate-300">Tidak ada produk yang cocok dengan "${store.searchQuery}"</p>
          <button type="button" class="mt-3 text-xs text-cyan-400 hover:text-cyan-300 underline font-black" id="btn-reset-filters">Tampilkan Semua Produk</button>
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
    card.className = 'grocery-card relative bg-slate-900/85 border border-violet-500/30 rounded-3xl p-3.5 shadow-xl shadow-black/40 hover:border-cyan-400/50 transition-all backdrop-blur-md';
    card.dataset.itemId = item.id;

    const totals = Calculator.getItemTotals(item);
    const catObj = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[1];

    // Price Comparator Badge
    let priceComparatorBadge = '';
    if (item.lastMonthPrice !== null && item.lastMonthPrice !== undefined && item.lastMonthPrice > 0) {
      const diff = item.unitPrice - item.lastMonthPrice;
      if (diff > 0) {
        priceComparatorBadge = `
          <span class="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-500/50">
            &uarr; +${formatRupiah(diff)} (Naik)
          </span>
        `;
      } else if (diff < 0) {
        priceComparatorBadge = `
          <span class="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/50">
            &darr; -${formatRupiah(Math.abs(diff))} (Hemat)
          </span>
        `;
      } else {
        priceComparatorBadge = `
          <span class="inline-flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-600/50">
            = ${formatRupiah(item.unitPrice)} (Stabil)
          </span>
        `;
      }
    } else {
      priceComparatorBadge = `
        <span class="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/50">
          ⭐ Produk Baru
        </span>
      `;
    }

    // Discount Badge & Price Display
    let discountBadgeHtml = '';
    let unitPriceHtml = '';

    if (totals.isDiscounted) {
      discountBadgeHtml = `
        <span class="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-500/40">
          Diskon ${totals.discountText}
        </span>
        <span class="text-[11px] font-bold text-emerald-400">
          Hemat ${formatRupiah(totals.totalSaving)}
        </span>
      `;
      unitPriceHtml = `
        <div class="flex items-baseline gap-1.5 flex-wrap">
          <span class="text-sm font-black text-cyan-300 font-mono-num">${formatRupiah(totals.finalUnitPrice)}</span>
          <span class="text-xs text-slate-500 line-through font-mono-num">${formatRupiah(item.unitPrice)}</span>
          <span class="text-xs text-slate-400">/${item.unit}</span>
        </div>
      `;
    } else {
      unitPriceHtml = `
        <div class="flex items-baseline gap-1">
          <span class="text-sm font-black text-cyan-300 font-mono-num">${formatRupiah(item.unitPrice)}</span>
          <span class="text-xs text-slate-400">/${item.unit}</span>
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

          <h3 class="text-sm font-black text-slate-100 truncate pr-2 item-title cursor-pointer hover:text-cyan-300 transition-colors" title="${item.name}">
            ${item.name}
          </h3>
          ${unitPriceHtml}

          <div class="flex items-center gap-2 mt-1 flex-wrap">
            ${discountBadgeHtml}
          </div>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <button type="button" class="btn-edit-item touch-target w-8 h-8 rounded-xl bg-slate-800/80 text-cyan-400 hover:bg-slate-700 hover:text-cyan-300 border border-cyan-500/30 tap-effect" title="Edit">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button type="button" class="btn-delete-item touch-target w-8 h-8 rounded-xl bg-slate-800/80 text-rose-400 hover:bg-rose-950 hover:text-rose-300 border border-rose-500/30 tap-effect" title="Hapus">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <div class="pt-2 mt-2 border-t border-violet-500/20 flex items-center justify-between gap-3">
        <div>
          <span class="text-[11px] text-slate-400 block font-bold">Subtotal</span>
          <span class="card-subtotal-val text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300 font-mono-num tracking-tight">${formatRupiah(totals.subtotal)}</span>
        </div>

        <div class="flex items-center bg-slate-950/90 rounded-2xl p-1 border border-violet-500/30 shadow-inner">
          <button type="button" class="btn-stepper-minus touch-target w-10 h-10 rounded-xl bg-slate-800/90 text-slate-200 active:bg-rose-600 active:text-white border border-slate-700/60 tap-effect font-black text-xl flex items-center justify-center shadow-xs">
            <i data-lucide="minus" class="w-4 h-4"></i>
          </button>
          <div class="w-14 text-center px-1">
            <input 
              type="number" 
              inputmode="numeric" 
              min="1" 
              step="any"
              value="${item.qty}" 
              class="input-row-qty w-full text-center font-black text-base text-cyan-300 font-mono-num bg-slate-900/90 border border-violet-500/30 rounded-lg py-0.5 focus:border-cyan-400 focus:outline-none"
              title="Ketik kuantitas langsung"
            />
            <span class="text-[10px] text-slate-400 block -mt-0.5 font-semibold">${item.unit}</span>
          </div>
          <button type="button" class="btn-stepper-plus touch-target w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 text-white active:scale-95 tap-effect font-black text-xl flex items-center justify-center shadow-md shadow-violet-500/30">
            <i data-lucide="plus" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;

    // Event Bindings
    const minusBtn = card.querySelector('.btn-stepper-minus');
    const plusBtn = card.querySelector('.btn-stepper-plus');
    const rowQtyInput = card.querySelector('.input-row-qty');
    const editBtn = card.querySelector('.btn-edit-item');
    const deleteBtn = card.querySelector('.btn-delete-item');
    const titleEl = card.querySelector('.item-title');

    if (rowQtyInput) {
      rowQtyInput.addEventListener('input', (e) => {
        let val = parseFloat(e.target.value);
        if (!isNaN(val) && val > 0) {
          const previewTotals = Calculator.getItemTotals({ ...item, qty: val });
          const subtotalEl = card.querySelector('.card-subtotal-val');
          if (subtotalEl) subtotalEl.textContent = formatRupiah(previewTotals.subtotal);
        }
      });

      rowQtyInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          rowQtyInput.blur();
        }
      });

      rowQtyInput.addEventListener('change', (e) => {
        let val = parseFloat(e.target.value);
        if (isNaN(val) || val <= 0) {
          val = 1;
          e.target.value = 1;
        }
        feedback.tap();
        store.updateItem(item.id, { qty: val });
        const summary = store.getCartSummary();
        if (summary.budgetStatus === 'danger' && !this.overbudgetWarningSuppressed) {
          this.triggerOverbudgetDanger(summary);
        }
      });
      rowQtyInput.addEventListener('click', (e) => e.stopPropagation());
    }

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
      tripCard.className = 'bg-slate-900/85 border border-violet-500/30 rounded-3xl p-4 shadow-xl space-y-3 backdrop-blur-md';
      
      const itemsListHtml = (trip.items || []).slice(0, 4).map(it => `
        <div class="flex items-center justify-between text-xs py-1 border-b border-violet-500/20 last:border-0 font-medium">
          <span class="text-slate-300 truncate max-w-[200px]">${it.name} (${it.qty} ${it.unit})</span>
          <span class="font-mono-num text-cyan-300 font-bold">${formatRupiah(it.subtotal)}</span>
        </div>
      `).join('');

      tripCard.innerHTML = `
        <div class="flex items-center justify-between border-b border-violet-500/20 pb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-violet-950/80 border border-violet-500/30 text-violet-300 flex items-center justify-center text-base">
              🪐
            </div>
            <div>
              <span class="text-xs font-black text-slate-100 block">${formatDateIndo(trip.date)}</span>
              <span class="text-[10px] text-cyan-400 font-bold block truncate max-w-[170px]">📍 ${trip.storeLocation || 'Lotte Mart'} • ${trip.itemCount || 0} item</span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300 font-mono-num block">${formatRupiah(trip.totalSpent)}</span>
            ${trip.totalSaved > 0 ? `<span class="text-[10px] text-emerald-400 font-extrabold">Hemat ${formatRupiah(trip.totalSaved)}</span>` : ''}
          </div>
        </div>

        <div class="bg-slate-950/70 rounded-2xl p-2.5 space-y-1 border border-violet-500/20">
          ${itemsListHtml}
          ${(trip.items || []).length > 4 ? `<div class="text-[10px] text-slate-400 text-center pt-1 font-bold">+ ${(trip.items || []).length - 4} produk lainnya</div>` : ''}
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
      this.budgetPagePercent.className = summary.budgetStatus === 'danger' ? 'font-black text-rose-400' : 'font-black text-cyan-300';
    }

    if (this.budgetGaugeBar) {
      this.budgetGaugeBar.style.width = `${summary.budgetUsagePercent}%`;
      this.budgetGaugeBar.className = `h-full rounded-full transition-all duration-300 ${
        summary.budgetStatus === 'danger' ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-sm shadow-rose-500/50' : summary.budgetStatus === 'warning' ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm shadow-amber-500/50' : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 shadow-sm shadow-cyan-500/50'
      }`;
    }

    if (this.budgetBreakdownContainer) {
      this.budgetBreakdownContainer.innerHTML = '';
      const spend = summary.categorySpend || {};
      const catKeys = Object.keys(spend);

      if (catKeys.length === 0) {
        this.budgetBreakdownContainer.innerHTML = `
          <div class="text-center py-4 text-xs text-slate-400 font-bold">
            Keranjang masih kosong. Belum ada pengeluaran belanja.
          </div>
        `;
      } else {
        catKeys.forEach(catId => {
          const catObj = CATEGORIES.find(c => c.id === catId) || { name: catId, color: 'bg-violet-950/80 text-violet-300' };
          const amount = spend[catId];
          const pct = summary.totalSpent > 0 ? Math.round((amount / summary.totalSpent) * 100) : 0;

          const row = document.createElement('div');
          row.className = 'space-y-1 text-xs';
          row.innerHTML = `
            <div class="flex items-center justify-between">
              <span class="text-slate-200 font-bold">${catObj.name}</span>
              <span class="font-mono-num font-black text-cyan-300">${formatRupiah(amount)} (${pct}%)</span>
            </div>
            <div class="w-full bg-slate-950/90 rounded-full h-2 overflow-hidden border border-violet-500/20">
              <div class="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-full" style="width: ${pct}%"></div>
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
