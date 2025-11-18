import { ReactNode } from "react";

export interface SupportSection {
  title: string;
  content: ReactNode;
}

export interface SupportNavLink {
  href: string;
  label: string;
}
