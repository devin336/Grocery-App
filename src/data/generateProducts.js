import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pure, accurately separated Categories requested by user
const categories = [
  {
    id: "cat-sayur",
    name: "Sayur Mayur",
    slug: "sayur-mayur",
    icon: "Carrot",
    color: "#059669",
    bgLight: "#ecfdf5",
    gradient: "from-emerald-500 to-green-600",
    badgeText: "100% Petani Hidroponik",
    emoji: "🥬",
    items: [
      { base: "Bayam Hijau Hidroponik", unit: "ikat / 250 gram", price: 6500, orig: 8500, exp: 3, desc: "Bayam hijau segar organik tanpa pestisida, dipetik pagi ini dari kebun hidroponik.", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80" },
      { base: "Kangkung Lombok Daun Lebar", unit: "ikat / 300 gram", price: 5500, orig: 7000, exp: 3, desc: "Kangkung air segar berbatang renyah dan berdaun hijau lebar, cocok untuk tumis terasi.", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80" },
      { base: "Brokoli Hijau Organik Super", unit: "pack / 400 gram", price: 16500, orig: 21000, exp: 5, desc: "Kuntum brokoli hijau padat tanpa ulat, kaya antioksidan dan serat tinggi.", img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop&q=80" },
      { base: "Wortel Berastagi Manis Super", unit: "500 gram", price: 11000, orig: 14000, exp: 12, desc: "Wortel Berastagi renyah manis kaya vitamin A langsung dari perkebunan dataran tinggi.", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80" },
      { base: "Pakcoy Mini Hidroponik Segar", unit: "pack / 300 gram", price: 7500, orig: 9500, exp: 4, desc: "Pakcoy batang putih tebal renyah, siap masak tanpa perlu dibersihkan lama.", img: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&auto=format&fit=crop&q=80" },
      { base: "Selada Romaine Caesar Crispy", unit: "pack / 200 gram", price: 9000, orig: 12000, exp: 4, desc: "Selada romaine hidroponik daun renyah manis untuk salad atau burger.", img: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=500&auto=format&fit=crop&q=80" },
      { base: "Buncis Baby Manis Renyah", unit: "pack / 250 gram", price: 10500, orig: 13500, exp: 6, desc: "Buncis muda baby tanpa serat keras, manis dan renyah saat ditumis.", img: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=500&auto=format&fit=crop&q=80" },
      { base: "Kubis / Kol Bulat Putih Segar", unit: "1 butir (800g)", price: 8500, orig: 11000, exp: 14, desc: "Kubis bulat putih padat berdaun renyah manis untuk lalapan dan sup.", img: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=500&auto=format&fit=crop&q=80" },
      { base: "Terong Ungu Panjang Segar", unit: "500 gram (2-3 pcs)", price: 9000, orig: 11500, exp: 7, desc: "Terong ungu kulit mulus daging empuk manis cocok untuk balado sambal.", img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&auto=format&fit=crop&q=80" },
      { base: "Kembang Kol Putih Segar", unit: "1 bonggol (500g)", price: 15000, orig: 19000, exp: 6, desc: "Kembang kol putih bersih bebas kotoran, nikmat untuk capcay kuah kental.", img: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=500&auto=format&fit=crop&q=80" },
      { base: "Daun Bawang & Seledri Segar", unit: "ikat / 150 gram", price: 5000, orig: 6500, exp: 5, desc: "Paduan daun bawang wangi dan seledri aroma sedap penyegar kaldu sup.", img: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500&auto=format&fit=crop&q=80" },
      { base: "Jagung Manis Madu Kupas", unit: "pack (isi 2 tongkol)", price: 12000, orig: 15000, exp: 5, desc: "Jagung manis pipil berair sari manis tinggi langsung dari petani lokal.", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Grade A Super", "Hidroponik Panen Pagi", "Organik Bebas Pestisida", "Pilihan Segar", "Premium Ciwidey"],
    units: ["ikat sedang", "pack / 250g", "pack / 500g", "tray higienis", "box 400g"]
  },
  {
    id: "cat-buah",
    name: "Buah-Buahan Segar",
    slug: "buah-buahan",
    icon: "Apple",
    color: "#ea580c",
    bgLight: "#fff7ed",
    gradient: "from-orange-500 to-amber-600",
    badgeText: "Manis Matang Pohon",
    emoji: "🍎",
    items: [
      { base: "Apel Fuji RRC Manis Berair", unit: "1 kg (4-5 pcs)", price: 38000, orig: 45000, exp: 14, desc: "Apel fuji renyah garing dengan kandungan air manis berlimpah.", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80" },
      { base: "Pisang Cavendish Sunpride", unit: "sisir (1.2 kg)", price: 27500, orig: 33000, exp: 6, desc: "Pisang cavendish kulit kuning mulus daging lembut manis alami berkalium tinggi.", img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80" },
      { base: "Jeruk Medan Manis Segar", unit: "1 kg (6-8 pcs)", price: 24000, orig: 29000, exp: 10, desc: "Jeruk medan banyak sari buah manis asam seimbang kaya vitamin C alami.", img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop&q=80" },
      { base: "Alpukat Mentega Legit Super", unit: "1 kg (3-4 pcs)", price: 34000, orig: 42000, exp: 6, desc: "Alpukat mentega daging tebal legit bebas serat kasar, cepat matang sempurna.", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80" },
      { base: "Semangka Merah Non Biji Potong", unit: "1 potong (1.5 kg)", price: 21000, orig: 26000, exp: 5, desc: "Semangka merah tanpa biji manis segar dingin, kadar air sangat tinggi.", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80" },
      { base: "Melon Honeydew Manis Harum", unit: "1 butir (1.8 kg)", price: 35000, orig: 42000, exp: 8, desc: "Melon berdaging hijau wangi manis lembut mendinginkan tenggorokan.", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80" },
      { base: "Mangga Harum Manis Probolinggo", unit: "1 kg (2-3 pcs)", price: 32000, orig: 39000, exp: 7, desc: "Mangga arumanis aroma wangi manis legit harum khas Probolinggo.", img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80" },
      { base: "Buah Naga Merah Manis", unit: "1 kg (2 pcs)", price: 25000, orig: 31000, exp: 8, desc: "Buah naga merah segar kaya antioksidan dan serat manis alami.", img: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=500&auto=format&fit=crop&q=80" },
      { base: "Anggur Red Globe Australia", unit: "pack / 500 gram", price: 39000, orig: 48000, exp: 10, desc: "Anggur merah renyah manis berdaging padat rasa manis istimewa.", img: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&auto=format&fit=crop&q=80" },
      { base: "Pepaya California Manis Matang", unit: "1 butir (1.2 kg)", price: 16000, orig: 20000, exp: 5, desc: "Pepaya calina manis daging jingga tebal baik untuk pencernaan sehat.", img: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Pilihan Super", "Matang Pohon", "Segar Alami", "Grade Super", "Keluarga Manis"],
    units: ["1 kg", "pack 500g", "1 butir", "tray 600g", "box 1 kg"]
  },
  {
    id: "cat-minuman",
    name: "Minuman & Susu",
    slug: "minuman-susu",
    icon: "Coffee",
    color: "#0284c7",
    bgLight: "#f0f9ff",
    gradient: "from-sky-500 to-blue-600",
    badgeText: "Dingin Segar Siap Minum",
    emoji: "🥤",
    items: [
      { base: "Le Minerale Air Mineral Galon", unit: "galon / 5 Liter", price: 16500, orig: 19500, exp: 180, desc: "Air mineral pegunungan asli dengan mineral alami berasa manis segar.", img: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80" },
      { base: "Aqua Air Mineral Botol Dingin", unit: "pack / 600 ml (isi 6)", price: 21000, orig: 25000, exp: 180, desc: "Air minum murni dari sumber mata air pegunungan terpilih.", img: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&auto=format&fit=crop&q=80" },
      { base: "Coca-Cola Original Can Dingin", unit: "kaleng / 330 ml", price: 8500, orig: 10000, exp: 120, desc: "Minuman soda rasa kola legendaris menyegarkan dahaga seketika.", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80" },
      { base: "Sprite Lemon-Lime Can Dingin", unit: "kaleng / 330 ml", price: 8500, orig: 10000, exp: 120, desc: "Soda jernih dengan sensasi rasa lemon dan jeruk nipis melegakan.", img: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&auto=format&fit=crop&q=80" },
      { base: "Pocari Sweat Isotonik Dingin", unit: "botol / 500 ml", price: 8900, orig: 11000, exp: 90, desc: "Minuman pengganti ion tubuh cepat menyerap cairan saat aktivitas padat.", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80" },
      { base: "Ultra Milk UHT Full Cream", unit: "karton / 1000 ml", price: 19500, orig: 23000, exp: 60, desc: "Susu sapi segar alami kaya kalsium dan vitamin D untuk nutrisi harian.", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80" },
      { base: "Greenfields Fresh Milk Low Fat", unit: "botol / 1000 ml", price: 34000, orig: 39000, exp: 14, desc: "Susu pasteurisasi murni rendah lemak diproses higienis langsung dari peternakan.", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80" },
      { base: "Kopi Kenangan Mantan Cold Brew", unit: "botol / 220 ml", price: 12500, orig: 15500, exp: 30, desc: "Perpaduan kopi arabika pilihan dan gula aren asli susu gurih siap minum.", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80" },
      { base: "Teh Botol Sosro Melati Kotak", unit: "pack / 250 ml (isi 4)", price: 14500, orig: 17500, exp: 90, desc: "Teh melati asli Indonesia yang harum manis khas melegakan tenggorokan.", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=80" },
      { base: "Jus Jeruk Segar Floridina Bulir", unit: "botol / 350 ml (isi 2)", price: 7500, orig: 9500, exp: 60, desc: "Jus jeruk segar dengan bulir sari buah asli yang renyah di lidah.", img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=80" },
      { base: "Yakult Probiotik Fermentasi", unit: "pack (isi 5 botol)", price: 11500, orig: 13500, exp: 21, desc: "Minuman fermentasi bakteri baik L. casei Shirota strain untuk daya tahan tubuh.", img: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Dingin Segar", "Pouch Hemat", "Extra Dingin", "Less Sugar", "Original Siap Minum"],
    units: ["botol 330ml", "botol 500ml", "karton 1L", "kaleng 330ml", "pack isi 4"]
  },
  {
    id: "cat-daging",
    name: "Daging & Seafood",
    slug: "daging-seafood",
    icon: "Fish",
    color: "#dc2626",
    bgLight: "#fef2f2",
    gradient: "from-red-600 to-rose-700",
    badgeText: "100% Halal & Segar Harian",
    emoji: "🥩",
    items: [
      { base: "Daging Sapi Sengkel Cut", unit: "500 gram", price: 68000, orig: 80000, exp: 3, desc: "Potongan daging sapi sengkel empuk berotot lembut untuk soto & semur.", img: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80" },
      { base: "Ayam Fillet Dada Tanpa Kulit", unit: "500 gram", price: 36000, orig: 43000, exp: 3, desc: "Dada ayam fillet bersih tanpa lemak dan kulit, tinggi protein bebas hormon.", img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=80" },
      { base: "Udang Vaname Kupas Bersih Segar", unit: "pack / 300 gram", price: 42000, orig: 50000, exp: 2, desc: "Udang vaname segar kupas kulit siap masak, manis dan kenyal gurih.", img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500&auto=format&fit=crop&q=80" },
      { base: "Ikan Salmon Fillet Norwegia", unit: "pack / 200 gram", price: 69000, orig: 85000, exp: 2, desc: "Salmon fillet sashimi grade tinggi omega-3 langsung dari Norwegia.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=80" },
      { base: "Daging Sapi Giling Australia", unit: "500 gram", price: 62000, orig: 72000, exp: 3, desc: "Daging cincang sapi Australia perbandingan 80/20 daging dan lemak gurih.", img: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&auto=format&fit=crop&q=80" },
      { base: "Cumi Ring Bersih Calamari", unit: "pack / 350 gram", price: 44000, orig: 52000, exp: 2, desc: "Cumi-cumi segar dipotong cincin rapi bebas tinta dan bau amis.", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=80" },
      { base: "Sayap Ayam Chicken Wings", unit: "500 gram", price: 29000, orig: 35000, exp: 3, desc: "Sayap ayam segar potongan 2 bagian pas untuk olahan BBQ / goreng krispi.", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&auto=format&fit=crop&q=80" },
      { base: "Daging Rendang Sapi Paha", unit: "500 gram", price: 74000, orig: 88000, exp: 3, desc: "Daging paha sapi minim lemak tekstur serat padat khusus rendang empuk.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Segar Potong Pagi", "Premium Cut", "Hygiene Halal", "Super Lembut", "Grade Resto"],
    units: ["500 gram", "1 kg", "pack 250g", "pack 350g", "tray 400g"]
  },
  {
    id: "cat-frozen",
    name: "Makanan Olahan & Frozen Food",
    slug: "frozen-food",
    icon: "Snowflake",
    color: "#0891b2",
    bgLight: "#ecfeff",
    gradient: "from-cyan-600 to-teal-700",
    badgeText: "Praktis Siap Masak",
    emoji: "❄️",
    items: [
      { base: "Fiesta Crispy Chicken Nugget", unit: "pack / 500 gram", price: 46500, orig: 55000, exp: 60, desc: "Nugget ayam renyah berbahan daging dada ayam pilihan favorit keluarga.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80" },
      { base: "Kanzler Sosis Sapi Frankfurter", unit: "pack / 360 gram", price: 49000, orig: 58000, exp: 45, desc: "Sosis sapi premium ala Jerman dengan kulit kolagen renyah saat digigit.", img: "https://images.unsplash.com/photo-1585325701165-351af916e581?w=500&auto=format&fit=crop&q=80" },
      { base: "Bakso Sapi Urat Super Gurih", unit: "pack (25 butir)", price: 34000, orig: 40000, exp: 30, desc: "Bakso sapi berurat gurih kenyal tanpa bahan pengawet berbahaya.", img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&auto=format&fit=crop&q=80" },
      { base: "Dimsum Siomay Ayam Udang", unit: "box (10 pcs + Saus)", price: 33000, orig: 39000, exp: 30, desc: "Siomay dimsum ayam dan udang lengkap dengan saus sambal Bangkok legit.", img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&auto=format&fit=crop&q=80" },
      { base: "French Fries Shoestring Renyah", unit: "pack / 1 kg", price: 38000, orig: 45000, exp: 90, desc: "Kentang goreng potongan shoestring renyah keemasan ala resto cepat saji.", img: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80" },
      { base: "Otak-Otak Ikan Tenggiri Gurih", unit: "pack / 500 gram", price: 28000, orig: 34000, exp: 30, desc: "Otak-otak ikan tenggiri asli kenyal gurih harum daun pisang.", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Family Pack", "Ekstra Krispi", "Porsi Kenyang", "Kualitas Resto", "Gurih Renyah"],
    units: ["pack 500g", "pack 1 kg", "box 10 pcs", "pack 360g", "pack 250g"]
  },
  {
    id: "cat-snack",
    name: "Camilan & Makanan Ringan",
    slug: "camilan-snack",
    icon: "Cookie",
    color: "#d97706",
    bgLight: "#fffbeb",
    gradient: "from-amber-500 to-yellow-600",
    badgeText: "Teman Santai Nikmat",
    emoji: "🍪",
    items: [
      { base: "Keripik Singkong Kusuka Balado", unit: "pack / 180 gram", price: 15500, orig: 18500, exp: 120, desc: "Keripik singkong renyah dengan taburan bumbu balado pedas manis gurih.", img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80" },
      { base: "Oreo Biskuit Sandwich Vanilla", unit: "roll / 133 gram", price: 9500, orig: 12000, exp: 150, desc: "Biskuit cokelat renyah dengan krim vanila lezat di tengahnya.", img: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&auto=format&fit=crop&q=80" },
      { base: "SilverQueen Chocolate Almond Bar", unit: "bar / 58 gram", price: 16500, orig: 20000, exp: 180, desc: "Cokelat susu lembut premium dipadu kacang almond renyah utuh.", img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&auto=format&fit=crop&q=80" },
      { base: "Kacang Kulit Garuda Garing", unit: "pack / 375 gram", price: 23500, orig: 28000, exp: 150, desc: "Kacang tanah sangrai renyah gurih cocok untuk teman bersantai.", img: "https://images.unsplash.com/photo-1536591375315-0b0373e2182c?w=500&auto=format&fit=crop&q=80" },
      { base: "Pringles Potato Crisps Original", unit: "can / 107 gram", price: 19000, orig: 23000, exp: 180, desc: "Keripik kentang renyah bumbu gurih bentuk lengkung ikonik.", img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80" },
      { base: "Tango Wafer Cokelat Renyah", unit: "pouch / 115 gram", price: 8500, orig: 10500, exp: 120, desc: "Wafer berlapis krim cokelat tebal renyah setiap gigitan.", img: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Pouch Hemat", "Rasa Gurih Krispi", "Snack Jumbo", "Edisi Spesial", "Crispy Max"],
    units: ["pack 150g", "can 110g", "roll 130g", "pack 200g", "bar 60g"]
  },
  {
    id: "cat-pokok",
    name: "Bumbu & Bahan Pokok",
    slug: "bahan-pokok",
    icon: "Utensils",
    color: "#b45309",
    bgLight: "#fffbeb",
    gradient: "from-amber-600 to-orange-700",
    badgeText: "Dapur Rumah Hemat",
    emoji: "🍚",
    items: [
      { base: "Beras Pandan Wangi Cianjur", unit: "karung / 5 kg", price: 79000, orig: 88000, exp: 180, desc: "Beras pulen alami harum wangi daun pandan tanpa pemutih kimia.", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80" },
      { base: "Minyak Goreng Filma Pouch", unit: "pouch / 2 Liter", price: 37500, orig: 42000, exp: 180, desc: "Minyak kelapa sawit jernih ganda penyaringan kaya vitamin D & E.", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80" },
      { base: "Gulaku Gula Pasir Murni Putih", unit: "pack / 1 kg", price: 18500, orig: 21000, exp: 240, desc: "Gula tebu murni butiran putih higienis cepat larut untuk masakan.", img: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&auto=format&fit=crop&q=80" },
      { base: "Kecap Manis Bango Kedelai Hitam", unit: "refill / 550 ml", price: 23500, orig: 27000, exp: 180, desc: "Kecap manis kental gurih dibuat dari kedelai hitam Mallika berkualitas.", img: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=500&auto=format&fit=crop&q=80" },
      { base: "Bawang Merah Brebes Super Kering", unit: "pack / 500 gram", price: 22000, orig: 27000, exp: 20, desc: "Bawang merah Brebes wangi sedap, kering dan bersih tanpa tanah.", img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80" },
      { base: "Bawang Putih Kating Kupas Bersih", unit: "pack / 250 gram", price: 18000, orig: 22000, exp: 20, desc: "Bawang putih kating harum kuat, sudah dikupas bersih siap uleg.", img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500&auto=format&fit=crop&q=80" },
      { base: "Cabai Rawit Merah Domba Pedas", unit: "pack / 200 gram", price: 16000, orig: 20000, exp: 10, desc: "Cabai rawit merah pedas nendang, dipetik dalam kondisi segar.", img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80" },
      { base: "Telur Ayam Fresh Omega 10 Butir", unit: "tray mika (10 butir)", price: 26000, orig: 30000, exp: 21, desc: "Telur ayam segar kaya nutrisi omega-3 cangkang tebal bersih.", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Pilihan Dapur", "Kualitas Resto", "Pouch Hemat", "Organik Halal", "Ekstra Wangi"],
    units: ["pack 500g", "karung 5kg", "pouch 2L", "pack 1kg", "botol 300ml"]
  },
  {
    id: "cat-ready",
    name: "Makanan Siap Saji",
    slug: "siap-saji",
    icon: "Sandwich",
    color: "#047857",
    bgLight: "#ecfdf5",
    gradient: "from-emerald-600 to-teal-700",
    badgeText: "Hangat Siap Santap",
    emoji: "🍱",
    items: [
      { base: "Sari Roti Tawar Gandum Double Soft", unit: "pack / 350 gram", price: 19000, orig: 22000, exp: 5, desc: "Roti tawar gandum kaya serat tekstur super lembut dan bergizi.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80" },
      { base: "Club Sandwich Smoked Beef Cheese", unit: "box (1 porsi)", price: 26500, orig: 32000, exp: 2, desc: "Sandwich isi daging sapi asap, keju lumer, telur dan sayuran segar.", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80" },
      { base: "Bento Box Chicken Teriyaki Rice", unit: "porsi hangat (400g)", price: 34000, orig: 40000, exp: 1, desc: "Nasi pulen hangat dengan ayam bumbu teriyaki manis gurih dan salad wortel.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80" },
      { base: "Fresh Caesar Salad Bowl & Dressing", unit: "bowl / 280 gram", price: 28500, orig: 35000, exp: 2, desc: "Selada segar, crouton renyah, keju parmesan parut dan dressing wijen gurih.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80" },
      { base: "Croissant Mentega Perancis Butter", unit: "pcs (isi 2)", price: 24000, orig: 29000, exp: 3, desc: "Pastry croissant wangi mentega asli dengan lapisan berlapis garing renyah.", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80" },
      { base: "Onigiri Nasi Tuna Mayo Segar", unit: "pcs (isi 1)", price: 12500, orig: 15000, exp: 1, desc: "Nasi kepal khas Jepang berbalut rumput laut nori garing isi tuna gurih creamy.", img: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Freshly Made", "Chef Special", "Hangat Nikmat", "Porsi Kenyang", "Menu Favorit"],
    units: ["box 1 porsi", "pack 2 pcs", "bowl 300g", "pack 350g", "box hangat"]
  }
];

// Generate 520+ products distributed across pure categories
const allProducts = [];
let globalIndex = 1;

categories.forEach((cat) => {
  const targetPerCategory = Math.ceil(520 / categories.length); // ~65 per category = 520 total
  let countInCat = 0;

  // Base items first
  cat.items.forEach((item) => {
    const id = `PROD-${String(globalIndex).padStart(4, '0')}`;
    const isFlash = globalIndex % 5 === 0;
    const discount = Math.round(((item.orig - item.price) / item.orig) * 100);

    allProducts.push({
      id,
      name: item.base,
      category: cat.name,
      category_id: cat.id,
      price: item.price,
      original_price: item.orig,
      image_url: item.img,
      description: item.desc,
      stock: 25 + ((globalIndex * 7) % 60),
      unit: item.unit,
      expiry_days: item.exp,
      rating: +(4.6 + ((globalIndex % 4) * 0.1)).toFixed(1),
      reviews_count: 50 + ((globalIndex * 19) % 400),
      is_flash_sale: isFlash,
      discount_percent: discount,
      badge: isFlash ? "⚡ Flash Sale" : (globalIndex % 4 === 0 ? "🔥 Terlaris" : (cat.id === "cat-sayur" ? "🌱 Segar" : null))
    });
    globalIndex++;
    countInCat++;
  });

  // Systematically generate realistic variants
  let modIdx = 0;
  let itemIdx = 0;
  while (countInCat < targetPerCategory) {
    const baseItem = cat.items[itemIdx % cat.items.length];
    const modifier = cat.modifiers[modIdx % cat.modifiers.length];
    const altUnit = cat.units[countInCat % cat.units.length];
    const id = `PROD-${String(globalIndex).padStart(4, '0')}`;

    const priceMult = 0.88 + ((countInCat % 5) * 0.06);
    const calcPrice = Math.round((baseItem.price * priceMult) / 500) * 500;
    const calcOrig = Math.round((calcPrice * 1.25) / 500) * 500;
    const isFlash = globalIndex % 4 === 0;
    const discount = Math.round(((calcOrig - calcPrice) / calcOrig) * 100);

    const nameParts = baseItem.base.split(' ');
    const shortName = `${nameParts[0]} ${nameParts[1] || ''}`.trim();
    const fullName = `${shortName} ${modifier} (${altUnit.replace('pack / ', '')})`.trim();

    allProducts.push({
      id,
      name: fullName,
      category: cat.name,
      category_id: cat.id,
      price: calcPrice,
      original_price: calcOrig,
      image_url: baseItem.img,
      description: `${baseItem.desc} Varian ${modifier} dengan jaminan kesegaran Dvh Grocery.`,
      stock: 18 + ((globalIndex * 9) % 55),
      unit: altUnit,
      expiry_days: Math.max(2, baseItem.exp + ((countInCat % 3) - 1)),
      rating: +(4.6 + ((globalIndex % 4) * 0.1)).toFixed(1),
      reviews_count: 30 + ((globalIndex * 11) % 350),
      is_flash_sale: isFlash,
      discount_percent: discount,
      badge: isFlash ? "⚡ Flash Sale" : (countInCat % 5 === 0 ? "🌟 Pilihan" : null)
    });

    globalIndex++;
    countInCat++;
    itemIdx++;
    modIdx++;
  }
});

fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(allProducts, null, 2));

const jsContent = `// Mock Data 520+ Fresh Grocery Products for Dvh Grocery Quick-Commerce
export const categories = ${JSON.stringify(categories.map(c => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  icon: c.icon,
  color: c.color,
  bgLight: c.bgLight,
  gradient: c.gradient,
  badgeText: c.badgeText,
  emoji: c.emoji
})), null, 2)};

export const products = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'products.js'), jsContent);

console.log(`Successfully generated ${allProducts.length} products across ${categories.length} pure categories!`);
