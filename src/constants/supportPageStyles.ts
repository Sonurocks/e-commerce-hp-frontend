import { CSSProperties } from "react";

export const supportPageStyles: CSSProperties & { [key: string]: string } = {
  fontFamily: "var(--fontNormal)",
  color: "var(--color-preto)",
  fontSize: "1rem",
  lineHeight: "1.6",
  "--fontNormal": "'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif",
  "--color-preto": "#222",
};
