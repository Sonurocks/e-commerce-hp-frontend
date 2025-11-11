'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { promotions, primaryNavigationLinks, secondaryNavigationLinks, headerConfig } from '../../constants';
import Drawer from './drawer/25%off';
import NewInDrawer from './drawer/NewIn';
import HolidaySeasonDrawer from './drawer/HolidaySeason';
import BrandsDrawer from './drawer/Brands';
import ClothingDrawer from './drawer/Clothing';
import ShoesDrawer from './drawer/Shoes';
import BagsDrawer from './drawer/Bags';
import AccessoriesDrawer from './drawer/Accessories';
import JewelleryDrawer from './drawer/Jewellery';
import HomewareDrawer from './drawer/Homeware';
import PreOwnedDrawer from './drawer/PreOwned';
import SaleDrawer from './drawer/Sale';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<'25off' | 'newIn' | 'holidaySeason' | 'brands' | 'clothing' | 'shoes' | 'bags' | 'accessories' | 'jewellery' | 'homeware' | 'preOwned' | 'sale' | null>(null);
  const drawer25OffRef = useRef<HTMLDivElement>(null);
  const drawerNewInRef = useRef<HTMLDivElement>(null);
  const drawerHolidaySeasonRef = useRef<HTMLDivElement>(null);
  const drawerBrandsRef = useRef<HTMLDivElement>(null);
  const drawerClothingRef = useRef<HTMLDivElement>(null);
  const drawerShoesRef = useRef<HTMLDivElement>(null);
  const drawerBagsRef = useRef<HTMLDivElement>(null);
  const drawerAccessoriesRef = useRef<HTMLDivElement>(null);
  const drawerJewelleryRef = useRef<HTMLDivElement>(null);
  const drawerHomewareRef = useRef<HTMLDivElement>(null);
  const drawerPreOwnedRef = useRef<HTMLDivElement>(null);
  const drawerSaleRef = useRef<HTMLDivElement>(null);
  const link25OffRef = useRef<HTMLDivElement>(null);
  const linkNewInRef = useRef<HTMLDivElement>(null);
  const linkHolidaySeasonRef = useRef<HTMLDivElement>(null);
  const linkBrandsRef = useRef<HTMLDivElement>(null);
  const linkClothingRef = useRef<HTMLDivElement>(null);
  const linkShoesRef = useRef<HTMLDivElement>(null);
  const linkBagsRef = useRef<HTMLDivElement>(null);
  const linkAccessoriesRef = useRef<HTMLDivElement>(null);
  const linkJewelleryRef = useRef<HTMLDivElement>(null);
  const linkHomewareRef = useRef<HTMLDivElement>(null);
  const linkPreOwnedRef = useRef<HTMLDivElement>(null);
  const linkSaleRef = useRef<HTMLDivElement>(null);
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

  // Click outside to close drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check for 25% off drawer
      if (activeDrawer === '25off') {
        if (
          drawer25OffRef.current && 
          !drawer25OffRef.current.contains(target) && 
          link25OffRef.current && 
          !link25OffRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for New In drawer
      if (activeDrawer === 'newIn') {
        if (
          drawerNewInRef.current && 
          !drawerNewInRef.current.contains(target) && 
          linkNewInRef.current && 
          !linkNewInRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Holiday Season drawer
      if (activeDrawer === 'holidaySeason') {
        if (
          drawerHolidaySeasonRef.current && 
          !drawerHolidaySeasonRef.current.contains(target) && 
          linkHolidaySeasonRef.current && 
          !linkHolidaySeasonRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Brands drawer
      if (activeDrawer === 'brands') {
        if (
          drawerBrandsRef.current && 
          !drawerBrandsRef.current.contains(target) && 
          linkBrandsRef.current && 
          !linkBrandsRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Clothing drawer
      if (activeDrawer === 'clothing') {
        if (
          drawerClothingRef.current && 
          !drawerClothingRef.current.contains(target) && 
          linkClothingRef.current && 
          !linkClothingRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Shoes drawer
      if (activeDrawer === 'shoes') {
        if (
          drawerShoesRef.current && 
          !drawerShoesRef.current.contains(target) && 
          linkShoesRef.current && 
          !linkShoesRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Bags drawer
      if (activeDrawer === 'bags') {
        if (
          drawerBagsRef.current && 
          !drawerBagsRef.current.contains(target) && 
          linkBagsRef.current && 
          !linkBagsRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Accessories drawer
      if (activeDrawer === 'accessories') {
        if (
          drawerAccessoriesRef.current && 
          !drawerAccessoriesRef.current.contains(target) && 
          linkAccessoriesRef.current && 
          !linkAccessoriesRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Jewellery drawer
      if (activeDrawer === 'jewellery') {
        if (
          drawerJewelleryRef.current && 
          !drawerJewelleryRef.current.contains(target) && 
          linkJewelleryRef.current && 
          !linkJewelleryRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Homeware drawer
      if (activeDrawer === 'homeware') {
        if (
          drawerHomewareRef.current && 
          !drawerHomewareRef.current.contains(target) && 
          linkHomewareRef.current && 
          !linkHomewareRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Pre-owned drawer
      if (activeDrawer === 'preOwned') {
        if (
          drawerPreOwnedRef.current && 
          !drawerPreOwnedRef.current.contains(target) && 
          linkPreOwnedRef.current && 
          !linkPreOwnedRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
      }
      
      // Check for Sale drawer
      if (activeDrawer === 'sale') {
        if (
          drawerSaleRef.current && 
          !drawerSaleRef.current.contains(target) && 
          linkSaleRef.current && 
          !linkSaleRef.current.contains(target)
        ) {
          setActiveDrawer(null);
        }
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

  return (
    <header className="bg-white sticky top-0 z-50 font-normal">
      {/* Top Promotional Bar */}
      <div
        className={`text-[13px] py-[6px] px-[36px] transition-all duration-300 font-normal ${
          currentPromo.type === 'generic'
            ? 'bg-gray-200'
            : 'bg-black'
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
                    promo.type === 'generic' ? 'text-[var(--color-preto)]' : 'text-white'
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
      <div className={`relative ${isScrolled ? 'border-b border-gray-300' : ''}`}>
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
                <h1 className="text-3xl font-extrabold text-[var(--color-preto)] tracking-tight uppercase w-[290px] h-[26px]">
                  {headerConfig.logo.text}
                </h1>
              </Link>
            </div>

            {/* Right - User Icons */}
            <div className="flex items-center space-x-4">
              {/* Country Flag */}
              <button className="hidden md:block w-6 h-6 rounded-full overflow-hidden border border-gray-300 hover:border-gray-400 transition">
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

              {/* Profile */}
              <button className="text-[var(--color-preto)] hover:text-gray-700 transition relative group px-2 py-1.5 rounded hover:bg-gray-100">
                <FaRegUser className="w-6 h-6" />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs border border-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {headerConfig.tooltips.signIn}
                </span>
              </button>

              {/* Wishlist */}
              <button className="text-gray-900 hover:text-[var(--color-preto)] transition relative group px-2 py-1.5 rounded hover:bg-gray-100">
                <GoHeart className="w-6 h-6" strokeWidth={1.0} />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs border border-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {headerConfig.tooltips.wishlist}
                </span>
              </button>

              {/* Shopping Bag */}
              <button className="text-gray-900 hover:text-[var(--color-preto)] transition relative group px-2 py-1.5 rounded hover:bg-gray-100">
                <HiOutlineShoppingBag className="w-6 h-6" strokeWidth={2.0} />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs border border-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {headerConfig.tooltips.bag}
                </span>
              </button>

             
            </div>
          </div>

          {/* Second Row - Secondary Navigation and Search */}
          <div className="flex items-center justify-between w-[1440px] h-[68px] my-0 ml-0 mr-[40.4px] py-0 px-[48px]">
            {/* Left - Categories */}
            <div className="hidden lg:flex items-center space-x-6 overflow-x-auto">
              {secondaryNavigationLinks.map((link, index) => {
                if (link.hasDrawer) {
                  const drawerType = link.drawerType as '25off' | 'newIn' | 'holidaySeason' | 'brands' | 'clothing' | 'shoes' | 'bags' | 'accessories' | 'jewellery' | 'homeware' | 'preOwned' | 'sale';
                  const linkRef = drawerType === '25off' 
                    ? link25OffRef 
                    : drawerType === 'newIn' 
                    ? linkNewInRef 
                    : drawerType === 'holidaySeason'
                    ? linkHolidaySeasonRef
                    : drawerType === 'brands'
                    ? linkBrandsRef
                    : drawerType === 'clothing'
                    ? linkClothingRef
                    : drawerType === 'shoes'
                    ? linkShoesRef
                    : drawerType === 'bags'
                    ? linkBagsRef
                    : drawerType === 'accessories'
                    ? linkAccessoriesRef
                    : drawerType === 'jewellery'
                    ? linkJewelleryRef
                    : drawerType === 'homeware'
                    ? linkHomewareRef
                    : drawerType === 'preOwned'
                    ? linkPreOwnedRef
                    : linkSaleRef;
                  
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
                  type="text"
                  placeholder={headerConfig.search.placeholder}
                  className="w-full pl-10 pr-4 py-2 border-b border-[var(--color-preto)] focus:outline-none focus:border-gray-900 text-base"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Drawers - Positioned relative to header */}
        <Drawer 
          isDrawerOpen={activeDrawer === '25off'}
          drawerRef={drawer25OffRef}
          onMouseEnter={() => setActiveDrawer('25off')}
        />
        <NewInDrawer 
          isDrawerOpen={activeDrawer === 'newIn'}
          drawerRef={drawerNewInRef}
          onMouseEnter={() => setActiveDrawer('newIn')}
        />
        <HolidaySeasonDrawer 
          isDrawerOpen={activeDrawer === 'holidaySeason'}
          drawerRef={drawerHolidaySeasonRef}
          onMouseEnter={() => setActiveDrawer('holidaySeason')}
        />
        <BrandsDrawer 
          isDrawerOpen={activeDrawer === 'brands'}
          drawerRef={drawerBrandsRef}
          onMouseEnter={() => setActiveDrawer('brands')}
        />
        <ClothingDrawer 
          isDrawerOpen={activeDrawer === 'clothing'}
          drawerRef={drawerClothingRef}
          onMouseEnter={() => setActiveDrawer('clothing')}
        />
        <ShoesDrawer 
          isDrawerOpen={activeDrawer === 'shoes'}
          drawerRef={drawerShoesRef}
          onMouseEnter={() => setActiveDrawer('shoes')}
        />
        <BagsDrawer 
          isDrawerOpen={activeDrawer === 'bags'}
          drawerRef={drawerBagsRef}
          onMouseEnter={() => setActiveDrawer('bags')}
        />
        <AccessoriesDrawer 
          isDrawerOpen={activeDrawer === 'accessories'}
          drawerRef={drawerAccessoriesRef}
          onMouseEnter={() => setActiveDrawer('accessories')}
        />
        <JewelleryDrawer 
          isDrawerOpen={activeDrawer === 'jewellery'}
          drawerRef={drawerJewelleryRef}
          onMouseEnter={() => setActiveDrawer('jewellery')}
        />
        <HomewareDrawer 
          isDrawerOpen={activeDrawer === 'homeware'}
          drawerRef={drawerHomewareRef}
          onMouseEnter={() => setActiveDrawer('homeware')}
        />
        <PreOwnedDrawer 
          isDrawerOpen={activeDrawer === 'preOwned'}
          drawerRef={drawerPreOwnedRef}
          onMouseEnter={() => setActiveDrawer('preOwned')}
        />
        <SaleDrawer 
          isDrawerOpen={activeDrawer === 'sale'}
          drawerRef={drawerSaleRef}
          onMouseEnter={() => setActiveDrawer('sale')}
        />
      </div>
    </header>
  );
};

export default Header;

