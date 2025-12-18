import api from "axios";
import { getCookie, deleteCookie } from "./helper";
import { decryptToken } from "./encryption";

export type ErrorResponse = {
  message?: string;
  data: {
    message: string;
  };
};

/**
 * Centralized API client with interceptors
 * Handles authentication, language, and error responses
 */
// Get base URL from environment variable
const getBaseURL = (): string => {
  // Use the same fallback as the original implementation
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.8:6060";
  
  // Remove trailing slash if present
  const baseUrl = envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
  return `${baseUrl}/api/v1`;
};

export const apiClient = api.create({
  baseURL: getBaseURL(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

/**
 * Request interceptor - adds auth token and language header
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token: string | null = getCookie("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${decryptToken(token)}`;
    }

    // Add language header
    let lang = "en";
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("shophub-language");
      lang = storedLang || "en";
    }
    config.headers.lang = lang;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - handles 401 errors and redirects to login
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear authentication data
      deleteCookie("auth_token");
      deleteCookie("userRole");
      deleteCookie("proxy_token");
      
      // Clear localStorage if needed
      if (typeof window !== "undefined") {
        // Keep language preference, clear other auth-related data
        const language = localStorage.getItem("shophub-language");
        localStorage.clear();
        if (language) {
          localStorage.setItem("shophub-language", language);
        }
      }

      // Redirect to home page
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

