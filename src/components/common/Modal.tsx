"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
import { FiX } from "react-icons/fi";

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
  zIndex = { backdrop: 99, modal: 100 },
  onOpenChange,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const [isMobile, setIsMobile] = useState(false);

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
      if (buttonRef?.current) {
        const button = buttonRef.current;
        const buttonRect = button.getBoundingClientRect();
        setModalPosition({
          top: buttonRect.bottom + 16,
          right: window.innerWidth - buttonRect.right,
        });
      }
    };
    
    // Small delay to ensure button ref is stable
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(calculatePosition);
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [isOpen, position, buttonRef, isMobile]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // For relative positioned modals on desktop (like LanguageModal), 
      // only apply scroll lock on mobile where backdrop is shown
      const shouldLockScroll = position !== "relative" || isMobile;
      
      if (shouldLockScroll) {
        const scrollY = window.scrollY;
        const originalOverflow = document.body.style.overflow;
        const originalPosition = document.body.style.position;
        const originalTop = document.body.style.top;
        const originalWidth = document.body.style.width;

        // Prevent scrolling
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        // Prevent touch scrolling on mobile
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
          // Restore original styles - ensure all styles are cleared
          document.body.style.overflow = originalOverflow || "";
          document.body.style.position = originalPosition || "";
          document.body.style.top = originalTop || "";
          document.body.style.width = originalWidth || "";

          // Restore scroll position - use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
          });
          
          document.removeEventListener("touchmove", preventTouchMove);
        };
      } else {
        // For relative positioned modals on desktop, just prevent overflow
        // without fixing position to avoid visual shift
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
          document.body.style.overflow = originalOverflow || "";
        };
      }
    } else {
      // When modal closes, ensure body styles are reset
      // This handles edge cases where cleanup might not run
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
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

  // Container classes based on position - use isMobile state for consistency
  const getContainerClasses = () => {
    // On mobile, always center regardless of position prop
    if (isMobile) {
      return "fixed inset-0 flex items-center justify-center px-4 py-6";
    }
    
    // Desktop/Tablet behavior
    if (position === "relative") {
      return "fixed";
    }
    
    if (position === "top") {
      return "fixed inset-0 flex items-start justify-center px-4 pb-0 pt-16";
    }
    
    // Default centered (position === "centered")
    return "fixed inset-0 flex items-center justify-center px-4 py-6";
  };

  return (
    <>
      {/* Backdrop overlay */}
      {backdropClassName !== "hidden" && (
        <div
          className={`fixed inset-0 bg-black/50 ${backdropClassName}`}
          style={{ zIndex: zIndex.backdrop }}
          onClick={closeOnBackdropClick ? onClose : undefined}
        />
      )}

      {/* Modal Container */}
      <div
        ref={modalRef}
        className={getContainerClasses()}
        style={{ zIndex: zIndex.modal, ...getPositionStyle() }}
        onClick={(e) => e.stopPropagation()}
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
