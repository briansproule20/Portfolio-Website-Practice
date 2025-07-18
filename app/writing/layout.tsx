import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Writing | Brian Sproule",
  description: "Creative writing portfolio featuring short stories, essays, and literary works. Explore original fiction, creative nonfiction, and experimental writing projects.",
  keywords: ["writing", "creative writing", "short stories", "essays", "fiction", "literature"],
  authors: [{ name: "Brian Sproule" }],
  openGraph: {
    title: "Writing | Brian Sproule",
    description: "Creative writing portfolio featuring short stories, essays, and literary works. Explore original fiction, creative nonfiction, and experimental writing projects.",
    url: "https://briansproule.com/writing",
    siteName: "Brian Sproule Portfolio",
    images: [
      {
        url: "https://briansproule.com/writing/dusk.png",
        width: 1200,
        height: 630,
        alt: "Creative Writing Portfolio - Stories and Essays",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Brian Sproule",
    description: "Creative writing portfolio featuring short stories, essays, and literary works.",
    images: ["https://briansproule.com/writing/dusk.png"],
  },
  alternates: {
    canonical: "https://briansproule.com/writing",
  },
};

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 