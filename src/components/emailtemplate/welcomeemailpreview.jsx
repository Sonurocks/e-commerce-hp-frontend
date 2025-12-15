"use client";

import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import {
  AiOutlineLinkedin,
  AiOutlineYoutube,
  AiOutlineGlobal,
} from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { useLogo } from "@/context/LogoContext";

export default function WelcomeEmail({
  logoUrl = undefined,
  siteName = "FARFETCH",
  name = "Supriya",
  message = "Thanks for joining the FARFETCH community. Discover handpicked designer pieces from top global brands!",
  buttonText = "Start Shopping",
  shopLink = "https://www.farfetch.com/in/shopping/men/items.aspx",
  contactLink = "https://www.farfetch.com/contact-us",
  socialLinks = {
    instagram: "https://instagram.com/farfetch",
    facebook: "https://facebook.com/farfetch",
    youtube: "https://youtube.com/farfetch",
    linkedin: "https://linkedin.com/company/farfetch",
    twitter: "https://twitter.com/farfetch",
  },
}) {
  const { logoConfig } = useLogo();
  // Use prop logoUrl if provided, otherwise use dynamic logo from context
  const finalLogoUrl = logoUrl || logoConfig.email.imageUrl;
  const logoAlt = logoConfig.email.alt || `${siteName} Logo`;

  return (
    <div
      style={{
        fontFamily: "'Poppins', Arial, sans-serif",
        backgroundColor: "#f3f3f3",
        color: "#333",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* WRAPPER */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        {/* Top Section - Beige Background with Logo */}
        <div
          style={{
            backgroundColor: "#f5f5f0",
            textAlign: "center",
            padding: "40px 20px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <div style={{ textAlign: "center", margin: "0 auto" }}>
            <img
              src={finalLogoUrl}
              alt={logoAlt}
              style={{
                maxWidth: "200px",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        </div>

        {/* BODY */}
        <div style={{ padding: "20px 40px 40px", textAlign: "center" }}>
          <h1
            style={{
              color: "#000",
              fontSize: "26px",
              marginBottom: "10px",
              letterSpacing: "0.5px",
            }}
          >
            Welcome to {siteName} 👋
          </h1>
          <p style={{ fontSize: "16px", color: "#555", marginBottom: "8px" }}>
            Hi <strong>{name}</strong>,
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "#555",
              lineHeight: "1.6",
              margin: "0 auto 25px",
              maxWidth: "460px",
            }}
          >
            {message}
          </p>

          <a
            href={shopLink}
            style={{
              display: "inline-block",
              backgroundColor: "#000",
              color: "#fff",
              textDecoration: "none",
              padding: "14px 40px",
              borderRadius: "4px",
              fontWeight: "600",
              fontSize: "15px",
              marginTop: "10px",
            }}
          >
            {buttonText}
          </a>
        </div>

        {/* FOOTER */}
        {/* Top Section - Beige Background */}
        <div
          style={{
            backgroundColor: "#f5f5f0",
            padding: "30px 40px",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 240px", minWidth: "200px" }}>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  margin: "0 0 4px",
                  color: "#333",
                  textAlign: "left",
                }}
              >
                Have any queries?
              </p>
              <p
                style={{
                  fontSize: "14px",
                  margin: "0",
                  color: "#666",
                  textAlign: "left",
                }}
              >
                Get in touch with our team
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <a
                href={contactLink}
                style={{
                  display: "inline-block",
                  backgroundColor: "#000",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "12px 30px",
                  borderRadius: "4px",
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "uppercase",
                }}
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section - Black Background */}
        <div
          style={{
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
            padding: "30px 20px",
          }}
        >
          <p
            style={{
              margin: "0 0 20px",
              fontSize: "16px",
              color: "#fff",
              fontWeight: "500",
            }}
          >
            Connect with us
          </p>
          {(() => {
            // Define icon mapping
            const iconMap = {
              website: {
                icon: AiOutlineGlobal,
                link: shopLink,
                key: "website",
              },
              instagram: {
                icon: IoLogoInstagram,
                link: socialLinks?.instagram,
                key: "instagram",
              },
              youtube: {
                icon: AiOutlineYoutube,
                link: socialLinks?.youtube,
                key: "youtube",
              },
              facebook: {
                icon: FaFacebookF,
                link: socialLinks?.facebook,
                key: "facebook",
              },
              linkedin: {
                icon: AiOutlineLinkedin,
                link: socialLinks?.linkedin,
                key: "linkedin",
              },
              twitter: {
                icon: FaXTwitter,
                link: socialLinks?.twitter,
                key: "twitter",
              },
            };

            // Filter icons that have valid links
            const activeIcons = Object.values(iconMap).filter(
              (item) => item.link && item.link !== "#",
            );

            return activeIcons.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${activeIcons.length}, minmax(0, 1fr))`,
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {activeIcons.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.key}
                      href={item.link}
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <IconComponent size={24} />
                    </a>
                  );
                })}
              </div>
            ) : null;
          })()}
        </div>

        {/* Bottom Section - White Background */}
        <div
          style={{
            backgroundColor: "#fff",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <p style={{ margin: "0", fontSize: "12px" }}>
            <a
              href="#"
              style={{
                color: "#888",
                textDecoration: "underline",
              }}
            >
              Unsubscribe
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
