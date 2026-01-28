"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { supportNavigationLinks } from "@/constants/supportNavigationLinks";

const PrivacyPolicy = () => {
  const pathname = usePathname();
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  return (
    <div className="min-h-screen  text-preto">
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-12 max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          <aside className="lg:w-72 shrink-0">
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
              Privacy Policy
            </h1>

            <div className="space-y-4 text-sm font-normal leading-relaxed text-preto">
              <section className="space-y-2">
                <h2 className="text-xl font-normal text-preto">
                  Introduction
                </h2>
                <p>
                  At FARFETCH, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or make a purchase from us.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-normal text-preto">
                  Information We Collect
                </h2>
                <p>
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Personal identification information (name, email address, phone number, shipping address)</li>
                  <li>Payment information (credit card details, billing address)</li>
                  <li>Account information (username, password, preferences)</li>
                  <li>Purchase history and transaction details</li>
                  <li>Communications with our customer service team</li>
                </ul>
                <p>
                  We also automatically collect certain information when you visit our website, such as your IP address, browser type, device information, and browsing patterns.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-normal text-preto">
                  How We Use Your Information
                </h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders, products, services, and promotional offers</li>
                  <li>Improve and personalize your shopping experience</li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>Comply with legal obligations</li>
                  <li>Send you marketing communications (with your consent)</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-normal text-preto">
                  Information Sharing and Disclosure
                </h2>
                <p>
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Service providers who assist us in operating our website and conducting our business</li>
                  <li>Payment processors to handle transactions</li>
                  <li>Shipping companies to deliver your orders</li>
                  <li>Legal authorities when required by law or to protect our rights</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-normal text-preto">
                  Your Rights
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Withdraw consent for marketing communications at any time</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-normal text-preto">
                  Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-normal text-preto">
                  Cookies and Tracking Technologies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-normal text-preto">
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at{" "}
                  <Link
                    href="mailto:privacy@farfetch.com"
                    className="underline"
                  >
                    privacy@farfetch.com
                  </Link>
                  .
                </p>
                <p>Last updated: December 2024</p>
              </section>
            </div>

           
          </main>
        </div>

       
      </div>
    </div>
  );
};

export default PrivacyPolicy;

