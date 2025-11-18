import { DepartmentKey } from "./department";
import {
  drawerLinks,
  newInDrawerLinks,
  holidaySeasonDrawerLinks,
  brandsDrawerLinks,
  clothingDrawerLinks,
  shoesDrawerLinks,
  bagsDrawerLinks,
  accessoriesDrawerLinks,
  jewelleryDrawerLinks,
  homewareDrawerLinks,
  preOwnedDrawerLinks,
  saleDrawerLinks,
} from "./index";
import {
  twentyFiveOffPng,
  womenJpeg,
  holidaySeasonPng,
  holidaySeasonMen,
  holidaySeasonKids,
  brandsPng,
  brandMen,
  brandKids,
  clothingPng,
  clothingMen,
  shoesPng,
  shoesMen,
  bagsPng,
  bagsMen,
  accessoriesPng,
  accessoriesMen,
  jewelleryPng,
  watchMen,
  homewarePng,
  homewareMen,
  preOwnedPng,
  salePng,
  saleKidsPng,
  newInMenHeader,
  newInKidsHeader,
  zeroThreeKids,
  twelveKids,
  shoesKids,
} from "../assets";

export type DrawerSection = {
  title: string;
  links: Array<{ href: string; label: string }>;
  className?: string;
};

export type DrawerSpotlight = {
  topText?: string;
  title: string;
  link: string;
  linkText: string;
};

export type DrawerContent = {
  sections: DrawerSection[];
  image: { src: string };
  spotlight: DrawerSpotlight;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
  rightContentClassName?: string;
};

export type DrawerContentByDepartment = Record<
  DepartmentKey,
  Record<string, DrawerContent>
>;

// Helper function to create drawer content
const createDrawerContent = (
  sections: DrawerSection[],
  image: { src: string },
  spotlight: DrawerSpotlight,
  options?: {
    imageWidth?: number;
    imageHeight?: number;
    imageClassName?: string;
    rightContentClassName?: string;
  },
): DrawerContent => ({
  sections,
  image,
  spotlight,
  imageWidth: options?.imageWidth || 460,
  imageHeight: options?.imageHeight || 320,
  imageClassName: options?.imageClassName,
  rightContentClassName: options?.rightContentClassName,
});

// Women's drawer content (current implementation)
const womenswearDrawers: Record<string, DrawerContent> = {
  "25off": createDrawerContent(
    [
      {
        title: "25% OFF",
        links: drawerLinks,
        className: "w-[280px]",
      },
    ],
    twentyFiveOffPng,
    {
      topText: "Women",
      title: "25% OFF",
      link: "/sale/25-off/women",
      linkText: "Shop now",
    },
  ),
  newIn: createDrawerContent(
    [
      {
        title: "WHAT is NEW",
        links: newInDrawerLinks.whatsNew,
      },
      {
        title: "TRENDING NOW",
        links: newInDrawerLinks.trendingNow,
        className: "ml-36",
      },
    ],
    womenJpeg,
    {
      topText: "Spotlight on",
      title: "PARTYWEAR LAUNCH",
      link: "/new-in/partywear-launch",
      linkText: "Shop Now",
    },
  ),
  holidaySeason: createDrawerContent(
    [
      {
        title: "GIFTS",
        links: holidaySeasonDrawerLinks.gifts,
      },
      {
        title: "PARTY SEASON",
        links: holidaySeasonDrawerLinks.partySeason,
        className: "ml-36",
      },
      {
        title: "GETAWAY",
        links: holidaySeasonDrawerLinks.getaway,
        className: "ml-36",
      },
    ],
    holidaySeasonPng,
    {
      topText: "Spotlight on",
      title: "GIFTS WITH PERSONALITY",
      link: "/holiday-season/gifts-with-personality",
      linkText: "Shop Now",
    },
  ),
  brands: createDrawerContent(
    [
      {
        title: "FEATURED BRANDS",
        links: brandsDrawerLinks.featuredBrands,
      },
      {
        title: "CONTEMPORARY BRANDS",
        links: brandsDrawerLinks.contemporaryBrands,
        className: "ml-22",
      },
    ],
    brandsPng,
    {
      topText: "Brand focus",
      title: "KHAITE",
      link: "/brands/khaite",
      linkText: "Shop Now",
    },
    {
      imageWidth: 470,
      rightContentClassName: "w-[470px]",
    },
  ),
  clothing: createDrawerContent(
    [
      {
        title: "CLOTHING",
        links: clothingDrawerLinks.clothing,
      },
      {
        title: "DISCOVER",
        links: clothingDrawerLinks.discover,
        className: "ml-47",
      },
      {
        title: "OUR SUSTAINABLE SERVICES",
        links: clothingDrawerLinks.sustainableServices,
        className: "ml-45",
      },
    ],
    clothingPng,
    {
      topText: "Spotlight on",
      title: "STATEMENT KNITS",
      link: "/clothing/statement-knits",
      linkText: "Shop Now",
    },
  ),
  shoes: createDrawerContent(
    [
      {
        title: "SHOES",
        links: shoesDrawerLinks.shoes,
      },
      {
        title: "DISCOVER",
        links: shoesDrawerLinks.discover,
        className: "ml-36",
      },
    ],
    shoesPng,
    {
      topText: "Spotlight on",
      title: "PARTY PUMPS",
      link: "/shoes/party-pumps",
      linkText: "Shop Now",
    },
  ),
  bags: createDrawerContent(
    [
      {
        title: "BAGS",
        links: bagsDrawerLinks.bags,
      },
      {
        title: "DISCOVER",
        links: bagsDrawerLinks.discover,
      },
      {
        title: "ICONIC LINES",
        links: bagsDrawerLinks.iconicLines,
        className: "ml-6",
      },
      {
        title: "OUR SUSTAINABLE SERVICES",
        links: bagsDrawerLinks.sustainableServices,
        className: "max-w-[235px] -ml-9",
      },
    ],
    bagsPng,
    {
      topText: "Spotlight on",
      title: "CLUTCH BAGS",
      link: "/bags/clutch-bags",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  accessories: createDrawerContent(
    [
      {
        title: "ACCESSORIES",
        links: accessoriesDrawerLinks.accessories,
      },
      {
        title: "DISCOVER",
        links: accessoriesDrawerLinks.discover,
      },
    ],
    accessoriesPng,
    {
      topText: "Spotlight on",
      title: "THE BELT EDIT",
      link: "/accessories/belt-edit",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  jewellery: createDrawerContent(
    [
      {
        title: "FASHION JEWELLERY",
        links: jewelleryDrawerLinks.fashionJewellery,
      },
      {
        title: "FINE JEWELLERY",
        links: jewelleryDrawerLinks.fineJewellery,
        className: "ml-19",
      },
      {
        title: "DISCOVER",
        links: jewelleryDrawerLinks.discover,
        className: "ml-26",
      },
    ],
    jewelleryPng,
    {
      topText: "Spotlight on",
      title: "JEWELRY AND WATCHES",
      link: "/jewellery/jewelry-watches",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  homeware: createDrawerContent(
    [
      {
        title: "HOMEWARE",
        links: homewareDrawerLinks.homeware,
      },
      {
        title: "FEATURED BRANDS",
        links: homewareDrawerLinks.featuredBrands,
        className: "ml-14",
      },
    ],
    homewarePng,
    {
      topText: "Spotlight on",
      title: "HOSTING AT HOME",
      link: "/homeware/hosting-at-home",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  preOwned: createDrawerContent(
    [
      {
        title: "PRE-OWNED",
        links: preOwnedDrawerLinks.preOwned,
      },
      {
        title: "BRANDS",
        links: preOwnedDrawerLinks.brands,
        className: "ml-12",
      },
      {
        title: "DISCOVER",
        links: preOwnedDrawerLinks.discover,
        className: "ml-20",
      },
      {
        title: "OUR SUSTAINABLE SERVICES",
        links: preOwnedDrawerLinks.sustainableServices,
        className: "max-w-[235px] ml-20",
      },
    ],
    preOwnedPng,
    {
      topText: "Spotlight on",
      title: "PRE-OWNED CELINE",
      link: "/pre-owned/celine",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  sale: createDrawerContent(
    [
      {
        title: "SALE",
        links: saleDrawerLinks.sale,
      },
    ],
    salePng,
    {
      topText: "Women",
      title: "SALE",
      link: "/sale",
      linkText: "Shop now",
    },
  ),
};

// Men's drawer content (can be customized later)
const menswearDrawers: Record<string, DrawerContent> = {
  "25off": createDrawerContent(
    [
      {
        title: "25% OFF",
        links: drawerLinks,
        className: "w-[280px]",
      },
    ],
    twentyFiveOffPng,
    {
      topText: "Men",
      title: "25% OFF",
      link: "/sale/25-off/men",
      linkText: "Shop now",
    },
  ),
  newIn: createDrawerContent(
    [
      {
        title: "WHAT'S NEW",
        links: [
          {
            href: "/new-in/today",
            label: "New in today",
          },
          {
            href: "/new-in/clothing",
            label: "New clothing",
          },
          {
            href: "/new-in/shoes",
            label: "New shoes",
          },
          {
            href: "/new-in/bags-accessories",
            label: "New bags & accessories",
          },
        ],
      },
      {
        title: "TRENDING NOW",
        links: [
          {
            href: "/trending/plaid-edit",
            label: "The plaid edit",
          },
          {
            href: "/trending/new-americana",
            label: "The new Americana",
          },
          {
            href: "/trending/shearling-outerwear",
            label: "Shearling outerwear",
          },
          {
            href: "/trending/neutral-denim",
            label: "Neutral denim",
          },
          {
            href: "/trending/most-wanted-sneakers",
            label: "Most-wanted sneakers",
          },
          {
            href: "/trending/wedding-guest-looks",
            label: "Wedding-guest looks",
          },
          {
            href: "/trending/most-wanted-pieces",
            label: "Most-wanted pieces",
          },
          {
            href: "/trending/exclusives-collabs",
            label: "Exclusives & collabs",
          },
          {
            href: "/trending/fashion-feed",
            label: "Fashion feed",
          },
        ],
        className: "ml-36",
      },
      {
        title: "FOR YOU",
        links: [
          {
            href: "/for-you/farfetched",
            label: "FARFETCHED for you",
          },
          {
            href: "/for-you/new-in",
            label: "New in for you",
          },
        ],
        className: "ml-36",
      },
    ],
    newInMenHeader,
    {
      topText: "Spotlight on",
      title: "SHEARLING OUTERWEAR",
      link: "/new-in/shearling-outerwear",
      linkText: "Shop Now",
    },
  ),
  holidaySeason: createDrawerContent(
    [
      {
        title: "GIFTS",
        links: [
          {
            href: "/holiday-season/gifts/most-wanted",
            label: "Most-wanted gifts",
          },
          {
            href: "/holiday-season/gifts/classic",
            label: "Classic gifts",
          },
          {
            href: "/holiday-season/gifts/small-luxuries",
            label: "Small luxuries",
          },
          {
            href: "/holiday-season/gifts/ultra-rare",
            label: "Ultra-rare gifts",
          },
          {
            href: "/holiday-season/gifts/best-trainers",
            label: "Best of trainers",
          },
          {
            href: "/holiday-season/gifts/with-personality",
            label: "Gifts with personality",
          },
          {
            href: "/holiday-season/gifts/watches-jewellery",
            label: "Watches & jewellery",
          },
          {
            href: "/holiday-season/gifts/homeware",
            label: "Homeware gifts",
          },
          {
            href: "/holiday-season/gifts/for-her",
            label: "Gifts for her",
          },
          {
            href: "/holiday-season/gifts/for-kids",
            label: "Gifts for kids",
          },
        ],
      },
      {
        title: "PARTY SEASON",
        links: [
          {
            href: "/holiday-season/party/going-out",
            label: "Going-out styles",
          },
          {
            href: "/holiday-season/party/formal",
            label: "Formal partywear",
          },
          {
            href: "/holiday-season/party/statement-shirts",
            label: "Statement shirts",
          },
          {
            href: "/holiday-season/party/shoes-accessories",
            label: "Party shoes & accessories",
          },
        ],
        className: "ml-36",
      },
      {
        title: "GETAWAY",
        links: [
          {
            href: "/holiday-season/getaway/ski",
            label: "Ski & après-ski",
          },
          {
            href: "/holiday-season/getaway/winter-sun",
            label: "Winter Sun",
          },
          {
            href: "/holiday-season/getaway/loungewear",
            label: "Loungewear",
          },
        ],
        className: "ml-36",
      },
    ],
    holidaySeasonMen,
    {
      topText: "Spotlight on",
      title: "SMALL LUXURIES",
      link: "/holiday-season/small-luxuries",
      linkText: "Shop Now",
    },
  ),
  brands: createDrawerContent(
    [
      {
        title: "FEATURED BRANDS",
        links: [
          {
            href: "/brands/ami-paris",
            label: "AMI Paris",
          },
          {
            href: "/brands/amiri",
            label: "Amiri",
          },
          {
            href: "/brands/brunello-cucinelli",
            label: "Brunello Cucinelli",
          },
          {
            href: "/brands/burberry",
            label: "Burberry",
          },
          {
            href: "/brands/dolce-gabbana",
            label: "Dolce & Gabbana",
          },
          {
            href: "/brands/dsquared2",
            label: "Dsquared2",
          },
          {
            href: "/brands/moncler",
            label: "Moncler",
          },
          {
            href: "/brands/off-white",
            label: "Off-White",
          },
          {
            href: "/brands/prada",
            label: "Prada",
          },
          {
            href: "/brands/tom-ford",
            label: "Tom Ford",
          },
          {
            href: "/brands/zegna",
            label: "Zegna",
          },
        ],
      },
      {
        title: "CONTEMPORARY BRANDS",
        links: [
          {
            href: "/brands/acne-studios",
            label: "Acne Studios",
          },
          {
            href: "/brands/diesel",
            label: "Diesel",
          },
          {
            href: "/brands/our-legacy",
            label: "Our Legacy",
          },
          {
            href: "/brands/axel-arigato",
            label: "Axel Arigato",
          },
          {
            href: "/brands/gallery-dept",
            label: "Gallery Dept.",
          },
          {
            href: "/brands/rhude",
            label: "Rhude",
          },
        ],
        className: "ml-22",
      },
    ],
    brandMen,
    {
      topText: "Brand focus",
      title: "PRADA",
      link: "/brands/prada",
      linkText: "Shop Now",
    },
    {
      imageWidth: 470,
      rightContentClassName: "w-[470px]",
    },
  ),
  clothing: createDrawerContent(
    [
      {
        title: "CLOTHING",
        links: [
          {
            href: "/clothing/all",
            label: "All clothing",
          },
          {
            href: "/clothing/activewear",
            label: "Activewear",
          },
          {
            href: "/clothing/coats",
            label: "Coats",
          },
          {
            href: "/clothing/denim",
            label: "Denim",
          },
          {
            href: "/clothing/jackets",
            label: "Jackets",
          },
          {
            href: "/clothing/polo-shirts",
            label: "Polo shirts",
          },
          {
            href: "/clothing/pre-owned",
            label: "Pre-owned",
          },
          {
            href: "/clothing/shirts",
            label: "Shirts",
          },
          {
            href: "/clothing/shorts",
            label: "Shorts",
          },
          {
            href: "/clothing/suits",
            label: "Suits",
          },
          {
            href: "/clothing/sweaters-knitwear",
            label: "Sweaters & knitwear",
          },
          {
            href: "/clothing/swimwear-beachwear",
            label: "Swimwear & beachwear",
          },
          {
            href: "/clothing/trousers",
            label: "Trousers",
          },
        ],
      },
      {
        title: "DISCOVER",
        links: [
          {
            href: "/clothing/discover/new-clothing",
            label: "New clothing",
          },
          {
            href: "/clothing/discover/wardrobe-staples",
            label: "Wardrobe staples",
          },
          {
            href: "/clothing/discover/partywear",
            label: "Partywear",
          },
          {
            href: "/clothing/discover/vacation-edit",
            label: "The vacation edit",
          },
          {
            href: "/clothing/discover/hype-streetwear",
            label: "Hype streetwear",
          },
        ],
        className: "ml-47",
      },
    ],
    clothingMen,
    {
      topText: "Spotlight on",
      title: "THE NEW AMERICANA",
      link: "/clothing/the-new-americana",
      linkText: "Shop Now",
    },
  ),
  shoes: createDrawerContent(
    [
      {
        title: "SHOES",
        links: [
          {
            href: "/shoes/all",
            label: "All shoes",
          },
          {
            href: "/shoes/boots",
            label: "Boots",
          },
          {
            href: "/shoes/derby-oxford",
            label: "Derby & Oxford shoes",
          },
          {
            href: "/shoes/espadrilles",
            label: "Espadrilles",
          },
          {
            href: "/shoes/flip-flops-slides",
            label: "Flip flops & Slides",
          },
          {
            href: "/shoes/loafers",
            label: "Loafers",
          },
          {
            href: "/shoes/monk-shoes",
            label: "Monk shoes",
          },
          {
            href: "/shoes/sandals",
            label: "Sandals",
          },
          {
            href: "/shoes/trainers",
            label: "Trainers",
          },
        ],
        className: "-ml-4",
      },
      {
        title: "DISCOVER",
        links: [
          {
            href: "/shoes/discover/new-shoes",
            label: "New shoes",
          },
          {
            href: "/shoes/discover/best-streetwear",
            label: "Best of streetwear",
          },
          {
            href: "/shoes/discover/exclusives-collabs",
            label: "Exclusives & collabs",
          },
          {
            href: "/shoes/discover/most-wanted-trainers",
            label: "Most wanted trainers",
          },
          {
            href: "/shoes/discover/party-shoes",
            label: "Party shoes",
          },
          {
            href: "/shoes/discover/pre-owned",
            label: "Pre-owned shoes",
          },
        ],
        className: "ml-12",
      },
      {
        title: "ICONIC COLLECTIONS",
        links: [
          {
            href: "/shoes/collections/jordan-travis-scott",
            label: "Jordan x Travis Scott",
          },
          {
            href: "/shoes/collections/new-balance-9060",
            label: "New Balance 9060",
          },
          {
            href: "/shoes/collections/asics-gel",
            label: "Asics Gel",
          },
          {
            href: "/shoes/collections/golden-goose-super-star",
            label: "Golden Goose Super Star",
          },
          {
            href: "/shoes/collections/onitsuka-tiger-mexico",
            label: "Onitsuka Tiger Mexico",
          },
          {
            href: "/shoes/collections/maison-margiela-replica",
            label: "Maison Margiela Replica",
          },
          {
            href: "/shoes/collections/dg-portofino",
            label: "D&G Portofino",
          },
          {
            href: "/shoes/collections/zegna-triple-stitch",
            label: "Zegna Triple Stitch",
          },
        ],
        className: "ml-12",
      },
      {
        title: "OUR SUSTAINABLE SERVICES",
        links: [
          {
            href: "/sell-bag",
            label: "Sell your bag, earn FARFETCH credit",
          },
        ],
        className: "ml-12",
      },
    ],
    shoesMen,
    {
      topText: "Spotlight on",
      title: "PARTY SHOES",
      link: "/shoes/party-shoes",
      linkText: "Shop Now",
    },
  ),
  bags: createDrawerContent(
    [
      {
        title: "BAGS",
        links: [
          {
            href: "/bags/all",
            label: "All bags",
          },
          {
            href: "/bags/backpacks",
            label: "Backpacks",
          },
          {
            href: "/bags/belt-bags",
            label: "Belt bags",
          },
          {
            href: "/bags/clutch-bags",
            label: "Clutch bags",
          },
          {
            href: "/bags/laptop-bags-briefcases",
            label: "Laptop bags & briefcases",
          },
          {
            href: "/bags/luggage-holdalls",
            label: "Luggage & holdalls",
          },
          {
            href: "/bags/messenger-bags",
            label: "Messenger bags",
          },
          {
            href: "/bags/shoulder-bags",
            label: "Shoulder bags",
          },
          {
            href: "/bags/tote-bags",
            label: "Tote bags",
          },
        ],
      },
      {
        title: "DISCOVER",
        links: [
          {
            href: "/bags/discover/new-bags-accessories",
            label: "New bags & accessories",
          },
          {
            href: "/bags/discover/pre-owned-bags",
            label: "Pre-owned bags",
          },
        ],
      },
      {
        title: "OUR SUSTAINABLE SERVICES",
        links: [
          {
            href: "/bags/sell-your-bag",
            label: "Sell your bag, earn FARFETCH credit",
          },
        ],
        className: "max-w-[235px] ml-19",
      },
    ],
    bagsMen,
    {
      topText: "Spotlight on",
      title: "PRE-OWNED BAGS",
      link: "/bags/pre-owned-bags",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  accessories: createDrawerContent(
    [
      {
        title: "ACCESSORIES",
        links: [
          {
            href: "/accessories/all",
            label: "All accessories",
          },
          {
            href: "/accessories/new-accessories-bags",
            label: "New accessories & bags",
          },
          {
            href: "/accessories/belts",
            label: "Belts",
          },
          {
            href: "/accessories/gifts",
            label: "Gifts",
          },
          {
            href: "/accessories/gloves",
            label: "Gloves",
          },
          {
            href: "/accessories/hats",
            label: "Hats",
          },
          {
            href: "/accessories/phone-cases",
            label: "Phone cases",
          },
          {
            href: "/accessories/scarves",
            label: "Scarves",
          },
          {
            href: "/accessories/sunglasses",
            label: "Sunglasses",
          },
          {
            href: "/accessories/ties-bow-ties",
            label: "Ties & bow ties",
          },
          {
            href: "/accessories/wallets-cardholders",
            label: "Wallets & cardholders",
          },
          {
            href: "/accessories/pre-owned",
            label: "Pre-owned accessories",
          },
        ],
      },
      {
        title: "JEWELLERY",
        links: [
          {
            href: "/jewellery/all",
            label: "All jewellery",
          },
          {
            href: "/jewellery/all-fine-jewellery",
            label: "All fine jewellery",
          },
          {
            href: "/jewellery/bracelets",
            label: "Bracelets",
          },
          {
            href: "/jewellery/earrings",
            label: "Earrings",
          },
          {
            href: "/jewellery/necklaces",
            label: "Necklaces",
          },
          {
            href: "/jewellery/rings",
            label: "Rings",
          },
        ],
      },
    ],
    accessoriesMen,
    {
      topText: "Spotlight on",
      title: "NEW ACCESSORIES & BAGS",
      link: "/accessories/new-accessories-bags",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  watches: createDrawerContent(
    [
      {
        title: "WATCHES",
        links: [
          {
            href: "/watches/all",
            label: "All watches",
          },
          {
            href: "/watches/new-in",
            label: "New in watches",
          },
          {
            href: "/watches/contemporary",
            label: "Contemporary watches",
          },
          {
            href: "/watches/fashion",
            label: "Fashion watches",
          },
          {
            href: "/watches/accessories",
            label: "Watches accessories",
          },
        ],
      },
      {
        title: "FINE WATCHES",
        links: [
          {
            href: "/watches/fine/all",
            label: "All fine watches",
          },
          {
            href: "/watches/fine/aviator",
            label: "Aviator watches",
          },
          {
            href: "/watches/fine/chronograph",
            label: "Chronograph watches",
          },
          {
            href: "/watches/fine/dress",
            label: "Dress watches",
          },
          {
            href: "/watches/fine/sports",
            label: "Sports watches",
          },
          {
            href: "/watches/fine/pre-owned",
            label: "Pre-owned fine watches",
          },
        ],
        className: "ml-22",
      },
      {
        title: "FEATURED BRANDS",
        links: [
          {
            href: "/watches/brands/audemars-piguet",
            label: "Audemars Piguet",
          },
          {
            href: "/watches/brands/bell-ross",
            label: "Bell & Ross",
          },
          {
            href: "/watches/brands/breitling",
            label: "Breitling",
          },
          {
            href: "/watches/brands/chopard",
            label: "Chopard",
          },
          {
            href: "/watches/brands/designa-individual",
            label: "Designa Individual",
          },
          {
            href: "/watches/brands/frederique-constant",
            label: "Frederique Constant",
          },
          {
            href: "/watches/brands/hublot",
            label: "Hublot",
          },
          {
            href: "/watches/brands/omega",
            label: "Omega",
          },
          {
            href: "/watches/brands/patek-philippe",
            label: "Patek Philippe",
          },
          {
            href: "/watches/brands/rolex",
            label: "Rolex",
          },
          {
            href: "/watches/brands/tag-heuer",
            label: "Tag-Heuer",
          },
          {
            href: "/watches/brands/tudor",
            label: "Tudor",
          },
        ],
        className: "ml-16",
      },
      {
        title: "DISCOVER",
        links: [
          {
            href: "/watches/discover/customised",
            label: "Customised watches",
          },
          {
            href: "/watches/discover/pre-order",
            label: "Pre-order watches",
          },
          {
            href: "/watches/discover/collectors",
            label: "Collectors' timepieces",
          },
        ],
        className: "ml-16",
      },
    ],
    watchMen,
    {
      topText: "Spotlight on",
      title: "NEW WATCHES",
      link: "/watches/new-in",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  homeware: createDrawerContent(
    [
      {
        title: "HOMEWARE",
        links: homewareDrawerLinks.homeware,
      },
      {
        title: "FEATURED BRANDS",
        links: homewareDrawerLinks.featuredBrands,
        className: "ml-14",
      },
    ],
    homewareMen,
    {
      topText: "Spotlight on",
      title: "HOME DECOR",
      link: "/homeware/home-decor",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  sale: createDrawerContent(
    [
      {
        title: "SALE",
        links: [
          {
            href: "/sale/all",
            label: "All sale",
          },
          {
            href: "/sale/clothing",
            label: "Clothing",
          },
          {
            href: "/sale/jackets",
            label: "Jackets",
          },
          {
            href: "/sale/shirts",
            label: "Shirts",
          },
          {
            href: "/sale/sweatshirts-knitwear",
            label: "Sweatshirts & knitwear",
          },
          {
            href: "/sale/t-shirts",
            label: "T-shirts",
          },
          {
            href: "/sale/shoes",
            label: "Shoes",
          },
          {
            href: "/sale/trainers",
            label: "Trainers",
          },
          {
            href: "/sale/bags",
            label: "Bags",
          },
          {
            href: "/sale/accessories",
            label: "Accessories",
          },
          {
            href: "/sale/previous-season",
            label: "Previous Season",
          },
        ],
      },
    ],
    salePng,
    {
      topText: "Men",
      title: "SALE",
      link: "/sale/men",
      linkText: "Shop now",
    },
  ),
};

// Kids' drawer content (can be customized later)
const kidswearDrawers: Record<string, DrawerContent> = {
  // '25off': createDrawerContent(
  //   [
  //     {
  //       title: '25% OFF',
  //       links: drawerLinks,
  //       className: 'w-[280px]',
  //     },
  //   ],
  //   twentyFiveOffPng,
  //   {
  //     topText: 'Kids',
  //     title: '25% OFF',
  //     link: '/sale/25-off/kids',
  //     linkText: 'Shop now',
  //   }
  // ),
  newIn: createDrawerContent(
    [
      {
        title: "WHAT'S NEW",
        links: [
          {
            href: "/new-in/baby",
            label: "Baby",
          },
          {
            href: "/new-in/kids-teens",
            label: "Kids & Teens",
          },
        ],
      },
      {
        title: "DISCOVER",
        links: [
          {
            href: "/discover/occasionwear-edit",
            label: "The occasionwear edit",
          },
          {
            href: "/discover/sneaker-edit",
            label: "The sneaker edit",
          },
          {
            href: "/discover/gifts-for-kids",
            label: "Gifts for kids",
          },
          {
            href: "/discover/baby-shower-gifts",
            label: "Baby shower gifts",
          },
        ],
        className: "ml-36",
      },
    ],
    newInKidsHeader,
    {
      topText: "Spotlight on",
      title: "THE WINTER EDIT",
      link: "/new-in/the-winter-edit",
      linkText: "Shop Now",
    },
  ),
  holidaySeason: createDrawerContent(
    [
      {
        title: "GIFTS",
        links: [
          {
            href: "/holiday-season/gifts/most-wanted",
            label: "Most-wanted gifts",
          },
          {
            href: "/holiday-season/gifts/for-baby",
            label: "Gifts for baby",
          },
          {
            href: "/holiday-season/gifts/for-boys",
            label: "Gifts for boys",
          },
          {
            href: "/holiday-season/gifts/for-girls",
            label: "Gifts for girls",
          },
          {
            href: "/holiday-season/gifts/mini-mes",
            label: "Gifts for mini-mes",
          },
        ],
      },
      {
        title: "PARTY",
        links: [
          {
            href: "/holiday-season/party/party-edit",
            label: "The party edit",
          },
        ],
        className: "ml-36",
      },
      {
        title: "GETAWAY",
        links: [
          {
            href: "/holiday-season/getaway/skiwear",
            label: "Skiwear",
          },
          {
            href: "/holiday-season/getaway/winter-sun",
            label: "Winter sun",
          },
          {
            href: "/holiday-season/getaway/cozy-loungewear",
            label: "Cozy loungewear",
          },
        ],
        className: "ml-36",
      },
    ],
    holidaySeasonKids,
    {
      topText: "Spotlight on",
      title: "SKIWEAR",
      link: "/holiday-season/skiwear",
      linkText: "Shop Now",
    },
  ),
  brands: createDrawerContent(
    [
      {
        title: "FEATURED BRANDS",
        links: [
          {
            href: "/brands/bonpoint",
            label: "Bonpoint",
          },
          {
            href: "/brands/burberry-kids",
            label: "Burberry Kids",
          },
          {
            href: "/brands/chloe-kids",
            label: "Chloé Kids",
          },
          {
            href: "/brands/dolce-gabbana-kids",
            label: "Dolce & Gabbana Kids",
          },
          {
            href: "/brands/moncler-enfant",
            label: "Moncler Enfant",
          },
          {
            href: "/brands/moschino-kids",
            label: "Moschino Kids",
          },
          {
            href: "/brands/off-white-kids",
            label: "Off-White Kids",
          },
          {
            href: "/brands/polo-ralph-lauren-kids",
            label: "Polo Ralph Lauren Kids",
          },
          {
            href: "/brands/stone-island-junior",
            label: "Stone Island Junior",
          },
        ],
      },
    ],
    brandKids,
    {
      topText: "Brand focus",
      title: "DKNY KIDS",
      link: "/brands/dkny-kids",
      linkText: "Shop Now",
    },
    {
      imageWidth: 470,
      rightContentClassName: "w-[470px] flex-shrink-0 ml-auto mr-6",
    },
  ),
  "0-12months": createDrawerContent(
    [
      {
        title: "GIRLS",
        links: [
          {
            href: "/girls/accessories",
            label: "Accessories",
          },
          {
            href: "/girls/shoes",
            label: "Shoes",
          },
          {
            href: "/girls/all-clothing",
            label: "All clothing",
          },
          {
            href: "/girls/coats",
            label: "Coats",
          },
          {
            href: "/girls/dresses",
            label: "Dresses",
          },
          {
            href: "/girls/denim",
            label: "Denim",
          },
          {
            href: "/girls/jackets",
            label: "Jackets",
          },
          {
            href: "/girls/playsuits-jumpsuits",
            label: "Playsuits & jumpsuits",
          },
          {
            href: "/girls/shorts",
            label: "Shorts",
          },
          {
            href: "/girls/skirts",
            label: "Skirts",
          },
          {
            href: "/girls/swimwear",
            label: "Swimwear",
          },
          {
            href: "/girls/tops",
            label: "Tops",
          },
          {
            href: "/girls/trousers",
            label: "Trousers",
          },
        ],
      },
      {
        title: "BOYS",
        links: [
          {
            href: "/boys/accessories",
            label: "Accessories",
          },
          {
            href: "/boys/shoes",
            label: "Shoes",
          },
          {
            href: "/boys/all-clothing",
            label: "All clothing",
          },
          {
            href: "/boys/coats",
            label: "Coats",
          },
          {
            href: "/boys/denim",
            label: "Denim",
          },
          {
            href: "/boys/jackets",
            label: "Jackets",
          },
          {
            href: "/boys/shorts",
            label: "Shorts",
          },
          {
            href: "/boys/swimwear",
            label: "Swimwear",
          },
          {
            href: "/boys/tops",
            label: "Tops",
          },
          {
            href: "/boys/tracksuits",
            label: "Tracksuits",
          },
          {
            href: "/boys/trousers",
            label: "Trousers",
          },
        ],
        className: "ml-36",
      },
    ],
    twelveKids,
    {
      topText: "Spotlight on",
      title: "NEW-SEASON SHOES",
      link: "/kids/new-season-shoes",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  "0-36months": createDrawerContent(
    [
      {
        title: "BABY GIRLS",
        links: [
          {
            href: "/baby-girls/accessories",
            label: "Accessories",
          },
          {
            href: "/baby-girls/shoes",
            label: "Shoes",
          },
          {
            href: "/baby-girls/all-clothing",
            label: "All clothing",
          },
          {
            href: "/baby-girls/baby-suits",
            label: "Baby suits",
          },
          {
            href: "/baby-girls/coats",
            label: "Coats",
          },
          {
            href: "/baby-girls/dresses",
            label: "Dresses",
          },
          {
            href: "/baby-girls/jackets",
            label: "Jackets",
          },
          {
            href: "/baby-girls/shorts",
            label: "Shorts",
          },
          {
            href: "/baby-girls/skirts",
            label: "Skirts",
          },
          {
            href: "/baby-girls/swimwear",
            label: "Swimwear",
          },
          {
            href: "/baby-girls/tops",
            label: "Tops",
          },
          {
            href: "/baby-girls/tracksuits",
            label: "Tracksuits",
          },
          {
            href: "/baby-girls/trousers",
            label: "Trousers",
          },
        ],
      },
      {
        title: "BABY BOYS",
        links: [
          {
            href: "/baby-boys/accessories",
            label: "Accessories",
          },
          {
            href: "/baby-boys/shoes",
            label: "Shoes",
          },
          {
            href: "/baby-boys/all-clothing",
            label: "All clothing",
          },
          {
            href: "/baby-boys/baby-suits",
            label: "Baby suits",
          },
          {
            href: "/baby-boys/coats",
            label: "Coats",
          },
          {
            href: "/baby-boys/jackets",
            label: "Jackets",
          },
          {
            href: "/baby-boys/shorts",
            label: "Shorts",
          },
          {
            href: "/baby-boys/swimwear",
            label: "Swimwear",
          },
          {
            href: "/baby-boys/tops",
            label: "Tops",
          },
          {
            href: "/baby-boys/tracksuits",
            label: "Tracksuits",
          },
          {
            href: "/baby-boys/trousers",
            label: "Trousers",
          },
        ],
        className: "ml-36",
      },
      {
        title: "NURSERY & GIFTS",
        links: [
          {
            href: "/nursery/all-nursery",
            label: "All nursery",
          },
          {
            href: "/nursery/changing-bags",
            label: "Changing bags",
          },
          {
            href: "/nursery/prams",
            label: "Prams",
          },
          {
            href: "/nursery/baby-shower-gifts",
            label: "Baby shower gifts",
          },
        ],
        className: "ml-36",
      },
    ],
    zeroThreeKids,
    {
      topText: "Spotlight on",
      title: "GIFTS FOR BABY",
      link: "/baby/gifts-for-baby",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  teens: createDrawerContent(
    [
      {
        title: "TEEN GIRLS",
        links: [
          {
            href: "/teen-girls/accessories",
            label: "Accessories",
          },
          {
            href: "/teen-girls/shoes",
            label: "Shoes",
          },
          {
            href: "/teen-girls/all-clothing",
            label: "All clothing",
          },
          {
            href: "/teen-girls/coats",
            label: "Coats",
          },
          {
            href: "/teen-girls/denim",
            label: "Denim",
          },
          {
            href: "/teen-girls/dresses",
            label: "Dresses",
          },
          {
            href: "/teen-girls/jackets",
            label: "Jackets",
          },
          {
            href: "/teen-girls/skirts",
            label: "Skirts",
          },
          {
            href: "/teen-girls/swimwear",
            label: "Swimwear",
          },
          {
            href: "/teen-girls/tops",
            label: "Tops",
          },
          {
            href: "/teen-girls/trousers",
            label: "Trousers",
          },
        ],
      },
      {
        title: "TEEN BOYS",
        links: [
          {
            href: "/teen-boys/accessories",
            label: "Accessories",
          },
          {
            href: "/teen-boys/shoes",
            label: "Shoes",
          },
          {
            href: "/teen-boys/all-clothing",
            label: "All clothing",
          },
          {
            href: "/teen-boys/coats",
            label: "Coats",
          },
          {
            href: "/teen-boys/denim",
            label: "Denim",
          },
          {
            href: "/teen-boys/jackets",
            label: "Jackets",
          },
          {
            href: "/teen-boys/shorts",
            label: "Shorts",
          },
          {
            href: "/teen-boys/swimwear",
            label: "Swimwear",
          },
          {
            href: "/teen-boys/tops",
            label: "Tops",
          },
          {
            href: "/teen-boys/tracksuits",
            label: "Tracksuits",
          },
          {
            href: "/teen-boys/trousers",
            label: "Trousers",
          },
        ],
        className: "ml-36",
      },
    ],
    shoesKids,
    {
      topText: "Spotlight on",
      title: "NEW IN FOR TEENS",
      link: "/teens/new-in",
      linkText: "Shop Now",
    },
    {
      imageWidth: 440,
      rightContentClassName: "w-[440px] flex-shrink-0 ml-auto mr-10",
    },
  ),
  sale: createDrawerContent(
    [
      {
        title: "KIDS",
        links: [
          {
            href: "/sale/kids/girls-clothing",
            label: "Girls' clothing",
          },
          {
            href: "/sale/kids/girls-accessories",
            label: "Girls' accessories",
          },
          {
            href: "/sale/kids/girls-shoes",
            label: "Girls' shoes",
          },
          {
            href: "/sale/kids/boys-clothing",
            label: "Boys' clothing",
          },
          {
            href: "/sale/kids/boys-accessories",
            label: "Boys' accessories",
          },
          {
            href: "/sale/kids/boys-shoes",
            label: "Boys' shoes",
          },
          {
            href: "/sale/kids/previous-season",
            label: "Previous Season",
          },
        ],
      },
      {
        title: "TEEN",
        links: [
          {
            href: "/sale/teen/girls-clothing",
            label: "Girls' clothing",
          },
          {
            href: "/sale/teen/girls-accessories",
            label: "Girls' accessories",
          },
          {
            href: "/sale/teen/girls-shoes",
            label: "Girls' shoes",
          },
          {
            href: "/sale/teen/boys-clothing",
            label: "Boys' clothing",
          },
          {
            href: "/sale/teen/boys-accessories",
            label: "Boys' accessories",
          },
          {
            href: "/sale/teen/boys-shoes",
            label: "Boys' shoes",
          },
          {
            href: "/sale/teen/previous-season",
            label: "Previous Season",
          },
        ],
        className: "ml-36",
      },
    ],
    saleKidsPng,
    {
      topText: "Kids",
      title: "SALE",
      link: "/sale/kids",
      linkText: "Shop now",
    },
  ),
};

export const drawerContentByDepartment: DrawerContentByDepartment = {
  womenswear: womenswearDrawers,
  menswear: menswearDrawers,
  kidswear: kidswearDrawers,
};
