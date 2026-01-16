
import React from "react";
import Link from "next/link";
import { DepartmentKey } from "@/constants/department";

interface EditorialFeatureProps {
  image: { src: string };
  title?: string;
  description?: string;
  ctaLabel?: string;
  department?: DepartmentKey;
}

export default function EditorialFeature({
  image,
  title,
  description,
  ctaLabel,
  department = "womenswear",
}: EditorialFeatureProps) {
  const defaultTitle = "How to master party season";
  const defaultDescription =
    "Perfect styles to see every dress,courtesy Cherina Hreem and more.";
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-8 lg:my-16 px-4 md:px-8">
      {/* Content Side */}
      <div className="order-2 lg:order-1 flex flex-col items-center text-center">
        <h3
          className="text-(--color-preto) mb-4 lg:mb-9 font-normal max-w-md lg:max-w-none"
          style={{
            fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif',
            fontSize: "clamp(1.5rem, 4vw, 2.0rem)", // Responsive font size
            lineHeight: "1.2632",
          }}
        >
          {title || defaultTitle}
        </h3>
        <p
          className="text-(--color-emperor) mb-8 lg:mb-12 max-w-md lg:max-w-none"
          style={{
            fontFamily: '"Nimbus Roman D", "Times New Roman", serif',
            fontSize: "clamp(1rem, 3vw, 1.2rem)", // Responsive font size
            lineHeight: "1.2",
          }}
        >
          {description || defaultDescription}
        </p>
        <Link
          href={`/shop?section=editorial&department=${department}`}
          className="w-full md:w-auto md:inline-block text-sm border border-[var(--theme-border)] text-(--color-preto) px-4 py-2 rounded font-semibold transition-colors text-center"
        >
          {ctaLabel ?? "Shop now"}
        </Link>
      </div>
      {/* Image Side */}
      <div className="order-1 lg:order-2 w-full">
        <img
          src={image.src}
          alt="Editorial feature"
          className="w-full h-auto rounded bg-gray-100 object-cover"
        />
      </div>
    </section>
  );
}