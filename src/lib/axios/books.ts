import axiosInstance from '.';
import { Book } from '@/types/books';

interface GetBooksResponse {
  data: Book[];
  totalCount: number;
}

export const getTotalCount = async () => {
  const response = await axiosInstance.get('/books/count');
  return response.data.totalCount;
};

export const getBooks = async (
  page: number,
  pageSize: number
): Promise<GetBooksResponse> => {
  const response = await axiosInstance.get(
    `/books?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const addBook = async (bookData: {
  title: string;
  author: string[];
  publisher: string;
  price: number;
  stock: number;
  description: string;
}) => {
  const response = await axiosInstance.post('/books', bookData);
  return response.data;
};

export const modifyBook = async (bookData: {
  id: string;
  title: string;
  author: string[];
  publisher: string;
  price: number;
  stock: number;
  description: string;
}) => {
  const response = await axiosInstance.patch(`/books/${bookData.id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: string) => {
  const response = await axiosInstance.delete(`/books/${id}`);
  return response.data;
};
