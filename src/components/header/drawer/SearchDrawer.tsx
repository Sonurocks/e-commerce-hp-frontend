"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNavigationLinks, headerConfig } from "../../../constants";

interface SearchDrawerProps {
  isDrawerOpen: boolean;
  drawerRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

// Trending products data
const trendingProducts = [
  { id: 1, name: "UGG Sneakers", image: "/api/placeholder/200/250" },
  { id: 2, name: "Longchamp Bag", image: "/api/placeholder/200/250" },
  { id: 3, name: "Moon Boot", image: "/api/placeholder/200/250" },
  { id: 4, name: "UGG Slippers", image: "/api/placeholder/200/250" },
  { id: 5, name: "Handbag", image: "/api/placeholder/200/250" },
];

const SearchDrawer: React.FC<SearchDrawerProps> = ({
  isDrawerOpen,
  drawerRef,
  onClose,
  searchQuery,
  onSearchChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeLink, setActiveLink] = useState(0);

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
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-[99] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Search Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 right-0 bg-white z-[100] transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-y-0" : "-translate-y-full"
        } shadow-lg max-h-screen overflow-y-auto`}
      >
        {/* Top Header Row */}
        <div className="container mx-auto px-[36px]">
          {/* Logo - Top Center */}
          <div className="flex justify-center items-center py-4">
            <Link href={headerConfig.logo.href}>
              <h1 className="text-3xl font-extraboldtext-(--color-preto) tracking-tight uppercase">
                {headerConfig.logo.text}
              </h1>
            </Link>
          </div>

          {/* Links and Search Bar Row - Below Logo */}
          <div className="flex items-center justify-between w-full h-[68px] py-0 px-[48px] pt-6 relative">
            {/* Left - Navigation Links */}
            <div className="flex items-center gap-8">
              {primaryNavigationLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setActiveLink(index)}
                  onMouseEnter={() => setActiveLink(index)}
                  className={`text-sm font-normal transition ${
                    activeLink === index
                      ? "text-[var(--color-preto)]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
            </div>

            {/* Half-width Border Line - aligned with image container end */}
            <div
              className="absolute bottom-0 left-[56px] h-px bg-gray-200"
              style={{ width: "calc(50% - 56px)" }}
            ></div>

            {/* Right - Search Bar and Close Button */}
            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="relative w-[270px] h-[44px]">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
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
                  placeholder={headerConfig.search.placeholder}
                  className="w-full pl-10 pr-4 py-2 border-b border-[var(--color-preto)] focus:outline-none focus:border-gray-900 text-base bg-transparent"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-[var(--color-preto)] hover:text-gray-700 transition p-2 rounded hover:bg-gray-100"
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

        {/* Trending Section */}
        <div className="container mx-auto px-[36px] py-8">
          <div className="px-[48px]" id="trending-container">
            {/* Trending Heading */}
            <h2 className="text-base text-gray-600 font-normal mb-6">
              Trending
            </h2>

            {/* Trending Products - Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
              {trendingProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[200px]">
                  <div className="w-full h-[250px] bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      {product.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Search Results (when typing) */}
            {searchQuery && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-gray-500">
                  <p>Search results for &quot;{searchQuery}&quot;</p>
                  <p className="text-sm mt-2">Results will appear here...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDrawer;
