'use client';

import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 11,
    minutes: 0,
    seconds: 44,
  });

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

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Top Promotional Bar */}
      <div className="bg-gray-800 text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <span>
              <a href="#" className="underline hover:no-underline">
                Enjoy 25% off the new season
              </a>
            </span>
            <span>Ends in</span>
            <span className="font-semibold">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
            <span>|</span>
            <a href="#" className="underline hover:no-underline">
              Shop now
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* First Row - Primary Navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Left - Primary Categories */}
            <div className="hidden lg:flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition"
              >
                Womenswear
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition"
              >
                Menswear
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition"
              >
                Kidswear
              </a>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center lg:flex-none">
              <h1 className="text-2xl font-bold text-black tracking-tight uppercase">
                FARFETCH
              </h1>
            </div>

            {/* Right - User Icons */}
            <div className="flex items-center space-x-4">
              {/* Country Flag */}
              <button className="hidden md:block w-6 h-6 rounded-full overflow-hidden border border-gray-300 hover:border-gray-400 transition">
                <svg
                  viewBox="0 0 24 16"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* India Flag */}
                  <rect width="24" height="5.33" fill="#FF9933" />
                  <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
                  <rect y="10.67" width="24" height="5.33" fill="#138808" />
                  <circle cx="12" cy="8" r="2" fill="#000080" />
                </svg>
              </button>

              {/* Profile */}
              <button className="text-gray-700 hover:text-gray-900 transition">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              {/* Wishlist */}
              <button className="text-gray-700 hover:text-gray-900 transition relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Shopping Bag */}
              <button className="text-gray-700 hover:text-gray-900 transition relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Second Row - Secondary Navigation and Search */}
          <div className="flex items-center justify-between py-3 border-t border-gray-200">
            {/* Left - Categories */}
            <div className="hidden lg:flex items-center space-x-6 overflow-x-auto">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                25% off
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                New in
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Holiday season
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Brands
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Clothing
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Shoes
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Bags
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Accessories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Jewellery
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Homeware
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-sm whitespace-nowrap transition"
              >
                Pre-owned
              </a>
              <a
                href="#"
                className="text-red-600 hover:text-red-700 text-sm whitespace-nowrap font-medium transition"
              >
                Sale
              </a>
            </div>

            {/* Right - Search Bar */}
            <div className="flex-1 lg:flex-none lg:ml-8">
              <div className="relative max-w-md lg:max-w-xs">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-900 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
                Womenswear
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
                Menswear
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
                Kidswear
              </a>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 text-sm block mb-2 transition"
                >
                  25% off
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 text-sm block mb-2 transition"
                >
                  New in
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 text-sm block mb-2 transition"
                >
                  Brands
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 text-sm block mb-2 transition"
                >
                  Clothing
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 text-sm block mb-2 transition"
                >
                  Shoes
                </a>
                <a
                  href="#"
                  className="text-red-600 hover:text-red-700 text-sm block font-medium transition"
                >
                  Sale
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
