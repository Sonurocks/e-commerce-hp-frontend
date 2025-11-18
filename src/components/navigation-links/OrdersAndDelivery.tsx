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

const sections: SupportSection[] = [
  {
    title: "DELIVERY INFORMATION",
    content: (
      <>
        <p className="mb-4">
          We can deliver your order every day of the week. Delivery costs vary
          by service, origin and destination. Express delivery is available for
          most destinations, and standard delivery is available for selected
          countries. All delivery options are displayed at checkout.
        </p>
        <p className="mb-4">
          Delivery to PO Boxes, Army Post Office (APO) and Fleet Post Office
          (FPO) addresses is currently unavailable.
        </p>
        <p className="mb-4">
          All FARFETCH orders are shipped with Direct Signature Required (DSR).
          This means that a signature is required upon delivery. Please track
          your order and make sure you&apos;re available to receive it. If
          you&apos;re not available, the carrier may attempt to re-deliver your
          order or redirect it to a collection point. If your order isn&apos;t
          collected within the carrier&apos;s timeframe, it will be returned to
          origin (RTO).
        </p>
        <p className="mb-4">
          For UK shipments, you can choose to waive the signature requirement
          during checkout. By selecting this option, you authorize the carrier
          to leave your package at your doorstep or a designated safe location
          without a signature. This helps save you hassle and ensures you
          receive your order promptly. Please note that by waiving the
          signature, you release Farfetch from liability for any loss or damage
          to your order after delivery.
        </p>
        <p className="mb-4">
          If you&apos;re placing your order from the locations below and
          it&apos;s above the following thresholds, we offer free standard
          delivery.
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
          <li>United Kingdom: GBP £400 (full price and sale)</li>
          <li>United States: USD $400 (full price and sale)</li>
          <li>China Mainland: CNY ¥1000 (full price and sale)</li>
          <li>Hong Kong SAR, Macau SAR: HKD $3000 (full price and sale)</li>
          <li>Taiwan Region: TWD $10000 (full price and sale)</li>
          <li>CIS countries: USD $430 (full price only)</li>
          <li>Spain, Italy, France: EUR €300 (full price and sale)</li>
        </ul>
        <p className="mb-4">
          If you&apos;re placing your order from the locations below and
          it&apos;s above the following threshold, we also offer a lower express
          delivery fee. In checkout, you&apos;ll see the lowest delivery price
          available for the items in your order.
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
          <li>United States: USD $200</li>
          <li>Australia: AUD $300</li>
          <li>China Mainland: CNY ¥1500</li>
          <li>Hong Kong SAR: HKD $2000</li>
          <li>Japan: JPY ¥28000</li>
          <li>Republic of Korea: KRW W280000</li>
          <li>Macau SAR: USD $150</li>
        </ul>
        <h2 className="text-sm font-semibold text-(--color-preto) mb-4 mt-6">
          Delivery times
        </h2>
        <p className="mb-4 font-medium">
          <strong>Express delivery for most of Europe and the US</strong> :
          delivered within 2-4 days. Rest of the world: delivered within 3-7
          days.
        </p>
        <p className="mb-4 font-medium">
          <strong>Standard delivery for selected countries</strong>: delivered
          within 2-6 days.
        </p>
        <p className="mb-4 font-medium">
          <strong>Fast Delivery is available in some countries</strong> : in
          some countries and for certain items. Delivery is in 1 to 2 business
          days, depending on when you place your order. This option will appear
          at checkout if it&apos;s available for your order.
        </p>
        <p className="mb-4 font-medium">
          Delivery times are based on the time your package is sent and should
          only be used as a guide. FARFETCH is not responsible for customs
          clearance delays or failed payments, but we&apos;ll do our best to
          minimize any delays.
        </p>
        <p className="font-medium">
          Depending on your location, our orders can be delivered by different
          couriers like <strong>DHL</strong>, <strong>UPS</strong>,{" "}
          <strong>FedEx</strong>, <strong>TNT</strong> or <strong>DPD</strong>.
        </p>
      </>
    ),
  },
  {
    title: "CANCELLATIONS",
    content: (
      <>
        <p className="mb-4">
          Changed your mind? No problem, you can either cancel your order by
          following the steps below or by contacting FARFETCH customer service.
          Your statutory rights in relation to cancellation/withdrawal (as set
          out in section 10 of the Terms and Conditions) are not affected.
        </p>

        <p className="mb-4 font-medium">
          <strong>How to cancel your order:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
          <li>
            Go to <strong>Orders & Returns</strong> if you have an account, or
            if you placed an order as a guest,{" "}
            <Link href="#" className="underline font-medium">
              enter your guest order details here
            </Link>
            .
          </li>
          <li>
            Select the items you want to cancel and your reason for cancellation
          </li>
          <li>We&apos;ll email you confirmation of your cancelled order</li>
        </ol>
        <p className="mb-4">
          If the self-service cancellation option is not available, please
          contact FARFETCH customer service.
        </p>
        <p className="mb-4">
          If you choose to cancel your order before it has been prepared for
          shipment (usually when the shipping label is printed), your order will
          not be sent out to you and you will receive a full refund, including
          any shipping costs.
        </p>
        <p className="mb-4">
          If you choose to cancel your order after it has been prepared for
          shipment (usually when the shipping label is printed), we offer a free
          return service.
        </p>
        <p className="mb-4">
          Once the returned products have been received and accepted, you will
          receive a full refund, including shipping costs.
        </p>
        <p className="mb-4">
          For more information on cancelling and returning orders, visit our{" "}
          <Link href="#" className="underline font-medium">
            Returns & Refunds Policy
          </Link>{" "}
          and section 10 of our{" "}
          <Link href="#" className="underline font-medium">
            Terms & Conditions
          </Link>
          .
        </p>
        <p className="mb-4">
          If you&apos;ve cancelled your order, you&apos;ll receive a full refund
          within 14 days, depending on your payment provider.
        </p>
        <p className="mb-4 font-medium">
          <strong>Made-to-order and customised items</strong>
        </p>
        <p>
          Made-to-order and customised items can only be cancelled within 48
          hours of placing your order. All you need to do is follow the steps
          above in your account or contact FARFETCH customer service.
        </p>
      </>
    ),
  },
  {
    title: "DUTIES AND TAXES",
    content: (
      <>
        <p className="mb-4">
          If you&apos;re in any of the locations below, we include the cost of
          duties and taxes in your order. The price you see at checkout is the
          price you pay and there are no additional delivery fees.
        </p>
        <p className="mb-4">
          EU (excluding the Canary Islands), United Kingdom, United States,
          Canada, China Mainland, Australia, New Zealand, Puerto Rico,
          Switzerland, Singapore, Republic Of Korea, Kuwait, Mexico, Qatar,
          India, Norway, Saudi Arabia, Taiwan Region, Thailand, United Arab
          Emirates, Japan, Brazil, Isle of Man, San Marino, Colombia, Chile,
          Argentina, Egypt, Lebanon, Hong Kong SAR and Bahrain.
        </p>
        <p className="mb-4">
          When ordering from within your own region, import duties do not apply.
          However, you may be required to pay VAT or local sales taxes. For
          customers in the UK, Canada, and the US, domestic taxes are determined
          and presented separately during the checkout process.
        </p>
        <p className="mb-4">
          If a Delivery At Place (DAP) destination is selected, the price you
          pay at checkout will exclude import duties and sales taxes. Instead,
          you&apos;ll need to pay these directly to our courier to release your
          order from customs. As we&apos;re unable to advise the exact amount,
          we recommend contacting your local customs office or tax authority
          before placing a Delivery At Place (DAP) order. Should an order be
          seized/abandoned due to certain circumstances, neither Farfetch nor
          the Partners are able to retrieve the order and you may not be
          refunded for your purchase. These circumstances include, but are not
          limited to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
          <li>
            <strong>Failure to Provide Required Customs Documents:</strong> If
            the order is seized and cannot be recovered because you did not
            supply the necessary customs documents upon request and within a
            reasonable timeframe.
          </li>
          <li>
            <strong>Refusal to Pay Customs Duties:</strong> If the order is
            seized and cannot be recovered because you declined to pay the
            applicable customs duties.
          </li>
          <li>
            <strong>Unreachable Customer:</strong> If the order is seized and
            cannot be recovered because attempts to deliver were unsuccessful,
            and you were unreachable.
          </li>
        </ul>
        <p className="mb-2 font-medium">
          <strong>Delivery to US</strong>
        </p>
        <p className="mb-4">
          If you&apos;re a US customer ordering from one of our international
          brands or partner boutiques, US Customs may ask for your IRS, EIN or
          SSN number before authorising delivery to your address. Don&apos;t
          worry — you&apos;ll usually have one week to provide this information
          before your order is returned to its original location for a refund.
        </p>
        <p>
          Need more information?{" "}
          <Link href="#" className="underline font-medium">
            View our Terms &amp; Conditions
          </Link>
        </p>
      </>
    ),
  },
  {
    title: "TRACKING YOUR ORDER",
    content: (
      <>
        <p className="mb-4 font-medium">
          After you&apos;ve placed an order, we&apos;ll email you with all the
          details. Our brands and partner boutiques have 2 business days to
          process your order. Once your order is sent, you&apos;ll receive an
          email with the tracking number. You can also track your order by
          heading to <strong>Orders & Returns</strong> in your account. If
          you&apos;ve placed an order as a guest and want to track your order,{" "}
          <Link href="#" className="underline font-medium">
            enter your guest order details here
          </Link>
        </p>
        {/* <p className="mb-4">
          You can also track your order by heading to <strong>Orders & Returns</strong> in your account. If you&apos;ve placed an order as a guest and want to track your order, <Link href="#" className="underline font-semibold">enter your guest order details here</Link>.
        </p> */}
        <p className="mb-4">
          Depending on your location and selected delivery method, it can take 2
          – 7 business days for your package to arrive. We always aim to deliver
          your package within the time specified, but sometimes there may be
          delays due to customs clearance or failed payments.
        </p>
        <p>
          If you&apos;ve shopped items from multiple locations, you may receive
          more than one package.
        </p>
      </>
    ),
  },
  {
    title: "MADE-TO-ORDER ITEMS",
    content: (
      <>
        <p className="mb-4 font-medium">
          Due to the nature of made-to-order items, manufacturing lead times may
          vary as your item is created specifically for you. For more
          information on manufacturing times, visit the product information
          page.
        </p>
      </>
    ),
  },
];

const navigationLinks: SupportNavLink[] = [
  { href: "#", label: " HOLIDAY DATES YOU WANT TO KNOW ABOUT" },
  { href: "/contact-us", label: "Contact us" },
  { href: "#", label: "How to shop" },
  { href: "/orders-and-delivery", label: "Orders and delivery" },
  { href: "/payment-and-pricing", label: "Payment and pricing" },
  { href: "/cryptocurrency-payments", label: "Cryptocurrency Payments" },
  { href: "/returns-and-refunds", label: "Returns and refunds" },
  { href: "/faq", label: "FAQs" },
  { href: "#", label: "Terms and conditions" },
  { href: "#", label: "Privacy policy" },
  { href: "#", label: "Modern slavery statement" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "#", label: "Cookie preferences" },
  {
    href: "/promotions-terms-and-conditions",
    label: "Promotions terms & conditions",
  },
];

const OrdersAndDelivery = () => {
  const pathname = usePathname();
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  const toggleSection = useCallback((index: number) => {
    setOpenSectionIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleFeedbackChange = useCallback((value: boolean) => {
    setFeedbackHelpful(value);
  }, []);

  const renderedSections = useMemo(
    () =>
      sections.map((section, sectionIndex) => (
        <AccordionSection
          key={section.title}
          section={section}
          index={sectionIndex}
          isOpen={openSectionIndex === sectionIndex}
          onToggle={toggleSection}
          containerClassName="border-b border-gray-200"
          buttonClassName="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors "
          contentClassName="pb-4 px-4"
          titleClassName="font-light text-sm text-(--color-preto) uppercase tracking-wide"
        />
      )),
    [openSectionIndex, toggleSection],
  );

  return (
    <div
      className="min-h-screen bg-white text-(--color-preto)"
      style={supportPageStyles}
    >
      <div className="max-w-[137rem] mx-auto px-[1.5rem] py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          {/* Left Navigation Menu */}
          <aside className="lg:w-78 flex-shrink-0">
            <SupportNavigation links={navigationLinks} activePath={pathname} />
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 max-w-4xl lg:ml-12">
            {/* Title */}
            <h1 className="text-3xl md:text-2xl font-thin mb-8 text-(--color-preto)">
              Orders and delivery
            </h1>

            {/* Expandable Sections */}
            <div className="space-y-0 ">{renderedSections}</div>

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

export default OrdersAndDelivery;
