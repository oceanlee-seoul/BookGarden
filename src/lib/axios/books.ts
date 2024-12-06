import axiosInstance from '.';
import { Book, PostBooks, PutBooks } from '@/types/books';

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

export const addBook = async (bookData: PostBooks) => {
  const response = await axiosInstance.post('/books', bookData);
  return response.data;
};

export const modifyBook = async (bookData: PutBooks) => {
  const response = await axiosInstance.put(`/books/${bookData.id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await axiosInstance.delete(`/books/${id}`);
  return response.data;
};
