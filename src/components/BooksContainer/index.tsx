import { Book } from '@/types/books';
import BookCard from '@/components/BookCard';
import BookCardSkeleton from '@/components/BookCard/BookCardSkeleton';

export default function BooksContainer({
  books,
  isLoading,
  pageSize,
}: {
  books: Book[];
  isLoading: boolean;
  pageSize: number;
}) {
  return isLoading ? (
    <SkeletonGrid pageSize={pageSize} />
  ) : (
    <div className="grid grid-cols-4 gap-10 border p-[40px] rounded-xl bg-white shadow-lg">
      {books.length > 0 ? (
        books.map((book) => <BookCard key={book.id} book={book} />)
      ) : (
        <div className="col-span-4 text-center text-gray-500">
          No books available.
        </div>
      )}
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
