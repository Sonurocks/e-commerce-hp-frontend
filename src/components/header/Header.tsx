'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { SlidersHorizontal } from "lucide-react";
import { promotions, primaryNavigationLinks, secondaryNavigationLinks, menswearSecondaryNavigationLinks, kidswearSecondaryNavigationLinks, headerConfig } from '../../constants';
import { DepartmentKey } from '../../constants/department';
import GenericDrawer from './drawer/GenericDrawer';
import SearchDrawer from './drawer/SearchDrawer';
import ThemeSettingsDrawer from '../theme/ThemeSettingsDrawer';

const Header = () => {
  const pathname = usePathname();
  const isKidswearPage = pathname?.startsWith('/kidswear');
  const isMenswearPage = pathname?.startsWith('/menswear');
  
  // Determine current department
  const currentDepartment: DepartmentKey = isKidswearPage 
    ? 'kidswear' 
    : isMenswearPage 
    ? 'menswear' 
    : 'womenswear';
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<'25off' | 'newIn' | 'holidaySeason' | 'brands' | 'clothing' | 'shoes' | 'bags' | 'accessories' | 'jewellery' | 'watches' | 'homeware' | 'preOwned' | 'sale' | '0-36months' | '0-12months' | 'teens' | null>(null);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  const searchDrawerRef = useRef<HTMLDivElement>(null);
  const navigationLinks = isKidswearPage 
    ? kidswearSecondaryNavigationLinks 
    : isMenswearPage 
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
    '25off': link25OffRef,
    'newIn': linkNewInRef,
    'holidaySeason': linkHolidaySeasonRef,
    'brands': linkBrandsRef,
    'clothing': linkClothingRef,
    'shoes': linkShoesRef,
    'bags': linkBagsRef,
    'accessories': linkAccessoriesRef,
    'jewellery': linkJewelleryRef,
    'watches': linkWatchesRef,
    'homeware': linkHomewareRef,
    'preOwned': linkPreOwnedRef,
    'sale': linkSaleRef,
    '0-36months': linkZeroThreeMonthsRef,
    '0-12months': linkZeroTwelveMonthsRef,
    'teens': linkTeensRef,
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        const searchInput = document.querySelector('input[type="text"][placeholder*="looking"]');
        if (searchInput && searchInput.contains(target)) {
          return;
        }
        setIsSearchDrawerOpen(false);
      }
    };

    if (isSearchDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutsideSearch);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSearch);
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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDrawer]);

  // Get current promotion for background color
  const currentPromo = promotions[currentPromoIndex];

  const handleSearchInputClick = () => {
    setIsSearchDrawerOpen(true);
  };

  const handleSearchDrawerClose = () => {
    setIsSearchDrawerOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className={`bg-white dark:bg-[var(--colorWhite)] sticky top-0 z-50 font-normal ${isSearchDrawerOpen ? 'hidden' : ''}`}>
      {/* Top Promotional Bar */}
      <div
        className={`text-[13px] py-[6px] px-[36px] transition-all duration-300 font-normal ${
          currentPromo.type === 'generic'
            ? 'bg-gray-200 dark:bg-[var(--colorLightGrey)]'
            : 'bg-black dark:bg-black'
        } ${isScrolled ? 'hidden' : ''}`}
      >
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center relative h-6">
            {promotions.map((promo, index) => (
              <li
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  index === currentPromoIndex
                    ? 'opacity-100 z-10'
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <span
                  className={`flex items-center justify-center space-x-2 ${
                    promo.type === 'generic' ? 'text-(--color-preto) dark:text-[var(--color-preto)]' : 'text-white dark:text-white'
                  }`}
                >
                  {promo.type === 'promotion' && promo.showCountdown ? (
                    <>
                      <a
                        href={promo.link}
                        target="_self"
                        className="underline hover:no-underline"
                      >
                        {promo.text}
                      </a>
                      <span>|</span>
                      <span>{headerConfig.countdown.text.endsIn}</span>
                      <span
                        data-testid="countdown"
                        className="font-semibold"
                      >
                        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{' '}
                        {timeLeft.seconds}s
                      </span>
                      {promo.showShopNow && (
                        <>
                          <span>|</span>
                          <a
                            href={promo.link}
                            target="_self"
                            
                          >
                            {headerConfig.countdown.text.shopNow}
                          </a>
                          <span>&nbsp;</span>
                        </>
                      )}
                    </>
                  ) : (
                    <a
                      href={promo.link}
                      target="_self"
                      className="underline hover:no-underline"
                    >
                      {promo.text}
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Header */}
      <div className={`relative ${isScrolled ? 'border-b border-gray-300 dark:border-[var(--color-platinum)]' : ''}`}>
        <div className="container mx-auto py-0 px-[36px]">
          {/* First Row - Primary Navigation */}
          <div className="flex items-center justify-between w-[1440px] h-[68px] my-0 ml-0 mr-[40.4px] py-0 px-[48px]">
            {/* Left - Primary Categories */}
            <div className="hidden lg:flex items-center space-x-6">
              {primaryNavigationLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={link.className}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center items-center">
              <Link href={headerConfig.logo.href}>
                <h1 className="text-3xl font-extrabold text-(--color-preto) dark:text-[var(--color-preto)] tracking-tight uppercase w-[290px] h-[26px]">
                  {headerConfig.logo.text}
                </h1>
              </Link>
            </div>

            {/* Right - User Icons */}
            <div className="flex items-center space-x-4">
              {/* Country Flag */}
              <button className="hidden md:block w-6 h-6 rounded-full overflow-hidden border border-gray-300 dark:border-[var(--color-platinum)] hover:border-gray-400 dark:hover:border-[var(--color-silver)] transition">
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
                className="hidden md:block text-[var(--color-preto)] dark:text-[var(--color-preto)] hover:text-gray-700 dark:hover:text-gray-300 transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[var(--colorGrey)]"
              >
                <SlidersHorizontal className="w-6 h-6" />
              </button>

              {/* Profile */}
              <button className="text-(--color-preto) dark:text-[var(--color-preto)] hover:text-gray-700 dark:hover:text-gray-300 transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[var(--colorGrey)]">
                <FaRegUser className="w-6 h-6" />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white dark:text-[var(--color-preto)] text-xs border border-gray-400 dark:border-[var(--color-platinum)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {headerConfig.tooltips.signIn}
                </span>
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="text-(--color-preto) dark:text-[var(--color-preto)] hover:text-(--color-preto) dark:hover:text-[var(--color-preto)] transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[var(--colorGrey)]">
                <GoHeart className="w-6 h-6" strokeWidth={1.0} />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white dark:text-[var(--color-preto)] text-xs border border-gray-400 dark:border-[var(--color-platinum)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {headerConfig.tooltips.wishlist}
                </span>
              </Link>

              {/* Shopping Bag */}
              <Link href="/cart" className="text-(--color-preto) dark:text-[var(--color-preto)] hover:text-(--color-preto) dark:hover:text-[var(--color-preto)] transition relative group px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[var(--colorGrey)]">
                <HiOutlineShoppingBag className="w-6 h-6" strokeWidth={2.0} />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white dark:text-[var(--color-preto)] text-xs border border-gray-400 dark:border-[var(--color-platinum)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {headerConfig.tooltips.bag}
                </span>
              </Link>

             
            </div>
          </div>

          {/* Second Row - Secondary Navigation and Search */}
          <div className="flex items-center justify-between w-[1440px] h-[68px] my-0 ml-0 mr-[40.4px] py-0 px-[48px]">
            {/* Left - Categories */}
            <div className="hidden lg:flex items-center space-x-6 overflow-x-auto">
              {navigationLinks.map((link, index) => {
                if (link.hasDrawer) {
                  const drawerType = link.drawerType as '25off' | 'newIn' | 'holidaySeason' | 'brands' | 'clothing' | 'shoes' | 'bags' | 'accessories' | 'jewellery' | 'watches' | 'homeware' | 'preOwned' | 'sale' | '0-36months' | '0-12months' | 'teens';
                  const linkRef = linkRefs[drawerType];
                  
                  const isActive = activeDrawer === drawerType;
                  const shouldBeGray = activeDrawer !== null && !isActive;
                  let linkClassName = link.className;
                  if (shouldBeGray) {
                    if (linkClassName.includes('text-[var(--color-preto)]')) {
                      linkClassName = linkClassName.replace('text-[var(--color-preto)]', 'text-gray-500');
                    } else if (linkClassName.includes('text-red-600')) {
                      linkClassName = linkClassName.replace('text-red-600', 'text-gray-500');
                    }
                  }
                  
                  return (
                    <div
                      key={index}
                      ref={linkRef}
                      className="relative"
                      onMouseEnter={() => setActiveDrawer(drawerType)}
                    >
                      <Link
                        href={link.href}
                        className={linkClassName}
                      >
                        {link.label}
                      </Link>
                    </div>
                  );
                }
                const shouldBeGray = activeDrawer !== null;
                let linkClassName = link.className;
                if (shouldBeGray) {
                  if (linkClassName.includes('text-[var(--color-preto)]')) {
                    linkClassName = linkClassName.replace('text-[var(--color-preto)]', 'text-gray-500');
                  } else if (linkClassName.includes('text-red-600')) {
                    linkClassName = linkClassName.replace('text-red-600', 'text-gray-500');
                  }
                }
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={linkClassName}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right - Search Bar */}
            <div className="flex-1 lg:flex-none lg:ml-4">
              <div className="relative w-[270px] h-[44px]">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-[var(--color-hina)]"
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
                  placeholder={headerConfig.search.placeholder}
                  className="w-full pl-10 pr-4 py-2 border-b border-[var(--color-preto)] dark:border-[var(--color-preto)] focus:outline-none focus:border-gray-900 dark:focus:border-[var(--color-preto)] text-base dark:text-[var(--color-preto)] dark:bg-transparent cursor-pointer"
                  onClick={handleSearchInputClick}
                  readOnly
                />
              </div>
            </div>
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
    </>
  );
};

export default Header;

