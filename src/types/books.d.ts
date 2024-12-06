import { Tables } from '@/types/supabase';
export type Book = Tables<'books'>;

export interface PostBooks {
  title: string;
  author: string;
  publisher: string;
  description?: string;
  price?: number;
  stock?: number;
  image_url?: string;
}

export interface PutBooks extends PostBooks {
  id: number;
}
