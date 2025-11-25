import React from "react";
import { Product } from "@/constants/department";
import Image from "next/image";

export default function TrendingGrid({ items }: { items: Product[] }) {
  return (
    <section className="my-10">
      <h3 className="text-[20px] text-(--color-preto) mb-10">Trending now</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((t) => (
          <div key={t.id}>
            <div className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center">
              <Image 
                src={t.image.src} 
                alt={t.title} 
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-contain" 
              />
            </div>
            <div className="mt-2 text-left">
              <p className="text-sm font-base text-(--color-preto) ">
                {t.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
