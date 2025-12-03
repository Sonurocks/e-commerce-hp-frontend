"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerUnidaysImage } from "@/assets";

const Unidays = () => {
  return (
    <div className="min-h-screen text-preto font-normal ">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 items-stretch">
          {/* Left Section - Text Content */}
          <div className="space-y-6 lg:col-span-2 max-w-sm lg:pr-8 lg:pl-8">
            <div className="space-y-6">
              {/* UNiDAYS Logo */}
              <div className="space-y-1">
                <p className="text-xs font-normal text-preto">Verified by</p>
                <h2 className="text-2xl font-semibold text-preto">UNiDAYS</h2>
              </div>
              
              {/* Content from main heading onwards */}
              <div className="lg:pl-36">
                {/* Main Headline */}
                <h1 className="text-4xl md:text-3xl font-semibold text-preto leading-tight">
                  Students!<br />Get 10% Off
                </h1>
                
                {/* Body Text - Two Paragraphs */}
                <div className="space-y-4">
                  <p className="text-base font-normal text-preto leading-relaxed">
                    At FARFETCH, we think everybody should get access to the good stuff. So, if you are a student, we are giving you a 10% discount, plus speedy shipping and free returns.
                  </p>
                  <p className="text-base font-normal text-preto leading-relaxed">
                    For instant access to this discount simply join now and verify your student status with UNiDAYS.
                  </p>
                </div>
                
                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                  <button className="flex-1 rounded-lg border border-preto  text-preto font-normal py-2 text-base hover:bg-(--colorLightGrey) transition cursor-pointer">
                    Join now
                  </button>
                  <button className="flex-1 rounded-lg border border-pr text-preto font-normal py-2 text-base hover:bg-(--colorLightGrey) transition cursor-pointer">
                    Log in
                  </button>
                </div>
                
                {/* Terms and Conditions */}
                <p className="text-xs font-normal text-preto underline pt-2">
                  Terms and Conditions apply.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center lg:justify-start lg:col-span-3 h-full">
            <div className="relative w-full h-full min-h-[600px]">
              <Image
                src={footerUnidaysImage}
                alt="UNiDAYS Student Discount"
                className="w-full h-full object-cover"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="py-0">
        <div className="max-w-7xl mx-auto px-4">
          {/* First Line - Links and Change Region */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-1">
            <div className="flex flex-wrap gap-2 text-xs font-thin text-preto">
              <span>© UNIDAYS</span>
              <span>|</span>
              <Link href="#" className="underline hover:text-preto">About</Link>
              <span>|</span>
              <Link href="#" className="underline hover:text-preto">Support</Link>
              <span>|</span>
              <Link href="#" className="underline hover:text-preto">Privacy Policy</Link>
              <span>|</span>
              <Link href="#" className="underline hover:text-preto">Cookie Policy</Link>
              <span>|</span>
              <Link href="#" className="underline hover:text-preto">Terms of Service</Link>
              <span>|</span>
              <Link href="#" className="underline hover:text-preto">Contact</Link>
            </div>
            <Link href="#" className="text-xs font-thin text-preto underline hover:text-preto">
              Change region
            </Link>
          </div>

          {/* Second Line - Cookie Consent */}
          <p className="text-xs text-preto font-light">
            UNiDAYS use cookies to improve your experience on our site and show you personalised advertising. By continuing to use our site, you accept the use of our cookies as described in our{" "}
            <Link href="#" className="underline hover:text-preto">Cookie Policy</Link>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Unidays;

