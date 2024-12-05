import { useQuery } from '@tanstack/react-query';
import BookCard from '@/components/BookCard';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { getBooks, getTotalCount } from '@/lib/axios/books';
import BookCardSkeleton from '@/components/BookCard/BookCardSkeleton';
import { useState } from 'react';
import Pagination from '@/components/Pagination';

export default function Home() {
  const { openModal } = useModal();
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const {
    data: totalCount = 0,
    isLoading: isLoadingCount,
    error: errorCount,
  } = useQuery({
    queryKey: ['totalCount'],
    queryFn: getTotalCount,
  });

  const {
    data: { data: books = [] } = {},
    isLoading: isLoadingBooks,
    error: errorBooks,
  } = useQuery({
    queryKey: ['books', page],
    queryFn: () => getBooks(page, pageSize),
    enabled: !!totalCount,
  });

  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);
  const handlePageChange = (newPage: number) => setPage(newPage);

  if (isLoadingBooks || isLoadingCount) {
    return (
      <div className="max-w-[1200px] mx-auto">
        <Header openModal={() => openModal('addBook')} />
        <SkeletonGrid pageSize={pageSize} />
        <PaginationSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <Header openModal={() => openModal('addBook')} />
      <div className="grid grid-cols-4 gap-10 border p-[40px] rounded-xl bg-white shadow-lg">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No books available.
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );

  function Header({ openModal }: { openModal?: (modalType: string) => void }) {
    return (
      <div className="mb-[15px] flex justify-end gap-5">
        <input
          type="text"
          placeholder="책 이름이나 작가 이름 검색하세요"
          className="w-[280px] px-4 py-3 pr-10 rounded-full border border-[#E0E0E0] bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF] transition duration-300 placeholder:text-[#A0A0A0]"
        />
        <Button onClick={() => openModal && openModal('addBook')}>
          책 추가하기
        </Button>
      </div>
    );
  }

  function SkeletonGrid({ pageSize }: { pageSize: number }) {
    return (
      <div className="grid grid-cols-4 gap-10 border p-[40px] rounded-xl bg-white shadow-lg">
        {Array(pageSize)
          .fill(0)
          .map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
      </div>
    );
  }
}

function PaginationSkeleton() {
  return (
    <div className="flex justify-center gap-5 mt-5">
      <Button variant="secondary" disabled>
        {'<'}
      </Button>

      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-[40px] h-[40px] rounded-xl bg-gray-200 animate-pulse"
          ></div>
        ))}
      </div>

      <Button variant="secondary" disabled>
        {'>'}
      </Button>
    </div>
  );
}
