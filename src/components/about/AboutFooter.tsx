import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const socialLinks = [
  { icon: <FaInstagram />, href: "https://www.instagram.com", label: "Instagram" },
  { icon: <FaFacebookF />, href: "https://www.facebook.com", label: "Facebook" },
  { icon: <FaTwitter />, href: "https://www.twitter.com", label: "Twitter" },
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com", label: "LinkedIn" },
];

const AboutFooter = () => {
  return (
    <footer className="bg-[#222222] text-white py-12 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <div className="grid grid-cols-1 gap-10 text-sm uppercase tracking-wider md:grid-cols-4">
          <div>
            <p className="mb-3 text-xs font-semibold text-gray-300">Contact us</p>
            
            <Link
              className="text-lg font-light capitalize tracking-normal hover:underline"
              href="/contact-us"
            >
              Contact
            </Link>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold text-gray-300">Suppliers &amp; Tax</p>
            <div className="flex flex-col gap-2 text-base font-light capitalize tracking-normal">
              <Link className="hover:underline" href="https://www.farfetch.com">
                Farfetch Suppliers
              </Link>
              <Link className="hover:underline" href="https://www.farfetch.com/uk/aboutus/tax-strategy">
                Farfetch Tax Strategy
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold text-gray-300">Follow us</p>
            <div className="flex items-center gap-4 text-2xl">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="transition hover:text-gray-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-start justify-start md:justify-end">
            <HiOutlineShoppingBag className="text-3xl" aria-hidden />
          </div>
        </div>

        <p className="text-center text-xs leading-relaxed text-gray-300 md:text-sm">
          Copyright © 2024 Farfetch UK Limited. All rights reserved. All trademarks, logos and
          service marks displayed on the site are property of Farfetch UK Limited and/or its
          affiliates, registered in numerous jurisdictions around the world.
        </p>
      </div>
    </footer>
  );
};

export default AboutFooter;

