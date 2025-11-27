"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";
import DownloadAppBanner from "../department/DownloadAppBanner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const formatCurrency = (value: number, symbol: string) =>
  `${symbol}${value.toFixed(2)}`;

const formatDiscount = (value: number, symbol: string) => {
  if (value === 0) {
    return `${symbol}0.00`;
  }
  return `-${symbol}${Math.abs(value).toFixed(2)}`;
};

const parsePriceValue = (price?: string) => {
  if (!price) return 0;
  const numeric = price.replace(/[^\d.]/g, "");
  const parsed = parseFloat(numeric);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getCurrencySymbol = (price?: string) => {
  if (!price) {
    return "$";
  }
  const match = price.trim().match(/^[^\d\s]+/);
  return match ? match[0] : "$";
};

const getItemPricing = (product: {
  originalPrice?: string;
  discountedPrice?: string;
  price?: string;
  discountPercentage?: string;
}) => {
  const currencySymbol = getCurrencySymbol(
    product.discountedPrice || product.price || product.originalPrice
  );
  const originalValue = parsePriceValue(product.originalPrice);
  const effectiveValue =
    parsePriceValue(product.discountedPrice) ||
    parsePriceValue(product.price) ||
    originalValue;
  const saleSavings =
    originalValue > 0 ? Math.max(originalValue - effectiveValue, 0) : 0;

  return {
    currencySymbol,
    originalValue,
    effectiveValue,
    saleSavings,
  };
};

const ContactSection = () => (
  <>
    <h2 className="text-2xl font-basetext-(--color-preto) mb-3">Contact us</h2>
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1  border border-[var(--theme-border)] rounded-md p-4">
        <div className="mb-2">
          <FaEnvelope className="w-6 h-6text-(--color-preto)" />
        </div>
        <h3 className="text-sm font-basetext-(--color-preto) mb-1 uppercase tracking-wide">
          EMAIL US
        </h3>
        <p className="text-basetext-(--color-preto) mb-1 font-base">
          Get in touch by email
        </p>
        <a
          href="mailto:customerservice@farfetch.com"
          className="text-basetext-(--color-preto) font-base hover:underline"
        >
          customerservice@farfetch.com
        </a>
      </div>
      <div className="flex-1  border border-[var(--theme-border)] rounded-md p-4">
        <div className="mb-2">
          <FaPhone className="w-6 h-6text-(--color-preto)" />
        </div>
        <h3 className="text-sm font-basetext-(--color-preto) mb-1 uppercase tracking-wide">
          ORDER BY PHONE
        </h3>
        <p className="text-basetext-(--color-preto) mb-1 font-base">
          Available Monday to Friday
        </p>
        <a
          href="tel:+16467913768"
          className="text-basetext-(--color-preto) font-base hover:underline"
        >
          +1 646 791 3768
        </a>
      </div>
    </div>
  </>
);

const EmptyCartState = () => {
  const [email, setEmail] = useState("user@gmail.com");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
  };

  return (
    <div className="container mx-auto px-[48px] py-16 max-w-[1440px]">
      <div className="mb-24 max-w-2xl">
        <h1 className="text-4xl font-base text-(--color-preto) mb-3">
          Shopping Bag
        </h1>
        <p className="text-base text-(--color-preto) mb-4 font-base leading-relaxed">
          There&apos;s nothing in your bag yet...
        </p>
        <Link
          href="/"
          className="inline-block bg-(--theme-bg) border border-(--theme-border)  text-(--theme-text) px-5 py-2.5 rounded-md transition-colors font-normal text-sm"
        >
          Shop Women
        </Link>
      </div>

      <div className="mb-24">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 max-w-3xl">
            <h2 className="text-3xl font-basetext-(--color-preto) mb-3">
              Never miss a thing
            </h2>
            <p className="text-basetext-(--color-preto) leading-relaxed font-base">
              Sign up for promotions, tailored new arrivals, stock updates and
              more - straight to your inbox.
            </p>
          </div>

          <div className="flex-1 w-full lg:w-auto lg:max-w-2xl">
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label className="block text-sm font-basetext-(--color-preto) mb-2 uppercase tracking-wide">
                  GET UPDATES BY
                </label>
                <div className="text-basetext-(--color-preto) mb-2 font-base">
                  Email
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-preto text-base  font-normal"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[var(--theme-bg)] text-[var(--theme-text)] border border-[var(--theme-border)] px-6 py-3 rounded-md transition-colors font-normal text-base"
              >
                Sign Up
              </button>
            </form>
            <p className="text-smtext-(--color-preto) mt-4 leading-relaxed font-base max-w-2xl">
              By signing up, you consent to receiving marketing by email
              and/or SMS and acknowledge you
              <br />
              have read our{" "}
              <Link
                href="/privacy-policy"
                className="underline hover:no-underline"
              >
                Privacy Policy
              </Link>
              . Unsubscribe anytime at the bottom of our emails or by replying
              <br />
              STOP to any of our SMS.
            </p>
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

const Cart = () => {
  const { cartItems, removeItem, summary } = useCart();
  const { addToWishlist, isWishlisted } = useWishlist();

  const totals = useMemo(
    () => ({
      subtotal: formatCurrency(summary.subtotal, summary.currencySymbol),
      sale: formatDiscount(summary.sale, summary.currencySymbol),
      promotion: formatDiscount(summary.promotion, summary.currencySymbol),
      delivery: `${summary.currencySymbol}0.00`,
      total: formatCurrency(summary.total, summary.currencySymbol),
    }),
    [summary]
  );

  const currencyLabel =
    summary.currencySymbol === "$"
      ? "USD"
      : summary.currencySymbol === "£"
      ? "GBP"
      : summary.currencySymbol === "€"
      ? "EUR"
      : summary.currencySymbol;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <EmptyCartState />
        <DownloadAppBanner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 lg:px-12 py-14 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="mb-8 space-y-3">
              <h1 className="text-4xl font-light tracking-tight text-(--color-preto)">
                Shopping Bag
              </h1>
              <div className="flex items-center gap-2 border-y border-gray-200 py-3 text-sm text-gray-600">
                <HiOutlineInformationCircle className="w-5 h-5" />
                <span>Import duties are included</span>
              </div>
            </div>

            <div className="space-y-10">
              {cartItems.map((item) => {
                const wishlisted = isWishlisted(item.product.id);
                const { currencySymbol, originalValue, effectiveValue, saleSavings } =
                  getItemPricing(item.product);

                return (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="border-b border-gray-200 pb-10"
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="w-full lg:w-56">
                        <div className="relative w-full h-64 bg-gray-50 rounded-md overflow-hidden">
                          {item.product.image?.src && (
                            <Image
                              src={item.product.image.src}
                              alt={item.product.title}
                              fill
                              sizes="250px"
                              className="object-cover"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xl font-semibold text-(--color-preto)">
                              {item.product.title}
                            </p>
                            {item.product.subtitle && (
                              <p className="text-sm text-gray-600">
                                {item.product.subtitle}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">
                              FARFETCH ID: {item.product.id}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="text-2xl leading-none text-gray-500 hover:text-(--color-preto)"
                            aria-label="Remove item"
                            type="button"
                          >
                            &times;
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1 text-sm text-gray-600">
                            {originalValue > 0 && (
                              <p className="line-through text-gray-500">
                                {formatCurrency(originalValue, currencySymbol)}
                              </p>
                            )}
                            {saleSavings > 0 && (
                              <p>
                                -{formatCurrency(saleSavings, currencySymbol)}{" "}
                                <span className="text-gray-400">
                                  ({item.product.discountPercentage || "Sale savings"})
                                </span>
                              </p>
                            )}
                            <p className="text-2xl font-semibold text-[#d32f2f]">
                              {formatCurrency(effectiveValue, currencySymbol)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Import duties included
                            </p>
                          </div>

                          <div className="space-y-4 text-sm text-(--color-preto)">
                            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-gray-500">
                                  Size
                                </p>
                                <p className="font-medium">{item.size}</p>
                              </div>
                              <button
                                type="button"
                                className="text-sm underline text-gray-600"
                              >
                                Change
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-gray-500">
                                  Quantity
                                </p>
                                <p className="font-medium">{item.quantity}</p>
                              </div>
                              <button
                                type="button"
                                className="text-sm underline text-gray-600"
                              >
                                Change
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <button
                            type="button"
                            className="flex items-center gap-2 text-(--color-preto) hover:opacity-80"
                            onClick={() => {
                              addToWishlist(item.product);
                              removeItem(item.product.id, item.size);
                            }}
                          >
                            <GoHeart
                              className={`w-4 h-4 ${
                                wishlisted ? "fill-(--color-preto)" : ""
                              }`}
                              strokeWidth={1.0}
                            />
                            {wishlisted ? "In wishlist" : "Move to wishlist"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="w-full lg:max-w-sm border border-gray-200 rounded-lg p-6 h-fit sticky top-6">
            <h2 className="text-2xl font-light text-(--color-preto)">Summary</h2>
            <dl className="mt-6 space-y-4 text-sm text-(--color-preto)">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd>{totals.subtotal}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Delivery</dt>
                <dd>{totals.delivery}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Sale</dt>
                <dd>{totals.sale}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Promotion</dt>
                <dd>{totals.promotion}</dd>
              </div>
            </dl>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex items-start justify-between">
                <p className="text-base font-medium text-(--color-preto)">Total</p>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    {currencyLabel}
                  </p>
                  <p className="text-2xl font-semibold text-(--color-preto)">
                    {totals.total}
                  </p>
                  <p className="text-xs text-gray-500">Import duties included</p>
                </div>
              </div>

              <button className="w-full bg-black text-white mt-6 py-3 rounded-md text-sm font-semibold tracking-wide hover:bg-gray-900 transition">
                Go To Checkout
              </button>
            </div>
          </aside>
        </div>

        <div className="mt-16">
          <ContactSection />
        </div>
      </div>
      <DownloadAppBanner />
    </div>
  );
};

export default Cart;
