"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import { supportNavigationLinks } from "@/constants/supportNavigationLinks";

const Accessibility = () => {
  const pathname = usePathname();
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  return (
    <div className="min-h-screen  text-preto">
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-12 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          <aside className="lg:w-72 flex-shrink-0">
            <nav>
              <ul className="space-y-2">
                {supportNavigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`block py-1 text-sm font-thin underline hover:no-underline transition ${
                        pathname === link.href
                          ? "font-thin text-preto"
                          : "text-preto"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="flex-1 max-w-4xl lg:ml-12">
            <h1 className="text-3xl font-normal mb-8 text-preto">
              Accessibility
            </h1>

            <div className="space-y-4 text-sm font-normal leading-relaxed text-preto">
              <p>
                At FARFETCH, we want to ensure the products and services offered
                on our website and apps are accessible to everyone. Our goal is
                to prioritise accessibility and usability throughout the
                development and release of our digital media. We have a team
                monitoring the accessibility of our website and apps and to
                coordinate training, testing and consulting.
              </p>
              <p>
                As we continue to enhance our usability, we’ll provide updates
                as they become available.
              </p>
              <p>
                If you have any questions about any accessibility features or
                require assistance, please get in touch at{" "}
                <Link
                  href="mailto:accessibility@farfetch.com"
                  className="underline"
                >
                  accessibility@farfetch.com
                </Link>
                .
              </p>
              <p>March 2022</p>
            </div>

            <div className="mt-12 pt-8">
              <div className="mb-4">
                <p className="text-xs text-preto mb-2">
                  Tell us what you think
                </p>
                <p className="text-2xl font-thin text-preto mb-4">
                  Was this content helpful?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setFeedbackHelpful(true)}
                  className={`px-6 py-2 text-sm font-semibold rounded-lg border border-preto transition-colors ${
                    feedbackHelpful === true
                      ? "bg-preto text-white"
                      : " text-preto hover:bg-gray-50"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setFeedbackHelpful(false)}
                  className={`px-6 py-2 text-sm font-semibold rounded-lg border border-preto transition-colors ${
                    feedbackHelpful === false
                      ? "bg-preto text-white"
                      : " text-preto hover:bg-gray-50"
                  }`}
                >
                  Not really
                </button>
              </div>
            </div>
          </main>
        </div>

        <div className="w-full lg:pl-8 mt-8">
          <div className="w-full lg:ml-4">
            <DownloadAppBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
