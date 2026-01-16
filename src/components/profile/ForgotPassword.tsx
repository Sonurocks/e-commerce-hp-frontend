"use client";

import React, { useEffect, useState } from "react";
import VerifyOTP from "./VerifyOTP";
import Modal from "../common/Modal";

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
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

  // Handle ESC key for nested modals
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

  return (
    <>
      {/* Forgot Password Modal - Only show when OTP modal is not open */}
      {!showOTPModal && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          title="Forgot your password?"
          size="medium"
          position="top"
          closeOnBackdropClick={!showOTPModal}
        >
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
                className="w-full rounded-xl bg-(--colorDark) text-white font-semibold py-3 text-base shadow-sm  transition"
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
        </Modal>
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

