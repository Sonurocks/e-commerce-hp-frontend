"use client";

import React from "react";
import Link from "next/link";
import { FiTag, FiStar, FiRefreshCw } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./WhyFarfetchSection.module.css";

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

const benefits = [
  {
    id: "selection",
    Icon: FiTag,
    eyebrow: "THE ONE THAT YOU WANT? WE'VE GOT IT.",
    title: "Shop over 100,000 styles",
    ctaLabel: "View all",
    link: "#",
  },
  {
    id: "trust",
    Icon: FiStar,
    eyebrow: "4.7/5 STARS AND 25,000+ REVIEWS",
    title: "You know you can trust us",
    ctaLabel: "Read reviews",
    link: "#",
  },
  {
    id: "returns",
    Icon: FiRefreshCw,
    eyebrow: "30-DAY FREE RETURNS",
    title: "Changed your mind? No problem",
    ctaLabel: "Learn more",
    link: "#",
  },
];

export default function WhyFarfetchSection() {
  const { translations } = useLanguage();
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;
  return (
    <section
      style={{ fontFamily: fontStack }}
      className={`w-full mt-12 mb-16 border-t border-gray-200 pt-10 ${styles.sectionWrapper}`}
    >
      <h2 className="text-[20px] font-normal text-(--color-preto) mb-6">
        {translate("Why FARFETCH?")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {benefits.map(({ id, Icon, eyebrow, title, ctaLabel, link }) => (
          <article
            key={id}
            className="border border-gray-400 rounded-lg p-4 flex flex-col gap-2 "
          >
            <Icon className="w-4 h-4 text-(--color-preto)" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-(--color-preto)">
                {translate(eyebrow)}
              </p>
              <p className="text-[13px] font-medium text-(--color-preto) mt-0">
                {translate(title)}
              </p>
            </div>
            <Link
              href={link}
              className="text-[11px] text-(--color-preto) underline font-normal"
            >
              {translate(ctaLabel)}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

