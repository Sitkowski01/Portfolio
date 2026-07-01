import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/i18n";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-jetbrains-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikolaj-sitek.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mikołaj Sitek — Web & Mobile Developer",
  description:
    "Data-driven web & mobile developer. Buduję aplikacje webowe i mobilne z myśleniem analitycznym — React Native, dane i integracje AI.",
  keywords: [
    "Mikołaj Sitek",
    "web developer",
    "mobile developer",
    "React Native",
    "Next.js",
    "TypeScript",
    "portfolio",
    "frontend",
  ],
  authors: [{ name: "Mikołaj Sitek" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Mikołaj Sitek — MSX Terminal",
    title: "Mikołaj Sitek — Web & Mobile Developer",
    description:
      "Buduję aplikacje webowe i mobilne z myśleniem analitycznym. React Native, dane, integracje AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mikołaj Sitek — Web & Mobile Developer",
    description:
      "Buduję aplikacje webowe i mobilne z myśleniem analitycznym. React Native, dane, integracje AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-terminal-bg text-terminal-text font-sans antialiased relative overflow-x-hidden">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
