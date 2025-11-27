"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ProductDetail, productsById } from "@/constants/products";
import { Product } from "@/constants/department";
import { GoHeart } from "react-icons/go";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  womenswearBestsellers,
  menswearBestsellers,
  kidswearBestsellers,
  womenswearRecommendations,
  menswearRecommendations,
  kidswearRecommendations,
  menswearCompleteTheLook,
  menswearFeaturedProducts,
  kidswearFeaturedProducts,
} from "@/constants/productDetailExtras";

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

// Extended product type for Complete the look section
type CompleteTheLookProduct = ProductDetail & {
  brand: string;
  productName: string;
};

type CuratedProductCardData = {
  id: string;
  brand: string;
  productName: string;
  price: string;
  originalPrice?: string;
  discountLabel?: string;
  badge?: string;
  image: { src: string };
  hoverImage?: { src: string };
};

// Helper function to parse product title into brand and product name
const parseProductTitle = (title: string): { brand: string; productName: string } => {
  // Common brand patterns - brands are usually at the start
  const brandPatterns = [
    "OUR LEGACY",
    "Miu Miu",
    "SOREL",
    "GUCCI",
    "PRADA",
    "BALENCIAGA",
    "SAINT LAURENT",
    "BURBERRY",
    "DIOR",
    "CHANEL",
    "LOUIS VUITTON",
    "VERSACE",
    "FENDI",
    "HERMÈS",
    "VALENTINO",
    "GIVENCHY",
    "DOLCE & GABBANA",
    "ARMANI",
    "TOM FORD",
    "BOTTEGA VENETA",
  ];

  // Try to find a brand at the start of the title
  for (const brand of brandPatterns) {
    if (title.toUpperCase().startsWith(brand.toUpperCase())) {
      const productName = title.substring(brand.length).trim();
      return { brand, productName };
    }
  }

  // If no brand found, try to split by common separators
  const separators = [":", "-"];
  for (const sep of separators) {
    const parts = title.split(sep);
    if (parts.length >= 2) {
      return {
        brand: parts[0].trim(),
        productName: parts.slice(1).join(sep).trim(),
      };
    }
  }

  // Fallback: use first word as brand, rest as product name
  const words = title.split(" ");
  if (words.length > 1) {
    return {
      brand: words[0],
      productName: words.slice(1).join(" "),
    };
  }

  // Last resort: use entire title as product name
  return {
    brand: "",
    productName: title,
  };
};

const mapToCompleteTheLookProducts = (
  list: ProductDetail[] = []
): CompleteTheLookProduct[] =>
  list
    .map((recommendedProduct) => {
      if (!recommendedProduct) return null;

      const { brand, productName } = parseProductTitle(recommendedProduct.title);

      return {
        ...recommendedProduct,
        brand,
        productName,
      } as CompleteTheLookProduct;
    })
    .filter((p): p is CompleteTheLookProduct => p !== null);

const WOMENSWEAR_FEATURED_PRODUCT_IDS = [
  "w-featured-0",
  "w-featured-1",
  "w-featured-2",
  "w-featured-3",
];

// Helper function to convert ProductDetail to CuratedProductCardData
const convertToCuratedCard = (product: ProductDetail): CuratedProductCardData => {
  const { brand, productName } = product.subtitle
    ? { brand: product.title, productName: product.subtitle }
    : parseProductTitle(product.title);
  
  return {
    id: product.id,
    brand,
    productName,
    price: product.discountedPrice || product.price || "",
    originalPrice: product.originalPrice,
    discountLabel: product.discountPercentage,
    badge: product.badge,
    image: product.image,
    hoverImage: product.hoverImage,
  };
};

const VISIBLE_CURATED_CARDS = 5;

// Smaller product card component for Complete the look section
function SmallProductCard({ product }: { product: CompleteTheLookProduct }) {
  const [isHovered, setIsHovered] = useState(false);
  const { translations } = useLanguage();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;
  const currentImage =
    isHovered && product.hoverImage ? product.hoverImage : product.image;
  const wishlisted = isWishlisted(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link href={`/product-detail/${product.id}`} className="block">
      <article className="group" style={{ fontFamily: fontStack }}>
        <div className="relative w-full h-[280px] flex items-center justify-center">
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 z-10 p-2 rounded-full transition-colors"
            aria-label="Add to wishlist"
          type="button"
        >
            <GoHeart
            className={`w-4 h-4 ${
              wishlisted ? "fill-black text-(--color-preto)" : "text-(--color-preto)"
            }`}
              strokeWidth={1.0}
            />
          </button>
          <Image
            src={currentImage.src}
            alt={translate(product.title) ?? product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
        <div className="mt-2">
          {/* Brand name - bold */}
          <h3 className="text-[13px] text-(--color-preto) font-bold leading-tight">
            {translate(product.brand)}
          </h3>
          {/* Product name */}
          <p className="text-[13px] text-(--color-preto) font-normal mt-1 leading-tight">
            {translate(product.productName)}
          </p>
          {/* Price */}
          <div className="mt-2">
            {product.originalPrice && product.discountedPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-[13px] text-[#666] line-through">
                  {product.originalPrice}
                </span>
                <span className="text-[13px] text-[#d32f2f] font-normal">
                  {product.discountedPrice}
                </span>
              </div>
            ) : (
              <p className="text-[13px] text-(--color-preto) font-normal">
                {product.price}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

function CuratedProductCard({
  card,
  showPrevArrow,
  showNextArrow,
  onPrev,
  onNext,
}: {
  card: CuratedProductCardData;
  showPrevArrow?: boolean;
  showNextArrow?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { translations } = useLanguage();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;
  const currentImage =
    isHovered && card.hoverImage ? card.hoverImage : card.image;
  const wishlisted = isWishlisted(card.id);

  const handleWishlistClick = () => {
    const fallbackProduct: Product = {
      id: card.id,
      title: card.brand
        ? `${card.brand} ${card.productName}`
        : card.productName,
      subtitle: card.brand ? card.productName : undefined,
      price: card.price,
      image: card.image,
      hoverImage: card.hoverImage,
      badge: card.badge,
    };
    const product = productsById[card.id] ?? fallbackProduct;
    toggleWishlist(product);
  };

  return (
    <article className="group" style={{ fontFamily: fontStack }}>
      <div
        className="relative w-full h-[320px] flex items-center justify-center bg-white border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {card.badge && (
          <span className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-[11px] font-semibold text-(--color-preto) border border-gray-200 rounded-full">
            {translate(card.badge)}
          </span>
        )}
        {showPrevArrow && (
          <button
            aria-label="Previous recommendations"
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center border border-gray-300 rounded bg-white shadow-sm hover:bg-gray-50"
          >
            &lt;
          </button>
        )}
        {showNextArrow && (
          <button
            aria-label="Next recommendations"
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center border border-gray-300 rounded bg-white shadow-sm hover:bg-gray-50"
          >
            &gt;
          </button>
        )}
        <button
          className="absolute top-3 right-3 z-10 p-2 rounded-full transition-colors"
          aria-label="Add to wishlist"
          onClick={handleWishlistClick}
          type="button"
        >
          <GoHeart
            className={`w-5 h-5 ${
              wishlisted ? "fill-(--color-preto) text-(--color-preto)" : "text-(--color-preto)"
            }`}
            strokeWidth={1.0}
          />
        </button>
        <Image
          src={currentImage.src}
          alt={translate(card.productName) ?? card.productName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
          className="object-contain"
        />
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[13px] font-semibold text-(--color-preto)">
          {translate(card.brand)}
        </p>
        <p className="text-[13px] text-(--color-preto)">
          {translate(card.productName)}
        </p>
        <div className="flex items-baseline gap-2 text-[13px]">
          {card.originalPrice && (
            <span className="text-[#666] line-through">{card.originalPrice}</span>
          )}
          <span className={card.originalPrice ? "text-[#d32f2f]" : "text-(--color-preto)"}>{card.price}</span>
          {card.discountLabel && (
            <span className="text-[#d32f2f]">{card.discountLabel}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProductDetailAdditionalSection({
  product,
}: {
  product: ProductDetail;
}) {
  const [curatedStartIndex, setCuratedStartIndex] = useState(0);
  const { translations } = useLanguage();
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  // Get recommended products dynamically from product.completeTheLook or fallback list
  const completeTheLookProducts = useMemo(() => {
    const isMenswear = product.id.startsWith("m-");
    if (isMenswear) {
      return mapToCompleteTheLookProducts(menswearCompleteTheLook);
    }

    const specifiedProducts =
      product.completeTheLook && product.completeTheLook.length > 0
        ? mapToCompleteTheLookProducts(
            product.completeTheLook
              .map((productId) => productsById[productId])
              .filter((p): p is ProductDetail => !!p)
          )
        : [];

    if (specifiedProducts.length > 0) {
      return specifiedProducts;
    }

    // Fallback: show other products if specific recommendations aren't available
    const fallbackProducts = Object.values(productsById)
      .filter((p) => p.id !== product.id)
      .slice(0, 4);

    return mapToCompleteTheLookProducts(fallbackProducts);
  }, [product.completeTheLook, product.id]);

  const bestsellerProducts = useMemo(() => {
    // Check if current product is womenswear (ID starts with "w-")
    const isWomenswear = product.id.startsWith("w-");
    // Check if current product is menswear (ID starts with "m-")
    const isMenswear = product.id.startsWith("m-");
    // Check if current product is kidswear (ID starts with "k-")
    const isKidswear = product.id.startsWith("k-");

    // For womenswear products, use custom bestseller list
    if (isWomenswear) {
      return mapToCompleteTheLookProducts(womenswearBestsellers);
    }

    // For menswear products, use custom bestseller list
    if (isMenswear) {
      return mapToCompleteTheLookProducts(menswearBestsellers);
    }

    // For kidswear products, use custom bestseller list
    if (isKidswear) {
      return mapToCompleteTheLookProducts(kidswearBestsellers);
    }

    // For other departments, use default logic
    const bestSellers = Object.values(productsById)
      .filter((p) => p.id !== product.id)
      .slice(0, 5);

    return mapToCompleteTheLookProducts(bestSellers);
  }, [product.id]);

  // Generate curated product cards dynamically from productsById
  const curatedProductCards = useMemo(() => {
    const isWomenswear = product.id.startsWith("w-");
    const isMenswear = product.id.startsWith("m-");
    const isKidswear = product.id.startsWith("k-");

    if (isWomenswear) {
      return womenswearRecommendations.map(convertToCuratedCard);
    }

    if (isMenswear) {
      return menswearRecommendations.map(convertToCuratedCard);
    }

    if (isKidswear) {
      return kidswearRecommendations.map(convertToCuratedCard);
    }

    const allProducts = Object.values(productsById)
      .filter((p) => p.id !== product.id)
      .slice(0, 8);

    return allProducts.map(convertToCuratedCard);
  }, [product.id]);

  const totalCuratedCards = curatedProductCards.length;
  const displayedCuratedCards = useMemo(() => {
    if (totalCuratedCards === 0) return [];

    const limit = Math.min(VISIBLE_CURATED_CARDS, totalCuratedCards);
    const cards: CuratedProductCardData[] = [];
    for (let i = 0; i < limit; i++) {
      const index = (curatedStartIndex + i) % totalCuratedCards;
      cards.push(curatedProductCards[index]);
    }
    return cards;
  }, [curatedStartIndex, totalCuratedCards, curatedProductCards]);

  const handleNextCurated = () => {
    if (totalCuratedCards <= VISIBLE_CURATED_CARDS) return;
    setCuratedStartIndex((prev) => (prev + 1) % totalCuratedCards);
  };

  const handlePrevCurated = () => {
    if (totalCuratedCards <= VISIBLE_CURATED_CARDS) return;
    setCuratedStartIndex(
      (prev) => (prev - 1 + totalCuratedCards) % totalCuratedCards
    );
  };

  const featuredProducts = useMemo(() => {
    const isWomenswear = product.id.startsWith("w-");
    const isMenswear = product.id.startsWith("m-");
    const isKidswear = product.id.startsWith("k-");

    if (isWomenswear) {
      return mapToCompleteTheLookProducts(
        WOMENSWEAR_FEATURED_PRODUCT_IDS.map((id) => productsById[id]).filter(
          (p): p is ProductDetail => Boolean(p)
        )
      );
    }

    if (isMenswear) {
      return mapToCompleteTheLookProducts(menswearFeaturedProducts);
    }

    if (isKidswear) {
      return mapToCompleteTheLookProducts(kidswearFeaturedProducts);
    }

    return mapToCompleteTheLookProducts(
      WOMENSWEAR_FEATURED_PRODUCT_IDS.map((id) => productsById[id]).filter(
        (p): p is ProductDetail => Boolean(p)
      )
    );
  }, [product.id]);

  // Don't render if there are no recommended products
  if (completeTheLookProducts.length === 0) {
    return null;
  }

  return (
    <div style={{ fontFamily: fontStack }} className="w-full mt-12">
      {/* Complete the look section */}
      <div className="mb-8">
        <h2 className="text-[18px] font-medium text-(--color-preto) mb-6">
          {translate("Complete the look")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {completeTheLookProducts.map((recommendedProduct) => (
            <SmallProductCard key={recommendedProduct.id} product={recommendedProduct} />
          ))}
        </div>
      </div>

      {/* Dynamic curated recommendations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-medium text-(--color-preto)">
            {translate("Recommendations")}
          </h2>
          <button className="px-4 py-2 border border-(--color-preto) rounded-lg text-[13px] font-semibold hover:bg-gray-100 transition-colors">
            {translate("Show More")}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayedCuratedCards.map((card, index) => (
            <CuratedProductCard
              key={`${card.id}-${curatedStartIndex}`}
              card={card}
              showPrevArrow={
                totalCuratedCards > VISIBLE_CURATED_CARDS && index === 0
              }
              showNextArrow={
                totalCuratedCards > VISIBLE_CURATED_CARDS &&
                index === displayedCuratedCards.length - 1
              }
              onPrev={handlePrevCurated}
              onNext={handleNextCurated}
            />
          ))}
        </div>
      </div>

      {bestsellerProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-medium text-(--color-preto)">
              {translate("Bestsellers, edited for you")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {bestsellerProducts.map((bestseller) => (
              <SmallProductCard
                key={`bestseller-${bestseller.id}`}
                product={bestseller}
              />
            ))}
          </div>
        </div>
      )}

      {featuredProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-medium text-(--color-preto)">
              {translate("Featured")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.map((featuredProduct) => (
              <SmallProductCard
                key={`featured-${featuredProduct.id}`}
                product={featuredProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

