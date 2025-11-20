import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { contactUsImage } from '@/assets'
import AboutFooter from './AboutFooter'

type ContactAboutProps = {
  onBack?: () => void
}

const ContactAbout = ({ onBack }: ContactAboutProps) => {
  return (
    <>
      <div
        className="box-border flex min-h-screen w-full flex-col bg-[#f5f5f5] px-5 pb-[60px] pt-5"
        style={{ position: 'relative', zIndex: 1, marginTop: 0 }}
      >
        {/* Home Link - Outside white template */}
        <div className="mb-[30px] text-center">
          {onBack ? (
            <button
              onClick={onBack}
              className="cursor-pointer border-0 bg-transparent p-0 text-sm text-[#222] transition-colors duration-200 no-underline font-inherit"
            >
              Home
            </button>
          ) : (
            <Link
              href="/"
              className="text-base text-[#222] transition-colors duration-200 no-underline"
            >
              Home
            </Link>
          )}
        </div>
        <div className="mx-auto w-full max-w-[900px] flex-1 bg-white px-10 pb-[60px] font-['Helvetica_Neue',Arial,sans-serif]">
          {/* Main Title */}
          <h1 className="mt-0 text-center font-['Helvetica_Neue',Arial,sans-serif] text-[36px] font-bold uppercase tracking-[0.05em] text-[#222]">
            CONTACT US
          </h1>

          {/* Banner Image - Extends from left to right edges of white container */}
          <div className="relative mb-[77px] -mx-25">
            <Image
              src={contactUsImage}
              alt="Farfetch contact banner"
              width={1200}
              height={600}
              className="block h-auto w-full object-cover"
              priority
            />
          </div>

          {/* Contact Information */}
          <div className="mx-auto max-w-[800px] text-center text-[#222]">
            <p className="mb-5 text-sm font-light leading-relaxed text-[#222]">
              Thank you for your interest in Farfetch!
            </p>
            <p className="mb-[15px] text-sm font-light leading-relaxed text-[#222]">
              For general enquiries and customer service, please contact us through{' '}
              <Link
                href="https://farfetch.com"
                className="cursor-pointer text-[#222] underline transition-colors duration-200"
              >
                farfetch.com
              </Link>
              .
            </p>
            <p className="mb-[15px] text-sm font-light leading-relaxed text-[#222]">
              For media requests, send us an email to{' '}
              <Link
                href="mailto:press@farfetch.com"
                className="cursor-pointer text-[#222] underline transition-colors duration-200"
              >
                press@farfetch.com
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <AboutFooter />
    </>
  )
}

export default ContactAbout