"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import ForgotPassword from "./ForgotPassword";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userName = "user",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
    return true;
  };

  
  useEffect(() => {
    if (!isOpen) {
      setActiveTab("signin");
      setEmail("");
      setPassword("");
      setName("");
      setEmailError("");
      setPasswordError("");
      setShowForgotPassword(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
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
        e.preventDefault();
      };
      document.addEventListener("touchmove", preventTouchMove, { passive: false });

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, scrollY);
        document.removeEventListener("touchmove", preventTouchMove);
      };
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        if (showForgotPassword) {
          setShowForgotPassword(false);
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
  }, [isOpen, onClose, showForgotPassword]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {  
        onClose();
      }
    };

    if (isOpen && !showForgotPassword) {
      // Small delay to prevent immediate close when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose, showForgotPassword]);

  if (!isOpen) return null;

  return (
    <>
      {/* Main Profile Modal - Only show when forgot password modal is not open */}
      {!showForgotPassword && (
        <>
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black/50 z-[99]" />

          {/* Profile Modal */}
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
                  Come on in
                </p>
                
              </div>
              <button
                onClick={onClose}
                aria-label="Close profile modal"
                className="text-preto hover:text-preto transition rounded-full p-2 hover:bg-(--colorLightGrey) cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs - Fixed */}
            <div className="px-8 border-b border-(--colorGrey)">
              <div className="flex text-sm font-normal tracking-wide">
                <button 
                  onClick={() => setActiveTab("signin")}
                  className={`pb-3 relative transition cursor-pointer ${
                    activeTab === "signin" 
                      ? "text-preto" 
                      : "text-(--color-hina) hover:text-preto"
                  }`}
                >
                  SIGN IN
                  {activeTab === "signin" && (
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 z-10 bg-(--color-preto)" />
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab("signup")}
                  className={`ml-6 pb-3 relative transition cursor-pointer ${
                    activeTab === "signup" 
                      ? "text-preto" 
                      : "text-(--color-hina) hover:text-preto"
                  }`}
                >
                  I m NEW HERE
                  {activeTab === "signup" && (
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 z-10 bg-(--color-preto)" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 py-5 space-y-4">
              {activeTab === "signin" ? (
                <>
                  <form 
                    className="space-y-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      let isValid = true;
                      
                      if (!validateEmail(email)) {
                        setEmailError("Please enter a valid email address");
                        isValid = false;
                      } else {
                        setEmailError("");
                      }
                      
                      if (!validatePassword(password)) {
                        setPasswordError("Password must be 6-12 characters with 1 uppercase and 1 special character");
                        isValid = false;
                      } else {
                        setPasswordError("");
                      }
                      
                      if (isValid) {
                        // Proceed with sign in
                        console.log("Sign in successful");
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
                    <label className="block text-xs font-normal text-preto">
                      Password
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (passwordError) {
                            setPasswordError("");
                          }
                        }}
                        onBlur={() => {
                          if (password && !validatePassword(password)) {
                            setPasswordError("Password must be 6-12 characters with 1 uppercase and 1 special character");
                          } else {
                            setPasswordError("");
                          }
                        }}
                        className={`mt-2 w-full rounded-xl border px-4 py-3 text-base text-preto placeholder:text-(--color-hina) focus:outline-none ${
                          passwordError ? "border-red-500" : "border-preto focus:border-(--color-preto)"
                        }`}
                        placeholder="Enter password"
                      />
                      {passwordError && (
                        <p className="mt-1 text-xs text-red-500">{passwordError}</p>
                      )}
                    </label>
                    <div className="text-left">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-xs font-thin text-preto underline hover:text-preto underline-offset-2 hover:underline cursor-pointer"
                      >
                        Forgot your password ?
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-black text-(--colorWhite) font-semibold py-3 text-base shadow-sm hover:bg-(--colorDark) transition cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      disabled
                      className="w-full rounded-xl bg-(--colorLightGrey) text-(--colorDarkGrey) font-semibold py-3 text-base cursor-not-allowed"
                    >
                      Continue With One-Time Code
                    </button>
                  </form>

                  <div className="flex items-center gap-3">
                    <span className="flex-1 " />
                    <span className="text-base font-thin text-preto">
                      OR
                    </span>
                    <span className=" flex-1 " />
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      className="w-full rounded-xl border border-preto py-3 text-base font-medium flex items-center justify-center gap-3 hover:bg-(--colorLightGrey) transition cursor-pointer"
                    >
                      <FcGoogle className="text-xl" />
                      Continue With Google
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-preto py-3 text-base font-medium flex items-center justify-center gap-3 hover:bg-(--colorLightGrey) transition cursor-pointer"
                    >
                      <FaApple className="text-xl text-preto" />
                      Continue With Apple
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-preto py-3 text-base font-medium flex items-center justify-center gap-3 hover:bg-(--colorLightGrey) transition cursor-pointer"
                    >
                      <FaFacebookF
                        className="text-xl text-(--color-facebook)"
                      />
                      Continue With Facebook
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-normal text-preto">
                      New to FARFETCH?{" "}
                      <Link
                        href="/register"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("signup");
                        }}
                        className="underline hover:text-preto"
                      >
                        Register.
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <form 
                    className="space-y-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      let isValid = true;
                      
                      if (!validateEmail(email)) {
                        setEmailError("Please enter a valid email address");
                        isValid = false;
                      } else {
                        setEmailError("");
                      }
                      
                      if (!validatePassword(password)) {
                        setPasswordError("Password must be 6-12 characters with 1 uppercase and 1 special character");
                        isValid = false;
                      } else {
                        setPasswordError("");
                      }
                      
                      if (isValid) {
                        // Proceed with registration
                        console.log("Registration successful");
                      }
                    }}
                  >
                    <label className="block text-xs font-normal text-preto">
                      Name
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-preto px-4 py-3 text-base text-preto placeholder:text-(--color-hina) focus:outline-none focus:border-(--color-preto)"
                        placeholder="Enter your name"
                      />
                    </label>
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
                    <label className="block text-xs font-normal text-preto">
                      Password
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (passwordError) {
                            setPasswordError("");
                          }
                        }}
                        onBlur={() => {
                          if (password && !validatePassword(password)) {
                            setPasswordError("Password must be 6-12 characters with 1 uppercase and 1 special character");
                          } else {
                            setPasswordError("");
                          }
                        }}
                        className={`mt-2 w-full rounded-xl border px-4 py-3 text-base text-preto placeholder:text-(--color-hina) focus:outline-none ${
                          passwordError ? "border-red-500" : "border-preto focus:border-(--color-preto)"
                        }`}
                        placeholder="Enter password"
                      />
                      {passwordError && (
                        <p className="mt-1 text-xs text-red-500">{passwordError}</p>
                      )}
                    </label>
                    <p className="text-xs font-normal text-preto">
                      By registering, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="underline hover:text-preto"
                      >
                        Terms & Conditions
                      </Link>
                      ,{" "}
                      <Link
                        href="/privacy"
                        className="underline hover:text-preto"
                      >
                        Privacy and Cookie Policy
                      </Link>
                      , and to join our loyalty programme.
                    </p>
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="marketing"
                        className="mt-1 w-4 h-4 rounded border-preto text-preto focus:ring-preto"
                        defaultChecked
                      />
                      <label
                        htmlFor="marketing"
                        className="text-xs font-normal text-preto"
                      >
                        Sign up and never miss out on exclusive member rewards,
                        tailored new arrivals and new launches. Unsubscribe at
                        the bottom of our emails.{" "}
                        <Link
                          href="/more-info"
                          className="underline hover:text-preto"
                        >
                          Find out more
                        </Link>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-black text-(--colorWhite) font-semibold py-3 text-base shadow-sm hover:bg-(--colorDark) transition cursor-pointer"
                    >
                      Register
                    </button>
                  </form>

                  <div className="flex items-center gap-3">
                    <span className="flex-1 " />
                    <span className="text-base font-thin text-preto">
                      OR
                    </span>
                    <span className=" flex-1 " />
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      className="w-full rounded-xl border border-preto py-3 text-base font-medium flex items-center justify-center gap-3 hover:bg-(--colorLightGrey) transition cursor-pointer"
                    >
                      <FcGoogle className="text-xl" />
                      Continue With Google
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-preto py-3 text-base font-medium flex items-center justify-center gap-3 hover:bg-(--colorLightGrey) transition cursor-pointer"
                    >
                      <FaApple className="text-xl text-preto" />
                      Continue With Apple
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-preto py-3 text-base font-medium flex items-center justify-center gap-3 hover:bg-(--colorLightGrey) transition cursor-pointer"
                    >
                      <FaFacebookF
                        className="text-xl text-(--color-facebook)"
                      />
                      Continue With Facebook
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Forgot Password Modal */}
      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
};

export default ProfileModal;

