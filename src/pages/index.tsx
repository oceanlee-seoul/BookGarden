import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBooks, getTotalCount } from '@/lib/axios/books';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import ErrorBoundary from '@/components/ErrorBoundary';
import ActionBar from '@/components/ActionBar';
import BooksContainer from '@/components/BooksContainer';

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 8;

  const {
    data: totalCount = 0,
    isLoading: isLoadingCount,
    error: errorCount,
  } = useQuery({
    queryKey: ['totalCount'],
    queryFn: () => getTotalCount(searchQuery),
  });

  const {
    data: { data: books = [] } = {},
    isLoading: isLoadingBooks,
    error: errorBooks,
  } = useQuery({
    queryKey: ['books', page],
    queryFn: () => getBooks(page, pageSize, searchQuery),
    enabled: !!totalCount,
  });

  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);
  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <div className="max-w-[1200px] mx-auto">
      <ActionBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
