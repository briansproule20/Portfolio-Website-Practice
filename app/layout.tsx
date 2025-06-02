import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Brian Sproule | Writer, Publisher, Designer",
  description: "Portfolio showcasing digital publishing projects and web development work",
  icons: {
    icon: '/fish-favicon.png',
    apple: '/fish-favicon.png',
  },
  openGraph: {
    title: "Brian Sproule | Writer, Publisher, Designer",
    description: "Portfolio showcasing digital publishing projects and web development work",
    images: [
      {
        url: "/elderscroll.png",
        width: 1200,
        height: 630,
        alt: "Brian Sproule Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Sproule | Publisher & Developer",
    description: "Portfolio showcasing digital publishing projects and web development work",
    images: ["/elderscroll.png"],
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
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
