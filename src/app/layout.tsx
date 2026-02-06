import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato, Inter, Roboto } from "next/font/google";
import "./globals.css";
import favicon from "@/assets/Farfetch--Streamline-Simple-Icons.png";
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
import { LogoProvider } from "@/context/LogoContext";
import { ModalOpenProvider } from "@/context/ModalOpenContext";
import { ReactQueryProvider } from "@/lib/react-query-provider";

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
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} ${inter.variable} ${roboto.variable} antialiased`}
      >
        <ReactQueryProvider>
          <LanguageProvider>
            <LogoProvider>
              <CartProvider>
                <WishlistProvider>
                  <CheckoutProvider>
                    <ThemeProvider
                      attribute="class"
                      defaultTheme="system"
                      enableSystem
                    >
                      <ModalOpenProvider>
                        <ThemeSettingsProvider>
                          <ConditionalHeader />
                          <main className="min-h-screen overflow-x-hidden">{children}</main>
                          <ConditionalFooter />
                        </ThemeSettingsProvider>
                      </ModalOpenProvider>
                    </ThemeProvider>
                  </CheckoutProvider>
                </WishlistProvider>
              </CartProvider>
            </LogoProvider>
          </LanguageProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
