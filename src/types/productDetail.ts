import { Product } from "@/constants/department";

export type ProductDetail = Product & {
  originalPrice?: string;
  discountedPrice?: string;
  discountPercentage?: string;
  sizes?: string[];
  description?: string;
  estimatedDelivery?: string;
  images?: { src: string }[];
  completeTheLook?: string[];
};


