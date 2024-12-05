import axiosInstance from '.';

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
