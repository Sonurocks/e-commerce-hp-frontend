"use client";

import React, { ReactNode } from "react";

export interface AccordionProps {
  title: string | ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  isOpen,
  onToggle,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
  iconClassName = "",
}) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-4 text-left ${headerClassName}`}
      >
        <h3 className="text-[13px] font-thin text-(--color-preto)">
          {title}
        </h3>
        <svg
          className={`w-4 h-4 text-(--color-preto) transition-transform ${
            isOpen ? "rotate-180" : ""
          } ${iconClassName}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={`pb-4 text-[13px] text-(--color-preto) ${contentClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
