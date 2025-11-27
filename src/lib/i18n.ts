import { DepartmentKey } from "@/constants/department";
import englishBundle from "@/locales/en";
import arabicBundle from "@/locales/ar";
import urduBundle from "@/locales/ur";
import hindiBundle from "@/locales/hi";
import frenchBundle from "@/locales/fr";

export const supportedLanguages = ["en", "hi", "fr", "ur", "ar"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export type TextDirection = "ltr" | "rtl";

export interface LanguageDefinition {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  description: string;
  direction: TextDirection;
}

export type NavigationSection =
  | "primary"
  | "secondary"
  | "menswearSecondary"
  | "kidswearSecondary";

export interface HeaderTranslations {
  logoText: string;
  promotions: Record<string, string>;
  countdown: {
    endsIn: string;
    shopNow: string;
  };
  searchPlaceholder: string;
  tooltips: {
    signIn: string;
    wishlist: string;
    bag: string;
  };
  navigation: Record<NavigationSection, Record<string, string>>;
}

export interface SectionCopy {
  title: string;
  ctaLabel: string;
}

export interface HeroCopy {
  layout: "single" | "split";
  primary: {
    title: string;
    ctaLabel: string;
  };
  secondary?: {
    title: string;
    ctaLabel: string;
  };
}

export interface DepartmentCopy {
  featured: SectionCopy;
  newIn: SectionCopy;
  party: SectionCopy;
  hero: HeroCopy;
  editorial: {
    title: string;
    description: string;
    ctaLabel: string;
  };
}

export interface DownloadAppCopy {
  heading: string;
  description: string;
  linkText: string;
  emailHeading: string;
  emailDescription: string;
  emailPlaceholder: string;
  sendButton: string;
  qrHeading: string;
}

export interface HelpCardCopy {
  title: string;
  description: string;
}

export interface FooterTranslations {
  sectionTitles: Record<string, string>;
  linkLabels: Record<string, string>;
  followUs: string;
  legalLinks: Record<string, string>;
  legalDisclaimer: {
    trademark: string;
    copyright: string;
  };
}

export interface HomepageTranslations {
  trendingHeading: string;
  searchDrawer: {
    trendingLabel: string;
    searchResultsFor: string;
    resultsHint: string;
  };
  downloadApp: DownloadAppCopy;
  helpCards: {
    howToShop: HelpCardCopy;
    faqs: HelpCardCopy;
    needHelp: HelpCardCopy;
  };
  departments: Record<DepartmentKey, DepartmentCopy>;
}

export interface TranslationBundle {
  languageModal: {
    title: string;
    instruction: string;
  };
  header: HeaderTranslations;
  homepage: HomepageTranslations;
  footer: FooterTranslations;
  productCopy: Record<string, string>;
}

export const languageMetadata: Record<SupportedLanguage, LanguageDefinition> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English (American)",
    description: "English (American)",
    direction: "ltr",
  },
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    description: "Hindi",
    direction: "ltr",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    description: "French",
    direction: "ltr",
  },
  ur: {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    description: "Urdu",
    direction: "rtl",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    description: "Arabic",
    direction: "rtl",
  },
};

export const translations: Record<SupportedLanguage, TranslationBundle> = {
  en: englishBundle,
  hi: hindiBundle,
  fr: frenchBundle,
  ur: urduBundle,
  ar: arabicBundle,
};

export const fallbackLanguage: SupportedLanguage = "en";
