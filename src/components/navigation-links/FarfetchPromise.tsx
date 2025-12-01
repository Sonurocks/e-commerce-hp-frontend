"use client";

import React from "react";
import Link from "next/link";
import { RiPriceTag3Line } from "react-icons/ri";
import { HiTruck } from "react-icons/hi";
import { BiLockAlt } from "react-icons/bi";
import { MdAssignmentReturn } from "react-icons/md";
import { MdOutlineContactPage } from "react-icons/md";
import { HiArrowUp } from "react-icons/hi";

const FarfetchPromise = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[--color-whiteSmoke] text-preto font-normal">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* White Template Container in Middle */}
        <div className="max-w-4xl mx-auto bg-[--color-branco] p-8 md:p-12">
          {/* Top Section: Why Farfetch? */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-xl md:text-xl font-normal text-preto">
              Why Farfetch?
            </h1>
            
            {/* Price Tag Icon */}
            <div className="flex justify-center">
              <RiPriceTag3Line className="w-16 h-16 text-preto" />
            </div>
            
            {/* Headline */}
            <h2 className="text-2xl md:text-3xl font-normal text-preto">
              Shop over 100,000 styles.
            </h2>
            
            {/* Paragraph */}
            <div className="max-w-3xl mx-auto">
              <p className="text-base md:text-base text-preto leading-relaxed">
                We are committed to our customer promise all year round, however during busy periods like holidays, sales and special campaigns you might experience higher waiting times from our Customer Service team. Your deliveries may take longer than usual to get to you, but do not worry — you will receive a confirmation email as soon as it is shipped. For more information, visit the{" "}
                <Link href="/faq" className="underline hover:opacity-70 transition">
                  FAQs
                </Link>
                .
              </p>
            </div>
            
            {/* See all designers link */}
            <div className="pt-4">
              <Link 
                href="#" 
                className="text-base md:text-lg text-preto underline hover:opacity-70 transition"
              >
                See all designers
              </Link>
            </div>
          </div>

          {/* Bottom Section: Service Features - 4 Boxes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 pt-12 border-t border-platinum">
            {/* Top-Left: Speedy delivery */}
            <div className="text-center space-y-4 p-6 border-b border-r-0 md:border-r border-platinum md:border-b-0 last:border-b-0">
              <div className="flex justify-center">
                <HiTruck className="w-12 h-12 text-preto" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-preto">
                Speedy delivery
              </h3>
              <p className="text-sm md:text-base text-preto leading-relaxed">
                In a hurry? We offer Express Delivery to most destinations.
              </p>
              <Link href="/orders-and-delivery" className="text-preto underline hover:opacity-70 transition inline-block">
                Learn more
              </Link>
            </div>

            {/* Top-Right: Free global returns and pick up */}
            <div className="text-center space-y-4 p-6 border-b border-platinum md:border-b-0">
              <div className="flex justify-center">
                <MdAssignmentReturn className="w-12 h-12 text-preto" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-preto">
                Free global returns and pick up
              </h3>
              <p className="text-sm md:text-base text-preto leading-relaxed">
                Changed your mind? No problem. You can return an order up to 30 days from receiving it.
              </p>
              <Link href="/returns-and-refunds" className="text-preto underline hover:opacity-70 transition inline-block">
                Learn more
              </Link>
            </div>

            {/* Bottom-Left: Quick response */}
            <div className="text-center space-y-2 p-6 border-r-0 md:border-r border-platinum">
              <div className="flex justify-center">
                <MdOutlineContactPage className="w-12 h-12 text-preto" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-preto">
                Quick response
              </h3>
              <p className="text-sm md:text-base text-preto leading-relaxed">
                We will answer any questions within 1 working day.
              </p>
              <Link href="/contact-us" className="text-preto underline hover:opacity-70 transition inline-block">
                Contact us
              </Link>
            </div>

            {/* Bottom-Right: Safe & secure shopping */}
            <div className="text-center space-y-4 p-6">
              <div className="flex justify-center">
                <BiLockAlt className="w-12 h-12 text-preto" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-preto">
                Safe & secure shopping
              </h3>
              <p className="text-sm md:text-base text-preto leading-relaxed">
                You are in safe hands. We accept all the major payment methods.
              </p>
              <Link href="/payment-and-pricing" className="text-preto underline hover:opacity-70 transition inline-block">
                Learn more
              </Link>
            </div>
          </div>

          {/* Customer Testimonial Section */}
          <div className="mt-6 pt-6 border-t border-platinum">
            <div className=" p-8 md:p-10">
              <p className="text-base md:text-base text-preto leading-relaxed mb-4">
                I ordered a bunch of other items online from other companies the day I ordered this bag, and these things were coming from companies within the US. The bag I ordered from Farfetch came all the way from Italy and got here - before I even received shipping info/confirmation for the other items. Amazing!!!
              </p>
              <p className="text-sm md:text-base text-[--color-hina] text-right">
                Janell M.
              </p>
            </div>
          </div>

          {/* Who are we? Section */}
          <div className="mt-6 pt-6 border-t border-platinum">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-2xl font-semibold text-preto text-center">
                Who are we?
              </h2>
              
              <div className="space-y-4">
                <p className="text-base md:text-base text-preto leading-relaxed">
                  Farfetch lets you shop the pieces you want, when you want, from anywhere around the world. We are for fashion lovers everywhere - fetching diverse fashion from afar to inspire your individuality.
                </p>
                
                <p className="text-base md:text-base text-preto leading-relaxed">
                  Our customers are at the heart of everything we do - that why when you shop with us you will find an unrivalled selection of styles that no one else can offer. From established powerhouse designers to emerging brands and boutiques, we only partner with the best to ensure you get the styles that matter to you.
                </p>
                
                <p className="text-base md:text-base text-preto leading-relaxed">
                  Our pricing is unique from everyone else. Depending on your shipping address and the price being set by our partner, the same piece may vary in price across different sizes. Although we do not have any control over price differences, you can always count on us to offer you the best price available to your destination at the time you place an order.
                </p>
                
                <p className="text-base md:text-base text-preto leading-relaxed">
                  Once you have made a decision, we will then take care of the legwork. We ship from our partners to over 190 countries worldwide, so you will receive your order in no time.
                </p>
              </div>
            </div>
          </div>

          {/* Got a burning question? Section */}
          <div className="mt-6 pt-6 border-t border-platinum">
            <div className="text-center space-y-4 py-8">
              <h2 className="text-2xl md:text-xl font-semibold text-preto">
                Got a burning question?
              </h2>
              <p className="text-base md:text-base text-preto leading-relaxed">
                Our friendly Customer Service team is always ready to help by{" "}
                <Link href="/contact-us" className="underline hover:opacity-70 transition">
                  phone
                </Link>
                {" "}or{" "}
                <Link href="/contact-us" className="underline hover:opacity-70 transition">
                  email
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Back to Top Button - Outside Template, Left Side */}
        <div className="mt-6 absolute ml-40">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-base text-preto hover:opacity-70 transition"
          >
            <div className="w-10 h-10 rounded-full   flex items-center justify-center">
              <HiArrowUp className="w-5 h-5 text-preto" />
            </div>
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarfetchPromise;

