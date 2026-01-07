"use client";

import React, { useRef, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import {
  languageMetadata,
  LanguageDefinition,
  supportedLanguages,
} from "@/lib/i18n";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelect?: (language: string) => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  onLanguageSelect,
  buttonRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, translations } = useLanguage();
  const modalCopy = translations.languageModal;
  const languages: LanguageDefinition[] = supportedLanguages.map(
    (code) => languageMetadata[code],
  );
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate position relative to button - only once when modal opens
  useEffect(() => {
    if (isOpen) {
      const button = buttonRef?.current;
      if (button && !isMobile) {
        const buttonRect = button.getBoundingClientRect();
        setPosition({
          top: buttonRect.bottom + 16, // Gap below button
          right: window.innerWidth - buttonRect.right,
        });
      }
    }
  }, [isOpen, buttonRef, isMobile]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      // Get header element to ensure it stays visible
      const header = document.querySelector('header');
      const originalHeaderPosition = header ? window.getComputedStyle(header).position : '';
      const originalHeaderTop = header ? window.getComputedStyle(header).top : '';

      // Prevent scrolling - same approach as ProfileModal to avoid content shift
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Ensure header stays visible at top when modal opens after scroll
      if (header) {
        header.style.position = "fixed";
        header.style.top = "0";
        header.style.left = "0";
        header.style.right = "0";
        header.style.zIndex = "50";
      }

      // Prevent touch scrolling on mobile
      const preventTouchMove = (e: TouchEvent) => {
        // Allow scrolling within the modal
        const target = e.target as HTMLElement;
        if (modalRef.current && modalRef.current.contains(target)) {
          return;
        }
        e.preventDefault();
      };
      document.addEventListener("touchmove", preventTouchMove, { passive: false });

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        
        // Restore header styles
        if (header) {
          header.style.position = originalHeaderPosition;
          header.style.top = originalHeaderTop;
          header.style.left = "";
          header.style.right = "";
          header.style.zIndex = "";
        }
        
        window.scrollTo(0, scrollY);
        document.removeEventListener("touchmove", preventTouchMove);
      };
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      // Small delay to prevent immediate close when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  const handleLanguageSelect = (selectedLanguage: LanguageDefinition) => {
    setLanguage(selectedLanguage.code);
    if (onLanguageSelect) {
      onLanguageSelect(selectedLanguage.code);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 z-[99] lg:hidden"
        onClick={onClose}
      />
      
      {/* Language Modal - Positioned relative to button */}
      <div
        ref={modalRef}
        className="fixed z-[100]"
        style={
          isMobile
            ? {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }
            : {
                top: `${position.top}px`,
                right: `${position.right}px`,
              }
        }
      >
        <div className="w-[90vw] max-w-[360px] lg:w-[360px] max-h-[80vh] lg:max-h-[600px] flex flex-col rounded-2xl bg-(--colorWhite) shadow-2xl border border-(--colorGrey) overflow-hidden">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 bg-(--colorWhite)">
            <div className="flex items-start justify-between px-8 pt-8 pb-6">
              <div>
                <p className="text-[24px] leading-8 font-normal text-preto px-2 py-1">
                  {modalCopy.title}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close language modal"
                className="text-preto hover:text-preto transition rounded-full p-2 hover:bg-(--colorLightGrey) cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Instruction Text */}
            <div className="px-8 pb-4">
              <p className="text-sm text-(--color-hina) dark:text-(--color-hina) px-2 py-1">
                {modalCopy.instruction}
              </p>
            </div>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 py-4">
              <div className="space-y-0">
                {languages.map((languageOption) => (
                  <button
                    key={languageOption.code}
                    onClick={() => handleLanguageSelect(languageOption)}
                    className="w-full text-left py-2 px-2 flex items-center justify-between group border-b border-[#eaeaea] last:border-b-0"
                  >
                    <span className="flex flex-col px-2">
                      <span className="text-base font-normal text-preto leading-tight py-1">
                        {languageOption.nativeName}
                      </span>
                      <span className="text-sm text-(--color-hina) leading-tight mt-1 py-1">
                        {languageOption.description}
                      </span>
                    </span>
                    {language === languageOption.code && (
                      <svg
                        className="w-5 h-5 text-preto flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageModal;

