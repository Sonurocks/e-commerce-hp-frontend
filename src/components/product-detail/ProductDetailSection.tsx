"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ProductDetail } from "@/constants/products";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { PiCoatHangerBold } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductDetailAdditionalSection from "./ProductDetailAdditionalSection";
import WhyFarfetchSection from "./WhyFarfetchSection";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import ContactSupportSection from "./ContactSupportSection";
import ImageZoom, { ZoomedImageView } from "./ImageZoom";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

export default function ProductDetailSection({
  product,
}: {
  product: ProductDetail;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number>(0);
  const [hoveredZoomImage, setHoveredZoomImage] = useState<{ src: string } | null>(null);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number } | null>(null);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState<boolean>(false);
  const [sizeError, setSizeError] = useState<string>("");
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
    { size: "L", price: "£232", available:true },
    { size: "XL", price: "£232", available: true },
  ];

  const { translations } = useLanguage();
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;
  const template = (key: string, params: Record<string, string>) => {
    let value = translate(key) ?? key;
    Object.entries(params).forEach(([placeholder, replacement]) => {
      value = value.replace(`{{${placeholder}}}`, replacement);
    });
    return value;
  };

  const galleryImages = useMemo(() => {
    const uniqueImages: { src: string }[] = [];
    const pushUnique = (image?: { src: string }) => {
      if (!image) return;
      if (!uniqueImages.some((img) => img.src === image.src)) {
        uniqueImages.push(image);
      }
    };
    pushUnique(product.image);
    pushUnique(product.hoverImage);
    product.images?.forEach(pushUnique);
    return uniqueImages.length > 0 ? uniqueImages : [product.image];
  }, [product]);

  const selectedImage = galleryImages[selectedImageIndex] || galleryImages[0] || product.image;

  const handleWishlistClick = () => {
    toggleWishlist(product);
  };
  const wishlistActive = isWishlisted(product.id);

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError("Please select size before proceed");
      return;
    }
    setSizeError("");
    addItem(product, selectedSize, 1);
    router.push("/cart");
  };

  const sizeDropdownRef = useRef<HTMLDivElement>(null);
  const zoomLevel = 2.5;
  const magnifierSize = 150;

  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedThumbnailIndex(0);
  }, [galleryImages]);

  useEffect(() => {
    setHoveredZoomImage(null);
    setZoomPosition(null);
  }, [selectedImageIndex]);

  const handleImageSelect = (thumbnailIdx: number, sourceIndex: number) => {
    if (sourceIndex < 0 || sourceIndex >= galleryImages.length) return;
    setSelectedImageIndex(sourceIndex);
    setSelectedThumbnailIndex(thumbnailIdx);
  };

  const thumbnailImages = useMemo(() => {
    if (galleryImages.length === 0) return [];

    // Return only the images provided by the backend, no repeating
    return galleryImages.map((image, sourceIndex) => ({
      image,
      sourceIndex,
      key: `thumb-${sourceIndex}`,
    }));
  }, [galleryImages]);

  const handleThumbnailKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    thumbnailIdx: number,
    sourceIndex: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleImageSelect(thumbnailIdx, sourceIndex);
    }
  };

  const createHoverHandler =
    (imageData: { src: string }) =>
    (isHovered: boolean) => {
      setHoveredZoomImage((current) => {
        if (isHovered) {
          return imageData;
        }
        return current?.src === imageData.src ? null : current;
      });
    };

  const createPositionHandler =
    (imageData: { src: string }) =>
    (position: { x: number; y: number } | null) => {
      setZoomPosition(position);
      if (!position) {
        setHoveredZoomImage((current) =>
          current?.src === imageData.src ? null : current
        );
      } else {
        setHoveredZoomImage(imageData);
      }
    };

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
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        {/* Left Side - Product Images */}
        <div className="flex-[1.6] lg:ml-6">
          {/* Main Image with Zoom Feature */}
          <div className="relative mb-6">
            <ImageZoom
              key={selectedImage?.src || "selected-image"}
              image={selectedImage}
              alt={translate(product.title) ?? product.title}
              zoomLevel={zoomLevel}
              magnifierSize={magnifierSize}
              heightClass="h-[380px]"
              onHoverChange={createHoverHandler(selectedImage)}
              onPositionChange={createPositionHandler(selectedImage)}
            />
          </div>

          {/* Bottom Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {thumbnailImages.map(({ image, sourceIndex, key }, idx) => (
              <button
                key={`${key}-${image?.src || idx}`}
                type="button"
                onClick={() => handleImageSelect(idx, sourceIndex)}
                onKeyDown={(event) => handleThumbnailKeyDown(event, idx, sourceIndex)}
                className={`relative border-2 rounded-lg overflow-hidden focus:outline-none focus-visible:border-black h-[120px] ${
                  selectedThumbnailIndex === idx ? "border-black" : "border-gray-200"
                }`}
              >
                {image ? (
                  <Image
                    src={image.src}
                    alt={`${translate(product.title) ?? product.title} detail ${sourceIndex + 1}`}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </button>
            ))}
          </div>
        </div>

      {/* Right Side - Product Information */}
      <div className="flex-[1.2] max-w-lg sticky top-8 self-start lg:ml-4 relative min-h-[420px]">
        {hoveredZoomImage && zoomPosition && (
          <div className="absolute inset-0 z-20  flex items-center justify-center shadow-lg">
            <ZoomedImageView
              image={hoveredZoomImage}
              zoomLevel={zoomLevel}
              position={zoomPosition}
              heightClass="h-full"
            />
          </div>
        )}
        <div
          className={`transition-opacity ${
            hoveredZoomImage && zoomPosition ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Brand and Product Name */}
          <div className="mb-6">
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

        {/* Booking for Ex-Showroom Price */}
        <div className="mb-2">
          
          <Link
            href={`/product-detail/${product.id}/store`}
            className="text-[14px] text-blue-900 hover:text-blue-800 underline"
          >
            {translate("Visit the Store")}
          </Link>
        </div>

        {/* Promotional Message */}
        {(product.badge === "Extra 25% off" || product.badge === "Previous Season" || product.badge === "New Season") && (
          <div className="bg-[#e5e5e5] py-2.5 px-4 mb-4 border rounded-lg border-[#d0d0d0]">
            <p className="text-[13px] text-(--color-preto) leading-tight">
              <span className="font-bold">{translate("Extra 20% off")}</span>{" "}
              {translate("Selected sale items only. Discount applied at checkout")}
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
                {selectedSize || translate("Select size")}
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
              <div className="absolute z-10 w-full mt-1 bg-(--color-branco) border border-[#ccc] rounded-lg shadow-lg">
                <div className="p-2">
                  <p className="text-[11px] text-gray-400 mb-2">
                    {translate("Select size")}
                  </p>
                  <div className="space-y-1">
                    {sizeOptions.map((option) => (
                      <button
                        key={option.size}
                        onClick={() => {
                          if (option.available) {
                            setSelectedSize(option.size);
                            setIsSizeDropdownOpen(false);
                            setSizeError("");
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
                      {template("Different to {{price}}? Find out why", { price: "£232" })}
                    </p>
                    <a href="#" className="text-[14px] text-(--color-preto) underline block">
                      {translate("Size missing?")}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          {sizeError && (
            <div className="text-red-600 text-sm font-medium">
              {sizeError}
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleAddToBag}
              className="flex-[3] bg-[#222] text-white py-2 px-6 font-semibold rounded-lg text-[15px] hover:bg-[#333] transition-colors"
            >
              {translate("Add To Bag")}
            </button>
          <button
            onClick={handleWishlistClick}
            className="flex-[1]  text-preto border-2 border-[#222] rounded-lg py-2 px-4 font-semibold text-[15px] transition-colors flex items-center justify-center gap-2"
          >
            {wishlistActive ? (
              <GoHeartFill className="w-5 h-5 text-preto" strokeWidth={0} />
            ) : (
              <GoHeart className="w-5 h-5 text-preto" strokeWidth={1.0} />
            )}
            {translate("Wishlist")}
          </button>
          </div>
        </div>

        {/* Estimated Delivery */}
        {product.estimatedDelivery && (
          <div className="text-[13px] text-[#666]">
            {template("Estimated delivery {{date}}", {
              date: product.estimatedDelivery,
            })}
          </div>
        )}
        </div>
      </div>
      </div>

      {/* Full Width Sections - Breadcrumb and Collapsible Sections */}
      <div className="w-full mt-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="text-[13px] text-[#666]">
            <a href="#" className="hover:text-(--color-preto)">
              {translate("Women Home")}
            </a>
            <span className="mx-2">{">"}</span>
            <a href="#" className="hover:text-(--color-preto)">{product.title}</a>
            <span className="mx-2">{">"}</span>
            <a href="#" className="hover:text-(--color-preto)">
              {translate("Clothing")}
            </a>
            <span className="mx-2">{">"}</span>
            <span className="hover:text-(--color-preto)">{translate("Polo Tops")}</span>
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
              <h3 className="text-[13px] font-thin text-(--color-preto)">
                {translate("THE DETAILS")}
              </h3>
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
              <div className="pb-4 text-[13px] text-(--color-preto) ">
                <div className="flex gap-10">
                  {/* Left Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-normal text-(--color-preto) mb-1">
                        {translate(product.title)}
                      </p>
                      <p className="font-normal">{translate(product.subtitle)}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">
                        {translate("Highlights")}
                      </p>
                      <p>||Merino||Merino|MulticolourMerino</p>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">
                        {translate("Composition")}
                      </p>
                      <p>Cashmere 100%</p>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">
                        {translate("Washing instructions")}
                      </p>
                      <p>{translate("Read Manufacturer Guidelines")}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">
                        {translate("Wearing")}
                      </p>
                      <p>{translate("The model is 1.75 m wearing size S.")}</p>
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
              <h3 className="text-[13px] font-thin text-(--color-preto)">
                {translate("SIZE & FIT")}
              </h3>
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
                      <h4 className="font-semibold text-[13px] text-(--color-preto)">
                        {translate("Model Measurements")}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[13px] ${
                            unitToggle === "in" ? "text-(--color-preto)" : "text-(--colorhina)"
                          }`}
                        >
                          in
                        </span>
                        <button
                          onClick={() =>
                            setUnitToggle(unitToggle === "in" ? "cm" : "in")
                          }
                          className="focus:outline-none -ml-1"
                        >
                          {unitToggle === "cm" ? (
                            <MdToggleOn className="text-3xl text-(--color-preto) transition-colors" />
                          ) : (
                            <MdToggleOff className="text-3xl text-(--color-preto) transition-colors" />
                          )}
                        </button>
                        <span
                          className={`text-[11px] ${
                            unitToggle === "cm" ? "text-(--color-preto)" : "text-gray-400"
                          }`}
                        >
                          cm
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex gap-15 text-[13px]">
                        <span>{translate("Height:")}</span>
                        <span>1.75 m</span>
                      </div>
                      <div className="flex gap-10 text-[13px]">
                        <span>{translate("Bust/chest:")}</span>
                        <span>{unitToggle === "cm" ? "88 cm" : "35 in"}</span>
                      </div>
                      <div className="flex gap-15 text-[13px]">
                        <span>{translate("Hips:")}</span>
                        <span>{unitToggle === "cm" ? "93 cm" : "37 in"}</span>
                      </div>
                      <div className="flex gap-15 text-[13px]">
                        <span>{translate("Waist:")}</span>
                        <span>{unitToggle === "cm" ? "67 cm" : "26 in"}</span>
                      </div>
                    </div>
                    <p className="mb-3 text-[13px]">
                      {translate("The model is 1.75 m wearing size S.")}
                    </p>
                    <p className="text-[13px]">
                      {translate("Still need help?")}{" "}
                      <a href="#" className="underline">
                        {translate("Try our size guide")}
                      </a>
                    </p>
                  </div>

                  {/* Right Column - Returns Policy */}
                  <div className="flex-[0.8]">
                    <div className="bg-(--color-branco) p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <PiCoatHangerBold
                          className="w-4 h-4 text-(--color-preto) mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-normal text-[13px] text-(--color-preto) mb-2">
                            {translate("SHOP NOW, DECIDE LATER")}
                          </h4>
                          <p className="text-[13px] text-(--color-preto) mb-2 leading-relaxed">
                            {translate(
                              "The perfect fit is just a try-on away. We offer 30-day free international returns and at-home collection."
                            )}
                          </p>
                          <a href="#" className="text-[13px] underline">
                            {translate("Know More")}
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
                {translate("DELIVERY, RETURNS & SELLER")}
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
                      <p className="font-semibold text-(--color-preto) mb-1">
                        {translate("We've got your back")}
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          {translate(
                            "One delivery fee to most locations (check our Orders & Delivery page)"
                          )}
                        </li>
                        <li>
                          {translate(
                            "Free returns within 30 days (excludes final sale and made-to-order items, face masks and certain products containing hazardous or flammable materials, such as fragrances and aerosols)"
                          )}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">
                        {translate("Import duties information")}
                      </p>
                      <p>
                        {translate(
                          "Let us handle the legwork. Delivery duties are included in the item price when shipping to all EU countries (excluding the Canary Islands), plus The United Kingdom, USA, Canada, China Mainland, Australia, New Zealand, Puerto Rico, Switzerland, Singapore, Republic Of Korea, Kuwait, Mexico, Qatar, India, Norway, Saudi Arabia, Taiwan Region, Thailand, U.A.E., Japan, Brazil, Isle of Man, San Marino, Colombia, Chile, Argentina, Egypt, Lebanon, Hong Kong SAR, and Bahrain. All import duties are included in your order – the price you see is the price you pay."
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {/* Middle Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">
                        {translate("Estimated delivery")}
                      </p>
                      <p>
                        {translate("Standard:")} 26 Nov - 28 Nov
                      </p>
                      <p>
                        {translate("Express:")} 24 Nov - 25 Nov
                      </p>
                    </div>
                    <div>
                      <a href="#" className="underline">{translate("Seller details")}</a>
                    </div>
                    <div>
                      <a href="#" className="underline">
                        {translate("Manufacturer details")}
                      </a>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-semibold text-(--color-preto) mb-1">
                        {translate("Need more information?")}
                      </p>
                      <ul className="space-y-1">
                        <li>
                          <a href="#" className="underline">
                            {translate("Orders & delivery")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="underline">
                            {translate("Returns & refunds")}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="underline">
                            {translate("Duties & taxes")}
                          </a>
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

