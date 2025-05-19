import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="w-full py-8 px-4 flex justify-start items-center max-w-5xl mx-auto">
        <nav className="space-x-6 text-lg">
          <a href="#about" className="hover:text-[var(--accent)] transition">About</a>
          <a href="/projects" className="hover:text-[var(--accent)] transition">Projects</a>
          <a href="#contact" className="hover:text-[var(--accent)] transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 bg-[var(--card)] rounded-xl shadow-md mx-2 mt-4 mb-8">
        <Image src="/elderscroll.png" alt="Profile" width={240} height={240} className="rounded-full mb-4 object-cover" />
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Hi, I'm Brian</h1>
        <p className="text-xl max-w-2xl mb-6 text-[var(--accent)]">A traditional and digitial publisher with a love for clean design and earthy aesthetics.</p>
        <a href="/projects" className="inline-block mt-2 px-6 py-3 bg-[var(--highlight)] text-[var(--foreground)] rounded-full font-semibold shadow hover:bg-[var(--accent)] transition">View My Work</a>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4 text-[var(--highlight)]">About Me</h2>
        <p className="text-lg mb-2">I'm a publisher with a passion for crafting lasting stories and accessible narratives in unique voices. I enjoy working with modern technologies and creating experiences that pay homage to many timeless and classic designs.</p>
        <p className="text-lg">When I'm not reading or writing, you can find me exploring South Florida's waterways, playing the latest RPG, experimenting with new recipes in the kitchen, or taking care of my many houseplants.</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-[var(--highlight)]">Contact</h2>
        <p className="text-lg mb-8 text-[var(--foreground)]">Interested in working together or just want to say hi? Reach out below!</p>
        <form className="flex flex-col gap-6 bg-[var(--card)] p-8 rounded-xl shadow-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[var(--foreground)] font-medium">Your Name</label>
            <input 
              type="text" 
              id="name"
              placeholder="Jane Doe" 
              className="p-4 rounded-lg border-2 border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--accent)] focus:border-[var(--highlight)] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[var(--foreground)] font-medium">Your Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="jane@example.com" 
              className="p-4 rounded-lg border-2 border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--accent)] focus:border-[var(--highlight)] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[var(--foreground)] font-medium">Your Message</label>
            <textarea 
              id="message"
              placeholder="Hello! I'd like to discuss..." 
              className="p-4 rounded-lg border-2 border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--accent)] focus:border-[var(--highlight)] focus:outline-none transition-colors min-h-[150px] resize-y"
            />
          </div>
          <button 
            type="submit" 
            className="self-start px-8 py-3 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-semibold shadow hover:bg-[var(--accent)] transition-colors text-lg"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-[var(--accent)] text-sm mt-auto">
        &copy; {new Date().getFullYear()} Brian Sproule. All rights reserved.
      </footer>
    </div>
  );
}
