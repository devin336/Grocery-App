# 🥬 Dvh Grocery (Smart Grocery & Quick Commerce Tracker)

A modern, high-performance quick-commerce web application designed for 15-minute ultra-fast grocery delivery, real-time perishable food freshness tracking, and strict isolated user data privacy.

---

## 🌟 Fitur Utama (Key Features)

### 1. 🛡️ Autentikasi Ketat & Isolasi Data Pengguna (Strict Data Privacy)
- **Mandatory Authentication Guard**: Seluruh katalog, keranjang belanja, checkout, dan riwayat pesanan terproteksi 100% dari akses tanpa login.
- **Form Registrasi & Login Lengkap**:
  - Nama Lengkap, Email Unik, Nomor Telepon, dan Password.
  - **Indikator Kekuatan Password Realtime**: Menilai kompleksitas password (panjang $\ge 8$, kombinasi simbol, angka, huruf kapital).
- **100% Data Isolation**:
  - Keranjang belanja, riwayat transaksi, dan pelacak bahan makanan disimpan menggunakan namespace terisolasi per User ID unik (`dvh_cart_${userId}`, `dvh_orders_${userId}`, dll.).
  - Pengguna B tidak dapat melihat keranjang atau riwayat milik Pengguna A.
  - **Quick Demo Switcher**: Tombol cepat untuk menguji akun *Ahmad Rizky Pratama* (User A) dan *Siti Nurhaliza* (User B).
  - **Hard Logout**: Membersihkan seluruh token sesi, cache, dan state memori secara total.

### 2. 🥦 Database 525+ Produk Segar & Lengkap
Menyediakan **525 produk unik** yang terbagi merata ke dalam 7 kategori (masing-masing 75 produk):
1. **Sayur & Buah Segar** (Bayam hijau hidroponik, kangkung, wortel berastagi, apel fuji, alpukat mentega)
2. **Daging & Seafood** (Daging sapi sengkel, fillet dada ayam, udang vaname, salmon norwegia)
3. **Makanan Olahan & Frozen Food** (Fiesta crispy nugget, sosis kanzler frankfurter, bakso urat, dimsum)
4. **Minuman & Susu** (Ultra Milk full cream 1L, Kopi Kenangan cold brew, Greenfields, jus jeruk)
5. **Camilan & Makanan Ringan** (Keripik kusuka balado, SilverQueen almond, Oreo sandwich, Pringles)
6. **Bumbu Dapur & Bahan Pokok** (Beras pandan wangi cianjur 5kg, minyak goreng 2L, Gulaku, bumbu instan)
7. **Makanan Siap Saji / Ready-to-Eat** (Sari Roti gandum soft, smoked beef sandwich, chicken teriyaki bento, caesar salad)

### 3. ⚡ Pengalaman UI/UX Quick-Commerce Responsif
- **Interactive Morphing Quantity Controller**: Tombol `+ Tambah` otomatis berubah menjadi pengatur kuantitas `[ - ] [ Qty ] [ + ]` dengan pembatas stok fisik.
- **Slide-over Cart Drawer**: Dilengkapi progress bar **Gratis Ongkir** (target Rp 100.000) dan kode voucher promo (`DVHCEPAT`, `SEGARHEMAT`, `DVHNEW15`).
- **Checkout & Pembayaran**: Pilihan alamat, catatan kurir, opsi pengiriman kilat 15 menit, dan metode pembayaran (GoPay, OVO, ShopeePay, DANA, Virtual Account BCA/Mandiri/BRI, serta COD) disertai selebrasi confetti.
- **Live 15-Minute Delivery Simulation Tracker**: Stepper animasi proses pengiriman (Pesanan Diterima $\rightarrow$ Dikemas di Dark Store $\rightarrow$ Kurir OTW $\rightarrow$ Pesanan Tiba) lengkap dengan profil kurir dan tombol simulasi langkah selanjutnya.
- **Smart Grocery Freshness Tracker**: Memantau estimasi sisa masa simpan bahan makanan yang telah dibeli dengan indikator kesegaran (Sangat Segar, Konsumsi Segera, Lewat Masa Simpan) dan tips penyimpanan kulkas.

---

## 🚀 Cara Menjalankan Aplikasi (Getting Started)

1. **Clone repository**:
   ```bash
   git clone https://github.com/devin336/Grocery-App.git
   cd Grocery-App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```

4. Buka di browser:
   ```
   http://localhost:5173/
   ```

5. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 🛠️ Teknologi yang Digunakan
- **Frontend Core**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla Modern CSS (Tailwind-free, responsive, glassmorphic touches)
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
