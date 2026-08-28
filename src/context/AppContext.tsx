import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  MenuItem, 
  CartItem, 
  OrderType, 
  SelectedCustomizations, 
  Reservation, 
  Order,
  MediaItem,
  MediaPlacement
} from '../types';
import { t } from '../data/translations';
import { INITIAL_MEDIA_LIBRARY } from '../data/mediaLibraryData';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  pageParams: any;
  navigateTo: (page: string, params?: any) => void;
  selectedBlogPostSlug: string | null;
  setSelectedBlogPostSlug: (slug: string | null) => void;
  
  // Media Library state & methods
  mediaList: MediaItem[];
  activePlacements: Record<string, string>;
  dishImageOverrides: Record<string, string>;
  addMediaItem: (item: MediaItem) => void;
  updateMediaItem: (id: string, updates: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  assignPlacement: (placement: MediaPlacement, media: MediaItem) => void;
  assignDishImage: (dishId: string, media: MediaItem) => void;
  approveStagedMedia: (id: string, placement?: MediaPlacement) => void;
  rejectStagedMedia: (id: string) => void;
  getPlacementMedia: (placement: MediaPlacement, fallbackUrl: string) => string;
  getDishImage: (dishId: string, fallbackUrl: string) => string;
  isMediaLibraryOpen: boolean;
  setIsMediaLibraryOpen: (open: boolean) => void;

  // Cart state
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, customizations?: SelectedCustomizations) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartServiceFee: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;

  // Pre-Order for reservation state
  preOrderCart: CartItem[];
  addToPreOrder: (item: MenuItem, quantity?: number, customizations?: SelectedCustomizations) => void;
  removeFromPreOrder: (cartItemId: string) => void;
  updatePreOrderQuantity: (cartItemId: string, quantity: number) => void;
  clearPreOrder: () => void;
  preOrderTotal: number;

  // Customization modal
  customizingItem: MenuItem | null;
  customizationTarget: 'cart' | 'preorder';
  openCustomizationModal: (item: MenuItem, target?: 'cart' | 'preorder') => void;
  closeCustomizationModal: () => void;

  // Last confirmed entities for receipt / tracker views
  lastReservation: Reservation | null;
  setLastReservation: (res: Reservation | null) => void;
  lastOrder: Order | null;
  setLastOrder: (ord: Order | null) => void;

  // Quick reservation prefill
  quickReservationState: { guests: number; date: string; time: string } | null;
  setQuickReservationState: (state: { guests: number; date: string; time: string } | null) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Translations shortcut
  tr: typeof t.es;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<any>(null);
  const [selectedBlogPostSlug, setSelectedBlogPostSlug] = useState<string | null>(null);
  
  // Media Library state with safe sync for core static assets
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('asador_media_library');
      if (saved) {
        const parsed: MediaItem[] = JSON.parse(saved);
        // Sync static asset URLs with current build imports
        const initialMap = new Map(INITIAL_MEDIA_LIBRARY.map(item => [item.id, item]));
        const synced = parsed.map(item => {
          const fresh = initialMap.get(item.id);
          if (fresh) {
            return {
              ...item,
              url: fresh.url,
              thumbnailUrl: fresh.thumbnailUrl
            };
          }
          return item;
        });
        // Ensure any newly added initial items are present
        INITIAL_MEDIA_LIBRARY.forEach(initItem => {
          if (!synced.some(s => s.id === initItem.id)) {
            synced.push(initItem);
          }
        });
        return synced;
      }
      return INITIAL_MEDIA_LIBRARY;
    } catch {
      return INITIAL_MEDIA_LIBRARY;
    }
  });

  const [activePlacements, setActivePlacements] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('asador_active_placements');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [dishImageOverrides, setDishImageOverrides] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('asador_dish_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('asador_media_library', JSON.stringify(mediaList));
  }, [mediaList]);

  useEffect(() => {
    localStorage.setItem('asador_active_placements', JSON.stringify(activePlacements));
  }, [activePlacements]);

  useEffect(() => {
    localStorage.setItem('asador_dish_images', JSON.stringify(dishImageOverrides));
  }, [dishImageOverrides]);

  const addMediaItem = (item: MediaItem) => {
    setMediaList(prev => [item, ...prev]);
  };

  const updateMediaItem = (id: string, updates: Partial<MediaItem>) => {
    setMediaList(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMediaItem = (id: string) => {
    setMediaList(prev => prev.filter(m => m.id !== id));
  };

  const assignPlacement = (placement: MediaPlacement, media: MediaItem) => {
    setActivePlacements(prev => ({
      ...prev,
      [placement]: media.url
    }));
    // Update usedIn array
    setMediaList(prev => prev.map(m => {
      if (m.id === media.id) {
        const used = new Set(m.usedIn || []);
        used.add(placement);
        return { ...m, usedIn: Array.from(used), active: true };
      }
      return m;
    }));
  };

  const assignDishImage = (dishId: string, media: MediaItem) => {
    setDishImageOverrides(prev => ({
      ...prev,
      [dishId]: media.url
    }));
    setMediaList(prev => prev.map(m => {
      if (m.id === media.id) {
        const used = new Set(m.usedIn || []);
        used.add(`Menu Item: ${dishId}`);
        return { ...m, usedIn: Array.from(used), active: true, suggestedDishId: dishId };
      }
      return m;
    }));
  };

  const approveStagedMedia = (id: string, targetPlacement?: MediaPlacement) => {
    setMediaList(prev => prev.map(m => {
      if (m.id === id) {
        const updated = { ...m, active: true, needsReview: false, qualityIssues: [] };
        if (targetPlacement) {
          assignPlacement(targetPlacement, updated);
        }
        return updated;
      }
      return m;
    }));
  };

  const rejectStagedMedia = (id: string) => {
    deleteMediaItem(id);
  };

  const getPlacementMedia = (placement: MediaPlacement, fallbackUrl: string): string => {
    if (activePlacements[placement]) {
      return activePlacements[placement];
    }
    // Find active media with this placement
    const found = mediaList.find(m => m.active && m.usedIn && m.usedIn.includes(placement));
    return found ? found.url : fallbackUrl;
  };

  const getDishImage = (dishId: string, fallbackUrl: string): string => {
    return dishImageOverrides[dishId] || fallbackUrl;
  };
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('asador_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Pre-order items attached to reservation
  const [preOrderCart, setPreOrderCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('asador_preorder');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customization modal
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [customizationTarget, setCustomizationTarget] = useState<'cart' | 'preorder'>('cart');

  // Confirmation entities
  const [lastReservation, setLastReservation] = useState<Reservation | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Quick reservation prefill from home widget
  const [quickReservationState, setQuickReservationState] = useState<{ guests: number; date: string; time: string } | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('asador_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist pre-order
  useEffect(() => {
    localStorage.setItem('asador_preorder', JSON.stringify(preOrderCart));
  }, [preOrderCart]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page: string, params: any = null) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to generate a unique key for customized cart items
  const generateCartItemId = (item: MenuItem, customizations?: SelectedCustomizations): string => {
    const doneness = customizations?.meatDoneness || 'default';
    const spice = customizations?.spiceLevel || 'default';
    const notes = customizations?.specialInstructions ? encodeURIComponent(customizations.specialInstructions.trim().toLowerCase()) : '';
    return `${item.id}_${doneness}_${spice}_${notes}`;
  };

  // Cart operations
  const addToCart = (item: MenuItem, quantity = 1, customizations?: SelectedCustomizations) => {
    const min = item.minQuantity || 1;
    const finalQty = Math.max(min, quantity);
    const cartItemId = generateCartItemId(item, customizations);

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + finalQty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotal: +(newQty * item.price).toFixed(2)
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            quantity: finalQty,
            customizations,
            itemTotal: +(finalQty * item.price).toFixed(2)
          }
        ];
      }
    });

    const itemLabel = language === 'es' ? item.name : (item.nameEn || item.name);
    showToast(`${finalQty}x ${itemLabel} ${language === 'es' ? 'añadido al pedido' : 'added to order'}`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          const min = ci.item.minQuantity || 1;
          const validQty = Math.max(min, quantity);
          return {
            ...ci,
            quantity: validQty,
            itemTotal: +(validQty * ci.item.price).toFixed(2)
          };
        }
        return ci;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Pre-order operations
  const addToPreOrder = (item: MenuItem, quantity = 1, customizations?: SelectedCustomizations) => {
    const min = item.minQuantity || 1;
    const finalQty = Math.max(min, quantity);
    const cartItemId = generateCartItemId(item, customizations);

    setPreOrderCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + finalQty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotal: +(newQty * item.price).toFixed(2)
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            quantity: finalQty,
            customizations,
            itemTotal: +(finalQty * item.price).toFixed(2)
          }
        ];
      }
    });

    const itemLabel = language === 'es' ? item.name : (item.nameEn || item.name);
    showToast(`${finalQty}x ${itemLabel} ${language === 'es' ? 'añadido a la reserva' : 'added to reservation'}`);
  };

  const removeFromPreOrder = (cartItemId: string) => {
    setPreOrderCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updatePreOrderQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromPreOrder(cartItemId);
      return;
    }
    setPreOrderCart((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          const min = ci.item.minQuantity || 1;
          const validQty = Math.max(min, quantity);
          return {
            ...ci,
            quantity: validQty,
            itemTotal: +(validQty * ci.item.price).toFixed(2)
          };
        }
        return ci;
      })
    );
  };

  const clearPreOrder = () => {
    setPreOrderCart([]);
  };

  const openCustomizationModal = (item: MenuItem, target: 'cart' | 'preorder' = 'cart') => {
    setCustomizingItem(item);
    setCustomizationTarget(target);
  };

  const closeCustomizationModal = () => {
    setCustomizingItem(null);
  };

  // Totals calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = +cart.reduce((sum, item) => sum + item.itemTotal, 0).toFixed(2);
  const cartDeliveryFee = orderType === 'delivery' ? (cartSubtotal >= 30 || cartSubtotal === 0 ? 0 : 2.50) : 0;
  const cartServiceFee = cartSubtotal > 0 ? 0.95 : 0;
  const cartTotal = +(cartSubtotal + cartDeliveryFee + cartServiceFee).toFixed(2);

  const preOrderTotal = +preOrderCart.reduce((sum, item) => sum + item.itemTotal, 0).toFixed(2);

  const tr = t[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentPage,
        setCurrentPage,
        pageParams,
        navigateTo,
        selectedBlogPostSlug,
        setSelectedBlogPostSlug,

        mediaList,
        activePlacements,
        dishImageOverrides,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        assignPlacement,
        assignDishImage,
        approveStagedMedia,
        rejectStagedMedia,
        getPlacementMedia,
        getDishImage,
        isMediaLibraryOpen,
        setIsMediaLibraryOpen,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDeliveryFee,
        cartServiceFee,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,

        preOrderCart,
        addToPreOrder,
        removeFromPreOrder,
        updatePreOrderQuantity,
        clearPreOrder,
        preOrderTotal,

        customizingItem,
        customizationTarget,
        openCustomizationModal,
        closeCustomizationModal,

        lastReservation,
        setLastReservation,
        lastOrder,
        setLastOrder,

        quickReservationState,
        setQuickReservationState,

        toasts,
        showToast,
        removeToast,

        tr
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
