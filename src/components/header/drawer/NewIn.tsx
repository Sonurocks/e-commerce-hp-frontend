'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { newInDrawerLinks } from '../../../constants';
import { womenJpeg } from '../../../assets';

interface NewInDrawerProps {
  isDrawerOpen: boolean;
  drawerRef: React.Ref<HTMLDivElement>;
  onMouseEnter: () => void;
}

const NewInDrawer: React.FC<NewInDrawerProps> = ({ isDrawerOpen, drawerRef, onMouseEnter }) => {
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
          <div className="flex pl-8 font-normal">
            {/* WHAT'S NEW Section */}
            <div>
              <h3 className="text-base text-[var(--color-preto)] mb-4 font-normal uppercase">WHAT is NEW</h3>
              <ul className="space-y-2">
                {newInDrawerLinks.whatsNew.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-base text-[var(--color-preto)] hover:underline transition font-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* TRENDING NOW Section */}
            <div className="ml-36">
              <h3 className="text-base text-[var(--color-preto)] mb-4 font-normal uppercase">TRENDING NOW</h3>
              <ul className="space-y-2">
                {newInDrawerLinks.trendingNow.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-base text-[var(--color-preto)] hover:underline transition font-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content - Image and Text */}
          <div className="w-[460px] flex-shrink-0 ml-auto">
            <div className="w-full">
              <Image
                src={womenJpeg}
                alt="Partywear launch promotion"
                width={460}
                height={320}
                className="w-full h-[320px] object-cover"
              />
              <div className="mt-4">
                <div className="space-y-0">
                  <p className="text-sm text-gray-600 font-normal">Spotlight on</p>
                  <p className="text-sm text-preto font-thin">PARTYWEAR LAUNCH</p>
                  <Link
                    href="/new-in/partywear-launch"
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

export default NewInDrawer;

