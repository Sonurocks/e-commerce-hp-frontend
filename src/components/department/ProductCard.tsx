"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/constants/department";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { GrTooltip } from "react-icons/gr";
import { useLanguage } from "@/context/LanguageContext";
import { useWishlist } from "@/context/WishlistContext";
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
  const { translations } = useLanguage();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const translateProductText = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;
  const localizedTitle = translateProductText(product.title);
  const localizedSubtitle = translateProductText(product.subtitle);
  const localizedBadge = translateProductText(product.badge);
  const currentImage =
    isHovered && product.hoverImage ? product.hoverImage : product.image;
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };
  const wishlisted = isWishlisted(product.id);
  const isImageBadge = product.badge === "Extra 25% off";
  const isTextBadge = product.badge && product.badge !== "Extra 25% off";
  return (
    <Link href={`/product-detail/${product.id}`} className="block h-full">
      <article className="group h-full flex flex-col" style={{ fontFamily: fontStack }}>
        {/* RESPONSIVE UPDATE: h-[300px] for mobile, h-[400px] for tablet/desktop */}
        <div className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-start">
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-3 z-10 p-2 rounded-full transition-colors"
            aria-label="Add to wishlist"
          >
            {wishlisted ? (
              <GoHeartFill className="w-5 h-5 text-black dark:text-black" strokeWidth={0} />
            ) : (
              <GoHeart className="w-5 h-5 text-black dark:text-black" strokeWidth={1.0} />
            )}
          </button>
          {showBadge && isImageBadge && localizedBadge && (
            <div className="absolute top-0 left-0 z-10">
              <div 
                className="bg-red-600 px-4 py-1.5 flex items-center justify-center"
                style={{
                  borderTopLeftRadius: '0px',
                  borderTopRightRadius: '0',
                  borderBottomLeftRadius: '0',
                  borderBottomRightRadius: '20px',
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'
                }}
              >
                <p className="text-xs text-white font-bold">
                  - {localizedBadge.replace(/[^0-9]/g, '')}%
                </p>
              </div>
            </div>
          )}
          <Image
            src={currentImage.src}
            alt={localizedTitle ?? product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-fill"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
        <div className="mt-2 flex-1 flex flex-col">
          <div className="h-5 mb-1">
            {showBadge && isTextBadge && (
              <p className="text-[15px] text-(--color-emperor)">{localizedBadge}</p>
            )}
          </div>
          <h3 className="text-[13px] text-preto font-semibold">
            {localizedTitle ?? product.title}
          </h3>
          {localizedSubtitle && (
            <p className="text-[13px] text-preto">{localizedSubtitle}</p>
          )}
          {product.price && (
            <p className="text-sm font-semibold text-preto mt-auto pt-3">{product.price}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
