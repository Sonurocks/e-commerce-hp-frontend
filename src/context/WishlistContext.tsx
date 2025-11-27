"use client";

import React, {
  createContext,
  useCallback,
  useContext,
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


