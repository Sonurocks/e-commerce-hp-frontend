"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
  children: ReactNode;
  content: ReactNode;
  placement?: "bottom" | "top" | "left" | "right";
  align?: "start" | "center" | "end";
  offset?: number;
  className?: string;
  contentClassName?: string;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  zIndex?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  triggerRef,
  children,
  content,
  placement = "bottom",
  align = "start",
  offset = 8,
  className = "",
  contentClassName = "",
  closeOnClickOutside = true,
  closeOnEscape = true,
  zIndex = 50,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ignoreNextClickRef = useRef(false);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Ignore if this click should be ignored (triggered by button click)
      if (ignoreNextClickRef.current) {
        ignoreNextClickRef.current = false;
        return;
      }

      // Only process if dropdown is still open
      if (!isOpen) return;

      const target = event.target as Node;
      // Check if click is outside both the dropdown content and the wrapper (which contains the trigger button)
      const isClickInDropdown = dropdownRef.current?.contains(target);
      const isClickInWrapper = wrapperRef.current?.contains(target);
      const isClickInTrigger = triggerRef?.current?.contains(target);
      
      // Only close if click is truly outside all dropdown-related elements
      if (
        !isClickInDropdown &&
        !isClickInWrapper &&
        !isClickInTrigger &&
        closeOnClickOutside
      ) {
        onClose();
      }
    };

    if (isOpen) {
      // Use a small delay to avoid immediate closing when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose, closeOnClickOutside, triggerRef]);

  // Clone children to add click handler that prevents click-outside from firing
  const childrenWithClickHandler = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          // Mark that we should ignore the next click-outside check
          ignoreNextClickRef.current = true;
          // Call original onClick if it exists
          const originalOnClick = (children as React.ReactElement<any>).props.onClick;
          if (originalOnClick) {
            originalOnClick(e);
          }
        },
      })
    : children;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {childrenWithClickHandler}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${contentClassName}`}
          style={{ zIndex }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
