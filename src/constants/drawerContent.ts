import { DepartmentKey } from './department';
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
} from './index';
import {
  twentyFiveOffPng,
  womenJpeg,
  holidaySeasonPng,
  holidaySeasonMen,
  brandsPng,
  brandMen,
  clothingPng,
  shoesPng,
  bagsPng,
  accessoriesPng,
  jewelleryPng,
  homewarePng,
  preOwnedPng,
  salePng,
  newInMenHeader,
} from '../assets';

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

export type DrawerContentByDepartment = Record<DepartmentKey, Record<string, DrawerContent>>;

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
  }
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
  '25off': createDrawerContent(
    [
      {
        title: '25% OFF',
        links: drawerLinks,
        className: 'w-[280px]',
      },
    ],
    twentyFiveOffPng,
    {
      topText: 'Women',
      title: '25% OFF',
      link: '/sale/25-off/women',
      linkText: 'Shop now',
    }
  ),
  newIn: createDrawerContent(
    [
      {
        title: 'WHAT is NEW',
        links: newInDrawerLinks.whatsNew,
      },
      {
        title: 'TRENDING NOW',
        links: newInDrawerLinks.trendingNow,
        className: 'ml-36',
      },
    ],
    womenJpeg,
    {
      topText: 'Spotlight on',
      title: 'PARTYWEAR LAUNCH',
      link: '/new-in/partywear-launch',
      linkText: 'Shop Now',
    }
  ),
  holidaySeason: createDrawerContent(
    [
      {
        title: 'GIFTS',
        links: holidaySeasonDrawerLinks.gifts,
      },
      {
        title: 'PARTY SEASON',
        links: holidaySeasonDrawerLinks.partySeason,
        className: 'ml-36',
      },
      {
        title: 'GETAWAY',
        links: holidaySeasonDrawerLinks.getaway,
        className: 'ml-36',
      },
    ],
    holidaySeasonPng,
    {
      topText: 'Spotlight on',
      title: 'GIFTS WITH PERSONALITY',
      link: '/holiday-season/gifts-with-personality',
      linkText: 'Shop Now',
    }
  ),
  brands: createDrawerContent(
    [
      {
        title: 'FEATURED BRANDS',
        links: brandsDrawerLinks.featuredBrands,
      },
      {
        title: 'CONTEMPORARY BRANDS',
        links: brandsDrawerLinks.contemporaryBrands,
        className: 'ml-22',
      },
    ],
    brandsPng,
    {
      topText: 'Brand focus',
      title: 'KHAITE',
      link: '/brands/khaite',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 470,
      rightContentClassName: 'w-[470px]',
    }
  ),
  clothing: createDrawerContent(
    [
      {
        title: 'CLOTHING',
        links: clothingDrawerLinks.clothing,
      },
      {
        title: 'DISCOVER',
        links: clothingDrawerLinks.discover,
        className: 'ml-47',
      },
      {
        title: 'OUR SUSTAINABLE SERVICES',
        links: clothingDrawerLinks.sustainableServices,
        className: 'ml-45',
      },
    ],
    clothingPng,
    {
      topText: 'Spotlight on',
      title: 'STATEMENT KNITS',
      link: '/clothing/statement-knits',
      linkText: 'Shop Now',
    }
  ),
  shoes: createDrawerContent(
    [
      {
        title: 'SHOES',
        links: shoesDrawerLinks.shoes,
      },
      {
        title: 'DISCOVER',
        links: shoesDrawerLinks.discover,
        className: 'ml-36',
      },
    ],
    shoesPng,
    {
      topText: 'Spotlight on',
      title: 'PARTY PUMPS',
      link: '/shoes/party-pumps',
      linkText: 'Shop Now',
    }
  ),
  bags: createDrawerContent(
    [
      {
        title: 'BAGS',
        links: bagsDrawerLinks.bags,
      },
      {
        title: 'DISCOVER',
        links: bagsDrawerLinks.discover,
      },
      {
        title: 'ICONIC LINES',
        links: bagsDrawerLinks.iconicLines,
        className: 'ml-6',
      },
      {
        title: 'OUR SUSTAINABLE SERVICES',
        links: bagsDrawerLinks.sustainableServices,
        className: 'max-w-[235px] -ml-9',
      },
    ],
    bagsPng,
    {
      topText: 'Spotlight on',
      title: 'CLUTCH BAGS',
      link: '/bags/clutch-bags',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 440,
      rightContentClassName: 'w-[440px] flex-shrink-0 ml-auto mr-10',
    }
  ),
  accessories: createDrawerContent(
    [
      {
        title: 'ACCESSORIES',
        links: accessoriesDrawerLinks.accessories,
      },
      {
        title: 'DISCOVER',
        links: accessoriesDrawerLinks.discover,
      },
    ],
    accessoriesPng,
    {
      topText: 'Spotlight on',
      title: 'THE BELT EDIT',
      link: '/accessories/belt-edit',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 440,
      rightContentClassName: 'w-[440px] flex-shrink-0 ml-auto mr-10',
    }
  ),
  jewellery: createDrawerContent(
    [
      {
        title: 'FASHION JEWELLERY',
        links: jewelleryDrawerLinks.fashionJewellery,
      },
      {
        title: 'FINE JEWELLERY',
        links: jewelleryDrawerLinks.fineJewellery,
        className: 'ml-19',
      },
      {
        title: 'DISCOVER',
        links: jewelleryDrawerLinks.discover,
        className: 'ml-26',
      },
    ],
    jewelleryPng,
    {
      topText: 'Spotlight on',
      title: 'JEWELRY AND WATCHES',
      link: '/jewellery/jewelry-watches',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 440,
      rightContentClassName: 'w-[440px] flex-shrink-0 ml-auto mr-10',
    }
  ),
  homeware: createDrawerContent(
    [
      {
        title: 'HOMEWARE',
        links: homewareDrawerLinks.homeware,
      },
      {
        title: 'FEATURED BRANDS',
        links: homewareDrawerLinks.featuredBrands,
        className: 'ml-14',
      },
    ],
    homewarePng,
    {
      topText: 'Spotlight on',
      title: 'HOSTING AT HOME',
      link: '/homeware/hosting-at-home',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 440,
      rightContentClassName: 'w-[440px] flex-shrink-0 ml-auto mr-10',
    }
  ),
  preOwned: createDrawerContent(
    [
      {
        title: 'PRE-OWNED',
        links: preOwnedDrawerLinks.preOwned,
      },
      {
        title: 'BRANDS',
        links: preOwnedDrawerLinks.brands,
        className: 'ml-12',
      },
      {
        title: 'DISCOVER',
        links: preOwnedDrawerLinks.discover,
        className: 'ml-20',
      },
      {
        title: 'OUR SUSTAINABLE SERVICES',
        links: preOwnedDrawerLinks.sustainableServices,
        className: 'max-w-[235px] ml-20',
      },
    ],
    preOwnedPng,
    {
      topText: 'Spotlight on',
      title: 'PRE-OWNED CELINE',
      link: '/pre-owned/celine',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 440,
      rightContentClassName: 'w-[440px] flex-shrink-0 ml-auto mr-10',
    }
  ),
  sale: createDrawerContent(
    [
      {
        title: 'SALE',
        links: saleDrawerLinks.sale,
      },
    ],
    salePng,
    {
      topText: 'Women',
      title: 'SALE',
      link: '/sale',
      linkText: 'Shop now',
    }
  ),
};

// Men's drawer content (can be customized later)
const menswearDrawers: Record<string, DrawerContent> = {
  '25off': createDrawerContent(
    [
      {
        title: '25% OFF',
        links: drawerLinks,
        className: 'w-[280px]',
      },
    ],
    twentyFiveOffPng,
    {
      topText: 'Men',
      title: '25% OFF',
      link: '/sale/25-off/men',
      linkText: 'Shop now',
    }
  ),
  newIn: createDrawerContent(
    [
      {
        title: 'WHAT\'S NEW',
        links: [
          {
            href: '/new-in/today',
            label: 'New in today',
          },
          {
            href: '/new-in/clothing',
            label: 'New clothing',
          },
          {
            href: '/new-in/shoes',
            label: 'New shoes',
          },
          {
            href: '/new-in/bags-accessories',
            label: 'New bags & accessories',
          },
        ],
      },
      {
        title: 'TRENDING NOW',
        links: [
          {
            href: '/trending/plaid-edit',
            label: 'The plaid edit',
          },
          {
            href: '/trending/new-americana',
            label: 'The new Americana',
          },
          {
            href: '/trending/shearling-outerwear',
            label: 'Shearling outerwear',
          },
          {
            href: '/trending/neutral-denim',
            label: 'Neutral denim',
          },
          {
            href: '/trending/most-wanted-sneakers',
            label: 'Most-wanted sneakers',
          },
          {
            href: '/trending/wedding-guest-looks',
            label: 'Wedding-guest looks',
          },
          {
            href: '/trending/most-wanted-pieces',
            label: 'Most-wanted pieces',
          },
          {
            href: '/trending/exclusives-collabs',
            label: 'Exclusives & collabs',
          },
          {
            href: '/trending/fashion-feed',
            label: 'Fashion feed',
          },
        ],
        className: 'ml-36',
      },
      {
        title: 'FOR YOU',
        links: [
          {
            href: '/for-you/farfetched',
            label: 'FARFETCHED for you',
          },
          {
            href: '/for-you/new-in',
            label: 'New in for you',
          },
        ],
        className: 'ml-36',
      },
    ],
    newInMenHeader,
    {
      topText: 'Spotlight on',
      title: 'SHEARLING OUTERWEAR',
      link: '/new-in/shearling-outerwear',
      linkText: 'Shop Now',
    }
  ),
  holidaySeason: createDrawerContent(
    [
      {
        title: 'GIFTS',
        links: [
          {
            href: '/holiday-season/gifts/most-wanted',
            label: 'Most-wanted gifts',
          },
          {
            href: '/holiday-season/gifts/classic',
            label: 'Classic gifts',
          },
          {
            href: '/holiday-season/gifts/small-luxuries',
            label: 'Small luxuries',
          },
          {
            href: '/holiday-season/gifts/ultra-rare',
            label: 'Ultra-rare gifts',
          },
          {
            href: '/holiday-season/gifts/best-trainers',
            label: 'Best of trainers',
          },
          {
            href: '/holiday-season/gifts/with-personality',
            label: 'Gifts with personality',
          },
          {
            href: '/holiday-season/gifts/watches-jewellery',
            label: 'Watches & jewellery',
          },
          {
            href: '/holiday-season/gifts/homeware',
            label: 'Homeware gifts',
          },
          {
            href: '/holiday-season/gifts/for-her',
            label: 'Gifts for her',
          },
          {
            href: '/holiday-season/gifts/for-kids',
            label: 'Gifts for kids',
          },
        ],
      },
      {
        title: 'PARTY SEASON',
        links: [
          {
            href: '/holiday-season/party/going-out',
            label: 'Going-out styles',
          },
          {
            href: '/holiday-season/party/formal',
            label: 'Formal partywear',
          },
          {
            href: '/holiday-season/party/statement-shirts',
            label: 'Statement shirts',
          },
          {
            href: '/holiday-season/party/shoes-accessories',
            label: 'Party shoes & accessories',
          },
        ],
        className: 'ml-36',
      },
      {
        title: 'GETAWAY',
        links: [
          {
            href: '/holiday-season/getaway/ski',
            label: 'Ski & après-ski',
          },
          {
            href: '/holiday-season/getaway/winter-sun',
            label: 'Winter Sun',
          },
          {
            href: '/holiday-season/getaway/loungewear',
            label: 'Loungewear',
          },
        ],
        className: 'ml-36',
      },
    ],
    holidaySeasonMen,
    {
      topText: 'Spotlight on',
      title: 'SMALL LUXURIES',
      link: '/holiday-season/small-luxuries',
      linkText: 'Shop Now',
    }
  ),
  brands: createDrawerContent(
    [
      {
        title: 'FEATURED BRANDS',
        links: [
          {
            href: '/brands/ami-paris',
            label: 'AMI Paris',
          },
          {
            href: '/brands/amiri',
            label: 'Amiri',
          },
          {
            href: '/brands/brunello-cucinelli',
            label: 'Brunello Cucinelli',
          },
          {
            href: '/brands/burberry',
            label: 'Burberry',
          },
          {
            href: '/brands/dolce-gabbana',
            label: 'Dolce & Gabbana',
          },
          {
            href: '/brands/dsquared2',
            label: 'Dsquared2',
          },
          {
            href: '/brands/moncler',
            label: 'Moncler',
          },
          {
            href: '/brands/off-white',
            label: 'Off-White',
          },
          {
            href: '/brands/prada',
            label: 'Prada',
          },
          {
            href: '/brands/tom-ford',
            label: 'Tom Ford',
          },
          {
            href: '/brands/zegna',
            label: 'Zegna',
          },
        ],
      },
      {
        title: 'CONTEMPORARY BRANDS',
        links: [
          {
            href: '/brands/acne-studios',
            label: 'Acne Studios',
          },
          {
            href: '/brands/diesel',
            label: 'Diesel',
          },
          {
            href: '/brands/our-legacy',
            label: 'Our Legacy',
          },
          {
            href: '/brands/axel-arigato',
            label: 'Axel Arigato',
          },
          {
            href: '/brands/gallery-dept',
            label: 'Gallery Dept.',
          },
          {
            href: '/brands/rhude',
            label: 'Rhude',
          },
        ],
        className: 'ml-22',
      },
    ],
    brandMen,
    {
      topText: 'Brand focus',
      title: 'PRADA',
      link: '/brands/prada',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 470,
      rightContentClassName: 'w-[470px]',
    }
  ),
  clothing: createDrawerContent(
    [
      {
        title: 'CLOTHING',
        links: clothingDrawerLinks.clothing,
      },
      {
        title: 'DISCOVER',
        links: clothingDrawerLinks.discover,
        className: 'ml-47',
      },
      {
        title: 'OUR SUSTAINABLE SERVICES',
        links: clothingDrawerLinks.sustainableServices,
        className: 'ml-45',
      },
    ],
    clothingPng, // Can be replaced with men's clothing image
    {
      topText: 'Spotlight on',
      title: 'MENSWEAR ESSENTIALS',
      link: '/clothing/menswear-essentials',
      linkText: 'Shop Now',
    }
  ),
  shoes: createDrawerContent(
    [
      {
        title: 'SHOES',
        links: shoesDrawerLinks.shoes,
      },
      {
        title: 'DISCOVER',
        links: shoesDrawerLinks.discover,
        className: 'ml-36',
      },
    ],
    shoesPng, // Can be replaced with men's shoes image
    {
      topText: 'Spotlight on',
      title: 'MEN\'S FOOTWEAR',
      link: '/shoes/mens-footwear',
      linkText: 'Shop Now',
    }
  ),
  bags: createDrawerContent(
    [
      {
        title: 'BAGS',
        links: bagsDrawerLinks.bags,
      },
      {
        title: 'DISCOVER',
        links: bagsDrawerLinks.discover,
      },
      {
        title: 'ICONIC LINES',
        links: bagsDrawerLinks.iconicLines,
        className: 'ml-6',
      },
      {
        title: 'OUR SUSTAINABLE SERVICES',
        links: bagsDrawerLinks.sustainableServices,
        className: 'max-w-[235px] -ml-9',
      },
    ],
    bagsPng, // Can be replaced with men's bags image
    {
      topText: 'Spotlight on',
      title: 'MEN\'S BAGS',
      link: '/bags/mens-bags',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 440,
      rightContentClassName: 'w-[440px] flex-shrink-0 ml-auto mr-10',
    }
  ),
  accessories: createDrawerContent(
    [
      {
        title: 'ACCESSORIES',
        links: accessoriesDrawerLinks.accessories,
      },
      {
        title: 'DISCOVER',
        links: accessoriesDrawerLinks.discover,
      },
    ],
    accessoriesPng, // Can be replaced with men's accessories image
    {
      topText: 'Spotlight on',
      title: 'MEN\'S ACCESSORIES',
      link: '/accessories/mens-accessories',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 440,
      rightContentClassName: 'w-[440px] flex-shrink-0 ml-auto mr-10',
    }
  ),
  homeware: createDrawerContent(
    [
      {
        title: 'HOMEWARE',
        links: homewareDrawerLinks.homeware,
      },
      {
        title: 'FEATURED BRANDS',
        links: homewareDrawerLinks.featuredBrands,
        className: 'ml-14',
      },
    ],
    homewarePng,
    {
      topText: 'Spotlight on',
      title: 'HOSTING AT HOME',
      link: '/homeware/hosting-at-home',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 440,
      rightContentClassName: 'w-[440px] flex-shrink-0 ml-auto mr-10',
    }
  ),
  sale: createDrawerContent(
    [
      {
        title: 'SALE',
        links: saleDrawerLinks.sale,
      },
    ],
    salePng,
    {
      topText: 'Men',
      title: 'SALE',
      link: '/sale/men',
      linkText: 'Shop now',
    }
  ),
};

// Kids' drawer content (can be customized later)
const kidswearDrawers: Record<string, DrawerContent> = {
  '25off': createDrawerContent(
    [
      {
        title: '25% OFF',
        links: drawerLinks,
        className: 'w-[280px]',
      },
    ],
    twentyFiveOffPng,
    {
      topText: 'Kids',
      title: '25% OFF',
      link: '/sale/25-off/kids',
      linkText: 'Shop now',
    }
  ),
  newIn: createDrawerContent(
    [
      {
        title: 'WHAT is NEW',
        links: newInDrawerLinks.whatsNew,
      },
      {
        title: 'TRENDING NOW',
        links: newInDrawerLinks.trendingNow,
        className: 'ml-36',
      },
    ],
    womenJpeg, // Can be replaced with kids' image
    {
      topText: 'Spotlight on',
      title: 'NEW KIDSWEAR',
      link: '/new-in/kidswear',
      linkText: 'Shop Now',
    }
  ),
  holidaySeason: createDrawerContent(
    [
      {
        title: 'GIFTS',
        links: holidaySeasonDrawerLinks.gifts,
      },
      {
        title: 'PARTY SEASON',
        links: holidaySeasonDrawerLinks.partySeason,
        className: 'ml-36',
      },
      {
        title: 'GETAWAY',
        links: holidaySeasonDrawerLinks.getaway,
        className: 'ml-36',
      },
    ],
    holidaySeasonPng,
    {
      topText: 'Spotlight on',
      title: 'GIFTS FOR KIDS',
      link: '/holiday-season/gifts-for-kids',
      linkText: 'Shop Now',
    }
  ),
  brands: createDrawerContent(
    [
      {
        title: 'FEATURED BRANDS',
        links: brandsDrawerLinks.featuredBrands,
      },
      {
        title: 'CONTEMPORARY BRANDS',
        links: brandsDrawerLinks.contemporaryBrands,
        className: 'ml-22',
      },
    ],
    brandsPng,
    {
      topText: 'Brand focus',
      title: 'KIDS BRANDS',
      link: '/brands/kids',
      linkText: 'Shop Now',
    },
    {
      imageWidth: 470,
      rightContentClassName: 'w-[470px]',
    }
  ),
  sale: createDrawerContent(
    [
      {
        title: 'SALE',
        links: saleDrawerLinks.sale,
      },
    ],
    salePng,
    {
      topText: 'Kids',
      title: 'SALE',
      link: '/sale/kids',
      linkText: 'Shop now',
    }
  ),
};

export const drawerContentByDepartment: DrawerContentByDepartment = {
  womenswear: womenswearDrawers,
  menswear: menswearDrawers,
  kidswear: kidswearDrawers,
};

