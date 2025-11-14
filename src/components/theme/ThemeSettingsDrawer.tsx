'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { useThemeSettings, ColorTheme, FontTheme } from './ThemeContext';
import { X } from 'lucide-react';

interface ThemeSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSettingsDrawer: React.FC<ThemeSettingsDrawerProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const { colorTheme, fontTheme, setColorTheme, setFontTheme } = useThemeSettings();

  const colorThemes: { name: string; value: ColorTheme; color: string }[] = [
    { name: 'Aubergine', value: 'aubergine', color: '#4A148C' },
    { name: 'Clementine', value: 'clementine', color: '#FF6B35' },
    { name: 'Banana', value: 'banana', color: '#FFD700' },
    { name: 'Jade', value: 'jade', color: '#00A86B' },
    { name: 'Lagoon', value: 'lagoon', color: '#00CED1' },
    { name: 'Barbra', value: 'barbra', color: '#8B0000' },
    { name: 'Gray', value: 'gray', color: '#808080' },
    { name: 'Mood Indigo', value: 'mood-indigo', color: '#4B0082' },
  ];

  const fonts: { name: string; value: FontTheme; label: string }[] = [
    { name: 'Default', value: 'default', label: 'Default (Farfetch Basis)' },
    { name: 'Lato', value: 'lato', label: 'Lato' },
    { name: 'Geist', value: 'geist', label: 'Geist' },
    { name: 'Inter', value: 'inter', label: 'Inter' },
    { name: 'Roboto', value: 'roboto', label: 'Roboto' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-white shadow-xl z-50 transform transition-transform overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[var(--color-preto)] dark:text-(--color-preto)">
              Theme Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-(--color-preto) transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Color Mode Section */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-[var(--color-preto)] dark:text-(--color-preto) mb-2">
              Color Mode
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Choose if the appearance should be light or dark, or follow your computer&apos;s settings.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-lg transition ${
                  theme === 'light'
                    ? 'border-gray-800 bg-gray-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                }`}
              >
                <svg
                  className="w-6 h-6 mb-2 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-[var(--color-preto)] dark:text-(--color-preto)">Light</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-lg transition ${
                  theme === 'dark'
                    ? 'border-gray-800 bg-gray-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                }`}
              >
                <svg
                  className="w-6 h-6 mb-2 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                <span className="text-sm font-medium text-[var(--color-preto)] dark:text-(--color-preto)">Dark</span>
              </button>

              <button
                onClick={() => setTheme('system')}
                className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-lg transition ${
                  theme === 'system'
                    ? 'border-gray-800 bg-gray-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                }`}
              >
                <svg
                  className="w-6 h-6 mb-2 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-(--color-preto) dark:text-(--color-preto)">System</span>
              </button>
            </div>
          </div>

          {/* Color Theme Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <button className="text-sm font-semibold text-(--color-preto) dark:text-white border-b-2 border-(--color-preto) dark:border-white pb-1">
                Color Themes
              </button>
            </div>
            <h4 className="text-sm font-medium text-[var(--color-preto)] dark:text-(--color-preto) mb-3">
              Single color
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setColorTheme('default')}
                className={`flex flex-col items-center p-3 border-2 rounded-lg transition ${
                  colorTheme === 'default'
                    ? 'border-gray-800 bg-gray-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="w-12 h-12 rounded-full mb-2 bg-(--color-preto)" />
                <span className="text-xs font-medium text-(--color-preto) dark:text-(--color-preto)">
                  Default
                </span>
              </button>
              {colorThemes.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setColorTheme(color.value)}
                  className={`flex flex-col items-center p-3 border-2 rounded-lg transition ${
                    colorTheme === color.value
                      ? 'border-gray-800 bg-gray-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full mb-2"
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="text-xs font-medium text-(--color-preto) dark:text-(--color-preto)">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Section */}
          <div className="mb-8">
            <h3 className="text-base font-semibold text-(--color-preto) dark:text-(--color-preto) mb-2">
              Font
            </h3>
            <div className="relative">
              <select
                value={fontTheme}
                onChange={(e) => setFontTheme(e.target.value as FontTheme)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-200 rounded-lg bg-white dark:bg-gray-200 text-(--color-preto) dark:text-white focus:outline-none focus:border-(--color-preto)  appearance-none cursor-pointer"
              >
                {fonts.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSettingsDrawer;

