import { useQuery } from '@tanstack/react-query';
import BookCard from '@/components/BookCard';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { getBooks } from '@/lib/axios/books';
import BookCardSkeleton from '@/components/BookCard/BookCardSkeleton';

export default function Home() {
  const { openModal } = useModal();

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({ queryKey: ['books'], queryFn: getBooks });

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-[15px] flex justify-end gap-5">
          <input
            type="text"
            placeholder="책 이름이나 작가 이름 검색하세요"
            className="cursor-none w-[280px] px-4 py-3 pr-10 rounded-full border border-[#E0E0E0] bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF] transition duration-300 placeholder:text-[#A0A0A0]"
          />
          <Button>책 추가하기</Button>
        </div>
        <div className="grid grid-cols-4 gap-10 border p-[40px] rounded-xl bg-white shadow-lg">
          {/* Skeleton 8개 출력 */}
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
        </div>
        <div className="text-center mt-[20px]">This is Pagination Section</div>
      </div>
    );
  }

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-[15px] flex justify-end gap-5">
        <input
          type="text"
          placeholder="책 이름이나 작가 이름 검색하세요"
          className="w-[280px] px-4 py-3 pr-10 rounded-full border border-[#E0E0E0] bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF] transition duration-300 placeholder:text-[#A0A0A0]"
        />
        <Button
          onClick={() => {
            openModal('addBook');
          }}
        >
          책 추가하기
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-10 border p-[40px] rounded-xl bg-white shadow-lg">
        {books?.slice(0, 8).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="text-center mt-[20px]">This is Pagination Section</div>
    </div>
  );
}
