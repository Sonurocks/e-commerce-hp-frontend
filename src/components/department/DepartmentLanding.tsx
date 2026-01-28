"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DownloadAppBanner,
  EditorialFeature,
  HelpCards,
  HeroBanner,
  ProductCard,
  SectionHeader,
  TrendingGrid,
} from "@/components";
import ProductCardSkeleton from "./ProductCardSkeleton";
import {
  DepartmentKey,
  editorialFeatureByDept,
  featuredPromoCardsByDept,
  newInProductsByDept,
  partyPlusOnesByDept,
  trendingNowByDept,
} from "@/constants/department";
import { kidsection2, mensection2, womensection2a, womensection2b } from "@/assets";
import { useLanguage } from "@/context/LanguageContext";

interface DepartmentLandingProps {
  department: DepartmentKey;
}

const DepartmentLanding: React.FC<DepartmentLandingProps> = ({ department }) => {
  const { translations } = useLanguage();
  const homeCopy = translations.homepage;
  const departmentCopy = homeCopy.departments[department];
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate loading on mount/refresh
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Brief delay to show skeleton
    return () => clearTimeout(timer);
  }, [department]);

  if (!departmentCopy) {
    return null;
  }

  const heroSection =
    department === "womenswear" ? (
      <HeroBanner
        image={womensection2a}
        image2={womensection2b}
        title={departmentCopy.hero.primary.title}
        title2={departmentCopy.hero.secondary?.title}
        shopLink={`/shop?section=hero-primary&department=${department}`}
        shopLink2={`/shop?section=hero-secondary&department=${department}`}
        shopText={departmentCopy.hero.primary.ctaLabel}
        shopText2={departmentCopy.hero.secondary?.ctaLabel}
      />
    ) : (
      <HeroBanner
        image={department === "menswear" ? mensection2 : kidsection2}
        title={departmentCopy.hero.primary.title}
        shopLink={`/shop?section=hero-primary&department=${department}`}
        shopText={departmentCopy.hero.primary.ctaLabel}
      />
    );

  return (
    <main className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-10 max-w-[1440px] overflow-x-hidden">
      <section className="my-6">
        <SectionHeader
          title={departmentCopy.featured.title}
        />
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {isLoading ? (
            // Show skeleton loaders
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-featured-${index}`} className="flex-shrink-0 w-[280px] min-w-[280px] md:w-auto md:min-w-0">
                <ProductCardSkeleton />
              </div>
            ))
          ) : (
            // Show actual products
            featuredPromoCardsByDept[department].map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] min-w-[280px] md:w-auto md:min-w-0">
                <ProductCard product={product} showBadge />
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center mt-6">
          <Link
            href={`/shop?section=featured&department=${department}`}
            className="w-full md:w-auto border border-[var(--theme-border)] text-(--color-preto) px-4 py-2 rounded text-sm font-semibold transition-colors text-center"
          >
            Shop now
          </Link>
        </div>
      </section>

      <EditorialFeature
        image={editorialFeatureByDept[department].image}
        title={departmentCopy.editorial.title}
        description={departmentCopy.editorial.description}
        ctaLabel={departmentCopy.editorial.ctaLabel}
        department={department}
      />

      <section className="my-10">
        <SectionHeader
          title={departmentCopy.newIn.title}
        />
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {isLoading ? (
            // Show skeleton loaders
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-newin-${index}`} className="flex-shrink-0 w-[280px] min-w-[280px] md:w-auto md:min-w-0">
                <ProductCardSkeleton />
              </div>
            ))
          ) : (
            // Show actual products
            newInProductsByDept[department].map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] min-w-[280px] md:w-auto md:min-w-0">
                <ProductCard
                  product={product}
                  showBadge={!!product.badge}
                />
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center mt-6">
          <Link
            href={`/shop?section=newIn&department=${department}`}
            className="w-full md:w-auto border border-[var(--theme-border)] text-(--color-preto) px-4 py-2 rounded text-sm font-semibold transition-colors text-center"
          >
            Shop now
          </Link>
        </div>
      </section>

      <section className="my-10">
        <SectionHeader
          title={departmentCopy.party.title}
        />
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {isLoading ? (
            // Show skeleton loaders
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-party-${index}`} className="flex-shrink-0 w-[280px] min-w-[280px] md:w-auto md:min-w-0">
                <ProductCardSkeleton />
              </div>
            ))
          ) : (
            // Show actual products
            partyPlusOnesByDept[department].map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] min-w-[280px] md:w-auto md:min-w-0">
                <ProductCard
                  product={product}
                  showBadge={!!product.badge}
                />
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center mt-6">
          <Link
            href={`/shop?section=party&department=${department}`}
            className="w-full md:w-auto border border-[var(--theme-border)] text-(--color-preto) px-4 py-2 rounded text-sm font-semibold transition-colors text-center"
          >
            Shop now
          </Link>
        </div>
      </section>

      {heroSection}

      <TrendingGrid items={trendingNowByDept[department]} />

      <HelpCards />

      <DownloadAppBanner />
    </main>
  );
};

export default DepartmentLanding;

