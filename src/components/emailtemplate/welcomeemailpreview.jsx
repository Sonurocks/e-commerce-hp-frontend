import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { AiOutlineLinkedin, AiOutlineYoutube, AiOutlineGlobal } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

export default function WelcomeEmail({
  logoUrl = "https://1000logos.net/wp-content/uploads/2022/08/Farfetch-Logo-2015.png",
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
      <table
        width="600"
        align="center"
        cellPadding="0"
        cellSpacing="0"
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        <tbody>
          {/* HEADER */}
          {/* Top Section - Beige Background with Logo */}
          <tr>
            <td
              style={{
                backgroundColor: "#f5f5f0",
                textAlign: "center",
                padding: "40px 20px",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <table align="center" cellPadding="0" cellSpacing="0" style={{ margin: "0 auto" }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <img
                        src={logoUrl}
                        alt={`${siteName} Logo`}
                        style={{
                          maxWidth: "200px",
                          height: "auto",
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* BODY */}
          <tr>
            <td style={{ padding: "20px 40px 40px", textAlign: "center" }}>
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
            </td>
          </tr>

          {/* FOOTER */}
          {/* Top Section - Beige Background */}
          <tr>
            <td
              style={{
                backgroundColor: "#f5f5f0",
                padding: "30px 40px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>
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
                    </td>
                    <td style={{ verticalAlign: "middle", textAlign: "right" }}>
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Middle Section - Black Background */}
          <tr>
            <td
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
                  (item) => item.link && item.link !== "#"
                );

                // Calculate width percentage for each icon
                const iconWidth = activeIcons.length > 0 ? 100 / activeIcons.length : 0;

                return activeIcons.length > 0 ? (
                  <table
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                    style={{ margin: "0 auto" }}
                  >
                    <tbody>
                      <tr>
                        {activeIcons.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <td
                              key={item.key}
                              width={`${iconWidth}%`}
                              style={{ textAlign: "center" }}
                            >
                              <a
                                href={item.link}
                                style={{
                                  color: "#fff",
                                  textDecoration: "none",
                                  display: "block",
                                }}
                              >
                                <IconComponent
                                  size={24}
                                  style={{ display: "block", margin: "0 auto" }}
                                />
                              </a>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                ) : null;
              })()}
            </td>
          </tr>

          {/* Bottom Section - White Background */}
          <tr>
            <td
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
