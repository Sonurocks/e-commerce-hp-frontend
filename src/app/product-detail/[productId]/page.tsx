import { notFound } from "next/navigation";
import React from "react";
import { productsById, getAllProductIds, ProductDetail } from "@/constants/products";
import ProductDetailSection from "@/components/product-detail/ProductDetailSection";

export async function generateStaticParams() {
  const productIds = getAllProductIds();
  return productIds.map((id) => ({
    productId: id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product: ProductDetail | undefined = productsById[productId];

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-[110px] py-10">
      <ProductDetailSection product={product} />
    </main>
  );
}

