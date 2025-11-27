"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ProductDetail } from "@/types/productDetail";

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const summary = useMemo(() => calculateSummary(cartItems), [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      summary,
    }),
    [cartItems, addItem, removeItem, updateQuantity, clearCart, summary]
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

