'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { promotions, primaryNavigationLinks, secondaryNavigationLinks, headerConfig } from '../../constants';
import Drawer from './drawer/25%off';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
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
      
      // If click is outside both drawer and link wrapper, close drawer
      if (
        drawerRef.current && 
        !drawerRef.current.contains(target) && 
        linkRef.current && 
        !linkRef.current.contains(target)
      ) {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen]);

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
                    promo.type === 'generic' ? 'text-black' : 'text-white'
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
            <div className="flex-1 flex justify-center lg:flex-none">
              <Link href={headerConfig.logo.href}>
                <h1 className="text-4xl font-bold text-black tracking-tight uppercase w-[250px] h-[30px]">
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
              <button className="text-black hover:text-gray-700 transition relative group px-2 py-1.5 rounded hover:bg-gray-100">
                <FaRegUser className="w-6 h-6" />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs border border-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {headerConfig.tooltips.signIn}
                </span>
              </button>

              {/* Wishlist */}
              <button className="text-gray-900 hover:text-black transition relative group px-2 py-1.5 rounded hover:bg-gray-100">
                <GoHeart className="w-6 h-6" strokeWidth={1.0} />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs border border-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {headerConfig.tooltips.wishlist}
                </span>
              </button>

              {/* Shopping Bag */}
              <button className="text-gray-900 hover:text-black transition relative group px-2 py-1.5 rounded hover:bg-gray-100">
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
                  return (
                    <div
                      key={index}
                      ref={linkRef}
                      className="relative"
                      onMouseEnter={() => setIsDrawerOpen(true)}
                    >
                      <Link
                        href={link.href}
                        className={link.className}
                      >
                        {link.label}
                      </Link>
                    </div>
                  );
                }
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={link.className}
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
                  className="w-full pl-10 pr-4 py-2 border-b border-black focus:outline-none focus:border-gray-900 text-base"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Drawer - Positioned relative to header */}
        <Drawer 
          isDrawerOpen={isDrawerOpen}
          drawerRef={drawerRef}
          onMouseEnter={() => setIsDrawerOpen(true)}
        />
      </div>
    </header>
  );
};

export default Header;

