import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ["latin"],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "SDG 11 - Sustainable Cities and Communities",
  description: "Creating inclusive, safe, resilient and sustainable urban spaces for everyone. Explore stories, data, and insights on sustainable urban development.",
  keywords: ["SDG 11", "sustainable cities", "urban development", "sustainable communities", "UN goals", "urban planning"],
  authors: [{ name: "SDG 11 Team" }],
  openGraph: {
    title: "SDG 11 - Sustainable Cities and Communities",
    description: "Creating inclusive, safe, resilient and sustainable urban spaces for everyone",
    type: "website",
    url: "https://sdg11.org",
    siteName: "SDG 11",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SDG 11 - Sustainable Cities and Communities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SDG 11 - Sustainable Cities and Communities",
    description: "Creating inclusive, safe, resilient and sustainable urban spaces for everyone",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${montserrat.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            <ScrollProgress />
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}