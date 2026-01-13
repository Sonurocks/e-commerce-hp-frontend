"use client";

import React from "react";
import { Product } from "@/constants/department";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TrendingGrid({ items }: { items: Product[] }) {
  const { translations } = useLanguage();
  const heading = translations.homepage.trendingHeading;
  const translateTitle = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  return (
    <section className="my-10">
      <h3 className="text-[20px] text-(--color-preto) mb-10">{heading}</h3>
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[750px]:grid-cols-4 gap-8 md:gap-6">
        {items.map((t) => (
          <div key={t.id} className="flex flex-col">
            <Link href={`/trending?id=${t.id}`} className="block group">
              <div className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-start overflow-hidden">
                <Image 
                  src={t.image.src} 
                  alt={translateTitle(t.title) ?? t.title} 
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-contain object-left" 
                />
              </div>
            </Link>
            <div className="mt-4 text-left" style={{ display: 'block', visibility: 'visible', opacity: 1, position: 'static', zIndex: 1 }}>
              <p className="text-sm font-normal text-preto block" style={{ color: '#000', display: 'block', visibility: 'visible', opacity: 1 }}>
                {translateTitle(t.title)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
