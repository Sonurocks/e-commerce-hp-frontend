"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ProductDetail, productsById } from "@/constants/products";
import { GoHeart } from "react-icons/go";
import Image from "next/image";
// Import your custom images for bestseller section here
import {
  bestsellerRedbag1,bestsellerRedbag2, bestsellerSpoon1, bestsellerSpoon2, bestsellerHand1, bestsellerHand2,
  bestsellerBlacks1, bestsellerBlacks2, bestsellerWhiteb1, bestsellerWhiteb2, bestsellerMenb1, bestsellerMenb2, bestsellerBrownb1,
  bestsellerBrownb2, bestsellerPen1, bestsellerPen2, bestsellerCottont1, bestsellerCottont2, bestsellerTeen1,
  bestsellerTeen2, bestsellerCap1, bestsellerCap2, bestsellerCool1, bestsellerCool2, bestsellerShorts1, bestsellerShorts2,
  recommendationGanni1, recommendationGanni2, recommendationLeopard1, recommendationLeopard2, recommendationAnimalprint1,
  recommendationAnimalprint2, recommendationSatin1, recommendationSatin2, recommendationSleevetop1,recommendationSleevetop2,
  recommendationLongsleeve1, recommendationLongsleeve2, recommendationZipup1, recommendationZipup2, recommendationBomber1,
  recommendationBomber2, recommendationButton1, recommendationButton2, recommendationCardigan1, recommendationCardigan2,
  recommendationCotton1, recommendationCotton2, recommendationChecked1, recommendationChecked2, recommendationElbow1,
  recommendationElbow2, recommendationDiamond1, recommendationDiamond2, recommendationPatch1, recommendationPatch2,
  completeLookBlack1, completeLookBlack2, completeLookFf1, completeLookFf2, completeLookLogojean1, completeLookLogojean2,
  featuredPocket1, featuredPocket2, featuredKnitpolo1, featuredKnitpolo2, featuredPaulshark1, featuredPaulshark2,
  featuredLogo1,featuredLogo2,featuredSweater1,featuredSweater2,featuredCopy1,featuredCopy2,featuredFloral1,featuredFloral2,
  featuredMarni1,featuredMarni2,featuredBomber1,featuredBomber2,featuredPolo1,featuredPolo2,
} from "@/assets";

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

// Custom bestseller products for womenswear
const womenswearBestsellers: ProductDetail[] = [
  {
    id: "bestseller-1",
    title: "Longchamp",
    subtitle: "Le Pliage mini bag",
    price: "£80",
    image: bestsellerRedbag1,
    hoverImage: bestsellerRedbag2,
  },
  {
    id: "bestseller-2",
    title: "Christofle",
    subtitle: "Malmaison spoon",
    price: "£62",
    image: bestsellerSpoon1,
    hoverImage: bestsellerSpoon2,
  },
  {
    id: "bestseller-3",
    title: "Vivienne Westwood",
    subtitle: "Balbina logo-charm bracelet",
    price: "£100",
    image: bestsellerHand1,
    hoverImage: bestsellerHand2,
  },
  {
    id: "bestseller-4",
    title: "Dolce & Gabbana",
    subtitle: "logo-embossed cut-out slides",
    price: "£220",
    image: bestsellerBlacks1,
    hoverImage: bestsellerBlacks2,
  },
  {
    id: "bestseller-5",
    title: "Moon Boot",
    subtitle: "Icon logo-print padded boots",
    price: "£124",
    image: bestsellerWhiteb1,
    hoverImage: bestsellerWhiteb2,
  },
] as ProductDetail[];

// Custom bestseller products for menswear
const menswearBestsellers: ProductDetail[] = [
  {
    id: "bestseller-m-1",
    title: "Axel Arigato",
    subtitle: "Dice T-Toe sneakers",
    price: "£177",
    image: bestsellerMenb1,
    hoverImage: bestsellerMenb2,
  },
  {
    id: "bestseller-m-2",
    title: "Christofle",
    subtitle: "Malmaison spoon",
    price: "£62",
    image: bestsellerSpoon1,
    hoverImage: bestsellerSpoon2,
  },
  {
    id: "bestseller-m-3",
    title: "Moon Boot",
    subtitle: "Icon logo-print padded boots",
    price: "£124",
    image: bestsellerWhiteb1,
    hoverImage: bestsellerWhiteb2,
  },
  {
    id: "bestseller-m-4",
    title: "Christofle",
    subtitle: "Uni chopsticks",
    price: "£90",
    image: bestsellerPen1,
    hoverImage: bestsellerPen2,
  },
  {
    id: "bestseller-m-5",
    title: "Moon Boot",
    subtitle: "Icon Low Glance snow boots",
    price: "£146",
    image: bestsellerBrownb1,
    hoverImage: bestsellerBrownb2,
  },
] as ProductDetail[];

// Custom bestseller products for kidswear
const kidswearBestsellers: ProductDetail[] = [
  {
    id: "bestseller-k-1",
    title: "MM6 Maison Margiela Kids",
    subtitle: "logo-print cotton T-shirt",
    originalPrice: "£80",
    discountedPrice: "£56",
    discountPercentage: "-30%",
    price: "£56",
    image: bestsellerCottont1,
    hoverImage: bestsellerCottont2,
    badge: "Extra 20% off",
  },
  {
    id: "bestseller-k-2",
    title: "Moncler Enfant",
    subtitle: "TEEN patch-detail zip-up padded jacket",
    price: "£537",
    image: bestsellerTeen1,
    hoverImage: bestsellerTeen2,
  },
  {
    id: "bestseller-k-3",
    title: "DSQUARED2 Kids",
    subtitle: "Icon baseball cap",
    originalPrice: "£85",
    discountedPrice: "£64",
    discountPercentage: "-25%",
    price: "£64",
    image: bestsellerCap1,
    hoverImage: bestsellerCap2,
  },
  {
    id: "bestseller-k-4",
    title: "DSQUARED2 Kids",
    subtitle: "Cool Guy jeans",
    originalPrice: "£200",
    discountedPrice: "£107",
    discountPercentage: "-40%",
    price: "£107",
    image: bestsellerCool1,
    hoverImage: bestsellerCool2,
    badge: "Extra 20% off",
  },
  {
    id: "bestseller-k-5",
    title: "BOSS Kidswear",
    subtitle: "logo-print swim shorts",
    originalPrice: "£59",
    discountedPrice: "£52",
    discountPercentage: "-10%",
    price: "£52",
    image: bestsellerShorts1,
    hoverImage: bestsellerShorts2,
    badge: "Extra 20% off",
  },
] as ProductDetail[];

// Custom recommendations products for womenswear
const womenswearRecommendations: ProductDetail[] = [
  {
    id: "recommendation-1",
    title: "GANNI",
    subtitle: "leopard-print blouse",
    originalPrice: "£263",
    discountedPrice: "£141",
    discountPercentage: "-45%",
    price: "£141",
    image: recommendationGanni1,
    hoverImage: recommendationGanni2,
    badge: "Extra 20% off",
  },
  {
    id: "recommendation-2",
    title: "GANNI",
    subtitle: "leopard-print hoodie",
    originalPrice: "£345",
    discountedPrice: "£276",
    discountPercentage: "-20%",
    price: "£276",
    image: recommendationLeopard1,
    hoverImage: recommendationLeopard2,
    badge: "Extra 20% off",
  },
  {
    id: "recommendation-3",
    title: "GANNI",
    subtitle: "animal-print long-sleeve T-shirt",
    originalPrice: "£200",
    discountedPrice: "£130",
    discountPercentage: "-35%",
    price: "£130",
    image: recommendationAnimalprint1,
    hoverImage: recommendationAnimalprint2,
    badge: "Extra 20% off",
  },
  {
    id: "recommendation-4",
    title: "GANNI",
    subtitle: "ruched satin top",
    originalPrice: "£235",
    discountedPrice: "£203",
    discountPercentage: "-10%",
    price: "£203",
    image: recommendationSatin1,
    hoverImage: recommendationSatin2,
  },
  {
    id: "recommendation-5",
    title: "GANNI",
    subtitle: "leopard long-sleeve top",
    price: "£146",
    image: recommendationSleevetop1,
    hoverImage: recommendationSleevetop2,
  },
] as ProductDetail[];

// Custom recommendations products for menswear
const menswearRecommendations: ProductDetail[] = [
  {
    id: "recommendation-m-1",
    title: "Paul & Shark",
    subtitle: "long-sleeve jacket",
    originalPrice: "£1,470",
    discountedPrice: "£1,362",
    discountPercentage: "-7%",
    price: "£1,362",
    image: recommendationLongsleeve1,
    hoverImage: recommendationLongsleeve2,
    badge: "Extra 20% off",
  },
  {
    id: "recommendation-m-2",
    title: "Paul & Shark",
    subtitle: "Typhoon wool-paneled zip-up sweater",
    price: "£630",
    image: recommendationZipup1,
    hoverImage: recommendationZipup2,
  },
  {
    id: "recommendation-m-3",
    title: "Paul & Shark",
    subtitle: "suede-detail bomber jacket",
    price: "£740",
    image: recommendationBomber1,
    hoverImage: recommendationBomber2,
  },
  {
    id: "recommendation-m-4",
    title: "Paul & Shark",
    subtitle: "buttoned blouson",
    price: "£740",
    image: recommendationButton1,
    hoverImage: recommendationButton2,
  },
  {
    id: "recommendation-m-5",
    title: "Paul & Shark",
    subtitle: "ribbed-cuff zip-up cardigan",
    price: "£439",
    image: recommendationCardigan1,
    hoverImage: recommendationCardigan2,
  },
] as ProductDetail[];

// Custom recommendations products for kidswear
const kidswearRecommendations: ProductDetail[] = [
  {
    id: "recommendation-k-1",
    title: "Burberry Kids",
    subtitle: "Cordelia EKD cotton cardigan",
    price: "£471",
    image: recommendationCotton1,
    hoverImage: recommendationCotton2,
  },
  {
    id: "recommendation-k-2",
    title: "Burberry Kids",
    subtitle: "checked elbow-patches cardigan",
    price: "£340",
    image: recommendationChecked1,
    hoverImage: recommendationChecked2,
  },
  {
    id: "recommendation-k-3",
    title: "Burberry Kids",
    subtitle: "heart-elbow-patch cardigan",
    price: "£340",
    image: recommendationElbow1,
    hoverImage: recommendationElbow2,
  },
  {
    id: "recommendation-k-4",
    title: "Bonpoint",
    subtitle: "diamond-quilted wool cardigan",
    price: "£180",
    image: recommendationDiamond1,
    hoverImage: recommendationDiamond2,
    badge: "Extra 20% off",
  },
  {
    id: "recommendation-k-5",
    title: "Burberry Kids",
    subtitle: "check sleeve-patch cardigan",
    price: "£340",
    image: recommendationPatch1,
    hoverImage: recommendationPatch2,
  },
] as ProductDetail[];

const menswearCompleteTheLook: ProductDetail[] = [
  {
    id: "m-look-1",
    title: "Arte Antwerp",
    subtitle: "logo-print jeans",
    originalPrice: "£125",
    discountedPrice: "£111",
    discountPercentage: "-10%",
    price: "£111",
    image: completeLookLogojean1,
    hoverImage: completeLookLogojean2,
  },
  {
    id: "m-look-2",
    title: "Lanvin",
    subtitle: "LANVIN Black",
    price: "£768",
    image: completeLookBlack1,
    hoverImage: completeLookBlack2,
  },
  {
    id: "m-look-3",
    title: "Family First",
    subtitle: "crinkled-finish shirt",
    originalPrice: "£186",
    discountedPrice: "£158",
    discountPercentage: "-15%",
    price: "£158",
    image: completeLookFf1,
    hoverImage: completeLookFf2,
  },
] as ProductDetail[];

const menswearFeaturedProducts: ProductDetail[] = [
  {
    id: "m-featured-0",
    title: "Paul & Shark",
    subtitle: "wool cargo pants",
    originalPrice: "£300",
    discountedPrice: "£300",
    price: "£300",
    image: featuredPocket1,
    hoverImage: featuredPocket2,
  },
  {
    id: "m-featured-1",
    title: "Paul & Shark",
    subtitle: "fine-knit polo shirt",
    originalPrice: "£290",
    discountedPrice: "£290",
    price: "£290",
    image: featuredKnitpolo1,
    hoverImage: featuredKnitpolo2,
  },
  {
    id: "m-featured-2",
    title: "Paul & Shark",
    subtitle: "wool blend straight-leg trousers",
    originalPrice: "£304",
    discountedPrice: "£304",
    price: "£304",
    image: featuredPaulshark1,
    hoverImage: featuredPaulshark2,
  },
  {
    id: "m-featured-3",
    title: "Paul & Shark",
    subtitle: "shoulder-detail T-shirt",
    originalPrice: "£235",
    discountedPrice: "£235",
    price: "£235",
    image: featuredLogo1,
    hoverImage: featuredLogo2,
  },
  {
    id: "m-featured-4",
    title: "Paul & Shark",
    subtitle: "half-zip sweater",
    originalPrice: "£723",
    discountedPrice: "£723",
    price: "£723",
    image: featuredSweater1,
    hoverImage: featuredSweater2,
  },
] as ProductDetail[];

const kidswearFeaturedProducts: ProductDetail[] = [
  {
    id: "k-featured-0",
    title: "Givenchy Kids",
    subtitle: "eye-motif hoodie",
    price: "£405",
    image: featuredCopy1,
    hoverImage: featuredCopy2,
  },
  {
    id: "k-featured-1",
    title: "Givenchy Kids",
    subtitle: "floral print short-sleeve shirt dress",
    price: "£410",
    image: featuredFloral1,
    hoverImage: featuredFloral2,
  },
  {
    id: "k-featured-2",
    title: "Marni Kids",
    subtitle: "logo T-shirt",
    price: "£76",
    image: featuredMarni1,
    hoverImage: featuredMarni2,
  },
  {
    id: "k-featured-3",
    title: "Marni Kids",
    subtitle: "floral-print hooded bomber jacket",
    price: "£259",
    image: featuredBomber1,
    hoverImage: featuredBomber2,
  },
  {
    id: "k-featured-4",
    title: "POLO RALPH LAUREN",
    subtitle: "cotton crew-neck T-shirt",
    price: "£54",
    image: featuredPolo1,
    hoverImage: featuredPolo2,
  },
] as ProductDetail[];

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
  const { brand, productName } = parseProductTitle(product.title);
  
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const currentImage =
    isHovered && product.hoverImage ? product.hoverImage : product.image;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/product-detail/${product.id}`} className="block">
      <article className="group" style={{ fontFamily: fontStack }}>
        <div className="relative w-full h-[280px] flex items-center justify-center">
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 z-10 p-2 rounded-full transition-colors"
            aria-label="Add to wishlist"
          >
            <GoHeart
              className={`w-4 h-4 ${isWishlisted ? 'fill-black text-(--color-preto)' : "text-(--color-preto)"}`}
              strokeWidth={1.0}
            />
          </button>
          <Image
            src={currentImage.src}
            alt={product.title}
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
            {product.brand}
          </h3>
          {/* Product name */}
          <p className="text-[13px] text-(--color-preto) font-normal mt-1 leading-tight">
            {product.productName}
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
  const currentImage =
    isHovered && card.hoverImage ? card.hoverImage : card.image;

  return (
    <article className="group" style={{ fontFamily: fontStack }}>
      <div
        className="relative w-full h-[320px] flex items-center justify-center bg-white border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {card.badge && (
          <span className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-[11px] font-semibold text-(--color-preto) border border-gray-200 rounded-full">
            {card.badge}
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
        >
          <GoHeart className="w-5 h-5 text-(--color-preto)" strokeWidth={1.0} />
        </button>
        <Image
          src={currentImage.src}
          alt={card.productName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
          className="object-contain"
        />
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[13px] font-semibold text-(--color-preto)">
          {card.brand}
        </p>
        <p className="text-[13px] text-(--color-preto)">{card.productName}</p>
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
          Complete the look
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
            Recommendations
          </h2>
          <button className="px-4 py-2 border border-(--color-preto) rounded-lg text-[13px] font-semibold hover:bg-gray-100 transition-colors">
            Show More
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
              Bestsellers, edited for you
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
              Featured
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

