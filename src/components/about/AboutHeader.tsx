"use client"

import React, { useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import ContactAbout from './ContactAbout'

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

  const handleItemClick = (item: string) => {
    if (item === 'Contact') {
      setShowContactPage(true)
      setActiveItem(null)
    } else {
      setShowContactPage(false)
      setActiveItem(item)
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.wrapper}>
        <div style={styles.topRow}>
          <div style={styles.logo}>FARFETCH</div>
          <button style={styles.cartButton} aria-label="Cart">
            <HiOutlineShoppingBag size={22} color="#111" />
          </button>
        </div>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item}
              style={{
                ...styles.navItem,
                ...(activeItem === item ? styles.navItemActive : {}),
              }}
              onMouseEnter={() => {
                if (item !== 'Contact') {
                  setActiveItem(item)
                }
              }}
              onFocus={() => {
                if (item !== 'Contact') {
                  setActiveItem(item)
                }
              }}
              onClick={() => handleItemClick(item)}
            >
              {item}
              {activeItem === item && <span style={styles.navItemUnderline} />}
            </button>
          ))}
        </nav>
      </header>
      {showContactPage ? (
        <ContactAbout onBack={() => setShowContactPage(false)} />
      ) : activeItem ? (
        <div style={styles.drawer} onMouseLeave={() => setActiveItem(null)}>
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
      ) : null}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    width: '100%',
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
    position: 'relative',
    zIndex: 1000,
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
    zIndex: 999,
    animation: 'slideDown 0.3s ease-out',
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


