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
    "Perfect styles to see every dress code,courtesy Cherina Hreem and more.";

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-16">
      <div className="pl-16">
        <h3
          className="text-(--color-preto) mb-9 pl-14 font-normal"
          style={{
            fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif',
            fontSize: "2.0rem",
            lineHeight: "1.2632",
          }}
        >
          {title || defaultTitle}
        </h3>
        <p
          className="text-gray-800 mb-12"
          style={{
            fontFamily: '"Nimbus Roman D", "Times New Roman", serif',
            fontSize: "1.2rem",
            lineHeight: "1.2",
          }}
        >
          {description || defaultDescription}
        </p>
        <Link
          href="#"
          className="inline-block text-[14px] border rounded-lg  border-gray-800 px-6 py-2.5  text-(--color-preto) font-semibold hover:bg-gray-100 transition-colors ml-44"
        >
          Shop Now
        </Link>
      </div>
      <div className="w-full">
        <img
          src={image.src}
          alt="Editorial feature"
          className="w-full h-auto rounded bg-gray-100"
        />
      </div>
    </section>
  );
}
