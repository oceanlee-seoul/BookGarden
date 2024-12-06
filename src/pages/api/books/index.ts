import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { page = 1, pageSize = 8, search } = req.query;

    const offset = (Number(page) - 1) * Number(pageSize);
    const limit = Number(pageSize);

    let books = [];

    if (search && typeof search === 'string') {
      try {
        const { data: titleResults, error: titleError } = await supabase
          .from('books')
          .select('*')
          .ilike('title', `%${search}%`)
          .range(offset, offset + limit - 1);

        if (titleError) {
          return res.status(500).json({
            message: 'Error fetching title results',
            error: titleError,
          });
        }
        // author에서 검색
        const { data: authorResults, error: authorError } = await supabase
          .from('books')
          .select('*')
          .ilike('author', `%${search}%`)
          .range(offset, offset + limit - 1);

        if (authorError) {
          return res.status(500).json({
            message: 'Error fetching author results',
            error: authorError,
          });
        }
        books = [
          ...titleResults,
          ...authorResults.filter(
            (authorBook) =>
              !titleResults.some((titleBook) => titleBook.id === authorBook.id)
          ),
        ];
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Error executing search queries', error });
      }
    } else {
      // searchQuery가 없으면 그냥 기본 책 리스트 반환
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .range(offset, offset + limit - 1)
        .order('id', { ascending: true });

      if (error) {
        return res.status(500).json({ message: 'Error fetching books', error });
      }

      books = data;
    }

    // 결과 반환
    res.status(200).json({ data: books });

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
