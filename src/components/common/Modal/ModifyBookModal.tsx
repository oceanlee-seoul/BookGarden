import BookForm from '../../pages/main/Bookform';
import { Book } from '@/types/books';

export default function ModifyBookModal({ book }: { book: Book }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-[400px] max-w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">책 수정하기</h1>
      <BookForm initData={book} />
    </div>
  );
}
