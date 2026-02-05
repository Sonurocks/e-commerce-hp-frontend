"use client";

import React, { useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { useLanguage } from "@/context/LanguageContext";
import Input from "@/components/common/Input";

export default function DownloadAppBanner() {
  const { translations } = useLanguage();
  const copy = translations.homepage.downloadApp;
  const farfetchText = translations.productCopy["FARFETCH"] || translations.header.logoText || "FARFETCH";
  const [email, setEmail] = useState("");

  return (
    <section className="download-app-banner py-16 md:py-20">
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] max-w-[1440px]">
        {/* Mobile: Stacked vertically and center-aligned */}
        {/* Tablet/Desktop: 3-column split (Heading/Description | Email Form | QR Code) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-y-8 gap-x-12">
          {/* Left Section: DOWNLOAD THE FARFETCH APP */}
          <div className="w-full lg:w-auto lg:flex-1 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-xl sm:text-2xl font-normal text-preto mb-4 leading-tight uppercase tracking-normal">
              {copy.heading.replace("FARFETCH", farfetchText)}
            </h2>
            <p className="text-sm sm:text-base font-normal text-preto mb-4 leading-relaxed max-w-xl">
              {copy.description}{" "}
              <a
                href="#"
                className="font-medium text-preto underline hover:text-preto transition-colors"
              >
                {copy.linkText}
              </a>
            </p>
          </div>

          {/* Middle Section: EMAIL ME */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-start">
            <h3 className="text-sm sm:text-base font-normal text-preto mb-2 uppercase">
              {copy.emailHeading}
            </h3>
            <p className="text-xs sm:text-sm font-normal text-preto mb-4 leading-relaxed text-center lg:text-left max-w-xs">
              {copy.emailDescription}
            </p>
            {/* Form - Input and Button same height (h-11) */}
            <form className="w-full max-w-xs flex flex-col sm:flex-row gap-3">
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.emailPlaceholder}
                fullWidth={false}
                className="sm:flex-1"
                inputClassName="h-11 border-preto rounded-lg px-3 text-sm text-preto bg-branco placeholder:text-gray-400 focus:ring-1 focus:ring-black focus:border-black"
              />
              <button
                type="button"
                className="h-11 sm:w-auto rounded-lg px-6 text-sm whitespace-nowrap border border-preto text-preto font-bold cursor-pointer  transition-colors"
              >
                {copy.sendButton}
              </button>
            </form>
          </div>

          {/* Right Section: SCAN QR CODE */}
          <div className="w-full lg:w-auto flex flex-col items-center text-center">
            <h3 className="text-sm sm:text-base font-bold text-preto uppercase mb-3">
              {copy.qrHeading}
            </h3>
            {/* QR Code with thin border matching FAQ cards */}
            <div className="w-32 h-32 border border-gray-200 rounded-lg flex items-center justify-center p-2">
              <BsQrCode className="text-preto w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}