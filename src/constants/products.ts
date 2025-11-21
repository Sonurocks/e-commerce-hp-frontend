import {
  featuredPromoCardsByDept,
  newInProductsByDept,
  partyPlusOnesByDept,
  trendingNowByDept,
  Product,
  DepartmentKey,
} from "./department";

export type ProductDetail = Product & {
  originalPrice?: string;
  discountedPrice?: string;
  discountPercentage?: string;
  sizes?: string[];
  description?: string;
  estimatedDelivery?: string;
  images?: { src: string }[];
  completeTheLook?: string[]; // Array of product IDs for "Complete the look" section
};

// Collect all products from all sections
const getAllProducts = (): Product[] => {
  const allProducts: Product[] = [];
  
  // Get all department keys
  const departments: DepartmentKey[] = ["womenswear", "menswear", "kidswear"];
  
  // Collect from featuredPromoCardsByDept
  departments.forEach((dept) => {
    allProducts.push(...featuredPromoCardsByDept[dept]);
  });
  
  // Collect from newInProductsByDept
  departments.forEach((dept) => {
    allProducts.push(...newInProductsByDept[dept]);
  });
  
  // Collect from partyPlusOnesByDept
  departments.forEach((dept) => {
    allProducts.push(...partyPlusOnesByDept[dept]);
  });
  
  // Collect from trendingNowByDept
  departments.forEach((dept) => {
    allProducts.push(...trendingNowByDept[dept]);
  });
  
  return allProducts;
};

// Parse price string to extract original and discounted prices
const parsePrice = (priceStr?: string) => {
  if (!priceStr) return { originalPrice: undefined, discountedPrice: undefined, discountPercentage: undefined };
  
  // Handle formats like "£245 -10% £210" or "$1,745" or "£590 £569"
  const priceMatch = priceStr.match(/([£$]?[\d,]+)\s*(?:-(\d+)%)?\s*(?:([£$]?[\d,]+))?/);
  
  if (priceMatch) {
    const originalPrice = priceMatch[1];
    const discountPercentage = priceMatch[2];
    const discountedPrice = priceMatch[3] || originalPrice;
    
    return {
      originalPrice: originalPrice ? originalPrice : undefined,
      discountedPrice: discountedPrice ? discountedPrice : undefined,
      discountPercentage: discountPercentage ? `${discountPercentage}%` : undefined,
    };
  }
  
  return { originalPrice: priceStr, discountedPrice: undefined, discountPercentage: undefined };
};

// Convert Product to ProductDetail with additional fields
const enhanceProduct = (product: Product): ProductDetail => {
  const { originalPrice, discountedPrice, discountPercentage } = parsePrice(product.price);
  
  // Create images array (main image + hover image if available)
  const images: { src: string }[] = [product.image];
  if (product.hoverImage) {
    images.push(product.hoverImage);
  }
  
  // Default sizes (can be customized per product later)
  const defaultSizes = ["XS", "S", "M", "L", "XL"];
  
  return {
    ...product,
    originalPrice,
    discountedPrice: discountedPrice || originalPrice,
    discountPercentage,
    sizes: defaultSizes,
    description: `${product.title} ${product.subtitle || ""}`.trim(),
    estimatedDelivery: "25 Nov - 28 Nov",
    images,
  };
};

// Create lookup object by ID
const allProducts = getAllProducts();
export const productsById: Record<string, ProductDetail> = {};

allProducts.forEach((product) => {
  productsById[product.id] = enhanceProduct(product);
});

// Get all product IDs for generateStaticParams
export const getAllProductIds = (): string[] => {
  return allProducts.map((p) => p.id);
};

