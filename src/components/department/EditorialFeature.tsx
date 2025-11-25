
import React from "react";
import Link from "next/link";
export default function EditorialFeature({
  image,
  title,
  description,
}: {
  image: { src: string };
  title?: string;
  description?: string;
}) {
  const defaultTitle = "How to master party season";
  const defaultDescription =
    "Perfect styles to see every dress code, courtesy Cherina Hreem and more.";
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-8 lg:my-16 px-4 md:px-8">
      {/* Content Side */}
      <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-16">
        <h3
          className="text-(--color-preto) mb-4 lg:mb-9 font-normal max-w-md lg:max-w-none lg:pl-14"
          style={{
            fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif',
            fontSize: "clamp(1.5rem, 4vw, 2.0rem)", // Responsive font size
            lineHeight: "1.2632",
          }}
        >
          {title || defaultTitle}
        </h3>
        <p
          className="text-gray-800 mb-8 lg:mb-12 max-w-md lg:max-w-none"
          style={{
            fontFamily: '"Nimbus Roman D", "Times New Roman", serif',
            fontSize: "clamp(1rem, 3vw, 1.2rem)", // Responsive font size
            lineHeight: "1.2",
          }}
        >
          {description || defaultDescription}
        </p>
        <Link
          href="#"
          className="inline-block text-[14px] border rounded-lg border-gray-800 px-6 py-2.5 text-(--color-preto) font-semibold hover:bg-gray-100 transition-colors lg:ml-44"
        >
          Shop Now
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