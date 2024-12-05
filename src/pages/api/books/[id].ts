import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

// 책 데이터 타입 정의
// interface BookData {
//   title: string;
//   author: string;
//   publisher: string;
//   price: number;
//   stock: number;
//   description: string;
//   created_at: string;
//   updated_at: string;
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query; // URL에서 책 ID 가져오기

  // PATCH 요청일 경우 처리
  if (req.method === 'PATCH') {
    console.log('PATCH 요청 수신');

    // ID가 제공되지 않으면 400 오류
    if (!id) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    // 요청 본문에서 수정할 데이터 가져오기
    const { title, author, publisher, price, stock, description } = req.body;

    // Supabase에서 해당 책 찾기
    const { data, error } = await supabase
      .from('books')
      .update({
        title,
        author,
        publisher,
        price,
        stock,
        description,
        updated_at: new Date().toISOString(), // 수정된 날짜 업데이트
      })
      .eq('id', id) // `id`로 책을 찾음
      .select(); // 수정된 데이터도 반환하도록 .select() 호출

    // 오류 처리
    if (error) {
      return res.status(500).json({ message: 'Error updating book', error });
    }

    // 수정된 데이터가 없으면 404 오류
    if (!data?.length) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // 성공적으로 수정된 책 데이터 반환
    res.status(200).json(data);
  }

  // DELETE 요청일 경우 처리
  else if (req.method === 'DELETE') {
    console.log('DELETE 요청 수신');

    // ID가 제공되지 않으면 400 오류
    if (!id) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    // Supabase에서 해당 책 삭제
    const { error } = await supabase.from('books').delete().eq('id', id); // `id`로 책을 찾고 삭제

    // 오류 처리
    if (error) {
      return res.status(500).json({ message: 'Error deleting book', error });
    }

    // 성공적으로 삭제된 책에 대한 응답 반환
    res.status(200).json({ message: 'Book deleted successfully' });
  } else {
    // 다른 메서드가 들어오면 Method Not Allowed 처리
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
