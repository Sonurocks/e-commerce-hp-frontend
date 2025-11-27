"use client";

import React, { useRef, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import VerifyOTP from "./VerifyOTP";

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowOTPModal(false);
      setEmail("");
      setEmailError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        if (showOTPModal) {
          setShowOTPModal(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose, showOTPModal]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (!showOTPModal) {
          onClose();
        }
      }
    };

    if (isOpen && !showOTPModal) {
      // Small delay to prevent immediate close when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose, showOTPModal]);

  if (!isOpen) return null;

  return (
    <>
      {/* Forgot Password Modal - Only show when OTP modal is not open */}
      {!showOTPModal && (
        <>
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black/50 z-[99]" />

          {/* Forgot Password Modal */}
          <div
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-16 pb-6"
          >
        <div
          className="w-full max-w-[420px] max-h-[90vh] flex flex-col rounded-2xl bg-(--colorWhite) shadow-2xl border border-(--colorGrey) overflow-hidden"
        >
          {/* Header - Fixed */}
          <div className="flex-shrink-0 bg-(--colorWhite)">
            <div className="flex items-start justify-between px-8 pt-8 pb-6">
              <div>
                <p className="text-[24px] leading-8 font-normal text-preto">
                  Forgot your password?
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close forgot password modal"
                className="text-preto hover:text-preto transition rounded-full p-2 hover:bg-(--colorLightGrey)"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 py-5 space-y-4">
              <p className="text-base font-normal text-preto">
                Enter your email address and we will send you a otp to reset your password
              </p>
              
              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!validateEmail(email)) {
                    setEmailError("Please enter a valid email address");
                  } else {
                    setEmailError("");
                    // Open OTP modal
                    setShowOTPModal(true);
                  }
                }}
              >
                <label className="block text-xs font-normal text-preto">
                  Email address
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) {
                        setEmailError("");
                      }
                    }}
                    onBlur={() => {
                      if (email && !validateEmail(email)) {
                        setEmailError("Please enter a valid email address");
                      } else {
                        setEmailError("");
                      }
                    }}
                    className={`mt-2 w-full rounded-xl border px-4 py-3 text-base text-preto placeholder:text-(--color-hina) focus:outline-none ${
                      emailError ? "border-red-500" : "border-preto focus:border-(--color-preto)"
                    }`}
                    placeholder="you@example.com"
                  />
                  {emailError && (
                    <p className="mt-1 text-xs text-red-500">{emailError}</p>
                  )}
                </label>
                
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black text-(--colorWhite) font-semibold py-3 text-base shadow-sm hover:bg-(--colorDark) transition"
                >
                  Get OTP
                </button>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs font-thin text-preto underline hover:text-preto underline-offset-2 hover:underline"
                  >
                    Back To Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Verify OTP Modal */}
      <VerifyOTP
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={email}
        onSuccess={() => {
          setShowOTPModal(false);
          onClose();
        }}
      />
    </>
  );
};

export default ForgotPassword;

