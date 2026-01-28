"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { footerMembershipImage, footerRewardImage, footerSilverRewardImage, footerGoldRewardImage, footerPlatinumRewardImage, footerPrivateClientRewardImage, footerHowItWorksImage } from "@/assets";
import { useLanguage } from "@/context/LanguageContext";
import { HiGift } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import { HiShoppingBag } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { HiSearch } from "react-icons/hi";
import { HiTruck } from "react-icons/hi";
import { HiSparkles } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";
import { FaBullseye } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";

const FarfetchMembership = () => {
  const [activeTier, setActiveTier] = useState("BRONZE");
  const { translations } = useLanguage();
  const t = translations.productCopy;
  const translate = (text?: string) =>
    text ? (t[text] as string | undefined) ?? text : text;

  const membershipTiers = ["BRONZE", "SILVER", "GOLD", "PLATINUM", "PRIVATE CLIENT"];

  return (
    <div className="min-h-screen  text-preto font-normal">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Section - Text and Button */}
          <div className="space-y-6 mx-auto text-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-4xl font-medium text-preto max-w-lg">
                {translate("unlock exclusive member rewards")}
              </h1>
              <p className="text-base md:text-lg text-preto font-thin leading-relaxed max-w-lg">
                {translate(
                  "Get discounts and rewards when you sign in or create an account. The more you shop, the more you get."
                )}
              </p>
              <div className="pt-4">
                <button className="px-6 py-3 bg-[#222] text-white rounded-lg font-medium hover:opacity-90 transition-colors">
                  {translate("Join Us")}
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
        <h2 className="text-3xl md:text-4xl font-normal text-preto mb-6">
          {translate("Your Rewards")}
        </h2>

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
              {translate(tier)}
            </button>
          ))}
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-1 lg:gap-0 items-start">
          {/* Left Column - Reward Image */}
          <div className="flex justify-center lg:justify-start lg:col-span-2">
            <div className="relative w-full max-w-xs h-auto">
              <Image
                src={
                  activeTier === "SILVER"
                    ? footerSilverRewardImage
                    : activeTier === "GOLD"
                    ? footerGoldRewardImage
                    : activeTier === "PLATINUM"
                    ? footerPlatinumRewardImage
                    : activeTier === "PRIVATE CLIENT"
                    ? footerPrivateClientRewardImage
                    : footerRewardImage
                }
                alt="Your Rewards"
                className="w-full h-auto object-contain max-w-xs"
                priority
              />
            </div>
          </div>

          {/* Right Column - Reward Descriptions */}
          {activeTier === "SILVER" ? (
            <div className="lg:col-span-3 lg:-ml-3">
              {/* Spend Requirement for Silver */}
              <p className="text-base md:text-lg font-medium text-preto mb-6">
                {translate("Spend $1,200")}
              </p>
              
              {/* Silver Rewards Grid - 2x3 layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Welcome Reward */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                    <HiGift className="w-6 h-6 text-preto shrink-0" />
                <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                  {translate("WELCOME REWARD")}
                </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate("Enjoy a limited-time promotion when you join")}
                  </p>
                </div>

                {/* Birthday Reward */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiLocationMarker className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("BIRTHDAY REWARD")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Celebrate your birthday month with a special discount"
                    )}
                  </p>
                </div>

                {/* Private Members' Sale */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <HiShoppingBag className="w-6 h-6 text-preto" />
                      <BiLock className="w-3 h-3 text-preto absolute -top-1 -right-1" />
                    </div>
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("PRIVATE MEMBERS SALE")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Enjoy exclusive entry to our private sale featuring the worlds best brands"
                    )}
                  </p>
                </div>

                {/* Exclusive Discounts */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <HiSearch className="w-6 h-6 text-preto" />
                      <span className="absolute -top-1 -right-1 text-xs font-bold text-preto">
                        %
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("EXCLUSIVE DISCOUNTS")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Enjoy unique Silver offers throughout the year"
                    )}
                  </p>
                </div>

                {/* Free Shipping */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiTruck className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("FREE SHIPPING")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "2 orders with Free Shipping, wherever you are"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : activeTier === "GOLD" ? (
            <div className="lg:col-span-3 lg:-ml-3">
              {/* Spend Requirement for Gold */}
              <p className="text-base md:text-lg font-medium text-preto mb-6">
                {translate("Spend $2,400")}
              </p>
              
              {/* Gold Rewards Grid - 2x3 layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Welcome Reward */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiGift className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("WELCOME REWARD")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                {translate("Enjoy a limited-time promotion when you join")}
              </p>
            </div>

            {/* Birthday Reward */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
              <HiLocationMarker className="w-6 h-6 text-preto shrink-0" />
                <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                  {translate("BIRTHDAY REWARD")}
                </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Celebrate your birthday month with a special discount"
                    )}
                  </p>
                </div>

                {/* Private Members' Sale */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <HiShoppingBag className="w-6 h-6 text-preto" />
                      <BiLock className="w-3 h-3 text-preto absolute -top-1 -right-1" />
                    </div>
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("PRIVATE MEMBERS SALE")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Enjoy exclusive entry to our private sale featuring the worlds best brands"
                    )}
                  </p>
                </div>

                {/* Exclusive Discounts */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <HiSearch className="w-6 h-6 text-preto" />
                      <span className="absolute -top-1 -right-1 text-xs font-bold text-preto">
                        %
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("EXCLUSIVE DISCOUNTS")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate("Enjoy unique Gold offers throughout the year")}
                  </p>
                </div>

                {/* Free Shipping */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiTruck className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("FREE SHIPPING")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "4 orders with Free Shipping, wherever you are"
                    )}
                  </p>
                </div>

                {/* Exclusive Designers */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiSparkles className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("EXCLUSIVE DESIGNERS")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate("Enjoy exclusive collections and pieces")}
                  </p>
                </div>
              </div>
            </div>
          ) : activeTier === "PLATINUM" ? (
            <div className="lg:col-span-3 lg:-ml-3">
              {/* Spend Requirement for Platinum */}
              <p className="text-base md:text-lg font-medium text-preto mb-6">
                {translate("Spend $6,000")}
              </p>
              
              {/* Platinum Rewards Grid - 2x3 layout with 7 items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Welcome Reward */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiGift className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("WELCOME REWARD")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate("Enjoy a limited-time promotion when you join")}
                  </p>
                </div>

                {/* Birthday Reward */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiLocationMarker className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("BIRTHDAY REWARD")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                {translate(
                  "Celebrate your birthday month with a special discount"
                )}
              </p>
            </div>

            {/* Private Members' Sale */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                  <HiShoppingBag className="w-6 h-6 text-preto" />
                  <BiLock className="w-3 h-3 text-preto absolute -top-1 -right-1" />
                </div>
                <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                  {translate("PRIVATE MEMBERS SALE")}
                </h3>
              </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Enjoy exclusive entry to our private sale featuring the worlds best brands"
                    )}
                  </p>
                </div>

                {/* Exclusive Discounts */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <HiSearch className="w-6 h-6 text-preto" />
                      <span className="absolute -top-1 -right-1 text-xs font-bold text-preto">
                        %
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("EXCLUSIVE DISCOUNTS")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Enjoy unique Platinum offers throughout the year"
                    )}
                  </p>
                </div>

                {/* Free Shipping */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiTruck className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("FREE SHIPPING")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "1 year of free shipping with most orders, wherever you are"
                    )}
                  </p>
                </div>

                {/* Exclusive Designers */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiSparkles className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("EXCLUSIVE DESIGNERS")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate("Enjoy exclusive collections and pieces")}
                  </p>
                </div>

                {/* Priority Customer Care */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiPhone className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("PRIORITY CUSTOMER CARE")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "You will be fast-tracked to our expert team whenever you need help"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : activeTier === "PRIVATE CLIENT" ? (
            <div className="lg:col-span-3 lg:-ml-3">
              {/* Spend Requirement for Private Client */}
              <p className="text-base md:text-lg font-medium text-preto mb-6">Spend $12,000</p>
              
              {/* Private Client Rewards Grid - 3x3 layout with 9 items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Welcome Reward */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiGift className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("WELCOME REWARD")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate("Enjoy a limited-time promotion when you join")}
                  </p>
                </div>

                {/* Birthday Reward */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiLocationMarker className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("BIRTHDAY REWARD")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Celebrate your birthday month with a special discount"
                    )}
                  </p>
                </div>

                {/* Private Members' Sale */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <HiShoppingBag className="w-6 h-6 text-preto" />
                      <BiLock className="w-3 h-3 text-preto absolute -top-1 -right-1" />
                    </div>
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("PRIVATE MEMBERS SALE")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Enjoy exclusive entry to our private sale featuring the worlds best brands"
                    )}
                  </p>
                </div>

                {/* Exclusive Discounts */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <HiSearch className="w-6 h-6 text-preto" />
                      <span className="absolute -top-1 -right-1 text-xs font-bold text-preto">
                        %
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("EXCLUSIVE DISCOUNTS")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Enjoy unique Private Client offers throughout the year"
                    )}
                  </p>
                </div>

                {/* Free Shipping */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiTruck className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("FREE SHIPPING")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "1 year of unlimited free shipping, wherever you are"
                    )}
                  </p>
                </div>

                {/* Exclusive Designers */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiSparkles className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("EXCLUSIVE DESIGNERS")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate("Enjoy exclusive collections and pieces")}
                  </p>
                </div>

                {/* Priority Customer Care */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiPhone className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">PRIORITY CUSTOMER </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    You will be fast-tracked to our expert team whenever you need help
                  </p>
                </div>

                {/* Fashion Concierge */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaBullseye className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("FASHION CONCIERGE")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "Tell us what you  looking and we will handle the rest"
                    )}
                  </p>
                </div>

                {/* Personal Styling */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <HiUserGroup className="w-6 h-6 text-preto shrink-0" />
                    <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">
                      {translate("PERSONAL STYLING")}
                    </h3>
                  </div>
                  <p className="text-sm md:text-sm text-preto leading-relaxed">
                    {translate(
                      "We will match a Personal Stylist to you who can offer 1:1 advice around the clock"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:col-span-3 lg:-ml-3">
              {/* Welcome Reward */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <HiGift className="w-6 h-6 text-preto shrink-0" />
                  <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">WELCOME REWARD</h3>
                </div>
                <p className="text-sm md:text-sm text-preto leading-relaxed">
                  Enjoy a limited-time promotion when you join
                </p>
              </div>

              {/* Birthday Reward */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <HiLocationMarker className="w-6 h-6 text-preto shrink-0" />
                  <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">BIRTHDAY REWARD</h3>
                </div>
                <p className="text-sm md:text-sm text-preto leading-relaxed">
                  Celebrate your birthday month with a special discount
                </p>
              </div>

              {/* Private Members' Sale */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <HiShoppingBag className="w-6 h-6 text-preto" />
                    <BiLock className="w-3 h-3 text-preto absolute -top-1 -right-1" />
                  </div>
                  <h3 className="text-base md:text-lg font-base text-preto whitespace-nowrap">PRIVATE MEMBERS SALE</h3>
                </div>
                <p className="text-sm md:text-sm text-preto leading-relaxed">
                {translate(
                  "Enjoy exclusive entry to our private sale featuring the worlds best brands"
                )}
                </p>
                <p className="text-xs md:text-sm text-(--color-hina)">
                  {translate("Unlocked after your first order")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How it works Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 bg-(--color-whiteSmoke)">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-start">
          {/* Left Column - Phone Mockup Image */}
          <div className="flex justify-center lg:justify-start -mt-10 lg:ml-4">
            <div className="relative w-full max-w-md h-auto">
              <Image
                src={footerHowItWorksImage}
                alt="How it works"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column - How it works Content */}
          <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-normal text-preto">
          {translate("How it works")}
        </h2>
            
            <div className="space-y-2 text-preto">
              <p className="text-base md:text-sm  font-thin leading-relaxed">
                {translate("As soon as you create an account, you are a member.")}
              </p>
              <p className="text-base md:text-sm font-thin leading-relaxed">
                {translate(
                  "The amount you spend defines your tier. Your loyalty year renews every 12 months, but you can upgrade and enjoy new rewards at any time."
                )}
              </p>
              <p className="text-base md:text-sm font-thin leading-relaxed">
                {translate(
                  "From exclusive discounts and private members sales, to free delivery and a dedicated personal stylist - become a FARFETCH member today."
                )}
              </p>
            </div>

            {/* Membership Tiers Indicator */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-(--colorBronzePrimary)"></div>
                <span className="text-sm font-medium text-preto">
                  {translate("Bronze")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-(--colorSilverPrimary)"></div>
                <span className="text-sm font-medium text-preto">
                  {translate("Silver")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-(--colorGoldPrimary)"></div>
                <span className="text-sm font-medium text-preto">
                  {translate("Gold")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-(--colorPlatinumPrimary)"></div>
                <span className="text-sm font-medium text-preto">
                  {translate("Platinum")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-(--colorPrivateClientPrimary)"></div>
                <span className="text-sm font-medium text-preto">
                  {translate("Private Client")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member support Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-xl font-thin text-preto mb-4">
          {translate("Member support")}
        </h2>
        <div className="border-t border-(--color-platinum) mb-4"></div>
        
        <div className="space-y-0">
          {/* FAQs Link */}
          <Link href="#" className="flex items-center justify-between py-4 border-b border-(--color-platinum) hover:opacity-70 transition-opacity">
            <span className="text-base md:text-base text-preto">
              {translate("FAQs")}
            </span>
            <HiChevronRight className="w-5 h-5 text-preto" />
          </Link>
          
          {/* Terms & Conditions Link */}
          <Link href="#" className="flex items-center justify-between py-4 border-b border-(--color-platinum) hover:opacity-70 transition-opacity">
            <span className="text-base md:text-bse text-preto">
              {translate("Terms & Conditions")}
            </span>
            <HiChevronRight className="w-5 h-5 text-preto" />
          </Link>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Heading and Description */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-2xl font-normal text-preto">
              {translate("Never miss a thing")}
            </h2>
            <p className="text-base md:text-base text-preto leading-relaxed">
              {translate(
                "Sign up for promotions, tailored new arrivals, stock updates and more - straight to your inbox"
              )}
            </p>
          </div>

          {/* Right Column - Email Subscription Form */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-preto uppercase">
              {translate("GET UPDATES BY")}
            </h3>
            
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm text-preto">
                  {translate("Email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={translate("Your email address")}
                  className="w-full px-4 py-3 border border-(--color-platinum) rounded-lg text-preto placeholder:text-(--color-hina) focus:outline-none focus:border-preto transition-colors"
                />
              </div>
              
              <button
                type="submit"
                className="px-6 py-3 bg-[#222] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                {translate("Sign Up")}
              </button>
              
              <p className="text-xs md:text-sm text-preto leading-relaxed">
                {translate(
                  "By signing up, you consent to receiving marketing by email and/or SMS and acknowledge you have read our"
                )}{" "}
                <Link href="#" className="underline hover:opacity-70">
                  {translate("Privacy Policy")}
                </Link>
                {translate(
                  ". Unsubscribe anytime at the bottom of our emails or by replying STOP to any of our SMS."
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarfetchMembership;

