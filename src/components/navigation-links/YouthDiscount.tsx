"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { footerYouthImage, footerLogoffImage } from "@/assets";
import { useRouter } from "next/navigation";

const YouthDiscount = () => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("IN (+91)");
  const [mobileNumber, setMobileNumber] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  return (
    <div className="min-h-screen  text-preto font-normal">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 sm:mb-6 flex items-center text-sm sm:text-base text-preto hover:opacity-70 transition cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Main Content Card */}
        <div className=" border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {/* Banner Image */}
          <div className="relative w-full h-48 sm:h-56 md:h-64">
            <Image
              src={footerYouthImage}
              alt="Youth Discount Banner"
              className="w-full h-full object-cover"
              fill
              priority
            />
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Logo */}
            <div className="mb-4 sm:mb-6">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                <Image
                  src={footerLogoffImage}
                  alt="Farfetch Logo"
                  className="w-full h-full object-contain"
                  fill
                />
              </div>
            </div>

            {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-2xl font-semibold text-preto mb-3 sm:mb-4">
            18-25 YOUTH DISCOUNT  
          </h1>

          {/* Offer Text */}
          <p className="text-base sm:text-lg md:text-xl font-semibold text-preto mb-2">
            10% off for Under 26s at FARFETCH
          </p>

          {/* Brands */}
          <p className="text-xs sm:text-sm font-thin text-preto mb-1 sm:mb-0">
            Versace, Off-White, Saint Laurent and more.
          </p>

          {/* Instruction */}
          <p className="text-xs sm:text-sm font-thin text-preto mb-3 sm:mb-4">
            To access this discount verify your age.
          </p>

          {/* Mobile Number Section */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-normal text-preto mb-2 sm:mb-3">
              Mobile Number
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              {/* Country Code Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center justify-between w-full sm:w-32 px-4 py-3 border border-preto rounded-lg text-sm font-normal text-preto bg-white hover:bg-gray-50 transition cursor-pointer min-h-[48px]"
                >
                  <span>{countryCode}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-full sm:w-32 bg-white border border-preto rounded-lg shadow-lg z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setCountryCode("IN (+91)");
                        setShowCountryDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-normal text-preto hover:bg-gray-50 transition cursor-pointer min-h-[44px]"
                    >
                      IN (+91)
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Number Input */}
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full sm:flex-1 px-4 py-3 border border-preto rounded-lg text-sm sm:text-base text-preto placeholder:text-gray-400 focus:outline-none focus:border-preto min-h-[48px]"
              />
            </div>

            {/* Why do we need this link */}
            <div className="mt-2 text-right">
              <Link
                href="#"
                className="text-xs font-normal text-preto underline hover:text-preto cursor-pointer"
              >
                Why do we need this?
              </Link>
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            className="w-full bg-[#222] text-white font-normal py-3 sm:py-3.5 text-sm sm:text-base rounded-lg hover:bg-gray-800 transition cursor-pointer mb-3 sm:mb-4 min-h-[48px]"
          >
            Continue
          </button>

          {/* Terms and Conditions */}
          <p className="text-xs font-normal text-gray-600 text-center mb-3 sm:mb-4 leading-relaxed px-2">
            By tapping above you agree to the{" "}
            <Link href="#" className="underline hover:text-preto cursor-pointer">
              Gocertify Terms & Conditions
            </Link>
            . All data is processed inline with our{" "}
            <Link href="#" className="underline hover:text-preto cursor-pointer">
              privacy notice
            </Link>
            .
          </p>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-normal text-preto mb-4 sm:mb-6">
            <Link
              href="#"
              className="underline hover:text-preto cursor-pointer"
            >
              Offer Terms
            </Link>
            <Link
              href="#"
              className="underline hover:text-preto cursor-pointer"
            >
              FAQs
            </Link>
            <Link
              href="#"
              className="underline hover:text-preto cursor-pointer"
            >
              Support
            </Link>
          </div>

          {/* Gocertify Footer */}
          <div className="text-center">
            <p className="text-xs font-normal text-gray-600">
              Instant verification by{" "}
              <span className="inline-flex items-center">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-1 sm:w-3 sm:h-3"
                >
                  <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                </svg>
                Gocertify
              </span>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthDiscount;

