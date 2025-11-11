'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 10,
    minutes: 43,
    seconds: 20,
  });

  // Promotional messages array
  const promotions = [
    {
      type: 'promotion',
      text: 'Enjoy 25% off the new season',
      link: '/promotions/women/promo-event',
      showCountdown: true,
      showShopNow: true,
    },
    {
      type: 'generic',
      text: 'New pieces added daily',
      link: 'https://www.farfetch.com/sets/new-in-this-week-eu-women.aspx',
      showCountdown: false,
      showShopNow: false,
    },
  ];

  // Rotate promotions every 3 seconds
  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promotions.length);
    }, 3000);

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
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get current promotion for background color
  const currentPromo = promotions[currentPromoIndex];

  return (
    <header className="bg-white sticky top-0 z-50" style={{ fontFamily: "var(--fontNormal)" }}>
      {/* Top Promotional Bar */}
      <div
        className={`text-[13px] py-[6px] px-[36px] transition-colors duration-500 ${
          currentPromo.type === 'generic'
            ? 'bg-gray-200'
            : 'bg-black'
        }`}
        style={{ fontFamily: "var(--fontNormal)" }}
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
                      <span>Ends in</span>
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
                            Shop now
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
      <div>
        <div className="container mx-auto py-0 px-[36px]">
          {/* First Row - Primary Navigation */}
          <div className="flex items-center justify-between w-[1440px] h-[68px] my-0 ml-0 mr-[40.4px] py-0 px-[48px]">
            {/* Left - Primary Categories */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link
                href="/womenswear"
                className="text-gray-700 hover:text-gray-900 font-bold text-sm transition px-3 py-1.5 rounded hover:bg-gray-100"
              >
                Womenswear
              </Link>
              <Link
                href="/menswear"
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition px-3 py-1.5 rounded hover:bg-gray-100"
              >
                Menswear
              </Link>
              <Link
                href="/kidswear"
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition px-3 py-1.5 rounded hover:bg-gray-100"
              >
                Kidswear
              </Link>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center lg:flex-none">
              <Link href="/">
                <h1 className="text-4xl font-bold text-black tracking-tight uppercase w-[250px] h-[30px]">
                  FARFETCH
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
                  Sign in
                </span>
              </button>

              {/* Wishlist */}
              <button className="text-gray-900 hover:text-black transition relative group px-2 py-1.5 rounded hover:bg-gray-100">
                <GoHeart className="w-6 h-6" strokeWidth={1.0} />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs border border-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Wishlist
                </span>
              </button>

              {/* Shopping Bag */}
              <button className="text-gray-900 hover:text-black transition relative group px-2 py-1.5 rounded hover:bg-gray-100">
                <HiOutlineShoppingBag className="w-6 h-6" strokeWidth={2.0} />
                <span className="absolute left-full top-full ml-2 mt-1 px-2 py-1 bg-gray-800 text-white text-xs border border-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Bag
                </span>
              </button>

             
            </div>
          </div>

          {/* Second Row - Secondary Navigation and Search */}
          <div className="flex items-center justify-between w-[1440px] h-[68px] my-0 ml-0 mr-[40.4px] py-0 px-[48px]">
            {/* Left - Categories */}
            <div className="hidden lg:flex items-center space-x-6 overflow-x-auto">
              <Link
                href="/sale/25-off"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                25% off
              </Link>
              <Link
                href="/new-in"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                New in
              </Link>
              <Link
                href="/holiday-season"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Holiday season
              </Link>
              <Link
                href="/brands"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Brands
              </Link>
              <Link
                href="/clothing"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Clothing
              </Link>
              <Link
                href="/shoes"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Shoes
              </Link>
              <Link
                href="/bags"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Bags
              </Link>
              <Link
                href="/accessories"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Accessories
              </Link>
              <Link
                href="/jewellery"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Jewellery
              </Link>
              <Link
                href="/homeware"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Homeware
              </Link>
              <Link
                href="/pre-owned"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Pre-owned
              </Link>
              <Link
                href="/sale"
                className="text-red-600 hover:text-red-700 text-sm whitespace-nowrap font-medium transition"
              >
                Sale
              </Link>
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
                  placeholder="What are you looking for?"
                  className="w-full pl-10 pr-4 py-2 border-b border-black focus:outline-none focus:border-gray-900 text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </header>
  );
};

export default Header;
