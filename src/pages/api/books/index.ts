import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // GET: 책 데이터 조회
    const { data, error } = await supabase.from('books').select('*');
    if (error) {
      return res.status(500).json({ message: 'Error fetching books', error });
    }
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    // POST: 새 책 데이터 생성
    const { title, author, publisher, price, stock, description } = req.body;

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
