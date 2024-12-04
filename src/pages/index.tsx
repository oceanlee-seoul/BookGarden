import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '@/types/supabase';
// import BooksForm from '@/components/BooksForm';
import BookCard from '@/components/BookCard';

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
      <div className="grid grid-cols-4 gap-10 max-w-[800px]">
        {books?.map((book) => (
          <BookCard key={book.id} title={book.title} author={book.author[0]} />
        ))}
      </div>
      {/* <div>
        <BooksForm />
      </div> */}
    </div>
  );
}
