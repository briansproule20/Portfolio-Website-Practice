'use client';

import Image from 'next/image';

export default function Wanted() {
  const tickerText = "• WANTED: DEAD OR ALIVE • REWARD: 10,000 QUID • LAST SEEN: GOONING IN THE CHICAGO AREA • APPROACH WITH COFFEE AND RISOTTO • ";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <section className="bg-[var(--card)] py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Title and Subtitle */}
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-black mb-4 text-[var(--foreground)] uppercase tracking-wider">
              Wanted
            </h2>
            <p className="text-xl text-[var(--accent)] italic">
              For crimes against human decency.
            </p>
          </div>

          {/* Scrolling Ticker */}
          <div className="bg-[var(--background)] border-y-2 border-[var(--accent)] py-3 overflow-hidden whitespace-nowrap">
            <div className="animate-ticker inline-block">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="mx-4">{tickerText}</span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-[var(--accent)]">
            <Image
              src="/wanted.jpeg"
              alt="Wanted"
              fill
              className="object-cover object-[center_65%]"
              priority
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-[var(--accent)] text-sm mt-auto">
        &copy; {new Date().getFullYear()} Brian Sproule. All rights reserved.
      </footer>
    </div>
  );
} 