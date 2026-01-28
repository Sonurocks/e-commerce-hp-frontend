"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import SupportNavigation from "@/components/support/SupportNavigation";
import AccordionSection from "@/components/support/AccordionSection";
import FeedbackPrompt from "@/components/support/FeedbackPrompt";
import { SupportNavLink, SupportSection } from "@/types/support";
import { supportPageStyles } from "@/constants/supportPageStyles";

const navigationLinks: SupportNavLink[] = [
  { href: "#", label: "HOLIDAY DATES YOU'LL WANT TO KNOW ABOUT" },
  { href: "/contact-us", label: "Contact us" },
  { href: "#", label: "How to shop" },
  { href: "/orders-and-delivery", label: "Orders and delivery" },
  { href: "/payment-and-pricing", label: "Payment and pricing" },
  { href: "/cryptocurrency-payments", label: "Cryptocurrency Payments" },
  { href: "/returns-and-refunds", label: "Returns and refunds" },
  { href: "/faq", label: "FAQs" },
  { href: "#", label: "Terms and conditions" },
  { href: "#", label: "Privacy policy" },
  { href: "/modern-slavery-statement", label: "Modern slavery statement" },
  { href: "#", label: "Accessibility" },
  { href: "#", label: "Cookie preferences" },
  {
    href: "/promotions-terms-and-conditions",
    label: "Promotions terms & conditions",
  },
];

const promotionSections: SupportSection[] = [
  {
    title: "APPLICABLE FOR ALL PROMOTIONS AND PROMO CODE USAGE*",
    content: (
      <>
        <p>
          Valid on selected brands and items only. Valid for a limited time
          only. Available in selected countries only. FARFETCH reserves the
          right to withdraw or amend this promotion at any time. Promotion valid
          on each individual item totalling over USD $145 / EUR €125 / GBP £100
          / CNY ¥1,000 / HKD $1,200 / NTD $5,000 / RUB 10,000 / DKK kr.900 / BRL
          R$800 / CAD $185 / AUD $190 / JPY ¥16,000 / KRW ₩170,000 / CHF 140 /
          SGD $195 / MXD 2,500 / PLN 480 / SEK 1,100kr / AED 550 / QAR 550 / SAR
          550 / COP 650000 / CLP 150000. Any promotional discount or promotional
          code is non-transferable and has no cash alternative. Any purchase
          under this promotion is also governed by our general{" "}
          <Link href="#" className="underline">
            Terms and Conditions
          </Link>
          . The promotion cannot be applied to certain products or brands.
        </p>
        <p className="mt-4">
          US Free Shipping promotion valid on each individual item totalling
          over USD $0
        </p>
        <p className="mt-4">
          <strong>Auto-apply:</strong> The promotion will be automatically
          applied at checkout. Minimum spend applies — the amount must be spent
          in a single transaction.
        </p>
        <p className="mt-2">
          <strong>Manual code:</strong> Manually enter the promotional code at
          checkout. Minimum spend applies — the amount must be spent in a single
          transaction.
        </p>
        <p className="mt-2">
          <strong>Expired promotional discounts:</strong> Our Customer Service
          team are unable to reactivate expired promotional discounts.
        </p>
        <p className="mt-4">
          To continuously improve our services and provide the best possible
          shopping experience, we may run promotional tests where different
          customers see different offers or free shipping options. These tests
          help us evaluate the effectiveness of various promotions.
        </p>
        <p className="mt-4">
          Offers shown as part of this testing, including free shipping, or
          other promotions, are randomly assigned to different users, based on
          objective testing criteria and do not indicate eligibility or
          ineligibility for future promotions.
        </p>
      </>
    ),
  },
  {
    title: "FREE SHIPPING ON SELECTED FULL-PRICE AND SALE ITEMS",
    content: (
      <>
        <div className="space-y-2">
          <p>
            - Free delivery is available on the lowest-price delivery option.
          </p>
          <p>
            - This promotion can&apos;t be used with any other FARFETCH delivery
            offer.
          </p>
          <p>
            - The free shipping offer will be automatically applied at checkout.
            Free shipping will not be applied to exempt items.
          </p>
          <p>
            - This promotion can be used with other discounts when eligible.
            Monetary value offers will be applied first.
          </p>
          <p>
            - Free delivery is eligible on selected full-price and sale items
            totalling over USD $145 (all markets buying in $ except US) / EUR
            €125 / GBP £100.00 / CNY ¥1,000 / HKD $1,200 / NTD $5,000 / RUB
            10,000 / DKK kr.900 / BRL R$800.00 / CAD $185 / AUD $190 / JPY
            ¥16,000 / KRW ₩170,000 / CHF 140 / SGD $195 / MXN 2,500 / PLN 480 /
            SEK 1,100kr / AED 550.00 / QAR 550.00 / SAR 550.00 / COP 650,000 /
            CLP 150,000 / 45 KWD.
          </p>
          <p>
            - This promotion is available from 13 November 2025 08:00 GMT to 02
            December 2025 22:00 GMT. FARFETCH reserves the right to withdraw or
            amend this promotion at any time.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "CREDIT MADE AVAILABLE BY FARFETCH",
    content: (
      <>
        <p>
          From time to time, FARFETCH, in our sole discretion, may make credit
          available to you in connection with transactions on FARFETCH. Such
          credit has an expiry date of 1 year (subject to our discretion to
          withdraw) starting from the date FARFETCH makes such credit available.
          Any credit made available by FARFETCH will be visible in your FARFETCH
          account. The credit made available to you by FARFETCH may include
          Reward credit, Goodwill credit, or FARFETCH credit. Any credits made
          available by FARFETCH are for loyalty, award or promotional purposes
          only. FARFETCH does not charge fees for credits.
        </p>
        <p className="mt-4">
          Once it has been made available, the credit will be automatically
          applied toward your next purchase on FARFETCH, in chronological order
          of the expiry date. This means that the credit that expires first will
          be applied first. However, any existing Refunds in your FARFETCH
          account will be automatically applied first before any credit, even if
          the expiry date of the Refund(s) falls after the expiry date of any of
          the credit(s) - this is not applicable to you if you are located in
          Japan, South Korea, Taiwan, Hong Kong, Macau, Australia, or India.
        </p>
        <p className="mt-4">
          All credits made available by FARFETCH shall be subject to the terms
          set out below as well as our full Terms and Conditions, including the
          additional terms on Reward Credit (see here)
        </p>
        <div className="space-y-2 mt-4 text-sm">
          <p>
            i. Credit is not issued in return for any payment made by you and
            cannot be exchanged for cash or, redeemed for anything other than
            products on FARFETCH.
          </p>
          <p>
            ii. Credit is personal to each customer and cannot be transferred.
          </p>
          <p>
            iii. If you return an item where credit made available by FARFETCH
            was applied to the order, the equivalent value of credit applied
            will be made available in your FARFETCH account. For partial
            returns, any credit applied to the order will be refunded first, in
            chronological order of expiry date, with the remaining refunded
            amount (if any) then also being refunded to your original payment
            method.
          </p>
          <p>
            iv. Notwithstanding sub-section iii above, if you request a return
            or a cancellation of an item in respect of which Reward credit was
            made, or was going to be made, available to you, upon requesting the
            return or cancellation, the equivalent value of the Reward credit
            will be deducted from the total value of any type of credit FARFETCH
            has made available to you, as shown in your FARFETCH account. More
            information is set out in sub-section ix below. For the avoidance of
            doubt, where you select to receive a Refund to your FARFETCH account
            for any purchase you made that involved the use of credit, any
            credit applied to the order being returned will be refunded as
            credit in accordance with these terms, and will not be refunded as
            Refund to your FARFETCH account - this is not applicable to you if
            you are located in Japan, South Korea, Taiwan, Hong Kong, Macau,
            Australia, or India.
          </p>
          <p>
            v. FARFETCH reserves the right to cancel any credit visible in an
            account linked to you at its discretion where we reasonably suspect
            misuse of credits or fraudulent activity in connection with
            purchases or returns.
          </p>
          <p>
            vi. Notwithstanding the foregoing, any credits made available by
            FARFETCH will be forfeited at the time of closure of your FARFETCH
            account.
          </p>
        </div>
        <p className="mt-4 font-semibold text-sm">Reward credit</p>
        <div className="space-y-2 mt-2 text-sm">
          <p>
            vii. Reward credit will be made available in your FARFETCH account
            30 days after the order of the eligible item was placed. If you are
            a Silver, Gold, Platinum, or a Private Client member, the Reward
            credit will be made available within a few hours of the purchase of
            the eligible item. The availability and value of the Reward credit
            on eligible items varies by product, country of purchase and method
            of payment. Reward credit will not be made available where a
            purchase is made using Boleto, Crypto or Volt.
          </p>
          <p>
            viii. As with other credit made available by FARFETCH, Reward credit
            will be automatically applied by FARFETCH toward your next purchase
            on FARFETCH, in chronological order of expiry date. However, any
            existing Refunds in your FARFETCH account will be applied first
            (before any credit), even if the expiry date of the Refund(s) falls
            after the expiry date of any of the credit(s) - this is not
            applicable to you if you are located in Japan, South Korea, Taiwan,
            Hong Kong, Macau, Australia, or India.
          </p>
          <p>
            ix. If you request a return or a cancellation of an item in respect
            of which Reward credit was made, or was going to be made, available
            to you, upon requesting the return or cancellation, the equivalent
            value of the Reward credit will be deducted from the total value of
            any type of credit FARFETCH has made available to you, as shown in
            your FARFETCH account. This also applies if the value of the Reward
            credit has already been applied to a new purchase. If you are a
            Bronze member, upon requesting the return or cancellation, the
            equivalent value of the Reward credit shown as ‘Pending’ in the
            Credits and Refunds page will no longer be made available to you.
          </p>
        </div>
        <p className="mt-4">
          Please note that this section does not apply to FARFETCH Second Life,
          and terms for FARFETCH Second Life can be found here.
        </p>
      </>
    ),
  },
];

const PromotionsTermsAndConditions = () => {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  const toggleSection = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleFeedbackChange = useCallback((value: boolean) => {
    setFeedbackHelpful(value);
  }, []);

  const renderedSections = useMemo(
    () =>
      promotionSections.map((section, index) => (
        <AccordionSection
          key={section.title}
          section={section}
          index={index}
          isOpen={openIndex === index}
          onToggle={toggleSection}
          containerClassName="border-b border-gray-200"
          buttonClassName="w-full py-5 flex items-center justify-between text-left  transition-colors"
          contentClassName="pb-6 px-4 text-sm font-thin text-preto leading-relaxed space-y-2"
        />
      )),
    [openIndex, toggleSection],
  );

  return (
    <div
      className="min-h-screen  text-preto"
      style={supportPageStyles}
    >
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-12 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          <aside className="lg:w-90 flex-shrink-0">
            <SupportNavigation links={navigationLinks} activePath={pathname} />
          </aside>

          <main className="flex-1 max-w-4xl lg:ml-12">
            <h1 className="text-3xl md:text-2xl font-thin mb-15 text-preto">
              Promotions terms and conditions
            </h1>

            <div className="border-t border-gray-200">{renderedSections}</div>

            <FeedbackPrompt
              helpfulValue={feedbackHelpful}
              onFeedbackChange={handleFeedbackChange}
              containerClassName="mt-12 pt-8"
              buttonClassName="px-6 py-2 text-sm font-semibold rounded-lg border border-preto transition-colors"
              activeButtonClassName="bg-preto text-white"
              inactiveButtonClassName="text-preto hover:bg-gray-50"
            />
          </main>
        </div>

        <div className="w-full lg:pl-8 mt-8">
          <div className="w-full lg:ml-4">
            <DownloadAppBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsTermsAndConditions;
