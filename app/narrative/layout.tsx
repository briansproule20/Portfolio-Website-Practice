import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Narrative Theory | Brian Sproule",
  description: "Comprehensive guide to narrative theory featuring advanced concepts from Genette, Bakhtin, Booth, Barthes, Greimas, Todorov, and cognitive narratology. Explore literary analysis tools and frameworks.",
  keywords: ["narrative theory", "literary analysis", "genette", "bakhtin", "cognitive narratology", "literary criticism", "narratology"],
  authors: [{ name: "Brian Sproule" }],
  openGraph: {
    title: "Narrative Theory | Brian Sproule",
    description: "Comprehensive guide to narrative theory featuring advanced concepts from Genette, Bakhtin, Booth, Barthes, Greimas, Todorov, and cognitive narratology. Explore literary analysis tools and frameworks.",
    url: "https://briansproule.com/narrative",
    siteName: "Brian Sproule Portfolio",
    images: [
      {
        url: "/onering.png",
        width: 1200,
        height: 630,
        alt: "Narrative Theory - Literary Analysis Framework",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Narrative Theory | Brian Sproule",
    description: "Comprehensive guide to narrative theory featuring advanced concepts from Genette, Bakhtin, Booth, Barthes, Greimas, Todorov, and cognitive narratology.",
    images: ["/onering.png"],
  },
  alternates: {
    canonical: "https://briansproule.com/narrative",
  },
};

export default function NarrativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 