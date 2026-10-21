import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, Sparkles, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AuthModal({ onShowToast }) {
  const { login, register, loginAsDemo, checkPasswordStrength } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // Password strength check
  const strength = checkPasswordStrength(regPassword);
  const passwordsMatch = regPassword && regConfirmPassword && regPassword === regConfirmPassword;
  const passwordsMismatch = regConfirmPassword && regPassword !== regConfirmPassword;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = login(loginEmail, loginPassword);
    if (!res.success) {
      setErrorMessage(res.error);
    } else {
      if (onShowToast) onShowToast(`Selamat datang kembali, ${res.user.name}!`, 'success');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (passwordsMismatch) {
      setErrorMessage('Konfirmasi password tidak cocok dengan password yang dimasukkan!');
      return;
    }

    const res = register({
      fullName: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      confirmPassword: regConfirmPassword
    });

    if (!res.success) {
      setErrorMessage(res.error);
    } else {
      if (onShowToast) onShowToast(`Pendaftaran berhasil! Selamat datang di Dvh Grocery, ${res.user.name}.`, 'success');
    }
  };

  const handleDemoLogin = (userId, name) => {
    const res = loginAsDemo(userId);
    if (res.success && onShowToast) {
      onShowToast(`Masuk sebagai ${name}. Data keranjang & pesanan terisolasi!`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Dynamic ambient backdrop */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 transition-all">
        {/* Splash Header */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-7 text-white text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-3 shadow-inner">
            <Sparkles size={13} className="text-amber-300" />
            <span>Smart Grocery & Quick Commerce</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight mb-1">
            Dvh Grocery
          </h1>
          <p className="text-xs text-emerald-100 font-medium">
            "Belanja Kebutuhan Harian, Sampai dalam 15 Menit"
          </p>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-emerald-200">
            <ShieldCheck size={14} />
            <span>Akses Terproteksi • Autentikasi Wajib</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50 p-1.5">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              tab === 'login'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Masuk Akun (Login)
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              tab === 'register'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Daftar Akun Baru
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="p-6">
          {tab === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password Akun
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition-all text-sm flex items-center justify-center gap-2 group"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Email (Unik)
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="budi@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor Telepon
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password & Strength Meter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password (Minimal 8 Karakter)
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    placeholder="Kombinasi huruf, angka, simbol"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {regPassword && (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-500">Kekuatan Password:</span>
                      <strong style={{ color: strength.color }}>{strength.label}</strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300 rounded-full"
                        style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Ulangi password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className={`w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all font-medium ${
                      passwordsMatch
                        ? 'border-emerald-500'
                        : passwordsMismatch
                        ? 'border-rose-400'
                        : 'border-slate-200 focus:border-emerald-500'
                    }`}
                  />
                  {passwordsMatch && (
                    <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
                  )}
                </div>
                {passwordsMismatch && (
                  <div className="text-[10px] text-rose-500 mt-1">
                    Konfirmasi password belum sama!
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/25 transition-all text-xs flex items-center justify-center gap-2 mt-4"
              >
                <span>Daftar & Masuk ke Dvh Grocery</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}

          {/* Quick Demo Switcher Section (Isolation Test Helper) */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-center mb-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                ⚡ Uji Isolasi Data (Quick Demo Login)
              </span>
              <p className="text-[10px] text-slate-500">
                Pilih salah satu akun demo untuk membuktikan isolasi keranjang & pesanan:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('user_dvh_001', 'Ahmad Rizky')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 text-left transition-all group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    A
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 truncate">
                    Ahmad Rizky
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Jakarta Selatan • 3 Cart Items</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('user_dvh_002', 'Siti Nurhaliza')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 text-left transition-all group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">
                    S
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700 truncate">
                    Siti Nurhaliza
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Jakarta Pusat • 2 Cart Items</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
