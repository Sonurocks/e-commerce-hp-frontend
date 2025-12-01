"use client";

import React, { useState } from "react";
import Image from "next/image";
import { footerFarfetchAppImage } from "@/assets";
import { TiHeartOutline } from "react-icons/ti";
import { PiLeafBold } from "react-icons/pi";
import { RiPriceTag3Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

const FarfetchApp = () => {
  const [activeTab, setActiveTab] = useState<"email" | "qr">("email");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
  };

  return (
    <div className="min-h-screen  text-preto font-normal">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Section - Text and Form */}
          <div className="space-y-6 mx-auto lg:mx-0 lg:ml-30 text-center lg:text-left">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold  text-preto max-w-lg">
                THE<br />FARFETCH APP
              </h1>
              <p className="text-base md:text-2xl font-serif text-preto leading-relaxed">
                Our app is available<br/> on iOS and Android.<br/> Get access to so much more...
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-platinum pb-0 mt-12">
              <button
                onClick={() => setActiveTab("email")}
                className={`pb-2 text-sm font-medium transition text-preto ${
                  activeTab === "email"
                    ? "border-b-2 border-preto"
                    : "text-preto hover:opacity-70"
                }`}
              >
                EMAIL ME
              </button>
              <button
                onClick={() => setActiveTab("qr")}
                className={`pb-2 text-sm font-medium transition text-preto ${
                  activeTab === "qr"
                    ? "border-b-2 border-preto"
                    : "text-preto hover:opacity-70"
                }`}
              >
                SCAN QR CODE
              </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === "email" ? (
              <div className="space-y-4 mt-4">
                <p className="text-sm text-preto">
                  Enter your email and we will send you a link to <br/>download the free app.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-3 w-full items-stretch">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="My email is ..."
                    className="flex-1 px-4 py-3 border border-platinum rounded-lg focus:outline-none focus:ring-2 focus:ring-preto text-preto bg-white min-w-0"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#222] text-white rounded-lg font-medium hover:opacity-90 transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    Send
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-preto mb-4">
                  Scan the QR code with your phone to download the app.
                </p>
                <div className="w-64 h-64 bg-gray-100 border-2 border-platinum rounded-lg flex items-center justify-center">
                  <div className="text-center text-preto">
                    <svg
                      className="w-32 h-32 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                    <p className="text-sm">QR Code Placeholder</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Section - iPhone Image */}
          <div className="flex justify-center lg:justify-start lg:ml-35">
            <div className="relative w-full max-w-[300px] h-auto flex items-center justify-center p-6">
              {/* Gray background square */}
              <div className="absolute inset-0 bg-gray-100 -z-10 -mx-40"></div>
              <div className="relative z-10 w-full">
                <Image
                  src={footerFarfetchAppImage}
                  alt="Farfetch App"
                  className="w-full h-auto object-contain max-h-[620px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reasons Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-center text-2xl md:text-3xl font-normal text-preto mb-12">
            Need more reasons? Here is 3:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-32">
            {/* Left Section */}
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <TiHeartOutline className="w-12 h-12 text-preto" />
              </div>
              <h3 className="text-lg font-normal text-preto uppercase">
                A PERSONALISED FEED
              </h3>
              <p className="text-sm text-preto">
                Our latest styles and your favourite designers in one place
              </p>
            </div>

            {/* Middle Section */}
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <PiLeafBold className="w-12 h-12 text-preto" />
              </div>
              <h3 className="text-lg font-normal text-preto uppercase">
                SUSTAINABLE & PRE-OWNED PIECES
              </h3>
              <p className="text-sm text-preto">
                Made with love and made to last
              </p>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <RiPriceTag3Line className="w-12 h-12 text-preto" />
              </div>
              <h3 className="text-lg font-normal text-preto uppercase">
                APP-ONLY PROMOTIONS
              </h3>
              <p className="text-sm text-preto">
                Get a head start to exclusive offers
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-center text-2xl md:text-3xl font-normal text-preto mb-12">
            See what our customers are saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Left Review Card */}
            <div className="space-y-4">
              <div className="flex gap-1">
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
              </div>
              <p className="text-xs font-normal text-preto uppercase">
                BOUTIQUES FROM ACROSS THE WORLD
              </p>
              <p className="text-sm font-bold text-preto">
                Natalia D.
              </p>
              <p className="text-sm text-preto">
                 I like to browse on Farfetch for inspiration, I like how you show boutiques from across the world, it is cool to receive an item from Italy, Germany or France.
              </p>
            </div>

            {/* Middle Review Card */}
            <div className="space-y-4">
              <div className="flex gap-1">
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
              </div>
              <p className="text-xs font-normal text-preto uppercase">
                ONE STOP DESTINATION
              </p>
              <p className="text-sm font-bold text-preto">
                Sarah M.
              </p>
              <p className="text-sm text-preto">
                I love visiting Farfetch as a one stop destination to get a huge variety of beautiful items. I like the curation, I like the outfit generation and the length and flow of the site which takes me from item to item.
              </p>
            </div>

            {/* Right Review Card */}
            <div className="space-y-4">
              <div className="flex gap-1">
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
                <FaStar className="w-5 h-5 text-preto fill-current" />
              </div>
              <p className="text-xs font-normal text-preto uppercase">
                UNIQUE ITEMS
              </p>
              <p className="text-sm font-bold text-preto">
                Blakely
              </p>
              <p className="text-sm text-preto">
                I really really appreciate Farfetch. I think that they have unique items and a lot of the times I have bought things I would have never expected.
              </p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-16 md:mt-24">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-preto">
                  DOWNLOAD THE<br />FARFETCH APP
                </h1>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 justify-center border-b border-platinum pb-0 mt-12">
                <button
                  onClick={() => setActiveTab("email")}
                  className={`pb-2 text-sm font-medium transition text-preto ${
                    activeTab === "email"
                      ? "border-b-2 border-preto"
                      : "text-preto hover:opacity-70"
                  }`}
                >
                  EMAIL ME
                </button>
                <button
                  onClick={() => setActiveTab("qr")}
                  className={`pb-2 text-sm font-medium transition text-preto ${
                    activeTab === "qr"
                      ? "border-b-2 border-preto"
                      : "text-preto hover:opacity-70"
                  }`}
                >
                  SCAN QR CODE
                </button>
              </div>

              {/* Content based on active tab */}
              {activeTab === "email" ? (
                <div className="space-y-4 mt-4">
                  <p className="text-sm text-preto">
                    Enter your email and we will send you a link to <br/>download the free app.
                  </p>
                  <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md mx-auto items-stretch">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="My email is ..."
                      className="flex-1 px-4 py-3 border border-platinum rounded-lg focus:outline-none focus:ring-2 focus:ring-preto text-preto bg-white min-w-0"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#222] text-white rounded-lg font-medium hover:opacity-90 transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      Send
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-preto mb-4">
                    Scan the QR code with your phone to download the app.
                  </p>
                  <div className="w-64 h-64 bg-gray-100 border-2 border-platinum rounded-lg flex items-center justify-center mx-auto">
                    <div className="text-center text-preto">
                      <svg
                        className="w-32 h-32 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                      <p className="text-sm">QR Code Placeholder</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarfetchApp;

