import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Brian Sproule | Writer, Publisher, Designer",
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
};

export default function TunesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 