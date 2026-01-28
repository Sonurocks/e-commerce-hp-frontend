"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const Wishlist = () => {
  const { wishlistItems, wishlistCount, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const { translations } = useLanguage();
  const translate = (text: string) => translations.productCopy[text] ?? text;
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {}
  );
  const [isMounted, setIsMounted] = useState(false);

  // Track when component has mounted to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wishlistHeading = useMemo(() => {
    // During SSR and initial render, always show "Wishlist" to match server
    if (!isMounted || wishlistCount === 0) {
      return translate("Wishlist");
    }
    return wishlistCount === 1
      ? translate("Wishlist · 1 item")
      : translate("Wishlist · {{count}} items").replace("{{count}}", wishlistCount.toString());
  }, [wishlistCount, isMounted, translations]);

  const handleSizeChange = (productId: string, value: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: value }));
  };

  const handleAddToBag = (productId: string) => {
    const product = wishlistItems.find((item) => item.id === productId);
    if (!product) return;
    const sizes = product.sizes && product.sizes.length > 0
      ? product.sizes
      : ["One Size"];
    const selectedSize = selectedSizes[productId] || sizes[0];
    if (!selectedSize) return;
    addItem(product, selectedSize, 1);
  };

  const showEmptyState = !isMounted || wishlistCount === 0;

  if (showEmptyState) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-16 max-w-[1440px]">
          <div className="mb-24 max-w-2xl">
            <h1 className="text-4xl font-base text-(--color-preto) mb-3">
              {translate("Wishlist")}
            </h1>
            <p className="text-base  mb-4 font-base leading-relaxed">
              {translate("Add your favourite items to your wishlist and they'll appear here")}
            </p>
            <Link
              href="/"
              className="inline-block  bg-[var(--theme-bg)] border border-[var(--theme-border)]  text-[var(--theme-text)]  px-5 py-2.5 rounded-md transition-colors font-normal text-sm"
            >
              {translate("Shop Now")}
            </Link>
          </div>
        </div>
        <DownloadAppBanner />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-16 max-w-[1440px]">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-light text-(--color-preto) mb-2">
            {wishlistHeading}
          </h1>
          <p className="text-sm text-gray-600">
            {translate("Keep track of your favourite pieces and add them to your bag when you're ready.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((item) => {
            const sizeOptions =
              item.sizes && item.sizes.length > 0
                ? item.sizes
                : ["One Size"];
            const selectedSize =
              selectedSizes[item.id] || sizeOptions[0] || "";
            const hasDiscount =
              item.originalPrice &&
              item.discountedPrice &&
              item.originalPrice !== item.discountedPrice;

            return (
              <div
                key={item.id}
                className="flex flex-col items-start text-left gap-6 h-full"
              >
                <div className="relative w-72 h-72 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <Link
                    href={`/product-detail/${item.id}`}
                    aria-label={`View ${item.title}`}
                    className="relative block w-full h-full"
                  >
                    {item.image?.src && (
                      <Image
                        src={item.image.src}
                        alt={item.title}
                        fill
                        sizes="288px"
                        className="object-contain p-6"
                      />
                    )}
                  </Link>
                  <button
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 text-2xl leading-none text-gray-500 hover:text-(--color-preto)"
                  >
                    &times;
                  </button>
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-xs font-semibold border border-gray-200 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-2 max-w-md flex-1">
                  {item.subtitle && (
                    <p className="text-[12px] text-preto">
                      {item.subtitle}
                    </p>
                  )}
                  <h3 className="text-[13px] text-preto font-semibold line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{translate("FARFETCH ID:")} {item.id}</p>

                  <div className="flex items-center justify-start gap-3 mt-3">
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 line-through">
                        {item.originalPrice}
                      </span>
                    )}
                    <span className="text-sm text-preto">
                      {item.discountedPrice || item.price || item.originalPrice}
                    </span>
                  </div>
                </div>

                <div className="w-full max-w-sm space-y-3">
                  <div className="text-left">
                    <label
                      htmlFor={`size-${item.id}`}
                      className="text-[11px] uppercase tracking-wide text-gray-500"
                    >
                      {translate("Select size")}
                    </label>
                    <select
                      id={`size-${item.id}`}
                      value={selectedSize}
                      onChange={(e) =>
                        handleSizeChange(item.id, e.target.value)
                      }
                      className="mt-1 w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-(--color-preto)"
                    >
                      {sizeOptions.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddToBag(item.id)}
                    className="w-full bg-black text-white py-3 rounded-md text-sm font-semibold tracking-wide hover:bg-gray-900 transition"
                  >
                    {translate("Add To Bag")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <DownloadAppBanner />
    </div>
  );
};

export default Wishlist;
