export const dynamic = 'force-dynamic';

import ReadsTable from './ReadsTable';

type Book = {
  title: string;
  author: string;
  pages?: string;
  year?: string;
  rating?: string;
};

async function getAllBooks() {
  try {
    // Use absolute URL for server-side fetches
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fetchUrl = `${baseUrl}/api/reading?all=true`;
    console.log('FETCHING:', fetchUrl);
    const res = await fetch(fetchUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch books');
    const data = await res.json();
    return data.books;
  } catch (error) {
    console.error('Error fetching all books:', error);
    return [];
  }
}

export default async function ReadsPage() {
  const books = (await getAllBooks()) || [];
  const cleanedBooks = books
    .slice(0, -1) // Remove the last row
    .filter((book: Book) => {
      // Check if rating exists and contains a number before the "/"
      const ratingMatch = book.rating?.match(/^(\d+(?:\.\d+)?)\/5$/);
      return ratingMatch !== null;
    });

  return <ReadsTable books={cleanedBooks} />;
} 