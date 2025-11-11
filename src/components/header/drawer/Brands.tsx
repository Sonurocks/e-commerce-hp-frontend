'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brandsDrawerLinks } from '../../../constants';
import { brandsPng } from '../../../../assets';

interface BrandsDrawerProps {
  isDrawerOpen: boolean;
  drawerRef: React.Ref<HTMLDivElement>;
  onMouseEnter: () => void;
}

const BrandsDrawer: React.FC<BrandsDrawerProps> = ({ isDrawerOpen, drawerRef, onMouseEnter }) => {
  if (!isDrawerOpen) return null;

  const alphabetGroups = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M'],
    ['N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W'],
    ['X', 'Y', 'Z'],
  ];

  return (
    <div 
      ref={drawerRef}
      className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50"
      onMouseEnter={onMouseEnter}
    >
      <div className="container mx-auto px-[72px] py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Categories */}
          <div className="flex pl-8 font-normal">
            {/* FEATURED BRANDS Section */}
            <div>
              <h3 className="text-base text-[var(--color-preto)] mb-4 font-normal uppercase">FEATURED BRANDS</h3>
              <ul className="space-y-2">
                {brandsDrawerLinks.featuredBrands.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-base text-[var(--color-preto)] hover:underline transition font-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTEMPORARY BRANDS Section */}
            <div className="ml-22">
              <h3 className="text-base text-[var(--color-preto)] mb-4 font-normal uppercase">CONTEMPORARY BRANDS</h3>
              <ul className="space-y-2">
                {brandsDrawerLinks.contemporaryBrands.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-base text-[var(--color-preto)] hover:underline transition font-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* BRANDS A-Z Section */}
            <div className="ml-46">
              <h3 className="text-base text-[var(--color-preto)] mb-4 font-normal uppercase">BRANDS A-Z</h3>
              <div className="space-y-4">
                {/* First row: 0-9 and A, B, C */}
                <div className="flex gap-8 text-base text-[var(--color-preto)] font-light">
                  <Link href="/brands/0-9" className="hover:underline transition">
                    0-9
                  </Link>
                  {alphabetGroups[0].map((letter, letterIndex) => (
                    <Link
                      key={letterIndex}
                      href={`/brands/${letter.toLowerCase()}`}
                      className={`hover:underline transition ${letterIndex === 0 ? 'ml-4' : ''}`}
                    >
                      {letter}
                    </Link>
                  ))}
                </div>
                {/* Remaining alphabet groups */}
                {alphabetGroups.slice(1).map((group, groupIndex) => (
                  <div key={groupIndex} className="flex gap-7 text-base text-[var(--color-preto)] font-light">
                    {group.map((letter, letterIndex) => (
                      <Link
                        key={letterIndex}
                        href={`/brands/${letter.toLowerCase()}`}
                        className="hover:underline transition"
                      >
                        {letter}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="mt-6">
                  <Link
                    href="/brands/all"
                    className="text-base text-[var(--color-preto)] hover:underline transition font-light"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image and Text */}
          <div className="w-[470px] flex-shrink-0 ml-auto">
            <div className="w-full">
              <Image
                src={brandsPng}
                alt="Brand focus KHAITE"
                width={470}
                height={320}
                className="w-full h-[320px] object-cover"
              />
              <div className="mt-4">
                <div className="space-y-0">
                  <p className="text-sm text-gray-600 font-normal">Brand focus</p>
                  <p className="text-sm text-preto font-thin">KHAITE</p>
                  <Link
                    href="/brands/khaite"
                    className="inline-block text-sm underline hover:no-underline text-[var(--color-preto)] font-normal"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsDrawer;

