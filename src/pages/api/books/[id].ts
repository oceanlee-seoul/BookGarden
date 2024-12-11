import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    if (!id) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const { title, author, publisher, price, stock, description, imageUrl } =
      req.body;

    const { data, error } = await supabase
      .from('books')
      .update({
        title,
        author,
        publisher,
        price,
        stock,
        description,
        image_url: imageUrl,
        updated_at: new Date().toISOString(), // 수정된 날짜 업데이트
      })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(500).json({ message: 'Error updating book', error });
    }

    if (!data?.length) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(data);
  } else if (req.method === 'DELETE') {
    if (!id) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const { error } = await supabase.from('books').delete().eq('id', id);

    if (error) {
      return res.status(500).json({ message: 'Error deleting book', error });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
