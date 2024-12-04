import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '@/types/supabase';
import BooksForm from '@/components/BooksForm';

const fetchBooks = async (): Promise<Book[]> => {
  const { data } = await axios.get('/api/books'); // /api/books로 GET 요청
  return data;
};

type Book = Tables<'books'>;

export default function Home() {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({ queryKey: ['books'], queryFn: fetchBooks });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books?.map((book: { id: number; title: string; author: string[] }) => (
          <li key={book.id}>
            {book.title} by {book.author.join(', ')}
          </li>
        ))}
      </ul>
      <h1>form</h1>
      <div>
        <BooksForm />
      </div>
    </div>
  );
}
