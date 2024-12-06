import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { search } = req.query;

    if (!search || typeof search !== 'string') {
      try {
        const { data, error } = await supabase.from('books').select('*');

        if (error) {
          return res
            .status(500)
            .json({ message: 'Error fetching all books', error });
        }

        return res.status(200).json({ totalCount: data.length });
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching books', error });
      }
    }

    try {
      const { data: titleResults, error: titleError } = await supabase
        .from('books')
        .select('*')
        .ilike('title', `%${search}%`);

      if (titleError) {
        return res
          .status(500)
          .json({ message: 'Error fetching title results', error: titleError });
      }

      const { data: authorResults, error: authorError } = await supabase
        .from('books')
        .select('*')
        .ilike('author', `%${search}%`);

      if (authorError) {
        return res.status(500).json({
          message: 'Error fetching author results',
          error: authorError,
        });
      }

      // title과 author 결과를 합친 후 중복을 제거
      const mergedResults = [
        ...titleResults,
        ...authorResults.filter(
          (authorBook) =>
            !titleResults.some((titleBook) => titleBook.id === authorBook.id)
        ),
      ];

      // 중복 제거된 데이터 수 반환
      res.status(200).json({ totalCount: mergedResults.length });
    } catch (error) {
      res.status(500).json({ message: 'Error executing queries', error });
    }
  }
}
