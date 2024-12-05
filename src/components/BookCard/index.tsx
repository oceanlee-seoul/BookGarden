import Image from 'next/image';
import Button from '../Button';
import { Tables } from '@/types/supabase';
import useModal from '@/hooks/useModal';

type Book = Tables<'books'>;

export default function BookCard({ book }: { book: Book }) {
  const { openModal } = useModal();

  return (
    <div className="relative w-full pb-[147%] group shadow">
      <Image
        src="/james.jpg"
        alt="book"
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 25vw"
      />

      <div className="absolute inset-0 bg-gray-900 bg-opacity-80 opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center text-white group-hover:opacity-100">
        <h1 className="text-lg font-bold">{book.title}</h1>
        <h2 className="text-sm mb-[20px]">{book.author}</h2>
        <Button
          onClick={() => {
            openModal('detailBook', { book });
          }}
        >
          자세히 보기
        </Button>
      </div>
    </div>
  );
}
