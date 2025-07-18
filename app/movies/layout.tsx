import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Movies | Brian Sproule",
  description: "Film collection and movie recommendations. Explore my favorite films, movie reviews, and cinematic experiences across different genres and eras.",
  keywords: ["movies", "films", "cinema", "movie reviews", "favorite films", "film collection"],
  authors: [{ name: "Brian Sproule" }],
  openGraph: {
    title: "Movies | Brian Sproule",
    description: "Film collection and movie recommendations. Explore my favorite films, movie reviews, and cinematic experiences across different genres and eras.",
    url: "https://briansproule.com/movies",
    siteName: "Brian Sproule Portfolio",
    images: [
      {
        url: "/images/zombies-blackops.jpg",
        width: 1200,
        height: 630,
        alt: "Film Collection - Movie Recommendations",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movies | Brian Sproule",
    description: "Film collection and movie recommendations. Explore my favorite films and cinematic experiences.",
    images: ["/images/zombies-blackops.jpg"],
  },
  alternates: {
    canonical: "https://briansproule.com/movies",
  },
};

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 