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
  { href: "/modern-slavery-statement", label: "Modern slavery statement" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "#", label: "Cookie preferences" },
  {
    href: "/promotions-terms-and-conditions",
    label: "Promotions terms & conditions",
  },
];

const paymentTopics: SupportSection[] = [
  {
    title: "WHY IS FARFETCH PRICING DIFFERENT?",
    content: (
      <>
        <p>
          It&apos;s down to our unique business model. At FARFETCH, you&apos;re
          shopping items from our luxury brands and partner boutiques worldwide,
          expertly curated for you by our team.
        </p>
        <p>
          Sometimes the same item&apos;s price varies in our marketplace,
          depending on the seller and availability. This is the case both for
          full prices and reduced prices. The price of the same item may vary
          depending on where it&apos;s coming from and your location.
          That&apos;s also why placing an item in your shopping bag or wishlist
          won&apos;t reserve it at a particular price.
        </p>
        <p>
          We&apos;ll always offer you the best price available to your
          destination when you place your order.
        </p>
        <p>
          To view the most accurate prices, select your delivery destination on
          our website.
        </p>
      </>
    ),
  },
  {
    title: "WHICH CURRENCIES CAN I SHOP IN?",
    content:
      "This is determined by your delivery destination and will be displayed at checkout before placing your order. Unless you are paying with cryptocurrency, if your local currency is unavailable, your order will be charged in USD at a competitive exchange rate.",
  },
  {
    title: "WHEN WILL MY CARD BE CHARGED?",
    content:
      "If you pay by debit card, credit card, PayPal or cryptocurrency, FARFETCH (or its affiliates as applicable) will take payment when you place your order.",
  },
  {
    title: "WHICH PAYMENT METHODS DO YOU ACCEPT?",
    content: (
      <>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Visa</li>
          <li>MasterCard</li>
          <li>Maestro</li>
          <li>American Express</li>
          <li>Discover</li>
          <li>Diners</li>
          <li>JCB</li>
          <li>PayPal</li>
          <li>Tamara</li>
          <li>Apple Pay</li>
          <li>Afterpay (only available in the United States and Australia)</li>
          <li>
            Alipay (only available to United States, Canada, China Mainland,
            Hong Kong SAR and Macau SAR)
          </li>
          <li>HB Pay (only available to China Mainland)</li>
          <li>
            Klarna (instalments only available in the US, UK, Germany, Austria,
            Switzerland, Belgium, Italy, France, Sweden and Netherlands)
          </li>
          <li>
            WeChat (available in China Mainland, Hong Kong SAR, Macau SAR,
            Canada, USA, Japan, Australia and New Zealand)
          </li>
          <li>UnionPay</li>
          <li>
            Alipay HK (available in Hong Kong SAR – FARFETCH China Android app)
          </li>
          <li>KaKao Pay (available in South Korea – FARFETCH iOS app)</li>
          <li>iDEAL (only available to The Netherlands)</li>
          <li>Boleto (only available to Brazil)</li>
          <li>
            Cryptocurrency (
            <Link href="#" className="underline">
              the full list of valid cryptocurrencies can be found here
            </Link>
            )
          </li>
        </ul>
        <p className="mt-4">
          In selected countries, we accept payment with Klarna, Afterpay and
          Tamara.
        </p>
        <p className="mt-4">
          We only accept credit card instalments as payment in Brazil and
          Mexico.
        </p>
        <p className="mt-4">
          For your safety, security checks are taken on all payments made to us
          at the time of purchase.
        </p>
      </>
    ),
  },
  {
    title: "ARE MY PERSONAL DETAILS SAFE?",
    content: (
      <>
        <p>
          Absolutely. We keep your personal information confidential and only
          give it out with your consent or if legally permitted. For further
          details, view the{" "}
          <Link href="#" className="underline">
            FARFETCH Privacy Policy
          </Link>{" "}
          here.
        </p>
        <p className="mt-4">
          You may also delete your card details at any time by following these
          simple steps:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
          <li>Simulate a purchase</li>
          <li>Click on “Edit” below the Payment Method</li>
          <li>Delete the card information</li>
        </ol>
      </>
    ),
  },
  {
    title: "PSD2",
    content: (
      <>
        <p className="font-medium">
          <strong>What is PSD2?</strong>
        </p>
        <p>
          PSD2 is a European regulation that makes online payments more secure.
          When you place an order online using a card payment, your bank may ask
          you to confirm your identity through 3D Secure authentication.
        </p>
        <p className="mt-4 font-medium ">
          <strong>What are the payment steps when I place an order?</strong>
        </p>
        <p>
          When you place an order within Europe, you may be directed to a 3D
          Secure authentication page by your bank. There are many ways to
          authenticate online payments and you could be asked to confirm your
          identity through SMS, email, or TouchID. Once your payment is
          authenticated, the order will be placed and you’ll return to the
          FARFETCH order confirmation page. As soon as your order has been
          confirmed, you’ll receive an email.
        </p>
        <p className="mt-4 font-medium">
          <strong>How will my bank confirm my identity?</strong>
        </p>
        <p>
          Get in contact with your bank to understand their 3D Secure
          authentication process. Make sure they have the correct contact
          details for you just in case they use SMS or email for authentication.
        </p>
        <p className="mt-4 font-medium">
          <strong>
            If I&apos;m unable to place an order, what should I do?
          </strong>
        </p>
        <p>
          If you experience trouble placing an order, you can place an order
          over the phone by{" "}
          <Link href="#" className="underline">
            contacting our global Customer Service team
          </Link>
          .
        </p>
        <p className="mt-4 font-medium">
          <strong>
            I have some more questions about payment: who should I contact?
          </strong>
        </p>
        <p>
          Our Customer Service advisors are on hand to answer any additional
          questions you may have.
        </p>
      </>
    ),
  },
  {
    title: "KLARNA",
    content: (
      <>
        <p className="font-medium">
          <strong>How does Klarna work?</strong>
        </p>
        <p>
          Klarna is a payment provider offering flexible payment options
          including Buy Now, Pay Later. Once you&apos;ve placed your order on
          FARFETCH, you&apos;ll be redirected to Klarna, where you&apos;ll be
          asked to enter your card details. To check your eligibility, Klarna
          will perform a soft search with a credit agency which will not affect
          your credit score.
        </p>
        <p className="mt-2">
          In order to offer you Klarna&apos;s payment methods, we might in the
          checkout pass your personal data in the form of contact and order
          details to Klarna, in order for Klarna to assess whether you qualify
          for their payment methods and to tailor those payment methods for you.
          Your personal data transferred is processed in line with Klarna&apos;s
          own privacy notice.
        </p>
        <p className="mt-2">
          For more information, view{" "}
          <Link href="#" className="underline">
            Klarna&apos;s Privacy Policy here
          </Link>
          .
        </p>
        <p className="mt-4 font-medium">
          <strong>Am I eligible for Klarna solutions?</strong>
        </p>
        <p>
          To use Klarna solutions you must be at least 18 (18+, US residents
          only). Klarna offers Buy Now, Pay Later solutions. Whilst this option
          is widely promoted, Pay in 3 interest-free instalments and Pay in 4
          interest-free instalments are subject to your financial circumstances.
          Klarna&apos;s Pay in 3 / Pay in 30 days are unregulated credit
          agreements. When choosing these Buy Now, Pay Later solutions, our
          assessment will not affect your credit rating, however, borrowing more
          than you can afford or paying late may negatively impact your
          financial status and ability to obtain credit. Subject to status. Late
          fees may apply. Ts&amp;Cs apply. Maximum spends* apply to every order,
          and you&apos;ll only be able to use Klarna Buy Now, Pay Later
          solutions if you have a delivery and billing addresses at the markets
          we offer Klarna.
        </p>
        <p className="mt-2 text-xs">
          *Maximum spends: France (1500 EUR), Italy (2000 EUR), United Kingdom
          (£1500), United States ($1500), Germany, Austria, Switzerland and
          Belgium (5000 EUR/CHF).
        </p>
        <p className="text-xs">
          *CA resident loans made or arranged pursuant to a California Financing
          Law license.
        </p>
        <p className="mt-4 font-medium">
          <strong>What happens if I cancel or return my order?</strong>
        </p>
        <p>
          As soon as FARFETCH have accepted your cancellation or return, Klarna
          will cancel any future scheduled payments as well as refund any
          amounts due. The return will be accepted in the Klarna app immediately
          and your refund will be processed within 5–7 business days.
        </p>
        <p className="mt-4 font-medium">
          <strong>What happens if I don&apos;t pay for my order?</strong>
        </p>
        <p>
          Klarna will automatically attempt to collect your payment from the
          debit or credit card you entered at checkout. If Klarna is unable to
          collect your payment on the scheduled due date, Klarna will make one
          further attempt to automatically collect payment two days later.
          Should this last payment attempt fail, Klarna will issue you a
          statement for the full outstanding order amount which will become
          payable 15 days later. Klarna will notify you two days before payment
          is due and then attempt to collect your payment. Payment is due 30
          days after the item is shipped. To help you pay on time, we&apos;ll
          alert you two days before payment is due – you&apos;ll receive a push
          notification from the Klarna app or email reminders to pay – and, if
          very late, we&apos;ll also send you a text or letter, too.
        </p>
        <p className="mt-2">
          You will not be charged fees or interest for late and missed
          repayments if you pay on time. Your credit score will not be impacted
          by using Klarna, even if you have failed to pay on time. If you fail
          to make a payment you will be in default, and may be unable to use the
          service in the future. Klarna may continue to attempt to collect
          overdue and currently due payments on following due dates, or invoice
          you separately for the unpaid total. If you do not pay for your
          purchase, Klarna may engage with an external debt collection agency to
          collect on our behalf. Debt collection agencies are used as a last
          resort.
        </p>
      </>
    ),
  },
  {
    title: "INSTANT BANK TRANSFERS",
    content: (
      <>
        <p>
          FARFETCH has partnered with Volt, a third party payment provider, to
          offer instant bank transfers. When you place an order, you&apos;ll be
          redirected to Volt at checkout where you&apos;ll be able to pay
          FARFETCH directly from your preferred bank account without sharing
          your bank details. It&apos;s faster, simpler and more secure.
        </p>
        <p className="mt-2">
          Within a few taps, you&apos;ll be able to pay using Volt without
          registering or creating an account and your personal details
          won&apos;t be stored.
        </p>
        <p className="mt-2">
          Volt, our instant bank transfer payment provider, is available at
          checkout in the United Kingdom and Europe.
        </p>
        <p className="mt-2">
          When you place an order using Volt as a payment method, you need to
          have a bank account and the app of your banking provider downloaded.
        </p>
        <p className="mt-4 font-medium">
          <strong>How can I pay using instant bank transfers?</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
          <li>Add items to your shopping bag.</li>
          <li>
            Select Instant Bank Transfer as your payment method at checkout.
          </li>
          <li>Confirm your order and click Place Order.</li>
          <li>
            Search for your bank and select it on Volt&apos;s page. If
            you&apos;re using mobile, you&apos;ll be redirected to your banking
            app. If you&apos;re on desktop, scan the generated QR code to
            complete the payment in your banking app.
          </li>
          <li>
            Authenticate the payment using your bank&apos;s security measures.
          </li>
          <li>Confirm payment to complete your order.</li>
        </ol>
        <p className="mt-2">
          Once the payment is confirmed, you&apos;ll be redirected to the
          FARFETCH order confirmation page. Whilst your payment is being
          confirmed, please don&apos;t close the browser window.
        </p>
        <p className="mt-2">
          If you were unable to confirm your payment, your payment request will
          expire within 30 minutes and your order won&apos;t be placed. To place
          your order again, head to checkout and follow the steps above.
        </p>
        <p className="mt-2">
          Depending on your bank, there may be a limit set on your account which
          could prevent a transaction from going through. In selected regions,
          you may also be asked to provide your IBAN or account details. To find
          out more about this, contact your bank.
        </p>
        <p className="mt-2">
          <Link href="#" className="underline">
            View the Volt Terms and Conditions here
          </Link>
        </p>
        <p className="mt-4 font-medium">
          <strong>
            If I want to return my item, how will my refund be processed?
          </strong>
        </p>
        <p>
          Once your return has been accepted by our brand or partner boutique,
          your refund will be processed. If you used Volt as your payment
          method, your refund will be transferred instantly to the bank you
          originally paid with. For more information, head to our{" "}
          <Link href="#" className="underline">
            returns and refunds page
          </Link>
          .
        </p>
      </>
    ),
  },
];

const PaymentAndPricing = () => {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  const toggleTopic = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleFeedbackChange = useCallback((value: boolean) => {
    setFeedbackHelpful(value);
  }, []);

  const renderedTopics = useMemo(
    () =>
      paymentTopics.map((topic, index) => (
        <AccordionSection
          key={topic.title}
          section={topic}
          index={index}
          isOpen={openIndex === index}
          onToggle={toggleTopic}
          containerClassName="border-b border-gray-200"
          buttonClassName="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          contentClassName="pb-6 px-4 text-sm font-thin text-(--color-preto) leading-relaxed space-y-2"
        />
      )),
    [openIndex, toggleTopic],
  );

  return (
    <div
      className="min-h-screen  text-(--color-preto)"
      style={supportPageStyles}
    >
      <div className="max-w-[137rem] mx-auto px-[1.5rem] py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          <aside className="lg:w-74 flex-shrink-0">
            <SupportNavigation links={navigationLinks} activePath={pathname} />
          </aside>

          <main className="flex-1 max-w-4xl lg:ml-12">
            <h1 className="text-3xl md:text-2xl font-thin mb-8 text-(--color-preto)">
              Payment and pricing
            </h1>

            <div className="border-t border-gray-200">{renderedTopics}</div>

            <FeedbackPrompt
              helpfulValue={feedbackHelpful}
              onFeedbackChange={handleFeedbackChange}
              containerClassName="mt-13 pt-8"
              buttonClassName="px-6 py-2 text-sm font-semibold rounded-lg border border-(--color-preto) transition-colors"
              activeButtonClassName="bg-(--color-preto) text-white"
              inactiveButtonClassName="bg-white text-(--color-preto) hover:bg-gray-50"
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

export default PaymentAndPricing;
