"use client";
import React from "react";

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

export default function ProductCardSkeleton() {
  return (
    <div className="block h-full">
      <article className="group h-full flex flex-col" style={{ fontFamily: fontStack }}>
        {/* Image skeleton - matches ProductCard dimensions */}
        <div className="relative w-full h-[300px] sm:h-[400px] bg-gray-300/70 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="mt-2 flex-1 flex flex-col">
          {/* Badge placeholder (optional) */}
          <div className="h-5 mb-1"></div>
          
          {/* Title skeleton */}
          <div className="relative h-4 bg-gray-300/70 rounded mb-2 w-3/4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
          
          {/* Subtitle skeleton */}
          <div className="relative h-4 bg-gray-300/70 rounded mb-2 w-1/2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
          
          {/* Price skeleton */}
          <div className="relative h-4 bg-gray-300/70 rounded mt-auto pt-3 w-1/3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </article>
    </div>
  );
}
