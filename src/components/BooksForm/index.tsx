import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// 새 책을 추가하는 함수
const addBook = async (bookData: {
  title: string;
  author: string[];
  publisher: string;
  price: number;
  stock: number;
  description: string;
}) => {
  const response = await axios.post('/api/books', bookData);
  return response.data;
};

export default function BooksForm() {
  // 각 입력 필드에 대한 state 설정
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [stock, setStock] = useState<number | string>('');
  const [description, setDescription] = useState('');

  const { mutate } = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      console.log('success!');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const authors = author.split(',').map((item) => item.trim());

    const newBook = {
      title,
      author: authors,
      publisher,
      price: Number(price),
      stock: Number(stock),
      description,
    };

    mutate(newBook);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-gray-50 rounded-lg shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-bold text-lg text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="author" className="font-bold text-lg text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g., John Doe, Jane Smith"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <small className="text-sm text-gray-500">
          Multiple authors can be separated by commas.
        </small>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="publisher" className="font-bold text-lg text-gray-700">
          Publisher
        </label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="font-bold text-lg text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="stock" className="font-bold text-lg text-gray-700">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="font-bold text-lg text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
