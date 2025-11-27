"use client";

import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

const fontStack =
  "var(--fontNormal, 'Farfetch Basis', 'Helvetica Neue', Arial, sans-serif)";

const contactMethods = [
  {
    id: "email",
    Icon: FiMail,
    label: "EMAIL US",
    description: "Get in touch by email",
    actionLabel: "customerservice@farfetch.com",
    actionHref: "mailto:customerservice@farfetch.com",
  },
  {
    id: "phone",
    Icon: FiPhone,
    label: "ORDER BY PHONE",
    description: "Available Monday to Friday, 09:00 – 18:00 GMT",
    actionLabel: "+44 (0) 20 3962 2362",
    actionHref: "tel:+442039622362",
  },
];

export default function ContactSupportSection() {
  const { translations } = useLanguage();
  const translate = (text?: string) =>
    text ? translations.productCopy[text] ?? text : text;
  return (
    <section
      style={{ fontFamily: fontStack }}
      className="w-full mt-12 mb-16"
      aria-labelledby="contact-support-heading"
    >
      <h2
        id="contact-support-heading"
        className="text-[20px] font-base text-(--color-preto) mb-4"
      >
        {translate("Contact us")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {contactMethods.map(({ id, Icon, label, description, actionHref, actionLabel }) => (
          <article
            key={id}
            className="border border-gray-400 rounded-lg p-4  flex flex-col gap-2"
          >
            <Icon className="w-5 h-5 text-(--color-preto)" aria-hidden="true" />
            <div>
              <p className="text-[13px] font-thin tracking-wide text-(--color-preto)">
                {translate(label)}
              </p>
              <p className="text-[13px]  font-thin text-(--color-preto) mt-0">
                {translate(description)}
              </p>
            </div>
            <a
              href={actionHref}
              className="text-[12px] text-(--color-preto) underline"
            >
              {actionLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

