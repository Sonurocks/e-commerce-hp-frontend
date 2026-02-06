"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { useModalOpen } from "@/context/ModalOpenContext";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "small" | "medium" | "large" | "fullscreen";
  position?: "centered" | "top" | "relative";
  buttonRef?: React.RefObject<HTMLElement>;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  backdropClassName?: string;
  zIndex?: {
    backdrop?: number;
    modal?: number;
  };
  onOpenChange?: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "medium",
  position = "centered",
  buttonRef,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = "",
  headerContent,
  footerContent,
  backdropClassName = "",
  zIndex = { backdrop: 101, modal: 102 },
  onOpenChange,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { registerModalOpen, registerModalClose } = useModalOpen();

  // Notify context when this modal is open so header can stay visible on top
  useEffect(() => {
    if (isOpen) {
      registerModalOpen();
      return () => registerModalClose();
    }
  }, [isOpen, registerModalOpen, registerModalClose]);

  // Check if mobile (below 768px) - initialize on mount
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    // Set initial value immediately
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate position relative to button - only on desktop when not mobile
  useEffect(() => {
    if (!isOpen || position !== "relative" || isMobile) {
      return;
    }
    
    // Use requestAnimationFrame to ensure DOM is ready and avoid race conditions
    const calculatePosition = () => {
      if (buttonRef?.current && modalRef.current) {
        const button = buttonRef.current;
        const buttonRect = button.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Estimate modal height (use max-h from className or default to 600px)
        // We'll use a reasonable estimate since we can't measure before render
        const estimatedModalHeight = 600; // max-h-[600px] from LanguageModal
        const padding = 16;
        const minPaddingFromEdge = 16;
        
        // Calculate available space below and above button
        const spaceBelow = viewportHeight - buttonRect.bottom - padding;
        const spaceAbove = buttonRect.top - padding;
        
        let calculatedTop: number;
        let calculatedRight: number;
        
        // Minimum top so modal never goes behind the fixed header (both header rows)
        const minTopBelowHeader = 160;

        // Determine if modal should be positioned above or below button
        const shouldPositionAbove = spaceBelow < estimatedModalHeight && spaceAbove > spaceBelow;
        
        if (shouldPositionAbove) {
          // Position above the button
          calculatedTop = buttonRect.top - estimatedModalHeight - padding;
          // Ensure modal doesn't go above viewport
          calculatedTop = Math.max(minPaddingFromEdge, calculatedTop);
        } else {
          // Position below the button (default)
          calculatedTop = buttonRect.bottom + padding;
          // Ensure modal never goes behind the fixed header
          calculatedTop = Math.max(calculatedTop, minTopBelowHeader);
          // Ensure modal doesn't go below viewport
          const maxTop = viewportHeight - estimatedModalHeight - minPaddingFromEdge;
          calculatedTop = Math.min(calculatedTop, maxTop);
          // If modal is taller than viewport, position at top with padding
          if (calculatedTop < minPaddingFromEdge) {
            calculatedTop = minPaddingFromEdge;
          }
        }
        
        // Calculate right position (align with button's right edge)
        calculatedRight = viewportWidth - buttonRect.right;
        // Ensure modal doesn't go off-screen to the left
        // Modal width is max 360px for small size, so ensure right edge doesn't exceed viewport
        const modalWidth = 360; // max-w-[360px] for small size
        const minRight = viewportWidth - modalWidth - minPaddingFromEdge;
        calculatedRight = Math.max(calculatedRight, minPaddingFromEdge);
        calculatedRight = Math.min(calculatedRight, minRight);
        
        // Ensure modal top is never behind the fixed header (all cases)
        const finalTop = Math.max(calculatedTop, minTopBelowHeader);
        
        setModalPosition({
          top: finalTop,
          right: calculatedRight,
        });
      }
    };
    
    // Small delay to ensure button ref is stable
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(calculatePosition);
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [isOpen, position, buttonRef, isMobile]);

  // Prevent body scroll when modal is open (overflow only – no body shift, so header stays visible)
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const html = document.documentElement;
      const originalHtmlOverflow = html.style.overflow;

      // document.body.style.overflow = "hidden";
      // html.style.overflow = "hidden";

      // Prevent touch scrolling on mobile (only on backdrop, not inside modal)
      const preventTouchMove = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        if (modalRef.current && modalRef.current.contains(target)) {
          return;
        }
        e.preventDefault();
      };
      document.addEventListener("touchmove", preventTouchMove, {
        passive: false,
      });

      return () => {
        document.body.style.overflow = originalOverflow || "";
        html.style.overflow = originalHtmlOverflow || "";
        document.removeEventListener("touchmove", preventTouchMove);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isOpen, position, isMobile]);

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
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        closeOnBackdropClick
      ) {
        onClose();
      }
    };

    if (isOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose, closeOnBackdropClick]);

  // Call onOpenChange when isOpen changes
  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  if (!isOpen) return null;

  // Size classes - mobile uses 90% width with max-w, desktop keeps original sizes
  const sizeClasses = {
    small: isMobile ? "w-[90%] max-w-[360px]" : "w-full md:w-full md:max-w-[360px]",
    medium: isMobile ? "w-[90%] max-w-[420px]" : "w-full md:w-full md:max-w-[420px]",
    large: isMobile ? "w-[90%] max-w-[420px]" : "w-full md:w-full md:max-w-4xl",
    fullscreen: "w-full h-full max-w-full max-h-full",
  };

  // Position styles - use isMobile state for consistency
  const getPositionStyle = () => {
    // On mobile, always center regardless of position prop
    if (isMobile) {
      return {};
    }
    
    // Desktop/Tablet behavior
    if (position === "relative") {
      return {
        top: `${modalPosition.top}px`,
        right: `${modalPosition.right}px`,
      };
    }
    
    if (position === "top") {
      return {
        top: "0",
        paddingTop: "4rem",
        paddingBottom: "1.5rem",
      };
    }
    
    // Default centered (position === "centered")
    return {};
  };

  // Full-screen overlay so entire page including header is dimmed
  const getContainerClasses = () => {
    if (isMobile) {
      return "fixed inset-0 flex items-center justify-center px-4 py-6";
    }
    if (position === "relative") {
      return "fixed";
    }
    if (position === "top") {
      return "fixed inset-0 flex items-start justify-center px-4 pb-0 pt-32";
    }
    return "fixed inset-0 flex items-center justify-center px-4 py-6";
  };

  return (
    <>
      {backdropClassName !== "hidden" && (
        <div
          className={`fixed inset-0 bg-black/50 ${backdropClassName}`}
          style={{ zIndex: zIndex.backdrop }}
          onClick={closeOnBackdropClick ? onClose : undefined}
        />
      )}
      <div
        ref={modalRef}
        className={getContainerClasses()}
        style={{ zIndex: zIndex.modal, ...getPositionStyle() }}
        onClick={(e) => {
          e.stopPropagation();
          if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className={`${sizeClasses[size]} ${
            size !== "fullscreen" ? (isMobile ? "max-h-[92vh]" : "max-h-[90vh]") : "h-full"
          } flex flex-col rounded-2xl bg-(--colorWhite) shadow-2xl border border-(--colorGrey) overflow-hidden ${className}`}
        >
          {/* Header */}
          {(title || headerContent || showCloseButton) && (
            <div className="flex-shrink-0 bg-(--colorWhite)">
              {headerContent ? (
                <div className="px-4 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">{headerContent}</div>
                    {showCloseButton && (
                      <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-preto hover:text-preto transition rounded-full p-2 hover:bg-(--colorLightGrey) cursor-pointer flex-shrink-0 ml-4"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between px-4 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6">
                  <div className="flex-1">
                    {title && (
                      <p className="text-lg md:text-[24px] leading-6 md:leading-8 font-normal text-preto">
                        {title}
                      </p>
                    )}
                  </div>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      aria-label="Close modal"
                      className="text-preto hover:text-preto transition rounded-full p-2 hover:bg-(--colorLightGrey) cursor-pointer flex-shrink-0"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">{children}</div>

          {/* Footer */}
          {footerContent && (
            <div className="flex-shrink-0 bg-(--colorWhite) border-t border-(--colorGrey)">
              {footerContent}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
