import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Language, UserProfile, UserRole } from '../types';
import { SAMPLE_PRODUCTS, TRANSLATIONS } from '../data/sampleData';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  activeScreen: 'clusterFeed' | 'productDetails' | 'cartSla' | 'about';
  selectedProductId: string;
  selectedProduct: Product;
  language: Language;
  t: typeof TRANSLATIONS['en'];
  isCuratorOpen: boolean;
  authenticityModalProduct: Product | null;
  currentUser: UserProfile | null;
  isAuthModalOpen: boolean;
  isSellerDashboardOpen: boolean;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (shipping: { fullName: string; city: string; phone: string; addressLine: string }, upiApp: 'Google Pay' | 'PhonePe' | 'Paytm' | 'BHIM') => Order;
  selectProduct: (productId: string) => void;
  navigateToScreen: (screen: 'clusterFeed' | 'productDetails' | 'cartSla' | 'about') => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  clearMyData: () => void;
  setIsCuratorOpen: (open: boolean) => void;
  openAuthenticityModal: (product: Product) => void;
  closeAuthenticityModal: () => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsSellerDashboardOpen: (open: boolean) => void;
  login: (email: string, role: UserRole) => void;
  register: (profileData: Partial<UserProfile>) => void;
  logout: () => void;
  addNewSellerProduct: (product: Product) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'artisan_haven_cart_v3',
  ORDERS: 'artisan_haven_orders_v3',
  LANG: 'artisan_haven_lang_v3',
  SELECTED_PROD: 'artisan_haven_selected_prod_v3',
  USER: 'artisan_haven_user_v3',
  CUSTOM_PRODS: 'artisan_haven_custom_prods_v3',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customProducts, setCustomProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_PRODS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const products = [...customProducts, ...SAMPLE_PRODUCTS];

  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_PROD) || 'etikoppaka-204';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeScreen, setActiveScreen] = useState<'clusterFeed' | 'productDetails' | 'cartSla' | 'about'>('clusterFeed');
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved === 'te' || saved === 'en') ? saved : 'en';
  });

  const [isCuratorOpen, setIsCuratorOpen] = useState(false);
  const [authenticityModalProduct, setAuthenticityModalProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSellerDashboardOpen, setIsSellerDashboardOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_PROD, selectedProductId);
  }, [selectedProductId]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PRODS, JSON.stringify(customProducts));
  }, [customProducts]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((current) => (current === msg ? null : current));
    }, 4000);
  };

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const addToCart = (productId: string, qty: number = 1) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product: prod, quantity: qty }];
    });

    showNotification(`Added "${prod.title}" to Cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const selectProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const navigateToScreen = (screen: 'clusterFeed' | 'productDetails' | 'cartSla' | 'about') => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  const clearMyData = () => {
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_PROD);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_PRODS);
    setCart([]);
    setOrders([]);
    setCurrentUser(null);
    setCustomProducts([]);
    setSelectedProductId('etikoppaka-204');
    showNotification('All saved cart, demo orders, and login records have been cleared.');
  };

  const login = (email: string, role: UserRole) => {
    const profile: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      role,
      fullName: role === 'buyer' ? 'Ananya Sundaram' : 'Etikoppaka Artisans Society Hub',
      email,
      city: 'Visakhapatnam',
      phone: '+91 98480 22334',
      societyName: role === 'seller' ? 'Etikoppaka Artisans Society Hub' : undefined,
      cooperativeRegNo: role === 'seller' ? 'AP-VZG-CRAFT-108' : undefined,
      clusterLocation: role === 'seller' ? 'Varaha River Basin, Visakhapatnam' : undefined,
      craftSpecialization: role === 'seller' ? 'Etikoppaka Lacquerware & Wooden Toys' : undefined,
      verifiedStatus: true,
    };
    setCurrentUser(profile);
    showNotification(`Welcome back, ${profile.fullName}! Signed in as ${role === 'seller' ? 'Cooperative Seller' : 'Buyer'}.`);
  };

  const register = (profileData: Partial<UserProfile>) => {
    const newProfile: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      role: profileData.role || 'buyer',
      fullName: profileData.fullName || (profileData.role === 'buyer' ? 'Conscious Buyer' : 'Artisan Society'),
      email: profileData.email || 'user@artisanhaven.in',
      phone: profileData.phone || '+91 98480 22334',
      city: profileData.city || 'Visakhapatnam',
      societyName: profileData.societyName,
      cooperativeRegNo: profileData.cooperativeRegNo,
      clusterLocation: profileData.clusterLocation,
      craftSpecialization: profileData.craftSpecialization,
      verifiedStatus: true,
    };
    setCurrentUser(newProfile);
    showNotification(`Registration successful! Registered as ${newProfile.role === 'seller' ? 'Artisan Cooperative Seller' : 'Conscious Buyer'}.`);
  };

  const logout = () => {
    setCurrentUser(null);
    showNotification('Signed out successfully.');
  };

  const addNewSellerProduct = (product: Product) => {
    setCustomProducts((prev) => [product, ...prev]);
    setSelectedProductId(product.id);
    showNotification(`"${product.title}" has been listed and published to the live feed!`);
  };

  const placeOrder = (
    shipping: { fullName: string; city: string; phone: string; addressLine: string },
    upiApp: 'Google Pay' | 'PhonePe' | 'Paytm' | 'BHIM'
  ): Order => {
    const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const artisanPayoutTotal = cart.reduce(
      (acc, item) => acc + item.product.priceBreakdown.artisanShare * item.quantity,
      0
    );
    const hubPayoutTotal = cart.reduce(
      (acc, item) => acc + item.product.priceBreakdown.hubShare * item.quantity,
      0
    );
    const platformFeeTotal = cart.reduce(
      (acc, item) => acc + item.product.priceBreakdown.platformShare * item.quantity,
      0
    );

    const maxDispatchHours = Math.max(...cart.map((i) => i.product.dispatchHoursMax || 24), 12);
    const deadline = new Date(Date.now() + maxDispatchHours * 60 * 60 * 1000).toISOString();

    const orderId = `AH-ORD-${Date.now().toString().slice(-6)}`;
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const receiptHash = `AH-COOP-VERIFY-${randomHex}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      totalAmount,
      artisanPayoutTotal,
      hubPayoutTotal,
      platformFeeTotal,
      dispatchDeadline: deadline,
      shippingAddress: shipping,
      paymentMethod: 'UPI',
      upiApp,
      status: 'Cluster Packaging',
      cooperativeReceiptHash: receiptHash,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showNotification(`Order ${orderId} confirmed! Sent to Workshop Hub.`);
    return newOrder;
  };

  const openAuthenticityModal = (product: Product) => {
    setAuthenticityModalProduct(product);
  };

  const closeAuthenticityModal = () => {
    setAuthenticityModalProduct(null);
  };

  const t = TRANSLATIONS[language];

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        orders,
        activeScreen,
        selectedProductId,
        selectedProduct,
        language,
        t,
        isCuratorOpen,
        authenticityModalProduct,
        currentUser,
        isAuthModalOpen,
        isSellerDashboardOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        selectProduct,
        navigateToScreen,
        setLanguage,
        toggleLanguage,
        clearMyData,
        setIsCuratorOpen,
        openAuthenticityModal,
        closeAuthenticityModal,
        setIsAuthModalOpen,
        setIsSellerDashboardOpen,
        login,
        register,
        logout,
        addNewSellerProduct,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
