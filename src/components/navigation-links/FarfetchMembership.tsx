"use client";

import React, { useState } from "react";
import Image from "next/image";
import { footerMembershipImage, footerRewardImage } from "@/assets";
import { HiGift } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import { HiShoppingBag } from "react-icons/hi";
import { BiLock } from "react-icons/bi";

const FarfetchMembership = () => {
  const [activeTier, setActiveTier] = useState("BRONZE");

  const membershipTiers = ["BRONZE", "SILVER", "GOLD", "PLATINUM", "PRIVATE CLIENT"];

  return (
    <div className="min-h-screen  text-preto font-normal">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Section - Text and Button */}
          <div className="space-y-6 mx-auto text-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-4xl font-medium text-preto max-w-lg">
                unlock exclusive member<br />rewards
              </h1>
              <p className="text-base md:text-lg text-preto font-thin leading-relaxed max-w-lg">
                Get discounts and rewards when you sign in or create an account. The more you shop, the more you get.
              </p>
              <div className="pt-4">
                <button className="px-6 py-3 bg-preto text-white rounded-lg font-medium hover:opacity-90 transition-colors">
                  Join Us
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Membership Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-full h-auto">
              <Image
                src={footerMembershipImage}
                alt="Farfetch Membership"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Your Rewards Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-preto mb-6">Your Rewards</h2>

        {/* Membership Tiers Navigation */}
        <div className="flex gap-6 border-b border-platinum pb-4 mb-8">
          {membershipTiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`pb-2 text-sm font-medium transition text-preto ${
                activeTier === tier
                  ? "border-b-2 border-preto font-bold"
                  : "hover:opacity-70"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-1 lg:gap-0 items-start">
          {/* Left Column - Reward Image */}
          <div className="flex justify-center lg:justify-start lg:col-span-2">
            <div className="relative w-full max-w-xs h-auto">
              <Image
                src={footerRewardImage}
                alt="Your Rewards"
                className="w-full h-auto object-contain max-w-xs"
                priority
              />
            </div>
          </div>

          {/* Right Column - Reward Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:col-span-3 lg:-ml-3">
            {/* Welcome Reward */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <HiGift className="w-6 h-6 text-preto flex-shrink-0" />
                <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">WELCOME REWARD</h3>
              </div>
              <p className="text-sm md:text-base text-preto leading-relaxed">
                Enjoy a limited-time promotion when you join
              </p>
            </div>

            {/* Birthday Reward */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <HiLocationMarker className="w-6 h-6 text-preto flex-shrink-0" />
                <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">BIRTHDAY REWARD</h3>
              </div>
              <p className="text-sm md:text-base text-preto leading-relaxed">
                Celebrate your birthday month with a special discount
              </p>
            </div>

            {/* Private Members' Sale */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <HiShoppingBag className="w-6 h-6 text-preto" />
                  <BiLock className="w-3 h-3 text-preto absolute -top-1 -right-1" />
                </div>
                <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">PRIVATE MEMBERS SALE</h3>
              </div>
              <p className="text-sm md:text-base text-preto leading-relaxed">
                Enjoy exclusive entry to our private sale featuring the worlds best brands
              </p>
              <p className="text-xs md:text-sm text-[var(--color-hina)]">
                Unlocked after your first order
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarfetchMembership;

