import { notFound } from 'next/navigation';
import React from 'react';
import ProductCard from '@/components/department/ProductCard';
import SectionHeader from '@/components/department/SectionHeader';
import EditorialFeature from '@/components/department/EditorialFeature';
import HeroBanner from '@/components/department/HeroBanner';
import TrendingGrid from '@/components/department/TrendingGrid';
import DownloadAppBanner from '@/components/department/DownloadAppBanner';
import {
  DepartmentKey,
  featuredPromoCardsByDept,
  newInProductsByDept,
  partyPlusOnesByDept,
  trendingNowByDept,
} from '@/constants/department';

export async function generateStaticParams() {
  return [
    { department: 'womenswear' },
    { department: 'menswear' },
    { department: 'kidswear' },
  ];
}



export default async function DepartmentPage({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  const key = department as DepartmentKey;
  if (!['womenswear', 'menswear', 'kidswear'].includes(key)) {
    notFound();
  }


  return (
    <main className="container mx-auto px-[36px] py-10">

      {/* Top: Get 25% off the new season - 4 cards */}
      <section className="my-6">
        <SectionHeader title="Get 25% off the new season" cta={{ href: '#', label: 'Shop Now' }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredPromoCardsByDept[key as DepartmentKey].map((p) => (
            <ProductCard key={p.id} product={p} showBadge />
          ))}
        </div>
      </section>

      {/* Editorial Feature */}
      <EditorialFeature image={featuredPromoCardsByDept[key as DepartmentKey][0].image} />

      {/* New in row */}
      <section className="my-10">
        <SectionHeader title="New in: handpicked daily from the world's best brands and boutiques" cta={{ href: '#', label: 'Shop Now' }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newInProductsByDept[key as DepartmentKey].map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Party plus-ones */}
      <section className="my-10">
        <SectionHeader title="Party plus-ones" cta={{ href: '#', label: 'Shop Now' }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partyPlusOnesByDept[key as DepartmentKey].map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Mid hero banner */}
      <HeroBanner image={featuredPromoCardsByDept[key as DepartmentKey][0].image} />

      {/* Trending now */}
      <TrendingGrid items={trendingNowByDept[key as DepartmentKey]} />

      {/* Download app and newsletter */}
      <DownloadAppBanner />
    </main>
  );
}


