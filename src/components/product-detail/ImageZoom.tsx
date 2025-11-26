"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ImageZoomProps {
  image: { src: string };
  alt: string;
  zoomLevel?: number;
  magnifierSize?: number;
  heightClass?: string;
  onHoverChange?: (isHovered: boolean) => void;
  onPositionChange?: (position: { x: number; y: number } | null) => void;
}

export default function ImageZoom({
  image,
  alt,
  zoomLevel = 2.5,
  magnifierSize = 150,
  heightClass = "h-[480px]",
  onHoverChange,
  onPositionChange,
}: ImageZoomProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && imageRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const img = imageRef.current.querySelector("img");
        if (img) {
          const imgRect = img.getBoundingClientRect();
          setContainerDimensions({
            width: containerRect.width,
            height: containerRect.height,
          });
          setImageDimensions({
            width: imgRect.width,
            height: imgRect.height,
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

const latestPositionCallback = useRef<typeof onPositionChange | null>(null);
  const lastEmittedPosition = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    latestPositionCallback.current = onPositionChange;
  }, [onPositionChange]);

  const emitPosition = (position: { x: number; y: number } | null) => {
    const last = lastEmittedPosition.current;
    const isSame =
      (last === null && position === null) ||
      (last !== null &&
        position !== null &&
        last.x === position.x &&
        last.y === position.y);
    if (isSame) {
      return;
    }
    lastEmittedPosition.current = position ? { ...position } : null;
    latestPositionCallback.current?.(position);
  };

  const getZoomedImagePosition = (x: number, y: number) => {
    if (!containerDimensions.width || !containerDimensions.height) {
      return { x: 0, y: 0 };
    }

    const percentX = (x / containerDimensions.width) * 100;
    const percentY = (y / containerDimensions.height) * 100;

    return {
      x: Math.min(100, Math.max(0, percentX)),
      y: Math.min(100, Math.max(0, percentY)),
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Keep highlight inside the container but allow zoom to reach the edges
    const halfMagnifier = magnifierSize / 2;
    const overlayX = Math.max(
      halfMagnifier,
      Math.min(x, Math.max(halfMagnifier, containerDimensions.width - halfMagnifier))
    );
    const overlayY = Math.max(
      halfMagnifier,
      Math.min(y, Math.max(halfMagnifier, containerDimensions.height - halfMagnifier))
    );
    const clampedX = Math.max(0, Math.min(x, containerDimensions.width));
    const clampedY = Math.max(0, Math.min(y, containerDimensions.height));

    setMousePosition((prev) => {
      if (prev.x === overlayX && prev.y === overlayY) {
        return prev;
      }
      return { x: overlayX, y: overlayY };
    });

    emitPosition(getZoomedImagePosition(clampedX, clampedY));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
    emitPosition(null);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${heightClass} flex items-center justify-center bg-white overflow-hidden cursor-crosshair`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Image */}
      <div ref={imageRef} className="relative w-full h-full">
        <Image
          src={image.src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Magnifying Glass Overlay - Rectangular with dotted border */}
      {isHovered && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            left: `${mousePosition.x - magnifierSize / 2}px`,
            top: `${mousePosition.y - magnifierSize / 2}px`,
            border: "2px dashed rgba(59, 130, 246, 0.8)",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)",
          }}
        />
      )}
    </div>
  );
}

// Export a component for the zoomed view
export function ZoomedImageView({
  image,
  zoomLevel = 2.5,
  position,
  heightClass = "h-[480px]",
}: {
  image: { src: string };
  zoomLevel?: number;
  position: { x: number; y: number } | null;
  heightClass?: string;
}) {
  if (!position) return null;

  return (
    <div className={`relative w-full ${heightClass} bg-white border border-gray-200 overflow-hidden`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundSize: `${zoomLevel * 100}%`,
          backgroundPosition: `${position.x}% ${position.y}%`,
          backgroundRepeat: "no-repeat",
          transition: "background-position 0.1s ease-out",
        }}
      />
    </div>
  );
}

