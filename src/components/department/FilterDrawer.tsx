"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiX, FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount?: number;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  resultCount = 100,
}: FilterDrawerProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: false,
    brand: false,
    colour: false,
    price: false,
    sale: false,
    promotion: false,
  });
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSaleOptions, setSelectedSaleOptions] = useState<string[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState(544);
  const [maxPrice, setMaxPrice] = useState(1948);
  const [priceRange, setPriceRange] = useState({ min: 544, max: 1948 });
  const drawerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const saleOptions = [
    { label: "No Discount", enabled: true },
    { label: "up to 30%", enabled: true },
    { label: "30% - 50%", enabled: true },
    { label: "50% - 60%", enabled: false },
    { label: "+ 60%", enabled: false },
  ];

  const toggleSaleOption = (optionLabel: string) => {
    const option = saleOptions.find((opt) => opt.label === optionLabel);
    if (!option || !option.enabled) return;
    
    setSelectedSaleOptions((prev) =>
      prev.includes(optionLabel)
        ? prev.filter((opt) => opt !== optionLabel)
        : [...prev, optionLabel]
    );
  };

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "Yellow", value: "#FFD700" },
    { name: "Gold", value: "#FFD700", gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" },
    { name: "Silver", value: "#C0C0C0", gradient: "linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 100%)" },
    { name: "Purple", value: "#800080" },
    { name: "White", value: "#FFFFFF", hasBorder: true },
    { name: "Grey", value: "#808080" },
    { name: "Neutrals", value: "multi", gradient: "linear-gradient(to bottom, #F5F5DC 0%, #DEB887 33%, #F5F5DC 66%)" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#008000" },
    { name: "Orange", value: "#FFA500" },
    { name: "Pink", value: "#FFC0CB" },
    { name: "Brown", value: "#A52A2A" },
    { name: "Navy", value: "#000080" },
    { name: "Beige", value: "#F5F5DC" },
  ];

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const brandsByLetter = {
    A: ["Acne Studios", "AMI Paris", "Amiri", "Ana Radu", "AREA", "Armani", "Axel Arigato"],
    B: ["Balmain", "Balenciaga", "Bottega Veneta", "Brunello Cucinelli", "Burberry"],
    C: ["Chanel", "Chloé", "Christopher Esber", "Cult Gaia"],
    D: ["Diesel", "Dior", "Dolce & Gabbana", "Dsquared2"],
    F: ["Fendi", "Ferragamo"],
    G: ["Galvan London", "Gallery Dept.", "Ganni", "Givenchy", "Gucci"],
    H: ["Hermès"],
    I: ["Isabel Marant"],
    J: ["Jacquemus"],
    K: ["Khaite"],
    L: ["Louis Vuitton"],
    M: ["Miu Miu", "Moncler"],
    O: ["Off-White", "Our Legacy"],
    P: ["Prada"],
    R: ["Rhude"],
    S: ["Saint Laurent", "Sandro", "Self-portrait", "Sorel"],
    T: ["Tom Ford", "Tory Burch", "Triumph"],
    V: ["Valentino", "Valentino Garavani", "Versace"],
    Z: ["Zegna"],
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Filter brands based on search query
  const getFilteredBrands = () => {
    if (!brandSearch.trim()) {
      return brandsByLetter;
    }

    const searchLower = brandSearch.toLowerCase();
    const filtered: Record<string, string[]> = {};

    Object.entries(brandsByLetter).forEach(([letter, brands]) => {
      const matchingBrands = brands.filter((brand) =>
        brand.toLowerCase().includes(searchLower)
      );
      if (matchingBrands.length > 0) {
        filtered[letter] = matchingBrands;
      }
    });

    return filtered;
  };

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const formatPrice = (price: number) => {
    return `US$${price.toLocaleString()}`;
  };

  const handlePriceInputChange = (type: "min" | "max", value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    const clampedValue = Math.max(0, Math.min(5000, numValue));
    if (type === "min") {
      const newMin = Math.min(clampedValue, priceRange.max);
      setPriceRange({ ...priceRange, min: newMin });
      setMinPrice(newMin);
    } else {
      const newMax = Math.max(clampedValue, priceRange.min);
      setPriceRange({ ...priceRange, max: newMax });
      setMaxPrice(newMax);
    }
  };

  const handlePriceInputBlur = (type: "min" | "max") => {
    if (type === "min") {
      setMinPrice(priceRange.min);
    } else {
      setMaxPrice(priceRange.max);
    }
  };

  const handleSliderChange = (type: "min" | "max", value: number) => {
    if (type === "min") {
      const newMin = Math.min(value, priceRange.max);
      const updatedRange = { ...priceRange, min: newMin };
      setPriceRange(updatedRange);
      setMinPrice(newMin);
    } else {
      const newMax = Math.max(value, priceRange.min);
      const updatedRange = { ...priceRange, max: newMax };
      setPriceRange(updatedRange);
      setMaxPrice(newMax);
    }
  };

  const getPriceFilterCount = () => {
    if (priceRange.min > 0 || priceRange.max < 5000) {
      return 1;
    }
    return 0;
  };

  const filterSections = [
    { key: "category", label: "CATEGORY" },
    { key: "brand", label: "BRAND" },
    { key: "colour", label: "COLOUR" },
    { key: "price", label: "PRICE" },
    { key: "sale", label: "SALE", isRed: true },
    { key: "promotion", label: "PROMOTION" },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Filter Drawer */} 
      <div
        ref={drawerRef}
        className={`fixed left-0 top-0 h-full w-[400px] bg-branco shadow-xl z-[100] transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-branco">
          <h2 className="text-xl font-medium text-preto ">
            All Filters
          </h2>
          <button
            onClick={onClose}
            className="text-preto hover:text-[--color-hina] transition cursor-pointer"
            aria-label="Close filters"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Categories */}
        <div className="px-6 py-4 pb-50">
          {filterSections.map((section) => (
            <div key={section.key} className=" py-4">
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full flex items-center justify-between text-sm font-thin text-preto uppercase hover:text-[--color-hina] transition"
              >
                <span
                  className={section.isRed ? "text-[--color-red]" : "text-preto"}
                >
                  {section.key === "price" && getPriceFilterCount() > 0
                    ? `${section.label} (${getPriceFilterCount()})`
                    : section.label}
                </span>
                {expandedSections[section.key] ? (
                  <FiChevronUp className="w-5 h-5" />
                ) : (
                  <FiChevronDown className="w-5 h-5" />
                )}
              </button>

              {/* Expanded Content */}
              {expandedSections[section.key] && (
                <div className="mt-4 space-y-4 pl-4">
                  {section.key === "category" ? (
                    <>
                      <div className="text-sm text-preto py-1 cursor-pointer hover:text-[--color-hina] transition">
                        Clothing
                      </div>
                      <div className="text-sm text-preto py-1 cursor-pointer hover:text-[--color-hina] transition">
                        Bags
                      </div>
                      <div className="text-sm text-preto py-1 cursor-pointer hover:text-[--color-hina] transition">
                        Jewellery
                      </div>
                      <div className="text-sm text-preto py-1 cursor-pointer hover:text-[--color-hina] transition">
                        Shoes
                      </div>
                    </>
                  ) : section.key === "brand" ? (
                    <>
                      {/* Search Bar */}
                      <div className="relative mb-4">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search 17 brands"
                          value={brandSearch}
                          onChange={(e) => setBrandSearch(e.target.value)}
                          className="w-full pl-10 pr-10 py-2 border-b border-gray-200 text-sm text-preto focus:outline-none focus:border-[--color-hina]"
                        />
                        {brandSearch && (
                          <button
                            onClick={() => setBrandSearch("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                            aria-label="Clear search"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {/* Brand List */}
                      <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {Object.entries(getFilteredBrands()).map(([letter, brands]) => (
                          <div key={letter} className="space-y-2">
                            <div className="text-sm font-medium text-preto uppercase">
                              {letter}
                            </div>
                            {brands.map((brand) => (
                              <label
                                key={brand}
                                className="flex items-center space-x-2 cursor-pointer hover:text-[--color-hina] transition"
                              >
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 border-gray-300 rounded text-[--color-hina] focus:ring-[--color-hina]"
                                />
                                <span className="text-sm text-preto">{brand}</span>
                              </label>
                            ))}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : section.key === "colour" ? (
                    <>
                      {/* Color List */}
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {colors.map((color) => {
                          const isSelected = selectedColors.includes(color.name);
                          return (
                            <button
                              key={color.name}
                              onClick={() => toggleColor(color.name)}
                              className={`w-full flex items-center space-x-3 py-2 px-2 rounded transition-all ${
                                isSelected
                                  ? "border border-preto bg-[--color-branco]"
                                  : "border border-transparent bg-gray-50 hover:bg-gray-100"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded flex-shrink-0 ${
                                  color.hasBorder ? "border border-gray-300" : ""
                                }`}
                                style={{
                                  backgroundColor: color.gradient ? undefined : color.value,
                                  background: color.gradient || undefined,
                                }}
                              />
                              <span
                                className={`text-sm flex-1 text-left ${
                                  isSelected ? "text-preto" : "text-gray-500"
                                }`}
                              >
                                {color.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : section.key === "price" ? (
                    <>
                      {/* Price Input Fields */}
                      <div className="flex items-center gap-3 mb-6">
                        <input
                          type="text"
                          value={formatPrice(minPrice)}
                          onChange={(e) => {
                            const numValue = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 0;
                            setMinPrice(Math.max(0, Math.min(5000, numValue)));
                            handlePriceInputChange("min", e.target.value);
                          }}
                          onBlur={() => handlePriceInputBlur("min")}
                          className="w-28 px-3 py-2 border border-gray-300 rounded bg-[--color-branco] text-sm text-gray-700 focus:outline-none focus:border-gray-400"
                        />
                        <input
                          type="text"
                          value={formatPrice(maxPrice)}
                          onChange={(e) => {
                            const numValue = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 0;
                            setMaxPrice(Math.max(0, Math.min(5000, numValue)));
                            handlePriceInputChange("max", e.target.value);
                          }}
                          onBlur={() => handlePriceInputBlur("max")}
                          className="w-28 px-3 py-2 border border-gray-300 rounded bg-[--color-branco] text-sm text-gray-700 focus:outline-none focus:border-gray-400"
                        />
                      </div>
                      {/* Range Slider */}
                      <div className="relative py-2">
                        <div
                          ref={sliderRef}
                          className="relative h-1 bg-gray-300 rounded-full"
                          onMouseDown={(e) => {
                            const rect = sliderRef.current?.getBoundingClientRect();
                            if (!rect) return;
                            const x = e.clientX - rect.left;
                            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                            const value = Math.round((percentage / 100) * 5000);
                            
                            const minPos = (priceRange.min / 5000) * 100;
                            const maxPos = (priceRange.max / 5000) * 100;
                            
                            if (Math.abs(percentage - minPos) < Math.abs(percentage - maxPos)) {
                              handleSliderChange("min", value);
                            } else {
                              handleSliderChange("max", value);
                            }
                          }}
                        >
                          {/* Unselected Range (right side) */}
                          <div
                            className="absolute h-1 bg-gray-300 rounded-full right-0"
                            style={{
                              width: `${100 - (priceRange.max / 5000) * 100}%`,
                            }}
                          />
                          {/* Selected Range */}
                          <div
                            className="absolute h-1 bg-gray-700 rounded-full"
                            style={{
                              left: `${(priceRange.min / 5000) * 100}%`,
                              width: `${((priceRange.max - priceRange.min) / 5000) * 100}%`,
                            }}
                          />
                          {/* Min Handle */}
                          <div
                            className="absolute w-4 h-4 bg-black rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1.5 top-1/2 shadow-sm hover:scale-110 transition-transform"
                            style={{ left: `${(priceRange.min / 5000) * 100}%` }}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              const startX = e.clientX;
                              const startMin = priceRange.min;
                              
                              const handleMouseMove = (e: MouseEvent) => {
                                const rect = sliderRef.current?.getBoundingClientRect();
                                if (!rect) return;
                                const deltaX = e.clientX - startX;
                                const deltaPercent = (deltaX / rect.width) * 100;
                                const newMin = Math.max(0, Math.min(priceRange.max, startMin + (deltaPercent / 100) * 5000));
                                handleSliderChange("min", Math.round(newMin));
                              };
                              
                              const handleMouseUp = () => {
                                document.removeEventListener("mousemove", handleMouseMove);
                                document.removeEventListener("mouseup", handleMouseUp);
                              };
                              
                              document.addEventListener("mousemove", handleMouseMove);
                              document.addEventListener("mouseup", handleMouseUp);
                            }}
                          />
                          {/* Max Handle */}
                          <div
                            className="absolute w-4 h-4 bg-black rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1.5 top-1/2 shadow-sm hover:scale-110 transition-transform"
                            style={{ left: `${(priceRange.max / 5000) * 100}%` }}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              const startX = e.clientX;
                              const startMax = priceRange.max;
                              
                              const handleMouseMove = (e: MouseEvent) => {
                                const rect = sliderRef.current?.getBoundingClientRect();
                                if (!rect) return;
                                const deltaX = e.clientX - startX;
                                const deltaPercent = (deltaX / rect.width) * 100;
                                const newMax = Math.max(priceRange.min, Math.min(5000, startMax + (deltaPercent / 100) * 5000));
                                handleSliderChange("max", Math.round(newMax));
                              };
                              
                              const handleMouseUp = () => {
                                document.removeEventListener("mousemove", handleMouseMove);
                                document.removeEventListener("mouseup", handleMouseUp);
                              };
                              
                              document.addEventListener("mousemove", handleMouseMove);
                              document.addEventListener("mouseup", handleMouseUp);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  ) : section.key === "sale" ? (
                    <>
                      {/* Sale Options List */}
                      <div className="space-y-1">
                        {saleOptions.map((option) => {
                          const isSelected = selectedSaleOptions.includes(option.label);
                          return (
                            <label
                              key={option.label}
                              className={`flex items-center space-x-2 py-1 cursor-pointer transition ${
                                option.enabled
                                  ? isSelected
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-50"
                                  : "opacity-50 cursor-not-allowed"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSaleOption(option.label)}
                                disabled={!option.enabled}
                                className="w-4 h-4 border-gray-300 rounded text-[--color-red] focus:ring-[--color-red] disabled:opacity-50"
                              />
                              <span
                                className={`text-sm ${
                                  option.enabled ? "text-preto" : "text-gray-400"
                                }`}
                              >
                                {option.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </>
                  ) : section.key === "promotion" ? (
                    <>
                      {/* Promotion Options List */}
                      <div className="space-y-1">
                        <label className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-50 transition">
                          <input
                            type="checkbox"
                            checked={selectedPromotion}
                            onChange={() => setSelectedPromotion(!selectedPromotion)}
                            className="w-4 h-4 border-gray-300 rounded text-preto focus:ring-preto"
                          />
                          <span className="text-sm text-preto">20% off</span>
                        </label>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-[--color-hina]">
                      Filter options for {section.label.toLowerCase()} will appear here
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="sticky bottom-0 bg-branco px-6 pt-10 pb-4 border-t border-[--color-platinum] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#222] text-[#f5f5f5] py-3 px-6 rounded-lg text-sm font-normal transition-colors"
          >
            Show {resultCount}+ Results
          </button>
        </div>
      </div>
    </>
  );
}

