'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { drawerLinks } from '../../../constants';
import { Women } from '@/assets';

interface DrawerProps {
  isDrawerOpen: boolean;
  drawerRef: React.Ref<HTMLDivElement>;
  onMouseEnter: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isDrawerOpen, drawerRef, onMouseEnter }) => {
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
          <div className="w-[280px] pl-8 font-normal">
            <h3 className="text-base text-black mb-4 font-normal uppercase">25% OFF</h3>
            <ul className="space-y-2">
              {drawerLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-black hover:underline transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Image and Text */}
          <div className="w-[400px] flex-shrink-0 ml-auto">
            <div className="w-full">
              <Image
                src={Women}
                alt="25% off promotion"
                width={400}
                height={320}
                className="w-full h-[320px] object-cover"
              />
              <div className="mt-4">
                <div className="space-y-1">
                  <p className="text-sm  text-gray-600 font-normal">Women</p>
                  <p className="text-l text-black font-normal">25% OFF</p>
                  <Link
                    href="/sale/25-off/women"
                    className="inline-block text-sm  underline hover:no-underline text-black font-normal"
                  >
                    Shop now
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

export default Drawer;

