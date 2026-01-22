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

const cryptoRegions: { title: string; countries: string[] }[] = [
  {
    title: "North and South America",
    countries: [
      "USA",
      "Brazil",
      "Canada",
      "Mexico",
      "Argentina",
      "Colombia",
      "El Salvador",
    ],
  },
  {
    title: "Europe",
    countries: [
      "UK",
      "Italy",
      "France",
      "Switzerland",
      "Germany",
      "Portugal",
      "Malta",
      "Spain (Mainland)",
      "Netherlands",
      "Denmark",
      "Austria",
      "Romania",
      "Belgium",
      "Slovakia",
      "Lithuania",
      "Poland",
      "Cyprus",
      "Greece",
      "Bulgaria",
      "Croatia",
      "Sweden",
      "Czechia",
      "Ireland",
    ],
  },
  {
    title: "Africa",
    countries: ["Nigeria", "South Africa"],
  },
  {
    title: "Middle East",
    countries: ["Saudi Arabia", "Kuwait", "U.A.E.", "Qatar", "Turkey"],
  },
  {
    title: "Asia and Australia",
    countries: [
      "Australia",
      "Korea",
      "Hong Kong",
      "Japan",
      "Singapore",
      "Philippines",
      "Taiwan",
      "Thailand",
      "Indonesia",
      "India",
      "Vietnam",
      "Pakistan",
      "Kazakhstan",
      "Cambodia",
    ],
  },
];

const cryptoTopics: SupportSection[] = [
  {
    title: "WHAT IS CRYPTOCURRENCY?",
    content: (
      <>
        <p>
          Cryptocurrency is a digital currency that allows quick and secure
          online payments. It doesn&apos;t rely on banks to verify transactions
          and enables anyone anywhere to send and receive payments.
        </p>
        <p className="mt-4">
          In the below countries, FARFETCH accepts cryptocurrency as a direct
          payment method at checkout.
        </p>
        <div className="mt-4 space-y-4">
          {cryptoRegions.map((region) => (
            <div key={region.title}>
              <p className="font-medium text-sm  tracking-wide">
                <strong>{region.title}</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                {region.countries.map((country) => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6">
          If you would like to share any feedback,&nbsp;
          <Link href="#" className="underline">
            please fill out this form
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    title: "HOW TO PAY WITH CRYPTOCURRENCY",
    content: (
      <>
        <p className="font-medium text-sm text-preto">
          Here&apos;s how you&apos;ll be able to place an order:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
          <li>Add your items to your shopping bag</li>
          <li>Head to checkout and select the cryptocurrency payment method</li>
          <li>
            Confirm your order details and click Place Order — you&apos;ll be
            redirected to our payment provider,&nbsp;
            <Link
              href="https://triple-a.io"
              className="underline"
              target="_blank"
            >
              TripleA
            </Link>
          </li>
          <li>
            On the&nbsp;
            <Link
              href="https://triple-a.io"
              className="underline"
              target="_blank"
            >
              TripleA
            </Link>
            &nbsp;payment provider page, select your preferred cryptocurrency
            and confirm the final amount. You may need to pay blockchain fees
            but you don&apos;t need to create an account with&nbsp;
            <Link
              href="https://triple-a.io"
              className="underline"
              target="_blank"
            >
              TripleA
            </Link>
            &nbsp;to pay with crypto
          </li>
          <li>
            Scan the QR code or copy the wallet address and amount displayed on
            the screen and send the cryptocurrency of your choice from your
            wallet
          </li>
          <li>
            Place your order within 25 minutes to confirm the current
            cryptocurrency exchange rate
          </li>
        </ol>
        <p className="mt-4">
          When our payment provider,&nbsp;
          <Link
            href="https://triple-a.io"
            className="underline"
            target="_blank"
          >
            TripleA
          </Link>
          , quotes a price in any cryptocurrency they can only honour it for 25
          minutes. If the 25 minutes run out, just reload the page.&nbsp;
          <Link
            href="https://triple-a.io"
            className="underline"
            target="_blank"
          >
            TripleA
          </Link>
          &nbsp;will give you a new address and an updated cryptocurrency
          exchange rate for your payment, with another 25 minute payment window
          to place your order.
        </p>
        <p className="mt-4">
          Once the payment is confirmed you will be redirected to the FARFETCH
          order confirmation page. The confirmation is usually fast, but
          sometimes it may take longer than traditional payment methods — while
          the payment is being confirmed, please don&apos;t close the browser
          window.
        </p>
        <p className="mt-4">
          If you don&apos;t send enough crypto to place your order, don&apos;t
          worry. You&apos;ll be notified immediately so you can send the
          remaining amount to complete your order.
        </p>
        <p className="mt-4">
          If you send more than the necessary amount, you&apos;ll be able to
          complete your order and our payment provider,&nbsp;
          <Link
            href="https://triple-a.io"
            className="underline"
            target="_blank"
          >
            TripleA
          </Link>
          , will email you to claim your refund. For more information, view the
          refunds in cryptocurrency section below.
        </p>
        <p className="mt-6 font-medium text-sm text-preto">
          <strong>
            Sending cryptocurrency to the wrong address or network
          </strong>
        </p>
        <p className="mt-2">
          Your funds will be lost if you send crypto to the wrong address or use
          the wrong network. To minimise this risk, please make sure you scan
          the QR code with your wallet and that you’re using the network
          indicated in the payment form.
        </p>
        <p className="mt-2">
          Before sending or receiving crypto, check the address, cryptocurrency,
          amount and network. Please always double-check the characters at the
          beginning and end of the address. These should be exactly the same as
          the address you&apos;re sending to, or receiving from.
        </p>
        <p className="mt-2">
          If any of the information used for payment is incorrect, like the
          network or wallet address, neither FARFETCH nor&nbsp;
          <Link
            href="https://triple-a.io"
            className="underline"
            target="_blank"
          >
            TripleA
          </Link>
          &nbsp;will be responsible. Crypto cannot be retrieved due to the
          irreversible nature of blockchain transactions.
        </p>
        <div className="mt-4 space-y-2">
          <Link href="#" className="underline">
            View the FARFETCH Terms and Conditions here
          </Link>
          <br />
          <Link
            href="https://triple-a.io/terms-and-conditions/"
            className="underline"
            target="_blank"
          >
            View TripleA&apos;s Terms and Conditions here
          </Link>
        </div>
      </>
    ),
  },
  {
    title: "ACCEPTED CRYPTOCURRENCY",
    content: (
      <>
        <p>
          In selected countries, we&apos;ll accept the below cryptocurrencies
          from any wallet:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 mt-4">
          <li>Ethereum ETH</li>
          <li>Bitcoin BTC</li>
          <li>Bitcoin Lightning LN BTC</li>
          <li>Tether USDT</li>
          <li>USD Coin USDC</li>
          <li>BinancePay</li>
        </ul>
        <p className="mt-6">
          Keep an eye on this list as we&apos;ll be adding more
          cryptocurrencies.
        </p>
      </>
    ),
  },
  {
    title: "REFUNDS IN CRYPTOCURRENCY",
    content: (
      <>
        <p>
          Once your return has been accepted by our brand or partner boutique,
          you will receive an email from our crypto payment provider including a
          link to claim your funds. In this link, you will be directed to a form
          and prompted to enter your crypto address.
        </p>
        <p className="mt-2">
          You will be refunded the price of the item you returned, in the same
          cryptocurrency you paid in, at the current exchange rate. Due to
          fluctuations in the value of the cryptocurrency, the number of tokens
          you receive when refunded may be different from the number of tokens
          you paid with.
        </p>
        <p className="mt-2">
          When a refund is successfully claimed by you, the cryptocurrency
          should return to your wallet within the same business day, depending
          on how congested the blockchain is.
        </p>
        <p className="mt-4 font-medium text-sm text-preto">
          <strong>Sending the incorrect amount in cryptocurrency</strong>
        </p>
        <p className="mt-2">
          If you overpaid in cryptocurrency, your order will be processed and{" "}
          <Link
            href="https://triple-a.io"
            className="underline"
            target="_blank"
          >
            Triple-A
          </Link>{" "}
          will automatically email you to refund the excess amount. If you
          didn&apos;t send enough cryptocurrency, you have 24 hours to top up
          your payment.{` `}
          <Link
            href="https://triple-a.io"
            className="underline"
            target="_blank"
          >
            Triple-A
          </Link>{" "}
          will automatically email you to return the amount if the remaining
          cryptocurrency isn&apos;t sent.
        </p>
        <p className="mt-2">
          Due to a number of reasons, you may experience an invalid payment.
          This will be investigated and Triple A&apos;s team may contact you for
          more information. If the payment was received, you can expect a refund
          within 5 – 7 business days.
        </p>
      </>
    ),
  },
  {
    title: "KNOW YOUR CUSTOMER (KYC)",
    content: (
      <>
        <p>
          For security reasons, orders above a specific amount will be subject
          to the Know Your Customer (KYC) process where you will need to provide
          an identification document to verify your identity.
        </p>
        <p className="mt-2">
          This process is quick and you only need to upload a photo of an
          identity document right at the beginning of the payment.
        </p>
      </>
    ),
  },
  {
    title: "TRIPLEA",
    content: (
      <>
        <p>
          <Link
            href="https://triple-a.io"
            className="underline"
            target="_blank"
          >
            TripleA
          </Link>{" "}
          processes cryptocurrency payments on FARFETCH&apos;s behalf,
          supporting Bitcoin (BTC), Bitcoin Lightning (LN BTC), Ethereum (ETH),
          Tether (USDT), USD Coin (USDC) and more.
        </p>
        <p className="mt-2">
          Revolutionising how businesses and customers are connected,{` `}
          <Link
            href="https://triple-a.io"
            className="underline"
            target="_blank"
          >
            TripleA
          </Link>{" "}
          gives our customers the opportunity to shop using blockchain
          technology and cryptocurrency solutions.
        </p>
        <p className="mt-4 font-medium text-sm text-preto">
          <strong>Triple-A/Tether promotion details:</strong>
        </p>
        <ul className="list-disc list-outside space-y-1 ml-6 mt-2">
          <li>10% off first Triple-A payment method, using cryptocurrency</li>
          <li>Promotion will be automatically applied. No code required.</li>
          <li>Available to all customers</li>
          <li>Only available to use 1 time per user</li>
          <li>Live date: 28th April</li>
          <li>End date: 30th August</li>
          <li>Discount: 10%</li>
          <li>Thresholds: $145 minimum spend</li>
          <li>Full price only</li>
          <li>Regions: Global</li>
          <li>Maximum 70 USDT discount</li>
        </ul>
      </>
    ),
  },
];

const Cryptocurrency = () => {
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
      cryptoTopics.map((topic, index) => (
        <AccordionSection
          key={topic.title}
          section={topic}
          index={index}
          isOpen={openIndex === index}
          onToggle={toggleTopic}
          containerClassName="border-b border-gray-200"
          buttonClassName="w-full py-4 flex items-center justify-between text-left  transition-colors"
          contentClassName="pb-6 px-4 text-sm font-thin text-preto leading-relaxed space-y-2"
        />
      )),
    [openIndex, toggleTopic],
  );

  return (
    <div
      className="min-h-screen  text-preto"
      style={supportPageStyles}
    >
      <div className="max-w-[137rem] mx-auto px-[1.5rem] py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          <aside className="lg:w-78 flex-shrink-0">
            <SupportNavigation links={navigationLinks} activePath={pathname} />
          </aside>

          <main className="flex-1 max-w-4xl lg:ml-12">
            <h1 className="text-3xl md:text-2xl font-thin mb-8 text-preto">
              Cryptocurrency payments
            </h1>

            <div className="border-t border-gray-200">{renderedTopics}</div>

            <FeedbackPrompt
              helpfulValue={feedbackHelpful}
              onFeedbackChange={handleFeedbackChange}
              containerClassName="mt-13 pt-8"
              buttonClassName="px-6 py-2 text-sm font-semibold rounded-lg border border-preto transition-colors"
              activeButtonClassName="bg-preto text-white"
              inactiveButtonClassName=" text-preto "
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

export default Cryptocurrency;
