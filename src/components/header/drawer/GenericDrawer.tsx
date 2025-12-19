"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
}

const GenericDrawer: React.FC<GenericDrawerProps> = ({
  isDrawerOpen,
  drawerRef,
  onMouseEnter,
  onMouseLeave,
  drawerType,
  department,
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
      <div className="ml-46">
        <h3 className="text-basetext-(--color-preto) mb-4 font-normal uppercase">
          {translate("BRANDS A-Z")}
        </h3>
        <div className="space-y-4">
          <div className="flex gap-8 text-basetext-(--color-preto) font-light">
            <Link href="/brands/0-9" className="hover:underline transition">
              0-9
            </Link>
            {alphabetGroups[0].map((letter, letterIndex) => (
              <Link
                key={letterIndex}
                href={`/brands/${letter.toLowerCase()}`}
                className={`hover:underline transition ${letterIndex === 0 ? "ml-4" : ""}`}
              >
                {letter}
              </Link>
            ))}
          </div>
          {alphabetGroups.slice(1).map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex gap-7 text-basetext-(--color-preto) font-light"
            >
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
              className="text-basetext-(--color-preto) hover:underline transition font-light"
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
      return "flex pl-8 font-normal gap-12";
    }
    return "flex pl-8 font-normal";
  };

  // Determine section class based on drawer type
  const getSectionClass = (sectionIndex: number, sectionClassName?: string) => {
    if (sectionClassName) return sectionClassName;

    // Default spacing for different drawer types
    if (drawerType === "clothing" && sectionIndex === 1) return "ml-47";
    if (drawerType === "clothing" && sectionIndex === 2) return "ml-45";
    if (drawerType === "shoes" && sectionIndex === 1) return "ml-36";
    if (drawerType === "newIn" && sectionIndex === 1) return "ml-36";
    if (drawerType === "holidaySeason" && sectionIndex === 1) return "ml-36";
    if (drawerType === "holidaySeason" && sectionIndex === 2) return "ml-36";
    if (drawerType === "brands" && sectionIndex === 1) return "ml-22";

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
      return "text-basetext-(--color-preto) hover:underline transition font-light whitespace-nowrap";
    }
    return "text-basetext-(--color-preto) hover:underline transition font-light";
  };

  return (
    <div
      ref={drawerRef}
      className="absolute top-full left-0 w-full bg-(--color-branco) shadow-lg border-t border-gray-200 z-[100] drawer-styles"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-[72px] py-8 bg-(--color-branco) drawer-styles">
        <div className="flex gap-8">
          {/* Left Sidebar - Categories */}
          <div className={getLeftContainerClass()}>
            {sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={getSectionClass(sectionIndex, section.className)}
              >
                <h3 className={getTitleClass()}>{translate(section.title)}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className={getLinkClass()}>
                        {translate(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {renderBrandsAZ()}
          </div>

          {/* Right Content - Image and Text */}
          <div
            className={
              rightContentClassName || "w-[460px] flex-shrink-0 ml-auto"
            }
          >
            <div className="w-full">
              <Image
                src={image.src}
                alt={translate(spotlight.title) ?? spotlight.title}
                width={imageWidth || 460}
                height={imageHeight || 320}
                className={`w-full h-[320px] object-cover object-center ${imageClassName || ""}`}
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
  );
};

export default GenericDrawer;
