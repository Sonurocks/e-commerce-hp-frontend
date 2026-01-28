/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { DownloadAppBanner, ProductCard } from "@/components";
import ProductCardSkeleton from "./ProductCardSkeleton";
import FilterDrawer from "./FilterDrawer";
import Dropdown from "../common/Dropdown";
import PageNotFound from "../not-found/PageNotFound";
import {
  DepartmentKey,
  Product,
  featuredPromoCardsByDept,
  newInProductsByDept,
  partyPlusOnesByDept,
} from "@/constants/department";
import { useLanguage } from "@/context/LanguageContext";
import {
  brandsDrawerLinks,
  clothingDrawerLinks,
  shoesDrawerLinks,
  bagsDrawerLinks,
  accessoriesDrawerLinks,
  jewelleryDrawerLinks,
  homewareDrawerLinks,
  preOwnedDrawerLinks,
  newInDrawerLinks,
  holidaySeasonDrawerLinks,
  saleDrawerLinks,
  drawerLinks,
} from "@/constants/index";

// Collect all drawer links into a single array
const getAllDrawerLinks = (): Array<{ href: string; label: string }> => {
  const allLinks: Array<{ href: string; label: string }> = [];

  // Helper to add links from an object
  const addLinks = (links: Array<{ href: string; label: string }>) => {
    allLinks.push(...links);
  };

  // Add all links from different drawer link objects
  addLinks(drawerLinks);
  Object.values(newInDrawerLinks).forEach((section) => addLinks(section));
  Object.values(holidaySeasonDrawerLinks).forEach((section) => addLinks(section));
  Object.values(brandsDrawerLinks).forEach((section) => addLinks(section));
  Object.values(clothingDrawerLinks).forEach((section) => addLinks(section));
  Object.values(shoesDrawerLinks).forEach((section) => addLinks(section));
  Object.values(bagsDrawerLinks).forEach((section) => addLinks(section));
  Object.values(accessoriesDrawerLinks).forEach((section) => addLinks(section));
  Object.values(jewelleryDrawerLinks).forEach((section) => addLinks(section));
  Object.values(homewareDrawerLinks).forEach((section) => addLinks(section));
  Object.values(preOwnedDrawerLinks).forEach((section) => addLinks(section));
  Object.values(saleDrawerLinks).forEach((section) => addLinks(section));

  return allLinks;
};

// Find link by href
const findLinkByHref = (href: string): { href: string; label: string } | null => {
  const allLinks = getAllDrawerLinks();
  return allLinks.find((link) => link.href === href) || null;
};

// Get products based on the link (for now, return all products - can be filtered later)
const getProductsForLink = (
  href: string,
  department: DepartmentKey = "womenswear"
): Product[] => {
  // Combine all products from different sections
  const allProducts = [
    ...featuredPromoCardsByDept[department],
    ...newInProductsByDept[department],
    ...partyPlusOnesByDept[department],
  ];

  // For now, return all products
  // TODO: Filter products based on href (brand, category, etc.)
  return allProducts;
};

// Get filter buttons based on the category
const getFilterButtons = (href: string): string[] => {
  const baseFilters = ["All Filters"];

  if (href.startsWith("/brands/")) {
    return [...baseFilters, "Shoes", "Bags", "Clothing", "Accessories", "Pre-Owned", "Jewellery", "Activewear"];
  }
  if (href.startsWith("/clothing/")) {
    return [...baseFilters, "Shoes", "Bags", "Accessories", "Pre-Owned", "Jewellery", "Activewear"];
  }
  if (href.startsWith("/shoes/")) {
    return [...baseFilters, "Bags", "Clothing", "Accessories", "Pre-Owned", "Jewellery", "Activewear"];
  }
  if (href.startsWith("/bags/")) {
    return [...baseFilters, "Shoes", "Clothing", "Accessories", "Pre-Owned", "Jewellery", "Activewear"];
  }
  if (href.startsWith("/accessories/")) {
    return [...baseFilters, "Shoes", "Bags", "Clothing", "Pre-Owned", "Jewellery", "Activewear"];
  }
  if (href.startsWith("/jewellery/")) {
    return [...baseFilters, "Shoes", "Bags", "Clothing", "Accessories", "Pre-Owned", "Activewear"];
  }

  // Default filters
  return [...baseFilters, "Shoes", "Bags", "Clothing", "Accessories", "Pre-Owned", "Jewellery", "Activewear"];
};

// Get breadcrumb text based on department
const getBreadcrumbText = (department: DepartmentKey, translations: any): string => {
  if (department === "menswear") {
    return "Men Home";
  } else if (department === "kidswear") {
    return "Kids Home";
  }
  return translations.productCopy["Women Home"] ?? "Women Home";
};

export default function DrawerLinkPage() {
  const pathname = usePathname();
  const { translations } = useLanguage();

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
  }, [pathname]);

  // Determine department from pathname (default to womenswear)
  const department = useMemo((): DepartmentKey => {
    // You can enhance this logic to detect department from pathname
    return "womenswear";
  }, []);

  // Find the link based on current pathname
  const currentLink = useMemo(() => {
    // Try exact match first
    let link = findLinkByHref(pathname);
    
    // If no exact match, try to match by checking if pathname starts with any href
    if (!link) {
      const allLinks = getAllDrawerLinks();
      // Find the longest matching href (most specific match)
      link = allLinks
        .filter((l) => pathname.startsWith(l.href))
        .sort((a, b) => b.href.length - a.href.length)[0] || null;
    }
    
    return link;
  }, [pathname]);

  // Get page title
  const pageTitle = useMemo(() => {
    if (!currentLink) return "";
    
    // For brands, add "for Women" suffix
    if (pathname.startsWith("/brands/")) {
      return `${currentLink.label} for Women`;
    }
    
    return currentLink.label;
  }, [currentLink, pathname]);

  // Get products for the link
  const productsToShow = useMemo(() => {
    if (!pathname) return [];
    return getProductsForLink(pathname, department);
  }, [pathname, department]);

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

  const sortOptions = [
    { value: "our-picks", label: "Our Picks" },
    { value: "newest", label: "Newest first" },
    { value: "price-high", label: "Price: high to low" },
    { value: "price-low", label: "Price: low to high" },
    { value: "sale-high", label: "Sale: high to low" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    };

    if (isSortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSortDropdownOpen]);

  // Get filter buttons
  const filterButtons = useMemo(() => {
    return getFilterButtons(pathname);
  }, [pathname]);

  // Get breadcrumb text
  const breadcrumbText = useMemo(() => {
    return getBreadcrumbText(department, translations);
  }, [department, translations]);

  // If no link found, show custom 404 page
  if (!currentLink) {
    return <PageNotFound />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-10 max-w-[1440px]">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-[13px] text-[#666]">
          <Link href="/" className="hover:text-preto">
            {breadcrumbText}
          </Link>
          <span className="mx-2">{">"}</span>
          <span className="text-preto">{pageTitle}</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-base text-preto mb-8">
          {pageTitle}
        </h1>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-4 border-b border-gray-200">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-3 flex-1 overflow-x-auto">
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
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap border ${
                  selectedFilter === filter.toLowerCase() || filter === "All Filters"
                    ? "bg-preto text-branco border-preto"
                    : "border-gray-300 text-preto hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative" ref={sortDropdownRef}>
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
                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
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
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition-colors"
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

