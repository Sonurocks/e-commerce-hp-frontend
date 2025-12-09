"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { footerReferFriendImage } from "@/assets";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import ForgotPassword from "../profile/ForgotPassword";

const ReferFriend = () => {
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

  return (
    <div className="min-h-screen text-preto font-normal">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
          {/* Left Section - Login Form */}
          <div className="space-y-6 lg:col-span-2 max-w-sm">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-4xl font-normal text-preto">
                Come on in
              </h1>
              
              {/* Tabs */}
              <div className="border-b border-(--colorGrey)">
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
                    I AM NEW HERE
                    {activeTab === "signup" && (
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 z-10 bg-(--color-preto)" />
                    )}
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-4">
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
                            emailError ? "border-(--color-error)" : "border-preto focus:border-(--color-preto)"
                          }`}
                          placeholder="you@example.com"
                        />
                        {emailError && (
                          <p className="mt-1 text-xs text-(--color-error)">{emailError}</p>
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
                            passwordError ? "border-(--color-error)" : "border-preto focus:border-(--color-preto)"
                          }`}
                          placeholder="Enter password"
                        />
                        {passwordError && (
                          <p className="mt-1 text-xs text-(--color-error)">{passwordError}</p>
                        )}
                      </label>
                      <div className="text-left">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-xs font-thin text-preto underline hover:text-preto underline-offset-2 hover:underline cursor-pointer"
                        >
                          Forgot your password?
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-[#222] text-(--colorWhite) font-semibold py-3 text-base shadow-sm hover:bg-(--colorDark) transition cursor-pointer"
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
                      <span className="flex-1" />
                      <span className="text-base font-thin text-preto">
                        OR
                      </span>
                      <span className="flex-1" />
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
                            emailError ? "border-(--color-error)" : "border-preto focus:border-(--color-preto)"
                          }`}
                          placeholder="you@example.com"
                        />
                        {emailError && (
                          <p className="mt-1 text-xs text-(--color-error)">{emailError}</p>
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
                            passwordError ? "border-(--color-error)" : "border-preto focus:border-(--color-preto)"
                          }`}
                          placeholder="Enter password"
                        />
                        {passwordError && (
                          <p className="mt-1 text-xs text-(--color-error)">{passwordError}</p>
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
                        className="w-full rounded-xl bg-[#222] text-(--colorWhite) font-semibold py-3 text-base shadow-sm hover:bg-(--colorDark) transition cursor-pointer"
                      >
                        Register
                      </button>
                    </form>

                    <div className="flex items-center gap-3">
                      <span className="flex-1" />
                      <span className="text-base font-thin text-preto">
                        OR
                      </span>
                      <span className="flex-1" />
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

          {/* Right Section - Retail Display Image */}
          <div className="flex justify-center lg:justify-start lg:col-span-3 h-full">
            <div className="relative w-full h-full min-h-[600px]">
              <Image
                src={footerReferFriendImage}
                alt="Refer Friend"
                className="w-full h-full object-cover"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default ReferFriend;

