"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { ProductDetail, productsById } from "@/constants/products";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import ProductDetailDrawer from "./ProductDetailDrawer";
import ProductCard from "@/components/department/ProductCard";
import { Product } from "@/constants/department";

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

export default function StorePage({ product }: { product: ProductDetail }) {
  const { translations } = useLanguage();
  const router = useRouter();
  const [isProductDetailDrawerOpen, setIsProductDetailDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  
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
    <div style={{ fontFamily: fontStack }} className="min-h-screen bg-(--color-branco)">
      {/* Banner Section with Product Image and Heading */}
      <div ref={bannerRef} className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {mainImage && (
          <Image
            src={mainImage.src}
            alt={translate(product.title) ?? product.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-(--color-preto)/40"></div>
        {/* Product Name Heading */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[48px] md:text-[64px] font-bold text-(--color-branco) text-center px-4 z-10">
            {translate(product.title) ?? product.title}
          </h1>
        </div>
      </div>

      {/* Navigation Header Bar */}
      <div 
        ref={headerRef}
        className="border-b bg-white border-(--color-platinum) relative"
        data-store-header
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left Side - Logo and Brand Name */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-(--color-preto) rounded flex items-center justify-center">
                <span className="text-(--color-branco) font-bold text-sm">{brandName.charAt(0)}</span>
              </div>
              <span className="text-[16px] font-semibold text-(--color-preto)">{brandName}</span>
              <button className="px-4 py-1.5 text-[14px] border border-(--color-silver) rounded hover:bg-(--color-whiteSmoke) transition-colors">
                {translate("Follow") || "Follow"}
              </button>
              <button className="p-1.5 hover:bg-(--color-shell) rounded transition-colors">
                <svg className="w-5 h-5 text-(--color-preto)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </button>
            </div>

            {/* Center - Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href={`/product-detail/${product.id}/store`}
                className="text-[14px] font-medium text-(--color-preto) border-b-2 border-(--color-preto) pb-1"
              >
                {translate("HOME") || "HOME"}
              </Link>
              <button
                onClick={() => setIsProductDetailDrawerOpen(true)}
                className="text-[14px] font-medium text-(--color-preto) hover:text-(--color-preto) transition-colors"
              >
                {translate("PRODUCT DETAILS") || "PRODUCT DETAILS"}
              </button>
            </nav>

           
          </div>
        </div>

        {/* Product Detail Drawer - Positioned relative to header */}
        {isProductDetailDrawerOpen && (
          <ProductDetailDrawer
            isOpen={isProductDetailDrawerOpen}
            onClose={() => setIsProductDetailDrawerOpen(false)}
            product={product}
          />
        )}
      </div>

      {/* Exclusive Collection Banner */}
      <div className="bg-[#222] py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-[28px] md:text-[36px] font-bold text-(--color-branco) text-center uppercase tracking-wide">
            {brandName} {translate("EXCLUSIVE COLLECTION") || "EXCLUSIVE COLLECTION"}
          </h2>
        </div>
      </div>

      {/* Related Products Gallery - Using ProductCard */}
      {relatedProducts.length > 0 && (
        <div className="bg-(--color-whiteSmoke) py-12">
          <div className="container mx-auto px-4 md:px-8">
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
          <div className="container mx-auto px-4 md:px-8">
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
          <div className="container mx-auto px-4 md:px-8">
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

