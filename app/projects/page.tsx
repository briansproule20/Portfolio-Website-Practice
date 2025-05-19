import Image from "next/image";

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="w-full py-8 px-4 flex justify-between items-center max-w-5xl mx-auto">
        <a href="/" className="text-2xl font-bold tracking-tight">Brian Sproule</a>
        <nav className="space-x-6 text-lg">
          <a href="/#about" className="hover:text-[var(--accent)] transition">About</a>
          <a href="/projects" className="hover:text-[var(--accent)] transition">Projects</a>
          <a href="/#contact" className="hover:text-[var(--accent)] transition">Contact</a>
        </nav>
      </header>

      {/* Projects Section */}
      <section className="bg-[var(--card)] py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-[var(--highlight)] text-center">Projects</h2>
        <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          {/* Project Card Example */}
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">The Atlantic Ocean</h3>
            <p className="mb-4 text-[var(--foreground)]">A modern web app built with Next.js and Tailwind CSS, featuring a clean and responsive UI.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Project Two</h3>
            <p className="mb-4 text-[var(--foreground)]">A portfolio site template with an earthy color palette and elegant design elements.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Project Three</h3>
            <p className="mb-4 text-[var(--foreground)]">An interactive storytelling platform that combines traditional narrative with digital innovation.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Project Four</h3>
            <p className="mb-4 text-[var(--foreground)]">A digital publishing platform focused on showcasing emerging writers and their unique voices.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Project Five</h3>
            <p className="mb-4 text-[var(--foreground)]">A collaborative writing tool that helps authors and editors work together seamlessly.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Project Six</h3>
            <p className="mb-4 text-[var(--foreground)]">An e-reader application with advanced annotation and sharing capabilities.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Project Seven</h3>
            <p className="mb-4 text-[var(--foreground)]">A content management system designed specifically for independent publishers.</p>
            <a href="#" className="inline-block px-4 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors">View Details</a>
          </div>
          <div className="rounded-xl shadow-lg p-6 bg-[var(--background)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Project Eight</h3>
            <p className="mb-4 text-[var(--foreground)]">A digital archive platform for preserving and sharing literary works and manuscripts.</p>
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