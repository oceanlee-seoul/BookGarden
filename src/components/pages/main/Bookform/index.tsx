import { ChangeEvent, useState } from 'react';
import { addBook, modifyBook } from '@/lib/axios/books';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import useModal from '@/hooks/useModal';
import Button from '@/components/common/Button';
import { Book } from '@/types/books';
import supabase from '@/lib/supabase';
import useToast from '@/hooks/useToast';

const BookForm = ({ initData }: { initData?: Book }) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const { showToast } = useToast();

  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState(initData?.title || '');
  const [author, setAuthor] = useState(initData?.author || '');
  const [publisher, setPublisher] = useState(initData?.publisher || '');
  const [price, setPrice] = useState<number | string>(initData?.price || '');
  const [stock, setStock] = useState<number | string>(initData?.stock || '');
  const [description, setDescription] = useState(initData?.description || '');
  // const [imageUrl, setImageUrl] = useState<string | null>(
  //   initData?.image_url || null
  // );

  const { mutate: addBookMutation } = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['totalCount'] });
      closeModal();
      showToast('success', '책 생성을 성공했습니다.');
    },
    onError: (err) => {
      console.error(err);
      showToast('error', '책 생성을 실패했습니다.');
    },
  });

  const { mutate: modifyBookMutation } = useMutation({
    mutationFn: modifyBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      closeModal();
      showToast('success', '책 정보 수정을 성공했습니다.');
    },
    onError: (err) => {
      console.error(err);
      showToast('error', '책 정보 수정을 실패했습니다.');
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedImageUrl = '';

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const { data, error } = await supabase.storage
        .from('image')
        .upload(fileName, image);
      if (error) {
        console.error('이미지 업로드 실패: ', error);
      }
      uploadedImageUrl = data?.path || '';
    }

    const bookData = {
      title,
      author,
      publisher,
      price: Number(price),
      stock: Number(stock),
      description,
      imageUrl: uploadedImageUrl,
    };

    if (initData?.id) {
      modifyBookMutation({
        id: initData.id,
        ...bookData,
      });
    } else {
      addBookMutation(bookData);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* 책 제목 */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          책 제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        />
      </div>

      {/* 저자 */}
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          저자
        </label>
        <input
          id="author"
          name="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        />
      </div>

      {/* 출판사 */}
      <div>
        <label
          htmlFor="publisher"
          className="block text-sm font-medium text-gray-700"
        >
          출판사
        </label>
        <input
          id="publisher"
          name="publisher"
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        />
      </div>

      {/* 가격과 수량 */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            가격
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
          />
        </div>

        <div className="w-1/3">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            수량
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
          />
        </div>
      </div>

      {/* 설명 */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          설명
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="imageInput"
          className="block text-sm font-medium text-gray-700"
        >
          표지 사진 등록
        </label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="my-2"
        />
      </div>

      {/* 제출 버튼 */}
      <div className="mt-6 flex justify-end">
        <Button type="submit">{initData ? '수정하기' : '추가하기'}</Button>
      </div>
    </form>
  );
};

export default BookForm;
