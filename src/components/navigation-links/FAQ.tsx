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

interface FAQCategory {
  title: string;
  questions: {
    question: string;
    answer: string | React.ReactNode;
  }[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "HOW TO SHOP AND PLACE AN ORDER",
    questions: [
      {
        question: "Do I need an account to place an order?",
        answer: (
          <>
            No, all you need is an email address to place and track orders. To
            checkout faster, access your wishlist and order updates, we
            recommend setting up a <strong>FARFETCH account</strong>. If you
            create a <strong>FARFETCH account</strong> and place an order, you
            will be automatically enrolled in our loyalty programme,{" "}
            <strong>Access</strong>. Every piece you buy takes you one step
            closer to unlocking exclusive rewards – from early sale access and
            priority customer care to unlimited free shipping and a dedicated
            personal stylist.
            <p className="mt-2">
              <Link href="#" className="underline">
                Learn more about our Access loyalty programme
              </Link>
            </p>
          </>
        ),
      },
      {
        question: "I've forgotten my password, what should I do?",
        answer: (
          <>
            Follow the <strong>forgot your password</strong> link on our Sign In
            page and enter your email address. You will then receive an email to
            reset your password.
          </>
        ),
      },
      {
        question: "How do I receive FARFETCH email updates?",
        answer: (
          <>
            Stay informed of new arrivals, trends and exclusive promotions by
            entering your email address at the bottom of our homepage. You can
            manage your email preferences in your account.
          </>
        ),
      },
      {
        question: "How do I place an order on your website?",
        answer: (
          <>
            <strong>Here is how:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-2 ml-4">
              <li>
                Choose a category or brand from the top navigation menu or
                search to explore a specific style or brand
              </li>
              <li>
                Select your desired item and click <strong>Add To Bag</strong>.
                Once youve added all items, its time to checkout
              </li>
              <li>
                Sign in to your account or, if you ve not yet created one,
                continue via guest checkout
              </li>
            </ol>
            <p className="mt-2">
              Enter your address, payment method and delivery details to place
              your order. We will confirm the order and it will be carefully
              prepared and sent to you, with updates every step of the way.
            </p>
          </>
        ),
      },
      {
        question: "Can I place an order over the phone?",
        answer: (
          <>
            Sure. Our global Customer Service advisors are happy to assist you
            with this.
          </>
        ),
      },
      {
        question: "Can I cancel my FARFETCH order or make changes to it?",
        answer: (
          <>
            Yes, you may be able to cancel some items before we prepare your
            order. Head to <strong>Orders & Returns</strong>, or if you placed
            an order as a guest and want to make changes,{" "}
            <Link href="#" className="underline">
              enter your guest order details here
            </Link>
            .
            <p className="mt-2">
              You can not add items to an existing order, but you can place a
              new order for any additional pieces. For more information,{" "}
              <Link href="#" className="underline">
                view our Orders & Deliveries page
              </Link>
              .
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "FARFETCH PRICING AND PAYMENT",
    questions: [
      {
        question: "Why is FARFETCH pricing different?",
        answer: (
          <>
            It is down to our unique business model. At FARFETCH, you are
            shopping items from our luxury brands and partner boutiques
            worldwide. Prices are determined by each FARFETCH brand and partner
            boutique, so the price of the same item may vary depending on where
            it is coming from and your location. That is also why placing an
            item in your shopping bag or wishlist wont reserve it at a
            particular price. Although we do not have any control over price
            variation, we will always offer you the best price available to your
            destination when you place your order. To view the most accurate
            prices, select your delivery destination on our website.
          </>
        ),
      },
      {
        question: "Which currencies can I shop in?",
        answer: (
          <>
            This is determined by your delivery destination and will be
            displayed at checkout before placing your order. If your local
            currency is unavailable, your order will be charged in USD for a
            competitive exchange rate.
          </>
        ),
      },
      {
        question: "When will my card be charged?",
        answer: (
          <>
            If you pay by debit card, cryptocurrency or PayPal, FARFETCH will
            take payment when you place your order.
          </>
        ),
      },
      {
        question: "Which payment methods do you accept?",
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
              <li>
                Afterpay (only available in the United States and Australia)
              </li>
              <li>
                Alipay (only available in the United States, Canada, China
                Mainland, Hong Kong SAR and Macau SAR)
              </li>
              <li>HB Pay (only available in China Mainland and Hong Kong)</li>
              <li>
                Klarna (only available* to the US, UK, Germany, Austria,
                Switzerland, Belgium, Italy, France, Sweden and Netherlands)
              </li>
              <li>
                WeChat (only available in China Mainland, Hong Kong SAR and
                Macau SAR)
              </li>
              <li>UnionPay</li>
              <li>iDEAL (only available in the Netherlands)</li>
              <li>Boleto (only available in Brazil)</li>
              <li>
                Cryptocurrency (
                <Link href="#" className="underline">
                  the full list of valid cryptocurrencies can be found here
                </Link>
                )
              </li>
            </ul>
            <p className="mt-3">
              In selected countries, we accept payment with Klarna, Afterpay and
              Tamara.
            </p>
            <p className="mt-2">
              We only accept credit card instalments as payment in Brazil and
              Mexico.
            </p>
            <p className="mt-2">
              Maximum spends: France (1500 EUR), Italy (2000 EUR), United
              Kingdom (£1500), United States ($1500), Germany, Austria,
              Switzerland and Belgium (5000 EUR/CHF), Sweden (16500 SEK),
              Netherlands (1500 EUR).
            </p>
            <p className="mt-2">
              *CA resident loans made or arranged pursuant to a California
              Financing Law license.
            </p>
            <p className="mt-2">
              For your safety, security checks are taken on all payments made to
              us at the time of purchase.
            </p>
          </>
        ),
      },
      {
        question: "Will my personal details stay safe?",
        answer: (
          <>
            Absolutely. We keep your personal data private and confidential and
            only share it with your consent or if legally permitted to. For
            further details,{" "}
            <Link href="#" className="underline">
              view the FARFETCH Privacy Policy
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "PRODUCT AVAILABILITY, AUTHENTICITY AND PRE-OWNED ITEMS",
    questions: [
      {
        question: "Are you going to have my size again?",
        answer: (
          <>
            To be notified about a sold out item being back in stock, go to the
            product information page. Select your size on the dropdown menu and
            choose <strong>size missing</strong>, then enter your email address
            and the size you need.
          </>
        ),
      },
      {
        question: "Can I reserve an item to buy later?",
        answer: (
          <>
            We aim to provide a fair opportunity to shop our most in-demand
            styles and as items are often limited, we do not offer reservations.
          </>
        ),
      },
      {
        question: "Are FARFETCH items guaranteed authentic?",
        answer: (
          <>
            Our offering is expertly curated by the best luxury fashion brands
            and boutiques around the globe and all our items are guaranteed
            authentic.
          </>
        ),
      },
      {
        question: "How will my order be packaged?",
        answer: (
          <>
            Your order will be carefully prepared in a protective FARFETCH
            package. If the designer has provided any branded boxes, dust bags
            or cases, these will also be included.
          </>
        ),
      },
      {
        question: "Do your pre-owned items come in different conditions?",
        answer: (
          <>
            Yes, our pre-owned items come in the following conditions:
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>
                <strong>Unworn with tags:</strong> previously owned but never
                been used and in original condition. This item comes with its
                original tags.
              </li>
              <li>
                <strong>Unworn:</strong> previously owned but never been used
                and in original condition. This item comes without its original
                tags.
              </li>
              <li>
                <strong>Excellent:</strong> previously owned and worn, but like
                new or with almost no signs of use. This item is still in almost
                perfect condition with no defects.
              </li>
              <li>
                <strong>Good:</strong> previously owned and worn with some signs
                of use. This item may have some fading (of material or plating),
                patina or scratches.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    title: "DELIVERY, DUTIES AND TAXES",
    questions: [
      {
        question: "How much will I be charged for delivery?",
        answer: (
          <>
            Delivery fees vary by size, weight, and destination. We offer a{" "}
            <strong>One Delivery Fee</strong> for orders above a certain
            threshold, allowing you to order multiple items from different
            locations for one fee. The delivery fee is shown at checkout before
            you place your order.
          </>
        ),
      },
      {
        question: "When will I receive my item and how can I track delivery?",
        answer: (
          <>
            Orders are sent within 2 business days of confirmation. Delivery
            takes 2-7 business days, depending on your location and the delivery
            method selected. Items from multiple FARFETCH brands and boutiques
            arrive separately.
            <p className="mt-2">
              Tracking information and estimated delivery dates are sent via
              email. You can track your order via{" "}
              <strong>Orders & Returns</strong> in your account, or if you
              placed an order as a guest,{" "}
              <Link href="#" className="underline">
                track your guest order here
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        question: "Will I need to pay duties and taxes?",
        answer: (
          <>
            FARFETCH ships to specific destinations on a{" "}
            <strong>Delivery Duties Paid (DDP)</strong> basis, meaning duties
            and taxes are included in the final price. This applies to: European
            Union, UK, USA, Canada, China Mainland, Australia, New Zealand, and
            other selected regions.
            <p className="mt-2">
              For <strong>Delivery At Place (DAP)</strong> destinations, import
              duties and sales taxes are excluded from the FARFETCH price, and
              you must pay them directly to the courier upon delivery.
            </p>
            <p className="mt-2">
              For US customers, FARFETCH does not collect sales or use tax in
              all states. Your purchases may be subject to sales/use tax unless
              exempt. Many states require end-of-year filing for untaxed
              purchases.
            </p>
            <p className="mt-2">
              For more details, contact your local customs office or{" "}
              <Link href="#" className="underline">
                view our Duties and Taxes information
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        question: "Why can't certain items be delivered to me?",
        answer: (
          <>
            FARFETCH delivers internationally, but item distribution can be
            restricted by brands or local customs regulations. If you have
            questions about why a specific item cannot be delivered to your
            location, please contact our{" "}
            <strong>global Customer Service team</strong>.
          </>
        ),
      },
      {
        question:
          "I didn't receive my invoice with my order. Where can I find it?",
        answer: (
          <>
            Invoices are removed from orders for sustainability purposes. You
            can download a digital invoice by signing into your account and
            accessing your order details, or if you placed an order as a guest,{" "}
            <Link href="#" className="underline">
              enter your guest order details here
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "RETURNS AND REFUNDS",
    questions: [
      {
        question: "What is FARFETCH's returns policy?",
        answer: (
          <>
            We offer a refund on any items returned to us within 30 days of the
            delivery date, excluding any delivery costs. You can use our{" "}
            <strong>Free Collection service</strong> to return any unwanted
            items.
            <p className="mt-2">
              If you have used cryptocurrency to pay for your order and you wish
              to return the items for a refund, you can follow the return
              procedure outlined below within 30 days from the date you placed
              your order. Once your return has been accepted by our brand or
              partner boutique, your refund will be processed by TripleA in the
              original cryptocurrency at the current exchange rate.
            </p>
            <p className="mt-2">
              Our payment provider will use the email address you provided at
              checkout and email you as soon as your refund has been processed.
              Once a refund is successfully claimed by you, the crypto should
              return to your wallet within the same business day depending on
              how congested blockchain is.
            </p>
            <p className="mt-2">
              To start a return, go to <strong>Orders & Returns</strong> in your
              account, or if you placed your order as a guest,{" "}
              <Link href="#" className="underline">
                enter your guest order details here
              </Link>
              .
            </p>
            <p className="mt-2">
              It is best to book your collection within 7 days of delivery —
              this is to make sure your package arrives within the required time
              frame. We are unable to process exchanges and all returned items
              must be unworn, undamaged and unused, with all tags attached. All
              designer boxes or cases that came with your order must be included
              with your return. If anything is damaged or missing from your
              return, you may not receive your refund.{" "}
              <Link href="#" className="underline">
                Read the full Returns Policy here
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        question: "How do I book a free collection or return in store?",
        answer: (
          <>
            To request a return, go to <strong>Orders & Returns</strong> if you
            have an account, or if you placed your order as a guest,{" "}
            <Link href="#" className="underline">
              enter your guest order details here
            </Link>
            .
            <p className="mt-2">
              For our <strong>Free Collection service</strong>, select courier
              collection and choose a collection date. We will then send you a
              confirmation email with the next steps. Need to reschedule your
              collection? You can also do this in{" "}
              <strong>Orders & Returns</strong> in your account.
            </p>
            <p className="mt-2">
              If you would prefer to drop off your return, select drop-off
              instead. Prepare your package with the return documents and take
              it to your chosen location along with your return confirmation
              email.
            </p>
          </>
        ),
      },
      {
        question: "How do I return my item?",
        answer: (
          <>
            <strong>Here is what you need to do:</strong>
            <p className="mt-2">
              Go to <strong>Orders & Returns</strong> if you have an account. If
              you placed your order as a guest,{" "}
              <Link href="#" className="underline">
                enter your guest order details here
              </Link>
              .
            </p>
            <p className="mt-2">
              Find the order you want to return and click{" "}
              <strong>Return Item(s)</strong>.
            </p>
            <p className="mt-2">
              Select each item and your reason for returning.
            </p>
            <p className="mt-2">
              There are two ways to return your items. Depending on your
              location, one will always be available.
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-2 ml-4">
              <li>
                <strong>Book a free returns collection</strong> - Select your
                collection address and number of packages, schedule a collection
                date, suitable time and click <strong>Book Collection</strong>.
              </li>
              <li>
                <strong>Return for free at a drop-off point near you</strong> -
                Select the in-store or drop-off option in your account and take
                the return to your chosen FARFETCH partner boutique or courier
                drop-off point.
              </li>
            </ol>
            <p className="mt-2">
              <strong>Prepare your return:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
              <li>
                Place the item inside the FARFETCH packaging - do not forget any
                brand boxes, dust bags, or cases
              </li>
              <li>
                Attach your Return Label to the outside of the FARFETCH
                packaging
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
                When your package is collected or dropped off, make sure you ask
                the courier to scan the label so you can track your return
              </li>
            </ol>
            <p className="mt-2">
              Returns from different brands or partner boutiques received
              individually should be packaged separately and the correct Return
              Label attached to the outside of each FARFETCH package.
            </p>
          </>
        ),
      },
      {
        question: "How do I package my item for return?",
        answer: (
          <>
            <strong>Follow these steps to prepare your item:</strong>
            <ol className="list-decimal list-inside space-y-2 ml-4 mt-2">
              <li>
                Place any unwanted items, along with any brand boxes or cases
                that came with your order, inside the reusable FARFETCH
                packaging
              </li>
              <li>
                Attach the Return Label and a signed copy of the Return Note to
                the outside of the FARFETCH packaging. Please do not attach any
                labels to the designer box or cases that came with your order
              </li>
              <li>
                If you are returning to multiple locations, please pack the
                items separately and attach the corresponding Return Label to
                the outside of each package
              </li>
            </ol>
            <p className="mt-2">
              <Link href="#" className="underline">
                Find out more about preparing your package for return here
              </Link>
              .
            </p>
            <p className="mt-2">
              We recommend returning your item in the reusable FARFETCH package
              provided, but if you re unable to do that, please find a suitable
              box so that items are returned in perfect condition. Items must be
              returned undamaged and unused, with all tags attached, including
              original packaging and branded boxes.
            </p>
            <p className="mt-2">
              Yes, your courier may be able to collect multiple packages. If you
              re returning items to multiple FARFETCH brands or partner
              boutiques, you will still need to request a separate collection
              for each package in your account. If you placed your order as a
              guest,{" "}
              <Link href="#" className="underline">
                enter your guest order details here
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        question: "When will I receive my refund?",
        answer: (
          <>
            You can track your return by using the tracking number assigned to
            your Return Label. Once your return has been received by our brand
            or partner boutique, it can take up to 6 calendar days to process.
            As soon as it is accepted, we will send you a confirmation email.
            <p className="mt-2">
              Your refund will be processed to your original payment method.
              This can take up to 14 days to show in your account, depending on
              your payment provider.
            </p>
            <p className="mt-2">
              <strong>
                I want to return my order but I need my invoice for customs
                clearance. Will it still be included in my order?
              </strong>
            </p>
            <p className="mt-2">
              Yes – invoices for customs clearance will still be included in
              your FARFETCH order. When you are preparing your return, you will
              need to include the Return Note outside the FARFETCH package.
            </p>
          </>
        ),
      },
      {
        question: "Will delivery costs & duties be refunded on return?",
        answer: (
          <>
            While we offer a Free Collection service for all returns, the
            original delivery cost wont be included in your refund. If you
            placed an order to a <strong>Delivery At Place (DAP)</strong>{" "}
            destination, taxes and duties are non-refundable through FARFETCH.
            You may be able to recover these by contacting your local customs
            office directly. If you placed an order to a{" "}
            <strong>Delivery Duties Paid (DDP)</strong> destination, taxes and
            duties are refundable through FARFETCH.
          </>
        ),
      },
      {
        question: "Can I return my made-to-order item?",
        answer: (
          <>
            We are unable to accept returns as customised items are created to
            your specification.
          </>
        ),
      },
    ],
  },
  {
    title: "PRE-ORDER",
    questions: [
      {
        question: "What does pre-order mean?",
        answer:
          "You can get early access to next season's most wanted pieces before they're released.",
      },
      {
        question: "When will my pre-order item arrive?",
        answer:
          "As soon as your item has been released and is ready to be sent, you'll receive an email with the estimated delivery date.",
      },
      {
        question: "When do I have to pay?",
        answer: "Pre-order items require full payment at checkout.",
      },
      {
        question: "Can I cancel a pre-order?",
        answer: (
          <>
            Some of our brands and partner boutiques allow you to cancel an item
            before we prepare your order.
            <p className="mt-2">
              <strong>To cancel your order:</strong>
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-2 ml-4">
              <li>
                Go to <strong>Orders & Returns</strong> if you have an account.
                If you placed an order as a guest,{" "}
                <Link href="#" className="underline">
                  enter your guest order number and email address here
                </Link>
                .
              </li>
              <li>
                Select the items you want to cancel and your reason for
                cancellation.
              </li>
              <li>We will email you confirmation of your cancelled order.</li>
            </ol>
            <p className="mt-2">
              If your order has already been prepared, we can not cancel your
              order — but we do offer a Free Returns service.
            </p>
          </>
        ),
      },
      {
        question: "Can I change my delivery address?",
        answer:
          "Go to Order Details in your FARFETCH account to check if you can change your address. You may not be able to if your item has already been sent.",
      },
      {
        question: "Are pre-order items refundable?",
        answer: (
          <>
            Yes, just make sure items meet the conditions of our{" "}
            <Link href="#" className="underline">
              Returns Policy
            </Link>
            .
          </>
        ),
      },
      {
        question: "Will pre-order items be delivered with my other orders?",
        answer:
          "No, they will be delivered separately according to the expected release date.",
      },
      {
        question: "Is there a limit on purchasing pre-order items?",
        answer:
          "There may be order limits on some pre-order items. This is so everyone has a chance to get the items they love.",
      },
    ],
  },
  {
    title: "SIZE AND FIT",
    questions: [
      {
        question: "Where can I find size conversion charts?",
        answer: (
          <>
            View our size conversion charts by selecting{" "}
            <strong>Size Guide</strong>, which you can find above the select
            size menu, on the product information page.
          </>
        ),
      },
      {
        question:
          "How can I get a better understanding on how a piece will fit?",
        answer: (
          <>
            Go to the product information page and select the{" "}
            <strong>Size & Fit</strong> tab to view the size, fit, cut and model
            measurements. You can find the material composition and care
            instructions on <strong>The Details</strong> tab.
          </>
        ),
      },
      {
        question: "What's the difference between size, fit, cut and material?",
        answer: (
          <>
            The size of an item refers to the designer size on the label, fit
            describes how the item will fit on the body, cut is the silhouette
            and the material describes what the item is made from. To find this
            information, go to the product information page and view{" "}
            <strong>The Details</strong> and <strong>Size & Fit</strong> tab.
          </>
        ),
      },
      {
        question: "Why do designer sizes vary?",
        answer:
          "International sizes are slightly different when converted and some designers fit larger or smaller than others. That's why we provide specific information for each item.",
      },
      {
        question: "What if my item doesn't fit?",
        answer: (
          <>
            If your item does not fit, you can return it with our free returns
            service. If you like to place another order, you can do this online
            or contact our global{" "}
            <Link href="#" className="underline">
              Customer Service team
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "PROMOTIONS",
    questions: [
      {
        question: "How do I find out about the latest promotions?",
        answer: (
          <>
            To stay updated on exclusive promotions, new in and early sale
            access,{" "}
            <Link href="#" className="underline">
              sign up to our emails
            </Link>
            .
          </>
        ),
      },
      {
        question: "What different types of promotions are there?",
        answer: (
          <>
            You can view all our promotions on the{" "}
            <Link href="#" className="underline">
              Promotion Terms & Conditions page
            </Link>
            . Or if you are an Access member, check your Access dashboard for
            promotional rewards in your account.
          </>
        ),
      },
      {
        question: "How do I apply a promo code?",
        answer: (
          <>
            All you need to do is add your eligible items to your shopping bag.
            Depending on the promo code, it will either be automatically
            applied, or you may have to manually enter it at checkout. If you
            have any questions,{" "}
            <Link href="#" className="underline">
              contact our global Customer Service team
            </Link>
            .
          </>
        ),
      },
      {
        question: "Are there any brands excluded from promotional discounts?",
        answer: (
          <>
            Yes, promotional discounts can only be redeemed on selected brands
            and items. As each FARFETCH promotion is different, we are unable to
            provide a list of excluded brands and items. However, items that are
            labelled or added to the promotions page may be eligible for a
            promotional discount. For more information,{" "}
            <Link href="#" className="underline">
              view the Promotion Terms & Conditions page
            </Link>
            .
          </>
        ),
      },
      {
        question: "How do I know if my item is eligible for a promotion?",
        answer: (
          <>
            Items that are labelled or added to the promotions page may be
            eligible for a promotion. If a minimum spend applies, this must be
            spent in a single transaction. For more information,{" "}
            <Link href="#" className="underline">
              view the Promotion Terms & Conditions page
            </Link>
            .
          </>
        ),
      },
      {
        question:
          "The item I want is part of the promotion but my size isn't discounted. Why does this happen?",
        answer:
          "At FARFETCH, you are shopping items from our worldwide selection of luxury brands and partner boutiques. If the size you want is from a brand or partner boutique that isn't participating in our FARFETCH promotion, it will not be discounted.",
      },
      {
        question: "My promo code has expired. Can I request another one?",
        answer:
          "Our Customer Service team are unable to reactivate any promotional discounts. Promotional discounts and promotional codes are also non-transferable and have no cash alternative.",
      },
      {
        question: "Can I combine two promotions simultaneously?",
        answer:
          "Some FARFETCH promotions cannot be used simultaneously. If there are two promotional offers available, you'll have to choose which promotion you'd like to apply. If there's a live campaign that's automatically applied at checkout, all you need to do is add your promo code of choice at checkout to overwrite it.",
      },
    ],
  },
  {
    title: 'EUROPEAN UNION DIGITAL SERVICES ACT ("DSA")',
    questions: [
      {
        question:
          "Who is the FARFETCH Legal Representative for the purposes of the DSA?",
        answer: (
          <>
            Farfetch Portugal Unipessoal, Lda is the appointed legal
            representative, pursuant to Article 13 of the EU DSA. Customers,
            Member States competent authorities, the European Commission, and
            the European Board for Digital Services can address their
            communications in relation to the DSA:
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>by email to dsa@farfetch.com</li>
              <li>
                by post to Farfetch at Rua da Lionesa, n°446, Edifício G12
                4465-671, Leça do Balio, Porto - Portugal
              </li>
              <li>by phone at +351 220430530</li>
            </ul>
            <p className="mt-2">
              Please ensure that you clearly indicate your communication relates
              to the DSA and, if possible, kindly provide an English translation
              if the primary language used is not English. If your query is
              urgent, the quickest way to contact us is by email.
            </p>
          </>
        ),
      },
      {
        question:
          "What is the average number of active recipients of services on the FARFETCH Marketplace in the EEA?",
        answer: (
          <>
            Over the past 6 months, the average number of active recipients of
            services on the FARFETCH Marketplace in the EEA is:
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Website: Below 15 million</li>
              <li>App: Below 5 million</li>
            </ul>
          </>
        ),
      },
      {
        question: "Compliance with all laws",
        answer:
          "FARFETCH upholds the highest standard of integrity, which includes requiring that sellers on the FARFETCH Marketplace offer products that comply with rules of applicable European Union laws on product safety and product compliance.",
      },
    ],
  },
  {
    title: "TAX STRATEGY",
    questions: [
      {
        question: "?",
        answer: "you can consult our tax startegy here.",
      },
    ],
  },
  {
    title: "FASHION CONCIERGE",
    questions: [
      {
        question: "What is Fashion Concierge On Demand?",
        answer:
          "Fashion Concierge On Demand is an exclusive service for our premium Farfetch customers. It allows you to request assistance in finding rare, unique, or sold-out fashion items, ranging from elusive jewellery to limited-edition designer pieces. You can access Fashion Concierge through the Membership section on your Farfetch profile.",
      },
      {
        question: "How does Fashion Concierge work?",
        answer:
          "Our dedicated teams in the US, UK, HK, France, and the Middle East work tirelessly to source the items you desire. Depending on your location, you may experience shorter waiting times and more attractive prices. The service caters to a global clientele, ensuring that you can find even the most elusive pieces. All the communication will be made through email after receiving the request.",
      },
      {
        question: "How is pricing determined?",
        answer:
          "Pricing is influenced by the supplier's location. Import taxes and partnerships with luxury brands like Hermès, Chanel, and Goyard may lead to variations in price. While we strive to offer the best value, please be aware that the cost can sometimes exceed the retail price due to these factors.",
      },
      {
        question: "What is the delivery time for Fashion Concierge orders?",
        answer:
          "All items undergo a thorough inspection before delivery, impacting the processing time. The delivery duration depends on the location of the item and the customer. Please expect a longer wait time than usual, as we prioritize the quality and condition of each sourced item.",
      },
      {
        question: "What is the returns policy for Fashion Concierge orders?",
        answer:
          "Returns policies vary based on the brand, supplier, and location. Customers are notified in advance via email about the final sale status of items. It's crucial to read and reply to the communication to confirm agreement. If no response is received, Fashion Concierge will not proceed with the purchase.",
      },
      {
        question: "Can I place pre-orders through Fashion Concierge?",
        answer:
          "Yes, clients can place pre-orders by paying the full amount upfront. Detailed information, including estimated time of arrival, return policy, and price, will be provided before confirming the pre-order.",
      },
      {
        question: "Is there a minimum order value for Fashion Concierge?",
        answer:
          "Fashion Concierge focuses on rare and exceptional pieces with a minimum order value of $1,000. If your request does not meet this criterion, we recommend exploring our exclusive Fashion Concierge edit for a curated collection of exceptional items (available for Platinum, Gold & Private Client tiers).",
      },
      {
        question: "Are there restrictions on perfumes or fragrances?",
        answer:
          "Unfortunately, we cannot fulfill requests for perfumes due to their classification as dangerous, flammable liquids. Courier services often restrict or prohibit the transportation of such items.",
      },
      {
        question: "What about items made from exotic leathers?",
        answer:
          "Items made from exotic leathers require special export documentation, which can take a few weeks. Customs clearance may involve some risk and potential delays, but we handle all necessary procedures to ensure a smooth process.",
      },
      {
        question: "Can items be held for purchase at a later time?",
        answer:
          "No, we are unable to hold any items. To secure your desired pieces, we recommend acting quickly as availability is not guaranteed throughout the sourcing process.",
      },
    ],
  },
];

const navigationLinks: SupportNavLink[] = [
  { href: "/contact-us", label: "Contact us" },
  { href: "#", label: "How to shop" },
  { href: "#", label: "Orders and delivery" },
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

const faqSections: SupportSection[] = faqCategories.map((category) => ({
  title: category.title,
  content: (
    <div className="space-y-6">
      {category.questions.map((item, questionIndex) => (
        <div
          key={`${category.title}-${questionIndex}`}
          className="mb-6 last:mb-0"
        >
          <h3 className="font-semibold text-sm text-(--color-preto) mb-3">
            {item.question}
          </h3>
          <div className="text-sm font-thin text-(--color-preto) leading-relaxed space-y-2">
            {typeof item.answer === "string" ? (
              <p>{item.answer}</p>
            ) : (
              item.answer
            )}
          </div>
        </div>
      ))}
    </div>
  ),
}));

const FAQ = () => {
  const pathname = usePathname();
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(
    null,
  );
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  const toggleCategory = useCallback((index: number) => {
    setOpenCategoryIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleFeedbackChange = useCallback((value: boolean) => {
    setFeedbackHelpful(value);
  }, []);

  const renderedSections = useMemo(
    () =>
      faqSections.map((section, index) => (
        <AccordionSection
          key={section.title}
          section={section}
          index={index}
          isOpen={openCategoryIndex === index}
          onToggle={toggleCategory}
          containerClassName="border-b border-gray-200"
          buttonClassName="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          contentClassName="pb-4 px-4"
        />
      )),
    [openCategoryIndex, toggleCategory],
  );

  return (
    <div
      className="min-h-screen bg-white text-(--color-preto)"
      style={supportPageStyles}
    >
      <div className="max-w-[137rem] mx-auto px-[1.5rem] py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          {/* Left Navigation Menu */}
          <aside className="lg:w-64 flex-shrink-0">
            <SupportNavigation links={navigationLinks} activePath={pathname} />
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 max-w-4xl lg:ml-12">
            {/* Title */}
            <h1 className="text-3xl md:text-2xl font-thin mb-8 text-(--color-preto)">
              FAQs
            </h1>

            {/* FAQ Categories */}
            <div className="space-y-0">{renderedSections}</div>

            <FeedbackPrompt
              helpfulValue={feedbackHelpful}
              onFeedbackChange={handleFeedbackChange}
              containerClassName="mt-13 pt-8"
              titleClassName="text-xs font-base text-(--color-preto) mb-2"
              buttonClassName="px-6 py-2 text-sm font-semibold border border-preto transition-colors"
              activeButtonClassName="bg-preto text-white"
              inactiveButtonClassName="bg-whitetext-(--color-preto) hover:bg-gray-50"
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

export default FAQ;
