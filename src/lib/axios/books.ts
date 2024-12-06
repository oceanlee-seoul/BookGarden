import axiosInstance from '.';
import { Book, PostBooks, PutBooks } from '@/types/books';

interface GetBooksResponse {
  data: Book[];
  totalCount: number;
}

export const getTotalCount = async (searchQuery?: string) => {
  const requestUrl = searchQuery
    ? `/books/count?search=${searchQuery}`
    : '/books/count';

  console.log('requestURL', requestUrl);

  const response = await axiosInstance.get(requestUrl);

  console.log('THIS IS AXIOS, ', response.data);

  return response.data.totalCount;
};

export const getBooks = async (
  page: number,
  pageSize: number,
  searchQuery?: string
): Promise<GetBooksResponse> => {
  const requestUrl = searchQuery
    ? `/books?page=${page}&pageSize=${pageSize}&search=${searchQuery}`
    : `/books?page=${page}&pageSize=${pageSize}`;

  const response = await axiosInstance.get(requestUrl);

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
