"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ProductDetail, productsById } from "@/constants/products";
import { Product } from "@/constants/department";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "@/components/department/ProductCard";
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
    "Chloé",
    "GANNI",
    "AGOLDE",
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

// Helper function to convert CompleteTheLookProduct to Product
const convertToProduct = (product: CompleteTheLookProduct): Product => {
  const title = product.brand && product.productName 
    ? `${product.brand} ${product.productName}` 
    : product.title;
  const subtitle = product.brand ? product.productName : product.subtitle;
  const price = product.discountedPrice || product.price || "";
  
  return {
    id: product.id,
    title,
    subtitle,
    price,
    image: product.image,
    hoverImage: product.hoverImage,
    badge: product.badge,
  };
};

// Helper function to convert CuratedProductCardData to Product
const convertCuratedToProduct = (card: CuratedProductCardData): Product => {
  const title = card.brand && card.productName
    ? `${card.brand} ${card.productName}`
    : card.productName;
  const subtitle = card.brand ? card.productName : undefined;
  const price = card.price || "";
  
  return {
    id: card.id,
    title,
    subtitle,
    price,
    image: card.image,
    hoverImage: card.hoverImage,
    badge: card.badge,
  };
};

export default function ProductDetailAdditionalSection({
  product,
}: {
  product: ProductDetail;
}) {
  const [curatedStartIndex, setCuratedStartIndex] = useState(0);
  const { translations } = useLanguage();
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  // Determine department from product ID
  const getDepartment = (): "womenswear" | "menswear" | "kidswear" => {
    if (product.id.startsWith("m-")) return "menswear";
    if (product.id.startsWith("k-")) return "kidswear";
    return "womenswear";
  };

  const department = getDepartment();

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
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[750px]:grid-cols-4 gap-6">
          {completeTheLookProducts.map((recommendedProduct) => {
            const product = convertToProduct(recommendedProduct);
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>

      {/* Dynamic curated recommendations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-medium text-(--color-preto)">
            {translate("Recommendations")}
          </h2>
          <Link
            href={`/shop?section=newIn&department=${department}`}
            className="px-4 py-2 border border-(--color-preto) rounded-lg text-[13px] font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            {translate("Show More")}
          </Link>
        </div>
        <div className="relative">
          {totalCuratedCards > VISIBLE_CURATED_CARDS && (
            <button
              aria-label="Previous recommendations"
              onClick={handlePrevCurated}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center border border-gray-300 rounded bg-white shadow-sm hover:bg-gray-50"
            >
              &lt;
            </button>
          )}
          {totalCuratedCards > VISIBLE_CURATED_CARDS && (
            <button
              aria-label="Next recommendations"
              onClick={handleNextCurated}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center border border-gray-300 rounded bg-white shadow-sm hover:bg-gray-50"
            >
              &gt;
            </button>
          )}
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[750px]:grid-cols-4 gap-6">
            {displayedCuratedCards.map((card) => {
              const product = convertCuratedToProduct(card);
              return <ProductCard key={`${card.id}-${curatedStartIndex}`} product={product} />;
            })}
          </div>
        </div>
      </div>

      {bestsellerProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-medium text-(--color-preto)">
              {translate("Bestsellers, edited for you")}
            </h2>
          </div>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[750px]:grid-cols-4 gap-6">
            {bestsellerProducts.map((bestseller) => {
              const product = convertToProduct(bestseller);
              return <ProductCard key={`bestseller-${product.id}`} product={product} />;
            })}
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
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[750px]:grid-cols-4 gap-6">
            {featuredProducts.map((featuredProduct) => {
              const product = convertToProduct(featuredProduct);
              return <ProductCard key={`featured-${product.id}`} product={product} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

