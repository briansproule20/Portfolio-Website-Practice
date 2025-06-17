import Image from "next/image";
import SwimmingFish from './components/SwimmingFish';
import ParallaxRing from './components/ParallaxRing';
import Link from 'next/link';
import { getFeaturedPhotos, type Photo } from '../utils/photos';

async function getRecentBooks() {
  try {
    // Use absolute URL for server-side fetches
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fetchUrl = `${baseUrl}/api/reading`;
    console.log('FETCHING:', fetchUrl);
    const res = await fetch(fetchUrl, { cache: 'no-store' });
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
  const featuredPhotos = getFeaturedPhotos();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <SwimmingFish />
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-4 py-12 bg-[var(--card)] rounded-xl shadow-md mx-2 mt-4 mb-8">
        <div className="flex-1">
          <Image src="/elderscroll.png" alt="Profile" width={240} height={240} className="rounded-full mb-2 object-cover" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Hello there.</h1>
          <p className="text-xl max-w-2xl mb-6 text-[var(--foreground)]">My name is Brian, I'm a digitial and traditional publisher with a love for natural designs and earthy aesthetics. Welcome to my corner of the internet. Grab a cup of tea, a snack, get comfy, and stay a while. Please mind the fish.</p>
        </div>
        <ParallaxRing />
      </section>

      {/* Featured Photos Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)] text-center">Featured Photos</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPhotos.map((photo: Photo) => (
            <Link 
              href="/photos" 
              key={photo.id} 
              className={`rounded-xl shadow-lg p-4 bg-[var(--card)] hover:border-[var(--highlight)] transition-colors ${
                photo.width > photo.height ? 'sm:col-span-2' : ''
              }`}
            >
              <div 
                className="relative w-full mb-4 group"
                style={{
                  aspectRatio: photo.width > photo.height ? '6/4' : '3/4',
                }}
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className={`object-cover rounded-lg ${
                    photo.title === "Grandma Rosie" ? "object-[35%_center]" : ""
                  } ${
                    photo.width > photo.height ? "object-[center_35%]" : ""
                  }`}
                  sizes={photo.width > photo.height 
                    ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  }
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white/90 text-sm">{photo.description}</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{photo.title}</h3>
              <p className="text-[var(--accent)] mb-2">{photo.category}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            href="/photos" 
            className="inline-block px-6 py-3 bg-[var(--highlight)] text-[var(--foreground)] rounded-full font-semibold shadow hover:bg-[var(--accent)] transition"
          >
            View Gallery
          </Link>
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
        <div className="flex flex-col items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Brian Sproule. All rights reserved.</p>
          <Link 
            href="/wanted" 
            className="group relative px-6 py-2 bg-[var(--card)] border-2 border-[var(--accent)] rounded-full text-base font-medium text-[var(--foreground)] hover:text-[var(--highlight)] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[var(--highlight)]"
          >
            <span className="relative z-10">Press for Meme</span>
            <div className="absolute inset-0 bg-[var(--highlight)] opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
