import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

// 책 데이터 타입 정의
interface BookData {
  title: string;
  author: string;
  publisher: string;
  price: number;
  stock: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('books').select('*');
    if (error) {
      return res.status(500).json({ message: 'Error fetching books', error });
    }
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { title, author, publisher, price, stock, description } =
      req.body as BookData;

    // 데이터 삽입
    const { data, error } = await supabase.from('books').insert([
      {
        title,
        author,
        publisher,
        price,
        stock,
        description,
      },
    ]);

    if (error) {
      return res.status(500).json({ message: 'Error creating book', error });
    }

    res.status(201).json(data);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
