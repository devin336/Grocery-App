import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 7 Required Categories
const categories = [
  {
    id: "cat-1",
    name: "Sayur & Buah Segar",
    slug: "sayur-buah",
    icon: "Carrot",
    color: "#10b981",
    bgLight: "#ecfdf5",
    items: [
      { base: "Bayam Hijau Organik", unit: "pack / 250 gram", price: 8500, orig: 10500, exp: 4, desc: "Bayam hijau segar organik dipetik dari kebun hidroponik Ciwidey.", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80" },
      { base: "Kangkung Lombok Segar", unit: "ikat / 300 gram", price: 6500, orig: 8000, exp: 3, desc: "Kangkung renyah berdaun lebar, bebas pestisida kimia.", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80" },
      { base: "Wortel Berastagi Super", unit: "500 gram", price: 12000, orig: 15000, exp: 12, desc: "Wortel manis segar kaya vitamin A langsung dari Berastagi.", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80" },
      { base: "Apel Fuji RRC Manis", unit: "1 kg (4-5 pcs)", price: 38000, orig: 45000, exp: 14, desc: "Apel Fuji renyah, berair dan manis alami.", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80" },
      { base: "Alpukat Mentega Super", unit: "1 kg (3-4 pcs)", price: 32000, orig: 39000, exp: 6, desc: "Alpukat mentega legit tanpa serat tebal, cepat matang sempurna.", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80" },
      { base: "Pisang Cavendish Sunpride", unit: "sisir (1.2 kg)", price: 27500, orig: 33000, exp: 6, desc: "Pisang cavendish kulit mulus matang pohon, kaya kalium.", img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80" },
      { base: "Jeruk Medan Manis", unit: "1 kg", price: 24000, orig: 29000, exp: 10, desc: "Jeruk medan segar banyak sari buah, rasa asam manis menyegarkan.", img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop&q=80" },
      { base: "Brokoli Hijau Segar", unit: "pack / 400 gram", price: 16500, orig: 21000, exp: 5, desc: "Kuntum brokoli hijau padat kaya antioksidan dan serat.", img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop&q=80" },
      { base: "Tomat Cherry Manis", unit: "pack / 250 gram", price: 14000, orig: 18000, exp: 7, desc: "Tomat cherry merah ranum, cocok untuk salad dan garnish.", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80" },
      { base: "Selada Romaine Crispy", unit: "pack / 200 gram", price: 9500, orig: 12000, exp: 4, desc: "Selada romaine hidroponik daun renyah untuk caesar salad.", img: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=500&auto=format&fit=crop&q=80" },
      { base: "Semangka Merah Non Biji", unit: "1 potong (1.5 kg)", price: 21000, orig: 26000, exp: 5, desc: "Semangka merah tanpa biji manis segar, kadar air tinggi.", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80" },
      { base: "Melon Honeydew Manis", unit: "1 butir (1.8 kg)", price: 35000, orig: 42000, exp: 8, desc: "Melon hijau berdaging lembut wangi dan manis sejuk.", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80" },
      { base: "Buncis Baby Kenya", unit: "pack / 250 gram", price: 11500, orig: 14000, exp: 6, desc: "Buncis muda renyah manis dan tidak berserat kasar.", img: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=500&auto=format&fit=crop&q=80" },
      { base: "Pakcoy Mini Hidroponik", unit: "pack / 300 gram", price: 8000, orig: 10000, exp: 5, desc: "Pakcoy segar batang hijau renyah nikmat untuk tumisan.", img: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&auto=format&fit=crop&q=80" },
      { base: "Mangga Harum Manis", unit: "1 kg (2-3 pcs)", price: 34000, orig: 40000, exp: 7, desc: "Mangga arumanis matang pohon aroma wangi manis legit.", img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Organik Pilihan", "Grade A Super", "Hidroponik Segar", "Premium Quality", "Petani Lokal"],
    units: ["pack / 250g", "pack / 500g", "1 kg", "ikat besar", "box 500g"]
  },
  {
    id: "cat-2",
    name: "Daging & Seafood",
    slug: "daging-seafood",
    icon: "Fish",
    color: "#ef4444",
    bgLight: "#fef2f2",
    items: [
      { base: "Daging Sapi Sengkel Cut", unit: "500 gram", price: 68000, orig: 80000, exp: 3, desc: "Potongan daging sapi sengkel empuk berotot lembut, cocok untuk soto & semur.", img: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&auto=format&fit=crop&q=80" },
      { base: "Ayam Fillet Dada Tanpa Kulit", unit: "500 gram", price: 36000, orig: 43000, exp: 3, desc: "Dada ayam fillet bersih tanpa lemak dan kulit, tinggi protein.", img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=80" },
      { base: "Udang Vaname Kupas Segar", unit: "pack / 300 gram", price: 42000, orig: 50000, exp: 2, desc: "Udang vaname segar kupas kulit siap masak, manis dan kenyal.", img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500&auto=format&fit=crop&q=80" },
      { base: "Ikan Salmon Fillet Norwegia", unit: "pack / 200 gram", price: 69000, orig: 85000, exp: 2, desc: "Salmon fillet segar sashimi grade tinggi omega-3 langsung dari Norwegia.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=80" },
      { base: "Daging Sapi Giling Australia", unit: "500 gram", price: 62000, orig: 72000, exp: 3, desc: "Daging cincang sapi Australia perbandingan 80/20 daging dan lemak gurih.", img: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&auto=format&fit=crop&q=80" },
      { base: "Ikan Kembung Banjar Segar", unit: "500 gram (4-5 ekor)", price: 26000, orig: 32000, exp: 2, desc: "Ikan kembung segar dari nelayan harian, kaya gizi.", img: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=500&auto=format&fit=crop&q=80" },
      { base: "Cumi Ring Bersih Calamari", unit: "pack / 350 gram", price: 44000, orig: 52000, exp: 2, desc: "Cumi-cumi segar dipotong cincin rapi bebas tinta dan bau amis.", img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=80" },
      { base: "Daging Rendang Sapi Paha", unit: "500 gram", price: 74000, orig: 88000, exp: 3, desc: "Daging paha sapi minim lemak tekstur serat padat khusus rendang empuk.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80" },
      { base: "Sayap Ayam Chicken Wings", unit: "500 gram", price: 29000, orig: 35000, exp: 3, desc: "Sayap ayam segar potongan 2 bagian pas untuk olahan BBQ / goreng krispi.", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&auto=format&fit=crop&q=80" },
      { base: "Ikan Kakap Merah Fillet", unit: "400 gram", price: 54000, orig: 65000, exp: 2, desc: "Fillet kakap merah laut dalam daging putih gurih dan lembut.", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Segar Harian", "Premium Cut", "Hygiene Pack", "Halal Certified", "Super Lembut"],
    units: ["500 gram", "1 kg", "pack 250g", "pack 350g", "tray 400g"]
  },
  {
    id: "cat-3",
    name: "Makanan Olahan & Frozen Food",
    slug: "frozen-food",
    icon: "Snowflake",
    color: "#0284c7",
    bgLight: "#f0f9ff",
    items: [
      { base: "Fiesta Crispy Chicken Nugget", unit: "pack / 500 gram", price: 46500, orig: 55000, exp: 60, desc: "Nugget ayam renyah berbahan daging dada ayam pilihan favorit keluarga.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80" },
      { base: "Kanzler Sosis Sapi Frankfurter", unit: "pack / 360 gram", price: 49000, orig: 58000, exp: 45, desc: "Sosis sapi premium ala Jerman dengan kulit kolagen renyah saat digigit.", img: "https://images.unsplash.com/photo-1585325701165-351af916e581?w=500&auto=format&fit=crop&q=80" },
      { base: "Bakso Sapi Urat Super", unit: "pack (25 butir)", price: 34000, orig: 40000, exp: 30, desc: "Bakso sapi berurat gurih kenyal tanpa bahan pengawet berbahaya.", img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&auto=format&fit=crop&q=80" },
      { base: "Dimsum Siomay Ayam Udang", unit: "box (10 pcs + Saus)", price: 33000, orig: 39000, exp: 30, desc: "Siomay dimsum ayam dan udang lengkap dengan saus sambal Bangkok legit.", img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&auto=format&fit=crop&q=80" },
      { base: "French Fries Shoestring", unit: "pack / 1 kg", price: 38000, orig: 45000, exp: 90, desc: "Kentang goreng potongan shoestring renyah keemasan ala resto cepat saji.", img: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80" },
      { base: "Kanzler Crispy Chicken Nugget", unit: "pack / 450 gram", price: 48000, orig: 56000, exp: 60, desc: "Nugget ayam ekstra renyah berbalut bubble crumb renyah tahan lama.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80" },
      { base: "Otak-Otak Ikan Tenggiri", unit: "pack / 500 gram", price: 28000, orig: 34000, exp: 30, desc: "Otak-otak ikan tenggiri asli kenyal gurih harum daun pisang.", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80" },
      { base: "Gyoza Ayam Sayur Frozen", unit: "pack (12 pcs)", price: 35000, orig: 42000, exp: 45, desc: "Gyoza isi daging ayam cincang dan kubis segar dengan kulit tipis lembut.", img: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Family Pack", "Ekstra Krispi", "Rasa Gurih", "Premium Quality", "Siap Goreng"],
    units: ["pack 500g", "pack 250g", "box 10 pcs", "pack 1 kg", "pack 360g"]
  },
  {
    id: "cat-4",
    name: "Minuman & Susu",
    slug: "minuman-susu",
    icon: "Coffee",
    color: "#8b5cf6",
    bgLight: "#f5f3ff",
    items: [
      { base: "Ultra Milk Susu UHT Full Cream", unit: "karton / 1000 ml", price: 19500, orig: 23000, exp: 45, desc: "Susu sapi segar alami dengan kalsium dan fosfor tinggi untuk keluarga.", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80" },
      { base: "Jus Jeruk Segar Floridina", unit: "botol / 350 ml", price: 4500, orig: 6000, exp: 60, desc: "Minuman jus jeruk dengan bulir sari buah asli yang menyegarkan dahaga.", img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=80" },
      { base: "Kopi Kenangan Cold Brew Latte", unit: "botol / 220 ml", price: 12000, orig: 15000, exp: 30, desc: "Kopi susu gula aren siap minum paduan kopi arabika dan susu gurih.", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80" },
      { base: "Le Minerale Air Galon Mini", unit: "galon / 5 Liter", price: 16000, orig: 19000, exp: 180, desc: "Air mineral pegunungan alami kaya mineral esensial manis alami.", img: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80" },
      { base: "Greenfields Fresh Milk Low Fat", unit: "botol / 1000 ml", price: 34000, orig: 39000, exp: 12, desc: "Susu pasteurisasi rendah lemak langsung dari peternakan Greenfields.", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80" },
      { base: "Teh Botol Sosro Kotak", unit: "pack / 250 ml (isi 4)", price: 14000, orig: 17000, exp: 90, desc: "Teh melati asli Indonesia dengan rasa khas melegakan dahaga.", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=80" },
      { base: "Yakult Minuman Fermentasi", unit: "pack (isi 5 botol)", price: 11500, orig: 13500, exp: 20, desc: "Minuman probiotik l. casei shirota strain baik untuk kesehatan usus.", img: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&fit=crop&q=80" },
      { base: "Coca-Cola Zero Sugar Can", unit: "kaleng / 330 ml", price: 8500, orig: 10000, exp: 120, desc: "Minuman berkarbonasi rasa kola legendaris tanpa kalori dan gula.", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Dingin Segar", "Less Sugar", "Original Flavor", "Extra Pack", "Special Brew"],
    units: ["botol 250ml", "botol 1L", "karton 1000ml", "kaleng 330ml", "pack isi 4"]
  },
  {
    id: "cat-5",
    name: "Camilan & Makanan Ringan",
    slug: "camilan-snack",
    icon: "Cookie",
    color: "#f59e0b",
    bgLight: "#fffbeb",
    items: [
      { base: "Keripik Singkong Kusuka Balado", unit: "pack / 180 gram", price: 15500, orig: 18500, exp: 120, desc: "Keripik singkong renyah dengan taburan bumbu balado pedas manis gurih.", img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80" },
      { base: "Oreo Biskuit Sandwich Vanilla", unit: "roll / 133 gram", price: 9500, orig: 12000, exp: 150, desc: "Biskuit cokelat renyah dengan krim vanila lezat di tengahnya.", img: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&auto=format&fit=crop&q=80" },
      { base: "SilverQueen Chocolate Almond", unit: "bar / 58 gram", price: 16500, orig: 20000, exp: 180, desc: "Cokelat susu lembut premium dipadu kacang almond renyah utuh.", img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&auto=format&fit=crop&q=80" },
      { base: "Kacang Kulit Garuda Garing", unit: "pack / 375 gram", price: 23500, orig: 28000, exp: 150, desc: "Kacang tanah sangrai renyah gurih cocok untuk teman bersantai.", img: "https://images.unsplash.com/photo-1536591375315-0b0373e2182c?w=500&auto=format&fit=crop&q=80" },
      { base: "Pringles Potato Crisps Original", unit: "can / 107 gram", price: 19000, orig: 23000, exp: 180, desc: "Keripik kentang renyah bumbu gurih bentuk lengkung ikonik.", img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80" },
      { base: "Chitato Sapi Panggang Beef", unit: "pack / 68 gram", price: 11000, orig: 13500, exp: 120, desc: "Keripik kentang bergelombang dengan aroma daging sapi panggang mantap.", img: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=80" },
      { base: "Tango Wafer Cokelat Renyah", unit: "pouch / 115 gram", price: 8500, orig: 10500, exp: 120, desc: "Wafer berlapis krim cokelat tebal renyah setiap gigitan.", img: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Pouch Hemat", "Rasa Gurih Pedas", "Snack Jumbo", "Edisi Spesial", "Crispy Max"],
    units: ["pack 150g", "can 110g", "roll 130g", "pack 200g", "bar 60g"]
  },
  {
    id: "cat-6",
    name: "Bumbu Dapur & Bahan Pokok",
    slug: "bahan-pokok",
    icon: "Utensils",
    color: "#ea580c",
    bgLight: "#fff7ed",
    items: [
      { base: "Beras Pandan Wangi Cianjur", unit: "karung / 5 kg", price: 79000, orig: 88000, exp: 180, desc: "Beras pulen alami harum wangi daun pandan tanpa pemutih kimia.", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80" },
      { base: "Minyak Goreng Filma Refill", unit: "pouch / 2 Liter", price: 37500, orig: 42000, exp: 180, desc: "Minyak kelapa sawit jernih ganda penyaringan kaya vitamin D & E.", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80" },
      { base: "Gulaku Gula Pasir Murni Putih", unit: "pack / 1 kg", price: 18500, orig: 21000, exp: 240, desc: "Gula tebu murni butiran putih higienis cepat larut untuk masakan.", img: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&auto=format&fit=crop&q=80" },
      { base: "Kecap Manis Bango Kedelai Hitam", unit: "refill / 550 ml", price: 23500, orig: 27000, exp: 180, desc: "Kecap manis kental gurih dibuat dari kedelai hitam Mallika berkualitas.", img: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=500&auto=format&fit=crop&q=80" },
      { base: "Bawang Merah Brebes Super", unit: "pack / 500 gram", price: 22000, orig: 27000, exp: 20, desc: "Bawang merah Brebes wangi sedap, kering dan bersih tanpa tanah.", img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80" },
      { base: "Bawang Putih Kating Kupas", unit: "pack / 250 gram", price: 18000, orig: 22000, exp: 20, desc: "Bawang putih kating harum kuat, sudah dikupas bersih siap uleg.", img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500&auto=format&fit=crop&q=80" },
      { base: "Cabai Rawit Merah Domba", unit: "pack / 200 gram", price: 16000, orig: 20000, exp: 10, desc: "Cabai rawit merah pedas nendang, dipetik dalam kondisi segar.", img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80" },
      { base: "Telur Ayam Negeri Fresh Omega", unit: "tray mika (10 butir)", price: 26000, orig: 30000, exp: 21, desc: "Telur ayam segar kaya nutrisi omega-3 cangkang tebal bersih.", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Pilihan Dapur", "Kualitas Resto", "Pouch Hemat", "Organik Halal", "Ekstra Wangi"],
    units: ["pack 500g", "karung 5kg", "pouch 2L", "pack 1kg", "botol 300ml"]
  },
  {
    id: "cat-7",
    name: "Makanan Siap Saji / Ready-to-Eat",
    slug: "ready-to-eat",
    icon: "Sandwich",
    color: "#059669",
    bgLight: "#ecfdf5",
    items: [
      { base: "Sari Roti Tawar Gandum Double Soft", unit: "pack / 350 gram", price: 19000, orig: 22000, exp: 5, desc: "Roti tawar gandum kaya serat tekstur super lembut dan bergizi.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80" },
      { base: "Club Sandwich Smoked Beef Cheese", unit: "box (1 porsi)", price: 26500, orig: 32000, exp: 2, desc: "Sandwich isi daging sapi asap, keju lumer, telur dan sayuran segar.", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80" },
      { base: "Bento Box Chicken Teriyaki Rice", unit: "porsi hangat (400g)", price: 34000, orig: 40000, exp: 1, desc: "Nasi pulen hangat dengan ayam bumbu teriyaki manis gurih dan salad wortel.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80" },
      { base: "Fresh Caesar Salad Bowl & Dressing", unit: "bowl / 280 gram", price: 28500, orig: 35000, exp: 2, desc: "Selada segar, crouton renyah, keju parmesan parut dan dressing wijen gurih.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80" },
      { base: "Croissant Mentega Perancis Butter", unit: "pcs (isi 2)", price: 24000, orig: 29000, exp: 3, desc: "Pastry croissant wangi mentega asli dengan lapisan berlapis garing renyah.", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80" },
      { base: "Onigiri Nasi Tuna Mayo Segar", unit: "pcs (isi 1)", price: 12500, orig: 15000, exp: 1, desc: "Nasi kepal khas Jepang berbalut rumput laut nori garing isi tuna gurih creamy.", img: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=500&auto=format&fit=crop&q=80" },
      { base: "Spaghetti Bolognese Daging Sapi", unit: "box hangat (350g)", price: 32000, orig: 38000, exp: 2, desc: "Pasta al dente disiram saus bolognese daging sapi cincang keju tabur.", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80" }
    ],
    modifiers: ["Freshly Made", "Chef Special", "Hangat Siap Santap", "High Protein", "Porsi Kenyang"],
    units: ["box 1 porsi", "pack 2 pcs", "bowl 300g", "pack 350g", "box hangat"]
  }
];

// Generate at least 525 products (75 per category)
const allProducts = [];
let globalIndex = 1;

categories.forEach((cat) => {
  const targetPerCategory = 75; // 75 * 7 = 525 products
  let countInCat = 0;

  // First add base items
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
      stock: 20 + ((globalIndex * 7) % 65),
      unit: item.unit,
      expiry_days: item.exp,
      rating: +(4.5 + ((globalIndex % 5) * 0.1)).toFixed(1),
      reviews_count: 40 + ((globalIndex * 17) % 450),
      is_flash_sale: isFlash,
      discount_percent: discount,
      badge: isFlash ? "⚡ Flash Sale" : (globalIndex % 4 === 0 ? "🔥 Terlaris" : (cat.id === "cat-1" ? "🌱 Segar" : null))
    });
    globalIndex++;
    countInCat++;
  });

  // Then systematically generate combinations to reach targetPerCategory
  let modIdx = 0;
  let itemIdx = 0;
  while (countInCat < targetPerCategory) {
    const baseItem = cat.items[itemIdx % cat.items.length];
    const modifier = cat.modifiers[modIdx % cat.modifiers.length];
    const altUnit = cat.units[countInCat % cat.units.length];
    const id = `PROD-${String(globalIndex).padStart(4, '0')}`;
    
    // Slight price variation
    const priceMultiplier = 0.85 + ((countInCat % 7) * 0.05);
    const calculatedPrice = Math.round((baseItem.price * priceMultiplier) / 500) * 500;
    const calculatedOrig = Math.round((calculatedPrice * 1.22) / 500) * 500;
    const isFlash = globalIndex % 4 === 0;
    const discount = Math.round(((calculatedOrig - calculatedPrice) / calculatedOrig) * 100);

    const name = `${baseItem.base.split(' ')[0]} ${baseItem.base.split(' ')[1] || ''} ${modifier} (${altUnit.replace('pack / ', '')})`.trim();

    allProducts.push({
      id,
      name,
      category: cat.name,
      category_id: cat.id,
      price: calculatedPrice,
      original_price: calculatedOrig,
      image_url: baseItem.img,
      description: `${baseItem.desc} Varian ${modifier} dengan kualitas standar tinggi Dvh Grocery.`,
      stock: 15 + ((globalIndex * 11) % 60),
      unit: altUnit,
      expiry_days: Math.max(2, baseItem.exp + ((countInCat % 3) - 1)),
      rating: +(4.6 + ((globalIndex % 4) * 0.1)).toFixed(1),
      reviews_count: 25 + ((globalIndex * 13) % 300),
      is_flash_sale: isFlash,
      discount_percent: discount,
      badge: isFlash ? "⚡ Flash Sale" : (countInCat % 6 === 0 ? "🌟 Favorit" : null)
    });

    globalIndex++;
    countInCat++;
    itemIdx++;
    modIdx++;
  }
});

// Write to products.json and products.js
const outDir = path.join(__dirname);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'products.json'), JSON.stringify(allProducts, null, 2));

const jsContent = `// Mock Data 500+ Fresh Grocery Products for Dvh Grocery Quick-Commerce
export const categories = ${JSON.stringify(categories.map(c => ({ id: c.id, name: c.name, slug: c.slug, icon: c.icon, color: c.color, bgLight: c.bgLight })), null, 2)};

export const products = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'products.js'), jsContent);

console.log(`Successfully generated ${allProducts.length} products across ${categories.length} categories!`);
