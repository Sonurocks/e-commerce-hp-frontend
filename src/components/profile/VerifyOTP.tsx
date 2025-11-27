"use client";

import React, { useRef, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import SetNewPassword from "./SetNewPassword";

interface VerifyOTPProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSuccess?: () => void;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ isOpen, onClose, email, onSuccess }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setOtp("");
      setOtpError("");
      setTimer(60);
      setCanResend(false);
      setShowSetPasswordModal(false);
    } else {
      // Start timer when modal opens
      setTimer(60);
      setCanResend(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Timer countdown
  useEffect(() => {
    if (isOpen && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen, timer]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
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
        if (showSetPasswordModal) {
          setShowSetPasswordModal(false);
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
  }, [isOpen, onClose, showSetPasswordModal]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (!showSetPasswordModal) {
          onClose();
        }
      }
    };

    if (isOpen && !showSetPasswordModal) {
      // Small delay to prevent immediate close when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose, showSetPasswordModal]);

  const handleResendCode = () => {
    setTimer(60);
    setCanResend(false);
    // Resend OTP logic here
    console.log("Resending OTP to:", email);
  };

  const validateOTP = (otp: string): boolean => {
    return /^\d{6}$/.test(otp);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Verify OTP Modal - Only show when Set New Password modal is not open */}
      {!showSetPasswordModal && (
        <>
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black/50 z-[99]" />

          {/* Verify OTP Modal */}
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
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  aria-label="Go back"
                  className="text-preto hover:text-preto transition rounded-full p-2 hover:bg-(--colorLightGrey)"
                >
                  <FiArrowLeft className="w-5 h-5" />
                </button>
                <p className="text-[24px] leading-8 font-normal text-preto">
                  Verify OTP
                </p>
              </div>
            </div>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 py-5 space-y-4">
              <p className="text-base font-normal text-preto">
                A 6-digit code was sent to {email}
              </p>
              
              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!validateOTP(otp)) {
                    setOtpError("Please enter a valid 6-digit code");
                  } else {
                    setOtpError("");
                    // Open Set New Password modal
                    setShowSetPasswordModal(true);
                  }
                }}
              >
                <label className="block text-xs font-normal text-preto">
                  Enter Code (OTP)
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setOtp(value);
                      if (otpError) {
                        setOtpError("");
                      }
                    }}
                    onBlur={() => {
                      if (otp && !validateOTP(otp)) {
                        setOtpError("Please enter a valid 6-digit code");
                      } else {
                        setOtpError("");
                      }
                    }}
                    className={`mt-2 w-full rounded-xl border px-4 py-3 text-base text-preto placeholder:text-(--color-hina) focus:outline-none ${
                      otpError ? "border-red-500" : "border-preto focus:border-(--color-preto)"
                    }`}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                  {otpError && (
                    <p className="mt-1 text-xs text-red-500">{otpError}</p>
                  )}
                </label>
                
                <div className="text-center">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-xs font-thin text-preto underline hover:text-preto underline-offset-2 hover:underline cursor-pointer"
                    >
                      Resend Code
                    </button>
                  ) : (
                    <p className="text-xs font-thin text-(--color-hina)">
                      Resend Code in {timer}s
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black text-(--colorWhite) font-semibold py-3 text-base shadow-sm hover:bg-(--colorDark) transition"
                >
                  Verify OTP & Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Set New Password Modal */}
      <SetNewPassword
        isOpen={showSetPasswordModal}
        onClose={() => setShowSetPasswordModal(false)}
        onSuccess={() => {
          setShowSetPasswordModal(false);
          onClose();
          if (onSuccess) {
            onSuccess();
          }
        }}
      />
    </>
  );
};

export default VerifyOTP;

