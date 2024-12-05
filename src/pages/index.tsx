import { useQuery } from '@tanstack/react-query';
import BookCard from '@/components/BookCard';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { getBooks } from '@/lib/axios/books';

export default function Home() {
  const { openModal } = useModal();

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({ queryKey: ['books'], queryFn: getBooks });

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
        <Button
          onClick={() => {
            openModal('addBook');
          }}
        >
          책 추가하기
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-10 border p-[40px] rounded-xl bg-white shadow-lg">
        {books?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="text-center mt-[20px]">This is Pagination Section</div>
    </div>
  );
}
