/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { DownloadAppBanner, ProductCard } from "@/components";
import ProductCardSkeleton from "./ProductCardSkeleton";
import FilterDrawer from "./FilterDrawer";
import Dropdown from "../common/Dropdown";
import {
  DepartmentKey,
  Product,
  featuredPromoCardsByDept,
  newInProductsByDept,
  partyPlusOnesByDept,
} from "@/constants/department";
import { useLanguage } from "@/context/LanguageContext";

type SectionType = "featured" | "newIn" | "party" | "editorial" | "hero-primary" | "hero-secondary";

// Map section types to product arrays
const getProductsForSection = (
  section: SectionType,
  department: DepartmentKey
): Product[] => {
  switch (section) {
    case "featured":
      return featuredPromoCardsByDept[department];
    case "newIn":
      return newInProductsByDept[department];
    case "party":
      return partyPlusOnesByDept[department];
    case "editorial":
    case "hero-primary":
    case "hero-secondary":
      // For editorial and hero sections, combine products from featured and newIn
      return [
        ...featuredPromoCardsByDept[department],
        ...newInProductsByDept[department],
      ];
    default:
      return [];
  }
};

// Get section title from translations
const getSectionTitle = (
  section: SectionType,
  department: DepartmentKey,
  translations: any
): string => {
  const departmentCopy = translations.homepage?.departments?.[department];
  if (!departmentCopy) return "";

  switch (section) {
    case "featured":
      return departmentCopy.featured?.title || "";
    case "newIn":
      return departmentCopy.newIn?.title || "";
    case "party":
      return departmentCopy.party?.title || "";
    case "editorial":
      return departmentCopy.editorial?.title || "";
    case "hero-primary":
      return departmentCopy.hero?.primary?.title || "";
    case "hero-secondary":
      return departmentCopy.hero?.secondary?.title || "";
    default:
      return "";
  }
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  const section = (searchParams?.get("section") || "newIn") as SectionType;
  const department = (searchParams?.get("department") || "womenswear") as DepartmentKey;
  const { translations } = useLanguage();

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("our-picks");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate loading on mount/refresh
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Brief delay to show skeleton
    return () => clearTimeout(timer);
  }, [section, department]);

  const sortOptions = [
    { value: "our-picks", label: "Our Picks" },
    { value: "newest", label: "Newest first" },
    { value: "price-high", label: "Price: high to low" },
    { value: "price-low", label: "Price: low to high" },
    { value: "sale-high", label: "Sale: high to low" },
  ];


  // Get products for the section
  const productsToShow = useMemo(() => {
    return getProductsForSection(section, department);
  }, [section, department]);

  // Filter products by selected filter
  const filteredProducts = useMemo(() => {
    if (selectedFilter === "all") {
      return productsToShow;
    }
    // For now, return all products (filtering logic can be added later)
    return productsToShow;
  }, [productsToShow, selectedFilter]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];

    if (sortBy === "our-picks") {
      return items;
    }

    if (sortBy === "newest") {
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

  // Get dynamic heading
  const pageTitle = getSectionTitle(section, department, translations);

  // Get home link - always link to home
  const getHomeLink = () => {
    return "/";
  };

  // Filter buttons based on department
  const getFilterButtons = () => {
    const baseFilters = ["All Filters"];
    if (department === "womenswear") {
      return [...baseFilters, "Women"];
    } else if (department === "menswear") {
      return [...baseFilters, "Men"];
    } else if (department === "kidswear") {
      return [...baseFilters, "Kids"];
    }
    return baseFilters;
  };

  const filterButtons = getFilterButtons();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-10 max-w-[1440px]">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-[13px] text-[#666]">
          <Link href={getHomeLink()} className="hover:text-preto">
            Home
          </Link>
          <span className="mx-2">{">"}</span>
          <span className="text-preto">{pageTitle}</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-base text-preto mb-8">
          {pageTitle}
        </h1>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {filterButtons.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  if (filter === "All Filters") {
                    setIsFilterDrawerOpen(true);
                  } else {
                    setSelectedFilter(filter.toLowerCase());
                  }
                }}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap border flex-shrink-0 ${
                  selectedFilter === filter.toLowerCase() || filter === "All Filters"
                    ? " text-branco border-preto"
                    : "border-gray-300 text-preto hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-shrink-0">
            <Dropdown
              isOpen={isSortDropdownOpen}
              onClose={() => setIsSortDropdownOpen(false)}
              contentClassName="right-0 mt-2 w-56 bg-branco rounded-lg shadow-lg border border-gray-200 z-50"
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
                <span>Sort by</span>
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

