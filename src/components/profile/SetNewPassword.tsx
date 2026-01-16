"use client";

import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import Toast from "./Toast";
import Modal from "../common/Modal";

interface SetNewPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const SetNewPassword: React.FC<SetNewPasswordProps> = ({ isOpen, onClose, onSuccess }) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Password validation function
  const validatePassword = (password: string): boolean => {
    if (password.length < 6 || password.length > 12) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[@$!%*?&#]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }
    return true;
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setNewPassword("");
      setConfirmPassword("");
      setNewPasswordError("");
      setConfirmPasswordError("");
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setShowToast(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Custom header with back button
  const headerContent = (
    <div className="flex items-center gap-4">
      <button
        onClick={onClose}
        aria-label="Go back"
        className="text-preto hover:text-preto transition rounded-full p-2 hover:bg-(--colorLightGrey)"
      >
        <FiArrowLeft className="w-5 h-5" />
      </button>
      <p className="text-[24px] leading-8 font-normal text-preto">
        Set New Password
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="medium"
      position="top"
      headerContent={headerContent}
      showCloseButton={false}
    >
      <div className="px-8 py-5 space-y-4 relative">
              {/* Toast Notification */}
              <Toast
                message="Password reset successful."
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                duration={2000}
              />
              
              <p className="text-base font-normal text-preto">
                Create a new password for your account.
              </p>
              
              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  let isValid = true;

                  if (!validatePassword(newPassword)) {
                    setNewPasswordError("Password must be 6-12 characters with 1 uppercase, 1 number, and 1 special character");
                    isValid = false;
                  } else {
                    setNewPasswordError("");
                  }

                  if (newPassword !== confirmPassword) {
                    setConfirmPasswordError("Passwords do not match");
                    isValid = false;
                  } else {
                    setConfirmPasswordError("");
                  }

                  if (isValid) {
                    // Show toast notification
                    setShowToast(true);
                    // Close modal after 2 seconds and redirect to login
                    setTimeout(() => {
                      if (onSuccess) {
                        onSuccess();
                      } else {
                        onClose();
                      }
                    }, 2000);
                  }
                }}
              >
                <label className="block text-xs font-normal text-preto">
                  New Password
                  <div className="relative mt-2">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (newPasswordError) {
                          setNewPasswordError("");
                        }
                      }}
                      onBlur={() => {
                        if (newPassword && !validatePassword(newPassword)) {
                          setNewPasswordError("Password must be 6-12 characters with 1 uppercase, 1 number, and 1 special character");
                        } else {
                          setNewPasswordError("");
                        }
                      }}
                      className={`w-full rounded-xl border px-4 py-3 pr-12 text-base text-preto placeholder:text-(--color-hina) focus:outline-none ${
                        newPasswordError ? "border-red-500" : "border-preto focus:border-(--color-preto)"
                      }`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-preto hover:text-preto transition"
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {newPasswordError && (
                    <p className="mt-1 text-xs text-red-500">{newPasswordError}</p>
                  )}
                </label>

                <label className="block text-xs font-normal text-preto">
                  Confirm New Password
                  <div className="relative mt-2">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (confirmPasswordError) {
                          setConfirmPasswordError("");
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onCopy={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onCut={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onBlur={() => {
                        if (confirmPassword && newPassword !== confirmPassword) {
                          setConfirmPasswordError("Passwords do not match");
                        } else {
                          setConfirmPasswordError("");
                        }
                      }}
                      className={`w-full rounded-xl border px-4 py-3 pr-12 text-base text-preto placeholder:text-(--color-hina) focus:outline-none ${
                        confirmPasswordError ? "border-red-500" : "border-preto focus:border-(--color-preto)"
                      }`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-preto hover:text-preto transition"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <p className="mt-1 text-xs text-red-500">{confirmPasswordError}</p>
                  )}
                </label>
                
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black text-(--colorWhite) font-semibold py-3 text-base shadow-sm hover:bg-(--colorDark) transition"
                >
                  Reset Password
                </button>
              </form>
      </div>
    </Modal>
  );
};

export default SetNewPassword;

