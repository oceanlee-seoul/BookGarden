import { useState, useEffect } from 'react';

type Book = {
  title: string;
  author: string[];
  publisher: string;
  price: number;
  stock: number | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  id: number;
};

interface DetailBookModalProps {
  book: Book;
}

export default function DetailBookModal({ book }: DetailBookModalProps) {
  const [isEdited, setIsEdited] = useState(false);

  // 수정된 상태를 확인하기 위해 created_at과 updated_at 비교
  useEffect(() => {
    if (book.created_at !== book.updated_at) {
      setIsEdited(true);
    }
  }, [book]);

  const handleEditClick = () => {
    // onEdit(book); // 수정 버튼 클릭 시 onEdit 함수 호출
  };

  const handleDeleteClick = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // onDelete(book.id); // 삭제 버튼 클릭 시 onDelete 함수 호출
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-[500px] max-w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">책 상세보기</h1>

      {/* 책 제목 */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700">책 제목</h3>
        <p className="text-gray-800">{book.title}</p>
      </div>

      {/* 저자 */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700">저자</h3>
        <p className="text-gray-800">{book.author.join(', ')}</p>
      </div>

      {/* 출판사 */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700">출판사</h3>
        <p className="text-gray-800">{book.publisher}</p>
      </div>

      {/* 가격과 수량 */}
      <div className="flex gap-4 mb-4">
        {/* 가격 */}
        <div className="flex-1">
          <h3 className="font-medium text-gray-700">가격</h3>
          <p className="text-gray-800">{book.price.toLocaleString()}원</p>
        </div>

        {/* 수량 */}
        <div className="w-1/3">
          <h3 className="font-medium text-gray-700">수량</h3>
          <p className="text-gray-800">{book.stock ?? '재고 없음'}</p>
        </div>
      </div>

      {/* 설명 */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700">설명</h3>
        <p className="text-gray-800">
          {book.description ?? '설명이 없습니다.'}
        </p>
      </div>

      {/* 수정됨 표시 */}
      {isEdited && (
        <div className="text-xs text-gray-500 mt-2 text-right">수정됨</div>
      )}

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-4 mt-4">
        {/* 수정하기 버튼 */}
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          수정하기
        </button>

        {/* 삭제하기 버튼 */}
        <button
          onClick={handleDeleteClick}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}
