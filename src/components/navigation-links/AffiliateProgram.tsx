"use client";

import React from "react";
import Link from "next/link";
import { HiMail } from "react-icons/hi";
import { HiArrowUp } from "react-icons/hi";
import { useLanguage } from "@/context/LanguageContext";

const AffiliateProgram = () => {
  const { translations } = useLanguage();
  const t = translations.productCopy;
  const translate = (text?: string) =>
    text ? (t[text] as string | undefined) ?? text : text;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-(--color-whiteSmoke) text-preto font-normal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-8 sm:pb-12 md:pb-16 pt-4 sm:pt-6 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Single White Box with 3 sections divided by gray borders */}
            <div className="bg-(--color-branco) p-4 sm:p-5 md:p-6">
              {/* Section 1: Affiliates */}
              <div className="pb-6 sm:pb-8 border-b border-platinum">
                <h2 className="text-lg sm:text-xl font-bold text-preto mb-2 sm:mb-3">
                  {translate("Affiliates")}
                </h2>
                <p className="text-sm sm:text-base text-preto leading-relaxed">
                  {translate(
                    "Farfetch is looking for innovative, fashion-forward, stylish websites and blogs specialising in fashion, lifestyle, beauty and design to join our global affiliate programme."
                  )}
                </p>
              </div>

              {/* Section 2: What are the Benefits? */}
              <div className="py-6 sm:py-8 border-b border-platinum">
                <h2 className="text-lg sm:text-xl font-bold text-preto mb-2 sm:mb-3">
                  {translate("What are the Benefits?")}
                </h2>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-preto leading-relaxed list-disc list-inside pl-4">
                  <li>{translate("Free to join")}</li>
                  <li>{translate("30-day cookie window")}</li>
                  <li>
                    {translate(
                      "Commission on all approved global sales (excludes returns and cancellations)"
                    )}
                  </li>
                  <li>
                    {translate(
                      "Daily product feeds to support a variety of currencies"
                    )}
                  </li>
                  <li>{translate("Competitions and giveaways")}</li>
                  <li>
                    {translate(
                      "Regular newsletters about new product arrivals, new boutiques, features and offers"
                    )}
                  </li>
                </ul>
              </div>

              {/* Section 3: About Farfetch */}
              <div className="pt-6 sm:pt-8">
                <h2 className="text-lg sm:text-xl font-bold text-preto mb-2 sm:mb-3">
                  {translate("About Farfetch")}
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base text-preto leading-relaxed">
                    {translate(
                      "Welcome to Farfetch, the world largest selection of luxury."
                    )}
                  </p>
                  <p className="text-sm sm:text-base text-preto leading-relaxed">
                    {translate(
                      "Every piece you see on Farfetch has been carefully curated by the Farfetch team from luxury brands and boutiques globally. Our partners are located from Tokyo to Toronto and Milan to Miami, and we work with the very best in the business. We offer a huge range of pieces from established luxury brands to new designers, so you can find exactly what youre looking for."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6 mt-6 lg:mt-0">
          
            <div className="bg-(--color-branco) p-4 sm:p-5 md:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-preto mb-2 sm:mb-3">
                {translate("Join our affiliate programme")}
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-preto flex-shrink-0" />
                  <span className="text-sm sm:text-base text-preto">
                    {translate("E-mail")}
                  </span>
                </div>
                <Link 
                  href="mailto:affiliates@farfetch.com" 
                  className="text-sm sm:text-base text-preto underline hover:opacity-70 transition block break-all"
                >
                  affiliates@farfetch.com
                </Link>
                <p className="text-sm sm:text-base text-preto leading-relaxed pt-2">
                  {translate(
                    "Email us the name and URL of your website or blog. We will review your site and respond to your e-mail within seven days with further information on how to join the affiliate programme."
                  )}
                </p>
              </div>
            </div>
 
            <div className="bg-(--color-branco) p-4 sm:p-5 md:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-preto mb-2 sm:mb-3">
                {translate("Join as a Farfetch boutique")}
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-preto flex-shrink-0" />
                  <span className="text-sm sm:text-base text-preto">
                    {translate("E-mail")}
                  </span>
                </div>
                <Link 
                  href="mailto:retailpartners@farfetch.com" 
                  className="text-sm sm:text-base text-preto underline hover:opacity-70 transition block break-all"
                >
                  retailpartners@farfetch.com
                </Link>
                <p className="text-sm sm:text-base text-preto leading-relaxed pt-2">
                  {translate(
                    "If youre a Boutique and would like to join the Farfetch Community please contact Retail Partners with details of your boutique, including a website address."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button - Outside Template, Responsive Positioning */}
        <div className="mt-6 sm:mt-8 relative md:absolute md:ml-2 flex justify-center md:justify-start">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs sm:text-sm text-preto hover:opacity-70 transition"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
              <HiArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-preto" />
            </div>
            <span>{translate("Back to Top")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;

