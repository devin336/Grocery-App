import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { VOUCHERS } from '../data/mockUserData';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [trackerItems, setTrackerItems] = useState([]);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

  // Storage key helpers for strict user isolation
  const getCartKey = (userId) => `dvh_cart_${userId}`;
  const getOrdersKey = (userId) => `dvh_orders_${userId}`;
  const getTrackerKey = (userId) => `dvh_tracker_${userId}`;

  // Helper to calculate storage tip
  const getStorageTip = (categoryName) => {
    if (categoryName.includes('Sayur') || categoryName.includes('Buah')) {
      return 'Simpan dalam kantong kertas di laci sayur kulkas (crisper) suhu 4-8°C. Jangan dicuci sebelum disimpan.';
    }
    if (categoryName.includes('Daging') || categoryName.includes('Seafood')) {
      return 'Simpan beku di freezer suhu -18°C atau chiller 2-4°C jika akan dimasak dalam 24 jam.';
    }
    if (categoryName.includes('Frozen')) {
      return 'Simpan selalu beku dalam freezer (-18°C) dan tutup rapat setelah dibuka.';
    }
    if (categoryName.includes('Minuman') || categoryName.includes('Susu')) {
      return 'Simpan di lemari pendingin (chiller) suhu 2-5°C. Habiskan dalam 3 hari setelah segel dibuka.';
    }
    if (categoryName.includes('Ready-to-Eat')) {
      return 'Sebaiknya langsung dikonsumsi selagi segar atau simpan di kulkas maksimal 24-48 jam.';
    }
    return 'Simpan di tempat kering, sejuk, dan terhindar dari paparan sinar matahari langsung.';
  };

  // Sync state whenever currentUser changes (User A -> User B or Logout)
  useEffect(() => {
    if (!currentUser) {
      // Hard clear in-memory state on logout
      setCartItems([]);
      setOrders([]);
      setTrackerItems([]);
      setAppliedVoucher(null);
      setActiveTrackingOrder(null);
      return;
    }

    const userId = currentUser.id;

    // Load Cart for this isolated user
    try {
      const savedCart = localStorage.getItem(getCartKey(userId));
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } catch (e) {
      setCartItems([]);
    }

    // Load Orders for this isolated user
    try {
      const savedOrders = localStorage.getItem(getOrdersKey(userId));
      const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
      setOrders(parsedOrders);

      // Rebuild / load Freshness Tracker items
      const savedTracker = localStorage.getItem(getTrackerKey(userId));
      if (savedTracker) {
        setTrackerItems(JSON.parse(savedTracker));
      } else {
        // Derive initial tracker items from existing orders
        const derived = [];
        parsedOrders.forEach((order) => {
          order.items?.forEach((item, idx) => {
            if (item.expiry_days && item.expiry_days <= 60) {
              derived.push({
                trackerId: `tr_${order.id}_${item.id}_${idx}`,
                productId: item.id,
                name: item.name,
                unit: item.unit,
                image_url: item.image_url,
                orderId: order.id,
                purchasedAt: order.date || new Date().toISOString(),
                expiry_days: item.expiry_days,
                storageTip: item.storageTip || getStorageTip(item.category || ''),
                status: 'active'
              });
            }
          });
        });
        setTrackerItems(derived);
        localStorage.setItem(getTrackerKey(userId), JSON.stringify(derived));
      }
    } catch (e) {
      setOrders([]);
      setTrackerItems([]);
    }
  }, [currentUser]);

  // Persist Cart per user
  const saveCart = (items) => {
    setCartItems(items);
    if (currentUser) {
      localStorage.setItem(getCartKey(currentUser.id), JSON.stringify(items));
    }
  };

  // Persist Orders per user
  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    if (currentUser) {
      localStorage.setItem(getOrdersKey(currentUser.id), JSON.stringify(newOrders));
    }
  };

  // Persist Tracker per user
  const saveTracker = (items) => {
    setTrackerItems(items);
    if (currentUser) {
      localStorage.setItem(getTrackerKey(currentUser.id), JSON.stringify(items));
    }
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    if (!currentUser) return false;

    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    let updated = [...cartItems];

    if (existingIndex > -1) {
      const currentQty = updated[existingIndex].quantity;
      const targetQty = currentQty + quantity;

      if (targetQty > product.stock) {
        return { success: false, message: `Stok maksimal hanya tersisa ${product.stock} ${product.unit}` };
      }

      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: targetQty
      };
    } else {
      if (quantity > product.stock) {
        return { success: false, message: `Stok maksimal hanya tersisa ${product.stock} ${product.unit}` };
      }

      updated.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        original_price: product.original_price,
        unit: product.unit,
        image_url: product.image_url,
        stock: product.stock,
        expiry_days: product.expiry_days,
        quantity: quantity
      });
    }

    saveCart(updated);
    return { success: true };
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!currentUser) return;

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = cartItems.find((i) => i.id === productId);
    if (item && newQuantity > item.stock) {
      return { success: false, message: `Stok maksimal hanya ${item.stock} ${item.unit}` };
    }

    const updated = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updated);
    return { success: true };
  };

  const removeFromCart = (productId) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Voucher operations
  const applyVoucher = (code) => {
    const cleanCode = code?.trim().toUpperCase();
    const found = VOUCHERS.find((v) => v.code === cleanCode);

    if (!found) {
      return { success: false, message: 'Kode voucher tidak valid atau sudah kedaluwarsa!' };
    }

    if (subtotal < found.minSpend) {
      return {
        success: false,
        message: `Minimal belanja Rp ${found.minSpend.toLocaleString('id-ID')} untuk menggunakan voucher ini!`
      };
    }

    setAppliedVoucher(found);
    return { success: true, message: `Voucher ${found.code} berhasil digunakan!`, voucher: found };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
  };

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const originalSubtotal = cartItems.reduce((acc, item) => acc + (item.original_price || item.price) * item.quantity, 0);
  const totalSavings = originalSubtotal - subtotal;

  // Free shipping threshold: Rp 100.000
  const freeShippingThreshold = 100000;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedVoucher?.type === 'fixed_shipping';

  const baseShippingFee = 10000;
  const shippingFee = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : baseShippingFee;
  const serviceFee = cartItems.length === 0 ? 0 : 2000;

  // Discount calculation
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.type === 'fixed_shipping') {
      discountAmount = 10000;
    } else if (appliedVoucher.type === 'fixed_total') {
      discountAmount = appliedVoucher.discount;
    } else if (appliedVoucher.type === 'percentage') {
      const calculated = Math.round(subtotal * appliedVoucher.discount);
      discountAmount = appliedVoucher.maxDiscount ? Math.min(calculated, appliedVoucher.maxDiscount) : calculated;
    }
  }

  const finalTotal = Math.max(0, subtotal + shippingFee + serviceFee - discountAmount);

  // Check out & Create Order
  const createOrder = ({ address, courierNote, paymentMethod, deliverySpeed = '15_min' }) => {
    if (!currentUser || cartItems.length === 0) return null;

    const orderId = `DVH-ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newOrder = {
      id: orderId,
      date: formattedDate,
      status: 'Diproses', // 'Diproses' -> 'Sedang Diantar' -> 'Selesai'
      step: 1, // 1: Diterima, 2: Dikemas, 3: OTW, 4: Tiba
      etaMinutes: 14,
      itemsCount: totalItems,
      subtotal,
      shippingFee,
      serviceFee,
      discountAmount,
      total: finalTotal,
      paymentMethod,
      deliverySpeed,
      address: address?.address || 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan',
      recipient: address?.recipient || currentUser.name,
      phone: address?.phone || currentUser.phone,
      notes: courierNote || 'Tolong cepat sampai, terima kasih!',
      courier: {
        name: 'Budi Santoso',
        motor: 'Honda Vario 160 (B 4821 KLO)',
        phone: '0812-9988-7766',
        rating: 4.9
      },
      items: cartItems.map((item) => ({
        ...item,
        purchasedAt: now.toISOString(),
        storageTip: getStorageTip(item.category || '')
      }))
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);

    // Add items to Smart Grocery Tracker
    const newTrackers = [];
    cartItems.forEach((item, idx) => {
      newTrackers.push({
        trackerId: `tr_${orderId}_${item.id}_${idx}`,
        productId: item.id,
        name: item.name,
        category: item.category,
        unit: item.unit,
        image_url: item.image_url,
        orderId: orderId,
        purchasedAt: now.toISOString(),
        expiry_days: item.expiry_days || 7,
        storageTip: getStorageTip(item.category || ''),
        status: 'active'
      });
    });

    const updatedTracker = [...newTrackers, ...trackerItems];
    saveTracker(updatedTracker);

    // Clear cart and voucher
    clearCart();
    setAppliedVoucher(null);
    setActiveTrackingOrder(newOrder);

    return newOrder;
  };

  // Update order status (for simulation)
  const updateOrderStatus = (orderId, updates) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, ...updates } : o));
    saveOrders(updated);
    if (activeTrackingOrder && activeTrackingOrder.id === orderId) {
      setActiveTrackingOrder((prev) => ({ ...prev, ...updates }));
    }
  };

  // Mark tracker item as consumed
  const markTrackerConsumed = (trackerId) => {
    const updated = trackerItems.map((t) =>
      t.trackerId === trackerId ? { ...t, status: 'consumed', consumedAt: new Date().toISOString() } : t
    );
    saveTracker(updated);
  };

  const removeTrackerItem = (trackerId) => {
    const updated = trackerItems.filter((t) => t.trackerId !== trackerId);
    saveTracker(updated);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        trackerItems,
        appliedVoucher,
        activeTrackingOrder,
        setActiveTrackingOrder,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyVoucher,
        removeVoucher,
        createOrder,
        updateOrderStatus,
        markTrackerConsumed,
        removeTrackerItem,
        totalItems,
        subtotal,
        originalSubtotal,
        totalSavings,
        shippingFee,
        serviceFee,
        discountAmount,
        finalTotal,
        freeShippingThreshold,
        freeShippingRemaining,
        isFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
