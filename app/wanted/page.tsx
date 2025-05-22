'use client';

import Image from 'next/image';

export default function Wanted() {
  const tickerText = "• WANTED: ALIVE • REWARD: 10,000 QUID • LAST SEEN: 1996 IUKA, COLUMBUS, OHIO • APPROACH WITH CANNED BEER • USE SLEEPER AGENT ACTIVATION PHRASE: THE WIZARD HAS SENT ME WITH CANS OF BEER •";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] relative">
      {/* Left Vertical Ticker */}
      <div className="fixed left-0 top-0 bottom-0 w-12 bg-[var(--background)] border-r-2 border-[var(--accent)] overflow-hidden whitespace-nowrap z-10">
        <div className="animate-ticker-vertical inline-block writing-mode-vertical">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-4 block writing-mode-vertical transform rotate-180">{tickerText}</span>
          ))}
        </div>
      </div>

      {/* Right Vertical Ticker */}
      <div className="fixed right-0 top-0 bottom-0 w-12 bg-[var(--background)] border-l-2 border-[var(--accent)] overflow-hidden whitespace-nowrap z-10">
        <div className="animate-ticker-vertical inline-block writing-mode-vertical">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-4 block writing-mode-vertical transform rotate-180">{tickerText}</span>
          ))}
        </div>
      </div>

      {/* Main Content with padding for side tickers */}
      <div className="px-12">
        <section className="bg-[var(--card)] py-12 px-4 mt-16">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Title and Subtitle */}
            <div className="text-center space-y-4">
              <h2 className="text-6xl font-black mb-4 text-[var(--foreground)] uppercase tracking-wider">
                Wanted
              </h2>
              <p className="text-xl text-[var(--accent)] italic">
                For questioning regarding a missing case of canned beer.
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

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Image 1 */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-[var(--accent)]">
                <Image
                  src="/wanted.jpeg"
                  alt="Wanted"
                  fill
                  className="object-cover object-[center_65%]"
                  priority
                />
              </div>

              {/* Image 2 */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-[var(--accent)]">
                <Image
                  src="/wanted2.jpeg"
                  alt="Wanted"
                  fill
                  className="object-cover object-[center_75%]"
                />
              </div>

              {/* Image 3 */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-[var(--accent)]">
                <Image
                  src="/wanted3.jpeg"
                  alt="Wanted"
                  fill
                  className="object-cover object-[center_85%]"
                />
              </div>

              {/* Image 4 */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-[var(--accent)]">
                <Image
                  src="/wanted4.jpeg"
                  alt="Wanted"
                  fill
                  className="object-cover object-[center_85%]"
                />
              </div>

              {/* Image 5 */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-[var(--accent)]">
                <Image
                  src="/wanted5.jpeg"
                  alt="Wanted"
                  fill
                  className="object-cover object-[center_65%]"
                />
              </div>

              {/* Image 6 */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-[var(--accent)]">
                <Image
                  src="/wanted6.jpeg"
                  alt="Wanted"
                  fill
                  className="object-cover object-[center_65%]"
                />
              </div>
            </div>

            {/* Bottom Ticker */}
            <div className="bg-[var(--background)] border-y-2 border-[var(--accent)] py-3 overflow-hidden whitespace-nowrap mt-8">
              <div className="animate-ticker inline-block">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="mx-4">{tickerText}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-[var(--accent)] text-sm mt-auto">
          &copy; {new Date().getFullYear()} Brian Sproule. All rights reserved.
        </footer>
      </div>
    </div>
  );
} 