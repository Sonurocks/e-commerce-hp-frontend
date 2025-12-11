import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroBanner({
  image,
  image2,
  title,
  title2,
  shopLink,
  shopLink2,
  shopText,
  shopText2,
}: {
  image: { src: string };
  image2?: { src: string };
  title?: string;
  title2?: string;
  shopLink?: string;
  shopLink2?: string;
  shopText?: string;
  shopText2?: string;
}) {
  const { translations } = useLanguage();
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  const primaryTitle = translate(title);
  const secondaryTitle = translate(title2);
  const primaryCta = translate(shopText);
  const secondaryCta = translate(shopText2);

  // If two images are provided, render side-by-side layout with text overlaid (for womenswear)
  if (image2 && title2 && shopText2) {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-16">
        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={primaryTitle || "Hero banner"}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            style={{ minHeight: "500px" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3
              className="text-white mb-2 font-normal"
              style={{
                fontFamily:
                  '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif',
                fontSize: "2.5rem",
                lineHeight: "1.2",
              }}
            >
              {primaryTitle}
            </h3>
            <Link
              href={shopLink || "#"}
              className="text-white text-[14px] underline font-normal hover:opacity-80 transition-opacity"
            >
              {primaryCta}
            </Link>
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image
            src={image2.src}
            alt={secondaryTitle || "Hero banner"}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
            style={{ minHeight: "500px" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3
              className="text-white  mb-2 font-normal"
              style={{
                fontFamily:
                  '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif',
                fontSize: "2.5rem",
                lineHeight: "1.2",
              }}
            >
              {secondaryTitle}
            </h3>
            <Link
              href={shopLink2 || "#"}
              className="text-white text-[14px] underline font-normal hover:opacity-80 transition-opacity"
            >
              {secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // If title and shopText are provided, render promotional layout (for menswear)
  if (title && shopText) {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-16">
        <div className="pl-16">
          <h3
            className="text-(--color-preto) mb-6 font-normal"
            style={{
              fontFamily:
                '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif',
              fontSize: "2.0rem",
              lineHeight: "1.2632",
            }}
          >
            {primaryTitle}
          </h3>
          <Link
            href={shopLink || "#"}
            className="inline-block text-[14px] border rounded-lg border-gray-800 px-6 py-2.5 text-(--color-preto) font-semibold hover:bg-gray-100 transition-colors"
          >
            {primaryCta}
          </Link>
        </div>
        <div className="w-full">
          <Image
            src={image.src}
            alt={primaryTitle || "Hero banner"}
            width={1200}
            height={600}
            className="w-full h-auto rounded bg-gray-100"
          />
        </div>
      </section>
    );
  }

  // Default layout for other departments
  return (
    <section className="my-12">
      <Image
        src={image.src}
        alt="Hero banner"
        width={1200}
        height={600}
        className="w-full h-auto rounded bg-gray-100"
      />
    </section>
  );
}
