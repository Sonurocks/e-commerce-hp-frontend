"use client";

import React, { memo, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SupportSection } from "@/types/support";

interface AccordionSectionProps {
  section: SupportSection;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  containerClassName?: string;
  buttonClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
}

const AccordionSectionComponent: React.FC<AccordionSectionProps> = ({
  section,
  index,
  isOpen,
  onToggle,
  containerClassName = "border-b border-gray-200",
  buttonClassName = "w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors",
  titleClassName = "font-light text-sm text-(--color-preto) uppercase tracking-wide",
  contentClassName = "pb-4 px-4 text-sm font-thin text-(--color-preto) leading-relaxed",
  iconClassName = "w-4 h-4 text-(--color-preto)",
}) => {
  const handleToggle = useCallback(() => {
    onToggle(index);
  }, [index, onToggle]);

  return (
    <div className={containerClassName}>
      <button
        onClick={handleToggle}
        className={buttonClassName}
        aria-expanded={isOpen}
      >
        <span className={titleClassName}>{section.title}</span>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className={iconClassName} />
          ) : (
            <ChevronDown className={iconClassName} />
          )}
        </div>
      </button>

      {isOpen && <div className={contentClassName}>{section.content}</div>}
    </div>
  );
};

const AccordionSection = memo(AccordionSectionComponent);
AccordionSection.displayName = "AccordionSection";

export default AccordionSection;
