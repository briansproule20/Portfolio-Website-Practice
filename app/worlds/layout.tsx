import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Worldbuilding | Brian Sproule",
  description: "Interactive worldbuilding toolkit featuring planetary systems, elemental magic, and creative universe design. Explore the art of creating immersive fictional worlds and settings.",
  keywords: ["worldbuilding", "creative writing", "fantasy worlds", "planetary systems", "magic systems", "fictional universes"],
  authors: [{ name: "Brian Sproule" }],
  openGraph: {
    title: "Worldbuilding | Brian Sproule",
    description: "Interactive worldbuilding toolkit featuring planetary systems, elemental magic, and creative universe design. Explore the art of creating immersive fictional worlds and settings.",
    url: "https://briansproule.com/worlds",
    siteName: "Brian Sproule Portfolio",
    images: [
      {
        url: "/elderscroll.png",
        width: 1200,
        height: 630,
        alt: "Worldbuilding - Creative Universe Design",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worldbuilding | Brian Sproule",
    description: "Interactive worldbuilding toolkit featuring planetary systems, elemental magic, and creative universe design.",
    images: ["/elderscroll.png"],
  },
  alternates: {
    canonical: "https://briansproule.com/worlds",
  },
};

export default function WorldsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 