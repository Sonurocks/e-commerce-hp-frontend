"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNavigationLinks, headerConfig } from "../../../constants";
import { useLanguage } from "@/context/LanguageContext";
import { useLogo } from "@/context/LogoContext";
import {
  searchbarBag,
  searchbarBlackbag,
  searchbarBlackboot,
  searchbarBoot,
  searchbarBrownbagg,
  searchbarBrownsleeper,
  searchbarGraybag,
  searchbarShoes,
  searchbarSleeper,
  trendingBag,
  trendingDress,
  trendingMenShoe,
  trendingMen,
  trendingBoykid,
  trendingGirlkid,
  trendingTeddykid,
} from "@/assets";

interface SearchDrawerProps {
  isDrawerOpen: boolean;
  drawerRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

// Trending products data by category
const trendingProductsByCategory = {
  womenswear: [
    { id: 1, name: "Boot", image: searchbarBoot },
    { id: 2, name: "Bag", image: searchbarBag },
    { id: 3, name: "Black Boot", image: searchbarBlackboot },
    { id: 4, name: "Brown Bag", image: searchbarBrownbagg },
    { id: 5, name: "Gray Bag", image: searchbarGraybag },
    { id: 6, name: "Dress", image: trendingDress },
  ],
  menswear: [
    { id: 1, name: "Men Shoe", image: trendingMenShoe },
    { id: 2, name: "Men", image: trendingMen },
    { id: 3, name: "Shoes", image: searchbarShoes },
    { id: 4, name: "Black Boot", image: searchbarBlackboot },
    { id: 5, name: "Boot", image: searchbarBoot },
  ],
  kidswear: [
    { id: 1, name: "Boy Kid", image: trendingBoykid },
    { id: 2, name: "Girl Kid", image: trendingGirlkid },
    { id: 3, name: "Teddy Kid", image: trendingTeddykid },
    { id: 4, name: "Sleeper", image: searchbarSleeper },
    { id: 5, name: "Brown Sleeper", image: searchbarBrownsleeper },
  ],
};

const SearchDrawer: React.FC<SearchDrawerProps> = ({
  isDrawerOpen,
  drawerRef,
  onClose,
  searchQuery,
  onSearchChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeLink, setActiveLink] = useState(0);
  const { translations: languageStrings } = useLanguage();
  const headerCopy = languageStrings.header;
  const searchCopy = languageStrings.homepage.searchDrawer;
  const { logoConfig } = useLogo();

  const getPrimaryLabel = (linkId: string, fallback: string) =>
    headerCopy.navigation.primary[linkId] ?? fallback;

  // Get current category products
  const currentCategory = primaryNavigationLinks[activeLink]?.id || "womenswear";
  const baseProducts = trendingProductsByCategory[currentCategory as keyof typeof trendingProductsByCategory] || trendingProductsByCategory.womenswear;

  // Get all products from all categories for search with unique keys
  const allProducts = [
    ...trendingProductsByCategory.womenswear.map(p => ({ ...p, uniqueKey: `womenswear-${p.id}` })),
    ...trendingProductsByCategory.menswear.map(p => ({ ...p, uniqueKey: `menswear-${p.id}` })),
    ...trendingProductsByCategory.kidswear.map(p => ({ ...p, uniqueKey: `kidswear-${p.id}` })),
  ];

  // Filter products based on search query
  const getFilteredProducts = () => {
    if (!searchQuery.trim()) {
      return baseProducts.map(p => ({ ...p, uniqueKey: `${currentCategory}-${p.id}` }));
    }
    const query = searchQuery.toLowerCase();
    // Search across all products, not just current category
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(query)
    );
    // If no matches, show base products
    return filtered.length > 0 ? filtered : baseProducts.map(p => ({ ...p, uniqueKey: `${currentCategory}-${p.id}` }));
  };

  const currentProducts = getFilteredProducts();

  // Generate proper search suggestions based on product categories
  const getSearchSuggestions = () => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);
    
    // Common product categories for suggestions
    const allCategories = [
      "Sneakers",
      "Shoes",
      "Boots",
      "Bags",
      "Belts",
      "Wallets & Billfolds",
      "Clothing",
      "Dresses",
      "Jackets",
      "Tops",
      "Loafers",
      "Hats",
      "Accessories",
    ];

    // Start with the search query itself
    const suggestions = [capitalizedQuery];
    
    // Add categories that are relevant to the search
    // If query is short or generic, show common categories
    if (query.length <= 3) {
      suggestions.push(...allCategories.slice(0, 8));
    } else {
      // Filter categories that might relate to the query
      const relevantCategories = allCategories.filter(cat => 
        cat.toLowerCase().includes(query) || 
        query.includes(cat.toLowerCase().slice(0, 3))
      );
      
      if (relevantCategories.length > 0) {
        suggestions.push(...relevantCategories.slice(0, 8));
      } else {
        // If no matches, show common categories
        suggestions.push(...allCategories.slice(0, 8));
      }
    }

    return suggestions.slice(0, 9); // Limit to 9 suggestions
  };

  const searchSuggestions = getSearchSuggestions();

  // Scroll functions for image slider
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isDrawerOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDrawerOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDrawerOpen) {
        onClose();
      }
    };

    if (isDrawerOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isDrawerOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      // Prevent scrolling
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Prevent touch scrolling on mobile
      const preventTouchMove = (e: TouchEvent) => {
        e.preventDefault();
      };
      document.addEventListener("touchmove", preventTouchMove, { passive: false });

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, scrollY);
        document.removeEventListener("touchmove", preventTouchMove);
      };
    }
  }, [isDrawerOpen]);

  return (
    <>
      {/* Search Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 right-0 bg-(--color-branco) z-[100] transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-y-0" : "-translate-y-full"
        } shadow-lg max-h-screen overflow-y-auto`}
      >
        {/* Top Header Row */}
        <div className="container mx-auto px-[36px]">
          {/* Logo - Top Center */}
          <div className="flex justify-center items-center py-4">
            <Link href={logoConfig.header.href || headerConfig.logo.href}>
              {logoConfig.header.type === "image" && logoConfig.header.imageUrl ? (
                <div className="relative w-[290px] h-[26px]">
                  <Image
                    src={logoConfig.header.imageUrl}
                    alt={logoConfig.header.alt || "Logo"}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <h1 className="text-3xl font-extrabold text-(--color-preto) tracking-tight uppercase">
                  {logoConfig.header.text || headerCopy.logoText}
                </h1>
              )}
            </Link>
          </div>

          {/* Links and Search Bar Row - Below Logo */}
          <div className="flex items-center justify-between w-full h-[68px] py-0 px-[48px] pt-6 relative">
            {/* Left - Navigation Links (Tabs) */}
            <div className="flex items-center gap-8">
              {primaryNavigationLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => setActiveLink(index)}
                  className={`text-sm font-normal transition relative ${
                    activeLink === index 
                      ? "text-preto" 
                      : "text-(--color-hina) hover:text-gray-700"
                  }`}
                >
                  {getPrimaryLabel(link.id, link.label)}
                  {activeLink === index && (
                    <span className="absolute bottom-[-8px] left-0 right-0 h-[1px] bg-preto"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Gray Border Line under tabs - aligned with image container end */}
            <div
              className="absolute bottom-0 left-[56px] h-px bg-gray-300"
              style={{ width: "calc(50% - 56px)" }}
            ></div>

            {/* Right - Search Bar and Close Button */}
            <div className="flex items-start space-x-4 relative">
              {/* Search Input with Suggestions */}
              <div className="relative">
                <div className="relative w-[270px] h-[44px]">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-(--color-hina)"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={headerCopy.searchPlaceholder}
                    className="w-full pl-10 pr-10 py-2 border-b border-preto focus:outline-none focus:border-gray-900 text-base bg-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange("")}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-(--color-hina) hover:text-gray-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Search Suggestions - Right below input */}
                {searchQuery && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-[270px] bg-(--color-branco)  border border-gray-200 shadow-lg max-h-[400px] overflow-y-auto z-50">
                    {searchSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="py-2 px-3 hover:bg-(--color-branco)  cursor-pointer text-sm text-(--color-emperor) flex items-center justify-between"
                      >
                        <span>{suggestion}</span>
                        {index === 0 && (
                          <span className="text-xs text-(--color-hina) ml-2">Brand</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-preto hover:text-(--color-emperor) transition p-2 rounded hover:bg-gray-100"
                aria-label="Close search"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Trending Section with Image Slider */}
        <div className="container mx-auto px-[36px] py-8">
          <div className="px-[48px]" id="trending-container">
            {/* Trending Section with Half-Width Images */}
            <div className="flex items-start gap-8">
              {/* Left Side - Heading */}
              <div className="flex-shrink-0">
                {searchQuery ? (
                  <h2 className="text-base text-(--color-hina) font-normal">
                    {searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)}
                  </h2>
                ) : (
                  <h2 className="text-base text-(--color-hina) font-normal">
                    {searchCopy.trendingLabel}
                  </h2>
                )}
              </div>

              {/* Image Slider - Right Half Width, aligned to end where gray line ends (50% of container) */}
              <div 
                className="flex-1 relative"
                style={{ 
                  maxWidth: "calc(50% - 8px)"
                }}
              >
                {/* Left Arrow Button */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)  rounded-full p-2 shadow-md hover:bg-gray-50 transition-all"
                  aria-label="Scroll left"
                >
                  <svg
                    className="w-5 h-5 text-(--color-emperor)"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-(--color-branco)  rounded-full p-2 shadow-md hover:bg-gray-50 transition-all"
                  aria-label="Scroll right"
                >
                  <svg
                    className="w-5 h-5 text-(--color-emperor)"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div 
                  ref={sliderRef}
                  className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2"
                >
                  {currentProducts.map((product) => (
                    <div
                      key={product.uniqueKey || `${currentCategory}-${product.id}`}
                      className="flex-shrink-0 w-[150px]"
                    >
                      <div className="w-full h-[180px] bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={150}
                          height={180}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDrawer;
