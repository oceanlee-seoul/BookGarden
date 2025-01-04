import { ChangeEvent } from 'react';
import { addBook, modifyBook } from '@/lib/axios/books';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import useModal from '@/hooks/useModal';
import Button from '@/components/common/Button';
import { Book } from '@/types/books';
import supabase from '@/lib/supabase';
import useToast from '@/hooks/useToast';
import { useForm } from 'react-hook-form';

type BookFormData = {
  title: string;
  author: string;
  publisher: string;
  price: number;
  stock: number;
  description: string;
  image?: File | null;
};

const BookForm = ({ initData }: { initData?: Book }) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookFormData>({
    defaultValues: {
      title: initData?.title || '',
      author: initData?.author || '',
      publisher: initData?.publisher || '',
      price: initData?.price || 0,
      stock: initData?.stock || 0,
      description: initData?.description || '',
      image: null,
    },
  });

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
    setValue('image', file);
  };

  const onSubmit = async (data: BookFormData) => {
    let uploadedImageUrl = '';

    if (data.image) {
      const fileName = `${Date.now()}-${data.image.name}`;
      const { data: uploadedData, error } = await supabase.storage
        .from('image')
        .upload(fileName, data.image);
      if (error) {
        console.error('이미지 업로드 실패: ', error);
        return;
      }
      uploadedImageUrl = uploadedData?.path || '';
    }

    const bookData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
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
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          {...register('title', { required: '책 제목은 필수입니다.' })}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
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
          {...register('author', { required: '저자는 필수입니다.' })}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author.message}</p>
        )}
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
          {...register('publisher')}
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
            type="number"
            {...register('price', { required: '가격은 필수입니다.' })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div className="w-1/3">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            수량
          </label>
          <input
            id="stock"
            type="number"
            {...register('stock', { required: '수량은 필수입니다.' })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
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
          rows={4}
          {...register('description')}
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
