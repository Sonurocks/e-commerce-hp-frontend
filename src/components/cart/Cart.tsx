"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";
import { FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import DownloadAppBanner from "../department/DownloadAppBanner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
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

const ContactSection = () => (
  <>
    <h2 className="text-2xl font-base text-(--color-preto) mb-3">Contact us</h2>
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1  border border-(--theme-border) rounded-md p-4">
        <div className="mb-2">
          <FaEnvelope className="w-6 h-6 text-(--color-preto)" />
        </div>
        <h3 className="text-sm font-base text-(--color-preto) mb-1 uppercase tracking-wide">
          EMAIL US
        </h3>
        <p className="text-base text-(--color-preto) mb-1 font-base">
          Get in touch by email
        </p>
        <a
          href="mailto:customerservice@farfetch.com"
          className="text-base text-(--color-preto) font-base hover:underline"
        >
          customerservice@farfetch.com
        </a>
      </div>
      <div className="flex-1  border border-(--theme-border) rounded-md p-4">
        <div className="mb-2">
          <FaPhone className="w-6 h-6 text-(--color-preto)" />
        </div>
        <h3 className="text-sm font-base text-(--color-preto) mb-1 uppercase tracking-wide">
          ORDER BY PHONE
        </h3>
        <p className="text-base text-(--color-preto) mb-1 font-base">
          Available Monday to Friday
        </p>
        <a
          href="tel:+16467913768"
          className="text-base text-(--color-preto) font-base hover:underline"
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
            <h2 className="text-3xl font-base text-(--color-preto) mb-3">
              Never miss a thing
            </h2>
            <p className="text-base text-(--color-preto) leading-relaxed font-base">
              Sign up for promotions, tailored new arrivals, stock updates and
              more - straight to your inbox.
            </p>
          </div>

          <div className="flex-1 w-full lg:w-auto lg:max-w-2xl">
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label className="block text-sm font-base text-(--color-preto) mb-2 uppercase tracking-wide">
                  GET UPDATES BY
                </label>
                <div className="text-base text-(--color-preto) mb-2 font-base">
                  Email
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full max-w-sm px-3 py-2 border border-(--color-platinum) rounded-md focus:outline-none focus:border-preto text-base  font-normal"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-(--theme-bg) text-(--theme-text) border border-(--theme-border) px-6 py-3 rounded-md transition-colors font-normal text-base"
              >
                Sign Up
              </button>
            </form>
            <p className="text-sm text-(--color-preto) mt-4 leading-relaxed font-base max-w-2xl">
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

const CheckoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { setEmail: setCheckoutEmail } = useCheckout();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      // Prevent scrolling
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Prevent touch scrolling on mobile
      const preventTouchMove = (e: TouchEvent) => {
        e.preventDefault();
      };
      document.addEventListener("touchmove", preventTouchMove, { passive: false });

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        window.scrollTo(0, scrollY);
        document.removeEventListener("touchmove", preventTouchMove);
      };
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setCheckoutEmail(email.trim());
      onClose();
      router.push("/checkout");
    }
  };

  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-preto/50 z-[99]" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      >
        <div className="w-full max-w-[420px] bg-branco rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-6">
            <h2 className="text-2xl font-base text-preto">You&apos;re almost there</h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-preto hover:text-(--color-hina) transition p-2 cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 pb-6">
            <p className="text-base text-preto  mb-6 font-light leading-relaxed">
              Please enter your email address before continuing. You&apos;ll be able to sign in if you already have a registered account.
            </p>

            <form onSubmit={handleContinue} className="space-y-4">
              <label className="block text-xs font-normal text-preto">
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border border-preto px-4 py-3 rounded-lg text-base text-preto placeholder:text-(--color-nimbus) focus:outline-none focus:border-black"
                  placeholder="Enter your email"
                  required
                />
              </label>

              <button
                type="submit"
                className="w-full bg-[#222] text-white py-3 text-sm  rounded-lg font-semibold tracking-wide  transition"
              >
                Continue To Checkout
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <span className="flex-1 " />
              <span className="text-thin font-thin text-preto">OR</span>
              <span className="flex-1 " />
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="w-full border border-preto py-3 rounded-lg text-base font-medium flex items-center justify-center gap-3"
              >
                <FcGoogle className="text-xl" />
                Continue With Google
              </button>
              <button
                type="button"
                className="w-full border border-preto py-3 rounded-lg  text-base font-medium flex items-center justify-center gap-3 "
              >
                <FaApple className="text-xl text-preto" />
                Continue With Apple
              </button>
              <button
                type="button"
                className="w-full border border-preto py-3 rounded-lg text-base font-medium flex items-center justify-center gap-3"
              >
                <FaFacebookF className="text-xl text-(--color-facebook)" />
                Continue With Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, updateSize, summary } = useCart();
  const { addToWishlist, isWishlisted } = useWishlist();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, 'size' | 'quantity' | null>>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  // Size options - same as ProductDetailSection
  const sizeOptions = [
    { size: "XS", price: "£220", available: true },
    { size: "S", price: "£220", available: true },
    { size: "M", price: "£232", available: true },
    { size: "L", price: null, available: false },
    { size: "XL", price: "£232", available: true },
  ];

  // Quantity options (1-10)
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const toggleDropdown = (itemKey: string, type: 'size' | 'quantity') => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [itemKey]: prev[itemKey] === type ? null : type,
    }));
  };

  const closeDropdown = (itemKey: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [itemKey]: null,
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([itemKey, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          closeDropdown(itemKey);
        }
      });
    };

    if (Object.values(openDropdowns).some((val) => val !== null)) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdowns]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <EmptyCartState />
        <DownloadAppBanner />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-6 lg:px-12 py-14 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="mb-8 space-y-3">
              <h1 className="text-4xl font-light tracking-tight text-(--color-preto)">
                Shopping Bag
              </h1>
              <div className="flex items-center gap-2 border-y border-(--color-platinum) py-3 text-sm text-(--color-hina)">
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
                    className="border-b border-(--color-platinum) pb-10"
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="w-full lg:w-56">
                        <div className="relative w-full h-64 bg-(--color-whiteSmoke) rounded-md overflow-hidden">
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
                              <p className="text-sm text-(--color-hina)">
                                {item.product.subtitle}
                              </p>
                            )}
                            <p className="text-xs text-(--color-hina) mt-2">
                              FARFETCH ID: {item.product.id}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="text-2xl leading-none text-(--color-hina) hover:text-(--color-preto)"
                            aria-label="Remove item"
                            type="button"
                          >
                            &times;
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                          <div className="space-y-1 text-sm text-(--color-hina)">
                            {originalValue > 0 && (
                              <p className="line-through text-(--color-hina)">
                                {formatCurrency(originalValue, currencySymbol)}
                              </p>
                            )}
                            {saleSavings > 0 && (
                              <p>
                                -{formatCurrency(saleSavings, currencySymbol)}{" "}
                                <span className="text-(--color-nimbus)">
                                  ({item.product.discountPercentage || "Sale savings"})
                                </span>
                              </p>
                            )}
                            <p className="text-2xl font-semibold text-(--color-red)">
                              {formatCurrency(effectiveValue, currencySymbol)}
                            </p>
                            <p className="text-xs text-(--color-hina)">
                              Import duties included
                            </p>
                          </div>

                          <div className="space-y-3 text-sm text-(--color-preto) -mt-22">
                            {/* Size Dropdown */}
                            <div className="relative" ref={(el) => {
                              const itemKey = `${item.product.id}-${item.size}`;
                              dropdownRefs.current[`${itemKey}-size`] = el;
                            }}>
                              <div className="border-b border-(--color-platinum) pb-2">
                                <div className="flex-1">
                                  <p className="text-[11px] uppercase tracking-wide text-(--color-hina) mb-1">
                                    Size
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => toggleDropdown(`${item.product.id}-${item.size}-size`, 'size')}
                                    className="w-full px-3 py-2 border border-(--color-silver) rounded-lg focus:outline-none focus:border-(--color-preto) bg-white cursor-pointer text-[13px] text-(--color-preto) flex items-center justify-between"
                                  >
                                    <span className="font-semibold">{item.size}</span>
                                    <svg
                                      className={`w-3 h-3 transition-transform ${openDropdowns[`${item.product.id}-${item.size}-size`] === 'size' ? "rotate-180" : ""}`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              {openDropdowns[`${item.product.id}-${item.size}-size`] === 'size' && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-(--color-silver) rounded-lg shadow-lg">
                                  <div className="p-2">
                                    <div className="flex items-center justify-between mb-2">
                                      <p className="text-[11px] text-(--color-nimbus)">
                                        Select size
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => closeDropdown(`${item.product.id}-${item.size}-size`)}
                                        className="text-[11px] text-(--color-preto) underline"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                    <div className="space-y-1">
                                      {sizeOptions.map((option) => (
                                        <button
                                          key={option.size}
                                          onClick={() => {
                                            if (option.available && option.size !== item.size) {
                                              updateSize(item.product.id, item.size, option.size);
                                              closeDropdown(`${item.product.id}-${item.size}-size`);
                                            }
                                          }}
                                          disabled={!option.available}
                                          className={`w-full flex items-center justify-between py-1 px-2 text-left ${
                                            item.size === option.size
                                              ? "bg-(--color-whiteSmoke) font-semibold"
                                              : option.available
                                              ? "hover:bg-(--color-whiteSmoke)"
                                              : "opacity-50 cursor-not-allowed"
                                          }`}
                                        >
                                          <span className="font-semibold text-[13px]">{option.size}</span>
                                          {option.price && (
                                            <span className="text-[13px] text-(--color-preto)">{option.price}</span>
                                          )}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Quantity Dropdown */}
                            <div className="relative" ref={(el) => {
                              const itemKey = `${item.product.id}-${item.size}`;
                              dropdownRefs.current[`${itemKey}-quantity`] = el;
                            }}>
                              <div>
                                <div className="flex-1">
                                  <p className="text-[11px] uppercase tracking-wide text-(--color-hina) mb-1">
                                    Quantity
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => toggleDropdown(`${item.product.id}-${item.size}-quantity`, 'quantity')}
                                    className="w-full px-3 py-2 border border-(--color-silver) rounded-lg focus:outline-none focus:border-(--color-preto) bg-white cursor-pointer text-[13px] text-[var(--color-preto)] flex items-center justify-between"
                                  >
                                    <span className="font-semibold">{item.quantity}</span>
                                    <svg
                                      className={`w-3 h-3 transition-transform ${openDropdowns[`${item.product.id}-${item.size}-quantity`] === 'quantity' ? "rotate-180" : ""}`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              {openDropdowns[`${item.product.id}-${item.size}-quantity`] === 'quantity' && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-(--color-silver) rounded-lg shadow-lg">
                                  <div className="p-2">
                                    <div className="flex items-center justify-between mb-2">
                                      <p className="text-[11px] text-(--color-nimbus)">
                                        Select quantity
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => closeDropdown(`${item.product.id}-${item.size}-quantity`)}
                                        className="text-[11px] text-(--color-preto) underline"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                    <div className="space-y-1">
                                      {quantityOptions.map((qty) => (
                                        <button
                                          key={qty}
                                          onClick={() => {
                                            if (qty !== item.quantity) {
                                              updateQuantity(item.product.id, item.size, qty);
                                              closeDropdown(`${item.product.id}-${item.size}-quantity`);
                                            }
                                          }}
                                          className={`w-full flex items-center justify-between py-1 px-2 text-left ${
                                            item.quantity === qty
                                              ? "bg-(--color-whiteSmoke) font-semibold"
                                              : "hover:bg-(--color-whiteSmoke)"
                                          }`}
                                        >
                                          <span className="font-semibold text-[13px]">{qty}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Wishlist Button */}
                            <div className="flex items-center gap-3 text-sm">
                              <button
                                type="button"
                                className="flex items-center gap-2 p-2  text-(--color-preto) hover:opacity-80"
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
                                {wishlisted ? "In your wishlist" : "Move to wishlist"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="w-full lg:max-w-sm border border-(--color-platinum) rounded-lg p-6 h-fit sticky top-6">
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

            <div className="border-t border-(--color-platinum) mt-6 pt-6">
              <div className="flex items-start justify-between">
                <p className="text-base font-medium text-(--color-preto)">Total</p>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-(--color-hina)">
                    {currencyLabel}
                  </p>
                  <p className="text-2xl font-semibold text-(--color-preto)">
                    {totals.total}
                  </p>
                  <p className="text-xs text-(--color-hina)">Import duties included</p>
                </div>
              </div>

              <button 
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full bg-[#222] text-white mt-6 py-3 rounded-md text-sm font-semibold tracking-wide  transition"
              >
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
      <CheckoutModal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)} 
      />
    </div>
  );
};

export default Cart;
