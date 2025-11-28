"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ProductDetail } from "@/types/productDetail";
import { productsById } from "@/constants/products";

export type CartItem = {
  product: ProductDetail;
  size: string;
  quantity: number;
};

type CartSummary = {
  subtotal: number;
  sale: number;
  promotion: number;
  total: number;
  currencySymbol: string;
};

type CartContextValue = {
  cartItems: CartItem[];
  addItem: (product: ProductDetail, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  updateSize: (productId: string, oldSize: string, newSize: string) => void;
  clearCart: () => void;
  summary: CartSummary;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const parsePriceValue = (price?: string) => {
  if (!price) {
    return 0;
  }
  const numeric = price.replace(/[^\d.]/g, "");
  const parsed = parseFloat(numeric);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getCurrencySymbol = (price?: string) => {
  if (!price) {
    return "$";
  }
  const match = price.trim().match(/^[^\d\s]+/);
  return match ? match[0] : "$";
};

const CART_STORAGE_KEY = "ecommerce_cart";

// Helper to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    // Reconstruct CartItems from stored data
    return parsed.map((item: { productId: string; size: string; quantity: number }) => {
      const product = productsById[item.productId];
      if (!product) return null;
      return {
        product,
        size: item.size,
        quantity: item.quantity,
      };
    }).filter((item: CartItem | null): item is CartItem => item !== null);
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// Helper to save cart to localStorage
const saveCartToStorage = (cartItems: CartItem[]) => {
  if (typeof window === "undefined") return;
  
  try {
    // Store only essential data to avoid storing full product objects
    const simplified = cartItems.map((item) => ({
      productId: item.product.id,
      size: item.size,
      quantity: item.quantity,
    }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(simplified));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const calculateSummary = (cartItems: CartItem[]): CartSummary => {
  if (cartItems.length === 0) {
    return {
      subtotal: 0,
      sale: 0,
      promotion: 0,
      total: 0,
      currencySymbol: "$",
    };
  }

  const currencySymbol =
    getCurrencySymbol(
      cartItems[0].product.discountedPrice ||
        cartItems[0].product.originalPrice ||
        cartItems[0].product.price
    ) || "$";

  const subtotal = cartItems.reduce((sum, item) => {
    const unitPrice =
      parsePriceValue(item.product.originalPrice) ||
      parsePriceValue(item.product.discountedPrice) ||
      parsePriceValue(item.product.price);
    return sum + unitPrice * item.quantity;
  }, 0);

  const discountedTotal = cartItems.reduce((sum, item) => {
    const unitPrice =
      parsePriceValue(item.product.discountedPrice) ||
      parsePriceValue(item.product.price) ||
      parsePriceValue(item.product.originalPrice);
    return sum + unitPrice * item.quantity;
  }, 0);

  const sale = Math.max(subtotal - discountedTotal, 0);

  return {
    subtotal,
    sale,
    promotion: 0,
    total: discountedTotal,
    currencySymbol,
  };
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadCartFromStorage());
  
  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const addItem = useCallback(
    (product: ProductDetail, size: string, quantity = 1) => {
      if (!size) {
        return;
      }
      setCartItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.product.id === product.id && item.size === size
        );

        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }

        return [...prev, { product, size, quantity }];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const updateSize = useCallback(
    (productId: string, oldSize: string, newSize: string) => {
      if (oldSize === newSize) return;

      setCartItems((prev) => {
        const itemIndex = prev.findIndex(
          (item) => item.product.id === productId && item.size === oldSize
        );

        if (itemIndex === -1) return prev;

        const item = prev[itemIndex];
        const existingNewSizeIndex = prev.findIndex(
          (item) => item.product.id === productId && item.size === newSize
        );

        const updated = [...prev];

        if (existingNewSizeIndex !== -1) {
          // If new size already exists, merge quantities
          updated[existingNewSizeIndex] = {
            ...updated[existingNewSizeIndex],
            quantity: updated[existingNewSizeIndex].quantity + item.quantity,
          };
          // Remove old size item
          updated.splice(itemIndex, 1);
        } else {
          // Just update the size
          updated[itemIndex] = {
            ...item,
            size: newSize,
          };
        }

        return updated;
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  const summary = useMemo(() => calculateSummary(cartItems), [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addItem,
      removeItem,
      updateQuantity,
      updateSize,
      clearCart,
      summary,
    }),
    [cartItems, addItem, removeItem, updateQuantity, updateSize, clearCart, summary]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

