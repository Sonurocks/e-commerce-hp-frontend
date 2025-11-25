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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Constrain magnifier position within image bounds
    const halfMagnifier = magnifierSize / 2;
    const constrainedX = Math.max(
      halfMagnifier,
      Math.min(x, containerDimensions.width - halfMagnifier)
    );
    const constrainedY = Math.max(
      halfMagnifier,
      Math.min(y, containerDimensions.height - halfMagnifier)
    );

    setMousePosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  // Calculate the background position for the zoomed image
  const getZoomedImagePosition = () => {
    if (!containerDimensions.width || !containerDimensions.height) {
      return { x: 0, y: 0 };
    }

    // Calculate the percentage position of the magnifier
    const percentX = (mousePosition.x / containerDimensions.width) * 100;
    const percentY = (mousePosition.y / containerDimensions.height) * 100;

    // Calculate the background position to center the zoomed area
    const bgX = percentX - (50 / zoomLevel);
    const bgY = percentY - (50 / zoomLevel);

    return { x: bgX, y: bgY };
  };

  const zoomedPosition = getZoomedImagePosition();

  // Notify parent of position changes
  useEffect(() => {
    onPositionChange?.(isHovered ? zoomedPosition : null);
  }, [isHovered, zoomedPosition, onPositionChange]);

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
  position 
}: { 
  image: { src: string }; 
  zoomLevel?: number; 
  position: { x: number; y: number } | null;
}) {
  if (!position) return null;

  return (
    <div className="relative w-full h-[480px] bg-white border border-gray-200 overflow-hidden">
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

