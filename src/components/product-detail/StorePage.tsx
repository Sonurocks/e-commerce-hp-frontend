"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { ProductDetail, productsById } from "@/constants/products";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

import VendorDetailDrawer from "./VendorDetailDrawer";
import ProductCard from "@/components/department/ProductCard";
import { Product } from "@/constants/department";
import bannerImage from "@/assets/banner.png";
import { FiChevronDown } from "react-icons/fi";

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

export default function StorePage({ product }: { product: ProductDetail }) {
  const { translations } = useLanguage();
  const router = useRouter();
  const [isProductDetailDrawerOpen, setIsProductDetailDrawerOpen] = useState(false);
  const [isVendorDetailDrawerOpen, setIsVendorDetailDrawerOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  // Extract brand name from product title (assuming format like "BRAND Product Name")
  const parseBrand = (title: string): string => {
    const brandPatterns = [
      "OUR LEGACY",
      "Miu Miu",
      "SOREL",
      "GUCCI",
      "PRADA",
      "BALENCIAGA",
      "SAINT LAURENT",
      "BURBERRY",
      "DIOR",
      "CHANEL",
      "LOUIS VUITTON",
      "VERSACE",
      "FENDI",
      "HERMÈS",
      "VALENTINO",
      "GIVENCHY",
      "DOLCE & GABBANA",
      "ARMANI",
      "TOM FORD",
      "BOTTEGA VENETA",
      "TRIUMPH",
    ];

    for (const brand of brandPatterns) {
      if (title.toUpperCase().startsWith(brand.toUpperCase())) {
        return brand;
      }
    }

    // Fallback: use first word as brand
    const words = title.split(" ");
    return words[0] || "Store";
  };

  const brandName = parseBrand(product.title);
  const storeName = `${brandName} Store`;

  // Get product images for display
  const mainImage = product.image;
  const secondImage = product.hoverImage || product.images?.[0] || product.image;
  const thirdImage = product.images?.[1] || product.hoverImage || product.image;

  // Get related products from the same brand - converted to Product type for ProductCard
  const relatedProducts = useMemo(() => {
    const allProducts = Object.values(productsById);
    return allProducts
      .filter((p) => {
        const pBrand = parseBrand(p.title);
        return pBrand === brandName && p.id !== product.id;
      })
      .slice(0, 4) // Get exactly 4 related products
      .map((p): Product => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        price: p.price || p.discountedPrice || p.originalPrice,
        image: p.image,
        hoverImage: p.hoverImage,
        badge: p.badge,
      }));
  }, [product.id, brandName]);

  // Get best sellers from the same brand - converted to Product type for ProductCard
  const bestSellers = useMemo(() => {
    const allProducts = Object.values(productsById);
    return allProducts
      .filter((p) => {
        const pBrand = parseBrand(p.title);
        return pBrand === brandName && p.id !== product.id;
      })
      .slice(0, 8) // Get up to 8 best sellers
      .map((p): Product => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        price: p.price || p.discountedPrice || p.originalPrice,
        image: p.image,
        hoverImage: p.hoverImage,
        badge: p.badge,
      }));
  }, [product.id, brandName]);

  // Get recommendations from the same brand - converted to Product type for ProductCard
  const recommendations = useMemo(() => {
    const allProducts = Object.values(productsById);
    return allProducts
      .filter((p) => {
        const pBrand = parseBrand(p.title);
        return pBrand === brandName && p.id !== product.id;
      })
      .slice(4, 12) // Get different products for recommendations
      .map((p): Product => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        price: p.price || p.discountedPrice || p.originalPrice,
        image: p.image,
        hoverImage: p.hoverImage,
        badge: p.badge,
      }));
  }, [product.id, brandName]);

  // Refs for carousel scrolling
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);
  
  // State to track scroll positions
  const [bestSellersScroll, setBestSellersScroll] = useState({ canScrollLeft: false, canScrollRight: false });
  const [recommendationsScroll, setRecommendationsScroll] = useState({ canScrollLeft: false, canScrollRight: false });

  // Check scroll position for carousels
  const checkScrollPosition = (ref: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>, setScrollState: React.Dispatch<React.SetStateAction<{ canScrollLeft: boolean; canScrollRight: boolean }>>) => {
    if (ref?.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setScrollState({
        canScrollLeft: scrollLeft > 0,
        canScrollRight: scrollLeft < scrollWidth - clientWidth - 1
      });
    }
  };

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };

    if (isFilterDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterDropdownOpen]);

  // Update scroll states on mount and scroll
  useEffect(() => {
    const handleBestSellersScroll = () => checkScrollPosition(bestSellersRef, setBestSellersScroll);
    const handleRecommendationsScroll = () => checkScrollPosition(recommendationsRef, setRecommendationsScroll);

    if (bestSellersRef.current) {
      bestSellersRef.current.addEventListener('scroll', handleBestSellersScroll);
      handleBestSellersScroll(); // Initial check
    }
    if (recommendationsRef.current) {
      recommendationsRef.current.addEventListener('scroll', handleRecommendationsScroll);
      handleRecommendationsScroll(); // Initial check
    }

    // Also check on resize
    window.addEventListener('resize', handleBestSellersScroll);
    window.addEventListener('resize', handleRecommendationsScroll);

    return () => {
      if (bestSellersRef.current) {
        bestSellersRef.current.removeEventListener('scroll', handleBestSellersScroll);
      }
      if (recommendationsRef.current) {
        recommendationsRef.current.removeEventListener('scroll', handleRecommendationsScroll);
      }
      window.removeEventListener('resize', handleBestSellersScroll);
      window.removeEventListener('resize', handleRecommendationsScroll);
    };
  }, [bestSellers.length, recommendations.length]);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>, direction: 'left' | 'right', setScrollState: React.Dispatch<React.SetStateAction<{ canScrollLeft: boolean; canScrollRight: boolean }>>) => {
    if (ref?.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      // Update scroll state after a short delay to allow scroll to complete
      setTimeout(() => checkScrollPosition(ref, setScrollState), 100);
    }
  };

  return (
    <div style={{ fontFamily: fontStack }} className="min-h-screen bg-gray-100">
      {/* Banner Section with Background Image and Product Name */}
      <div 
        ref={bannerRef} 
        className="relative w-full h-[400px] md:h-[500px] overflow-hidden"
      >
        <Image
          src={bannerImage}
          alt="Banner"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-(--color-preto)/40"></div>
        {/* Product Name Heading */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[55px] md:text-[64px] font-bold text-(--color-branco) text-center px-4 z-10 ml-8 md:ml-40">
            {translate(product.title) ?? product.title}
          </h1>
        </div>
      </div>

      {/* Vendor Store Header Section - Magicpin Style */}
      <div className="bg-white">
        <div className="w-full px-4 md:px-8 py-6">
          {/* Vendor Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            {/* Vendor Logo and Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl font-bold text-gray-700">{brandName.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{brandName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-700 ml-1">4.3</span>
                  </div>
                  <span className="text-sm text-gray-500">(210 {translate("Reviews") || "Reviews"})</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Delhi • Since 2021 • {translate("Verified Vendor") || "Verified Vendor"}</p>
              </div>
            </div>
          </div>

          {/* Promotional Banners */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="px-4 py-2 bg-orange-100 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-sm font-medium text-orange-700">{translate("Get Best Price!") || "Get Best Price!"}</span>
            </div>
            <div className="px-4 py-2 bg-orange-500 rounded-lg">
              <span className="text-sm font-semibold text-white">{translate("Flat 10% Off") || "Flat 10% Off"}</span>
            </div>
            <div className="px-4 py-2 bg-green-100 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-green-700">{translate("Fast Delivery") || "Fast Delivery"}</span>
            </div>
          </div>

          {/* Navigation Links and Action Buttons */}
          <nav className="flex flex-wrap items-center gap-6 pb-4 border-b border-gray-200 bg-black px-4 py-3 -mx-4 md:-mx-8">
            <Link
              href={`/product-detail/${product.id}/store`}
              className="text-[14px] font-medium text-white border-b-2 border-white pb-1"
            >
              {translate("HOME") || "HOME"}
            </Link>
          
            <button
              onClick={() => {
                setIsProductDetailDrawerOpen(false);
                setIsVendorDetailDrawerOpen(true);
              }}
              className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors"
            >
              {translate("VENDOR DETAILS") || "VENDOR DETAILS"}
            </button>
            {/* <button className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
              {translate("Get Quote") || "Get Quote"}
            </button> */}
            <button className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
              {translate("Call Now") || "Call Now"}
            </button>
            <div className="relative ml-auto" ref={filterDropdownRef}>
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="px-4 py-2 text-[15px] font-medium text-white border border-white rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                {translate("Filter") || "Filter"}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isFilterDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Filter Dropdown */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      {translate("CATEGORY") || "CATEGORY"}
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      {translate("BRAND") || "BRAND"}
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      {translate("COLOUR") || "COLOUR"}
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      {translate("PRICE") || "PRICE"}
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <span className="text-red-600">{translate("SALE") || "SALE"}</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      {translate("PROMOTION") || "PROMOTION"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Product Detail Drawer - Positioned relative to navigation */}
          <div className="relative">
            
            <VendorDetailDrawer
              isOpen={isVendorDetailDrawerOpen}
              onClose={() => setIsVendorDetailDrawerOpen(false)}
              vendorName={brandName}
            />
          </div>
        </div>
      </div>

      {/* About the Vendor Section */}
      <div className="bg-white">
        <div className="w-full px-4 md:px-8 py-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{translate("About the Vendor") || "About the Vendor"}</h3>
          <p className="text-gray-700 leading-relaxed">
            {translate("Trusted supplier of quality products at unbeatable prices. Serving customers with top-notch products and reliable service.") || "Trusted supplier of quality products at unbeatable prices. Serving customers with top-notch products and reliable service."}
          </p>
        </div>
      </div>

      {/* Related Products Gallery - Using ProductCard */}
      {relatedProducts.length > 0 && (
        <div className="bg-(--color-whiteSmoke) py-12">
          <div className="w-full px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  showBadge={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <div className="bg-(--color-branco) py-12">
          <div className="w-full px-4 md:px-8">
            <h2 className="text-[28px] md:text-[32px] font-bold text-(--color-preto) mb-8">
              {translate("Best Sellers from") || "Best Sellers from"} {brandName}
            </h2>
            <div className="relative">
              {bestSellers.length > 2 && bestSellersScroll.canScrollLeft && (
                <button
                  onClick={() => scrollCarousel(bestSellersRef, 'left', setBestSellersScroll)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)/80 hover:bg-(--color-branco) rounded-full p-2 shadow-lg transition-all"
                  aria-label="Scroll left"
                >
                  <svg className="w-6 h-6 text-(--color-hina)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div
                ref={bestSellersRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              >
                {bestSellers.map((bestSeller) => (
                  <div key={bestSeller.id} className="flex-shrink-0 w-[200px] md:w-[240px]">
                    <ProductCard
                      product={bestSeller}
                      showBadge={true}
                    />
                  </div>
                ))}
              </div>
              {bestSellers.length > 2 && bestSellersScroll.canScrollRight && (
                <button
                  onClick={() => scrollCarousel(bestSellersRef, 'right', setBestSellersScroll)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)/80 hover:bg-(--color-branco) rounded-full p-2 shadow-lg transition-all"
                  aria-label="Scroll right"
                >
                  <svg className="w-6 h-6 text-(--color-hina)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="bg-(--color-branco) py-12 border-t border-(--color-platinum)">
          <div className="w-full px-4 md:px-8">
            <h2 className="text-[28px] md:text-[32px] font-bold text-(--color-preto) mb-8">
              {translate("Recommendations from") || "Recommendations from"} {brandName}
            </h2>
            <div className="relative">
              {recommendations.length > 2 && recommendationsScroll.canScrollLeft && (
                <button
                  onClick={() => scrollCarousel(recommendationsRef, 'left', setRecommendationsScroll)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)/80 hover:bg-(--color-branco) rounded-full p-2 shadow-lg transition-all"
                  aria-label="Scroll left"
                >
                  <svg className="w-6 h-6 text-(--color-hina)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div
                ref={recommendationsRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              >
                {recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="flex-shrink-0 w-[200px] md:w-[240px]">
                    <ProductCard
                      product={recommendation}
                      showBadge={true}
                    />
                  </div>
                ))}
              </div>
              {recommendations.length > 2 && recommendationsScroll.canScrollRight && (
                <button
                  onClick={() => scrollCarousel(recommendationsRef, 'right', setRecommendationsScroll)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)/80 hover:bg-(--color-branco) rounded-full p-2 shadow-lg transition-all"
                  aria-label="Scroll right"
                >
                  <svg className="w-6 h-6 text-(--color-hina)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
}

