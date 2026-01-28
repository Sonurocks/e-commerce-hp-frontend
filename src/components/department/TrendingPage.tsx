"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { DownloadAppBanner } from "@/components";
import FilterDrawer from "./FilterDrawer";
import Dropdown from "../common/Dropdown";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import {
  trendingNowByDept,
  DepartmentKey,
  Product,
  featuredPromoCardsByDept,
  newInProductsByDept,
  partyPlusOnesByDept,
} from "@/constants/department";
import { useLanguage } from "@/context/LanguageContext";

type TrendingItem = Product & { department: DepartmentKey };

// Map trending categories to appropriate filters
const getFiltersForTrending = (title: string): string[] => {
  const titleUpper = title.toUpperCase();
  if (titleUpper.includes("PARTY")) {
    return ["20% off", "Shoes", "Clothing", "Bags", "Jewellery"];
  }
  if (titleUpper.includes("HOME") || titleUpper.includes("HOSTING")) {
    return ["20% off", "Dining & Kitchen", "Home Decor", "Soft Furnishings & Textiles", "Candles & Home Fragrance", "Collectibles", "Stationery", "Furniture"];
  }
  if (titleUpper.includes("PRE-OWNED") || titleUpper.includes("TREASURES")) {
    return ["20% off", "Bags", "Jewellery", "Clothing", "Shoes"];
  }
  if (titleUpper.includes("LUXURIES") || titleUpper.includes("LUXURY")) {
    return ["20% off", "Jewellery", "Bags", "Accessories", "Watches"];
  }
  if (titleUpper.includes("SNEAKERS") || titleUpper.includes("SHOES")) {
    return ["20% off", "Sneakers", "Boots", "Trainers", "Loafers"];
  }
  if (titleUpper.includes("DENIM")) {
    return ["20% off", "Jeans", "Clothing", "Jackets"];
  }
  if (titleUpper.includes("BOYS") || titleUpper.includes("GIRLS") || titleUpper.includes("BABIES") || titleUpper.includes("KIDS")) {
    return ["20% off", "Clothing", "Shoes", "Accessories"];
  }
  // Default filters
  return ["20% off", "Shoes", "Clothing", "Bags", "Accessories"];
};

// Get products for a trending category
const getProductsForTrending = (
  trendingId: string,
  department: DepartmentKey
): Product[] => {
  // Combine products from different sections based on trending category
  const allProducts = [
    ...featuredPromoCardsByDept[department],
    ...newInProductsByDept[department],
    ...partyPlusOnesByDept[department],
  ];

  return allProducts;
};

export default function TrendingPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const trendingId = searchParams?.get("id");
  const { translations } = useLanguage();
  
  // Determine current department from pathname
  const isKidswearPage = pathname?.startsWith("/kidswear");
  const isMenswearPage = pathname?.startsWith("/menswear");
  const currentDepartment: DepartmentKey = isKidswearPage
    ? "kidswear"
    : isMenswearPage
      ? "menswear"
      : "womenswear";
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("our-picks");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate loading on mount/refresh
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Brief delay to show skeleton
    return () => clearTimeout(timer);
  }, [trendingId, currentDepartment]);

  // // Close sort dropdown when the user scrolls the page
  

  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  const sortOptions = useMemo(() => [
    { value: "our-picks", label: translate("Our Picks") || "Our Picks" },
    { value: "newest", label: translate("Newest first") || "Newest first" },
    { value: "price-high", label: translate("Price: high to low") || "Price: high to low" },
    { value: "price-low", label: translate("Price: low to high") || "Price: low to high" },
    { value: "sale-high", label: translate("Sale: high to low") || "Sale: high to low" },
  ], [translations]);


  // Find the clicked trending item
  const clickedTrendingItem = useMemo((): TrendingItem | null => {
    if (!trendingId) return null;
    for (const dept of Object.keys(trendingNowByDept) as DepartmentKey[]) {
      const item = trendingNowByDept[dept].find((t) => t.id === trendingId);
      if (item) {
        return { ...item, department: dept } as TrendingItem;
      }
    }
    return null;
  }, [trendingId]);

  // Get filters based on trending category
  const availableFilters = useMemo(() => {
    if (!clickedTrendingItem) return ["20% off", "Shoes", "Clothing", "Bags"];
    return getFiltersForTrending(clickedTrendingItem.title);
  }, [clickedTrendingItem]);

  // Get products to display
  const productsToShow = useMemo(() => {
    if (!clickedTrendingItem) {
      // If no specific trending item, show all trending items
      const items: TrendingItem[] = [];
      (Object.keys(trendingNowByDept) as DepartmentKey[]).forEach((dept) => {
        trendingNowByDept[dept].forEach((item) => {
          items.push({ ...item, department: dept });
        });
      });
      return items;
    }
    // Get products for the specific trending category
    const deptProducts = getProductsForTrending(
      clickedTrendingItem.id,
      clickedTrendingItem.department
    );
    return deptProducts;
  }, [clickedTrendingItem]);

  // Filter products by selected filter
  const filteredProducts = useMemo(() => {
    if (selectedFilter === "all") {
      return productsToShow;
    }
    // For now, return all products
    return productsToShow;
  }, [productsToShow, selectedFilter]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    
    if (sortBy === "our-picks") {
      // Default/Our Picks - no sorting
      return items;
    }
    
    if (sortBy === "newest") {
      // Sort by newest (assuming items are already in order, or you can add date logic)
      return items;
    }
    
    if (sortBy === "price-high" || sortBy === "price-low") {
      return items.sort((a, b) => {
        const parsePrice = (priceStr?: string): number => {
          if (!priceStr) return 0;
          const match = priceStr.match(/[\d,]+/);
          if (!match) return 0;
          return parseInt(match[0].replace(/,/g, ""), 10);
        };
        
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        
        return sortBy === "price-high" ? priceB - priceA : priceA - priceB;
      });
    }
    
    if (sortBy === "sale-high") {
      // Sort by sale percentage (high to low)
      return items.sort((a, b) => {
        const getSalePercent = (priceStr?: string): number => {
          if (!priceStr) return 0;
          const match = priceStr.match(/-(\d+)%/);
          return match ? parseInt(match[1], 10) : 0;
        };
        
        return getSalePercent(b.price) - getSalePercent(a.price);
      });
    }
    
    return items;
  }, [filteredProducts, sortBy]);

  const translateTitle = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  // Get dynamic heading
  const pageTitle = clickedTrendingItem
    ? translateTitle(clickedTrendingItem.title) || clickedTrendingItem.title
    : translations.homepage.trendingHeading || "Trending Now";

  // Determine breadcrumb text based on department
  const getBreadcrumbText = () => {
    const department = clickedTrendingItem?.department || currentDepartment;
    if (department === "menswear") {
      return "Men";
    } else if (department === "kidswear") {
      return "Kids";
    }
    return translations.productCopy["Women Home"] ?? "Women Home";
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-10 max-w-[1440px]">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-[13px] text-[#666]">
          <Link href="/" className="hover:text-(--color-preto)">
            {getBreadcrumbText()}
          </Link>
          <span className="mx-2">{">"}</span>
          <span className="text-(--color-preto)">{pageTitle}</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-base text-(--color-preto) mb-8">
          {pageTitle}
        </h1>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedFilter === "all"
                  ? "bg-[#222] text-white"
                  : " border border-gray-300 text-(--color-preto) hover:bg-gray-50"
              }`}
            >
              {translate("All Filters") || "All Filters"}
            </button>
            {availableFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedFilter === filter
                    ? "bg-black text-white"
                    : " border border-gray-300 text-(--color-preto) hover:bg-gray-50"
                }`}
              >
                {translate(filter) || filter}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-shrink-0">
            <Dropdown
              isOpen={isSortDropdownOpen}
              onClose={() => setIsSortDropdownOpen(false)}
              contentClassName="right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              content={
                <div className="py-2">
                  {sortOptions.map((option) => {
                    const isSelected = sortBy === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <span>{option.label}</span>
                        {isSelected && (
                          <FiCheck className="w-4 h-4 text-gray-700" />
                        )}
                      </button>
                    );
                  })}
                </div>
              }
            >
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors w-full sm:w-auto"
              >
                <span>{translate("Sort by") || "Sort by"}</span>
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isSortDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </Dropdown>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[750px]:grid-cols-4 gap-6 mb-12">
          {isLoading ? (
            // Show skeleton loaders
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            // Show actual products
            sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showBadge={!!product.badge}
              />
            ))
          )}
        </div>
      </div>
      <DownloadAppBanner />
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        resultCount={sortedProducts.length}
      />
    </div>
  );
}

