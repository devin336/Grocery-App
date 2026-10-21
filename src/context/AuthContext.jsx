import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../data/mockUserData';

const AuthContext = createContext();

const STORAGE_KEY_USERS = 'dvh_registered_users';
const STORAGE_KEY_TOKEN = 'dvh_active_token';
const STORAGE_KEY_ACTIVE_USER_ID = 'dvh_active_user_id';
const STORAGE_KEY_LOGGED_OUT = 'dvh_has_logged_out';

export function AuthProvider({ children }) {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse registered users', e);
    }
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEMO_USERS));
    return DEMO_USERS;
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Initialize demo data for demo users
  useEffect(() => {
    DEMO_USERS.forEach((demoUser) => {
      const cartKey = `dvh_cart_${demoUser.id}`;
      const ordersKey = `dvh_orders_${demoUser.id}`;
      const addrKey = `dvh_addresses_${demoUser.id}`;

      if (!localStorage.getItem(cartKey)) {
        localStorage.setItem(cartKey, JSON.stringify(demoUser.initialCart || []));
      }
      if (!localStorage.getItem(ordersKey)) {
        localStorage.setItem(ordersKey, JSON.stringify(demoUser.initialOrders || []));
      }
      if (!localStorage.getItem(addrKey)) {
        localStorage.setItem(addrKey, JSON.stringify(demoUser.addresses || []));
      }
    });
  }, []);

  // Restore session on mount OR auto-login default demo student user
  useEffect(() => {
    try {
      const hasExplicitlyLoggedOut = localStorage.getItem(STORAGE_KEY_LOGGED_OUT) === 'true';
      const savedToken = localStorage.getItem(STORAGE_KEY_TOKEN);
      const savedUserId = localStorage.getItem(STORAGE_KEY_ACTIVE_USER_ID);

      if (savedToken && savedUserId && !hasExplicitlyLoggedOut) {
        const found = registeredUsers.find((u) => u.id === savedUserId);
        if (found) {
          setCurrentUser(found);
          setToken(savedToken);
          setIsLoadingAuth(false);
          return;
        }
      }

      // If opening for first time (no active session and not explicitly logged out)
      // Automatically activate Ahmad Rizky Pratama (User 1) so mobile app renders immediately!
      if (!hasExplicitlyLoggedOut) {
        const defaultUser = registeredUsers[0] || DEMO_USERS[0];
        const defaultToken = `JWT_DVH_DEMO_${defaultUser.id}`;
        localStorage.setItem(STORAGE_KEY_TOKEN, defaultToken);
        localStorage.setItem(STORAGE_KEY_ACTIVE_USER_ID, defaultUser.id);
        setCurrentUser(defaultUser);
        setToken(defaultToken);
      } else {
        setCurrentUser(null);
        setToken(null);
      }
    } catch (e) {
      console.error('Failed to restore auth session', e);
    } finally {
      setIsLoadingAuth(false);
    }
  }, [registeredUsers]);

  const updateRegisteredUsers = (newUsers) => {
    setRegisteredUsers(newUsers);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(newUsers));
  };

  const checkPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Belum diisi', color: '#94a3b8' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 1:
        return { score: 25, label: 'Sangat Lemah', color: '#ef4444' };
      case 2:
        return { score: 50, label: 'Cukup', color: '#f59e0b' };
      case 3:
        return { score: 75, label: 'Kuat', color: '#3b82f6' };
      case 4:
        return { score: 100, label: 'Sangat Kuat & Aman', color: '#10b981' };
      default:
        return { score: 15, label: 'Terlalu Pendek (< 8 Karakter)', color: '#ef4444' };
    }
  };

  const register = ({ fullName, email, phone, password, confirmPassword }) => {
    const cleanName = fullName?.trim();
    const cleanEmail = email?.trim().toLowerCase();
    const cleanPhone = phone?.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !password) {
      return { success: false, error: 'Semua kolom wajib diisi!' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: 'Format alamat email tidak valid!' };
    }

    if (password.length < 8) {
      return { success: false, error: 'Password minimal harus 8 karakter!' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'Konfirmasi password tidak cocok!' };
    }

    const exists = registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: 'Alamat email sudah terdaftar. Silakan login!' };
    }

    const newUserId = `user_dvh_${Date.now()}`;
    const simulatedToken = `JWT_DVH_${btoa(cleanEmail + ':' + Date.now())}`;

    const newUser = {
      id: newUserId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: password,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${cleanName}`,
      createdAt: new Date().toISOString()
    };

    const defaultAddress = {
      id: `addr_${Date.now()}`,
      label: 'Kost Mahasiswa',
      recipient: cleanName,
      phone: cleanPhone,
      address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan',
      notes: 'Pagar hitam, kamar No. 12',
      isDefault: true
    };

    localStorage.setItem(`dvh_cart_${newUserId}`, JSON.stringify([]));
    localStorage.setItem(`dvh_orders_${newUserId}`, JSON.stringify([]));
    localStorage.setItem(`dvh_addresses_${newUserId}`, JSON.stringify([defaultAddress]));

    const updated = [...registeredUsers, newUser];
    updateRegisteredUsers(updated);

    localStorage.removeItem(STORAGE_KEY_LOGGED_OUT);
    localStorage.setItem(STORAGE_KEY_TOKEN, simulatedToken);
    localStorage.setItem(STORAGE_KEY_ACTIVE_USER_ID, newUserId);

    setCurrentUser(newUser);
    setToken(simulatedToken);

    return { success: true, user: newUser };
  };

  const login = (email, password) => {
    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, error: 'Email dan password wajib diisi!' };
    }

    const user = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return { success: false, error: 'Akun dengan email tersebut tidak ditemukan!' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Password salah. Periksa kembali password Anda!' };
    }

    const simulatedToken = `JWT_DVH_${btoa(cleanEmail + ':' + Date.now())}`;
    localStorage.removeItem(STORAGE_KEY_LOGGED_OUT);
    localStorage.setItem(STORAGE_KEY_TOKEN, simulatedToken);
    localStorage.setItem(STORAGE_KEY_ACTIVE_USER_ID, user.id);

    setCurrentUser(user);
    setToken(simulatedToken);

    return { success: true, user };
  };

  const loginAsDemo = (userId) => {
    const user = registeredUsers.find((u) => u.id === userId) || DEMO_USERS.find((u) => u.id === userId);
    if (user) {
      const simulatedToken = `JWT_DVH_DEMO_${user.id}`;
      localStorage.removeItem(STORAGE_KEY_LOGGED_OUT);
      localStorage.setItem(STORAGE_KEY_TOKEN, simulatedToken);
      localStorage.setItem(STORAGE_KEY_ACTIVE_USER_ID, user.id);
      setCurrentUser(user);
      setToken(simulatedToken);
      return { success: true, user };
    }
    return { success: false, error: 'Demo user not found' };
  };

  // Hard Logout
  const logout = () => {
    localStorage.setItem(STORAGE_KEY_LOGGED_OUT, 'true');
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_ACTIVE_USER_ID);
    setCurrentUser(null);
    setToken(null);
  };

  const getUserAddresses = () => {
    if (!currentUser) return [];
    try {
      const saved = localStorage.getItem(`dvh_addresses_${currentUser.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  };

  const saveUserAddresses = (addresses) => {
    if (!currentUser) return;
    localStorage.setItem(`dvh_addresses_${currentUser.id}`, JSON.stringify(addresses));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        isAuthenticated: !!currentUser,
        isLoadingAuth,
        register,
        login,
        loginAsDemo,
        logout,
        checkPasswordStrength,
        getUserAddresses,
        saveUserAddresses,
        registeredUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
