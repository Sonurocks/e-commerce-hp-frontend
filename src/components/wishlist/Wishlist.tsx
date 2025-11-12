'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Wishlist = () => {
  const [email, setEmail] = useState('supriya2002arora@gmail.com');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Newsletter signup:', email);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-[48px] py-16 max-w-[1440px]">
        {/* Wishlist Section - Left Aligned */}
        <div className="mb-24 max-w-2xl">
          <h1 className="text-4xl font-base text-[var(--color-preto)] mb-3">
            Wishlist
          </h1>
          <p className="text-base text-[var(--color-preto)] mb-4 font-base leading-relaxed">
            Add your favourite items to your wishlist and they&apos;ll appear here
          </p>
          <Link
            href="/"
            className="inline-block bg-[var(--color-preto)] text-white px-5 py-2.5 rounded-md hover:bg-gray-800 transition-colors font-normal text-sm"
          >
            Shop Now
          </Link>
        </div>

        {/* Newsletter Signup Section */}
       
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left side - Title and Description */}
            <div className="flex-1 max-w-2xl">
              <h2 className="text-3xl font-base text-[var(--color-preto)] mb-3">
                Never miss a thing
              </h2>
              <p className="text-base text-[var(--color-preto)] leading-relaxed font-base">
                Sign up for promotions, tailored new arrivals, stock updates and more - straight to your inbox.
              </p>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 w-full lg:w-auto lg:max-w-2xl">
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label className="block text-sm font-base text-[var(--color-preto)] mb-2 uppercase tracking-wide">
                    GET UPDATES BY
                  </label>
                  <div className="text-base text-[var(--color-preto)] mb-2 font-base">Email</div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[var(--color-preto)] text-base bg-white font-normal"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[var(--color-preto)] text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-normal text-base"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-sm text-[var(--color-preto)] mt-4 leading-relaxed font-base max-w-2xl">
                By signing up, you consent to receiving marketing by email and/or SMS and acknowledge you<br />
                 have read our{' '}
                <Link href="/privacy-policy" className="underline hover:no-underline">
                  Privacy Policy
                </Link>
                . Unsubscribe anytime at the bottom of our emails or by replying<br />
                STOP to any of our SMS.
              </p>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default Wishlist;

