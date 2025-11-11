'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { preOwnedDrawerLinks } from '../../../constants';
import { preOwnedPng } from '../../../../assets';

interface PreOwnedDrawerProps {
  isDrawerOpen: boolean;
  drawerRef: React.Ref<HTMLDivElement>;
  onMouseEnter: () => void;
}

const PreOwnedDrawer: React.FC<PreOwnedDrawerProps> = ({ isDrawerOpen, drawerRef, onMouseEnter }) => {
  if (!isDrawerOpen) return null;

  return (
    <div 
      ref={drawerRef}
      className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50"
      onMouseEnter={onMouseEnter}
    >
      <div className="container mx-auto px-[72px] py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Categories */}
          <div className="flex pl-8 font-normal gap-12">
            {/* PRE-OWNED Section */}
            <div>
              <h3 className="text-base text-[var(--color-preto)] mb-4 font-thin uppercase whitespace-nowrap">PRE-OWNED</h3>
              <ul className="space-y-2">
                {preOwnedDrawerLinks.preOwned.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-base text-[var(--color-preto)] hover:underline transition font-light whitespace-nowrap">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* BRANDS Section */}
            <div className='ml-12'>
              <h3 className="text-base text-[var(--color-preto)] mb-4 font-thin uppercase whitespace-nowrap">BRANDS</h3>
              <ul className="space-y-2">
                {preOwnedDrawerLinks.brands.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-base text-[var(--color-preto)] hover:underline transition font-light whitespace-nowrap">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* DISCOVER Section */}
            <div className='ml-20'>
              <h3 className="text-base text-[var(--color-preto)] mb-4 font-thin uppercase whitespace-nowrap">DISCOVER</h3>
              <ul className="space-y-2">
                {preOwnedDrawerLinks.discover.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-base text-[var(--color-preto)] hover:underline transition font-light whitespace-nowrap">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* OUR SUSTAINABLE SERVICES Section */}
            <div className="max-w-[235px] ml-20">
              <h3 className="text-base text-[var(--color-preto)] mb-4 font-thin uppercase whitespace-nowrap">OUR SUSTAINABLE SERVICES</h3>
              <ul className="space-y-2">
                {preOwnedDrawerLinks.sustainableServices.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-base text-[var(--color-preto)] hover:underline transition font-light leading-relaxed">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content - Image and Text */}
          <div className="w-[440px] flex-shrink-0 ml-auto mr-10">
            <div className="w-full">
              <Image
                src={preOwnedPng}
                alt="Pre-owned Celine"
                width={440}
                height={320}
                className="w-full h-[320px] object-cover"
              />
              <div className="mt-4">
                <div className="space-y-0">
                  <p className="text-sm text-gray-600 font-normal">Spotlight on</p>
                  <p className="text-sm text-preto font-thin">PRE-OWNED CELINE</p>
                  <Link
                    href="/pre-owned/celine"
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

export default PreOwnedDrawer;

