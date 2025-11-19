"use client"

import React, { useEffect, useMemo, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import {
  aboutAddImage,
  aboutAllImage,
  aboutFoodImage,
  aboutHomeImage,
  aboutHumanImage,
  aboutLaptopImage,
  aboutPhoneOneImage,
  aboutPhoneTwoImage,
  aboutShoesImage,
  aboutShowcaseImage,
} from '@/assets'

type Slide = {
  id: string
  date: string
  title: string
  image: StaticImageData
}

const rotationIntervalMs = 4000

const slides: Slide[] = [
  {
    id: 'all',
    date: '12.11.2025',
    title: 'FARFETCH reveals the Holiday Exclusives',
   image: aboutAllImage,
  },
  {
    id: 'shoes',
    date: '24.10.2025',
    title: 'Only on FARFETCH: Exclusive Golden Goose True-Star Sneaker',
    image: aboutShoesImage,
  },
  {
    id: 'home',
    date: '01.10.2025',
    title: 'Browns unveils The Parlour, a new beauty retreat in Mayfair',
   image: aboutHomeImage,
  },
]

const knowMoreCards = [
  { id: 'press', label: 'All Press Releases', image: aboutLaptopImage },
  { id: 'newsletter', label: 'Around FARFETCH Newsletter', image: aboutPhoneOneImage },
  { id: 'social', label: 'Follow Us on Social Media', image: aboutPhoneTwoImage },
]

const newsItems: Slide[] = [
  {
    id: 'holiday-exclusives',
    date: '12.11.2025',
    title: 'FARFETCH reveals the Holiday Exclusives',
    image: aboutAllImage,
  },
  {
    id: 'cult-of-winter',
    date: '04.11.2025',
    title: "123V Browns presents 'The Cult of Winter', a warm vegan experience",
    image: aboutFoodImage,
  },
  {
    id: 'true-star-sneaker',
    date: '24.10.2025',
    title: 'Only on FARFETCH: Exclusive Golden Goose True-Star Sneaker',
    image: aboutShoesImage,
  },
  {
    id: 'parlour-beauty-retreat',
    date: '01.10.2025',
    title: 'Browns unveils Parlour, a new beauty retreat in Mayfair',
    image: aboutAddImage,
  },
  {
    id: 'dolce-gabbana',
    date: '23.09.2025',
    title: 'FARFETCH and Dolce&Gabbana present new-season exclusives',
    image: aboutHumanImage,
  },
  {
    id: 'advertising-service',
    date: '19.06.2025',
    title: 'FARFETCH unveils enhanced Advertising Service for Luxury Brand Partners',
    image: aboutLaptopImage,
  },
]

const AboutShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, rotationIntervalMs)

    return () => clearInterval(timer)
  }, [])

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex])

  return (
    <section
      className="w-full px-5 box-border bg-[#f5f5f5] flex flex-col gap-0 font-['Helvetica_Neue',Arial,sans-serif]"
      aria-label="Latest highlights from FARFETCH"
    >
      <div className="relative w-full max-w-[1150px] min-h-[520px] mx-auto overflow-hidden bg-white">
        <Image
          key={activeSlide.id}
          src={activeSlide.image}
          alt={activeSlide.title}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
      </div>
      <div className="w-[90%] max-w-[900px] mx-auto -mt-10 relative z-10 grid grid-cols-1 md:grid-cols-3 border border-[#ebebeb] bg-white shadow-lg">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            aria-label={`Show story ${slide.title}`}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col gap-2 px-6 p-8 text-left border-l border-[#ebebeb] first:border-l-0 border-t-4 transition-all duration-300 ${
              index === activeIndex ? 'border-t-transparent' : 'border-t-[#b4b4b6]'
            }`}
          >
            <p className="m-0 text-sm font-thin tracking-[0.08em] text-[#222] uppercase">{slide.date}</p>
            <p className="m-0 text-sm font-thin text-[#222] leading-[1.5]">{slide.title}</p>
           
          </button>
        ))}
      </div>
      <div className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-10 items-center">
          <h2 className="text-4xl font-light tracking-[0.08em] text-[#111]">Know More</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 w-full">
            {knowMoreCards.map((card) => (
              <div key={card.id} className="flex flex-col gap-4 items-center text-center">
                <div className="w-full h-[240px] relative overflow-hidden rounded">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
                <p className="text-base text-[#222]">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-12">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-8 px-6">
          <div className="w-full md:w-[60%] relative h-[320px] bg-[#f1f1f1]">
            <Image src={aboutShowcaseImage} alt="FARFETCH Fall/Winter Campaign" fill className="object-cover" priority={false}  />
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-5 ">
            <p className="text-sm tracking-[0.08em] text-[#6f6f6f] uppercase">28.08.2025</p>
            <h3 className="text-2xl font-light leading-tight text-[#222]">
              FARFETCH showcases Fall/Winter 2025 Campaign
            </h3>
            <p className="text-base text-[#565656] leading-relaxed">
              The city serves as a catalyst for a fall/winter campaign that celebrates individual style, powered by FARFETCH&apos;s unmatched selection.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#f5f5f5] py-20">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-12 px-6">
          <h2 className="text-4xl font-light tracking-[0.08em] text-[#111] text-center">News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsItems.map((item) => (
              <article key={item.id} className="bg-white flex flex-col shadow-sm border border-[#ebebeb]" aria-label={item.title}>
                <div className="relative w-full h-[180px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-3 px-6 py-6">
                  <p className="m-0 text-sm font-thin tracking-[0.08em] text-[#222] uppercase">{item.date}</p>
                  <p className="m-0 text-sm text-[#222] leading-[1.5]">{item.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutShowcase

