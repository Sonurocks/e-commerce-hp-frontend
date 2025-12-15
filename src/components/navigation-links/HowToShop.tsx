"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import AccordionSection from "@/components/support/AccordionSection";
import FeedbackPrompt from "@/components/support/FeedbackPrompt";
import { SupportSection } from "@/types/support";
import { supportNavigationLinks } from "@/constants/supportNavigationLinks";
import { supportPageStyles } from "@/constants/supportPageStyles";

const sections: SupportSection[] = [
  {
    title: "ABOUT US",
    content: (
      <>
        <p className="mb-4 font-base">
          When you shop at FARFETCH, you&apos;re shopping items from luxury brands and boutiques around the globe.
        </p>
        <p>
          Our brand and partner boutiques are located worldwide, and our unique marketplace guarantees you a huge range of items to shop. From established luxury brands to the most interesting new designers, shop unique styles you won&apos;t find anywhere else. We deliver to over 190 countries worldwide so you&apos;ll receive your order before you know it.
        </p>
      </>
    ),
  },
  {
    title: "HOW TO FIND ITEMS",
    content: (
      <>
        <p>
          The easiest way is to browse using the drop-down navigation menus at the top of the page, where you can find links to new items, brands, categories and edits. If you know what you are looking for, use the search box at the top right.
        </p>
      </>
    ),
  },
  {
    title: "HOW TO ORDER AND PAY",
    content: (
      <>
        <p className="mb-4">
          Once you&apos;ve found what you&apos;re looking for, select your size and click Add To Bag. You can continue shopping and add more items to your bag, or proceed straight to checkout.
        </p>
        <p className="mb-4">
          Our checkout process is quick and straightforward. You can either create an account or proceed using our guest checkout. No matter how many items you have in your shopping bag or how many FARFETCH brands or partner boutiques they are sourced from, you only need to check out once.
        </p>
        <p className="mb-4">
          We ship worldwide via DHL, with services from UPS in selected countries. Please choose your delivery preference for each FARFETCH brand or partner boutique, then proceed to payment and select your payment method. We accept all major credit and debit cards, as well as PayPal, Klarna, Afterpay and selected cryptocurrencies. For a full list of payment methods, go to{" "}
          <Link href="/payment-pricing" className="underline">
            Payment &amp; Pricing
          </Link>
        </p>
        <p>
          Once you have placed your order, you will receive a confirmation email. Your order will then be sent directly to you.
        </p>
      </>
    ),
  },
];

const HowToShop = () => {
  const pathname = usePathname();
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const handleToggle = useCallback(
    (index: number) => {
      setOpenSections((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    [],
  );

  const handleFeedbackChange = useCallback((value: boolean) => {
    setFeedbackHelpful(value);
  }, []);

  const renderedSections = useMemo(
    () =>
      sections.map((section, index) => (
        <AccordionSection
          key={section.title}
          section={section}
          index={index}
          isOpen={openSections.has(index)}
          onToggle={handleToggle}
          containerClassName="border-b border-gray-200"
          buttonClassName="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          contentClassName="pb-4 px-4"
          titleClassName="font-light text-sm text-(--color-preto) uppercase tracking-wide"
        />
      )),
    [openSections, handleToggle],
  );

  return (
    <div
      className="min-h-screen text-(--color-preto)"
      style={supportPageStyles}
    >
      <div className="max-w-548 mx-auto px-[1.5rem] py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          <aside className="lg:w-72 shrink-0">
            <nav>
              <ul className="space-y-2">
                {supportNavigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`block py-1 text-sm font-thin underline hover:no-underline transition ${
                        pathname === link.href
                          ? "font-thin text-(--color-preto)"
                          : "text-(--color-preto)"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="flex-1 max-w-4xl lg:ml-12">
            {/* Title */}
            <h1 className="text-3xl font-normal mb-8 text-(--color-preto)">
              How to shop
            </h1>

            {/* Expandable Sections */}
            <div className="space-y-0">{renderedSections}</div>

            {/* Feedback Section */}
            <FeedbackPrompt
              helpfulValue={feedbackHelpful}
              onFeedbackChange={handleFeedbackChange}
              containerClassName="mt-13 pt-8"
              titleClassName="text-xs font-base text-(--color-preto) mb-2"
              buttonClassName="px-6 py-2 text-sm font-semibold border border-(--color-preto) transition-colors rounded-lg"
              activeButtonClassName="bg-(--color-preto) text-white"
              inactiveButtonClassName="bg-white text-(--color-preto) hover:bg-gray-50"
            />
          </main>
        </div>

        {/* Download App Banner Section - Full Width */}
        <div className="w-full lg:pl-8 mt-4">
          <div className="w-full lg:ml-4">
            <DownloadAppBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToShop;

