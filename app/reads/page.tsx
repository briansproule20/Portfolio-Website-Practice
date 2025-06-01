export const dynamic = 'force-dynamic';

import ReadsClient from './ReadsClient';

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

    return <ReadsClient books={cleanedBooks} />;
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