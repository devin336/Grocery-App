import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, Sparkles, Eye, EyeOff, ArrowRight, Zap, Clock, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 z-10 transition-all">
        {/* Splash Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 sm:p-7 text-white text-center relative shadow-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2.5 shadow-xs">
            <Sparkles size={13} className="text-amber-300" />
            <span>Smart Grocery & Quick Commerce</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1 flex items-center justify-center gap-2">
            <span>🥬 Dvh Grocery</span>
          </h1>
          <p className="text-xs text-emerald-100 font-medium max-w-sm mx-auto">
            "Belanja Kebutuhan Harian, Sampai dalam 15 Menit"
          </p>

          {/* Quick value badges */}
          <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-white/15 text-[11px] text-emerald-100">
            <span className="flex items-center gap-1"><Zap size={13} className="text-amber-300" /> 15 Menit Sampai</span>
            <span className="flex items-center gap-1"><Clock size={13} className="text-emerald-200" /> Freshness Tracker</span>
            <span className="flex items-center gap-1"><Shield size={13} className="text-teal-200" /> Data Terisolasi 100%</span>
          </div>
        </div>

        {/* 1-Click Fast Demo Login Hero (For instant evaluation) */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              ⚡ Masuk Cepat Sekali Klik (Demo Akun)
            </span>
            <span className="text-[10px] text-slate-400">Pilih salah satu:</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleDemoLogin('user_dvh_001', 'Ahmad Rizky')}
              className="p-3 rounded-2xl border-2 border-emerald-500/30 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-100/60 text-left transition-all group shadow-2xs"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  A
                </div>
                <div className="truncate">
                  <span className="text-xs font-black text-slate-900 group-hover:text-emerald-700 truncate block">
                    Ahmad Rizky
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    Jakarta Selatan
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                🛒 3 Cart Items tersimpan
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('user_dvh_002', 'Siti Nurhaliza')}
              className="p-3 rounded-2xl border-2 border-teal-500/30 hover:border-teal-500 bg-teal-50/50 hover:bg-teal-100/60 text-left transition-all group shadow-2xs"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  S
                </div>
                <div className="truncate">
                  <span className="text-xs font-black text-slate-900 group-hover:text-teal-700 truncate block">
                    Siti Nurhaliza
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold block">
                    Jakarta Pusat
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                🛒 2 Cart Items tersimpan
              </div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="px-6 py-2 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            atau login dengan akun Anda
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-1">
          <div className="flex border border-slate-200 bg-slate-100/80 rounded-2xl p-1">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Masuk Akun
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                tab === 'register'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mx-6 mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="p-6 pt-3">
          {tab === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
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
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-xl shadow-md shadow-emerald-600/25 transition-all text-xs flex items-center justify-center gap-2 group mt-2"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email (Unik)</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="email@anda.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Telepon</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password (&ge; 8 Karakter)</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    placeholder="Minimal 8 karakter"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                {/* Strength meter */}
                {regPassword && (
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-500">Kekuatan:</span>
                      <strong style={{ color: strength.color }}>{strength.label}</strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Ulangi password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 font-medium"
                  />
                  {passwordsMatch && (
                    <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-xl shadow-md shadow-emerald-600/25 transition-all text-xs flex items-center justify-center gap-2 mt-3"
              >
                <span>Daftar Akun Baru</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
