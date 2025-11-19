import { ReactNode } from "react";

export type ColorTheme =
  | "aubergine"
  | "clementine"
  | "banana"
  | "jade"
  | "lagoon"
  | "barbra"
  | "gray"
  | "mood-indigo"
  | "default";

export type FontTheme = "lato" | "geist" | "inter" | "roboto" | "default";

export interface ThemeContextType {
  colorTheme: ColorTheme;
  fontTheme: FontTheme;
  setColorTheme: (theme: ColorTheme) => void;
  setBgTheme: (theme: string) => void;
  setFontTheme: (theme: FontTheme) => void;
}

export interface ThemeSettingsProviderProps {
  children: ReactNode;
}
