// Pre-seeded Demo Accounts and Data Isolation Helpers for Dvh Grocery

export const DEMO_USERS = [
  {
    id: "user_dvh_001",
    name: "Ahmad Rizky Pratama",
    email: "ahmad.rizky@gmail.com",
    phone: "081234567890",
    password: "Password123!",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    addresses: [
      {
        id: "addr_1",
        label: "Rumah Utama",
        recipient: "Ahmad Rizky",
        phone: "081234567890",
        address: "Jl. Senopati No. 42, RT 05 / RW 02, Kebayoran Baru, Jakarta Selatan",
        notes: "Pagar hitam tinggi, bel ada di samping pintu kayu",
        isDefault: true
      },
      {
        id: "addr_2",
        label: "Kantor SCBD",
        recipient: "Ahmad Rizky (Dvh Tech)",
        phone: "081234567890",
        address: "Equity Tower Lt. 28, SCBD Jl. Jend. Sudirman Kav 52-53, Jakarta Selatan",
        notes: "Titip ke satpam lobby barat",
        isDefault: false
      }
    ],
    initialCart: [
      {
        id: "PROD-0001",
        name: "Bayam Hijau Organik",
        price: 8500,
        original_price: 10500,
        unit: "pack / 250 gram",
        image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80",
        stock: 27,
        expiry_days: 4,
        quantity: 2
      },
      {
        id: "PROD-0004",
        name: "Apel Fuji RRC Manis",
        price: 38000,
        original_price: 45000,
        unit: "1 kg (4-5 pcs)",
        image_url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80",
        stock: 45,
        expiry_days: 14,
        quantity: 1
      },
      {
        id: "PROD-0226",
        name: "Ultra Milk Susu UHT Full Cream",
        price: 19500,
        original_price: 23000,
        unit: "karton / 1000 ml",
        image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80",
        stock: 35,
        expiry_days: 45,
        quantity: 2
      }
    ],
    initialOrders: [
      {
        id: "DVH-ORD-20261020-0081",
        date: "2026-10-20 09:15",
        status: "Selesai",
        itemsCount: 3,
        total: 98500,
        paymentMethod: "GoPay",
        address: "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan",
        courier: "Dimas Anggara - Honda Vario B 3921 KDX",
        items: [
          {
            id: "PROD-0076",
            name: "Daging Sapi Sengkel Cut",
            unit: "500 gram",
            price: 68000,
            quantity: 1,
            image_url: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80",
            expiry_days: 3,
            purchasedAt: "2026-10-20T09:15:00.000Z",
            storageTip: "Simpan di freezer -18°C untuk ketahanan maksimal atau chiller 2-4°C jika dimasak hari ini."
          },
          {
            id: "PROD-0003",
            name: "Wortel Berastagi Super",
            unit: "500 gram",
            price: 12000,
            quantity: 1,
            image_url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80",
            expiry_days: 12,
            purchasedAt: "2026-10-20T09:15:00.000Z",
            storageTip: "Simpan dalam kantong kertas di laci sayur kulkas (crisper drawer)."
          },
          {
            id: "PROD-0376",
            name: "Beras Pandan Wangi Cianjur",
            unit: "karung / 5 kg",
            price: 79000,
            quantity: 1,
            image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
            expiry_days: 180,
            purchasedAt: "2026-10-20T09:15:00.000Z",
            storageTip: "Simpan di tempat kering dan sejuk dengan wadah kedap beras anti kutu."
          }
        ]
      }
    ]
  },
  {
    id: "user_dvh_002",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@gmail.com",
    phone: "085678901234",
    password: "Password123!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    addresses: [
      {
        id: "addr_3",
        label: "Apartemen",
        recipient: "Siti Nurhaliza",
        phone: "085678901234",
        address: "Apartemen Sudirman Park Tower B Lt. 15 Unit 08, Jakarta Pusat",
        notes: "Titip di resepsionis lobby tower B",
        isDefault: true
      }
    ],
    initialCart: [
      {
        id: "PROD-0151",
        name: "Fiesta Crispy Chicken Nugget",
        price: 46500,
        original_price: 55000,
        unit: "pack / 500 gram",
        image_url: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80",
        stock: 30,
        expiry_days: 60,
        quantity: 1
      },
      {
        id: "PROD-0451",
        name: "Fresh Caesar Salad Bowl & Dressing",
        price: 28500,
        original_price: 35000,
        unit: "bowl / 280 gram",
        image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80",
        stock: 18,
        expiry_days: 2,
        quantity: 1
      }
    ],
    initialOrders: [
      {
        id: "DVH-ORD-20261019-0042",
        date: "2026-10-19 18:20",
        status: "Selesai",
        itemsCount: 2,
        total: 58000,
        paymentMethod: "ShopeePay",
        address: "Apartemen Sudirman Park Tower B Lt. 15 Unit 08, Jakarta Pusat",
        courier: "Rian Hidayat - Yamaha NMAX B 5519 TQA",
        items: [
          {
            id: "PROD-0452",
            name: "Club Sandwich Smoked Beef Cheese",
            unit: "box (1 porsi)",
            price: 26500,
            quantity: 1,
            image_url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80",
            expiry_days: 2,
            purchasedAt: "2026-10-19T18:20:00.000Z",
            storageTip: "Konsumsi langsung atau hangatkan di oven 150°C selama 3 menit."
          },
          {
            id: "PROD-0228",
            name: "Kopi Kenangan Cold Brew Latte",
            unit: "botol / 220 ml",
            price: 12000,
            quantity: 2,
            image_url: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80",
            expiry_days: 30,
            purchasedAt: "2026-10-19T18:20:00.000Z",
            storageTip: "Simpan dingin di lemari es (chiller) agar rasa tetap optimal."
          }
        ]
      }
    ]
  }
];

export const VOUCHERS = [
  {
    code: "DVHCEPAT",
    title: "Diskon Kilat Ongkir Rp 10.000",
    discount: 10000,
    type: "fixed_shipping",
    minSpend: 40000,
    description: "Potongan ongkos kirim Rp 10.000 untuk pengiriman cepat 15 menit."
  },
  {
    code: "SEGARHEMAT",
    title: "Hemat Belanja Segar 20%",
    discount: 0.20,
    maxDiscount: 25000,
    type: "percentage",
    minSpend: 60000,
    description: "Diskon 20% (maksimal Rp 25.000) untuk seluruh produk segar."
  },
  {
    code: "DVHNEW15",
    title: "Voucher Pengguna Baru Rp 15.000",
    discount: 15000,
    type: "fixed_total",
    minSpend: 50000,
    description: "Spesial potongan langsung Rp 15.000 untuk belanja pertama Anda."
  }
];
