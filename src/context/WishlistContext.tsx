"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product } from "@/constants/department";
import { ProductDetail } from "@/types/productDetail";
import { productsById } from "@/constants/products";

type WishlistProductInput = Product | ProductDetail;

type WishlistContextValue = {
  wishlistItems: ProductDetail[];
  wishlistCount: number;
  addToWishlist: (product: WishlistProductInput) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: WishlistProductInput) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL"];
const WISHLIST_STORAGE_KEY = "ecommerce_wishlist";

// Helper to load wishlist from localStorage
const loadWishlistFromStorage = (): ProductDetail[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!stored) return [];
    
    const productIds: string[] = JSON.parse(stored);
    // Reconstruct ProductDetails from stored IDs
    return productIds
      .map((id) => productsById[id])
      .filter((product): product is ProductDetail => product !== undefined);
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
    return [];
  }
};

// Helper to save wishlist to localStorage
const saveWishlistToStorage = (wishlistItems: ProductDetail[]) => {
  if (typeof window === "undefined") return;
  
  try {
    // Store only product IDs to avoid storing full product objects
    const productIds = wishlistItems.map((item) => item.id);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(productIds));
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error);
  }
};

const normalizeProduct = (
  productInput: WishlistProductInput
): ProductDetail => {
  const existingDetail = productsById[productInput.id];
  if (existingDetail) {
    return existingDetail;
  }

  if ("sizes" in productInput) {
    return productInput;
  }

  const images = [
    productInput.image,
    ...(productInput.hoverImage ? [productInput.hoverImage] : []),
  ];

  return {
    ...productInput,
    originalPrice: productInput.price,
    discountedPrice: productInput.price,
    discountPercentage: undefined,
    sizes: DEFAULT_SIZES,
    description: `${productInput.title} ${productInput.subtitle ?? ""}`.trim(),
    estimatedDelivery: "25 Nov - 28 Nov",
    images,
  };
};

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlistItems, setWishlistItems] = useState<ProductDetail[]>([]);
  
  // Load wishlist from localStorage on client after mount to avoid SSR/client mismatch
  useEffect(() => {
    const storedItems = loadWishlistFromStorage();
    if (storedItems.length > 0) {
      setWishlistItems(storedItems);
    }
  }, []);
  
  // Save to localStorage whenever wishlistItems changes
  useEffect(() => {
    saveWishlistToStorage(wishlistItems);
  }, [wishlistItems]);

  const addToWishlist = useCallback((productInput: WishlistProductInput) => {
    setWishlistItems((prev) => {
      const normalized = normalizeProduct(productInput);
      if (prev.some((item) => item.id === normalized.id)) {
        return prev;
      }
      return [...prev, normalized];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  }, []);

  const toggleWishlist = useCallback((productInput: WishlistProductInput) => {
    setWishlistItems((prev) => {
      const normalized = normalizeProduct(productInput);
      const exists = prev.some((item) => item.id === normalized.id);
      if (exists) {
        return prev.filter((item) => item.id !== normalized.id);
      }
      return [...prev, normalized];
    });
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    }
  }, []);

  const wishlistCount = wishlistItems.length;

  const isWishlisted = useCallback(
    (productId: string) => wishlistItems.some((item) => item.id === productId),
    [wishlistItems]
  );

  const value = useMemo(
    () => ({
      wishlistItems,
      wishlistCount,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isWishlisted,
      clearWishlist,
    }),
    [
      wishlistItems,
      wishlistCount,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isWishlisted,
      clearWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};


