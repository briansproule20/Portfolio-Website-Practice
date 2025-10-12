import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/Header";
import ClientLayout from "./ClientLayout";
import GetColorfulButton from "./components/GetColorfulButton";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.briansproule.com'),
  title: {
    default: "Brian Sproule | Writer, Publisher, Designer",
    template: "%s | Brian Sproule"
  },
  description: "Digital publisher, web developer, and creative technologist. Explore my portfolio of digital publishing projects, narrative theory research, and interactive web experiences.",
  keywords: ["digital publishing", "web development", "narrative theory", "creative technology", "portfolio", "writer", "designer"],
  authors: [{ name: "Brian Sproule" }],
  creator: "Brian Sproule",
  publisher: "Brian Sproule",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/IWB-favicon.png', sizes: 'any' },
      { url: '/IWB-favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/IWB-favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/IWB-favicon.png',
    shortcut: '/IWB-favicon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.briansproule.com",
    siteName: "Brian Sproule Portfolio",
    title: "Brian Sproule | Writer, Publisher, Designer",
    description: "Digital publisher, web developer, and creative technologist. Explore my portfolio of digital publishing projects, narrative theory research, and interactive web experiences.",
    images: [
      {
        url: "https://www.briansproule.com/fish.png",
        width: 1200,
        height: 630,
        alt: "Brian Sproule - Digital Publisher & Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@briansproule",
    creator: "@briansproule",
    title: "Brian Sproule | Writer, Publisher, Designer",
    description: "Digital publisher, web developer, and creative technologist. Explore my portfolio of digital publishing projects, narrative theory research, and interactive web experiences.",
    images: ["https://www.briansproule.com/fish.png"],
  },
  alternates: {
    canonical: "https://www.briansproule.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
          <GetColorfulButton />
        </Providers>
      </body>
    </html>
  );
}
