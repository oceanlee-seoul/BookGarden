import { Tables } from '@/types/supabase';
export type Book = Tables<'books'>;

export interface BookFormProps {
  initData?: {
    id?: string;
    title: string;
    author: string;
    publisher: string;
    price: number;
    stock: number | string;
    description: string;
  };
}
