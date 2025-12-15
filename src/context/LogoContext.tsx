"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { footerLogoffImage } from "@/assets";
import { headerConfig } from "@/constants";

// Helper to get image URL from static import or string
type ImageSource = 
  | string 
  | { src?: string; default?: string } 
  | { default: string };

const getImageUrl = (image: ImageSource | unknown): string => {
  if (typeof image === "string") return image;
  if (image && typeof image === "object") {
    const imgObj = image as { src?: string; default?: string };
    if (imgObj.src) return imgObj.src;
    if (imgObj.default) return imgObj.default;
  }
  return String(image);
};

// Logo configuration interface
export interface LogoConfig {
  // Header logo - can be text or image URL
  header: {
    type: "text" | "image";
    text?: string;
    imageUrl?: string;
    alt?: string;
    href?: string;
  };
  // Footer logo - image URL
  footer: {
    imageUrl: string;
    alt?: string;
  };
  // Email logo - image URL
  email: {
    imageUrl: string;
    alt?: string;
  };
}

// Default/fallback logo configuration (current static values)
const defaultLogoConfig: LogoConfig = {
  header: {
    type: "text",
    text: "FARFETCH",
    href: headerConfig.logo.href || "/",
  },
  footer: {
    imageUrl: getImageUrl(footerLogoffImage),
    alt: "Farfetch Logo",
  },
  email: {
    imageUrl: "https://1000logos.net/wp-content/uploads/2022/08/Farfetch-Logo-2015.png",
    alt: "Farfetch Logo",
  },
};

interface LogoContextValue {
  logoConfig: LogoConfig;
  isLoading: boolean;
  error: string | null;
  refreshLogo: () => Promise<void>;
}

const LogoContext = createContext<LogoContextValue | undefined>(undefined);

const STORAGE_KEY = "shophub-logo-config";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const LogoProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(defaultLogoConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch logo from API
  const fetchLogoFromAPI = async (): Promise<LogoConfig | null> => {
    try {
      // TODO: When backend is ready, uncomment and configure the API endpoint below
      // 
      // Example API integration:
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      // const response = await fetch(`${apiUrl}/api/logo`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to fetch logo');
      // }
      // 
      // const data = await response.json();
      // 
      // // Transform API response to LogoConfig format
      // // Expected API response structure:
      // // {
      // //   header: { type: "text" | "image", text?: string, imageUrl?: string, alt?: string, href?: string },
      // //   footer: { imageUrl: string, alt?: string },
      // //   email: { imageUrl: string, alt?: string }
      // // }
      // return data as LogoConfig;

      // For now, return null to use default/fallback
      return null;
    } catch (err) {
      console.error("Error fetching logo from API:", err);
      return null;
    }
  };

  // Load logo configuration
  const loadLogoConfig = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check cache first
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          try {
            const { config, timestamp } = JSON.parse(cached);
            const now = Date.now();
            // Use cached data if it's still valid
            if (now - timestamp < CACHE_DURATION) {
              setLogoConfig(config);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            // Invalid cache, continue to fetch
          }
        }
      }

      // Try to fetch from API
      const apiConfig = await fetchLogoFromAPI();

      if (apiConfig) {
        // Use API config
        setLogoConfig(apiConfig);
        // Cache it
        if (typeof window !== "undefined") {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              config: apiConfig,
              timestamp: Date.now(),
            }),
          );
        }
      } else {
        // Use default/fallback config
        setLogoConfig(defaultLogoConfig);
      }
    } catch (err) {
      console.error("Error loading logo config:", err);
      setError("Failed to load logo configuration");
      // Fallback to default
      setLogoConfig(defaultLogoConfig);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh logo (force fetch from API)
  const refreshLogo = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    await loadLogoConfig();
  };

  // Load logo on mount
  useEffect(() => {
    loadLogoConfig();
  }, []);

  const value = useMemo<LogoContextValue>(
    () => ({
      logoConfig,
      isLoading,
      error,
      refreshLogo,
    }),
    [logoConfig, isLoading, error],
  );

  return (
    <LogoContext.Provider value={value}>{children}</LogoContext.Provider>
  );
};

export const useLogo = (): LogoContextValue => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error("useLogo must be used within a LogoProvider");
  }
  return context;
};

