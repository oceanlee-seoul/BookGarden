import { useState } from 'react';
import { addBook, modifyBook } from '@/lib/axios/books';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import useModal from '@/hooks/useModal';

interface BookFormProps {
  initData?: {
    id?: string;
    title: string;
    author: string[];
    publisher: string;
    price: number;
    stock: number | string;
    description: string;
  };
}

const BookForm = ({ initData }: BookFormProps) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const [title, setTitle] = useState(initData?.title || '');
  const [author, setAuthor] = useState(initData?.author.join(', ') || '');
  const [publisher, setPublisher] = useState(initData?.publisher || '');
  const [price, setPrice] = useState<number | string>(initData?.price || '');
  const [stock, setStock] = useState<number | string>(initData?.stock || '');
  const [description, setDescription] = useState(initData?.description || '');

  const { mutate: addBookMutation } = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      closeModal();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const { mutate: modifyBookMutation } = useMutation({
    mutationFn: modifyBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      closeModal();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const authors = author.split(',').map((item) => item.trim());

    const bookData = {
      title,
      author: authors,
      publisher,
      price: Number(price),
      stock: Number(stock),
      description,
    };

    if (initData?.id) {
      // Modify book
      modifyBookMutation({
        id: initData.id,
        ...bookData,
      });
    } else {
      // Add new book
      addBookMutation(bookData);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* 책 제목 */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          책 제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        />
      </div>

      {/* 저자 */}
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          저자
        </label>
        <input
          id="author"
          name="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        />
      </div>

      {/* 출판사 */}
      <div>
        <label
          htmlFor="publisher"
          className="block text-sm font-medium text-gray-700"
        >
          출판사
        </label>
        <input
          id="publisher"
          name="publisher"
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        />
      </div>

      {/* 가격과 수량 */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            가격
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
          />
        </div>

        <div className="w-1/3">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            수량
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
          />
        </div>
      </div>

      {/* 설명 */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          설명
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        ></textarea>
      </div>

      {/* 제출 버튼 */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          {initData ? '수정하기' : '추가하기'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;