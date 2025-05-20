import ReadsTable from './ReadsTable';

type Book = {
  title: string;
  author: string;
  pages?: string;
  year?: string;
  rating?: string;
};

async function getAllBooks() {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/reading?all=true`, { cache: 'no-store' });
  if (!res.ok) return { books: [] as Book[] };
  return res.json() as Promise<{ books: Book[] }>;
}

export default async function ReadsPage() {
  const { books } = await getAllBooks();
  const cleanedBooks = books
    .slice(0, -1) // Remove the last row
    .filter((book: Book) => {
      // Check if rating exists and contains a number before the "/"
      const ratingMatch = book.rating?.match(/^(\d+(?:\.\d+)?)\/5$/);
      return ratingMatch !== null;
    });

  return <ReadsTable books={cleanedBooks} />;
} 