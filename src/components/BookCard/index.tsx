import Image from 'next/image';
import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { Book } from '@/types/books';

export default function BookCard({ book }: { book: Book }) {
  const { openModal } = useModal();

  return (
    <div
      style={{
        boxShadow:
          'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
      }}
      className="relative w-full pb-[147%] group"
    >
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
          variant="secondary"
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
