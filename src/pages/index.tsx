import { useEffect, useState } from 'react';
import { Tables } from '@/types/supabase';

type Book = Tables<'books'>;

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.length === 0 ? (
          <li>No books available</li>
        ) : (
          books.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author.join(', ')}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
