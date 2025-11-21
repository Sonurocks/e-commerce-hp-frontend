"use client";

import React, { useState, useEffect, useRef } from "react";
import { ProductDetail } from "@/constants/products";
import { GoHeart } from "react-icons/go";
import { FaToggleOn } from "react-icons/fa";
import { PiCoatHangerBold } from "react-icons/pi";
import Image from "next/image";
import ProductDetailAdditionalSection from "./ProductDetailAdditionalSection";
import WhyFarfetchSection from "./WhyFarfetchSection";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import ContactSupportSection from "./ContactSupportSection";
const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

export default function ProductDetailSection({
  product,
}: {
  product: ProductDetail;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<{
    details: boolean;
    sizeFit: boolean;
    delivery: boolean;
  }>({
    details: false,
    sizeFit: false,
    delivery: false,
  });
  const [unitToggle, setUnitToggle] = useState<"cm" | "in">("cm");

  // Size options with prices
  const sizeOptions = [
    { size: "XS", price: "£220", available: true },
    { size: "S", price: "£220", available: true },
    { size: "M", price: "£232", available: true },
    { size: "L", price: null, available: false },
    { size: "XL", price: "£232", available: true },
  ];

  const currentImage = product.images?.[selectedImageIndex] || product.image;
  const hasMultipleImages = product.images && product.images.length > 1;

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
  };

  const sizeDropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div style={{ fontFamily: fontStack }}>
      {/* Images and Product Info Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Product Images */}
        <div className="flex-[2] ml-16">
        {/* Main Images - Side by Side (Product Shot and Model Shot) */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Product Shot (Left) */}
          <div className="relative w-full h-[480px] flex items-center justify-center bg-white overflow-hidden group cursor-pointer">
            <Image
              src={product.image.src}
              alt={product.title}
              fill
              className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          {/* Model Shot (Right) */}
          {product.hoverImage && (
            <div className="relative w-full h-[480px] flex items-center justify-center bg-white overflow-hidden group cursor-pointer">
              <Image
                src={product.hoverImage.src}
                alt={`${product.title} on model`}
                fill
                className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          )}
        </div>

        {/* Three Bottom Images - Dynamic from product.images */}
        {(() => {
          // Get detail images (images beyond the first 2: main and hover)
          const detailImages = product.images && product.images.length > 2 
            ? product.images.slice(2, 5) 
            : [];
          
          // If we have detail images, show them
          if (detailImages.length > 0) {
            return (
              <div className="grid grid-cols-3 gap-4 mt-1">
                {detailImages.map((image, index) => (
                  <div
                    key={`detail-${index}`}
                    className="relative w-full h-[280px] flex items-center justify-center bg-white overflow-hidden group cursor-pointer"
                  >
                    <Image
                      src={image.src}
                      alt={`${product.title} detail ${index + 1}`}
                      fill
                      className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            );
          }
          
          // Fallback: If no detail images, show main/hover images to maintain layout
          // This ensures the section always displays (matching original behavior)
          const fallbackImages = [
            product.image,
            product.hoverImage || product.image,
            product.image
          ].slice(0, 3);
          
          return (
            <div className="grid grid-cols-3 gap-4 mt-1">
              {fallbackImages.map((image, index) => (
                <div
                  key={`fallback-detail-${index}`}
                  className="relative w-full h-[280px] flex items-center justify-center bg-white overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={`${product.title} detail ${index + 1}`}
                    fill
                    className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          );
        })()}

        </div>

      {/* Right Side - Product Information */}
      <div className="flex-1 max-w-md sticky top-8 self-start">
        {/* Brand and Product Name */}
        <div className="mb-6">
          <h1 className="text-[22px] font-nromal text-(--color-preto) mb-1 leading-tight">
            {product.title}
          </h1>
          {product.subtitle && (
            <p className="text-[12px] text-(--color-preto) font-thin">{product.subtitle}</p>
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
          <p className="text-[12px] text-[#666] mt-1">Import duties included</p>
        </div>

        {/* Promotional Message */}
        {(product.badge === "Extra 25% off" || product.badge === "Previous Season" || product.badge === "New Season") && (
          <div className="bg-[#e5e5e5] py-2.5 px-4 mb-4 border rounded-lg border-[#d0d0d0]">
            <p className="text-[13px] text-(--color-preto) leading-tight">
              <span className="font-bold">Extra 20% off</span> Selected sale items only. Discount applied at checkout
            </p>
          </div>
        )}

        {/* Size Selection */}
        <div className="mb-6">
          <div className="relative" ref={sizeDropdownRef}>
            <button
              onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
              className="w-full px-3 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:border-[#222] bg-white cursor-pointer text-[13px] text-(--color-preto) flex items-center justify-between"
            >
              <span className={selectedSize ? "font-semibold" : "text-gray-400"}>
                {selectedSize || "Select size"}
              </span>
              <svg
                className={`w-3 h-3 transition-transform ${isSizeDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isSizeDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#ccc] rounded-lg shadow-lg">
                <div className="p-2">
                  <p className="text-[11px] text-gray-400 mb-2">Select size</p>
                  <div className="space-y-1">
                    {sizeOptions.map((option) => (
                      <button
                        key={option.size}
                        onClick={() => {
                          if (option.available) {
                            setSelectedSize(option.size);
                            setIsSizeDropdownOpen(false);
                          }
                        }}
                        disabled={!option.available}
                        className={`w-full flex items-center justify-between py-1 px-2 text-left ${
                          selectedSize === option.size
                            ? "bg-gray-100 font-semibold"
                            : option.available
                            ? "hover:bg-gray-50"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <span className="font-semibold text-[13px]">{option.size}</span>
                        {option.price && (
                          <span className="text-[13px] text-(--color-preto)">{option.price}</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
                    <p className="text-[11px] text-(--color-preto)">
                      Different to <span className="font-bold">£232</span>?{" "}
                      <a href="#" className="underline">
                        Find out why
                      </a>
                    </p>
                    <a href="#" className="text-[11px] text-(--color-preto) underline block">
                      Size missing?
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            className="flex-[3] bg-[#222] text-white py-2 px-6 font-semibold rounded-lg text-[15px] hover:bg-[#333] transition-colors"
            disabled={!selectedSize}
          >
            Add To Bag
          </button>
          <button
            onClick={handleWishlistClick}
            className="flex-[1] bg-white text-(--color-preto) border-2 border-[#222] rounded-lg py-2 px-4 font-semibold text-[15px] hover:bg-[#f5f5f5] transition-colors flex items-center justify-center gap-2"
          >
            <GoHeart
              className={`w-5 h-5 ${isWishlisted ? "fill-[#222]" : ""}`}
              strokeWidth={1.0}
            />
            Wishlist
          </button>
        </div>

        {/* Estimated Delivery */}
        {product.estimatedDelivery && (
          <div className="text-[13px] text-[#666]">
            Estimated delivery {product.estimatedDelivery}
          </div>
        )}
      </div>
      </div>

      {/* Full Width Sections - Breadcrumb and Collapsible Sections */}
      <div className="w-full mt-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="text-[13px] text-[#666]">
            <a href="#" className="hover:text-(--color-preto)">Women Home</a>
            <span className="mx-2">{">"}</span>
            <a href="#" className="hover:text-(--color-preto)">{product.title}</a>
            <span className="mx-2">{">"}</span>
            <a href="#" className="hover:text-(--color-preto)">Clothing</a>
            <span className="mx-2">{">"}</span>
            <span className="hover:text-(--color-preto)">Polo Tops</span>
          </nav>
        </div>

        {/* Collapsible Sections */}
        <div>
          {/* THE DETAILS Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() =>
                setOpenSections((prev) => ({ ...prev, details: !prev.details }))
              }
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <h3 className="text-[13px] font-thin text-(--color-preto)">THE DETAILS</h3>
              <svg
                className={`w-4 h-4 text-(--color-preto) transition-transform ${
                  openSections.details ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openSections.details && (
              <div className="pb-4 text-[13px] text-[#666]">
                <div className="flex gap-10">
                  {/* Left Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-normal text-(--color-preto) mb-1">{product.title}</p>
                      <p>{product.subtitle}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">Highlights</p>
                      <p>||Merino||Merino|MulticolourMerino</p>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">Composition</p>
                      <p>Cashmere 100%</p>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">Washing instructions</p>
                      <p>Read Manufacturer Guidelines</p>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">Wearing</p>
                      <p>The model is 1.75 m wearing size S</p>
                    </div>
                    
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SIZE & FIT Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() =>
                setOpenSections((prev) => ({ ...prev, sizeFit: !prev.sizeFit }))
              }
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <h3 className="text-[13px] font-thin text-(--color-preto)">SIZE & FIT</h3>
              <svg
                className={`w-4 h-4 text-(--color-preto) transition-transform ${
                  openSections.sizeFit ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openSections.sizeFit && (
              <div className="pb-4 text-[13px] text-(--color-preto)">
                <div className="flex gap-6">
                  {/* Left Column - Model Measurements */}
                  <div className="flex-1">
                    <div className="flex items-center gap-50 mb-3">
                      <h4 className="font-semibold text-[13px] text-(--color-preto)">Model Measurements</h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-[13px] ${unitToggle === "in" ? "text-(--color-preto)" : "text-gray-400"}`}>in</span>
                        <button
                          onClick={() => setUnitToggle(unitToggle === "in" ? "cm" : "in")}
                          className="focus:outline-none -ml-1"
                        >
                          <FaToggleOn
                            className="text-3xl text-(--color-preto) transition-colors"
                          />
                        </button>
                        <span className={`text-[11px] ${unitToggle === "cm" ? "text-(--color-preto)" : "text-gray-400"}`}>cm</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex gap-15 text-[13px]">
                        <span>Height:</span>
                        <span>1.75 m</span>
                      </div>
                      <div className="flex gap-10 text-[13px]">
                        <span>Bust/chest:</span>
                        <span>{unitToggle === "cm" ? "88 cm" : "35 in"}</span>
                      </div>
                      <div className="flex gap-15 text-[13px]">
                        <span>Hips:</span>
                        <span>{unitToggle === "cm" ? "93 cm" : "37 in"}</span>
                      </div>
                      <div className="flex gap-15 text-[13px]">
                        <span>Waist:</span>
                        <span>{unitToggle === "cm" ? "67 cm" : "26 in"}</span>
                      </div>
                    </div>
                    <p className="mb-3 text-[13px]">The model is 1.75 m wearing size S.</p>
                    <p className="text-[13px]">
                      Still need help?{" "}
                      <a href="#" className="underline">
                        Try our size guide
                      </a>
                    </p>
                  </div>

                  {/* Right Column - Returns Policy */}
                  <div className="flex-[0.8]">
                    <div className="bg-[#f5f5f5] p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <PiCoatHangerBold
                          className="w-4 h-4 text-(--color-preto) mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-normal text-[13px] text-(--color-preto) mb-2">
                            SHOP NOW, DECIDE LATER
                          </h4>
                          <p className="text-[13px] text-(--color-preto) mb-2 leading-relaxed">
                            The perfect fit is just a try-on away. We offer{" "}
                            <span className="font-bold">30-day free international returns</span> and{" "}
                            <span className="font-bold">at-home collection.</span>
                          </p>
                          <a href="#" className="text-[13px] underline">
                            Know More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DELIVERY, RETURNS & SELLER Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() =>
                setOpenSections((prev) => ({ ...prev, delivery: !prev.delivery }))
              }
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <h3 className="text-[13px] font-thin text-(--color-preto)">
                DELIVERY, RETURNS & SELLER
              </h3>
              <svg
                className={`w-4 h-4 text-(--color-preto) transition-transform ${
                  openSections.delivery ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openSections.delivery && (
              <div className="pb-4 text-[13px] text-(--color-preto)">
                <div className="flex gap-12">
                  {/* Left Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">We ve got your back</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>One delivery fee to most locations (check our Orders & Delivery page)</li>
                        <li>Free returns within 30 days (excludes final sale and made-to-order items, face masks and certain products containing hazardous or flammable materials, such as fragrances and aerosols)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">Import duties information</p>
                      <p>
                        Let us handle the legwork. Delivery duties are included in the item price when shipping to all EU countries (excluding the Canary Islands), plus The United Kingdom, USA, Canada, China Mainland, Australia, New Zealand, Puerto Rico, Switzerland, Singapore, Republic Of Korea, Kuwait, Mexico, Qatar, India, Norway, Saudi Arabia, Taiwan Region, Thailand, U.A.E., Japan, Brazil, Isle of Man, San Marino, Colombia, Chile, Argentina, Egypt, Lebanon, Hong Kong SAR, and Bahrain. All import duties are included in your order – the price you see is the price you pay.
                      </p>
                    </div>
                  </div>
                  
                  {/* Middle Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">Estimated delivery</p>
                      <p>Standard: 26 Nov - 28 Nov</p>
                      <p>Express: 24 Nov - 25 Nov</p>
                    </div>
                    <div>
                      <a href="#" className="underline">Seller details</a>
                    </div>
                    <div>
                      <a href="#" className="underline">Manufacturer details</a>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">Need more information?</p>
                      <ul className="space-y-1">
                        <li>
                          <a href="#" className="underline">Orders & delivery</a>
                        </li>
                        <li>
                          <a href="#" className="underline">Returns & refunds</a>
                        </li>
                        <li>
                          <a href="#" className="underline">Duties & taxes</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Section */}
      <ProductDetailAdditionalSection product={product} />

      {/* Why Farfetch Section */}
      <WhyFarfetchSection />

      {/* Download App Banner */}
      <div className="border-t border-(--colorGrey) mt-6">
        <DownloadAppBanner />
      </div>

      {/* Contact Support Section */}
      <ContactSupportSection />
    </div>
  );
}

