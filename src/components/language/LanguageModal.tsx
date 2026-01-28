"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  languageMetadata,
  LanguageDefinition,
  supportedLanguages,
} from "@/lib/i18n";
import Modal from "../common/Modal";

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
  const { language, setLanguage, translations } = useLanguage();
  const modalCopy = translations.languageModal;
  const languages: LanguageDefinition[] = supportedLanguages.map(
    (code) => languageMetadata[code],
  );
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLanguageSelect = (selectedLanguage: LanguageDefinition) => {
    setLanguage(selectedLanguage.code);
    if (onLanguageSelect) {
      onLanguageSelect(selectedLanguage.code);
    }
  };

  // Custom header with instruction text
  const headerContent = (
    <>
      <div>
        <p className="text-[24px] leading-8 font-normal text-preto px-2 py-1">
          {modalCopy.title}
        </p>
      </div>
      {/* Instruction Text */}
      <div className="px-2 py-1 mt-4">
        <p className="text-sm text-(--color-hina) dark:text-(--color-hina)">
          {modalCopy.instruction}
        </p>
      </div>
    </>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      position={isLargeScreen ? "relative" : "centered"}
      buttonRef={isLargeScreen ? buttonRef : undefined}
      headerContent={headerContent}
      className="w-[90vw] lg:w-[360px] max-h-[80vh] lg:max-h-[600px]"
      backdropClassName={isLargeScreen ? "lg:hidden" : ""}
    >
      <div className="px-8 py-4">
        <div className="space-y-0">
          {languages.map((languageOption) => (
            <button
              key={languageOption.code}
              onClick={() => {
                handleLanguageSelect(languageOption);
                onClose();
              }}
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
    </Modal>
  );
};

export default LanguageModal;

