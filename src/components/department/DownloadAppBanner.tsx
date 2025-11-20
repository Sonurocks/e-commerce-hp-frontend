import React from "react";
import { BsQrCode } from "react-icons/bs";

export default function DownloadAppBanner() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-20">
          {/* Left Section: DOWNLOAD THE FARFETCH APP */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-6">
            <h2 className="text-lg sm:text-xl lg:text-3xl font-base text-(--color-preto) mb-4 leading-tight">
              DOWNLOAD THE FARFETCH APP
            </h2>
            <p className="text-xs sm:text-sm lg:text-base font-normal text-(--color-preto) mb-4 leading-relaxed max-w-xl">
              Enjoy exclusive content on our app, including personalised product
              edits as well as our Visual Search tool for iOS.{" "}
              <a
                href="#"
                className="text-xs sm:text-sm lg:text-base font-normal text-(--color-preto) underline hover:text-(--color-emperor) transition-colors"
              >
                More about the app
              </a>
            </p>
          </div>

          {/* Right Section: EMAIL ME and SCAN QR CODE in horizontal stack */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:col-span-6 lg:items-start">
            {/* EMAIL ME Section */}
            <div className="flex flex-col w-full max-w-md lg:max-w-none">
              <h3 className="text-xs sm:text-sm lg:text-base font-base text-(--color-preto) mb-2 text-center lg:text-left">
                EMAIL ME
              </h3>
              <p className="text-xs sm:text-sm lg:text-base font-normal text-(--color-preto) mb-4 leading-relaxed text-center lg:text-left">
                Enter your email and we will send you a link to download the
                free app
              </p>
              <form className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full sm:flex-1 border border-(--color-silver) rounded-(--borders-corner-s) px-4 py-3 text-sm text-(--color-preto) placeholder:text-(--color-hina) focus:outline-none focus:border-(--color-preto) focus:ring-1 focus:ring-[var(--color-preto)]"
                  style={{ fontSize: `var(--fontSizeS)` }}
                />
                <button
                  type="button"
                  className="w-full sm:w-auto border border-(--color-preto) bg-(--color-preto) text-(--color-branco) rounded-(--borders-corner-m) px-5 py-3 text-sm font-normal hover:bg-(--colorDarkerGrey) transition-colors"
                  style={{ fontSize: `var(--fontSizeS)` }}
                >
                  Send
                </button>
              </form>
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block w-px h-full bg-(--color-silver) mx-1"></div>

            {/* SCAN QR CODE Section */}
            <div className="flex flex-col items-center text-center gap-4 lg:items-end lg:text-right lg:gap-6">
              <h3 className="text-xs sm:text-sm lg:text-base font-base text-(--color-preto)">
                SCAN QR CODE
              </h3>
              <div className="w-[110px] h-[100px] sm:w-[130px] sm:h-[115px] lg:w-[140px] lg:h-[120px] bg-(--color-branco) border-2 border-(--color-preto) flex items-center justify-center">
                <BsQrCode className="text-(--color-preto) w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
