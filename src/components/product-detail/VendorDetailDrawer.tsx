"use client";

import React, { useRef, useEffect } from "react";
import { FiX, FiMapPin, FiPhone, FiMail, FiStar } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

interface VendorDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
}

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

export default function VendorDetailDrawer({
  isOpen,
  onClose,
  vendorName,
}: VendorDetailDrawerProps) {
  const { translations } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);

  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Backdrop - Only on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[99] lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Drawer Container - Opens horizontally below navigation */}
      <div
        ref={drawerRef}
        className={`fixed lg:absolute top-0 lg:top-0 left-0 w-full h-full lg:h-auto bg-(--color-branco) shadow-lg border-t border-gray-200 z-[100] lg:z-[50] overflow-y-auto lg:max-h-[80vh] transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'translate-y-0 lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto' 
            : 'translate-y-full lg:translate-y-0 lg:opacity-0 lg:pointer-events-none lg:hidden'
        }`}
        style={{ fontFamily: fontStack }}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={(e) => e.stopPropagation()}
        onMouseLeave={(e) => e.stopPropagation()}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-(--color-branco) z-10">
          <h2 className="text-lg font-semibold text-(--color-preto)">
            {translate("VENDOR DETAILS") || "VENDOR DETAILS"}
          </h2>
          <button
            onClick={onClose}
            className="text-(--color-preto) hover:text-(--color-hina) transition p-2"
            aria-label="Close drawer"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Close Button - Top Right Corner */}
        <div className="hidden lg:block absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="text-(--color-preto) hover:text-(--color-hina) transition p-2 bg-(--color-branco) rounded-full hover:bg-gray-100"
            aria-label="Close drawer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-[72px] py-4 md:py-8 bg-(--color-branco)">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-32">
            {/* Left Side - Vendor Logo and About Section */}
            <div className="w-full lg:w-[320px] flex-shrink-0">
              <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center py-8 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-4xl font-bold text-gray-700">{vendorName.charAt(0)}</span>
                </div>
              </div>
              
              {/* About Vendor Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-[16px] font-semibold text-(--color-preto) mb-4">
                  {translate("About the Vendor") || "About the Vendor"}
                </h3>
                <div className="space-y-3 text-[13px] text-(--color-preto)">
                  <p>
                    {translate("Trusted supplier of quality products at unbeatable prices. Serving customers with top-notch products and reliable service.") || "Trusted supplier of quality products at unbeatable prices. Serving customers with top-notch products and reliable service."}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{translate("Verified Vendor") || "Verified Vendor"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>280+ {translate("Happy Customers") || "Happy Customers"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{translate("Secure Payments") || "Secure Payments"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Vendor Information */}
            <div className="flex-1 max-w-lg">
              {/* Vendor Name */}
              <div className="mb-4">
                <h1 className="text-[22px] font-normal text-(--color-preto) mb-1 leading-tight">
                  {vendorName}
                </h1>
                <p className="text-[12px] text-(--color-preto) font-normal">
                  {translate("Verified Vendor") || "Verified Vendor"}
                </p>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <FiStar className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-[22px] font-normal text-(--color-preto) ml-2 leading-tight">4.3</span>
                  </div>
                  <span className="text-[12px] text-[#666]">(210 {translate("Reviews") || "Reviews"})</span>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 text-(--color-preto) mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-semibold text-(--color-preto) mb-1">
                      {translate("Location") || "Location"}
                    </p>
                    <p className="text-[13px] text-(--color-preto)">
                      Delhi, India • Since 2021
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-(--color-preto) mb-4">
                  {translate("Contact Information") || "Contact Information"}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiPhone className="w-5 h-5 text-(--color-preto) mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-(--color-preto) mb-1">
                        {translate("Phone") || "Phone"}
                      </p>
                      <p className="text-[13px] text-(--color-preto)">
                        +91 9876543210
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiMail className="w-5 h-5 text-(--color-preto) mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-(--color-preto) mb-1">
                        {translate("Email") || "Email"}
                      </p>
                      <p className="text-[13px] text-(--color-preto)">
                        contact@{vendorName.toLowerCase().replace(/\s+/g, '')}.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

