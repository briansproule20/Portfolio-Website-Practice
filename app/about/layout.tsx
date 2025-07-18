import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About | Brian Sproule",
  description: "Learn about Brian Sproule - digital publisher, web developer, and creative technologist. Discover my background in digital publishing, narrative theory, and interactive web development.",
  keywords: ["about", "digital publishing", "web development", "creative technology", "portfolio", "background"],
  authors: [{ name: "Brian Sproule" }],
  openGraph: {
    title: "About | Brian Sproule",
    description: "Learn about Brian Sproule - digital publisher, web developer, and creative technologist. Discover my background in digital publishing, narrative theory, and interactive web development.",
    url: "https://briansproule.com/about",
    siteName: "Brian Sproule Portfolio",
    images: [
      {
        url: "/fish.png",
        width: 1200,
        height: 630,
        alt: "About Brian Sproule - Digital Publisher & Developer",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Brian Sproule",
    description: "Learn about Brian Sproule - digital publisher, web developer, and creative technologist.",
    images: ["/fish.png"],
  },
  alternates: {
    canonical: "https://briansproule.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 