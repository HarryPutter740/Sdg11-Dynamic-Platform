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
  title: "SDG 09 - Industry, Innovation and Infrastructure",
  description: "Building resilient infrastructure, promoting inclusive and sustainable industrialization and fostering innovation. Explore stories, data, and insights on industrial development and technological advancement.",
  keywords: ["SDG 09", "industry", "innovation", "infrastructure", "sustainable industrialization", "UN goals", "technology development", "research and development"],
  authors: [{ name: "SDG 09 Team" }],
  openGraph: {
    title: "SDG 09 - Industry, Innovation and Infrastructure",
    description: "Building resilient infrastructure, promoting inclusive and sustainable industrialization and fostering innovation",
    type: "website",
    url: "https://sdg09innovation.org",
    siteName: "SDG 09",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SDG 09 - Industry, Innovation and Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SDG 09 - Industry, Innovation and Infrastructure",
    description: "Building resilient infrastructure, promoting inclusive and sustainable industrialization and fostering innovation",
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