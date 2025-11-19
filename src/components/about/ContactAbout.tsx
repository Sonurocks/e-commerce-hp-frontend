import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { contactUsImage } from '@/assets'

type ContactAboutProps = {
  onBack?: () => void
}

const ContactAbout = ({ onBack }: ContactAboutProps) => {
  return (
    <div className="w-full bg-[#f5f5f5] min-h-screen py-5 px-5 pb-[60px] box-border" style={{ position: 'relative', zIndex: 1, marginTop: 0 }}>
      {/* Home Link - Outside white template */}
      <div className="text-center mb-[30px]">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-[#222] text-sm no-underline cursor-pointer transition-colors duration-200 bg-transparent border-0 p-0 font-inherit"
          >
            Home
          </button>
        ) : (
          <Link
            href="/"
            className="text-[#222] text-base no-underline cursor-pointer transition-colors duration-200"
          >
            Home
          </Link>
        )}
      </div>
   <div className="w-full max-w-[900px] mx-auto bg-white font-['Helvetica_Neue',Arial,sans-serif] py-10 px-10 pb-[60px] box-border">
       
      <div className="w-full max-w-[900px] bg-white justify-center font-['Helvetica_Neue',Arial,sans-serif] mt-[10px] box-border">
        {/* Main Title */}
        <h1 className="text-center text-[36px] font-bold text-[#222] uppercase tracking-[0.05em] mt-0 font-['Helvetica_Neue',Arial,sans-serif]">
          CONTACT US
        </h1>
      </div>
      
      {/* Banner Image - Extends from left to right edges of white container */}
      <div className="mb-[77px] relative -mx-25">
        <Image
          src={contactUsImage}
          alt="Farfetch contact banner"
          width={1200}
          height={600}
          className="w-full h-auto object-cover block"
          priority
        />
      </div>

      

    {/* Contact Information */}
        <div className="text-center max-w-[800px] mx-auto text-[#222]">
          <p className="text-sm font-light mb-5 text-[#222] leading-relaxed">
            Thank you for your interest in Farfetch!
          </p>
          <p className="text-sm font-light mb-[15px] text-[#222] leading-relaxed">
            For general enquiries and customer service, please contact us through{' '}
            <Link
              href="https://farfetch.com"
              className="text-[#222] underline cursor-pointer transition-colors duration-200"
            >
              farfetch.com
            </Link>
            .
          </p>
          <p className="text-sm font-light mb-[15px] text-[#222] leading-relaxed">
            For media requests, send us an email to{' '}
            <Link
              href="mailto:press@farfetch.com"
              className="text-[#222] underline cursor-pointer transition-colors duration-200"
            >
              press@farfetch.com
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactAbout