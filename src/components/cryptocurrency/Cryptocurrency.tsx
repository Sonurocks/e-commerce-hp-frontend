'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DownloadAppBanner from '@/components/department/DownloadAppBanner';

const pageStyles: React.CSSProperties & { [key: string]: string } = {
  fontFamily: 'var(--fontNormal)',
  color: 'var(--color-preto)',
  '--fontNormal': "'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif",
  '--color-preto': '#222',
};

const navigationLinks = [
  { href: '#', label: ' HOLIDAY DATES YOU WANT TO KNOW ABOUT' },
  { href: '/contact-us', label: 'Contact us' },
  { href: '#', label: 'How to shop' },
  { href: '/orders-and-delivery', label: 'Orders and delivery' },
  { href: '/payment-and-pricing', label: 'Payment and pricing' },
  { href: '/cryptocurrency-payments', label: 'Cryptocurrency Payments' },
  { href: '/returns-and-refunds', label: 'Returns and refunds' },
  { href: '/faq', label: 'FAQs' },
  { href: '#', label: 'Terms and conditions' },
  { href: '#', label: 'Privacy policy' },
  { href: '#', label: 'Modern slavery statement' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '#', label: 'Cookie preferences' },
  { href: '/promotions-terms-and-conditions', label: 'Promotions terms & conditions' },
];

const cryptoTopics = [
  {
    question: 'WHAT IS CRYPTOCURRENCY?',
    answer: (
      <>
        <p>
          Cryptocurrency is a digital currency that allows quick and secure online
          payments. It doesn&apos;t rely on banks to verify transactions and enables
          anyone anywhere to send and receive payments.
        </p>
        <p className="mt-4">
          In the below countries, FARFETCH accepts cryptocurrency as a direct payment
          method at checkout.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-medium text-sm  tracking-wide">
             <strong> North and South America</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>USA</li>
              <li>Brazil</li>
              <li>Canada</li>
              <li>Mexico</li>
              <li>Argentina</li>
              <li>Colombia</li>
              <li>El Salvador</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-sm tracking-wide"><strong>Europe</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>UK</li>
              <li>Italy</li>
              <li>France</li>
              <li>Switzerland</li>
              <li>Germany</li>
              <li>Portugal</li>
              <li>Malta</li>
              <li>Spain (Mainland)</li>
              <li>Netherlands</li>
              <li>Denmark</li>
              <li>Austria</li>
              <li>Romania</li>
              <li>Belgium</li>
              <li>Slovakia</li>
              <li>Lithuania</li>
              <li>Poland</li>
              <li>Cyprus</li>
              <li>Greece</li>
              <li>Bulgaria</li>
              <li>Croatia</li>
              <li>Sweden</li>
              <li>Czechia</li>
              <li>Ireland</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-sm  tracking-wide"><strong>Africa</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Nigeria</li>
              <li>South Africa</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-sm tracking-wide"><strong>Middle East</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Saudi Arabia</li>
              <li>Kuwait</li>
              <li>U.A.E.</li>
              <li>Qatar</li>
              <li>Turkey</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-sm  tracking-wide">
              <strong>Asia and Australia</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Australia</li>
              <li>Korea</li>
              <li>Hong Kong</li>
              <li>Japan</li>
              <li>Singapore</li>
              <li>Philippines</li>
              <li>Taiwan</li>
              <li>Thailand</li>
              <li>Indonesia</li>
              <li>India</li>
              <li>Vietnam</li>
              <li>Pakistan</li>
              <li>Kazakhstan</li>
              <li>Cambodia</li>
            </ul>
          </div>
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
    question: 'HOW TO PAY WITH CRYPTOCURRENCY',
    answer: (
      <>
        <p className="font-medium text-sm text-(--color-preto)">
          Here&apos;s how you&apos;ll be able to place an order:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
          <li>Add your items to your shopping bag</li>
          <li>Head to checkout and select the cryptocurrency payment method</li>
          <li>
            Confirm your order details and click Place Order — you&apos;ll be redirected
            to our payment provider,&nbsp;
            <Link href="https://triple-a.io" className="underline" target="_blank">
              TripleA
            </Link>
          </li>
          <li>
            On the&nbsp;
            <Link href="https://triple-a.io" className="underline" target="_blank">
              TripleA
            </Link>
            &nbsp;payment provider page, select your preferred cryptocurrency and confirm
            the final amount. You may need to pay blockchain fees but you don&apos;t need to
            create an account with&nbsp;
            <Link href="https://triple-a.io" className="underline" target="_blank">
              TripleA
            </Link>
            &nbsp;to pay with crypto
          </li>
          <li>
            Scan the QR code or copy the wallet address and amount displayed on the screen
            and send the cryptocurrency of your choice from your wallet
          </li>
          <li>
            Place your order within 25 minutes to confirm the current cryptocurrency
            exchange rate
          </li>
        </ol>
        <p className="mt-4">
          When our payment provider,&nbsp;
          <Link href="https://triple-a.io" className="underline" target="_blank">
            TripleA
          </Link>
          , quotes a price in any cryptocurrency they can only honour it for 25 minutes. If the
          25 minutes run out, just reload the page.&nbsp;
          <Link href="https://triple-a.io" className="underline" target="_blank">
            TripleA
          </Link>
          &nbsp;will give you a new address and an updated cryptocurrency exchange rate for your
          payment, with another 25 minute payment window to place your order.
        </p>
        <p className="mt-4">
          Once the payment is confirmed you will be redirected to the FARFETCH order confirmation
          page. The confirmation is usually fast, but sometimes it may take longer than traditional
          payment methods — while the payment is being confirmed, please don&apos;t close the browser
          window.
        </p>
        <p className="mt-4">
          If you don&apos;t send enough crypto to place your order, don&apos;t worry. You&apos;ll be notified
          immediately so you can send the remaining amount to complete your order.
        </p>
        <p className="mt-4">
          If you send more than the necessary amount, you&apos;ll be able to complete your order and
          our payment provider,&nbsp;
          <Link href="https://triple-a.io" className="underline" target="_blank">
            TripleA
          </Link>
          , will email you to claim your refund. For more information, view the refunds in
          cryptocurrency section below.
        </p>
        <p className="mt-6 font-medium text-sm text-(--color-preto)">
         <strong>Sending cryptocurrency to the wrong address or network</strong> 
        </p>
        <p className="mt-2">
          Your funds will be lost if you send crypto to the wrong address or use the wrong network.
          To minimise this risk, please make sure you scan the QR code with your wallet and that you’re
          using the network indicated in the payment form.
        </p>
        <p className="mt-2">
          Before sending or receiving crypto, check the address, cryptocurrency, amount and network.
          Please always double-check the characters at the beginning and end of the address. These
          should be exactly the same as the address you&apos;re sending to, or receiving from.
        </p>
        <p className="mt-2">
          If any of the information used for payment is incorrect, like the network or wallet address,
          neither FARFETCH nor&nbsp;
          <Link href="https://triple-a.io" className="underline" target="_blank">
            TripleA
          </Link>
          &nbsp;will be responsible. Crypto cannot be retrieved due to the irreversible nature of
          blockchain transactions.
        </p>
        <div className="mt-4 space-y-2">
          <Link href="#" className="underline">
            View the FARFETCH Terms and Conditions here
          </Link>
          <br />
          <Link href="https://triple-a.io/terms-and-conditions/" className="underline" target="_blank">
            View TripleA&apos;s Terms and Conditions here
          </Link>
        </div>
      </>
    ),
  },
  {
    question: 'ACCEPTED CRYPTOCURRENCY',
    answer: (
      <>
        <p>
          In selected countries, we&apos;ll accept the below cryptocurrencies from any wallet:
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
          Keep an eye on this list as we&apos;ll be adding more cryptocurrencies.
        </p>
      </>
    ),
  },
  {
    question: 'REFUNDS IN CRYPTOCURRENCY',
    answer: (
      <>
        <p>
          Once your return has been accepted by our brand or partner boutique, you will
          receive an email from our crypto payment provider including a link to claim your
          funds. In this link, you will be directed to a form and prompted to enter your
          crypto address.
        </p>
        <p className="mt-2">
          You will be refunded the price of the item you returned, in the same cryptocurrency
          you paid in, at the current exchange rate. Due to fluctuations in the value of
          the cryptocurrency, the number of tokens you receive when refunded may be different
          from the number of tokens you paid with.
        </p>
        <p className="mt-2">
          When a refund is successfully claimed by you, the cryptocurrency should return to
          your wallet within the same business day, depending on how congested the blockchain is.
        </p>
        <p className="mt-4 font-medium text-sm text-(--color-preto)">
          <strong>Sending the incorrect amount in cryptocurrency</strong>
        </p>
        <p className="mt-2">
          If you overpaid in cryptocurrency, your order will be processed and{' '}
          <Link href="https://triple-a.io" className="underline" target="_blank">
            Triple-A
          </Link>{' '}
          will automatically email you to refund the excess amount. If you didn&apos;t send
          enough cryptocurrency, you have 24 hours to top up your payment.{` `}
          <Link href="https://triple-a.io" className="underline" target="_blank">
            Triple-A
          </Link>{' '}
          will automatically email you to return the amount if the remaining cryptocurrency
          isn&apos;t sent.
        </p>
        <p className="mt-2">
          Due to a number of reasons, you may experience an invalid payment. This will be
          investigated and Triple A&apos;s team may contact you for more information. If the
          payment was received, you can expect a refund within 5 – 7 business days.
        </p>
      </>
    ),
  },
  {
    question: 'KNOW YOUR CUSTOMER (KYC)',
    answer: (
      <>
        <p>
          For security reasons, orders above a specific amount will be subject to the Know
          Your Customer (KYC) process where you will need to provide an identification
          document to verify your identity.
        </p>
        <p className="mt-2">
          This process is quick and you only need to upload a photo of an identity document
          right at the beginning of the payment.
        </p>
      </>
    ),
  },
  {
    question: 'TRIPLEA',
    answer: (
      <>
        <p>
          <Link href="https://triple-a.io" className="underline" target="_blank">
            TripleA
          </Link>{' '}
          processes cryptocurrency payments on FARFETCH&apos;s behalf, supporting Bitcoin (BTC),
          Bitcoin Lightning (LN BTC), Ethereum (ETH), Tether (USDT), USD Coin (USDC) and more.
        </p>
        <p className="mt-2">
          Revolutionising how businesses and customers are connected,{` `}
          <Link href="https://triple-a.io" className="underline" target="_blank">
            TripleA
          </Link>{' '}
          gives our customers the opportunity to shop using blockchain technology and
          cryptocurrency solutions.
        </p>
        <p className="mt-4 font-medium text-sm text-(--color-preto)">
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

  const toggleTopic = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-(--color-preto)" style={pageStyles}>
      <div className="max-w-[137rem] mx-auto px-[1.5rem] py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          <aside className="lg:w-78 flex-shrink-0">
            <nav>
              <ul className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`block py-1 text-sm font-thin underline hover:no-underline transition ${
                        pathname === link.href
                          ? 'font-thin text-(--color-preto)'
                          : 'text-(--color-preto)'
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
            <h1 className="text-3xl md:text-2xl font-thin mb-8 text-(--color-preto)">
              Cryptocurrency payments
            </h1>

            <div className="border-t border-gray-200">
              {cryptoTopics.map((topic, index) => (
                <div key={topic.question} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleTopic(index)}
                    className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-light text-sm text-(--color-preto) uppercase tracking-wide ">
                      {topic.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-4 h-4 text-(--color-preto)" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-(--color-preto)" />
                    )}
                  </button>

                  {openIndex === index && (
                    <div className="pb-6 px-4 text-sm font-thin text-(--color-preto) leading-relaxed space-y-2">
                      {topic.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-13 pt-8">
              <div className="mb-4">
                <p className="text-xs text-(--color-preto) mb-2">Tell us what you think</p>
                <p className="text-2xl font-thin text-(--color-preto) mb-4">
                  Was this content helpful?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setFeedbackHelpful(true)}
                  className={`px-6 py-2 text-sm font-semibold rounded-lg border border-(--color-preto) transition-colors ${
                    feedbackHelpful === true
                      ? 'bg-(--color-preto) text-white'
                      : 'bg-white text-(--color-preto) hover:bg-gray-50'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setFeedbackHelpful(false)}
                  className={`px-6 py-2 text-sm font-semibold rounded-lg border border-(--color-preto) transition-colors ${
                    feedbackHelpful === false
                      ? 'bg-(--color-preto) text-white'
                      : 'bg-white text-(--color-preto) hover:bg-gray-50'
                  }`}
                >
                  Not really
                </button>
              </div>
            </div>
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

