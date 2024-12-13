import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBooks, getTotalCount } from '@/lib/axios/books';
import Pagination from '@/components/common/Pagination';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ActionBar from '@/components/pages/main/ActionBar';
import BooksContainer from '@/components/pages/main/BooksContainer';

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const pageSize = 8;

  const {
    data: totalCount = 0,
    isLoading: isLoadingCount,
    error: errorCount,
    refetch: refetchCount,
  } = useQuery({
    queryKey: ['totalCount'],
    queryFn: () => getTotalCount(searchQuery),
    enabled: !!searchQuery || !searchQuery,
  });

  const {
    data: { data: books = [] } = {},
    isLoading: isLoadingBooks,
    error: errorBooks,
    refetch: refetchBooks,
  } = useQuery({
    queryKey: ['books', page],
    queryFn: () => getBooks(page, pageSize, searchQuery),
    enabled: !!totalCount,
  });

  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setPrevSearchQuery(searchQuery);
      if (searchQuery !== prevSearchQuery) {
        refetchCount();
        refetchBooks();
      }
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <ActionBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ErrorBoundary
        fallback={
          <ErrorFallback errorBooks={errorBooks} errorCount={errorCount} />
        }
      >
        <BooksContainer
          books={books}
          isLoading={isLoadingBooks || isLoadingCount}
          pageSize={pageSize}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </ErrorBoundary>
    </div>
  );
}

function ErrorFallback({
  errorBooks,
  errorCount,
}: {
  errorBooks?: Error | null;
  errorCount?: Error | null;
}) {
  return (
    <div className="text-center text-red-500">
      {errorBooks?.message || errorCount?.message || 'Error occurred.'}
    </div>
  );
}
