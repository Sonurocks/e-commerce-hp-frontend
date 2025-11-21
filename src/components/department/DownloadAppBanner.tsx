import React from "react";
import { BsQrCode } from "react-icons/bs";

export default function DownloadAppBanner() {
  return (
    <section className="py-4 sm:py-12">
      <div className="w-full ">
        <div className="flex">
          {/* Left Section: DOWNLOAD THE FARFETCH APP */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-6 lg:ml-4">
            <h2 className="text-base sm:text-xl lg:text-2xl font-base text-(--color-preto) mb-4 leading-tight">
              DOWNLOAD THE FARFETCH APP
            </h2>
            <p className="text-xs sm:text-sm lg:text-thin font-normal text-(--color-preto) mb-4 leading-relaxed max-w-xl">
              Enjoy exclusive content on our app, including personalised product
              edits as well as our Visual Search tool for iOS.{" "}
              <a
                href="#"
                className="text-xs sm:text-sm lg:text-thin font-normal text-(--color-preto) underline hover:text-(--color-emperor) transition-colors"
              >
                More about the app
              </a>
            </p>
          </div>

          {/* Right Section: EMAIL ME and SCAN QR CODE in horizontal stack */}
          <div className="flex  ">
            {/* EMAIL ME Section */}
            <div className="flex mr-15 flex-col max-w-5px  max-w-md lg:max-w-none">
              <h3 className="text-xs sm:text-lg lg:text-thin font-base text-(--color-preto) mb-2 text-center lg:text-left">
                EMAIL ME
              </h3>
              <p className="text-xs sm:text-sm lg:text-thin font-normal text-(--color-preto) mb-4 leading-relaxed text-center lg:text-left">
                Enter your email and we will send you a link to download the
                free app
              </p>
              <div className="flex">
                   <form className="mb-2 sm:flex-row gap-3 w-70 sm:items-center">
                <input
                  type="email"
                  placeholder="Email address"
                  className="sm:flex-1 border border-(--color-preto) rounded-(--borders-corner-s) px-2  py-1 text-sm text-(--color-preto) placeholder:text-(--color-nimbus) font-light focus:outline-none focus:border-(--color-preto) focus:ring-1 focus:ring-(--color-preto)"
                  style={{ fontSize: `var(--fontSizexS)` }}
                />
                <div className="flex mt-3">
                  <button
                  type="button"
                  className="border border-(--color-preto)    bg-(--color-preto) text-(--color-branco) rounded-(--borders-corner-m) px-5 py-3 text-sm font-normal "
                  style={{ fontSize: `var(--fontSizexS)` }}
                >
                  Send
                </button>
                </div>
                </form>
              </div>
           
                
              
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block w-px mr-15 h-full bg-(--color-silver) mx-1"></div>

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
