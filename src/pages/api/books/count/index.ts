import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { count, error } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return res.status(500).json({ message: 'Error fetching count', error });
    }

    res.status(200).json({ totalCount: count });
  }
}
