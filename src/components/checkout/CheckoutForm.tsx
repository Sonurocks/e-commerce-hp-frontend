"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";

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

export default function CheckoutForm() {
  const { cartItems, summary } = useCart();
  const { email } = useCheckout();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: email || "",
    country: "India",
    address: "",
    addressLine2: "",
    city: "",
    county: "",
    postalCode: "",
    phoneCode: "+91",
    phone: "",
    useAsBilling: true,
    optOutNotifications: false,
  });

  // Sync email from context to form
  useEffect(() => {
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [email]); // setFormData is stable from useState, no need to include

  const [showAddressLine2, setShowAddressLine2] = useState(false);
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const totals = useMemo(
    () => ({
      subtotal: formatCurrency(summary.subtotal, summary.currencySymbol),
      sale: formatDiscount(summary.sale, summary.currencySymbol),
      promotion: formatDiscount(summary.promotion, summary.currencySymbol),
      delivery: "Free",
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddressConfirmed(true);
    console.log("Checkout form submitted:", formData);
  };

  const handleEditAddress = () => {
    setIsAddressConfirmed(false);
  };

  const handleEditDelivery = () => {
    // Can be implemented later if needed
  };

  // Calculate estimated delivery date (3-6 days from now)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 3);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 6);
    
    const formatDate = (date: Date) => {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      return `${day} ${month}`;
    };
    
    return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Your cart is empty</h1>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12 py-4 max-w-[1440px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiPhone className="w-4 h-4" />
              <span>Need help?</span>
              <a href="tel:+16467913768" className="hover:underline">
                +1 646 791 3768
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-8 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Column - Delivery Address Form or Confirmed View */}
          <div className="flex-1  max-w-full">
            {!isAddressConfirmed ? (
              <>
                <h1 className="text-3xl font-light mb-2">Delivery Address</h1>
                <p className="text-base text-gray-600 mb-6">Add your delivery address</p>
                <p className="text-xs text-gray-500 mb-6">*Required fields</p>

                <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-preto px-4 py-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-preto px-4 py-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border bg-gray-100 border-gray-100 px-4 py-3 rounded-md focus:outline-none focus:border-black"
                  placeholder="admin@example.com"
                />
              </div>

              {/* Notifications Checkbox */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="optOutNotifications"
                  id="optOutNotifications"
                  checked={formData.optOutNotifications}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <label
                  htmlFor="optOutNotifications"
                  className="text-sm text-gray-600"
                >
                  We&apos;ll notify you about promotions, tailored new arrivals
                  and stock updates. Tick the box to opt-out.
                </label>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Country/region <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-preto px-4 py-3 rounded-md focus:outline-none focus:border-black appearance-none bg-white"
                  >
                    <option value="India">India (USD$)</option>
                    <option value="United States">United States (USD$)</option>
                    <option value="United Kingdom">United Kingdom (GBP£)</option>
                    <option value="Germany">Germany (EUR€)</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-preto px-4 py-3 rounded-md focus:outline-none focus:border-black"
                  placeholder="Start typing to search your address"
                />
              </div>

              {showAddressLine2 ? (
                <div>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full border border-preto px-4 py-3 rounded-md focus:outline-none focus:border-black"
                    placeholder="Apartment, suite, etc."
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddressLine2(true)}
                  className="text-sm text-gray-600 underline hover:no-underline"
                >
                  Add another line
                </button>
              )}

              {/* City, County, Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-preto px-4 py-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">County</label>
                  <input
                    type="text"
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    className="w-full border border-preto px-4 py-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Postal or zip code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-preto px-4 py-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="w-full md:w-[622px]">
                <label className="block text-sm font-medium mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 w-full">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                    className="border border-preto px-2 md:px-1 py-3 rounded-md focus:outline-none focus:border-black flex-shrink-0 min-w-[100px] md:min-w-auto"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+49">🇩🇪 +49</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="flex-1 min-w-0 border border-preto px-4 py-3 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Required to ensure a successful delivery
                </p>
              </div>

              {/* Billing Address Checkbox */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="useAsBilling"
                  id="useAsBilling"
                  checked={formData.useAsBilling}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <label htmlFor="useAsBilling" className="text-sm text-gray-600">
                  Use as billing address
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full md:w-[300px] bg-black text-white py-3 px-10 rounded-md text-sm font-semibold tracking-wide hover:bg-gray-900 transition"
                >
                  Confirm Delivery Address
                </button>
              </div>
                </form>

                {/* Delivery Method Section - Placeholder */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-light text-gray-400 mb-2">Delivery Method</h2>
                  <p className="text-sm text-gray-400 font-light">
                    Add your delivery address to show delivery method
                  </p>
                </div>

                {/* Payment Section - Placeholder */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-light text-gray-400 mb-2">Payment</h2>
                  <p className="text-sm text-gray-400 font-light">
                    Confirm your delivery details to select payment method
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Confirmed Delivery Address Section */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <FiCheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>
                        <div className="space-y-1 text-sm text-gray-700">
                          <p className="font-medium">
                            {formData.firstName.toUpperCase()} {formData.lastName.toUpperCase()}
                          </p>
                          <p>
                            {formData.address}
                            {formData.addressLine2 && `, ${formData.addressLine2}`}
                            {formData.city && `, ${formData.city}`}
                            {formData.county && `, ${formData.county}`}
                          </p>
                          <p>
                            {formData.postalCode} - {formData.country}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleEditAddress}
                      className="text-sm text-gray-600 underline hover:no-underline ml-4"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Delivery Method Section */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <FiCheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-3">Delivery Method</h2>
                        <div className="mb-3">
                          <span className="inline-block bg-black text-white px-3 py-1 rounded-md text-sm font-medium">
                            Free Delivery
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          {cartItems.length > 0 && cartItems[0].product.image?.src && (
                            <div className="relative w-16 h-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={cartItems[0].product.image.src}
                                alt={cartItems[0].product.title}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <p className="text-sm text-gray-700">
                            Estimated delivery between <span className="font-semibold">{getEstimatedDelivery()}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleEditDelivery}
                      className="text-sm text-gray-600 underline hover:no-underline ml-4"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Payment Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Payment</h2>
                  <p className="text-sm text-gray-600 mb-4">Select your payment method</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* PayPal */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("paypal")}
                      className={`border-2 rounded-md p-4 text-left transition ${
                        selectedPaymentMethod === "paypal"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.203zm14.146-14.42a.727.727 0 0 0-.313.21c-.186.186-.29.44-.29.7 0 .26.104.514.29.7.186.186.44.29.7.29.26 0 .514-.104.7-.29.186-.186.29-.44.29-.7 0-.26-.104-.514-.29-.7a.988.988 0 0 0-.7-.29.988.988 0 0 0-.7.29z"/>
                        </svg>
                        <span className="font-medium">PayPal</span>
                      </div>
                    </button>

                    {/* Debit or Credit Card */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("card")}
                      className={`border-2 rounded-md p-4 text-left transition ${
                        selectedPaymentMethod === "card"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="font-medium">Debit or credit card</span>
                      </div>
                    </button>

                    {/* Cryptocurrency */}
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("crypto")}
                      className={`border-2 rounded-md p-4 text-left transition ${
                        selectedPaymentMethod === "crypto"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Cryptocurrency</span>
                      </div>
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={!selectedPaymentMethod}
                      className={`w-full md:w-[300px] py-3 px-10 rounded-md text-sm font-semibold tracking-wide transition ${
                        selectedPaymentMethod
                          ? "bg-black text-white hover:bg-gray-900"
                          : "bg-black text-white cursor-not-allowed"
                      }`}
                    >
                      Confirm Payment Method
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:max-w-sm  p-4 h-fit  top-6">
            <div className="mb-3">
              <div className="flex items-center justify-between sticky mb-2">
                <span className="text-lg font-medium">Total</span>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wide text-gray-500">
                    {currencyLabel}
                  </span>
                  <p className="text-2xl font-semibold">{totals.total}</p>
                </div>
              </div>
              <button
                type="button"
                disabled
                className="w-full bg-gray-100 text-gray-500 py-3 rounded-md text-sm font-semibold tracking-wide cursor-not-allowed"
              >
                Place Order
              </button>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                By placing your order a new FARFETCH account will be created and
                you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms and Conditions
                </Link>
                ,{" "}
                <Link href="/privacy" className="underline">
                  Privacy and Cookie Policy
                </Link>
                , and to join our loyalty programme.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-light mb-2">Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const {
                    currencySymbol,
                    originalValue,
                    effectiveValue,
                    saleSavings,
                  } = getItemPricing(item.product);

                  return (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-2">
                      <div className="relative w-20 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.image?.src && (
                          <Image
                            src={item.product.image.src}
                            alt={item.product.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.product.title}
                        </p>
                        <div className="mt-1 space-y-1">
                          {originalValue > 0 && (
                            <p className="text-xs line-through text-gray-500">
                              {formatCurrency(originalValue, currencySymbol)}
                            </p>
                          )}
                          {saleSavings > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-600">
                                {item.product.discountPercentage || "30% Sale"}
                              </span>
                              <span className="text-xs text-gray-600">
                                {formatDiscount(saleSavings, currencySymbol)}
                              </span>
                            </div>
                          )}
                          {item.product.badge && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-600">
                                {item.product.badge}
                              </span>
                              <span className="text-xs text-gray-600">
                                {formatDiscount(
                                  Math.max(
                                    (originalValue - effectiveValue) * item.quantity -
                                      saleSavings * item.quantity,
                                    0
                                  ),
                                  currencySymbol
                                )}
                              </span>
                            </div>
                          )}
                          <p className="text-sm font-semibold">
                            {formatCurrency(
                              effectiveValue * item.quantity,
                              currencySymbol
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Delivery</span>
                  <span>{totals.delivery}</span>
                </div>
              </div>

              <div className=" pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between ">
                  <span className="text-lg font-medium">Total</span>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-wide text-gray-500">
                      {currencyLabel}
                    </span>
                    <p className="text-2xl font-semibold">{totals.total}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 ">Import duties included</p>
              </div>

              <div className=" pt-6 border-t border-gray-200 space-y-1">
                {summary.sale > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span>Sale</span>
                    <span>{totals.sale}</span>
                  </div>
                )}
                {summary.promotion > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span>Promotion</span>
                    <span>{totals.promotion}</span>
                  </div>
                )}
              </div>

              <div className="mt">
                <label className="block text-sm font-medium mb-0">
                  Promo code
                </label>
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-black"
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-semibold">30-day returns</span>
                <span className="text-sm font-medium bg-black text-white px-3 py-1 rounded">
                  Free
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

