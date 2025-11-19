"use client";

import React, { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
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
import { supportPageStyles } from "@/constants/supportPageStyles";

interface BoutiqueRegion {
  title: string;
  subtitle: string;
  countries?: string[];
}

interface BoutiqueRegionUI extends BoutiqueRegion {
  showChevron?: boolean;
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
      "Italy",
      "France",
      "United Kingdom",
      "Portugal",
      "Spain",
      "Poland",
      "Germany",
      "Scandinavia",
    ],
  },
  {
    title: "THE UNITED STATES & CANADA",
    subtitle: "Independent concepts and collectible fashion curations",
    countries: ["New York", "Los Angeles", "Miami", "Toronto", "Vancouver"],
  },
  {
    title: "LATIN AMERICA AND THE CARIBBEAN",
    subtitle: "Bold craft, color and emerging labels from the region",
    countries: ["Brazil", "Mexico City", "Buenos Aires", "Santiago"],
  },
  {
    title: "REST OF THE WORLD",
    subtitle: "A curated view of boutiques from Asia-Pacific and the Middle East",
    countries: ["Tokyo", "Hong Kong", "Seoul", "Shanghai", "Dubai", "Sydney"],
  },
];

const highlightedBoutique = {
  name: "10 CORSO COMO",
  location: "Milan, Italy",
  brands: [
    "Acne Studio",
    "Alaïa",
    "Balenciaga",
    "Cecilie Bahnsen",
    "Comme des Garçons",
    "Junya Watanabe",
    "Loewe",
    "Maison Margiela",
    "Manolo Blahnik",
    "Molly Goddard",
    "Paul Smith",
    "Raf Simons",
    "Sacai",
    "Simone Rocha",
    "Stella McCartney",
    "Stone Island",
  ],
  about:
    "Situated between the historical Brera area and the new Porta Nuova district, 10 Corso Como opened in a converted garage in the early '90s. Fusing fashion, design, art and culture, the Milanese institution counts itself as one of the first concept stores in the world. Expect a fluid space that fuses each section together seamlessly. Everything is connected to the iconic concentric circle logo, joined by a garden café and a bookshop.",
  highlights: [
    "Original concept space designed by Carla Sozzani and Kris Ruhs",
    "Art exhibitions, photography archives and collectible design objects",
    "Garden café and rooftop terrace for immersive shopping moments",
  ],
};

const secondaryBoutique = {
  name: "13METRIQUADRI",
  location: "Bellaria, Italy",
  brands:
    "Ami, Each x Other, Golden Goose Deluxe Brand, Iro, Junya Watanabe, MM6 Maison Margiela, Palm Angels",
  about:
    "13metriquadri opened its doors in 2007 in Bellaria, a small tourist town on the Italian east coast. Although small in size, the store is popular due to its curated selection of contemporary designers that can't be found anywhere else in the area.",
};

const thirdBoutique = {
  name: "4",
  location: "Shuwaikh, Kuwait",
  brands:
    "Ann Demeulemeester, Gareth Pugh, Haider Ackermann, Mugler, Rick Owens, Yohji Yamamoto",
  about:
    "From avant-garde fashion to timeless furniture, books and beautiful paintings, 4 is located in Kuwait's industrial district. Situated in the core industrial area of Al-Shuwaikh and surrounded by traditional Islamic architecture, warehouses and bustling street markets, the store's interior sets a futuristic tone. See how the boutique incorporates Kubrick-esque sci-fi influences whilst championing emerging talent.",
};

const fourthBoutique = {
  name: "400M2",
  location: "Marseille, France",
  brands:
    "32 Paradis, Alexander McQueen, Alexandre Vauthier, Assouline, Burberry, Courreges, Fendi, Givenchy, Rick Owens, Sergio Rossi, Stella McCartney",
  about:
    "Named after the dimensions of the boutique, 400M2 is a multi-brand boutique in Marseille, France. Home to a wide range of European designers, the store encompasses the perfect blend of Parisian nonchalance, Italian elegance and British references. Showcasing both designer menswear and womenswear, the store welcomes a calming blue interior reminiscent of the seaport outside.",
};

const fifthBoutique = {
  name: "58M",
  location: "Paris, France",
  brands:
    "Anya Hindmarch, Chie Mihara, Church's, Comme des Garçons, K Jacques, Kenzo, Laurence Dacade, Maison Margiela, Marc by Marc Jacobs, Michel Vivien, Repetto, Terry de Haviland, Véronique Branquinho",
  about:
    "‘Chic, roots, rock and roll et voila,’ explains the founder of 58m. Find yourself transported to 58 Rue Montmartre in Paris — the zen-like space fusing contemporary interiors with flea market antiques, and conventional styles with sensual silhouettes. Named after its location in the City of Light, the mother-daughter duo highlights emerging artists alongside house names across its collections of designer shoes, bags and accessories.",
};

const sixthBoutique = {
  name: "A.M.R.",
  location: "Chiavari, Italy",
  brands:
    "Burberry, Chloé, Current Elliott, Dolce & Gabbana, Dsquared2, Jil Sander, Moncler, Paul Smith, Saint Laurent, Stella McCartney, Valentino",
  about:
    "AMR stands for the initials of three sisters, Alessandra, Maria and Rita, who founded this simple and elegant boutique in the historical area of Chiavari, a charming coastal town near Genova, Italy. The store stocks both menswear and womenswear and is home to the best Italian and international brands. 30 years after the first boutique opened, AMR opened several more locations across Italy.",
};

const seventhBoutique = {
  name: "A.N.G.E.L.O.",
  location: "Lugo, Italy",
  brands:
    "Chanel, Christian Dior, Hermès, Louis Vuitton, Alaïa, Balenciaga, Givenchy, Gucci, Prada, Saint Laurent",
  about:
    "Since opening in the late '70s, A.N.G.E.L.O. Vintage Palace has become a pilgrimage site for archival fashion lovers. Angelo Caroli curates museum-worthy garments, accessories and travel trunks sourced from private collectors across Europe. Expect a mix of couture-era treasures, one-of-a-kind runway pieces and expertly restored leather goods displayed inside the historic palazzo-style boutique.",
};

const eighthBoutique = {
  name: "A.PLUS STORE",
  location: "Hamburg, Germany",
  brands:
    "AFFXWRKS, Acronym, Aries, Cav Empt, Comme des Garçons Shirt, Henrik Vibskov, Magic Stick, Nanamica, Porter by Yoshida, Salomon, Suicoke, Wacko Maria",
  about:
    "Pushing the boundaries of retail storytelling, a.plus invites you to experience a curated selection of progressive contemporary brands. Reflecting its ethos, the store is nestled in the Altona District of Hamburg, providing an escape into a different universe with a full ceiling of light panels and minimalist design. The entirely white space features infinity coves, dedicating full attention to the clothing.",
};

const abseitsBoutique = {
  name: "ABSEITS",
  location: "Stuttgart, Germany",
  brands: [
    "Balmain",
    "Dsquared2",
    "MSGM",
    "Marc Jacobs",
    "Nº21",
    "Off-White",
    "Rick Owens",
    "Valentino",
  ],
  about:
    "Located in the centre of Stuttgart, Abseits has provided designer clothing, shoes and accessories from the world's best brands since 1983. The interior of the boutique has been designed to replicate a castle or an old-fashioned hotel, with a vintage feel in the women's department and a clean monochrome aesthetic in the men's.",
};

const actuelBBoutique = {
  name: "ACTUEL B",
  location: "Avignon, France",
  brands:
    "Alexander Wang, Carven, Church's, Comme des Garçons, Givenchy, Haider Ackermann, Joseph, Junya Watanabe, Kitsuné, Lanvin, Maison Margiela, Marc Jacobs, Moncler, Rick Owens, Rochas, Saint Laurent, Tod's, Valentino",
  about:
    "Situated in Avignon's historic quarter, actuel B offers the South of France a selection of beautiful haute couture. With its classic architecture, the boutique complements and contrasts the sophistication of traditional style with modern designer fashion. Discover how the store is home to avant-garde, heritage and emerging brands.",
};

const FarfetchPartnerBoutiques = () => {
  const [openRegion, setOpenRegion] = useState<string | null>(null);
  const combinedStyles = {
    ...supportPageStyles,
    fontFamily: "var(--fontNormal)",
    color: "#222",
  } as const;

  return (
    <div
      className="min-h-screen bg-white text-(--color-preto)"
      style={combinedStyles}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-2 py-12">
        <header className="mb-10">
          <h1 className="text-2xl leading-tight tracking-tight font-normal mb-3 text-[#222]">
            Farfetch Partners
          </h1>
          <p className="text-sm text-[#222]">
            Shop from the world&apos;s best luxury boutiques through Farfetch
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left rail */}
          <aside className="lg:w-[18rem] flex-shrink-0 border-t border-gray-200 pt-4">
            <div className="space-y-0">
              {boutiqueRegions.map((region) => {
                const isOpen = openRegion === region.title;

                return (
                  <div
                    key={region.title}
                    className="border-b border-[#e5e5e5] dark:border-gray-700 last:border-b-transparent"
                  >
                    <button
                      type="button"
                      onClick={
                        region.showChevron === false
                          ? undefined
                          : () =>
                              setOpenRegion((prev) =>
                                prev === region.title ? null : region.title,
                              )
                      }
                      aria-expanded={region.showChevron === false ? undefined : isOpen}
                      className={`w-full flex items-center justify-between py-4 text-left transition-opacity ${
                        region.showChevron === false ? "cursor-default" : "hover:opacity-70"
                      }`}
                    >
                      <p className="text-xs font-thin text-[#222] uppercase">
                        {region.title}
                      </p>
                      {region.showChevron !== false && (
                        <HiOutlineChevronDown
                          className={`text-lg transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                    {region.subtitle && isOpen && (
                      <p className="text-[0.78rem] leading-relaxed text-[rgba(34,34,34,0.65)] pb-3 pr-4">
                        {region.subtitle}
                      </p>
                    )}
                    {region.countries && isOpen && (
                      <ul className="mt-2 mb-4 space-y-1 text-sm text-[rgba(34,34,34,0.75)] pl-1">
                        {region.countries.map((country) => (
                          <li key={country} className="flex items-center gap-2">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[rgba(34,34,34,0.5)]" />
                            <span>{country}</span>
                          </li>
                        ))}
                      </ul>
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
                <h2 className="text-xl font-light text-[#222]">All boutiques</h2>
              </div>
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${footerFlowerImage.src})`,
                }}
                role="img"
                aria-label="Farfetch partner boutiques collage"
              />
            </section>

            <section className="space-y-0">
              <div>
                <h3 className="text-lg font-light tracking-[0.08em] text-[#222]">
                  {highlightedBoutique.name}
                </h3>
                <p className="text-[0.72rem] tracking-[0.3em] text-[#222] uppercase mt-0">
                  {highlightedBoutique.location}
                </p>
              </div>

              <div className="space-y-0">
                <h4 className="text-sm font-semibold tracking-wide text-[#222]">
                  Brands to look out for
                </h4>
                <p className="text-sm leading-6 text-[#222]">
                  {highlightedBoutique.brands.join(", ")}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold tracking-wide text-[#222]">
                  About the store
                </h4>
                <p className="text-sm leading-relaxed text-[#222] mt-1">
                  {highlightedBoutique.about}
                </p>
              </div>
            </section>

            <section className="mt-6 space-y-1">
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${footerBrownImage.src})`,
                }}
                role="img"
                aria-label="13METRIQUADRI boutique showcase"
              />

              <div>
                <h3 className="text-[1.05rem] tracking-[0.18em] font-normal text-[#222]">
                  {secondaryBoutique.name}
                </h3>
                <p className="text-sm text-[#222] ">{secondaryBoutique.location}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">Brands to look out for:</h4>
                <p className="text-sm text-[#222]">{secondaryBoutique.brands}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">About the store:</h4>
                <p className="text-sm text-[#222] leading-relaxed ">{secondaryBoutique.about}</p>
              </div>
            </section>

            <section className="mt-6 space-y-1">
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${footerBlackWhiteImage.src})`,
                }}
                role="img"
                aria-label="4 boutique showcase"
              />

              <div>
                <h3 className="text-[1.05rem] tracking-[0.18em] font-normal text-[#222]">
                  {thirdBoutique.name}
                </h3>
                <p className="text-sm text-[#222] ">{thirdBoutique.location}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">Brands to look out for:</h4>
                <p className="text-sm text-[#222]">{thirdBoutique.brands}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">About the store:</h4>
                <p className="text-sm text-[#222] leading-relaxed ">{thirdBoutique.about}</p>
              </div>
            </section>

            <section className="mt-6 space-y-1">
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${footer400m2Image.src})`,
                }}
                role="img"
                aria-label="400M2 boutique showcase"
              />

              <div>
                <h3 className="text-[1.05rem] tracking-[0.18em] font-normal text-[#222]">
                  {fourthBoutique.name}
                </h3>
                <p className="text-sm text-[#222]">{fourthBoutique.location}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">Brands to look out for:</h4>
                <p className="text-sm text-[#222]">{fourthBoutique.brands}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">About the store:</h4>
                <p className="text-sm text-[#222] leading-relaxed ">{fourthBoutique.about}</p>
              </div>
            </section>

            <section className="mt-6 space-y-1">
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${footer58mImage.src})`,
                }}
                role="img"
                aria-label="58M boutique showcase"
              />

              <div>
                <h3 className="text-[1.05rem] tracking-[0.18em] font-normal text-[#222]">
                  {fifthBoutique.name}
                </h3>
                <p className="text-sm text-[#222]">{fifthBoutique.location}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">Brands to look out for:</h4>
                <p className="text-sm text-[#222]">{fifthBoutique.brands}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">About the store:</h4>
                <p className="text-sm text-[#222] leading-relaxed ">{fifthBoutique.about}</p>
              </div>
            </section>

            <section className="mt-6 space-y-1">
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${footerAmrImage.src})`,
                }}
                role="img"
                aria-label="A.M.R. boutique showcase"
              />

              <div>
                <h3 className="text-[1.05rem] tracking-[0.18em] font-normal text-[#222]">
                  {sixthBoutique.name}
                </h3>
                <p className="text-sm text-[#222]">{sixthBoutique.location}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">Brands to look out for:</h4>
                <p className="text-sm text-[#222]">{sixthBoutique.brands}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">About the store:</h4>
                <p className="text-sm text-[#222] leading-relaxed ">{sixthBoutique.about}</p>
              </div>
            </section>

            <section className="mt-6 space-y-1">
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${footerAngeloImage.src})`,
                }}
                role="img"
                aria-label="A.N.G.E.L.O. boutique showcase"
              />

              <div>
                <h3 className="text-[1.05rem] tracking-[0.18em] font-normal text-[#222]">
                  {seventhBoutique.name}
                </h3>
                <p className="text-sm text-[#222]">{seventhBoutique.location}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">Brands to look out for:</h4>
                <p className="text-sm text-[#222]">{seventhBoutique.brands}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">About the store:</h4>
                <p className="text-sm text-[#222] leading-relaxed ">{seventhBoutique.about}</p>
              </div>
            </section>

            <section className="mt-6 space-y-1">
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${footerAplusImage.src})`,
                }}
                role="img"
                aria-label="A.PLUS STORE boutique showcase"
              />

              <div>
                <h3 className="text-[1.05rem] tracking-[0.18em] font-normal text-[#222]">
                  {eighthBoutique.name}
                </h3>
                <p className="text-sm text-[#222]">{eighthBoutique.location}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">Brands to look out for:</h4>
                <p className="text-sm text-[#222]">{eighthBoutique.brands}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">About the store:</h4>
                <p className="text-sm text-[#222] leading-relaxed ">{eighthBoutique.about}</p>
              </div>
            </section>

            <section className="mt-6 space-y-1">
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center mb-4"
                style={{
                  backgroundImage: `url(${footerAbseitsImage.src})`,
                }}
                role="img"
                aria-label="ABSEITS boutique showcase"
              />

              <div className="mb-2">
                <h3 className="text-[1.05rem] tracking-[0.18em] font-normal text-[#222]">
                  {abseitsBoutique.name}
                </h3>
                <p className="text-sm text-[#222]">{abseitsBoutique.location}</p>
              </div>

              <div className="mb-2">
                <h4 className="text-sm font-semibold text-[#222]">Brands to look out for:</h4>
                <p className="text-sm text-[#222]">{abseitsBoutique.brands.join(", ")}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">About the store:</h4>
                <p className="text-sm text-[#222] leading-relaxed">{abseitsBoutique.about}</p>
              </div>
            </section>

            <section className="mt-6 space-y-1">
              <div
                className="w-full h-64 md:h-60 lg:h-[16rem] border border-[#e0e0e0] rounded-sm bg-cover bg-center mb-4"
                style={{
                  backgroundImage: `url(${footerActualImage.src})`,
                }}
                role="img"
                aria-label="ACTUEL B boutique showcase"
              />

              <div className="mb-2">
                <h3 className="text-[1.05rem] tracking-[0.18em] font-normal text-[#222]">
                  {actuelBBoutique.name}
                </h3>
                <p className="text-sm text-[#222]">{actuelBBoutique.location}</p>
              </div>

              <div className="mb-2">
                <h4 className="text-sm font-semibold text-[#222]">Brands to look out for:</h4>
                <p className="text-sm text-[#222]">{actuelBBoutique.brands}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#222]">About the store:</h4>
                <p className="text-sm text-[#222] leading-relaxed">{actuelBBoutique.about}</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FarfetchPartnerBoutiques;

