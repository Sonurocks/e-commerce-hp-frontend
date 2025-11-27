"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  fallbackLanguage,
  languageMetadata,
  SupportedLanguage,
  TextDirection,
  TranslationBundle,
  translations,
} from "@/lib/i18n";

interface LanguageContextValue {
  language: SupportedLanguage;
  direction: TextDirection;
  setLanguage: (code: SupportedLanguage) => void;
  translations: TranslationBundle;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "shophub-language";

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [language, setLanguageState] =
    useState<SupportedLanguage>(fallbackLanguage);

  // Hydrate language from persisted storage after mount to keep SSR/CSR in sync
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLanguage = window.localStorage.getItem(
      STORAGE_KEY,
    ) as SupportedLanguage | null;
    if (storedLanguage && languageMetadata[storedLanguage]) {
      setLanguageState(storedLanguage);
    }
  }, []);

  // Sync dir/lang attributes with the current language
  useEffect(() => {
    if (typeof document === "undefined") return;
    const direction = languageMetadata[language]?.direction ?? "ltr";
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const updateLanguage = useCallback((code: SupportedLanguage) => {
    if (!languageMetadata[code]) return;
    setLanguageState(code);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, code);
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const direction = languageMetadata[language]?.direction ?? "ltr";
    return {
      language,
      direction,
      setLanguage: updateLanguage,
      translations: translations[language] ?? translations[fallbackLanguage],
    };
  }, [language, updateLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

