import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Jhumka } from "@/assets";

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
  // If two images are provided, render side-by-side layout with text overlaid (for womenswear)
  if (image2 && title2 && shopText2) {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-16">
        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={title || "Hero banner"}
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
              {title}
            </h3>
            <Link
              href={shopLink || "#"}
              className="text-white text-[14px] underline font-normal hover:opacity-80 transition-opacity"
            >
              {shopText}
            </Link>
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image
            src={image2.src}
            alt={title2 || "Hero banner"}
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
              {title2}
            </h3>
            <Link
              href={shopLink2 || "#"}
              className="text-white text-[14px] underline font-normal hover:opacity-80 transition-opacity"
            >
              {shopText2}
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
            {title}
          </h3>
          <Link
            href={shopLink || "#"}
            className="inline-block text-[14px] border rounded-lg border-gray-800 px-6 py-2.5 text-(--color-preto) font-semibold hover:bg-gray-100 transition-colors"
          >
            {shopText}
          </Link>
        </div>
        <div className="w-full">
          <Image
            src={image.src}
            alt={title || "Hero banner"}
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
