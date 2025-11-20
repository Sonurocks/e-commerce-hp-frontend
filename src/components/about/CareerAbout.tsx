import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import carrerHero from '@/assets/about/carrer.png'

import goodGraphic from '@/assets/footer/good.png'
import prepareGraphic from '@/assets/footer/prepare.png'
import starGraphic from '@/assets/footer/star.png'

import AboutFooter from './AboutFooter'

const CareerAbout = () => {
  return (
    <>
      <div className="w-full bg-(--colorLightGrey) px-4 pt-8 md:px-8" style={{ fontFamily: 'var(--fontNormal)' }}>
        <div className="mb-4 text-center text-sm text-(--colorDarkGrey)">
          <Link href="/" className="transition hover:text-(--color-preto)">
            Home
          </Link>
          <span className="px-2 text-(--colorDarkGrey)">›</span>
          <span className="text-(--color-preto)">Careers</span>
        </div>

        <div className="mx-auto w-full max-w-[980px] bg-white px-5 pb-16 pt-8 shadow-sm md:px-14 md:pt-12">
          <div className="text-center">
            <h1 className="mt-4 text-[42px] font-bold uppercase text-(--color-preto) md:text-[56px]">
              Our Approach
            </h1>
            <p className="mt-4 font-serif text-[22px] text-(--color-preto) md:text-[28px]">How to Join Us</p>
          </div>

          <div className="relative left-1/2 mt-8 w-[75vw] max-w-none -translate-x-1/2 overflow-hidden">
            <Image
              src={carrerHero}
              alt="Candidates meeting with the Farfetch talent team"
              className="h-auto w-full max-h-[520px] object-cover"
              priority
            />
          </div>

          <Link
            href="https://www.farfetchgroupcareers.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-10 block text-center text-base font-normal text-(--color-preto) underline underline-offset-4"
          >
            Check all available opportunities to join the FARFETCH team
          </Link>

          <p className="mx-auto mt-6 max-w-3xl text-sm font-normal leading-relaxed text-(--color-preto)">
            We&apos;re committed to providing a transparent, fair and globally consistent hiring process through our GO
            FAR framework. We&apos;re passionate about creating a world-class candidate experience, so we&apos;ve created
            this short guide to help you prepare for your interview with us. Every candidate will go through a series of
            interviews, each focused on one of the three dimensions of GO FAR – Good for Farfetch, Good for Growth and
            Good for Role.
          </p>
          
       <div className="mt-10 flex justify-center">
            <Image
              src={goodGraphic}
              alt="Good for Farfetch, Good for Growth, Good for Role"
              className="h-auto w-full max-w-[720px] object-contain"
            />
          </div>

          <div className="mt-16 text-center text-(--color-preto)">
            <h2 className="text-3xl font-semibold tracking-wide">Behavioural Interviewing</h2>
            <p className="mx-auto mt-12 max-w-3xl text-sm font-normal leading-relaxed">
              We believe that past behaviour is the most accurate indicator of future success. Throughout your
              interviews, we want to understand not only what you have achieved, but how you achieved it – and equally
              when you have failed, what did you learn. We recommend reflecting on your past experiences and preparing
              detailed examples in advance.
            </p>
            <p className="mx-auto mt-8 max-w-3xl text-sm font-normal leading-relaxed">
              When interviewing, it’s most useful to leverage the STAR method to answer questions.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <Image
              src={starGraphic}
              alt="STAR interview method cards"
              className="h-auto w-full max-w-[760px] object-contain"
            />
          </div>

          <div className="mt-16 text-center text-(--color-preto)">
            <h2 className="text-3xl font-semibold tracking-wide">How to Prepare</h2>
            <div className="mt-12 flex justify-center">
              <Image
                src={prepareGraphic}
                alt="Preparation tips grid"
                className="h-auto w-full max-w-[780px] object-contain"
              />
            </div>
          </div>

          <div className="mt-12 text-center text-sm font-normal text-(--color-preto)">
            <Link
              href="https://www.farfetchgroupcareers.com/en/privacy-policy/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-(--color-preto)"
            >
              Read the Farfetch Candidate Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <AboutFooter />
    </>
  )
}

export default CareerAbout