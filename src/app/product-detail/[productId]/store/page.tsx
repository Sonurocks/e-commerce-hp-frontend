import { notFound } from "next/navigation";
import React from "react";
import { productsById, getAllProductIds, ProductDetail } from "@/constants/products";
import StorePage from "@/components/product-detail/StorePage";

export async function generateStaticParams() {
  const productIds = getAllProductIds();
  return productIds.map((id) => ({
    productId: id,
  }));
}

export default async function ProductStorePage({
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
      <StorePage product={product} />
    </main>
  );
}

