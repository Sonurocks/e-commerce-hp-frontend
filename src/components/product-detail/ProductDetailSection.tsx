"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import Dropdown from "../common/Dropdown";
import Accordion from "../common/Accordion";
import Button from "../common/Button";
import styles from "./ProductDetailSection.module.css";
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


  return (
    <div style={{ fontFamily: fontStack }} className={styles.mainWrapper}>
      {/* Images and Product Info Section */}
      <div className={`flex flex-col lg:flex-row gap-6 lg:items-start ${styles.contentFlex}`}>
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
          <Dropdown
            isOpen={isSizeDropdownOpen}
            onClose={() => setIsSizeDropdownOpen(false)}
            contentClassName="z-10 w-full  bg-(--color-branco) border border-[#ccc] rounded-lg shadow-lg"
            content={
              <div className="p-3">
                <p className="text-[11px] text-gray-400 mb-0">
                  {translate("Select size")}
                </p>
                <div className="space-y-0">
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
                      className={`w-full flex items-center justify-between py-1 px-3 text-left ${
                        selectedSize === option.size
                          ? "bg-gray-100 font-semibold text-gray-900"
                          : !option.available
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <span className={`font-semibold text-[13px] ${selectedSize === option.size ? "text-gray-900" : ""}`}>{option.size}</span>
                      {option.price && (
                        <span className={`text-[13px] ${selectedSize === option.size ? "text-gray-900" : "text-(--color-preto)"}`}>{option.price}</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
                  <p className="text-[11px] text-(--color-preto)">
                    {template("Different to {{price}}? Find out why", { price: "£232" })}
                  </p>
                  <Link href="#" className="text-[14px] text-(--color-preto) underline block">
                    {translate("Size missing?")}
                  </Link>
                </div>
              </div>
            }
          >
            <button
              onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
              className="w-full px-4 py-3 border border-[#ccc] rounded-lg focus:outline-none focus:border-[#222]  cursor-pointer text-[13px] text-(--color-preto) flex items-center justify-between"
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
          </Dropdown>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          {sizeError && (
            <div className="text-red-600 text-sm font-medium">
              {sizeError}
            </div>
          )}
          <div className="flex gap-3">
            <Button
              onClick={handleAddToBag}
              variant="primary"
              className="flex-[3] py-2 px-6 text-[15px]"
            >
              {translate("Add To Bag")}
            </Button>
            <Button
              onClick={handleWishlistClick}
              variant="outline"
              leftIcon={
                wishlistActive ? (
                  <GoHeartFill className="w-5 h-5 text-preto" strokeWidth={0} />
                ) : (
                  <GoHeart className="w-5 h-5 text-preto" strokeWidth={1.0} />
                )
              }
              className="flex-[1] py-2 px-4 text-[15px] hover:bg-transparent focus:bg-transparent"
            >
              {translate("Wishlist")}
            </Button>
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
      <div className={`w-full mt-8 ${styles.collapsibleContainer}`}>
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className={`text-[13px] text-[#666] ${styles.breadcrumb}`}>
            <Link href="#" className="hover:text-(--color-preto)">
              {translate("Women Home")}
            </Link>
            <span className="mx-2">{">"}</span>
            <Link href="#" className="hover:text-(--color-preto)">{product.title}</Link>
            <span className="mx-2">{">"}</span>
            <Link href="#" className="hover:text-(--color-preto)">
              {translate("Clothing")}
            </Link>
            <span className="mx-2">{">"}</span>
            <span className="hover:text-(--color-preto)">{translate("Polo Tops")}</span>
          </nav>
        </div>

        {/* Collapsible Sections */}
        <div>
          {/* THE DETAILS Section */}
          <Accordion
            title={translate("THE DETAILS")}
            isOpen={openSections.details}
            onToggle={() =>
              setOpenSections((prev) => ({ ...prev, details: !prev.details }))
            }
            className={styles.collapsibleSection}
            contentClassName=""
          >
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
                  <p>{translate("||Merino||Merino|MulticolourMerino")}</p>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="flex-1 space-y-3">
                <div>
                  <p className="font-semibold text-(--color-preto) mb-1">
                    {translate("Composition")}
                  </p>
                  <p>{translate("Cashmere 100%")}</p>
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
          </Accordion>

          {/* SIZE & FIT Section */}
          <Accordion
            title={translate("SIZE & FIT")}
            isOpen={openSections.sizeFit}
            onToggle={() =>
              setOpenSections((prev) => ({ ...prev, sizeFit: !prev.sizeFit }))
            }
            className={styles.collapsibleSection}
            contentClassName=""
          >
            <div className={`flex gap-6 ${styles.sizeFitContent}`}>
              {/* Left Column - Model Measurements */}
              <div className={`flex-1 ${styles.sizeFitLeft}`}>
                <div className={`flex items-center gap-50 mb-3 ${styles.sizeFitHeader}`}>
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
                  <div className={`flex gap-15 text-[13px] ${styles.measurementItem}`}>
                    <span>{translate("Height:")}</span>
                    <span>1.75 m</span>
                  </div>
                  <div className={`flex gap-10 text-[13px] ${styles.measurementItem}`}>
                    <span>{translate("Bust/chest:")}</span>
                    <span>{unitToggle === "cm" ? "88 cm" : "35 in"}</span>
                  </div>
                  <div className={`flex gap-15 text-[13px] ${styles.measurementItem}`}>
                    <span>{translate("Hips:")}</span>
                    <span>{unitToggle === "cm" ? "93 cm" : "37 in"}</span>
                  </div>
                  <div className={`flex gap-15 text-[13px] ${styles.measurementItem}`}>
                    <span>{translate("Waist:")}</span>
                    <span>{unitToggle === "cm" ? "67 cm" : "26 in"}</span>
                  </div>
                </div>
                <p className="mb-3 text-[13px]">
                  {translate("The model is 1.75 m wearing size S.")}
                </p>
                <p className="text-[13px]">
                  {translate("Still need help?")}{" "}
                  <Link href="#" className="underline">
                    {translate("Try our size guide")}
                  </Link>
                </p>
              </div>

              {/* Right Column - Returns Policy */}
              <div className={`flex-[0.8] ${styles.sizeFitRight}`}>
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
                      <Link href="#" className="text-[13px] underline">
                        {translate("Know More")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>

          {/* DELIVERY, RETURNS & SELLER Section */}
          <Accordion
            title={translate("DELIVERY, RETURNS & SELLER")}
            isOpen={openSections.delivery}
            onToggle={() =>
              setOpenSections((prev) => ({ ...prev, delivery: !prev.delivery }))
            }
            className={styles.collapsibleSection}
            contentClassName=""
          >
            <div className={`flex gap-12 ${styles.deliveryContent}`}>
              {/* Left Column */}
              <div className={`flex-1 space-y-3 ${styles.deliveryColumn}`}>
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
              <div className={`flex-1 space-y-3 ${styles.deliveryColumn}`}>
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
                  <Link href="#" className="underline">{translate("Seller details")}</Link>
                </div>
                <div>
                  <Link href="#" className="underline">
                    {translate("Manufacturer details")}
                  </Link>
                </div>
              </div>
              
              {/* Right Column */}
              <div className={`flex-1 space-y-3 ${styles.deliveryColumn}`}>
                <div>
                  <p className="font-semibold text-(--color-preto) mb-1">
                    {translate("Need more information?")}
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <Link href="#" className="underline">
                        {translate("Orders & delivery")}
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="underline">
                        {translate("Returns & refunds")}
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="underline">
                        {translate("Duties & taxes")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Accordion>
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

