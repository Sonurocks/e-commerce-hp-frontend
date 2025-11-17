'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ColorTheme = 'aubergine' | 'clementine' | 'banana' | 'jade' | 'lagoon' | 'barbra' | 'gray' | 'mood-indigo' | 'default';
export type FontTheme = 'lato' | 'geist' | 'inter' | 'roboto' | 'default';

interface ThemeContextType {
  colorTheme: ColorTheme;
  fontTheme: FontTheme;
  setColorTheme: (theme: ColorTheme) => void;
  setBgTheme: (theme: ColorTheme) => void;
  setFontTheme: (theme: FontTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeSettings = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeSettings must be used within ThemeSettingsProvider');
  }
  return context;
};

interface ThemeSettingsProviderProps {
  children: ReactNode;
}

export const ThemeSettingsProvider: React.FC<ThemeSettingsProviderProps> = ({ children }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('default');
  const [bgTheme, setBgTheme] = useState<string>('default')
  const [fontTheme, setFontThemeState] = useState<FontTheme>('default');

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme;
    const savedFontTheme = localStorage.getItem('fontTheme') as FontTheme;
    
    if (savedColorTheme) {
      setColorThemeState(savedColorTheme);
    }
    if (savedFontTheme) {
      setFontThemeState(savedFontTheme);
    }
  }, []);

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Helper function to lighten a color
  const lightenColor = (hex: string, percent: number): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * percent));
    const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * percent));
    const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * percent));
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  };

  // Helper function to darken a color
  const darkenColor = (hex: string, percent: number): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const r = Math.max(0, Math.round(rgb.r * (1 - percent)));
    const g = Math.max(0, Math.round(rgb.g * (1 - percent)));
    const b = Math.max(0, Math.round(rgb.b * (1 - percent)));
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  };

  // Helper function to get text color (white or black) based on background
  const getTextColor = (hex: string): string => {
    const rgb = hexToRgb(hex);7
    if (!rgb) return '#ffffff';
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#222222' : '#ffffff';
  };

  // Apply color theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-color-theme', colorTheme);
    
    let primaryColor = '#222222';
    let secondaryColor = '#222222';
    
    // Apply color theme variables
    switch (colorTheme) {
      case 'aubergine':
        primaryColor = '#4A148C';
        secondaryColor = '#7B1FA2';
        break;
      case 'clementine':
        primaryColor = '#FF6B35';
        secondaryColor = '#FF8C5A';
        break;
      case 'banana':
        primaryColor = '#FFD700';
        secondaryColor = '#FFE44D';
        break;
      case 'jade':
        primaryColor = '#00A86B';
        secondaryColor = '#00C97A';
        break;
      case 'lagoon':
        primaryColor = '#00CED1';
        secondaryColor = '#20B2AA';
        break;
      case 'barbra':
        primaryColor = '#8B0000';
        secondaryColor = '#A52A2A';
        break;
      case 'gray':
        primaryColor = '#808080';
        secondaryColor = '#A0A0A0';
        break;
      case 'mood-indigo':
        primaryColor = '#4B0082';
        secondaryColor = '#6A0DAD';
        break;
      default:
        primaryColor = '#222222';
        secondaryColor = '#222222';
    }

    // Generate comprehensive color variations
    if (colorTheme === 'default') {
      // Reset to default colors
      root.style.setProperty('--theme-primary', 'var(--color-preto)');
      root.style.setProperty('--theme-secondary', 'var(--color-preto)');
      root.style.setProperty('--theme-text', 'var(--color-preto)');
      root.style.setProperty('--theme-bg', 'var(--color-branco)');
      root.style.setProperty('--theme-bg-light', 'var(--color-whiteSmoke)');
      root.style.setProperty('--theme-border', 'var(--color-platinum)');
      root.style.setProperty('--theme-hover', 'var(--colorGrey)');
      root.style.setProperty('--theme-active', 'var(--color-silver)');
      root.style.setProperty('--theme-button-bg', 'var(--color-preto)');
      root.style.setProperty('--theme-button-text', '#ffffff');
      root.style.setProperty('--theme-button-hover', 'var(--colorDarkerGrey)');
      root.style.setProperty('--theme-link', 'var(--color-preto)');
      root.style.setProperty('--theme-link-hover', 'var(--colorDarkerGrey)');
    } else {
      // Apply theme colors with variations
      const textColor = getTextColor(primaryColor);
      const lightBg = lightenColor(primaryColor, 0.95);
      const lighterBg = lightenColor(primaryColor, 0.98);
      const hoverBg = lightenColor(primaryColor, 0.85);
      const activeBg = lightenColor(primaryColor, 0.75);
      const borderColor = lightenColor(primaryColor, 0.7);
      const buttonHover = darkenColor(primaryColor, 0.15);
      const linkHover = darkenColor(primaryColor, 0.2);

      root.style.setProperty('--theme-primary', primaryColor);
      root.style.setProperty('--theme-secondary', secondaryColor);
      root.style.setProperty('--theme-text', primaryColor);
      root.style.setProperty('--theme-bg', lighterBg);
      root.style.setProperty('--theme-bg-light', lightBg);
      root.style.setProperty('--theme-border', borderColor);
      root.style.setProperty('--theme-hover', hoverBg);
      root.style.setProperty('--theme-active', activeBg);
      root.style.setProperty('--theme-button-bg', primaryColor);
      root.style.setProperty('--theme-button-text', textColor);
      root.style.setProperty('--theme-button-hover', buttonHover);
      root.style.setProperty('--theme-link', primaryColor);
      root.style.setProperty('--theme-link-hover', linkHover);
    }
  }, [colorTheme]);

  // Apply font theme
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-font-theme', fontTheme);
        switch (fontTheme) {
      case 'lato':
        root.style.setProperty('--font-theme', 'var(--font-lato), sans-serif');
        break;
      case 'geist':
        root.style.setProperty('--font-theme', 'var(--font-geist-sans), sans-serif');
        break;
      case 'inter':
        root.style.setProperty('--font-theme', 'var(--font-inter), sans-serif');
        break;
      case 'roboto':
        root.style.setProperty('--font-theme', 'var(--font-roboto), sans-serif');
        break;
      default:
        root.style.setProperty('--font-theme', 'var(--fontNormal)');
        root.style.removeProperty('--font-theme');
    }
  }, [fontTheme]);

  useEffect(()=>{
    const root = document.documentElement;
      root.style.setProperty('--theme-bg', bgTheme);
  },[bgTheme])

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem('colorTheme', theme);
  };


  const setFontTheme = (theme: FontTheme) => {
    setFontThemeState(theme);
    localStorage.setItem('fontTheme', theme);
  };

  return (
    <ThemeContext.Provider value={{ colorTheme, fontTheme, setBgTheme, setColorTheme, setFontTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

