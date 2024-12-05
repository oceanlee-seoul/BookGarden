import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { page = 1, pageSize = 8 } = req.query;

    const offset = (Number(page) - 1) * Number(pageSize);
    const limit = Number(pageSize);

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .range(offset, offset + limit - 1)
      .order('id', { ascending: true });

    if (error) {
      return res.status(500).json({ message: 'Error fetching books', error });
    }

    res.status(200).json({ data });
  } else if (req.method === 'POST') {
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
