"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/constants/department";
import { GoHeart } from "react-icons/go";
const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";
export default function ProductCard({
  product,
  showBadge = false,
}: {
  product: Product;
  showBadge?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const currentImage =
    isHovered && product.hoverImage ? product.hoverImage : product.image;
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  const isImageBadge = product.badge === "Extra 25% off";
  const isTextBadge = product.badge && product.badge !== "Extra 25% off";
  return (
    <Link href={`/product-detail/${product.id}`} className="block h-full">
      <article className="group h-full flex flex-col" style={{ fontFamily: fontStack }}>
        {/* RESPONSIVE UPDATE: h-[300px] for mobile, h-[400px] for tablet/desktop */}
        <div className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center">
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 z-10 p-2 rounded-full transition-colors"
            aria-label="Add to wishlist"
          >
            <GoHeart
              className={`w-5 h-5 ${
                isWishlisted
                  ? "fill-black text-(--color-preto)"
                  : "text-(--color-preto)"
              }`}
              strokeWidth={1.0}
            />
          </button>
          {showBadge && isImageBadge && (
            <div className="absolute top-2 left-2 z-10">
              <p className="text-[15px] text-gray-500 px-2 py-1">
                {product.badge}
              </p>
            </div>
          )}
          <Image
            src={currentImage.src}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-contain"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
        <div className="mt-2 flex-1">
          <div className="h-5 mb-1">
            {showBadge && isTextBadge && (
              <p className="text-[15px] text-gray-500">{product.badge}</p>
            )}
          </div>
          <h3 className="text-m text-(--color-preto) font-semibold">
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="text-sm text-(--color-preto)">{product.subtitle}</p>
          )}
          {product.price && (
            <p className="text-sm text-(--color-preto) mt-3">{product.price}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
