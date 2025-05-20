import Image from "next/image";

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Projects Section */}
      <section className="bg-[var(--card)] py-12 px-4 mt-16">
        <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)] text-center">What I've Been Working On:</h2>
        <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          {/* Project Card Example */}
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">The Atlantic Ocean</h3>
            <p className="mb-4 text-[var(--foreground)]">We depend on the natural world for the most foundational functions of life, as we have for all history... We can mistreat, pollute, and destroy our oceans at our own peril, but do not look to history and claim we weren’t warned.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Speculative Fiction Mini Games and World-Building</h3>
            <p className="mb-4 text-[var(--foreground)]">Gwent, Sabaac, Orlog, and how other mini games augment and enrich their respective universes.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">A Local's Guide to Native Species</h3>
            <p className="mb-4 text-[var(--foreground)]">A journey through the foothills of the Appalachian Mountains.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Ink and Pen and Paper and Transistors</h3>
            <p className="mb-4 text-[var(--foreground)]">A personal struggle with authenticity and accessibility in writing techonologies.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">The Elder Scrolls, Fallout, and Starfield</h3>
            <p className="mb-4 text-[var(--foreground)]">An obsession borne of the writings of the deity, Tod Howard.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Ted Chiang's The Story of Your Life</h3>
            <p className="mb-4 text-[var(--foreground)]">Is a loss of free will as terrifying as we all believe? The Heptapods certainly don't seem to think so.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">The Sproule Family History</h3>
            <p className="mb-4 text-[var(--foreground)]">A genealogy of the family on my father's side.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">The Wallace Family History</h3>
            <p className="mb-4 text-[var(--foreground)]">A genealogy of the family on my mother's side.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
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