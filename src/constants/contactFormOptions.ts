import { SupportNavLink } from "@/types/support";

export interface ContactFormOption {
  value: string;
  label: string;
}

export const contactPreferenceOptions: ContactFormOption[] = [
  { value: "no-phone", label: "I don't want to be contacted by phone" },
  { value: "prefer-phone", label: "I prefer to be contacted by phone" },
  { value: "may-phone", label: "If you need to, you may contact me by phone" },
];

export const countryOptions: ContactFormOption[] = [
  { value: "af", label: "Afghanistan" },
  { value: "al", label: "Albania" },
  { value: "dz", label: "Algeria" },
  { value: "ad", label: "Andorra" },
  { value: "ao", label: "Angola" },
  { value: "ai", label: "Anguilla" },
  { value: "ag", label: "Antigua and Barbuda" },
  { value: "aq", label: "AQ" },
  { value: "ar", label: "Argentina" },
  { value: "am", label: "Armenia" },
  { value: "aw", label: "Aruba" },
  { value: "as", label: "AS" },
  { value: "au", label: "Australia" },
  { value: "at", label: "Austria" },
  { value: "az", label: "Azerbaijan" },
  { value: "bs", label: "Bahamas" },
  { value: "bh", label: "Bahrain" },
  { value: "bd", label: "Bangladesh" },
  { value: "bb", label: "Barbados" },
  { value: "by", label: "Belarus" },
  { value: "be", label: "Belgium" },
  { value: "bz", label: "Belize" },
  { value: "bj", label: "Benin" },
  { value: "bm", label: "Bermuda" },
  { value: "bt", label: "Bhutan" },
  { value: "bo", label: "Bolivia" },
  { value: "ba", label: "Bosnia and Herzegovina" },
  { value: "bw", label: "Botswana" },
  { value: "br", label: "Brazil" },
  { value: "io", label: "British Indian Ocean Territory" },
  { value: "bn", label: "Brunei Darussalam" },
  { value: "bg", label: "Bulgaria" },
  { value: "bf", label: "Burkina Faso" },
  { value: "bi", label: "Burundi" },
  { value: "bv", label: "BV" },
  { value: "kh", label: "Cambodia" },
  { value: "cm", label: "Cameroon" },
  { value: "ca", label: "Canada" },
  { value: "cv", label: "Cape Verde" },
  { value: "ky", label: "Cayman Islands" },
  { value: "cc", label: "CC" },
  { value: "cf", label: "Central African Republic" },
  { value: "td", label: "Chad" },
  { value: "cl", label: "Chile" },
  { value: "cn", label: "China" },
  { value: "ci-uk", label: "CI-UK" },
  { value: "co", label: "Colombia" },
  { value: "ck", label: "Cook Islands" },
  { value: "cr", label: "Costa Rica" },
  { value: "ci", label: "Cote D`Ivoire" },
  { value: "hr", label: "Croatia" },
  { value: "cw", label: "CW" },
  { value: "cx", label: "CX" },
  { value: "cy", label: "Cyprus" },
  { value: "cz", label: "Czech Republic" },
  { value: "dk", label: "Denmark" },
  { value: "dj", label: "Djibouti" },
  { value: "dm", label: "Dominica" },
  { value: "do", label: "Dominican Republic" },
  { value: "tl", label: "East Timor" },
  { value: "ec", label: "Ecuador" },
  { value: "eg", label: "Egypt" },
  { value: "eh", label: "EH" },
  { value: "sv", label: "El Salvador" },
  { value: "gq", label: "Equatorial Guinea" },
  { value: "ee", label: "Estonia" },
  { value: "et", label: "Ethiopia" },
  { value: "fo", label: "Faeroe Islands" },
  { value: "fk", label: "Falkland Islands (Malvinas)" },
  { value: "fj", label: "Fiji" },
  { value: "fi", label: "Finland" },
  { value: "fr", label: "France" },
  { value: "gf", label: "French Guiana" },
  { value: "pf", label: "French Polynesia" },
  { value: "ga", label: "Gabon" },
  { value: "gm", label: "Gambia" },
  { value: "ge", label: "Georgia" },
  { value: "de", label: "Germany" },
  { value: "gh", label: "Ghana" },
  { value: "gi", label: "Gibraltar" },
  { value: "gr", label: "Greece" },
  { value: "gl", label: "Greenland" },
  { value: "gd", label: "Grenada" },
  { value: "gp", label: "Guadeloupe" },
  { value: "gu", label: "Guam" },
  { value: "gt", label: "Guatemala" },
  { value: "gg", label: "Guernsey, C.I." },
  { value: "gn", label: "Guinea" },
  { value: "gw", label: "Guinea-Bissau" },
  { value: "gy", label: "Guyana" },
  { value: "ht", label: "Haiti" },
  { value: "hm", label: "HM" },
  { value: "hn", label: "Honduras" },
  { value: "hk", label: "Hong Kong SAR" },
  { value: "hu", label: "Hungary" },
  { value: "is", label: "Iceland" },
  { value: "im", label: "IM" },
  { value: "in", label: "India" },
  { value: "id", label: "Indonesia" },
  { value: "iq", label: "Iraq" },
  { value: "ie", label: "Ireland" },
  { value: "il", label: "Israel" },
  { value: "it", label: "Italy" },
  { value: "jm", label: "Jamaica" },
  { value: "jp", label: "Japan" },
  { value: "je", label: "Jersey, C.I." },
  { value: "jo", label: "Jordan" },
  { value: "kz", label: "Kazakhstan" },
  { value: "ke", label: "Kenya" },
  { value: "ki", label: "KI" },
  { value: "km", label: "KM" },
  { value: "kn", label: "KN" },
  { value: "kr", label: "Korea, Republic of" },
  { value: "kw", label: "Kuwait" },
  { value: "kg", label: "Kyrgyzstan" },
  { value: "la", label: "Lao Peoples Democratic Republic" },
  { value: "lv", label: "Latvia" },
  { value: "lb", label: "Lebanon" },
  { value: "ls", label: "Lesotho" },
  { value: "li", label: "Liechtenstein" },
  { value: "lt", label: "Lithuania" },
  { value: "lr", label: "LR" },
  { value: "lu", label: "Luxembourg" },
  { value: "mo", label: "Macau SAR" },
  { value: "mg", label: "Madagascar" },
  { value: "mw", label: "Malawi" },
  { value: "my", label: "Malaysia" },
  { value: "mv", label: "Maldives" },
  { value: "ml", label: "Mali" },
  { value: "mt", label: "Malta" },
  { value: "mq", label: "Martinique" },
  { value: "mr", label: "Mauritania" },
  { value: "mu", label: "Mauritius" },
  { value: "mx", label: "Mexico" },
  { value: "mh", label: "MH" },
  { value: "fm", label: "Micronesia, Fed. States of" },
  { value: "mm", label: "MM" },
  { value: "md", label: "Moldova, Republic of" },
  { value: "mc", label: "Monaco" },
  { value: "mn", label: "Mongolia" },
  { value: "me", label: "Montenegro" },
  { value: "ms", label: "Montserrat" },
  { value: "ma", label: "Morocco" },
  { value: "mz", label: "Mozambique" },
  { value: "na", label: "Namibia" },
  { value: "nr", label: "Nauru" },
  { value: "np", label: "Nepal" },
  { value: "an", label: "Netherland Antilles" },
  { value: "nl", label: "Netherlands" },
  { value: "nc", label: "New Caledonia" },
  { value: "nz", label: "New Zealand" },
  { value: "nf", label: "NF" },
  { value: "ni", label: "Nicaragua" },
  { value: "ne", label: "Niger" },
  { value: "ng", label: "Nigeria" },
  { value: "nu", label: "Niue" },
  { value: "mp", label: "Northern Mariana Islands" },
  { value: "no", label: "Norway" },
  { value: "om", label: "Oman" },
  { value: "pk", label: "Pakistan" },
  { value: "pw", label: "Palau" },
  { value: "pa", label: "Panama" },
  { value: "pg", label: "Papua New Guinea" },
  { value: "py", label: "Paraguay" },
  { value: "pe", label: "Peru" },
  { value: "ph", label: "Philippines" },
  { value: "pm", label: "PM" },
  { value: "pn", label: "PN" },
  { value: "pl", label: "Poland" },
  { value: "pt", label: "Portugal" },
  { value: "pr", label: "Puerto Rico" },
  { value: "qa", label: "Qatar" },
  { value: "mk", label: "Republic of Macedonia" },
  { value: "re", label: "Reunion" },
  { value: "ro", label: "Romania" },
  { value: "ru", label: "Russian Federation" },
  { value: "rw", label: "Rwanda" },
  { value: "lc", label: "Saint Lucia" },
  { value: "sm", label: "San Marino" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "sb", label: "SB" },
  { value: "sd", label: "SD" },
  { value: "sn", label: "Senegal" },
  { value: "rs", label: "Serbia" },
  { value: "sc", label: "Seychelles" },
  { value: "sh", label: "SH" },
  { value: "sl", label: "Sierra Leone" },
  { value: "sg", label: "Singapore" },
  { value: "sj", label: "SJ" },
  { value: "sk", label: "Slovakia" },
  { value: "si", label: "Slovenia" },
  { value: "so", label: "SO" },
  { value: "za", label: "South Africa" },
  { value: "es", label: "Spain" },
  { value: "es-ci", label: "Spain - Canary Islands" },
  { value: "lk", label: "Sri Lanka" },
  { value: "st", label: "ST" },
  { value: "sr", label: "Suriname" },
  { value: "se", label: "Sweden" },
  { value: "ch", label: "Switzerland" },
  { value: "sy", label: "SY" },
  { value: "sz", label: "SZ" },
  { value: "tw", label: "Taiwan Region" },
  { value: "tj", label: "Tajikistan" },
  { value: "tz", label: "Tanzania, United Republic of" },
  { value: "tf", label: "TF" },
  { value: "th", label: "Thailand" },
  { value: "cg", label: "The Republic of Congo" },
  { value: "tk", label: "TK" },
  { value: "tm", label: "TM" },
  { value: "to", label: "TO" },
  { value: "tg", label: "Togo" },
  { value: "tt", label: "Trinidad and Tobago" },
  { value: "tn", label: "Tunisia" },
  { value: "tr", label: "Turkey" },
  { value: "tc", label: "Turks and Caicos Islands" },
  { value: "tv", label: "TV" },
  { value: "ae", label: "UAE" },
  { value: "ug", label: "Uganda" },
  { value: "ua", label: "Ukraine" },
  { value: "um", label: "UM" },
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "uy", label: "Uruguay" },
  { value: "uz", label: "Uzbekistan" },
  { value: "va", label: "Vatican City State" },
  { value: "vc", label: "VC" },
  { value: "ve", label: "Venezuela" },
  { value: "vn", label: "Vietnam" },
  { value: "vg", label: "Virgin Islands (British)" },
  { value: "vi", label: "Virgin Islands, U.S." },
  { value: "vu", label: "VU" },
  { value: "wf", label: "WF" },
  { value: "ws", label: "WS" },
  { value: "xk", label: "XK" },
  { value: "ye", label: "Yemen, Republic of" },
  { value: "zm", label: "Zambia" },
  { value: "zw", label: "Zimbabwe" },
  { value: "zr", label: "ZR" },
];

export const queryTypeOptions: ContactFormOption[] = [
  { value: "about-refund", label: "About my refund" },
  { value: "about-return", label: "About my return" },
  { value: "cant-place-order", label: "Can't Place An Order" },
  { value: "change-address", label: "Change my address" },
  { value: "product-received", label: "Product I received" },
  { value: "product-information", label: "Product Information" },
  { value: "order-status", label: "Status of my order" },
  { value: "track-delivery", label: "Track my delivery" },
];

export interface QuickActionLink {
  href: string;
  label: string;
}

export const supportLinks: SupportNavLink[] = [
  { href: "/contact-us", label: "Contact us" },
  { href: "#", label: "How to shop" },
  { href: "/orders-and-delivery", label: "Orders and delivery" },
  { href: "/payment-and-pricing", label: "Payment and pricing" },
  { href: "/cryptocurrency-payments", label: "Cryptocurrency Payments" },
  { href: "/returns-and-refunds", label: "Returns and refunds" },
  { href: "/faq", label: "FAQs" },
  { href: "#", label: "Terms and conditions" },
  { href: "#", label: "Privacy policy" },
  { href: "#", label: "Modern slavery statement" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "#", label: "Cookie preferences" },
  {
    href: "/promotions-terms-and-conditions",
    label: "Promotions terms & conditions",
  },
];

export const quickActionLinks: QuickActionLink[] = [
  { href: "#", label: "Check the status of my order" },
  { href: "#", label: "Cancel my order" },
  { href: "#", label: "Return my order" },
  { href: "#", label: "Check my return status" },
];

export interface GeneralContactLinkDetail {
  label?: string;
  href: string;
  text: string;
}

export interface GeneralContactParagraph {
  text?: string;
  textBeforeLink?: string;
  textAfterLink?: string;
  link?: GeneralContactLinkDetail;
}

export interface RegionalContactDetail {
  label: string;
  number: string;
}

export interface GeneralContactSectionData {
  title: string;
  email?: GeneralContactLinkDetail;
  descriptions?: GeneralContactParagraph[];
}

export interface GeneralContactsContent {
  customerService: {
    title: string;
    email: GeneralContactLinkDetail;
    phone: GeneralContactLinkDetail;
    swissCustomers: RegionalContactDetail[];
    romanianNumber: string;
    description: GeneralContactParagraph;
  };
  sections: GeneralContactSectionData[];
}

export const generalContactsContent: GeneralContactsContent = {
  customerService: {
    title: "Customer Service",
    email: {
      label: "Email",
      href: "mailto:customerservice@farfetch.com",
      text: "customerservice@farfetch.com",
    },
    phone: {
      label: "Phone number",
      href: "tel:+4402039622362",
      text: "+44 (0)20 3962 2362",
    },
    swissCustomers: [
      { label: "Italian", number: "+39 02 8295 5730" },
      { label: "German", number: "+49 (0)15 7359 98928" },
      { label: "French", number: "+33 9 74 59 45 88" },
      { label: "English", number: "+44 (0)20 3962 2362" },
    ],
    romanianNumber: "+40 31 220 8341",
    description: {
      textBeforeLink:
        "During busy periods like holidays, sales and special campaigns, you might experience higher waiting times from our Customer Service team. Your deliveries may take longer than usual to get to you, but you'll receive a confirmation email as soon as your order is sent. For more information, ",
      link: { href: "/faq", text: "visit the FAQs" },
      textAfterLink: ".",
    },
  },
  sections: [
    {
      title: "Press",
      email: {
        href: "mailto:press@farfetch.com",
        text: "press@farfetch.com",
      },
      descriptions: [
        {
          text:
            "If you're a journalist and require images for editorial purposes, please email your requests to press@farfetch.com. We don't hold samples, but we may be able to put you in touch with our brands and partner boutiques.",
        },
      ],
    },
    {
      title: "Retail Partners",
      email: {
        href: "mailto:retailpartners@farfetch.com",
        text: "retailpartners@farfetch.com",
      },
      descriptions: [
        {
          text:
            "If you would like to join FARFETCH as a retail partner, email retailpartners@farfetch.com. Please include all the details and the website address if you have one.",
        },
      ],
    },
    {
      title: "Jobs",
      descriptions: [
        {
          textBeforeLink: "Interested in a career at FARFETCH? ",
          link: { href: "/careers", text: "Visit our careers page here" },
          textAfterLink: ".",
        },
        {
          text:
            "Please do not email your CV. Applicants will only be considered if they apply for a job role through our careers page.",
        },
      ],
    },
    {
      title: "Buying",
      descriptions: [
        {
          text:
            "FARFETCH operates as a marketplace for our brands and partner boutiques. We don't have a buying department or buy stock directly from brands.",
        },
        {
          text: "FARFETCH UK Ltd, The Bower, 211 Old Street, London, EC1V 9NR",
        },
        {
          text: "Please note, returns will not be accepted at this address.",
        },
      ],
    },
    {
      title: "Speak Up Line",
      descriptions: [
        {
          textBeforeLink:
            "If you are aware of any ethics concerns/unethical practices or violations of our Code of Conduct, please raise a concern ",
          link: { href: "/speak-up", text: "here" },
          textAfterLink:
            ". This link is not to reach our Customer Service team.",
        },
      ],
    },
  ],
};
