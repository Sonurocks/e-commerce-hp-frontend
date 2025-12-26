"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { DepartmentKey } from "../../../constants/department";
import { drawerContentByDepartment } from "../../../constants/drawerContent";
import { useLanguage } from "@/context/LanguageContext";

interface GenericDrawerProps {
  isDrawerOpen: boolean;
  drawerRef: React.Ref<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  drawerType: string;
  department: DepartmentKey;
  onClose?: () => void;
}

const GenericDrawer: React.FC<GenericDrawerProps> = ({
  isDrawerOpen,
  drawerRef,
  onMouseEnter,
  onMouseLeave,
  drawerType,
  department,
  onClose,
}) => {
  const { translations } = useLanguage();
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;

  if (!isDrawerOpen) return null;

  const drawerContent = drawerContentByDepartment[department]?.[drawerType];

  if (!drawerContent) {
    console.warn(
      `No drawer content found for department: ${department}, drawerType: ${drawerType}`,
    );
    return null;
  }

  const {
    sections,
    image,
    spotlight,
    imageWidth,
    imageHeight,
    imageClassName,
    rightContentClassName,
  } = drawerContent;

  // Special handling for Brands drawer A-Z section
  const renderBrandsAZ = () => {
    if (drawerType !== "brands") return null;

    const alphabetGroups = [
      ["A", "B", "C"],
      ["D", "E", "F", "G", "H"],
      ["I", "J", "K", "L", "M"],
      ["N", "O", "P", "Q", "R"],
      ["S", "T", "U", "V", "W"],
      ["X", "Y", "Z"],
    ];

    return (
      <div className="ml-0 lg:ml-46">
        <h3 className="text-basetext-(--color-preto) mb-4 font-normal uppercase">
          {translate("BRANDS A-Z")}
        </h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 lg:gap-8 text-basetext-(--color-preto) font-light">
            <Link 
              href="/brands/0-9" 
              className="hover:underline transition"
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
            >
              0-9
            </Link>
            {alphabetGroups[0].map((letter, letterIndex) => (
              <Link
                key={letterIndex}
                href={`/brands/${letter.toLowerCase()}`}
                className="hover:underline transition"
                onClick={() => {
                  if (onClose) {
                    onClose();
                  }
                }}
              >
                {letter}
              </Link>
            ))}
          </div>
          {alphabetGroups.slice(1).map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex flex-wrap gap-4 lg:gap-7 text-basetext-(--color-preto) font-light"
            >
              {group.map((letter, letterIndex) => (
                <Link
                  key={letterIndex}
                  href={`/brands/${letter.toLowerCase()}`}
                  className="hover:underline transition"
                  onClick={() => {
                    if (onClose) {
                      onClose();
                    }
                  }}
                >
                  {letter}
                </Link>
              ))}
            </div>
          ))}
          <div className="mt-6">
            <Link
              href="/brands/all"
              className="text-basetext-(--color-preto) hover:underline transition font-light"
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
            >
              {translate("View All")}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Determine container class based on drawer type
  const getLeftContainerClass = () => {
    if (
      drawerType === "bags" ||
      drawerType === "accessories" ||
      drawerType === "jewellery" ||
      drawerType === "homeware" ||
      drawerType === "preOwned"
    ) {
      return "flex pl-0 lg:pl-8 font-normal gap-4 lg:gap-12";
    }
    return "flex pl-0 lg:pl-8 font-normal";
  };

  // Determine section class based on drawer type
  const getSectionClass = (sectionIndex: number, sectionClassName?: string) => {
    if (sectionClassName) {
      // Make custom class names responsive
      const responsiveClass = sectionClassName.includes("ml-") 
        ? sectionClassName.replace(/ml-\d+/g, (match) => `ml-0 lg:${match}`)
        : sectionClassName;
      return responsiveClass;
    }

    // Default spacing for different drawer types - responsive
    if (drawerType === "clothing" && sectionIndex === 1) return "ml-0 lg:ml-47";
    if (drawerType === "clothing" && sectionIndex === 2) return "ml-0 lg:ml-45";
    if (drawerType === "shoes" && sectionIndex === 1) return "ml-0 lg:ml-36";
    if (drawerType === "newIn" && sectionIndex === 1) return "ml-0 lg:ml-36";
    if (drawerType === "holidaySeason" && sectionIndex === 1) return "ml-0 lg:ml-36";
    if (drawerType === "holidaySeason" && sectionIndex === 2) return "ml-0 lg:ml-36";
    if (drawerType === "brands" && sectionIndex === 1) return "ml-0 lg:ml-22";

    return "";
  };

  // Determine title font class
  const getTitleClass = () => {
    if (
      drawerType === "bags" ||
      drawerType === "accessories" ||
      drawerType === "jewellery" ||
      drawerType === "homeware" ||
      drawerType === "preOwned" ||
      drawerType === "watches" ||
      drawerType === "shoes"
    ) {
      return "text-basetext-(--color-preto) mb-4 font-thin uppercase whitespace-nowrap";
    }
    return "text-basetext-(--color-preto) mb-4 font-normal uppercase";
  };

  // Determine link class
  const getLinkClass = () => {
    if (
      drawerType === "bags" ||
      drawerType === "accessories" ||
      drawerType === "jewellery" ||
      drawerType === "homeware" ||
      drawerType === "preOwned" ||
      drawerType === "watches" ||
      drawerType === "shoes"
    ) {
      return "text-basetext-(--colorpreto) hover:underline transition font-light whitespace-nowrap";
    }
    return "text-basetext-(--color-preto) hover:underline transition font-light";
  };

  // Prevent body scroll on mobile when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      if (isMobile) {
        const scrollY = window.scrollY;
        const originalOverflow = document.body.style.overflow;
        const originalPosition = document.body.style.position;
        const originalTop = document.body.style.top;
        const originalWidth = document.body.style.width;

        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        const preventTouchMove = (e: TouchEvent) => {
          e.preventDefault();
        };
        document.addEventListener("touchmove", preventTouchMove, { passive: false });

        return () => {
          document.body.style.overflow = originalOverflow;
          document.body.style.position = originalPosition;
          document.body.style.top = originalTop;
          document.body.style.width = originalWidth;
          window.scrollTo(0, scrollY);
          document.removeEventListener("touchmove", preventTouchMove);
        };
      }
    }
  }, [isDrawerOpen]);

  return (
    <>
      {/* Mobile Backdrop - Only on mobile */}
      <div 
        className="fixed inset-0 bg-black/50 z-[99] lg:hidden"
        onClick={() => {
          if (onClose) {
            onClose();
          }
        }}
      />
      
      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className="fixed lg:absolute top-0 lg:top-full left-0 w-full h-full lg:h-auto bg-(--color-branco) shadow-lg border-t border-gray-200 z-[100] lg:z-[100] drawer-styles overflow-y-auto lg:max-h-[80vh]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-(--color-branco) z-10">
          <h2 className="text-lg font-semibold text-(--color-preto)">{translate(sections[0]?.title || drawerType)}</h2>
          <button
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
            className="text-(--color-preto) hover:text-(--color-hina) transition p-2"
            aria-label="Close drawer"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-[72px] py-4 md:py-8 bg-(--color-branco) drawer-styles">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Sidebar - Categories */}
            <div className={`${getLeftContainerClass()} flex-wrap lg:flex-nowrap w-full`}>
              {sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className={`${getSectionClass(sectionIndex, section.className)} mb-6 lg:mb-0 w-full sm:w-auto`}
                >
                  <h3 className={`${getTitleClass()} text-sm lg:text-base`}>{translate(section.title)}</h3>
                  <ul className="space-y-2 mt-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          href={link.href} 
                          className={`${getLinkClass()} text-sm lg:text-base block py-1`}
                          onClick={() => {
                            if (onClose) {
                              onClose();
                            }
                          }}
                        >
                          {translate(link.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="hidden lg:block">
                {renderBrandsAZ()}
              </div>
              <div className="lg:hidden w-full mt-6">
                {renderBrandsAZ()}
              </div>
            </div>

            {/* Right Content - Image and Text */}
            <div
              className={
                rightContentClassName 
                  ? `${rightContentClassName} hidden lg:block` 
                  : "w-full lg:w-[460px] flex-shrink-0 lg:ml-auto hidden lg:block"
              }
            >
              <div className="w-full">
                <Image
                  src={image.src}
                  alt={translate(spotlight.title) ?? spotlight.title}
                  width={imageWidth || 460}
                  height={imageHeight || 320}
                  className={`w-full h-[200px] md:h-[320px] object-cover object-center ${imageClassName || ""}`}
                  style={{ height: `${imageHeight || 320}px` }}
                />
                <div className="mt-4">
                  <div className="space-y-0">
                    {spotlight.topText && (
                      <p className="text-sm text-(--color-hina) font-normal">
                        {translate(spotlight.topText)}
                      </p>
                    )}
                    <p
                      className={`text-sm ${spotlight.topText ? "text-preto font-thin" : "font-thin text-(--color-preto)"}`}
                    >
                      {translate(spotlight.title)}
                    </p>
                    <Link
                      href={spotlight.link}
                      className="inline-block text-sm underline hover:no-underline text-(--color-preto) font-normal"
                      onClick={() => {
                        if (onClose) {
                          onClose();
                        }
                      }}
                    >
                      {translate(spotlight.linkText)}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenericDrawer;
