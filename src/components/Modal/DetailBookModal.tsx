import useModal from '@/hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBook } from '@/lib/axios/books';
import { Book } from '@/types/books';
import Button from '@/components/Button';

export default function DetailBookModal({ book }: { book: Book }) {
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();

  const handleEditClick = () => {
    openModal('modifyBook', { book });
  };

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      alert('책이 삭제되었습니다.');
      closeModal();
    },
    onError: (error) => {
      console.error('삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    },
  });

  const handleDeleteClick = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      mutateDelete(book.id.toString());
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
      {book.created_at !== book.updated_at && (
        <div className="text-xs text-gray-500 mt-2 text-right">수정됨</div>
      )}

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2 mt-4">
        {/* 수정하기 버튼 */}
        <Button onClick={handleEditClick}>수정하기</Button>

        {/* 삭제하기 버튼 */}
        <Button variant="negative" onClick={handleDeleteClick}>
          삭제하기
        </Button>
      </div>
    </div>
  );
}
