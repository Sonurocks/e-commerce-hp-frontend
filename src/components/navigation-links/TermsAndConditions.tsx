"use client";

import React from "react";
import Link from "next/link";

const TermsAndConditions = () => {

  return (
    <div className="min-h-screen text-preto font-normal" style={{ fontFamily: 'var(--fontNormal, "Farfetch Basis", "Helvetica Neue", Arial, sans-serif)' }}>
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Main Content */}
        <div className="border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
          <h1 className="text-3xl md:text-3xl font-normal text-preto mb-8">
            Terms and Conditions
          </h1>

          <div className="space-y-6 text-base text-preto">
            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                1. Introduction
              </h2>
              <p className="mb-2 text-sm">
                Welcome to FARFETCH. These terms and conditions Terms govern your use of our website, mobile applications, and services collectively, the Services operated by FARFETCH UK Limited FARFETCH, we, us, or our.
              </p>
              <p className="mb-2 text-sm">
                By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                2. Use of Services
              </h2>
              <p className="mb-2 text-sm">
                You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-1 text-sm">
                <li>Use the Services in any way that violates any applicable law or regulation</li>
                <li>Transmit any malicious code, viruses, or harmful data</li>
                <li>Attempt to gain unauthorized access to any part of the Services</li>
                <li>Interfere with or disrupt the Services or servers connected to the Services</li>
                <li>Use any automated system to access the Services without our prior written consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                3. Account Registration
              </h2>
              <p className="mb-2 text-sm">
                To access certain features of our Services, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-1 text-sm">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information to keep it accurate</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                4. Products and Pricing
              </h2>
              <p className="mb-2 text-sm">
                We strive to provide accurate product descriptions, images, and pricing information. However, we do not warrant that product descriptions, images, or other content on our Services are accurate, complete, reliable, current, or error-free.
              </p>
              <p className="mb-2 text-sm">
                Prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time. We are not liable to you or any third party for any modification, price change, suspension, or discontinuance of any product.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                5. Orders and Payment
              </h2>
              <p className="mb-2 text-sm">
                When you place an order through our Services, you are making an offer to purchase products at the prices stated. We reserve the right to accept or reject any order in our sole discretion.
              </p>
              <p className="mb-2 text-sm">
                Payment must be made at the time of order placement. We accept various payment methods as displayed on our Services. By providing payment information, you represent and warrant that you are authorized to use the payment method provided.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                6. Shipping and Delivery
              </h2>
              <p className="mb-2 tetx-sm">
                Shipping terms, including delivery times and costs, are provided at checkout and may vary by location. We are not responsible for delays caused by shipping carriers or customs processes.
              </p>
              <p className="mb-2 text-sm">
                Risk of loss and title for products purchased from us pass to you upon delivery to the carrier. You are responsible for filing any claims with carriers for damaged or lost shipments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                7. Returns and Refunds
              </h2>
              <p className="mb-2 text-sm">
                Our return and refund policy is available on our website. Please review our{" "}
                <Link href="/returns-and-refunds" className="underline hover:text-preto">
                  Returns and Refunds
                </Link>{" "}
                page for detailed information about our return process, eligibility, and timelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                8. Intellectual Property
              </h2>
              <p className="mb-2 text-sm">
                All content on our Services, including text, graphics, logos, images, audio clips, digital downloads, and software, is the property of FARFETCH or its content suppliers and is protected by international copyright laws.
              </p>
              <p className="mb-2 text-sm">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any content from our Services without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                9. Privacy
              </h2>
              <p className="mb-2 text-sm">
                Your use of our Services is also governed by our Privacy Policy. Please review our{" "}
                <Link href="#" className="underline hover:text-preto">
                  Privacy Policy
                </Link>{" "}
                to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                10. Limitation of Liability
              </h2>
              <p className="mb-2 text-sm">
                To the fullest extent permitted by applicable law, FARFETCH shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                11. Indemnification
              </h2>
              <p className="mb-2 text-sm">
                You agree to indemnify, defend, and hold harmless FARFETCH and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your use of the Services or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                12. Governing Law
              </h2>
              <p className="mb-2 text-sm">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                13. Changes to Terms
              </h2>
              <p className="mb-2 text-sm">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the Last Updated date. Your continued use of the Services after any changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal text-preto mb-2">
                14. Contact Information
              </h2>
              <p className="mb-2 text-sm">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mb-2 text-sm">
                FARFETCH UK Limited<br />
                Email:{" "}
                <Link href="/contact-us" className="underline hover:text-preto">
                  Contact Us
                </Link>
              </p>
            </section>

            <section>
              <p className="text-sm text-gray-600 mt-8">
                Last Updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

