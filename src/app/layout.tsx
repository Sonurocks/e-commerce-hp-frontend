import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato, Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import {
  ConditionalFooter,
  ConditionalHeader,
  ThemeSettingsProvider,
} from "@/components";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CheckoutProvider } from "@/context/CheckoutContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopHub - Your Online Store",
  description: "Quality products at affordable prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} ${inter.variable} ${roboto.variable} antialiased`}
      >
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              <CheckoutProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <ThemeSettingsProvider>
                    <ConditionalHeader />
                    <main className="min-h-screen">{children}</main>
                    <ConditionalFooter />
                  </ThemeSettingsProvider>
                </ThemeProvider>
              </CheckoutProvider>
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
