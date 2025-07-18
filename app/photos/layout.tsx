import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Photos | Brian Sproule",
  description: "Photography portfolio showcasing travel, nature, and life moments. Explore a collection of personal photographs capturing memories and experiences.",
  keywords: ["photography", "photos", "travel", "nature", "portfolio", "memories"],
  authors: [{ name: "Brian Sproule" }],
  openGraph: {
    title: "Photos | Brian Sproule",
    description: "Photography portfolio showcasing travel, nature, and life moments. Explore a collection of personal photographs capturing memories and experiences.",
    url: "https://briansproule.com/photos",
    siteName: "Brian Sproule Portfolio",
    images: [
      {
        url: "/photos/boatday.jpeg",
        width: 1200,
        height: 630,
        alt: "Photography Portfolio - Travel and Life Moments",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photos | Brian Sproule",
    description: "Photography portfolio showcasing travel, nature, and life moments.",
    images: ["/photos/boatday.jpeg"],
  },
  alternates: {
    canonical: "https://briansproule.com/photos",
  },
};

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 