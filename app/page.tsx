import Image from "next/image";

async function getRecentBooks() {
  try {
    // Use relative URL for internal API route (works in Next.js server components on Vercel)
    console.log('FETCHING: /api/reading');
    const res = await fetch('/api/reading', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch books');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return { 
      books: [
        {
          title: "The Midnight Library",
          author: "Matt Haig",
          description: "A fascinating exploration of life's infinite possibilities and the choices that shape our existence."
        },
        {
          title: "Project Hail Mary",
          author: "Andy Weir",
          description: "An interstellar adventure that combines scientific accuracy with heartwarming friendship."
        },
        {
          title: "Klara and the Sun",
          author: "Kazuo Ishiguro",
          description: "A beautiful meditation on artificial intelligence, love, and what it means to be human."
        }
      ]
    };
  }
}

export default async function Home() {
  const { books } = await getRecentBooks();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 bg-[var(--card)] rounded-xl shadow-md mx-2 mt-4 mb-8">
        <Image src="/elderscroll.png" alt="Profile" width={240} height={240} className="rounded-full mb-4 object-cover" />
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Hello There</h1>
        <p className="text-xl max-w-2xl mb-6 text-[var(--accent)]">My name is Brian, I'm a traditional and digitial publisher with a love for natural designs and earthy aesthetics. Welcome to my corner of the internet. Grab a mug of tea, a snack, get comfy, and stay a while.</p>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-[var(--card)] rounded-2xl p-8 shadow-lg border border-[var(--accent)]">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-center gap-2">
                  <span className="w-8 h-1 bg-[var(--highlight)] rounded-full"></span>
                  Who Am I?
                </h3>
                <p className="text-lg text-[var(--foreground)] leading-relaxed">
                  I'm a publisher and former high school English teacher with a passion for sharing lasting narratives in unique, underrepresented voices and accessible forms. I enjoy working with modern technologies and creating experiences that pay homage to timeless designs and classic storytelling.
                </p>
                <p className="text-lg text-[var(--foreground)] leading-relaxed">
                  My approach combines traditional publishing wisdom with innovative digital solutions, striving to make content more engaging and accessible to diverse audiences.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-center gap-2">
                  <span className="w-8 h-1 bg-[var(--highlight)] rounded-full"></span>
                  When I'm Not Reading or Writing...
                </h3>
                <p className="text-lg text-[var(--foreground)]">
                 You may be able to find me:
                </p>
                <ul className="space-y-3">
                  {[
                    'Exploring South Florida\'s waterways',
                    'Playing the latest Sci-Fi/Fantasy RPG',
                    'Strugging through a run',
                    'Trying new recipes in the kitchen',
                    'Caring for and talking to my houseplants',
                    'Sketching and drawing (not very well)',
                    'Outdoors, in the sun, drink in hand',
                  ].map((activity, index) => (
                    <li key={index} className="flex items-center gap-3 text-lg text-[var(--foreground)]">
                      <span className="w-2 h-2 bg-[var(--highlight)] rounded-full"></span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 p-6 bg-[var(--background)] rounded-xl border border-[var(--accent)]">
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-[var(--highlight)] rounded-full"></span>
              My Philosophy
            </h3>
            <p className="text-lg text-[var(--foreground)] italic leading-relaxed">
              Every story deserves to be told in a way that resonates with its audience. My mission is to bridge the gap between traditional storytelling and modern short form media.
            </p>
          </div>
        </div>
      </section>

      {/* Reading Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)] text-center">What I've Been Reading</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book: { title: string; author: string; description: string }) => (
            <div key={book.title} className="rounded-xl shadow-lg p-6 bg-[var(--card)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
              <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{book.title}</h3>
              <p className="text-[var(--accent)] mb-2">{book.author}</p>
              <p className="mb-4 text-[var(--foreground)]">{book.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a 
            href="/reads" 
            className="inline-block px-6 py-3 bg-[var(--highlight)] text-[var(--foreground)] rounded-full font-semibold shadow hover:bg-[var(--accent)] transition"
          >
            See All
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-[var(--highlight)]">Contact</h2>
        <p className="text-lg mb-8 text-[var(--foreground)]">Interested in working together? Reach out below!</p>
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
