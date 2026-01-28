"use client";

import { useState, useCallback } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import {
  footer400m2Image,
  footer58mImage,
  footerAmrImage,
  footerAngeloImage,
  footerAplusImage,
  footerAbseitsImage,
  footerActualImage,
  footerBlackWhiteImage,
  footerBrownImage,
  footerFlowerImage,
} from "@/assets";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import { useLanguage } from "@/context/LanguageContext";

interface BoutiqueRegion {
  title: string;
  subtitle: string;
  countries?: string[];
}

interface BoutiqueRegionUI extends BoutiqueRegion {
  showChevron?: boolean;
}

interface Boutique {
  name: string;
  location: string;
  brands: string[] | string;
  about: string;
  image: typeof footerFlowerImage;
  imageAlt: string;
}

const boutiqueRegions: BoutiqueRegionUI[] = [
  {
    title: "ALL BOUTIQUES",
    subtitle: "Explore every FARFETCH partner around the world",
    showChevron: false,
  },
  {
    title: "EUROPE",
    subtitle: "The original network of avant-garde boutiques and design houses",
    countries: [
      "Andorra","Austria",  "Belgium","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland",
      "Ireland","Italy","Latvia", "Liechtenstein","Lithuania", "Luxembourg","Malta", "Monaco","Netherlands","Norway", "Poland",
      "Portugal","Romania",  "San Marino","Slovakia","Slovenia","Spain", "Sweden","Switzerland","United Kingdom","view all",
    ],
  },
  {
    title: "THE UNITED STATES & CANADA",
    subtitle: "Independent concepts and collectible fashion curations",
    countries: ["Canada", "Puerto Rico", "United States", "View all"],
  },
  {
    title: "LATIN AMERICA AND THE CARIBBEAN",
    subtitle: "Bold craft, color and emerging labels from the region",
    countries: ["Brazil", "View all"],
  },
  {
    title: "REST OF THE WORLD",
    subtitle: "A curated view of boutiques from Asia-Pacific and the Middle East",
    countries: [
      "Australia", "Bahrain", "Georgia", "Hong Kong SAR", "Japan",
      "Korea, Republic of","Kuwait","Macau SAR", "Malaysia","New Zealand","Nigeria","Qatar","Saudi Arabia",
"Singapore","Taiwan Region","UAE","view all",
    ],
  },
];

const boutiques: Boutique[] = [
  {
    name: "10 CORSO COMO",
    location: "Milan, Italy",
    brands: [
      "Acne Studio","Alaïa","Balenciaga","Cecilie Bahnsen","Comme des Garçons","Junya Watanabe","Loewe","Maison Margiela",
      "Manolo Blahnik","Molly Goddard","Paul Smith","Raf Simons","Sacai","Simone Rocha","Stella McCartney","Stone Island",
    ],
    about:
      "Situated between the historical Brera area and the new Porta Nuova district, 10 Corso Como opened in a converted garage in the early '90s. Fusing fashion, design, art and culture, the Milanese institution counts itself as one of the first concept stores in the world. Expect a fluid space that fuses each section together seamlessly. Everything is connected to the iconic concentric circle logo, joined by a garden café and a bookshop.",
    image: footerFlowerImage,
    imageAlt: "Farfetch partner boutiques collage",
  },
  {
    name: "13METRIQUADRI",
    location: "Bellaria, Italy",
    brands: "Ami, Each x Other, Golden Goose Deluxe Brand, Iro, Junya Watanabe, MM6 Maison Margiela, Palm Angels",
    about:
      "13metriquadri opened its doors in 2007 in Bellaria, a small tourist town on the Italian east coast. Although small in size, the store is popular due to its curated selection of contemporary designers that can't be found anywhere else in the area.",
    image: footerBrownImage,
    imageAlt: "13METRIQUADRI boutique showcase",
  },
  {
    name: "4",
    location: "Shuwaikh, Kuwait",
    brands: "Ann Demeulemeester, Gareth Pugh, Haider Ackermann, Mugler, Rick Owens, Yohji Yamamoto",
    about:
      "From avant-garde fashion to timeless furniture, books and beautiful paintings, 4 is located in Kuwait's industrial district. Situated in the core industrial area of Al-Shuwaikh and surrounded by traditional Islamic architecture, warehouses and bustling street markets, the store's interior sets a futuristic tone. See how the boutique incorporates Kubrick-esque sci-fi influences whilst championing emerging talent.",
    image: footerBlackWhiteImage,
    imageAlt: "4 boutique showcase",
  },
  {
    name: "400M2",
    location: "Marseille, France",
    brands: "32 Paradis, Alexander McQueen, Alexandre Vauthier, Assouline, Burberry, Courreges, Fendi, Givenchy, Rick Owens, Sergio Rossi, Stella McCartney",
    about:
      "Named after the dimensions of the boutique, 400M2 is a multi-brand boutique in Marseille, France. Home to a wide range of European designers, the store encompasses the perfect blend of Parisian nonchalance, Italian elegance and British references. Showcasing both designer menswear and womenswear, the store welcomes a calming blue interior reminiscent of the seaport outside.",
    image: footer400m2Image,
    imageAlt: "400M2 boutique showcase",
  },
  {
    name: "58M",
    location: "Paris, France",
    brands: "Anya Hindmarch, Chie Mihara, Church's, Comme des Garçons, K Jacques, Kenzo, Laurence Dacade, Maison Margiela, Marc by Marc Jacobs, Michel Vivien, Repetto, Terry de Haviland, Véronique Branquinho",
    about:
      "'Chic, roots, rock and roll et voila,' explains the founder of 58m. Find yourself transported to 58 Rue Montmartre in Paris — the zen-like space fusing contemporary interiors with flea market antiques, and conventional styles with sensual silhouettes. Named after its location in the City of Light, the mother-daughter duo highlights emerging artists alongside house names across its collections of designer shoes, bags and accessories.",
    image: footer58mImage,
    imageAlt: "58M boutique showcase",
  },
  {
    name: "A.M.R.",
    location: "Chiavari, Italy",
    brands: "Burberry, Chloé, Current Elliott, Dolce & Gabbana, Dsquared2, Jil Sander, Moncler, Paul Smith, Saint Laurent, Stella McCartney, Valentino",
    about:
      "AMR stands for the initials of three sisters, Alessandra, Maria and Rita, who founded this simple and elegant boutique in the historical area of Chiavari, a charming coastal town near Genova, Italy. The store stocks both menswear and womenswear and is home to the best Italian and international brands. 30 years after the first boutique opened, AMR opened several more locations across Italy.",
    image: footerAmrImage,
    imageAlt: "A.M.R. boutique showcase",
  },
  {
    name: "A.N.G.E.L.O.",
    location: "Lugo, Italy",
    brands: "Chanel, Christian Dior, Hermès, Louis Vuitton, Alaïa, Balenciaga, Givenchy, Gucci, Prada, Saint Laurent",
    about:
      "Since opening in the late '70s, A.N.G.E.L.O. Vintage Palace has become a pilgrimage site for archival fashion lovers. Angelo Caroli curates museum-worthy garments, accessories and travel trunks sourced from private collectors across Europe. Expect a mix of couture-era treasures, one-of-a-kind runway pieces and expertly restored leather goods displayed inside the historic palazzo-style boutique.",
    image: footerAngeloImage,
    imageAlt: "A.N.G.E.L.O. boutique showcase",
  },
  {
    name: "A.PLUS STORE",
    location: "Hamburg, Germany",
    brands: "AFFXWRKS, Acronym, Aries, Cav Empt, Comme des Garçons Shirt, Henrik Vibskov, Magic Stick, Nanamica, Porter by Yoshida, Salomon, Suicoke, Wacko Maria",
    about:
      "Pushing the boundaries of retail storytelling, a.plus invites you to experience a curated selection of progressive contemporary brands. Reflecting its ethos, the store is nestled in the Altona District of Hamburg, providing an escape into a different universe with a full ceiling of light panels and minimalist design. The entirely white space features infinity coves, dedicating full attention to the clothing.",
    image: footerAplusImage,
    imageAlt: "A.PLUS STORE boutique showcase",
  },
  {
    name: "ABSEITS",
    location: "Stuttgart, Germany",
    brands: ["Balmain", "Dsquared2", "MSGM", "Marc Jacobs", "Nº21", "Off-White", "Rick Owens", "Valentino"],
    about:
      "Located in the centre of Stuttgart, Abseits has provided designer clothing, shoes and accessories from the world's best brands since 1983. The interior of the boutique has been designed to replicate a castle or an old-fashioned hotel, with a vintage feel in the women's department and a clean monochrome aesthetic in the men's.",
    image: footerAbseitsImage,
    imageAlt: "ABSEITS boutique showcase",
  },
  {
    name: "ACTUEL B",
    location: "Avignon, France",
    brands: "Alexander Wang, Carven, Church's, Comme des Garçons, Givenchy, Haider Ackermann, Joseph, Junya Watanabe, Kitsuné, Lanvin, Maison Margiela, Marc Jacobs, Moncler, Rick Owens, Rochas, Saint Laurent, Tod's, Valentino",
    about:
      "Situated in Avignon's historic quarter, actuel B offers the South of France a selection of beautiful haute couture. With its classic architecture, the boutique complements and contrasts the sophistication of traditional style with modern designer fashion. Discover how the store is home to avant-garde, heritage and emerging brands.",
    image: footerActualImage,
    imageAlt: "ACTUEL B boutique showcase",
  },
];

const highlightedBoutique = boutiques[0];
const otherBoutiques = boutiques.slice(1);

// Reusable Boutique Section Component
interface BoutiqueSectionProps {
  boutique: Boutique;
  isFirst?: boolean;
  isLast?: boolean;
  translate: (text: string) => string;
}

const BoutiqueSection = ({ boutique, isFirst = false, isLast = false, translate }: BoutiqueSectionProps) => {
  const brandsText = Array.isArray(boutique.brands) 
    ? boutique.brands.join(", ") 
    : boutique.brands;

  return (
    <section className={`${isFirst ? "space-y-0" : "mt-6 space-y-1"}`}>
      {!isFirst && (
        <div
          className={`w-full h-64 md:h-60 lg:h-[16rem] border border-(--colorGrey) rounded-sm bg-cover bg-center ${isLast ? "mb-4" : ""}`}
          style={{ backgroundImage: `url(${boutique.image.src})` }}
          role="img"
          aria-label={boutique.imageAlt}
        />
      )}
      
      <div className={isLast ? "mb-2" : ""}>
        <h3 className={`${isFirst ? "text-lg font-light tracking-[0.08em]" : "text-[1.05rem] tracking-[0.18em] font-normal"} text-preto`}>
          {boutique.name}
        </h3>
        <p className={`text-sm text-preto ${isFirst ? "text-[0.72rem] tracking-[0.3em] uppercase mt-0" : ""}`}>
          {boutique.location}
        </p>
      </div>

      <div className={isLast ? "mb-2" : ""}>
        <h4 className="text-sm font-semibold text-preto">
          {isFirst
            ? translate("Brands to look out for")
            : translate("Brands to look out for:")}
        </h4>
        <p className={`text-sm text-preto ${isFirst ? "leading-6" : ""}`}>
          {brandsText}
        </p>
      </div>

      <div>
        <h4 className={`text-sm font-semibold text-preto ${isFirst ? "tracking-wide" : ""}`}>
          {isFirst ? translate("About the store") : translate("About the store:")}
        </h4>
        <p className={`text-sm text-preto leading-relaxed ${isFirst ? "mt-1" : ""}`}>
          {translate(boutique.about)}
        </p>
      </div>
    </section>
  );
};

const FarfetchPartnerBoutiques = () => {
  const [openRegion, setOpenRegion] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { translations } = useLanguage();
  const t = translations.productCopy;
  const translate = (text: string): string =>
    (t[text] as string | undefined) ?? text;

  const handleRegionToggle = useCallback((regionTitle: string) => {
    setOpenRegion((prev) => (prev === regionTitle ? null : regionTitle));
  }, []);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <div className="min-h-screen relative  font-normal  text-preto">
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-12 max-w-[1440px]">
        <header className="mb-10 ">
          <h1 className="text-2xl leading-tight tracking-tight font-normal mb-3 text-preto">
            {translate("Farfetch Partners")}
          </h1>
          <p className="text-sm text-preto">
            {translate(
              "Shop from the world's best luxury boutiques through Farfetch",
            )}
          </p>
        </header>

        <div className="flex flex-col relative  h-screen overflow-y-auto lg:flex-row gap-12">
          {/* Mobile toggle button for boutiques navigation */}
          <div className="mb-4 flex items-center justify-between lg:hidden  top-0 z-30 bg-white pb-2 pt-2">
            <h2 className="text-lg font-light text-preto">
              {translate("All boutiques")}
            </h2>
            <button
              type="button"
              onClick={toggleNav}
              className="p-2 rounded-full border border-(--colorGrey) text-preto flex items-center justify-center"
              aria-label={isNavOpen ? "Close boutiques menu" : "Open boutiques menu"}
            >
              {isNavOpen ? (
                <HiOutlineX className="h-5 w-5" />
              ) : (
                <HiOutlineMenu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Left rail */}
          <aside
            className={`w-full max-w-[22rem] md:max-w-[44rem] lg:w-[18rem] flex-shrink-0 border-t border-(--colorGrey) pt-4 lg:sticky self-start lg:self-start h-74 lg:top-0 bg-white ${
              isNavOpen ? "block z-40" : "hidden lg:block"
            }`}
          >
            <div className="space-y-0">
              {boutiqueRegions.map((region) => {
                const isOpen = openRegion === region.title;

                return (
                  <div
                    key={region.title}
                    className="border-b border-(--colorGrey) dark:border-gray-700 last:border-b-transparent"
                  >
                    <button
                      type="button"
                      onClick={
                        region.showChevron === false
                          ? undefined
                          : () => handleRegionToggle(region.title)
                      }
                      aria-expanded={region.showChevron === false ? undefined : isOpen}
                      className={`w-full flex items-center justify-between py-4 text-left transition-opacity ${
                        region.showChevron === false ? "cursor-default" : "hover:opacity-70"
                      }`}
                    >
                      <p className="text-xs font-thin text-preto uppercase">
                        {translate(region.title)}
                      </p>
                      {region.showChevron !== false && (
                        <HiOutlineChevronDown
                          className={`text-lg transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                    {region.countries && isOpen && (
                      <ul className="max-h-[60vh] overflow-y-auto space-y-0">
                        {region.countries.map((country) => (
                          <li
                            key={country}
                            className="py-2 border-b border-(--colorGrey) last:border-b-0 cursor-pointer text-xs font-thin text-(--colorDarkerGrey) hover:underline transition-all"
                          >
                            {translate(country)}
                          </li>
                        ))}
                      </ul>
                    )}
                    {region.subtitle && isOpen && !region.countries && (
                      <p className="text-[0.78rem] leading-relaxed text-(--colorDarkerGrey) pb-3 pr-4">
                        {translate(region.subtitle)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <section className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-light text-preto">
                  {translate("All boutiques")}
                </h2>
              </div>
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-(--colorGrey) rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${footerFlowerImage.src})`,
                }}
                role="img"
                aria-label={translate("Farfetch partner boutiques collage")}
              />
            </section>

            <BoutiqueSection
              boutique={highlightedBoutique}
              isFirst
              translate={translate}
            />

            {otherBoutiques.map((boutique, index) => (
              <BoutiqueSection
                key={boutique.name}
                boutique={boutique}
                translate={translate}
                isLast={index === otherBoutiques.length - 1}
              />
            ))}

            {/* Previous/Next Navigation */}
            <div className="flex items-center justify-between mt-12 mb-8 text-sm text-preto">
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <HiOutlineChevronLeft className="text-lg" />
                <span>{translate("Previous")}</span>
              </button>
              <span className="text-(--colorDarkerGrey)">
                {translate("1 of 49")}
              </span>
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <span>{translate("Next")}</span>
                <HiOutlineChevronRight className="text-lg" />
              </button>
            </div>
          </main>
        </div>

        {/* Download App Banner */}
        <div className="border-t border-(--colorGrey)">
          <DownloadAppBanner />
        </div>
      </div>
    </div>
  );
};

export default FarfetchPartnerBoutiques;

