import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '@/types/supabase';
// import BooksForm from '@/components/BooksForm';
import BookCard from '@/components/BookCard';
import Button from '@/components/Button';

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
    <div className="max-w-[800px]">
      <div className="p-[20px] rounded-xl bg-white shadow mb-[15px] flex justify-between">
        <input
          className="border"
          type="text"
          placeholder="책 이름이나 작가 이름 검색하세요"
        ></input>
        <Button>책 추가하기</Button>
      </div>
      <div className="grid grid-cols-4 gap-10 border p-[40px] rounded-xl bg-white shadow-lg">
        {books?.slice(0, 8).map((book) => (
          <BookCard key={book.id} title={book.title} author={book.author[0]} />
        ))}
      </div>
      <div className="text-center mt-[20px]">This is Pagination Section</div>
      {/* <div>
        <BooksForm />
      </div> */}
    </div>
  );
}
