'use client';

import { useState } from 'react';

type Book = {
  title: string;
  author: string;
  pages?: string;
  year?: string;
  rating?: string;
};

function sortBooks(books: Book[], sortBy: string) {
  if (!books || !Array.isArray(books)) {
    console.error('Invalid books data:', books);
    return [];
  }

  try {
    switch (sortBy) {
      case 'author':
        return [...books].sort((a, b) => (a.author || '').localeCompare(b.author || ''));
      case 'pages':
        return [...books].sort((a, b) => (parseInt(b.pages || '0') - parseInt(a.pages || '0')));
      case 'year':
        return [...books].sort((a, b) => (parseInt(b.year || '0') - parseInt(a.year || '0')));
      case 'rating':
      default:
        return [...books].sort((a, b) => {
          const aRating = parseFloat((a.rating || '').split('/')[0]) || 0;
          const bRating = parseFloat((b.rating || '').split('/')[0]) || 0;
          return bRating - aRating;
        });
    }
  } catch (error) {
    console.error('Error sorting books:', error);
    return books;
  }
}

export default function ReadsTable({ books }: { books: Book[] }) {
  const [sortBy, setSortBy] = useState('rating');
  const [error, setError] = useState<string | null>(null);

  if (!books || !Array.isArray(books)) {
    return (
      <div className="text-[var(--foreground)] text-center py-8">
        <p>No books data available.</p>
      </div>
    );
  }

  let sortedBooks: Book[] = [];
  try {
    sortedBooks = sortBooks(books, sortBy);
  } catch (err) {
    console.error('Error in ReadsTable:', err);
    setError('Error sorting books data');
  }

  if (error) {
    return (
      <div className="text-[var(--foreground)] text-center py-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-base italic text-[var(--foreground)] text-center mb-8">Asterisk indicates book was read before the creation of the spreadsheet and was grandfathered in.</p>
      <div className="mb-6 flex justify-end">
        <div className="flex items-center gap-4">
          <label htmlFor="sort" className="font-medium text-[var(--foreground)]">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="rounded-lg border border-[var(--accent)] px-4 py-2 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-[var(--highlight)]"
          >
            <option value="rating">Rating (Highest)</option>
            <option value="author">Author (A–Z)</option>
            <option value="pages">Page Count (Highest)</option>
            <option value="year">Year (Newest)</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[var(--accent)] rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-[var(--highlight)] text-[var(--foreground)] font-bold">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Pages</th>
              <th className="px-4 py-3 text-left">Year</th>
              <th className="px-4 py-3 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book: Book, idx: number) => (
              <tr
                key={book.title + book.author + idx}
                className={
                  `border-t border-[var(--accent)] transition-colors ` +
                  (idx % 2 === 0 ? 'bg-[var(--background)]' : 'bg-[var(--card)]') +
                  ' hover:bg-[var(--highlight)]/20'
                }
              >
                <td className="px-4 py-2 italic font-bold">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.pages || ''}</td>
                <td className="px-4 py-2">{book.year || ''}</td>
                <td className="px-4 py-2">{book.rating || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 