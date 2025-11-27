"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiMenu, FiX } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { SlidersHorizontal } from "lucide-react";
import {
  promotions,
  primaryNavigationLinks,
  secondaryNavigationLinks,
  menswearSecondaryNavigationLinks,
  kidswearSecondaryNavigationLinks,
  headerConfig,
} from "../../constants";
import { useLanguage } from "@/context/LanguageContext";
import { NavigationSection } from "@/lib/i18n";
import { DepartmentKey } from "../../constants/department";
import GenericDrawer from "./drawer/GenericDrawer";
import SearchDrawer from "./drawer/SearchDrawer";
import ThemeSettingsDrawer from "../theme/ThemeSettingsDrawer";
import ProfileModal from "../profile/ProfileModal";
import LanguageModal from "../language/LanguageModal";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const Header = () => {
  const pathname = usePathname();
  const isKidswearPage = pathname?.startsWith("/kidswear");
  const isMenswearPage = pathname?.startsWith("/menswear");

  // Determine current department
  const currentDepartment: DepartmentKey = isKidswearPage
    ? "kidswear"
    : isMenswearPage
      ? "menswear"
      : "womenswear";

  const { translations: languageStrings } = useLanguage();
  const headerCopy = languageStrings.header;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<
    | "25off"
    | "newIn"
    | "holidaySeason"
    | "brands"
    | "clothing"
    | "shoes"
    | "bags"
    | "accessories"
    | "jewellery"
    | "watches"
    | "homeware"
    | "preOwned"
    | "sale"
    | "0-36months"
    | "0-12months"
    | "teens"
    | null
  >(null);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { cartItems } = useCart();
  const { wishlistCount } = useWishlist();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const searchDrawerRef = useRef<HTMLDivElement>(null);
  const flagButtonRefDesktop = useRef<HTMLButtonElement>(null);
  const flagButtonRefMobile = useRef<HTMLButtonElement>(null);
  const navigationSectionKey: NavigationSection = isKidswearPage
    ? "kidswearSecondary"
    : isMenswearPage
      ? "menswearSecondary"
      : "secondary";

  const navigationLinks =
    navigationSectionKey === "kidswearSecondary"
      ? kidswearSecondaryNavigationLinks
      : navigationSectionKey === "menswearSecondary"
        ? menswearSecondaryNavigationLinks
        : secondaryNavigationLinks;
  // Single ref for the generic drawer
  const drawerRef = useRef<HTMLDivElement>(null);
  // Map of link refs for click outside detection
  const link25OffRef = useRef<HTMLDivElement>(null);
  const linkNewInRef = useRef<HTMLDivElement>(null);
  const linkHolidaySeasonRef = useRef<HTMLDivElement>(null);
  const linkBrandsRef = useRef<HTMLDivElement>(null);
  const linkClothingRef = useRef<HTMLDivElement>(null);
  const linkShoesRef = useRef<HTMLDivElement>(null);
  const linkBagsRef = useRef<HTMLDivElement>(null);
  const linkAccessoriesRef = useRef<HTMLDivElement>(null);
  const linkJewelleryRef = useRef<HTMLDivElement>(null);
  const linkWatchesRef = useRef<HTMLDivElement>(null);
  const linkHomewareRef = useRef<HTMLDivElement>(null);
  const linkPreOwnedRef = useRef<HTMLDivElement>(null);
  const linkSaleRef = useRef<HTMLDivElement>(null);
  const linkZeroThreeMonthsRef = useRef<HTMLDivElement>(null);
  const linkZeroTwelveMonthsRef = useRef<HTMLDivElement>(null);
  const linkTeensRef = useRef<HTMLDivElement>(null);

  const linkRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    "25off": link25OffRef,
    newIn: linkNewInRef,
    holidaySeason: linkHolidaySeasonRef,
    brands: linkBrandsRef,
    clothing: linkClothingRef,
    shoes: linkShoesRef,
    bags: linkBagsRef,
    accessories: linkAccessoriesRef,
    jewellery: linkJewelleryRef,
    watches: linkWatchesRef,
    homeware: linkHomewareRef,
    preOwned: linkPreOwnedRef,
    sale: linkSaleRef,
    "0-36months": linkZeroThreeMonthsRef,
    "0-12months": linkZeroTwelveMonthsRef,
    teens: linkTeensRef,
  };
  const [timeLeft, setTimeLeft] = useState(headerConfig.countdown.initialTime);

  // Rotate promotions every 3 seconds
  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promotions.length);
    }, headerConfig.timers.promotionRotation);

    return () => clearInterval(rotationTimer);
  }, [promotions.length]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, headerConfig.timers.countdownInterval);

    return () => clearInterval(timer);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search drawer when clicking outside
  useEffect(() => {
    const handleClickOutsideSearch = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isSearchDrawerOpen &&
        searchDrawerRef.current &&
        !searchDrawerRef.current.contains(target)
      ) {
        // Don't close if clicking on the search input in the header
        const searchInput = document.querySelector(
          'input[type="text"][placeholder*="looking"]',
        );
        if (searchInput && searchInput.contains(target)) {
          return;
        }
        setIsSearchDrawerOpen(false);
      }
    };

    if (isSearchDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutsideSearch);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
    };
  }, [isSearchDrawerOpen]);

  // Click outside to close drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!activeDrawer) return;

      const target = event.target as Node;
      const currentLinkRef = linkRefs[activeDrawer];

      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        currentLinkRef?.current &&
        !currentLinkRef.current.contains(target)
      ) {
        setActiveDrawer(null);
      }
    };

    if (activeDrawer) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDrawer]);

  const getNavLabel = (
    section: NavigationSection,
    linkId: string,
    fallback: string,
  ) => headerCopy.navigation[section]?.[linkId] ?? fallback;

  // Get current promotion for background color
  const currentPromo = promotions[currentPromoIndex];

  const handleSearchInputClick = () => {
    setIsSearchDrawerOpen(true);
  };

  const handleSearchDrawerClose = () => {
    setIsSearchDrawerOpen(false);
    setSearchQuery("");
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`bg-white dark:bg-(--colorWhite) sticky top-0 z-50 font-normal ${isSearchDrawerOpen ? "hidden" : ""}`}
      >
        {/* Top Promotional Bar */}
        <div
          className={`text-[13px] py-2 px-4 sm:px-6 xl:py-[6px] xl:px-[36px] transition-all duration-300 font-normal ${
            currentPromo.type === "generic"
              ? "bg-gray-200 dark:bg-(--colorLightGrey)"
              : "bg-black dark:bg-black"
          } ${isScrolled ? "hidden" : ""}`}
        >
          <div className="mx-auto max-w-screen-2xl px-2 sm:px-4">
            <ul className="flex items-center justify-center relative h-6">
              {promotions.map((promo, index) => (
                <li
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    index === currentPromoIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center space-x-2 ${
                      promo.type === "generic"
                        ? "text-(--color-preto) dark:text-(--color-preto)"
                        : "text-white dark:text-white"
                    }`}
                  >
                    {promo.type === "promotion" && promo.showCountdown ? (
                      <>
                        <a
                          href={promo.link}
                          target="_self"
                          className="underline hover:no-underline"
                        >
                          {headerCopy.promotions[promo.id] ?? promo.text}
                        </a>
                        <span>|</span>
                        <span>{headerCopy.countdown.endsIn}</span>
                        <span data-testid="countdown" className="font-semibold">
                          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                          {timeLeft.seconds}s
                        </span>
                        {promo.showShopNow && (
                          <>
                            <span>|</span>
                            <a href={promo.link} target="_self">
                              {headerCopy.countdown.shopNow}
                            </a>
                          </>
                        )}
                      </>
                    ) : (
                      <a
                        href={promo.link}
                        target="_self"
                        className="underline hover:no-underline"
                      >
                        {headerCopy.promotions[promo.id] ?? promo.text}
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Header */}
        <div
          className={`relative ${isScrolled ? "border-b border-gray-300 dark:border-(--color-platinum)" : ""}`}
        >
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 xl:px-10">
            {/* Desktop Layout */}
            <div className="hidden xl:block">
              {/* First Row - Primary Navigation */}
              <div className="flex items-center justify-between w-[1440px] h-[68px] my-0 ml-0 mr-[40.4px] py-0 px-[48px]">
                {/* Left - Primary Categories */}
                <div className="hidden lg:flex items-center space-x-6">
                  {primaryNavigationLinks.map((link) => (
                    <Link key={link.id} href={link.href} className={link.className}>
                      {getNavLabel("primary", link.id, link.label)}
                    </Link>
                  ))}
                </div>

                {/* Center - Logo */}
                <div className="flex-1 flex justify-center items-center">
                  <Link href={headerConfig.logo.href}>
                    <h1 className="text-3xl font-extrabold text-(--color-preto) dark:text-(--color-preto) tracking-tight uppercase w-[290px] h-[26px]">
                      {headerCopy.logoText}
                    </h1>
                  </Link>
                </div>

                {/* Right - User Icons */}
                <div className="flex items-center space-x-4">
                  {/* Country Flag */}
                  <button
                    ref={flagButtonRefDesktop}
                    onClick={() => setIsLanguageModalOpen(true)}
                    className="hidden md:block w-6 h-6 rounded-full overflow-hidden border border-gray-300 dark:border-platinum hover:border-gray-400 dark:hover:border-silver transition cursor-pointer relative"
                    aria-label="Select language"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* India Flag */}
                      <rect width="24" height="8" fill="#FF9933" />
                      <rect y="8" width="24" height="8" fill="#FFFFFF" />
                      <rect y="16" width="24" height="8" fill="#138808" />
                      <circle cx="12" cy="12" r="2.5" fill="#000080" />
                    </svg>
                  </button>

                  {/* Adjustments Icon */}
                  <button
                    onClick={() => setIsThemeDrawerOpen(true)}
                    className="hidden md:block text-(--color-preto) dark:text-(--color-preto) hover:text-gray-700 dark:hover:text-gray-300 transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-(--colorGrey) cursor-pointer"
                  >
                    <SlidersHorizontal className="w-6 h-6" />
                  </button>

                  {/* Profile */}
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="text-(--color-preto) dark:text-(--color-preto) hover:text-gray-700 dark:hover:text-gray-300 transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-(--colorGrey) cursor-pointer"
                  >
                    <FaRegUser className="w-6 h-6" />
                    <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white dark:text-(--color-preto) text-xs border border-gray-400 dark:border-(--color-platinum) whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {headerCopy.tooltips.signIn}
                    </span>
                  </button>

                  {/* Wishlist */}
                  <Link
                    href="/wishlist"
                    className="text-(--color-preto) dark:text-(--color-preto) hover:text-(--color-preto) dark:hover:text-(--color-preto) transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-(--colorGrey)"
                  >
                    <GoHeart className="w-6 h-6" strokeWidth={1.0} />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                    <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white dark:text-(--color-preto) text-xs border border-gray-400 dark:border-(--color-platinum) whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {headerCopy.tooltips.wishlist}
                    </span>
                  </Link>

                  {/* Shopping Bag */}
                  <Link
                    href="/cart"
                    className="text-(--color-preto) dark:text-(--color-preto) hover:text-(--color-preto) dark:hover:text-(--color-preto) transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-(--colorGrey)"
                  >
                    <HiOutlineShoppingBag className="w-6 h-6" strokeWidth={2.0} />
                    {cartCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                    <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white dark:text-(--color-preto) text-xs border border-gray-400 dark:border-(--color-platinum) whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {headerCopy.tooltips.bag}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Second Row - Secondary Navigation and Search */}
              <div className="flex items-center justify-between w-[1440px] h-[68px] my-0 ml-0 mr-[40.4px] py-0 px-[48px]">
                {/* Left - Categories */}
                <div className="hidden lg:flex items-center space-x-6 overflow-x-auto">
                  {navigationLinks.map((link, index) => {
                    const translatedLabel = getNavLabel(
                      navigationSectionKey,
                      link.id,
                      link.label,
                    );
                    if (link.hasDrawer) {
                      const drawerType = link.drawerType as
                        | "25off"
                        | "newIn"
                        | "holidaySeason"
                        | "brands"
                        | "clothing"
                        | "shoes"
                        | "bags"
                        | "accessories"
                        | "jewellery"
                        | "watches"
                        | "homeware"
                        | "preOwned"
                        | "sale"
                        | "0-36months"
                        | "0-12months"
                        | "teens";
                      const linkRef = linkRefs[drawerType];

                      const isActive = activeDrawer === drawerType;
                      const shouldBeGray = activeDrawer !== null && !isActive;
                      let linkClassName = link.className;
                      if (shouldBeGray) {
                      if (linkClassName.includes("text-preto")) {
                        linkClassName = linkClassName.replace("text-preto", "text-gray-500");
                        } else if (linkClassName.includes("text-red-600")) {
                          linkClassName = linkClassName.replace(
                            "text-red-600",
                            "text-gray-500",
                          );
                        }
                      }

                      return (
                        <div
                          key={link.id ?? index}
                          ref={linkRef}
                          className="relative"
                          onMouseEnter={() => setActiveDrawer(drawerType)}
                        >
                          <Link href={link.href} className={linkClassName}>
                            {translatedLabel}
                          </Link>
                        </div>
                      );
                    }
                    const shouldBeGray = activeDrawer !== null;
                    let linkClassName = link.className;
                    if (shouldBeGray) {
                      if (linkClassName.includes("text-preto")) {
                        linkClassName = linkClassName.replace("text-preto", "text-gray-500");
                      } else if (linkClassName.includes("text-red-600")) {
                        linkClassName = linkClassName.replace(
                          "text-red-600",
                          "text-gray-500",
                        );
                      }
                    }
                    return (
                      <Link
                        key={link.id ?? index}
                        href={link.href}
                        className={link.className}
                      >
                        {translatedLabel}
                      </Link>
                    );
                  })}
                </div>

                {/* Right - Search Bar */}
                <div className="flex-1 lg:flex-none lg:ml-4 flex justify-end">
                  <div className="relative w-[270px] h-[44px]">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-(--color-hina)"
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
                      type="text"
                      placeholder={headerCopy.searchPlaceholder}
                      className="w-full pl-10 pr-4 py-2 border-b border-(--color-preto) dark:border-(--color-preto) focus:outline-none focus:border-gray-900 dark:focus:border-(--color-preto) text-base dark:text-(--color-preto) dark:bg-transparent cursor-pointer"
                      onClick={handleSearchInputClick}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile & Tablet Layout */}
            <div className="xl:hidden">
              {/* First Row - Primary Navigation */}
              <div className="flex w-full flex-wrap items-center gap-3 py-4">
                <div className="flex flex-1 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:border-platinum dark:text-preto dark:hover:border-silver"
                    aria-label={`${isMenuOpen ? "Close" : "Open"} navigation menu`}
                  >
                    {isMenuOpen ? (
                      <FiX className="h-5 w-5" />
                    ) : (
                      <FiMenu className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Center - Logo */}
                <div className="flex flex-1 justify-center">
                  <Link href={headerConfig.logo.href}>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-(--color-preto) dark:text-(--color-preto) tracking-tight uppercase">
                      {headerCopy.logoText}
                    </h1>
                  </Link>
                </div>

                {/* Right - User Icons */}
                <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
                  {/* Country Flag */}
                  <button
                    ref={flagButtonRefMobile}
                    onClick={() => setIsLanguageModalOpen(true)}
                    className="w-6 h-6 rounded-full overflow-hidden border border-gray-300 dark:border-platinum hover:border-gray-400 dark:hover:border-silver transition cursor-pointer relative"
                    aria-label="Select language"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* India Flag */}
                      <rect width="24" height="8" fill="#FF9933" />
                      <rect y="8" width="24" height="8" fill="#FFFFFF" />
                      <rect y="16" width="24" height="8" fill="#138808" />
                      <circle cx="12" cy="12" r="2.5" fill="#000080" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="text-(--color-preto) dark:text-(--color-preto) hover:text-gray-700 dark:hover:text-gray-300 transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-(--colorGrey) cursor-pointer"
                  >
                    <FaRegUser className="w-6 h-6" />
                    <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white dark:text-(--color-preto) text-xs border border-gray-400 dark:border-(--color-platinum) whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {headerCopy.tooltips.signIn}
                    </span>
                  </button>
                  <Link
                    href="/wishlist"
                    className="text-(--color-preto) dark:text-(--color-preto) hover:text-(--color-preto) dark:hover:text-(--color-preto) transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-(--colorGrey)"
                  >
                    <GoHeart className="w-6 h-6" strokeWidth={1.0} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                    <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white dark:text-(--color-preto) text-xs border border-gray-400 dark:border-(--color-platinum) whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {headerCopy.tooltips.wishlist}
                    </span>
                  </Link>
                  <Link
                    href="/cart"
                    className="text-(--color-preto) dark:text-(--color-preto) hover:text-(--color-preto) dark:hover:text-(--color-preto) transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-(--colorGrey)"
                  >
                    <HiOutlineShoppingBag className="w-6 h-6" strokeWidth={2.0} />
                    <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white dark:text-(--color-preto) text-xs border border-gray-400 dark:border-(--color-platinum) whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {headerCopy.tooltips.bag}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Secondary Navigation and Search */}
              <div className="flex flex-col gap-4 border-t border-gray-200 py-4 dark:border-(--color-platinum)">
                <div className="flex items-center gap-4 overflow-x-auto text-sm text-(--color-preto) dark:text-(--color-preto)">
                  {navigationLinks.map((link) => (
                    <Link
                      key={`mobile-${link.id}`}
                      href={link.href}
                      onClick={handleMobileLinkClick}
                      className="whitespace-nowrap font-medium"
                    >
                      {getNavLabel(
                        navigationSectionKey,
                        link.id,
                        link.label,
                      )}
                    </Link>
                  ))}
                </div>

                <div className="w-full">
                  <div className="relative h-11 w-full">
                    <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-(--color-hina)"
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
                      type="text"
                      placeholder={headerCopy.searchPlaceholder}
                      className="w-full pl-10 pr-4 py-2 border-b border-(--color-preto) dark:border-(--color-preto) focus:outline-none focus:border-gray-900 dark:focus:border-(--color-preto) text-base dark:text-(--color-preto) dark:bg-transparent cursor-pointer"
                      onClick={handleSearchInputClick}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Menu Drawer */}
              {isMenuOpen && (
                <div className="border-t border-gray-200 py-4 dark:border-(--color-platinum)">
                  <div className="space-y-6">
                    <div className="flex flex-col gap-3 text-base font-medium">
                      {primaryNavigationLinks.map((link) => (
                        <Link
                          key={`primary-mobile-${link.id}`}
                          href={link.href}
                          className="text-(--color-preto) dark:text-(--color-preto)"
                          onClick={handleMobileLinkClick}
                        >
                          {getNavLabel("primary", link.id, link.label)}
                        </Link>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {navigationLinks.map((link) => (
                        <Link
                          key={`secondary-mobile-${link.id}`}
                          href={link.href}
                          className="rounded border border-gray-200 px-3 py-2 text-(--color-preto) dark:border-(--color-platinum) dark:text-(--color-preto)"
                          onClick={handleMobileLinkClick}
                        >
                          {getNavLabel(
                            navigationSectionKey,
                            link.id,
                            link.label,
                          )}
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 border-t border-gray-200 pt-4 dark:border-(--color-platinum) text-sm">
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-2 text-(--color-preto) dark:text-(--color-preto)"
                        onClick={handleMobileLinkClick}
                      >
                      <div className="relative">
                        <GoHeart className="h-4 w-4" />
                        {wishlistCount > 0 && (
                          <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-black text-white text-[10px] font-semibold flex items-center justify-center">
                            {wishlistCount}
                          </span>
                        )}
                      </div>
                        {headerCopy.tooltips.wishlist}
                      </Link>
                      <Link
                        href="/cart"
                        className="flex items-center gap-2 text-(--color-preto) dark:text-(--color-preto)"
                        onClick={handleMobileLinkClick}
                      >
                        <div className="relative">
                          <HiOutlineShoppingBag className="h-4 w-4" />
                          {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-black text-white text-[10px] font-semibold flex items-center justify-center">
                              {cartCount}
                            </span>
                          )}
                        </div>
                        {headerCopy.tooltips.bag}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Drawers - Positioned relative to header */}
          {activeDrawer && (
            <GenericDrawer
              isDrawerOpen={true}
              drawerRef={drawerRef}
              onMouseEnter={() => setActiveDrawer(activeDrawer)}
              drawerType={activeDrawer}
              department={currentDepartment}
            />
          )}
        </div>
      </header>

      {/* Search Drawer */}
      <SearchDrawer
        isDrawerOpen={isSearchDrawerOpen}
        drawerRef={searchDrawerRef as React.Ref<HTMLDivElement>}
        onClose={handleSearchDrawerClose}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Theme Settings Drawer */}
      <ThemeSettingsDrawer
        isOpen={isThemeDrawerOpen}
        onClose={() => setIsThemeDrawerOpen(false)}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Language Modal */}
      {isLanguageModalOpen && (
        <LanguageModal
          isOpen={isLanguageModalOpen}
          onClose={() => setIsLanguageModalOpen(false)}
          buttonRef={
            flagButtonRefDesktop.current
              ? flagButtonRefDesktop
              : flagButtonRefMobile.current
                ? flagButtonRefMobile
                : undefined
          }
        />
      )}
    </>
  );
};

export default Header;
