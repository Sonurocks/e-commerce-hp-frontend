"use client";

import React from "react";
import {
  DownloadAppBanner,
  EditorialFeature,
  HelpCards,
  HeroBanner,
  ProductCard,
  SectionHeader,
  TrendingGrid,
} from "@/components";
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
    <main className="container mx-auto px-[110px] py-10">
      <section className="my-6">
        <SectionHeader
          title={departmentCopy.featured.title}
          cta={{ href: `/shop?section=featured&department=${department}`, label: departmentCopy.featured.ctaLabel }}
        />
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[750px]:grid-cols-4 gap-6">
          {featuredPromoCardsByDept[department].map((product) => (
            <ProductCard key={product.id} product={product} showBadge />
          ))}
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
          cta={{ href: `/shop?section=newIn&department=${department}`, label: departmentCopy.newIn.ctaLabel }}
        />
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[750px]:grid-cols-4 gap-6">
          {newInProductsByDept[department].map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showBadge={!!product.badge}
            />
          ))}
        </div>
      </section>

      <section className="my-10">
        <SectionHeader
          title={departmentCopy.party.title}
          cta={{ href: `/shop?section=party&department=${department}`, label: departmentCopy.party.ctaLabel }}
        />
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[750px]:grid-cols-4 gap-6">
          {partyPlusOnesByDept[department].map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showBadge={!!product.badge}
            />
          ))}
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

