"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface CheckoutContextValue {
  email: string;
  setEmail: (email: string) => void;
  clearCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "shophub-checkout-email";

export const CheckoutProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [email, setEmailState] = useState<string>("");

  // Hydrate email from persisted storage after mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedEmail = window.localStorage.getItem(STORAGE_KEY);
    if (storedEmail) {
      setEmailState(storedEmail);
    }
  }, []);

  const setEmail = useCallback((newEmail: string) => {
    setEmailState(newEmail);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, newEmail);
    }
  }, []);

  const clearCheckout = useCallback(() => {
    setEmailState("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo<CheckoutContextValue>(
    () => ({
      email,
      setEmail,
      clearCheckout,
    }),
    [email, setEmail, clearCheckout]
  );

  return (
    <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextValue => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};

