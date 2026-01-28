"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import ContactAbout from './ContactAbout'
import CareerAbout from './CareerAbout'

const navItems = ['About', 'Ethics', 'Media', 'Careers', 'Contact']

const ethicsLinks = [
  'Report a Concern',
  'Code of Business Conduct and Ethics',
  'Anti-Bribery and Corruption',
  'FAQs',
]

const mediaLinks = [
  'News',
  'Around FARFETCH Newsletter',
  'Social Media',
]

const careersLinks = [
  'Our Approach to Hiring',
  'Jobs',
  'Reporting',
  'Candidate Privacy Policy',
  'Fraud Alert',
]

const AboutHeader = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [showContactPage, setShowContactPage] = useState(false)
  const [showCareerPage, setShowCareerPage] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Check if coming from footer with career or contact view
    const view = searchParams?.get('view')
    if (view === 'career') {
      setShowCareerPage(true)
      setShowContactPage(false)
      setActiveItem(null)
    } else if (view === 'contact') {
      setShowContactPage(true)
      setShowCareerPage(false)
      setActiveItem(null)
    }
  }, [searchParams])

  const handleItemClick = (item: string) => {
    if (item === 'Contact') {
      setShowContactPage(true)
      setShowCareerPage(false)
      setActiveItem(null)
      router.push('/about?view=contact', { scroll: false })
    } else if (item === 'Careers') {
      setShowCareerPage(true)
      setShowContactPage(false)
      setActiveItem(null)
      router.push('/about?view=career', { scroll: false })
    } else {
      // Don't close ContactAbout on click - just open drawer
      // User can still navigate by clicking, but drawer should work on hover too
      setActiveItem(item)
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.wrapper}>
        <div style={styles.topRow}>
          <div style={styles.logo}>FARFETCH</div>
         
        </div>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item}
              style={{
                ...styles.navItem,
                ...(activeItem === item || (item === 'Contact' && showContactPage) || (item === 'Careers' && showCareerPage) ? styles.navItemActive : {}),
              }}
              onMouseEnter={() => {
                setActiveItem(item)
              }}
              onFocus={() => {
                setActiveItem(item)
              }}
              onMouseLeave={() => {
                // Only clear if not on Contact/Career page and item is Contact/Careers
                if (item === 'Contact' && !showContactPage) {
                  setActiveItem(null)
                } else if (item === 'Careers' && !showCareerPage) {
                  setActiveItem(null)
                } else if (item !== 'Contact' && item !== 'Careers') {
                  // For other items, clear on mouse leave (drawer will handle its own)
                  // Don't clear here to avoid flickering
                }
              }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleItemClick(item)
                // Set activeItem on click
                setActiveItem(item)
              }}
            >
              {item}
              {(activeItem === item || (item === 'Contact' && showContactPage) || (item === 'Careers' && showCareerPage)) && <span style={styles.navItemUnderline} />}
            </button>
          ))}
        </nav>
        {/* Drawer - positioned relative to header */}
        {activeItem && (
          <div 
            style={styles.drawer} 
            onMouseEnter={() => setActiveItem(activeItem)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <div style={styles.drawerContent}>
              {activeItem === 'Ethics' ? (
                ethicsLinks.map((item) => (
                  <span key={item} style={styles.drawerLink}>
                    {item}
                  </span>
                ))
              ) : activeItem === 'Media' ? (
                mediaLinks.map((item) => (
                  <span key={item} style={styles.drawerLink}>
                    {item}
                  </span>
                ))
              ) : activeItem === 'Careers' ? (
                careersLinks.map((item) => (
                  <span key={item} style={styles.drawerLink}>
                    {item}
                  </span>
                ))
              ) : (
                <p style={styles.drawerText}>Farfetch</p>
              )}
            </div>
          </div>
        )}
      </header>
      {/* ContactAbout - shows below header/drawer */}
      {showContactPage && (
        <div style={{ position: 'relative', zIndex: 1, marginTop: 0, paddingTop: 0 }}>
          <ContactAbout onBack={() => {
            setShowContactPage(false)
            router.push('/about', { scroll: false })
          }} />
        </div>
      )}
      {/* CareerAbout - shows below header/drawer */}
      {showCareerPage && (
        <div style={{ position: 'relative', zIndex: 1, marginTop: 0, paddingTop: 0 }}>
          <CareerAbout />
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    width: '100%',
    zIndex: 1000,
  },
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottom: '1px solid #f5f5f5',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    padding: '32px 48px 16px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'sticky',
    top: 0,
    zIndex: 1002,
    pointerEvents: 'auto',
    isolation: 'isolate',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logo: {
    fontSize: '34px',
    letterSpacing: '0.18em',
    fontWeight: 800,
    color: '#111',
    textTransform: 'uppercase',
  },
  cartButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  nav: {
    display: 'flex',
    gap: '32px',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 400,
    color: '#222',
    position: 'relative',
    zIndex: 1003,
    pointerEvents: 'auto',
  },
  navItem: {
    position: 'relative',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    border: 'none',
    background: 'none',
    padding: '0 8px 12px',
    color: '#999',
    fontSize: '16px',
    zIndex: 1003,
    pointerEvents: 'auto',
  },
  navItemActive: {
    color: '#111',
    fontWeight: 500,
  },
  navItemUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    width: '60%',
    height: '2px',
    backgroundColor: '#111',
  },
  drawer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderBottom: '1px solid #f5f5f5',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    zIndex: 1003,
    animation: 'slideDown 0.3s ease-out',
    pointerEvents: 'auto',
  },
  drawerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    padding: '30px 40px',
    flexWrap: 'wrap',
  },
  drawerLink: {
    fontSize: '14px',
    color: '#111',
    letterSpacing: '0.01em',
    cursor: 'pointer',
  },
  drawerText: {
    margin: 0,
    fontSize: '14px',
    color: '#111',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
}

export default AboutHeader


