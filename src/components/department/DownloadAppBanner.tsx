
import React from "react";
 import { BsQrCode } from "react-icons/bs";

export default function DownloadAppBanner() {
  return (
    <section className="download-app-banner py-8 sm:py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
       
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-4">
          {/* Left Section: DOWNLOAD THE FARFETCH APP */}
          {/* Centered on mobile, Left aligned on Desktop */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-xl sm:text-2xl font-normal text-preto mb-4 leading-tight uppercase">
              Download the Farfetch App
            </h2>
            <p className="text-sm sm:text-base font-normal text-preto mb-4 leading-relaxed max-w-xl">
              Enjoy exclusive content on our app, including personalised product
              edits as well as our Visual Search tool for iOS.{" "}
              <a
                href="#"
                className="font-medium text-preto underline hover:text-preto transition-colors"
              >
                More about the app
              </a>
            </p>
          </div>
          {/* Right Section: EMAIL ME and SCAN QR CODE */}
          {/* Stack vertically on mobile, Row on Tablet/Desktop */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center lg:items-start gap-8 lg:gap-0">
            {/* EMAIL ME Section */}
            <div className="flex flex-col items-center lg:items-start w-full sm:w-auto lg:mr-8">
              <h3 className="text-sm sm:text-base font-normal text-preto mb-2 uppercase">
                Email Me
              </h3>
              <p className="text-xs sm:text-sm font-normal text-preto mb-4 leading-relaxed text-center lg:text-left max-w-xs">
                Enter your email and we will send you a link to download the free app
              </p>
              {/* Form */}
              <form className="w-full max-w-xs flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full sm:flex-1 border border-preto rounded-md px-3 py-2 text-sm text-preto placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-preto"
                />
                <button
                  type="button"
                  className="w-full sm:w-auto bg-black text-white border border-preto rounded-md px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
            {/* Vertical divider (Hidden on mobile, visible on large screens) */}
            <div className="hidden lg:block w-px h-32 bg-gray-300 mx-4 self-center"></div>
            {/* SCAN QR CODE Section */}
            <div className="flex flex-col items-center text-center gap-3">
              <h3 className="text-sm sm:text-base font-bold text-preto uppercase">
                Scan QR Code
              </h3>
              <div className="w-32 h-32  border-2 border-preto flex items-center justify-center p-2">
              
                 <BsQrCode className="text-(--color-preto) w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}