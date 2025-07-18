import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tunes | Brian Sproule",
  description: "Music collection and Spotify integration. Discover my musical taste, current listening habits, and favorite tracks across different genres and artists.",
  keywords: ["music", "spotify", "tunes", "playlists", "favorite songs", "music taste"],
  authors: [{ name: "Brian Sproule" }],
  openGraph: {
    title: "Tunes | Brian Sproule",
    description: "Music collection and Spotify integration. Discover my musical taste, current listening habits, and favorite tracks across different genres and artists.",
    url: "https://briansproule.com/tunes",
    siteName: "Brian Sproule Portfolio",
    images: [
      {
        url: "/elderscroll.png",
        width: 1200,
        height: 630,
        alt: "Music Collection - Spotify Integration",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tunes | Brian Sproule",
    description: "Music collection and Spotify integration. Discover my musical taste and favorite tracks.",
    images: ["/elderscroll.png"],
  },
  alternates: {
    canonical: "https://briansproule.com/tunes",
  },
};

export default function TunesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 