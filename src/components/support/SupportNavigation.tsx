"use client";

import React, { memo } from "react";
import Link from "next/link";
import { SupportNavLink } from "@/types/support";

interface SupportNavigationProps {
  links: SupportNavLink[];
  activePath: string;
  listClassName?: string;
  linkClassName?: string;
}

const SupportNavigationComponent: React.FC<SupportNavigationProps> = ({
  links,
  activePath,
  listClassName = "space-y-2",
  linkClassName = "",
}) => (
  <nav>
    <ul className={listClassName}>
      {links.map((link, index) => {
        const isActive = activePath === link.href;
        return (
          <li key={`${link.href}-${index}`}>
            <Link
              href={link.href}
              className={`block py-1 text-sm underline hover:no-underline transition ${linkClassName} ${
                isActive
                  ? "font-thin text-preto"
                  : "text-preto"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

const SupportNavigation = memo(SupportNavigationComponent);

SupportNavigation.displayName = "SupportNavigation";

export default SupportNavigation;
