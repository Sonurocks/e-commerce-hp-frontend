"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import ForgotPassword from "./ForgotPassword";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { useLanguage } from "@/context/LanguageContext";

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
  const { translations } = useLanguage();
  const translate = (text: string) => translations.productCopy[text] ?? text;
  const farfetchText = translations.productCopy["FARFETCH"] || translations.header.logoText || "FARFETCH";
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

  // Handle ESC key for nested modals
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

  // Custom header with tabs
  const headerContent = (
    <>
      <div>
        <p className="text-[24px] leading-8 font-normal text-preto">
          {translate("Come on in")}
        </p>
      </div>
      {/* Tabs - Fixed */}
      <div className="px-0 border-b border-(--colorGrey) mt-6 -mx-8">
        <div className="flex text-sm font-normal tracking-wide px-8">
          <button 
            onClick={() => setActiveTab("signin")}
            className={`pb-3 relative transition cursor-pointer ${
              activeTab === "signin" 
                ? "text-preto" 
                : "text-(--color-hina) "
            }`}
          >
            {translate("SIGN IN")}
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
            {translate("I m NEW HERE")}
            {activeTab === "signup" && (
              <span className="absolute left-0 right-0 bottom-0 h-0.5 z-10 bg-(--color-preto)" />
            )}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Main Profile Modal - Only show when forgot password modal is not open */}
      {!showForgotPassword && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="medium"
          position="top"
          headerContent={headerContent}
          closeOnBackdropClick={!showForgotPassword}
        >
          <div className="px-4 md:px-8 py-4 md:py-5 space-y-3 md:space-y-4">
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
                      {translate("Email address")}
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
                            setEmailError(translate("Please enter a valid email address"));
                          } else {
                            setEmailError("");
                          }
                        }}
                        className={`mt-2 w-full rounded-xl border px-4 py-3 text-base text-preto placeholder:text-(--color-hina) focus:outline-none ${
                          emailError ? "border-red-500" : "border-preto focus:border-(--color-preto)"
                        }`}
                        placeholder={translate("you@example.com")}
                      />
                      {emailError && (
                        <p className="mt-1 text-xs text-red-500">{emailError}</p>
                      )}
                    </label>
                    <label className="block text-xs font-normal text-preto">
                      {translate("Password")}
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
                            setPasswordError(translate("Password must be 6-12 characters with 1 uppercase and 1 special character"));
                          } else {
                            setPasswordError("");
                          }
                        }}
                        className={`mt-2 w-full rounded-xl border px-4 py-3 text-base text-preto placeholder:text-(--color-hina) focus:outline-none ${
                          passwordError ? "border-red-500" : "border-preto focus:border-(--color-preto)"
                        }`}
                        placeholder={translate("Enter password")}
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
                        {translate("Forgot your password ?")}
                      </button>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      className="rounded-xl bg-(--colorDark) py-3 text-base shadow-sm"
                    >
                      {translate("Sign In")}
                    </Button>
                    <Button
                      type="button"
                      disabled
                      variant="primary"
                      fullWidth
                      className="rounded-xl bg-(--colorLightGrey) text-(--colorDarkGrey) py-3 text-base"
                    >
                      {translate("Continue With One-Time Code")}
                    </Button>
                  </form>

                  <div className="flex items-center gap-3">
                    <span className="flex-1 " />
                    <span className="text-base font-thin text-preto">
                      {translate("OR")}
                    </span>
                    <span className=" flex-1 " />
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      className="w-full rounded-xl border border-preto py-3 text-base font-medium flex items-center justify-center gap-3 hover:bg-(--colorLightGrey) transition cursor-pointer"
                    >
                      <FcGoogle className="text-xl" />
                      {translate("Continue With")} {translate("Google")}
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-preto py-3 text-base font-medium flex items-center justify-center gap-3 hover:bg-(--colorLightGrey) transition cursor-pointer"
                    >
                      <FaApple className="text-xl text-preto" />
                      {translate("Continue With")} {translate("Apple")}
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-preto py-3 text-base font-medium flex items-center justify-center gap-3 hover:bg-(--colorLightGrey) transition cursor-pointer"
                    >
                      <FaFacebookF
                        className="text-xl text-(--color-facebook)"
                      />
                      {translate("Continue With")} {translate("Facebook")}
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-normal text-preto">
                      {translate("New to FARFETCH? Register.").replace("FARFETCH", farfetchText).replace("Register.", "").trim()}{" "}
                      <Link
                        href="/register"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("signup");
                        }}
                        className="underline hover:text-preto"
                      >
                        {translate("Register")}.
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
                        setEmailError(translate("Please enter a valid email address"));
                        isValid = false;
                      } else {
                        setEmailError("");
                      }
                      
                      if (!validatePassword(password)) {
                        setPasswordError(translate("Password must be 6-12 characters with 1 uppercase and 1 special character"));
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
                    <Input
                      name="name"
                      label={translate("Name")}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={translate("Enter your name")}
                      inputClassName="rounded-xl"
                      required
                    />
                    <Input
                      name="email"
                      label={translate("Email address")}
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
                          setEmailError(translate("Please enter a valid email address"));
                        } else {
                          setEmailError("");
                        }
                      }}
                      error={emailError}
                      placeholder={translate("you@example.com")}
                      inputClassName="rounded-xl"
                      required
                    />
                    <Input
                      name="password"
                      label={translate("Password")}
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
                          setPasswordError(translate("Password must be 6-12 characters with 1 uppercase and 1 special character"));
                        } else {
                          setPasswordError("");
                        }
                      }}
                      error={passwordError}
                      placeholder={translate("Enter password")}
                      inputClassName="rounded-xl"
                    />
                    <p className="text-xs font-normal text-preto">
                      {translate("By registering, you agree to our")}{" "}
                      <Link
                        href="/terms"
                        className="underline hover:text-preto"
                      >
                        {translate("Terms & Conditions")}
                      </Link>
                      ,{" "}
                      <Link
                        href="/privacy"
                        className="underline hover:text-preto"
                      >
                        {translate("Privacy and Cookie Policy")}
                      </Link>
                      {translate(", and to join our loyalty programme.")}
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
                        {translate("Sign up and never miss out on exclusive member rewards, tailored new arrivals and new launches. Unsubscribe at the bottom of our emails.")}{" "}
                        <Link
                          href="/more-info"
                          className="underline hover:text-preto"
                        >
                          {translate("Find out more")}
                        </Link>
                      </label>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      className="rounded-xl bg-(--colorDark) py-3 text-base shadow-sm"
                    >
                      {translate("Register")}
                    </Button>
                  </form>

                  <div className="flex items-center gap-3">
                    <span className="flex-1 " />
                    <span className="text-base font-thin text-preto">
                      {translate("OR")}
                    </span>
                    <span className=" flex-1 " />
                  </div>

                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="social"
                      fullWidth
                      leftIcon={<FcGoogle className="text-xl" />}
                      className="rounded-xl py-3 text-base"
                    >
                      {translate("Continue With")} {translate("Google")}
                    </Button>
                    <Button
                      type="button"
                      variant="social"
                      fullWidth
                      leftIcon={<FaApple className="text-xl text-preto" />}
                      className="rounded-xl py-3 text-base"
                    >
                      {translate("Continue With")} {translate("Apple")}
                    </Button>
                    <Button
                      type="button"
                      variant="social"
                      fullWidth
                      leftIcon={<FaFacebookF className="text-xl text-(--color-facebook)" />}
                      className="rounded-xl py-3 text-base"
                    >
                      {translate("Continue With")} {translate("Facebook")}
                    </Button>
                  </div>
                </>
              )}
          </div>
        </Modal>
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

