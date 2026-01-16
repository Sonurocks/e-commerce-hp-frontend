"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import SupportNavigation from "@/components/support/SupportNavigation";
import AccordionSection from "@/components/support/AccordionSection";
import FeedbackPrompt from "@/components/support/FeedbackPrompt";
import { SupportNavLink, SupportSection } from "@/types/support";
import { useLanguage } from "@/context/LanguageContext";

const getSections = (translate: (text: string) => string): SupportSection[] => [
  {
    title: "RETURNS POLICY",
    content: (
      <>
        <p className="mb-4 font-medium">
          <strong>
            {" "}
            We accept returns within 30 days, starting from the day your order
            was delivered.
          </strong>
        </p>
        <p className="mb-2">
          Returned items must comply with our returns policy:
        </p>
        <ul className="list-disc list-inside space-y-3 ml-4 mb-6">
          <li>
            Items must be returned unworn, undamaged and unused, with all tags
            attached and the original packaging included.
          </li>
          <li>
            Final sale items cannot be returned unless the item arrives damaged
            or faulty when delivered to you.
          </li>
          <li>
            Footwear and accessories must be returned with the original branded
            boxes and dust bags, where provided, and placed inside a protective
            box when returned.
          </li>
          <li>
            When trying on footwear, please do not mark the soles or damage the
            shoe box.
          </li>
          <li>
            If an item has a FARFETCH security tag or brand tag attached, it
            must be returned with the tag in its original position.
          </li>
          <li>
            Hosiery, lingerie and swimwear items must be returned with the
            hygiene seals attached and in unopened and undamaged packaging,
            where applicable.
          </li>
          <li>
            Lingerie and swimwear must only be tried on over your own
            undergarments. We will not accept any returns that have been worn or
            are soiled.
          </li>
          <li>
            Due to the nature of face masks, we will not be able to accept
            returns unless the item is damaged or faulty when delivered to you.
          </li>
          <li>
            Jewellery must be returned in the same condition it arrived in,
            including all branded packaging and documents provided with it.
          </li>
          <li>
            Made-to-order items cannot be returned as they have been created to
            your specification unless the item arrives damaged or faulty when
            delivered to you.
          </li>
        </ul>
        <p className="mb-3">
          Please be careful when trying on your purchases and return them in the
          same condition you received them. Any returns that do not meet our
          policy will not be accepted.
        </p>
        <p className="mb-3">
          Customers are liable for any returns made at their own expense, which
          do not use our standard return service. If returning from a country
          different from the country in which the order was received, customers
          must bear the return costs and be liable for the return. This excludes
          orders in which an incorrect item was received or was damaged, or
          faulty.
        </p>
        <p className="mb-3">
          To create a better shopping experience for our customers, we offer a
          flexible returns policy. We monitor the number of returns and reserve
          the right to close your FARFETCH account or restrict future orders if
          your return behaviour is in breach of our Returns Policy.{" "}
          <Link href="#" className="underline">
            Read our Terms & Conditions here
          </Link>
          .
        </p>
        <p className="mb-3 font-medium">
          <strong>
            Cancelling an order under the Consumer Contracts Regulation
          </strong>
        </p>
        <p className="mb-3">
          Depending on where you live, you can also choose to cancel your order
          under the Consumer Contracts (Information, Cancellation and Additional
          Charges) 2013 Regulations (CCRs). If you would like to cancel your
          order, you must notify us of your wish to cancel within 14 days from
          the date your order arrived using one of the methods set out below. If
          you choose to cancel your order (or part of your order) before it has
          been prepared for shipment (usually when the shipping label is
          printed), the items will not be sent out to you and you will receive a
          full refund, including shipping costs. If you choose to cancel your
          order (or part of your order) after it has been prepared for shipment
          (usually when the shipping label is printed), the items will need to
          be returned. Once the returned products have been received and
          accepted, you will receive a full refund, including shipping costs.
          Your statutory rights in relation to cancellation/withdrawal (as set
          out in section 10 of the Terms and Conditions) are not affected. Once
          you notify us, you will be responsible for the cost and arrangement of
          returning the items to the FARFETCH brand or partner boutique you
          ordered from.
        </p>
        <p className="mb-3">
          For more information on cancelling an order under the Consumer
          Contracts Regulation (CCRs), view section 10 of our Terms &
          Conditions.
        </p>
        <p className="mb-3 font-medium">
          <strong>
            {" "}
            To cancel a contract, you must inform us, preferably:
          </strong>
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>
            By telephone, giving us your name, address and order reference;
          </li>
          <li>
            By email at{" "}
            <Link
              href="mailto:customerservice@farfetch.com"
              className="underline"
            >
              {translate("customerservice@farfetch.com")}
            </Link>{" "}
            quoting your name, address and order reference; or
          </li>
          <li>
            By completing and returning the cancellation form to the address
            specified in the form.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "HOW TO RETURN",
    content: (
      <>
        <p className="mb-4">
          As part of our commitment to reducing our environmental impact, our
          return instructions are paper free. This benefits our customers, our
          people and our planet.
        </p>
        <p className="mb-4">
          When returning your items, please include any accessories, branded
          boxes or cases that came with your order, in the reusable FARFETCH
          packaging. If anything is damaged or missing from your return, you may
          not receive your refund.
        </p>
        <p className="mb-4">
          Whether you arrange a collection or drop off your return, you&apos;ll
          need to do this from the country or region you ordered to.
        </p>
        <p className="mb-3 font-medium">
          <strong>Here&apos;s what you need to do:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
          <li>
            Go to <strong>Orders & Returns</strong> if you have an account. If
            you placed your order as a guest,{" "}
            <Link href="#" className="underline">
              enter your guest order details here
            </Link>
          </li>
          <li>
            Find the order you want to return and click{" "}
            <strong>Return Item(s)</strong>
          </li>
          <li>Select each item and your reason for returning</li>
        </ol>
        <p className="mb-3 font-medium">
          <strong>
            There are two ways to return your items. Depending on your location,
            one will always be available.
          </strong>
        </p>
        <div className="space-y-4 mb-4">
          <div>
            <p className="font-medium mb-1">
              <strong>1. Book a free returns collection</strong>
            </p>
            <p>
              Select your collection address and number of packages, schedule a
              collection date, suitable time and click{" "}
              <strong>Book Collection</strong>
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">
              <strong>2. Return for free at a drop-off point near you</strong>
            </p>
            <p>
              Select the in-store or drop-off option in your account and take
              the return to your chosen FARFETCH partner boutique or courier
              drop-off point
            </p>
          </div>
        </div>
        <p className="mb-3 font-medium">
          <strong>Prepare your return</strong>
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
          <li>
            Place the item inside the FARFETCH packaging — don&apos;t forget any
            brand boxes, dust bags, or cases
          </li>
          <li>
            Attach your Return Label to the outside of the FARFETCH packaging
          </li>
          <li>
            If you received a Return Note with your order, attach it to the
            outside of your package
          </li>
          <li>
            Give the Waybill Doc to the courier. Make a note of the Waybill
            Number to track your return
          </li>
          <li>
            When your package is collected or dropped off, make sure you ask the
            courier to scan the label so you can track your return
          </li>
        </ol>
        <p className="mb-4 font-medium">
          <strong>
            {" "}
            Need to reschedule your return collection? You can do this by
            heading to Orders & Returns in your account.
          </strong>
        </p>
        <p className="mb-4">
          Returns from different brands or partner boutiques received
          individually should be packaged separately and the correct Return
          Label attached to the outside of each FARFETCH package.
        </p>
        <p className="mb-4">
          All the documents you need to return your item should be included in
          your FARFETCH package. If you need to reprint them, head to{" "}
          <strong>Orders & Returns</strong> in your account, or if you placed an
          order as a guest,{" "}
          <Link href="#" className="underline">
            enter your guest order details here
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    title: "REFUNDS",
    content: (
      <>
        <p className="mb-4">
          Once your return has been received by our brand or partner boutique,
          it can take up to 6 calendar days to process. If your return has been
          accepted, your refund will be processed to the original method of
          payment used to place your order, excluding any delivery costs. Where
          applicable refunds can take up to 14 days to show in your account,
          depending on your payment provider.
        </p>
        <p className="mb-4 font-medium">
          To track the return of your package, use the Waybill Number from the{" "}
          <strong>Waybill Doc</strong> included in your order. Or check the
          status of your return by going to <strong>Orders & Returns</strong> in
          your account. If you placed your order as a guest and want to track
          your return,{" "}
          <Link href="#" className="underline">
            enter your guest order details here
          </Link>
          .
        </p>
        <p className="mb-3 font-medium">
          <strong>Refund to your FARFETCH account</strong>
        </p>
        <p className="mb-3 text-sm">
          Note: this section is not applicable to you if you are located in
          Japan, South Korea, Taiwan, Hong Kong, Macau, Australia or India.
        </p>
        <p className="mb-3">
          To improve your shopping experience with us, when you request a return
          through your FARFETCH account, you may have the option to select to
          receive a refund to your FARFETCH account for use on your next
          purchase on FARFETCH. The refund amount visible in your FARFETCH
          account will automatically be applied to your next purchase on the
          Website, subject to an expiry date of 5 years starting from the date
          your return is accepted (see rules on expiry date below).
        </p>
        <p className="mb-3">
          FARFETCH is authorised (as an agent on behalf of our Partners) to
          offer you the option to receive your refund to your FARFETCH account.
          If you select this option, and your return is accepted by the Partner,
          FARFETCH (acting in accordance with its authorisations of its
          Partners) will apply this to your next purchase on the Website. By
          selecting to receive your refund to your FARFETCH account, you
          acknowledge that you have exchanged your right to receive a refund
          from the Partner.
        </p>
        <p className="mb-3 font-medium">
          <strong>Please note that:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>
            Refund to your FARFETCH account will expire 5 years from the date
            the return is accepted, as shown in your FARFETCH account. If you do
            not place an order before the specified expiry date, the refund
            amount will no longer be available to use in a future purchase.
          </li>
          <li>
            FARFETCH will automatically apply all visible amounts to your next
            purchase on the Website, where such a purchase is made before the
            specified expiry date. If the value of your purchase is lower than
            what is visible in your FARFETCH account, the difference shall
            remain in your account and shall be used on your next purchase on
            the Website.
          </li>
          <li>
            Refund to your FARFETCH account cannot be redeemed, converted to
            cash, withdrawn or transferred to anyone else. FARFETCH reserves the
            right to expire any refunds to your FARFETCH account at its
            discretion if the return involved fraudulent activity, or due to
            fraudulent activity on your account.
          </li>
        </ul>
        <p className="mb-3 font-medium">
          <strong>Refunds in cryptocurrency</strong>
        </p>
        <p className="mb-3">
          If you have used cryptocurrency to pay for your order, once your
          return has been accepted by our brand or partner boutique, your refund
          will be processed by TripleA in the original cryptocurrency at the
          current exchange rate. Our payment provider, TripleA will use the
          email address you provided at checkout and email you as soon as your
          refund has been processed.
        </p>
        <p className="mb-3">
          To claim your refund, you&apos;ll need to email TripleA with the
          following information:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
          <li>Full Name</li>
          <li>National ID, Passport or Business Registration Number</li>
          <li>Country of Residence</li>
          <li>Crypto Address to receive your refund</li>
        </ul>
        <p className="mb-3">
          Once you&apos;ve provided the requested information, your refund will
          be processed by TripleA and they will send you a confirmation email.
          You&apos;ll need to claim your refund from TripleA within 30 days of
          being emailed.
        </p>
        <p className="mb-3">
          When a refund is successfully claimed by you, the crypto should return
          to your wallet within the same business day, depending on how
          congested blockchain is. If you need any help, please contact
          TripleA&apos;s Customer Service team on{" "}
          <Link href="mailto:support@triple-a.io" className="underline">
            support@triple-a.io
          </Link>
          .
        </p>
        <p className="mb-3 font-medium">
          <strong>Faulty items</strong>
        </p>
        <p className="mb-3">
          If you receive an item in a flawed or damaged condition, or if it
          doesn&apos;t quite match the description on our website,{" "}
          <Link href="#" className="underline">
            contact our global Customer Service team
          </Link>{" "}
          as soon as possible.
        </p>
        <p>
          We&apos;ll liaise with the Partner, and if applicable, arrange for the
          return of the faulty product. You may have the option to select a full
          refund to your original method of payment, or a refund to your
          FARFETCH account, where available (which will be subject to the terms
          specified above in &quot;Refund to your FARFETCH account&quot;
          section).
        </p>
      </>
    ),
  },
  {
    title: "MADE-TO-ORDER AND PRE-OWNED ITEMS",
    content: (
      <>
        <p className="mb-4 font-medium">
          <strong>Made-to-order items</strong>
        </p>
        <p className="mb-4">
          Due to the nature of made-to-order items, and the fact they have been
          specially created for you, we can not accept returns unless the items
          are damaged or faulty when delivered to you.
        </p>
        <p className="mb-4 font-medium">
          <strong>Pre-owned items</strong>
        </p>
        <p className="mb-4">
          Pre-owned items sold at FARFETCH are checked prior to sale to
          guarantee their quality and precision. These items should be treated
          with care and returned in the same condition they were received.
        </p>
        <p>
          If any of your purchases arrive in a flawed or faulty condition, or
          without FARFETCH and brand tags attached,{" "}
          <Link href="#" className="underline">
            contact our global Customer Service team
          </Link>
          .
        </p>
      </>
    ),
  },
];

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
  { href: "/accessibility", label: "Accessibility" },
  { href: "#", label: "Cookie preferences" },
  {
    href: "/promotions-terms-and-conditions",
    label: "Promotions terms & conditions",
  },
];

const typographyStyles: React.CSSProperties = {
  fontFamily: `'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif`,
  color: "#222",
};

const ReturnsAndRefunds = () => {
  const { translations } = useLanguage();
  const translate = (text: string) => translations.productCopy[text] ?? text;
  const pathname = usePathname();
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  const toggleSection = useCallback((index: number) => {
    setOpenSectionIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleFeedbackChange = useCallback((value: boolean) => {
    setFeedbackHelpful(value);
  }, []);

  const sections = useMemo(() => getSections(translate), [translate]);
  
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
          buttonClassName="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          contentClassName="pb-4 px-4"
          titleClassName="font-light text-sm text-(--color-preto) uppercase tracking-wide"
        />
      )),
    [openSectionIndex, toggleSection],
  );

  return (
    <div
      className="min-h-screen text-preto"
      style={typographyStyles}
    >
      <div className="max-w-[137rem] mx-auto px-[1.5rem] py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          {/* Left Navigation Menu */}
          <aside className="lg:w-88 flex-shrink-0">
            <SupportNavigation links={navigationLinks} activePath={pathname} />
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 max-w-4xl lg:ml-12">
            {/* Title */}
            <h1 className="text-3xl md:text-2xl font-thin mb-8 text-(--color-preto)">
              Returns and refunds
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

export default ReturnsAndRefunds;
