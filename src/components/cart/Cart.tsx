"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

const Cart = () => {
  const [email, setEmail] = useState("user@gmail.com");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log("Newsletter signup:", email);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-[48px] py-16 max-w-[1440px]">
        {/* Shopping Bag Section - Left Aligned */}
        <div className="mb-24 max-w-2xl">
          <h1 className="text-4xl font-base text-(--color-preto) mb-3">
            Shopping Bag
          </h1>
          <p className="text-base text-(--color-preto) mb-4 font-base leading-relaxed">
            There&apos;s nothing in your bag yet...
          </p>
          <Link
            href="/"
            className="inline-block bg-(--theme-bg) border border-(--theme-border)  text-(--theme-text) px-5 py-2.5 rounded-md transition-colors font-normal text-sm"
          >
            Shop Women
          </Link>
        </div>

        {/* Newsletter Signup Section */}
        <div className="mb-24">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left side - Title and Description */}
            <div className="flex-1 max-w-3xl">
              <h2 className="text-3xl font-basetext-(--color-preto) mb-3">
                Never miss a thing
              </h2>
              <p className="text-basetext-(--color-preto) leading-relaxed font-base">
                Sign up for promotions, tailored new arrivals, stock updates and
                more - straight to your inbox.
              </p>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 w-full lg:w-auto lg:max-w-2xl">
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label className="block text-sm font-basetext-(--color-preto) mb-2 uppercase tracking-wide">
                    GET UPDATES BY
                  </label>
                  <div className="text-basetext-(--color-preto) mb-2 font-base">
                    Email
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-preto text-base  font-normal"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[var(--theme-bg)] text-[var(--theme-text)] border border-[var(--theme-border)] px-6 py-3 rounded-md transition-colors font-normal text-base"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-smtext-(--color-preto) mt-4 leading-relaxed font-base max-w-2xl">
                By signing up, you consent to receiving marketing by email
                and/or SMS and acknowledge you
                <br />
                have read our{" "}
                <Link
                  href="/privacy-policy"
                  className="underline hover:no-underline"
                >
                  Privacy Policy
                </Link>
                . Unsubscribe anytime at the bottom of our emails or by replying
                <br />
                STOP to any of our SMS.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}

        <h2 className="text-2xl font-basetext-(--color-preto) mb-3">
          Contact us
        </h2>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Email Contact */}
          <div className="flex-1  border border-[var(--theme-border)] rounded-md p-4">
            <div className="mb-2">
              <FaEnvelope className="w-6 h-6text-(--color-preto)" />
            </div>
            <h3 className="text-sm font-basetext-(--color-preto) mb-1 uppercase tracking-wide">
              EMAIL US
            </h3>
            <p className="text-basetext-(--color-preto) mb-1 font-base">
              Get in touch by email
            </p>
            <a
              href="mailto:customerservice@farfetch.com"
              className="text-basetext-(--color-preto) font-base hover:underline"
            >
              customerservice@farfetch.com
            </a>
          </div>

          {/* Right Column - Phone Contact */}
          <div className="flex-1  border border-[var(--theme-border)] rounded-md p-4">
            <div className="mb-2">
              <FaPhone className="w-6 h-6text-(--color-preto)" />
            </div>
            <h3 className="text-sm font-basetext-(--color-preto) mb-1 uppercase tracking-wide">
              ORDER BY PHONE
            </h3>
            <p className="text-basetext-(--color-preto) mb-1 font-base">
              Available Monday to Friday
            </p>
            <a
              href="tel:+16467913768"
              className="text-basetext-(--color-preto) font-base hover:underline"
            >
              +1 646 791 3768
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
