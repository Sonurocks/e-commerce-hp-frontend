import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { contactUsImage } from '@/assets'

type ContactAboutProps = {
  onBack?: () => void
}

const ContactAbout = ({ onBack }: ContactAboutProps) => {
  return (
    <div style={styles.outerContainer}>
      {/* Home Link - Outside white template */}
      <div style={styles.homeLinkContainer}>
        {onBack ? (
          <button onClick={onBack} style={styles.homeLink}>
            Home
          </button>
        ) : (
          <Link href="/" style={styles.homeLink}>
            Home
          </Link>
        )}
      </div>

      <div style={styles.container}>
        {/* Main Title */}
        <h1 style={styles.title}>CONTACT US</h1>
      </div>

      {/* Banner Image - Outside white container to extend beyond */}
      <div style={styles.bannerContainer}>
        <Image
          src={contactUsImage}
          alt="Farfetch contact banner"
          width={1200}
          height={600}
          style={styles.bannerImage}
          priority
        />
      </div>

      <div style={styles.container}>
        {/* Contact Information */}
        <div style={styles.contactInfo}>
          <p style={styles.thankYouText}>
            Thank you for your interest in Farfetch!
          </p>
          <p style={styles.contactText}>
            For general enquiries and customer service, please contact us through{' '}
            <Link href="https://farfetch.com" style={styles.link}>
              farfetch.com
            </Link>
            .
          </p>
          <p style={styles.contactText}>
            For media requests, send us an email to{' '}
            <Link href="mailto:press@farfetch.com" style={styles.link}>
              press@farfetch.com
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  outerContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: '40px 20px 60px',
    boxSizing: 'border-box',
  },
  container: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#fff',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    padding: '40px 40px 60px',
    boxSizing: 'border-box',
  },
  homeLinkContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  homeLink: {
    color: '#222',
    fontSize: '16px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'inherit',
  },
  title: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 700,
    color: '#222',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 0 0',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  bannerContainer: {
    width: '70vw',
    maxWidth: '1100px',
    margin: '0 auto 0',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    display: 'block',
  },
  contactInfo: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    color: '#222',
  },
  thankYouText: {
    fontSize: '14px',
    fontWeight: 300,
    margin: '0 0 20px 0',
    color: '#222',
    lineHeight: 1.6,
  },
  contactText: {
    fontSize: '14px',
    fontWeight: 300,
    margin: '0 0 15px 0',
    color: '#222',
    lineHeight: 1.6,
  },
  link: {
    color: '#222',
    textDecoration: 'underline',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
}

export default ContactAbout

