"use client";

import React from "react";
import Link from "next/link";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiCoatHangerBold } from "react-icons/pi";
import { useLanguage } from "@/context/LanguageContext";

export default function HelpCards() {
  const { translations } = useLanguage();
  const helpCopy = translations.homepage.helpCards;

  return (
    <section className=" py-12 px-2">
      <div className="max-w-12xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* HOW TO SHOP Card */}
          <Link href="/how-to-shop" className="border border-gray-300 rounded-lg py-4 px-6 flex flex-col items-start hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="mb-2">
              <PiCoatHangerBold
                className="text-(--theme-text)"
                size={28}
              />
            </div>
            <h3 className="text-base font-base uppercase text-(--color-preto) mb-1">
              {helpCopy.howToShop.title}
            </h3>
            <p className="text-normal font-base text-(--color-preto)">
              {helpCopy.howToShop.description}
            </p>
          </Link>

          {/* FAQS Card */}
          <Link
            href="/faq"
            className="border border-gray-300 rounded-lg py-4 px-6 flex flex-col items-start hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="mb-2">
              <IoMdHelpCircleOutline
                className="text-(--theme-text)"
                size={28}
              />
            </div>
            <h3 className="text-base font-base uppercase text-(--color-preto) mb-1">
              {helpCopy.faqs.title}
            </h3>
            <p className="text-normal font-base text-(--color-preto)">
              {helpCopy.faqs.description}
            </p>
          </Link>

          {/* NEED HELP? Card */}
          <Link
            href="/contact-us"
            className="border border-gray-300 rounded-lg py-4 px-6 flex flex-col items-start hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="mb-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-(--theme-text)"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="text-base font-base uppercase  text-(--color-preto) mb-1">
              {helpCopy.needHelp.title}
            </h3>
            <p className="text-normal font-base  text-(--color-preto)">
              {helpCopy.needHelp.description}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
