"use client";

import React, { useMemo, useRef } from "react";
import { ProductDetail, productsById } from "@/constants/products";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

export default function StorePage({ product }: { product: ProductDetail }) {
  const { translations } = useLanguage();
  const router = useRouter();
  
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

  // Get related products from the same brand
  const relatedProducts = useMemo(() => {
    const allProducts = Object.values(productsById);
    return allProducts
      .filter((p) => {
        const pBrand = parseBrand(p.title);
        return pBrand === brandName && p.id !== product.id;
      })
      .slice(0, 4); // Get exactly 4 related products for 2x2 grid
  }, [product.id, brandName]);

  // Get best sellers from the same brand
  const bestSellers = useMemo(() => {
    const allProducts = Object.values(productsById);
    return allProducts
      .filter((p) => {
        const pBrand = parseBrand(p.title);
        return pBrand === brandName && p.id !== product.id;
      })
      .slice(0, 8); // Get up to 8 best sellers
  }, [product.id, brandName]);

  // Get recommendations from the same brand
  const recommendations = useMemo(() => {
    const allProducts = Object.values(productsById);
    return allProducts
      .filter((p) => {
        const pBrand = parseBrand(p.title);
        return pBrand === brandName && p.id !== product.id;
      })
      .slice(4, 12); // Get different products for recommendations
  }, [product.id, brandName]);

  // Refs for carousel scrolling
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref?.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ fontFamily: fontStack }} className="min-h-screen bg-(--color-branco)">
      {/* Banner Section with Product Image and Heading */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
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
      <div className=" border-b  bg-white border-(--color-platinum) sticky top-0 z-50">
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
              <Link
                href={`/product-detail/${product.id}`}
                className="text-[14px] font-medium text-(--color-preto) hover:text-(--color-preto) transition-colors"
              >
                {translate("PRODUCT DETAILS") || "PRODUCT DETAILS"}
              </Link>
              <Link
                href="#"
                className="text-[14px] font-medium text-(--color-preto) hover:text-(--color-preto) transition-colors"
              >
                {translate("ABOUT") || "ABOUT"}
              </Link>
              <Link
                href="#"
                className="text-[14px] font-medium text-(--color-preto) hover:text-(--color-preto) transition-colors"
              >
                {translate("CONTACT") || "CONTACT"}
              </Link>
            </nav>

           
          </div>
        </div>
      </div>

      {/* Exclusive Collection Banner */}
      <div className="bg-[#222] py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-[28px] md:text-[36px] font-bold text-(--color-branco) text-center uppercase tracking-wide">
            {brandName} EXCLUSIVE COLLECTION
          </h2>
        </div>
      </div>

      {/* Related Products Gallery - 2x2 Square Grid */}
      {relatedProducts.length > 0 && (
        <div className="bg-(--color-whiteSmoke) py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product-detail/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="bg-(--color-branco) rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-full aspect-square mb-3 rounded overflow-hidden bg-(--color-shell)">
                      {relatedProduct.image && (
                        <Image
                          src={relatedProduct.image.src}
                          alt={translate(relatedProduct.title) ?? relatedProduct.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <h3 className="text-[12px] md:text-[14px] font-semibold text-(--color-preto) mb-1 line-clamp-2">
                      {translate(relatedProduct.title) ?? relatedProduct.title}
                    </h3>
                    {relatedProduct.price && (
                      <p className="text-[12px] md:text-[14px] text-(--color-preto) font-medium">
                        {relatedProduct.price}
                      </p>
                    )}
                  </div>
                </Link>
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
              Best Sellers from {brandName}
            </h2>
            <div className="relative">
              <button
                onClick={() => scrollCarousel(bestSellersRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)/80 hover:bg-(--color-branco) rounded-full p-2 shadow-lg transition-all"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-(--color-hina)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div
                ref={bestSellersRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              >
                {bestSellers.map((bestSeller) => (
                  <Link
                    key={bestSeller.id}
                    href={`/product-detail/${bestSeller.id}`}
                    className="group flex-shrink-0 w-[200px] md:w-[240px]"
                  >
                    <div className="bg-(--color-branco) rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative w-full aspect-square mb-3 rounded overflow-hidden bg-(--color-shell)">
                        {bestSeller.image && (
                          <Image
                            src={bestSeller.image.src}
                            alt={translate(bestSeller.title) ?? bestSeller.title}
                            fill
                            sizes="200px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <h3 className="text-[14px] font-semibold text-(--color-preto) mb-1 line-clamp-2">
                        {translate(bestSeller.title) ?? bestSeller.title}
                      </h3>
                      {bestSeller.price && (
                        <p className="text-[14px] text-(--color-preto) font-medium">
                          {bestSeller.price}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={() => scrollCarousel(bestSellersRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)/80 hover:bg-(--color-branco) rounded-full p-2 shadow-lg transition-all"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-(--color-hina)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="bg-(--color-branco) py-12 border-t border-(--color-platinum)">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-[28px] md:text-[32px] font-bold text-(--color-preto) mb-8">
              Recommendations from {brandName}
            </h2>
            <div className="relative">
              <button
                onClick={() => scrollCarousel(recommendationsRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)/80 hover:bg-(--color-branco) rounded-full p-2 shadow-lg transition-all"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-(--color-hina)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div
                ref={recommendationsRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              >
                {recommendations.map((recommendation) => (
                  <Link
                    key={recommendation.id}
                    href={`/product-detail/${recommendation.id}`}
                    className="group flex-shrink-0 w-[200px] md:w-[240px]"
                  >
                    <div className="bg-(--color-branco) rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative w-full aspect-square mb-3 rounded overflow-hidden bg-(--color-shell)">
                        {recommendation.image && (
                          <Image
                            src={recommendation.image.src}
                            alt={translate(recommendation.title) ?? recommendation.title}
                            fill
                            sizes="200px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <h3 className="text-[14px] font-semibold text-(--color-preto) mb-1 line-clamp-2">
                        {translate(recommendation.title) ?? recommendation.title}
                      </h3>
                      {recommendation.price && (
                        <p className="text-[14px] text-(--color-preto) font-medium">
                          {recommendation.price}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={() => scrollCarousel(recommendationsRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)/80 hover:bg-(--color-branco) rounded-full p-2 shadow-lg transition-all"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-(--color-hina)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
}

