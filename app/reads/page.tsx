export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import ReadsTable from './ReadsTable';

type Book = {
  title: string;
  author: string;
  pages?: string;
  year?: string;
  rating?: string;
};

async function getAllBooks() {
  console.log('Starting getAllBooks function...');
  try {
    // Use absolute URL for server-side fetches
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fetchUrl = `${baseUrl}/api/reading?all=true`;
    console.log('Attempting to fetch from:', fetchUrl);
    
    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Fetch response status:', res.status);
    if (!res.ok) {
      console.error('Fetch failed with status:', res.status);
      throw new Error(`Failed to fetch books: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Successfully fetched data:', data);
    return data.books;
  } catch (error) {
    console.error('Error in getAllBooks:', error);
    // Return fallback data instead of empty array
    return [
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        rating: "4.5/5",
        year: "2020",
        pages: "304"
      },
      {
        title: "Project Hail Mary",
        author: "Andy Weir",
        rating: "5/5",
        year: "2021",
        pages: "496"
      },
      {
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        rating: "4/5",
        year: "2021",
        pages: "320"
      }
    ];
  }
}

export default async function ReadsPage() {
  console.log('Starting ReadsPage render...');
  try {
    const books = await getAllBooks();
    console.log('Got books:', books);
    
    // Only filter if we have actual books data
    const cleanedBooks = books.length > 0 
      ? books
          .filter((book: Book) => book.title && book.author) // Ensure basic data exists
          .filter((book: Book) => {
            if (!book.rating) return true; // Include books without ratings
            const ratingMatch = book.rating.match(/^(\d+(?:\.\d+)?)\/5$/);
            return ratingMatch !== null;
          })
      : books; // If no books, just return the fallback data

    console.log('Cleaned books:', cleanedBooks);

    return (
      <div className="min-h-screen bg-[var(--background)]">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[var(--card)] opacity-50"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-6xl font-black mb-6 text-[var(--foreground)]">Reading List</h1>
            <p className="text-xl text-[var(--accent)] font-serif italic">
              Some things I've read...
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
          <div className="bg-[var(--card)] rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-[var(--highlight)]">{cleanedBooks.length}</p>
              <p className="text-[var(--accent)] mt-2">Books Read</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[var(--highlight)]">
                {cleanedBooks.reduce((acc: number, book: Book) => acc + (book.rating ? parseFloat(book.rating.split('/')[0]) : 0) / cleanedBooks.length, 0).toFixed(1)}
              </p>
              <p className="text-[var(--accent)] mt-2">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[var(--highlight)]">
                {cleanedBooks.reduce((acc: number, book: Book) => acc + (book.pages ? parseInt(book.pages) : 0), 0).toLocaleString()}
              </p>
              <p className="text-[var(--accent)] mt-2">Pages Read</p>
            </div>
          </div>
        </section>

        {/* Books Table Section */}
        <section className="max-w-6xl mx-auto bg-[var(--card)] py-12 px-4 mt-16 rounded-xl shadow-lg">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[var(--foreground)] text-center">Book Collection</h2>
            <p className="text-[var(--accent)] text-center mt-2">
              Books do not appear in order read here. See spreadsheet for more detailed breakdown.
            </p>
          </div>
          <ReadsTable books={cleanedBooks} />
        </section>

        {/* Quote Section */}
        <section className="max-w-4xl mx-auto px-4 py-24 text-center">
          <blockquote className="text-2xl font-serif italic text-[var(--foreground)]">
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
          </blockquote>
          <p className="text-[var(--accent)] mt-4">― George R.R. Martin</p>
        </section>

        {/* Spreadsheet Link Section */}
        <section className="max-w-4xl mx-auto px-4 pb-24 text-center">
          <a 
            href="https://docs.google.com/spreadsheets/d/1c6zdCUsDR_oMYe1ZJBxDujmSjtYXUMRKROyUkr72z0Q/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--highlight)] text-[var(--background)] px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
          >
            View Complete Reading Log
          </a>
          <p className="text-[var(--accent)] mt-4 text-sm">
            Click to see my detailed reading log spreadsheet with more information and statistics
          </p>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error in ReadsPage:', error);
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="bg-[var(--card)] p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Something went wrong</h2>
          <p className="text-[var(--foreground)]">We're having trouble loading the reading list. Please try again later.</p>
        </div>
      </div>
    );
  }
} 