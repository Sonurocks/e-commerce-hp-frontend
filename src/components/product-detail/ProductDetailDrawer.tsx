"use client";

import React, { useState, useRef, useEffect } from "react";
import { ProductDetail } from "@/constants/products";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface ProductDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetail;
}

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

export default function ProductDetailDrawer({
  isOpen,
  onClose,
  product,
}: ProductDetailDrawerProps) {
  const { translations } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState<boolean>(false);
  const sizeDropdownRef = useRef<HTMLDivElement>(null);

  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  const sizeOptions = [
    { size: "XS", price: "£220", available: true },
    { size: "S", price: "£220", available: true },
    { size: "M", price: "£232", available: true },
    { size: "L", price: "£232", available: true },
    { size: "XL", price: "£232", available: true },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sizeDropdownRef.current &&
        !sizeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSizeDropdownOpen(false);
      }
    };

    if (isSizeDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSizeDropdownOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop - Only on mobile */}
      <div 
        className="fixed inset-0 bg-black/50 z-[99] lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer Container - Opens horizontally below header */}
      <div
        ref={drawerRef}
        className="fixed lg:absolute top-0 lg:top-full left-0 w-full h-full lg:h-auto bg-(--color-branco) shadow-lg border-t border-gray-200 z-[100] lg:z-[100] overflow-y-auto lg:max-h-[80vh]"
        style={{ fontFamily: fontStack }}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={(e) => e.stopPropagation()}
        onMouseLeave={(e) => e.stopPropagation()}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-(--color-branco) z-10">
          <h2 className="text-lg font-semibold text-(--color-preto)">
            {translate("PRODUCT DETAILS") || "PRODUCT DETAILS"}
          </h2>
          <button
            onClick={onClose}
            className="text-(--color-preto) hover:text-(--color-hina) transition p-2"
            aria-label="Close drawer"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Close Button - Top Right Corner */}
        <div className="hidden lg:block absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="text-(--color-preto) hover:text-(--color-hina) transition p-2 bg-(--color-branco) rounded-full hover:bg-gray-100"
            aria-label="Close drawer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-[72px] py-4 md:py-8 bg-(--color-branco)">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-60">
            {/* Left Side - Product Image */}
            <div className="w-full lg:w-[460px] flex-shrink-0">
              {product.image && (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-(--color-shell)">
                  <Image
                    src={product.image.src}
                    alt={translate(product.title) ?? product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            
            {/* Right Side - Product Information */}
            <div className="flex-1 max-w-lg">

          {/* Brand and Product Name */}
          <div className="mb-4">
            <h1 className="text-[22px] font-normal text-(--color-preto) mb-1 leading-tight">
              {translate(product.title)}
            </h1>
            {product.subtitle && (
              <p className="text-[12px] text-(--color-preto) font-normal">
                {translate(product.subtitle)}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.originalPrice && product.discountedPrice && (
              <div className="flex items-baseline gap-3 mb-1">
                {product.originalPrice !== product.discountedPrice && (
                  <span className="text-[12px] text-[#666] line-through">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-[22px] font-normal text-[#d32f2f] leading-tight">
                  {product.discountedPrice}
                </span>
              </div>
            )}
            {!product.originalPrice && product.price && (
              <span className="text-[28px] font-bold text-(--color-preto) leading-tight">
                {product.price}
              </span>
            )}
            <p className="text-[12px] text-[#666] mt-1">
              {translate("Import duties included")}
            </p>
          </div>

         

         

              {/* Product Details Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-[16px] font-semibold text-(--color-preto) mb-4">
                  {translate("THE DETAILS")}
                </h3>
                <div className="space-y-3 text-[13px] text-(--color-preto)">
                  <div>
                    <p className="font-semibold mb-1">{translate("Highlights")}</p>
                    <p>||Merino||Merino|MulticolourMerino</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{translate("Composition")}</p>
                    <p>Cashmere 100%</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{translate("Washing instructions")}</p>
                    <p>{translate("Read Manufacturer Guidelines")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

