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

  // Calculate position relative to button
  useEffect(() => {
    const updatePosition = () => {
      if (isOpen) {
        const button = buttonRef?.current;
        if (button) {
          const buttonRect = button.getBoundingClientRect();
          setPosition({
            top: buttonRect.bottom + 16, // Gap below button
            right: window.innerWidth - buttonRect.right,
          });
        }
      }
    };

    updatePosition();
    
    // Update position on window resize and scroll
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, buttonRef]);

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
      {/* Language Modal - Positioned relative to button */}
      <div
        ref={modalRef}
        className="fixed z-[100]"
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
        }}
      >
        <div className="w-[360px] max-h-[600px] flex flex-col rounded-2xl bg-(--colorWhite) shadow-2xl border border-(--colorGrey) overflow-hidden">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 bg-(--colorWhite)">
            <div className="flex items-start justify-between px-8 pt-8 pb-6">
              <div>
                <p className="text-[24px] leading-8 font-normal text-preto">
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
              <p className="text-sm text-(--color-hina) dark:text-(--color-hina)">
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
                    className="w-full text-left py-4 px-0 flex items-center justify-between group border-b border-[#eaeaea] last:border-b-0"
                  >
                    <span className="flex flex-col">
                      <span className="text-base font-normal text-preto leading-tight">
                        {languageOption.nativeName}
                      </span>
                      <span className="text-sm text-(--color-hina) leading-tight mt-1">
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

