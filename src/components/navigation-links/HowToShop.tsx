"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import AccordionSection from "@/components/support/AccordionSection";
import FeedbackPrompt from "@/components/support/FeedbackPrompt";
import { SupportSection } from "@/types/support";
import { supportNavigationLinks } from "@/constants/supportNavigationLinks";

const sections: SupportSection[] = [
  {
    title: "ABOUT US",
    content: (
      <>
        <p className="mb-4">
          Welcome to FARFETCH, your destination for discovering the world&apos;s most
          curated selection of luxury fashion. We connect you with over 1,400
          boutiques and brands from around the globe, bringing you unique pieces
          that reflect your individual style.
        </p>
        <p className="mb-4">
          At FARFETCH, we believe that fashion should be accessible, inspiring, and
          personal. Whether you&apos;re looking for the latest runway pieces,
          timeless classics, or emerging designer collections, we&apos;ve got
          something special waiting for you.
        </p>
        <p className="mb-4">
          Our platform offers a seamless shopping experience, with detailed product
          information, high-quality imagery, and expert styling advice to help you
          make the perfect choice. Every item is carefully curated by our team to
          ensure quality and authenticity.
        </p>
        <p>
          Shop with confidence knowing that each purchase is backed by our
          commitment to exceptional customer service, secure payment processing, and
          reliable worldwide delivery.
        </p>
      </>
    ),
  },
  {
    title: "HOW TO FIND ITEMS",
    content: (
      <>
        <p className="mb-4">
          Finding your perfect piece on FARFETCH is easy. Here are several ways to
          discover what you&apos;re looking for:
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Browse by Category
        </h2>
        <p className="mb-4">
          Use our main navigation menu to explore different categories such as
          Womenswear, Menswear, and Kidswear. Each category is further organized
          into sections like New In, Sale, Brands, and more to help you find
          exactly what you need.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Search Functionality
        </h2>
        <p className="mb-4">
          Use the search bar at the top of the page to find specific items, brands,
          or styles. Simply type what you&apos;re looking for and browse through
          the results. Our search is designed to understand your intent and show
          you the most relevant products.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Filter and Sort
        </h2>
        <p className="mb-4">
          Once you&apos;re in a category or search results, use our filters to
          narrow down your options by size, color, price, brand, and more. You can
          also sort items by price, newest arrivals, or popularity to find exactly
          what suits your preferences.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Featured Collections
        </h2>
        <p className="mb-4">
          Explore our curated collections and editorial features on the homepage.
          These handpicked selections showcase trending styles, seasonal must-haves,
          and unique pieces that our team has carefully selected for you.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Brand Pages
        </h2>
        <p>
          Visit individual brand pages to see their complete collection. You can
          access brand pages through the navigation menu or by clicking on any brand
          name throughout the site.
        </p>
      </>
    ),
  },
  {
    title: "HOW TO ORDER AND PAY",
    content: (
      <>
        <p className="mb-4">
          Placing an order on FARFETCH is simple and secure. Follow these steps to
          complete your purchase:
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Step 1: Add Items to Your Bag
        </h2>
        <p className="mb-4">
          Browse our selection and click &quot;Add To Bag&quot; on any item you
          want to purchase. You can continue shopping and add multiple items to your
          bag before proceeding to checkout.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Step 2: Review Your Bag
        </h2>
        <p className="mb-4">
          Click on the bag icon in the header to review your selected items. Here
          you can adjust quantities, remove items, or save items to your wishlist
          for later. Make sure all sizes and quantities are correct before
          proceeding.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Step 3: Proceed to Checkout
        </h2>
        <p className="mb-4">
          When you&apos;re ready, click &quot;Checkout&quot; or &quot;Proceed to
          Checkout&quot;. You can sign in to your account for faster checkout, or
          continue as a guest. If you don&apos;t have an account, you can create
          one during checkout.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Step 4: Enter Delivery Details
        </h2>
        <p className="mb-4">
          Enter your shipping address. We deliver worldwide, and you can choose from
          various delivery options including standard and express shipping. Delivery
          costs and estimated delivery times will be displayed at checkout.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Step 5: Select Payment Method
        </h2>
        <p className="mb-4">
          Choose your preferred payment method. We accept major credit cards,
          debit cards, PayPal, and other secure payment options. All payments are
          processed securely through encrypted connections.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Step 6: Review and Confirm
        </h2>
        <p className="mb-4">
          Review your order summary, including items, quantities, delivery address,
          and total cost. Once you&apos;re satisfied, click &quot;Place Order&quot;
          to confirm your purchase.
        </p>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-2 mt-4">
          Order Confirmation
        </h2>
        <p className="mb-4">
          After placing your order, you&apos;ll receive an email confirmation with
          your order details and tracking information. You can also track your order
          status in your account or by using the tracking link provided in your
          confirmation email.
        </p>
        <p>
          If you have any questions or need assistance during the ordering process,
          our Customer Service team is available to help. You can contact us through
          the Contact Us page or by email.
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
    <div className="min-h-screen text-(--color-preto)">
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
              buttonClassName="px-6 py-2 text-sm font-semibold border border-(--color-preto) transition-colors"
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

