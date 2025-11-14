'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQCategory {
  title: string;
  questions: {
    question: string;
    answer: string | React.ReactNode;
  }[];
}

const faqCategories: FAQCategory[] = [
  {
    title: 'HOW TO SHOP AND PLACE AN ORDER',
    questions: [
      {
        question: 'Do I need an account to place an order?',
        answer: (
          <>
            No, all you need is an email address to place and track orders. To checkout faster, access your wishlist and order updates, we recommend setting up a <strong>FARFETCH account</strong>. If you create a <strong>FARFETCH account</strong> and place an order, you'll be automatically enrolled in our loyalty programme, <strong>Access</strong>. Every piece you buy takes you one step closer to unlocking exclusive rewards – from early sale access and priority customer care to unlimited free shipping and a dedicated personal stylist.
            <p className="mt-2">
              <Link href="#" className="underline">Learn more about our Access loyalty programme</Link>
            </p>
          </>
        ),
      },
      {
        question: 'I\'ve forgotten my password, what should I do?',
        answer: (
          <>
            Follow the <strong>forgot your password</strong> link on our Sign In page and enter your email address. You'll then receive an email to reset your password.
          </>
        ),
      },
      {
        question: 'How do I receive FARFETCH email updates?',
        answer: (
          <>
            Stay informed of new arrivals, trends and exclusive promotions by entering your email address at the bottom of our homepage. You can manage your email preferences in your account.
          </>
        ),
      },
      {
        question: 'How do I place an order on your website?',
        answer: (
          <>
            <strong>Here is how:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-2 ml-4">
              <li>Choose a category or brand from the top navigation menu or search to explore a specific style or brand</li>
              <li>Select your desired item and click <strong>Add To Bag</strong>. Once youve added all items, its time to checkout</li>
              <li>Sign in to your account or, if you ve not yet created one, continue via guest checkout</li>
            </ol>
            <p className="mt-2">
              Enter your address, payment method and delivery details to place your order. We will confirm the order and it will be carefully prepared and sent to you, with updates every step of the way.
            </p>
          </>
        ),
      },
      {
        question: 'Can I place an order over the phone?',
        answer: (
          <>
            Sure. Our global Customer Service advisors are happy to assist you with this.
          </>
        ),
      },
      {
        question: 'Can I cancel my FARFETCH order or make changes to it?',
        answer: (
          <>
            Yes, you may be able to cancel some items before we prepare your order. Head to <strong>Orders & Returns</strong>, or if you placed an order as a guest and want to make changes, <Link href="#" className="underline">enter your guest order details here</Link>.
            <p className="mt-2">
              You can not  add items to an existing order, but you can place a new order for any additional pieces. For more information, <Link href="#" className="underline">view our Orders & Deliveries page</Link>.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'FARFETCH PRICING AND PAYMENT',
    questions: [
      {
        question: 'Why is FARFETCH pricing different?',
        answer: (
          <>
            It's down to our unique business model. At FARFETCH, you're shopping items from our luxury brands and partner boutiques worldwide. Prices are determined by each FARFETCH brand and partner boutique, so the price of the same item may vary depending on where it's coming from and your location. That's also why placing an item in your shopping bag or wishlist won't reserve it at a particular price. Although we don't have any control over price variation, we'll always offer you the best price available to your destination when you place your order. To view the most accurate prices, select your delivery destination on our website.
          </>
        ),
      },
      {
        question: 'Which currencies can I shop in?',
        answer: (
          <>
            This is determined by your delivery destination and will be displayed at checkout before placing your order. If your local currency is unavailable, your order will be charged in USD for a competitive exchange rate.
          </>
        ),
      },
      {
        question: 'When will my card be charged?',
        answer: (
          <>
            If you pay by debit card, cryptocurrency or PayPal, FARFETCH will take payment when you place your order.
          </>
        ),
      },
      {
        question: 'Which payment methods do you accept?',
        answer: (
          <>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Visa</li>
              <li>MasterCard</li>
              <li>Maestro</li>
              <li>American Express</li>
              <li>Discover</li>
              <li>Diners</li>
              <li>JCB</li>
              <li>JDpay (only available in China Mainland)</li>
              <li>PayPal</li>
              <li>Tamara</li>
              <li>Apple Pay</li>
              <li>Afterpay (only available in the United States and Australia)</li>
              <li>Alipay (only available in the United States, Canada, China Mainland, Hong Kong SAR and Macau SAR)</li>
              <li>HB Pay (only available in China Mainland and Hong Kong)</li>
              <li>Klarna (only available* to the US, UK, Germany, Austria, Switzerland, Belgium, Italy, France, Sweden and Netherlands)</li>
              <li>WeChat (only available in China Mainland, Hong Kong SAR and Macau SAR)</li>
              <li>UnionPay</li>
              <li>iDEAL (only available in the Netherlands)</li>
              <li>Boleto (only available in Brazil)</li>
              <li>Cryptocurrency (<Link href="#" className="underline">the full list of valid cryptocurrencies can be found here</Link>)</li>
            </ul>
            <p className="mt-3">
              In selected countries, we accept payment with Klarna, Afterpay and Tamara.
            </p>
            <p className="mt-2">
              We only accept credit card instalments as payment in Brazil and Mexico.
            </p>
            <p className="mt-2">
              Maximum spends: France (1500 EUR), Italy (2000 EUR), United Kingdom (£1500), United States ($1500), Germany, Austria, Switzerland and Belgium (5000 EUR/CHF), Sweden (16500 SEK), Netherlands (1500 EUR).
            </p>
            <p className="mt-2">
              *CA resident loans made or arranged pursuant to a California Financing Law license.
            </p>
            <p className="mt-2">
              For your safety, security checks are taken on all payments made to us at the time of purchase.
            </p>
          </>
        ),
      },
      {
        question: 'Will my personal details stay safe?',
        answer: (
          <>
            Absolutely. We keep your personal data private and confidential and only share it with your consent or if legally permitted to. For further details, <Link href="#" className="underline">view the FARFETCH Privacy Policy</Link>.
          </>
        ),
      },
    ],
  },
  {
    title: 'PRODUCT AVAILABILITY, AUTHENTICITY AND PRE-OWNED ITEMS',
    questions: [
      {
        question: 'Are you going to have my size again?',
        answer: (
          <>
            To be notified about a sold out item being back in stock, go to the product information page. Select your size on the dropdown menu and choose <strong>size missing</strong>, then enter your email address and the size you need.
          </>
        ),
      },
      {
        question: 'Can I reserve an item to buy later?',
        answer: (
          <>
            We aim to provide a fair opportunity to shop our most in-demand styles and as items are often limited, we don't offer reservations.
          </>
        ),
      },
      {
        question: 'Are FARFETCH items guaranteed authentic?',
        answer: (
          <>
            Our offering is expertly curated by the best luxury fashion brands and boutiques around the globe and all our items are guaranteed authentic.
          </>
        ),
      },
      {
        question: 'How will my order be packaged?',
        answer: (
          <>
            Your order will be carefully prepared in a protective FARFETCH package. If the designer has provided any branded boxes, dust bags or cases, these will also be included.
          </>
        ),
      },
      {
        question: 'Do your pre-owned items come in different conditions?',
        answer: (
          <>
            Yes, our pre-owned items come in the following conditions:
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li><strong>Unworn with tags:</strong> previously owned but never been used and in original condition. This item comes with its original tags.</li>
              <li><strong>Unworn:</strong> previously owned but never been used and in original condition. This item comes without its original tags.</li>
              <li><strong>Excellent:</strong> previously owned and worn, but like new or with almost no signs of use. This item is still in almost perfect condition with no defects.</li>
              <li><strong>Good:</strong> previously owned and worn with some signs of use. This item may have some fading (of material or plating), patina or scratches.</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    title: 'DELIVERY, DUTIES AND TAXES',
    questions: [
      {
        question: 'How much will I be charged for delivery?',
        answer: (
          <>
            Delivery fees vary by size, weight, and destination. We offer a <strong>One Delivery Fee</strong> for orders above a certain threshold, allowing you to order multiple items from different locations for one fee. The delivery fee is shown at checkout before you place your order.
          </>
        ),
      },
      {
        question: 'When will I receive my item and how can I track delivery?',
        answer: (
          <>
            Orders are sent within 2 business days of confirmation. Delivery takes 2-7 business days, depending on your location and the delivery method selected. Items from multiple FARFETCH brands and boutiques arrive separately.
            <p className="mt-2">
              Tracking information and estimated delivery dates are sent via email. You can track your order via <strong>Orders & Returns</strong> in your account, or if you placed an order as a guest, <Link href="#" className="underline">track your guest order here</Link>.
            </p>
          </>
        ),
      },
      {
        question: 'Will I need to pay duties and taxes?',
        answer: (
          <>
            FARFETCH ships to specific destinations on a <strong>Delivery Duties Paid (DDP)</strong> basis, meaning duties and taxes are included in the final price. This applies to: European Union, UK, USA, Canada, China Mainland, Australia, New Zealand, and other selected regions.
            <p className="mt-2">
              For <strong>Delivery At Place (DAP)</strong> destinations, import duties and sales taxes are excluded from the FARFETCH price, and you must pay them directly to the courier upon delivery.
            </p>
            <p className="mt-2">
              For US customers, FARFETCH does not collect sales or use tax in all states. Your purchases may be subject to sales/use tax unless exempt. Many states require end-of-year filing for untaxed purchases.
            </p>
            <p className="mt-2">
              For more details, contact your local customs office or <Link href="#" className="underline">view our Duties and Taxes information</Link>.
            </p>
          </>
        ),
      },
      {
        question: 'Why can\'t certain items be delivered to me?',
        answer: (
          <>
            FARFETCH delivers internationally, but item distribution can be restricted by brands or local customs regulations. If you have questions about why a specific item cannot be delivered to your location, please contact our <strong>global Customer Service team</strong>.
          </>
        ),
      },
      {
        question: 'I didn\'t receive my invoice with my order. Where can I find it?',
        answer: (
          <>
            Invoices are removed from orders for sustainability purposes. You can download a digital invoice by signing into your account and accessing your order details, or if you placed an order as a guest, <Link href="#" className="underline">enter your guest order details here</Link>.
          </>
        ),
      },
    ],
  },
  {
    title: 'RETURNS AND REFUNDS',
    questions: [
      {
        question: 'What is FARFETCH\'s returns policy?',
        answer: (
          <>
            We offer a refund on any items returned to us within 30 days of the delivery date, excluding any delivery costs. You can use our <strong>Free Collection service</strong> to return any unwanted items.
            <p className="mt-2">
              If you have used cryptocurrency to pay for your order and you wish to return the items for a refund, you can follow the return procedure outlined below within 30 days from the date you placed your order. Once your return has been accepted by our brand or partner boutique, your refund will be processed by TripleA in the original cryptocurrency at the current exchange rate.
            </p>
            <p className="mt-2">
              Our payment provider will use the email address you provided at checkout and email you as soon as your refund has been processed. Once a refund is successfully claimed by you, the crypto should return to your wallet within the same business day depending on how congested blockchain is.
            </p>
            <p className="mt-2">
              To start a return, go to <strong>Orders & Returns</strong> in your account, or if you placed your order as a guest, <Link href="#" className="underline">enter your guest order details here</Link>.
            </p>
            <p className="mt-2">
              It's best to book your collection within 7 days of delivery — this is to make sure your package arrives within the required time frame. We are unable to process exchanges and all returned items must be unworn, undamaged and unused, with all tags attached. All designer boxes or cases that came with your order must be included with your return. If anything is damaged or missing from your return, you may not receive your refund. <Link href="#" className="underline">Read the full Returns Policy here</Link>.
            </p>
          </>
        ),
      },
      {
        question: 'How do I book a free collection or return in store?',
        answer: (
          <>
            To request a return, go to <strong>Orders & Returns</strong> if you have an account, or if you placed your order as a guest, <Link href="#" className="underline">enter your guest order details here</Link>.
            <p className="mt-2">
              For our <strong>Free Collection service</strong>, select courier collection and choose a collection date. We'll then send you a confirmation email with the next steps. Need to reschedule your collection? You can also do this in <strong>Orders & Returns</strong> in your account.
            </p>
            <p className="mt-2">
              If you would prefer to drop off your return, select drop-off instead. Prepare your package with the return documents and take it to your chosen location along with your return confirmation email.
            </p>
          </>
        ),
      },
      {
        question: 'How do I return my item?',
        answer: (
          <>
            <strong>Here's what you need to do:</strong>
            <p className="mt-2">
              Go to <strong>Orders & Returns</strong> if you have an account. If you placed your order as a guest, <Link href="#" className="underline">enter your guest order details here</Link>.
            </p>
            <p className="mt-2">
              Find the order you want to return and click <strong>Return Item(s)</strong>.
            </p>
            <p className="mt-2">
              Select each item and your reason for returning.
            </p>
            <p className="mt-2">
              There are two ways to return your items. Depending on your location, one will always be available.
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-2 ml-4">
              <li><strong>Book a free returns collection</strong> - Select your collection address and number of packages, schedule a collection date, suitable time and click <strong>Book Collection</strong>.</li>
              <li><strong>Return for free at a drop-off point near you</strong> - Select the in-store or drop-off option in your account and take the return to your chosen FARFETCH partner boutique or courier drop-off point.</li>
            </ol>
            <p className="mt-2">
              <strong>Prepare your return:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
              <li>Place the item inside the FARFETCH packaging - do not forget any brand boxes, dust bags, or cases</li>
              <li>Attach your Return Label to the outside of the FARFETCH packaging</li>
              <li>If you received a Return Note with your order, attach it to the outside of your package</li>
              <li>Give the Waybill Doc to the courier. Make a note of the Waybill Number to track your return</li>
              <li>When your package is collected or dropped off, make sure you ask the courier to scan the label so you can track your return</li>
            </ol>
            <p className="mt-2">
              Returns from different brands or partner boutiques received individually should be packaged separately and the correct Return Label attached to the outside of each FARFETCH package.
            </p>
          </>
        ),
      },
      {
        question: 'How do I package my item for return?',
        answer: (
          <>
            <strong>Follow these steps to prepare your item:</strong>
            <ol className="list-decimal list-inside space-y-2 ml-4 mt-2">
              <li>Place any unwanted items, along with any brand boxes or cases that came with your order, inside the reusable FARFETCH packaging</li>
              <li>Attach the Return Label and a signed copy of the Return Note to the outside of the FARFETCH packaging. Please do not attach any labels to the designer box or cases that came with your order</li>
              <li>If you are returning to multiple locations, please pack the items separately and attach the corresponding Return Label to the outside of each package</li>
            </ol>
            <p className="mt-2">
              <Link href="#" className="underline">Find out more about preparing your package for return here</Link>.
            </p>
            <p className="mt-2">
              We recommend returning your item in the reusable FARFETCH package provided, but if you re unable to do that, please find a suitable box so that items are returned in perfect condition. Items must be returned undamaged and unused, with all tags attached, including original packaging and branded boxes.
            </p>
            <p className="mt-2">
              Yes, your courier may be able to collect multiple packages. If you re returning items to multiple FARFETCH brands or partner boutiques, you'll still need to request a separate collection for each package in your account. If you placed your order as a guest, <Link href="#" className="underline">enter your guest order details here</Link>.
            </p>
          </>
        ),
      },
      {
        question: 'When will I receive my refund?',
        answer: (
          <>
            You can track your return by using the tracking number assigned to your Return Label. Once your return has been received by our brand or partner boutique, it can take up to 6 calendar days to process. As soon as it's accepted, we'll send you a confirmation email.
            <p className="mt-2">
              Your refund will be processed to your original payment method. This can take up to 14 days to show in your account, depending on your payment provider.
            </p>
            <p className="mt-2">
              <strong>I want to return my order but I need my invoice for customs clearance. Will it still be included in my order?</strong>
            </p>
            <p className="mt-2">
              Yes – invoices for customs clearance will still be included in your FARFETCH order. When you're preparing your return, you'll need to include the Return Note outside the FARFETCH package.
            </p>
          </>
        ),
      },
      {
        question: 'Will delivery costs & duties be refunded on return?',
        answer: (
          <>
            While we offer a Free Collection service for all returns, the original delivery cost wont be included in your refund. If you placed an order to a <strong>Delivery At Place (DAP)</strong> destination, taxes and duties are non-refundable through FARFETCH. You may be able to recover these by contacting your local customs office directly. If you placed an order to a <strong>Delivery Duties Paid (DDP)</strong> destination, taxes and duties are refundable through FARFETCH.
          </>
        ),
      },
      {
        question: 'Can I return my made-to-order item?',
        answer: (
          <>
            We are unable to accept returns as customised items are created to your specification.
          </>
        ),
      },
    ],
  },
  {
    title: 'PRE-ORDER',
    questions: [
      {
        question: 'How does pre-ordering work?',
        answer: 'Pre-order allows you to reserve items that are not yet available. You\'ll be charged when the item ships, and you\'ll receive an estimated delivery date at checkout.',
      },
    ],
  },
  {
    title: 'SIZE AND FIT',
    questions: [
      {
        question: 'What is your size guide?',
        answer: 'We provide detailed size guides for each product category. You can find size charts on individual product pages. If you need assistance finding the right size, our customer service team is happy to help.',
      },
      {
        question: 'What if an item doesn\'t fit?',
        answer: 'If an item doesn\'t fit, you can return it within 30 days of delivery. Items must be unworn and in original condition with tags attached.',
      },
    ],
  },
  {
    title: 'PROMOTIONS',
    questions: [
      {
        question: 'How do I use a promotion code?',
        answer: 'Enter your promotion code at checkout in the designated field. The discount will be applied to your order before you complete payment.',
      },
      {
        question: 'Do you offer student discounts?',
        answer: 'Yes, we offer student discounts through our partnership with UNIDAYS. Students can verify their status and receive exclusive discounts on eligible items.',
      },
    ],
  },
  {
    title: 'EUROPEAN UNION DIGITAL SERVICES ACT ("DSA")',
    questions: [
      {
        question: 'What is the DSA?',
        answer: 'The Digital Services Act (DSA) is EU legislation that sets out rules for digital services. FARFETCH complies with all DSA requirements.',
      },
    ],
  },
  {
    title: 'TAX STRATEGY',
    questions: [
      {
        question: 'What is FARFETCH\'s tax strategy?',
        answer: 'FARFETCH is committed to responsible tax practices and compliance with all applicable tax laws in the jurisdictions where we operate.',
      },
    ],
  },
  {
    title: 'FASHION CONCIERGE',
    questions: [
      {
        question: 'What is Fashion Concierge?',
        answer: 'Fashion Concierge is our personalized shopping service that connects you with a dedicated stylist who can help you find the perfect pieces for your wardrobe.',
      },
    ],
  },
];

const navigationLinks = [
  { href: '/contact-us', label: 'Contact us' },
  { href: '#', label: 'How to shop' },
  { href: '#', label: 'Orders and delivery' },
  { href: '#', label: 'Payment and pricing' },
  { href: '#', label: 'Cryptocurrency Payments' },
  { href: '#', label: 'Returns and refunds' },
  { href: '/faq', label: 'FAQs' },
  { href: '#', label: 'Terms and conditions' },
  { href: '#', label: 'Privacy policy' },
  { href: '#', label: 'Modern slavery statement' },
  { href: '#', label: 'Accessibility' },
  { href: '#', label: 'Cookie preferences' },
  { href: '#', label: 'Promotions terms & conditions' },
];

const FAQ = () => {
  const pathname = usePathname();
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  const toggleCategory = (index: number) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-(--color-preto)">
      <div className="max-w-[137rem] mx-auto px-[1.5rem] py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          {/* Left Navigation Menu */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav>
              <ul className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`block py-1 text-sm underline hover:no-underline transition ${
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

          {/* Right Main Content */}
          <main className="flex-1 max-w-4xl lg:ml-12">
            {/* Title */}
            <h1 className="text-3xl md:text-2xl font-thin mb-8 text-(--color-preto)">
              FAQs
            </h1>

            {/* FAQ Categories */}
            <div className="space-y-0">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="border-b border-gray-200">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(categoryIndex)}
                    className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={openCategoryIndex === categoryIndex}
                  >
                    <span className="font-light  text-sm text-(--color-preto) uppercase tracking-wide">
                      {category.title}
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      {openCategoryIndex === categoryIndex ? (
                        <ChevronUp className="w-4 h-4 text-(--color-preto)" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-(--color-preto)" />
                      )}
                    </div>
                  </button>

                  {/* Category Questions */}
                  {openCategoryIndex === categoryIndex && (
                    <div className="pb-4 px-4">
                      {category.questions.map((item, questionIndex) => (
                        <div key={questionIndex} className="mb-6 last:mb-0">
                          <h3 className="font-semibold text-sm text-(--color-preto) mb-3">
                            {item.question}
                          </h3>
                          <div className="text-sm  font-thin text-(--color-preto) leading-relaxed space-y-2">
                            {typeof item.answer === 'string' ? (
                              <p>{item.answer}</p>
                            ) : (
                              item.answer
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Feedback Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="mb-4">
                <p className="text-xs font-base text-(--color-preto) mb-2">
                  Tell us what you think
                </p>
                <p className="text-2xl font-thin text-(--color-preto) mb-4">
                  Was this content helpful?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setFeedbackHelpful(true)}
                  className={`px-6 py-2 text-sm  font-semibold border border-[var(--color-preto)] transition-colors ${
                    feedbackHelpful === true
                      ? 'bg-[var(--color-preto)] text-white'
                      : 'bg-white text-[var(--color-preto)] hover:bg-gray-50'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setFeedbackHelpful(false)}
                  className={`px-6 py-2 text-sm  font-semibold border border-[var(--color-preto)] transition-colors ${
                    feedbackHelpful === false
                      ? 'bg-[var(--color-preto)] text-white'
                      : 'bg-white text-[var(--color-preto)] hover:bg-gray-50'
                  }`}
                >
                  Not really
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
