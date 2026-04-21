"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaInstagram, FaPinterestP, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiLockAlt } from "react-icons/bi";
import { FiStar } from "react-icons/fi";
import { HiGift } from "react-icons/hi";
import {
  bag1,
  featuredLola1,
  footerBrownImage,
  recommendationSatin1,
  trendingLuxury,
  womensection2a,
} from "@/assets";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const initialTimeLeft: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const launchDate = new Date("2026-12-01T00:00:00");

const getTimeLeft = (): TimeLeft => {
  const now = new Date().getTime();
  const distance = Math.max(launchDate.getTime() - now, 0);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
};

const sneakPeekImages = [
  { src: recommendationSatin1, alt: "Luxury product teaser" },
  { src: bag1, alt: "Premium bag teaser" },
  { src: featuredLola1, alt: "Signature product teaser" },
  { src: trendingLuxury, alt: "Lifestyle teaser" },
  { src: footerBrownImage, alt: "Accessory teaser" },
];

const benefits = [
  { title: "15% OFF", subtitle: "Early Bird Discount" },
  { title: "VIP ACCESS", subtitle: "Be The First" },
  { title: "EXCLUSIVE PERKS", subtitle: "Launch Benefits" },
];

const trustPoints = [
  { title: "PREMIUM QUALITY", text: "Carefully selected pieces for your style.", icon: FiStar },
  { title: "EXCLUSIVE LAUNCH PERKS", text: "Special gifts and early offers for members.", icon: HiGift },
  { title: "SECURE & TRUSTED", text: "Safe checkout and reliable customer support.", icon: BiLockAlt },
];

const socialLinks = [
  { label: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  { label: "TikTok", icon: FaTiktok, href: "https://tiktok.com" },
  { label: "Pinterest", icon: FaPinterestP, href: "https://pinterest.com" },
  { label: "X", icon: FaXTwitter, href: "https://x.com" },
];

const formatUnit = (value: number) => value.toString().padStart(2, "0");

export default function LaunchingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(
    () => [
      { label: "DAYS", value: formatUnit(timeLeft.days) },
      { label: "HOURS", value: formatUnit(timeLeft.hours) },
      { label: "MINUTES", value: formatUnit(timeLeft.minutes) },
      { label: "SECONDS", value: formatUnit(timeLeft.seconds) },
    ],
    [timeLeft],
  );

  return (
    <main className="bg-[#f8f4ee] pt-[58px] text-[#141414]">
      <section className="fixed inset-x-0 top-0 z-50 border-b border-[#e9ddcf] bg-[#f4ece2]/95 backdrop-blur supports-[backdrop-filter]:bg-[#f4ece2]/85">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-5 py-3 text-xs tracking-[0.12em] text-[#5a4a3b] md:px-10">
          <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-[#1f1f1f] transition-opacity hover:opacity-75">
            FARFETCH
          </Link>
          <div className="flex items-center gap-3">
            <p className="font-semibold">FOLLOW OUR JOURNEY</p>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d7c7b2] bg-white text-[#2e2e2e] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ede0d1] hover:shadow-sm"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-6 md:px-10 md:py-8">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex max-w-[560px] flex-col justify-center">
            <span className="mb-5 w-fit rounded-full bg-[#f0e2d1] px-3 py-1 text-xs font-semibold tracking-[0.2em]">
              LAUNCHING SOON
            </span>
            <h1 className="max-w-[540px] text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-[56px]">
              Something extraordinary is on the way.
            </h1>
            <p className="mt-4 max-w-[520px] text-sm text-[#3a3a3a] md:text-base">
              Premium products. Thoughtfully curated. Join the list and get early access the moment we launch.
            </p>

            <div className="mt-6 w-full max-w-[700px] rounded-xl border border-[#e4d7c6] bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#6b5440]">GET 15% OFF + VIP EARLY ACCESS</p>
              <div className="mt-3 flex flex-col items-stretch gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-11 flex-1 rounded-md border border-[#d8c6b2] px-4 text-sm outline-none transition-colors focus:border-[#8e6d4d] "
                />
                <button
                  type="button"
                  className="h-11 shrink-0 rounded-md bg-[#1d1d1d] px-5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black sm:w-[170px]"
                >
                  JOIN VIP LIST
                </button>
              </div>
            </div>

            <div className="mt-4 grid w-full max-w-[700px] grid-cols-1 gap-3 text-xs sm:grid-cols-3">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="flex min-h-[72px] flex-col justify-center rounded-md border border-[#e6d8c6] bg-[#fcfaf7] px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d9c7b1] hover:shadow-sm"
                >
                  <p className="font-semibold tracking-wide">{item.title}</p>
                  <p className="text-[#595959]">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="group relative h-[320px] overflow-hidden rounded-2xl border border-[#e8ddcf] bg-[#efe3d5] shadow-sm transition-shadow duration-300 hover:shadow-md sm:h-[380px] lg:h-[440px]">
            <Image
              src={womensection2a}
              alt="Luxury launch visual"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-[#111214] px-5 py-8 text-white md:px-10 md:py-10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="w-full lg:w-auto">
            <p className="mb-3 text-center text-xs tracking-[0.2em] text-[#d3c6b4] lg:text-left">WE LAUNCH IN</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {countdown.map((item) => (
                <div key={item.label} className="rounded-md border border-[#303133] px-5 py-3 text-center transition-colors duration-200 hover:border-[#45474b]">
                  <p className="text-3xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-[11px] tracking-[0.16em] text-[#d8cdbf]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-[420px]">
            <p className="mb-2 text-sm">The store is almost ready</p>
            <div className="h-3 overflow-hidden rounded-full bg-[#323338]">
              <div className="h-full w-[85%] rounded-full bg-[#c29664] transition-all duration-700" />
            </div>
            <p className="mt-2 text-sm text-[#c8c8c8]">85% complete - finishing touches are being added.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-10 md:px-10 md:py-12">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.22em] text-[#7b6650]">SNEAK PEEK</p>
          <h2 className="mt-1 text-3xl font-medium">A glimpse of what&apos;s coming</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {sneakPeekImages.map((item) => (
            <div key={item.alt} className="group overflow-hidden rounded-lg border border-[#eadfce] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <Image src={item.src} alt={item.alt} className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-48" />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e9ddcf] bg-[#fcfaf7]">
        <div className="mx-auto grid max-w-[1320px] gap-5 px-5 py-8 md:grid-cols-3 md:px-10 md:py-10">
          {trustPoints.map((item) => (
            <div key={item.title} className="rounded-lg border border-[#ebdecd] bg-white px-4 py-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#dbcab4] bg-[#faf6f0] text-[#5b4733]">
                <item.icon size={16} />
              </div>
              <p className="text-sm font-semibold tracking-wide">{item.title}</p>
              <p className="mt-1 text-sm text-[#515151]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-10 md:px-10 md:py-12">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#735d46]">JOIN OUR COMMUNITY</p>
            <h3 className="mt-2 text-3xl font-medium">Be first to know what drops next</h3>
            <p className="mt-2 max-w-[620px] text-sm text-[#4b4b4b]">
              Follow us for behind-the-scenes, product teasers, launch updates, and VIP-only surprises.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[#d8c8b5] bg-white px-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#efe2d4] hover:shadow-sm"
                >
                  <Icon size={16} />
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#dbcbb7] to-transparent" />
      </section>

      <footer className="bg-[#15181b] px-5 py-8 text-[#f2ece3] md:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 md:flex-row">
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#f1e9de]">FARFETCH</p>
            <p className="max-w-[360px] text-sm text-[#d8d3cb]">
              Redefining quality. Elevating every day. Our full store experience launches soon.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-[#c8c3bb]">
              <a href="/about" className="transition-colors hover:text-white">
                About
              </a>
              <a href="/contact-us" className="transition-colors hover:text-white">
                Contact
              </a>
              <a href="/privacy-policy" className="transition-colors hover:text-white">
                Privacy
              </a>
              <a href="/terms-and-conditions" className="transition-colors hover:text-white">
                Terms
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.12em]">STAY IN THE LOOP</p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-10 rounded-md border border-[#3a3f43] bg-transparent px-3 text-sm text-white outline-none transition-colors focus:border-[#c29664]"
              />
              <button type="button" className="h-10 rounded-md bg-[#c29664] px-4 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d2a878]">
                JOIN
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1320px] border-t border-[#2c2f33] pt-4 text-xs text-[#b8b2a9]">
          © 2026 FARFETCH. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
