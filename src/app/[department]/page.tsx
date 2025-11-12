import { notFound } from 'next/navigation';
import React from 'react';
import ProductCard from '@/components/department/ProductCard';
import SectionHeader from '@/components/department/SectionHeader';
import EditorialFeature from '@/components/department/EditorialFeature';
import HeroBanner from '@/components/department/HeroBanner';
import TrendingGrid from '@/components/department/TrendingGrid';
import DownloadAppBanner from '@/components/department/DownloadAppBanner';
import HelpCards from '@/components/department/HelpCards';
import {
  DepartmentKey,
  featuredPromoCardsByDept,
  newInProductsByDept,
  partyPlusOnesByDept,
  trendingNowByDept,
  editorialFeatureByDept,
  partySectionTitleByDept,
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
    <main className="container mx-auto px-[110px] py-10">

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
      <EditorialFeature 
        image={editorialFeatureByDept[key as DepartmentKey].image}
        title={editorialFeatureByDept[key as DepartmentKey].title}
        description={editorialFeatureByDept[key as DepartmentKey].description}
      />

      {/* New in row */}
      <section className="my-10">
        <SectionHeader title="New in: handpicked daily from the world's best brands and boutiques" cta={{ href: '#', label: 'Shop Now' }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newInProductsByDept[key as DepartmentKey].map((p) => (
            <ProductCard key={p.id} product={p} showBadge={!!p.badge} />
          ))}
        </div>
      </section>

      {/* Party plus-ones / Watches and fine jewelry */}
      <section className="my-10">
        <SectionHeader title={partySectionTitleByDept[key as DepartmentKey]} cta={{ href: '#', label: 'Shop Now' }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partyPlusOnesByDept[key as DepartmentKey].map((p) => (
            <ProductCard key={p.id} product={p} showBadge={!!p.badge} />
          ))}
        </div>
      </section>

      {/* Mid hero banner */}
      <HeroBanner image={featuredPromoCardsByDept[key as DepartmentKey][0].image} />

      {/* Trending now */}
      <TrendingGrid items={trendingNowByDept[key as DepartmentKey]} />

      {/* Help Cards */}
      <HelpCards />

      {/* Download app and newsletter */}
      <DownloadAppBanner />
    </main>
  );
}


