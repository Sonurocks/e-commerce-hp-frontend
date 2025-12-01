"use client";

import React from "react";
import Link from "next/link";
import { HiMail } from "react-icons/hi";
import { HiArrowUp } from "react-icons/hi";

const AffiliateProgram = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-(--color-whiteSmoke) text-preto font-normal">
      <div className="max-w-7xl mx-auto px-4 pb-12 md:pb-16 pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Single White Box with 3 sections divided by gray borders */}
            <div className="bg-(--color-branco) p-4 md:p-6">
              {/* Section 1: Affiliates */}
              <div className="pb-8 border-b border-platinum">
                <h2 className="text-xl md:text-xl font-bold text-preto mb-2">
                  Affiliates
                </h2>
                <p className="text-base md:text-base text-preto leading-relaxed">
                  Farfetch is looking for innovative, fashion-forward, stylish websites and blogs 
                  specialising in fashion, lifestyle, beauty and design to join our global affiliate programme.
                </p>
              </div>

              {/* Section 2: What are the Benefits? */}
              <div className="py-8 border-b border-platinum">
                <h2 className="text-xl md:text-xl font-bold text-preto mb-2">
                  What are the Benefits?
                </h2>
                <ul className="space-y-2 text-base md:text-base text-preto leading-relaxed list-disc list-inside">
                  <li>Free to join</li>
                  <li>30-day cookie window</li>
                  <li>Commission on all approved global sales (excludes returns and cancellations)</li>
                  <li>Daily product feeds to support a variety of currencies</li>
                  <li>Competitions and giveaways</li>
                  <li>Regular newsletters about new product arrivals, new boutiques, features and offers</li>
                </ul>
              </div>

              {/* Section 3: About Farfetch */}
              <div className="pt-8">
                <h2 className="text-xl md:text-xl font-bold text-preto mb-2">
                  About Farfetch
                </h2>
                <div className="space-y-4">
                  <p className="text-base md:text-base text-preto leading-relaxed">
                    Welcome to Farfetch, the world largest selection of luxury.
                  </p>
                  <p className="text-base md:text-base text-preto leading-relaxed">
                    Every piece you see on Farfetch has been carefully curated by the Farfetch team 
                    from luxury brands and boutiques globally. Our partners are located from Tokyo 
                    to Toronto and Milan to Miami, and we work with the very best in the business. 
                    We offer a huge range of pieces from established luxury brands to new designers, 
                    so you can find exactly what youre looking for.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-4">
          
            <div className="bg-(--color-branco) p-4 md:p-6">
              <h2 className="text-xl md:text-xl font-bold text-preto mb-2">
                Join our affiliate programme
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HiMail className="w-5 h-5 text-preto" />
                  <span className="text-base md:text-base text-preto">E-mail</span>
                </div>
                <Link 
                  href="mailto:affiliates@farfetch.com" 
                  className="text-base md:text-base text-preto underline hover:opacity-70 transition block"
                >
                  affiliates@farfetch.com
                </Link>
                <p className="text-base md:text-base text-preto leading-relaxed pt-2">
                  Email us the name and URL of your website or blog. We will review your site 
                  and respond to your e-mail within seven days with further information on how 
                  to join the affiliate programme.
                </p>
              </div>
            </div>
 
            <div className="bg-(--color-branco) p-4 md:p-6">
              <h2 className="text-xl md:text-xl font-bold text-preto mb-2">
                Join as a Farfetch boutique
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HiMail className="w-5 h-5 text-preto" />
                  <span className="text-base md:text-base text-preto">E-mail</span>
                </div>
                <Link 
                  href="mailto:retailpartners@farfetch.com" 
                  className="text-base md:text-base text-preto underline hover:opacity-70 transition block"
                >
                  retailpartners@farfetch.com
                </Link>
                <p className="text-base md:text-base text-preto leading-relaxed pt-2">
                  If youre a Boutique and would like to join the Farfetch Community please contact 
                  Retail Partners with details of your boutique, including a website address.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button - Outside Template, Left Side */}
        <div className="mt-6 absolute ml-2">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-preto hover:opacity-70 transition"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <HiArrowUp className="w-5 h-5 text-preto" />
            </div>
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;

