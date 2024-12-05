import BookForm from './BookForm';

interface ModifyBookModalProps {
  book: {
    id: string;
    title: string;
    author: string[];
    publisher: string;
    price: number;
    stock: number;
    description: string;
  };
}

export default function ModifyBookModal({ book }: ModifyBookModalProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-[400px] max-w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">책 수정하기</h1>
      <BookForm initData={book} />
    </div>
  );
}
