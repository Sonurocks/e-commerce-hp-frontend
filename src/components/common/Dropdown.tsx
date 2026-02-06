"use client";

import React, { useRef, useEffect, useLayoutEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

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
  /** When true, render dropdown in a portal with fixed positioning so it is not clipped on tablet/small viewports */
  usePortal?: boolean;
}

const DROPDOWN_PORTAL_WIDTH = 224; // w-56 = 14rem

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
  usePortal = false,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ignoreNextClickRef = useRef(false);
  const [portalPosition, setPortalPosition] = useState<{ top: number; left: number } | null>(null);

  // Compute fixed position for portal when open (so dropdown is not clipped on tablet)
  const updatePortalPosition = () => {
    if (!wrapperRef.current || typeof document === "undefined") return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const padding = 8;
    let left = rect.right - DROPDOWN_PORTAL_WIDTH;
    if (left < padding) left = padding;
    if (left + DROPDOWN_PORTAL_WIDTH > window.innerWidth - padding) {
      left = window.innerWidth - DROPDOWN_PORTAL_WIDTH - padding;
    }
    setPortalPosition({
      top: rect.bottom + offset,
      left,
    });
  };

  useLayoutEffect(() => {
    if (!isOpen || !usePortal) {
      setPortalPosition(null);
      return;
    }
    updatePortalPosition();
    const handleScrollOrResize = () => updatePortalPosition();
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, usePortal, offset]);

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

  // When usePortal, strip positioning classes from contentClassName and use inline fixed position
  const contentClassWhenPortal = contentClassName
    .replace(/\b(absolute|fixed|right-0|left-0|mt-2|top-0|bottom-0)\b/g, "")
    .trim();

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {childrenWithClickHandler}
      {isOpen && usePortal && portalPosition && typeof document !== "undefined" && createPortal(
        <div
          ref={dropdownRef}
          className={`dropdown-panel ${contentClassWhenPortal}`}
          style={{
            position: "fixed",
            zIndex,
            top: portalPosition.top,
            left: portalPosition.left,
            width: DROPDOWN_PORTAL_WIDTH,
            minWidth: DROPDOWN_PORTAL_WIDTH,
          }}
        >
          {content}
        </div>,
        document.body
      )}
      {isOpen && !usePortal && (
        <div
          ref={dropdownRef}
          className={`dropdown-panel absolute ${contentClassName}`}
          style={{ zIndex }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
