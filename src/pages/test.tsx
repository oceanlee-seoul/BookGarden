import supabase from '@/lib/supabase';
import { ChangeEvent, useState } from 'react';

export default function Test() {
  // 상태 타입 정의
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  // 파일 변경 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    console.log(file);
  };

  // 파일 업로드 함수
  const handleUpload = async () => {
    if (!image) {
      alert('파일을 선택하세요!');
      return;
    }

    setUploading(true);
    const fileName = `${Date.now()}-${image.name}`;

    const { data, error } = await supabase.storage
      .from('image') // 버킷 이름 설정
      .upload(fileName, image);

    setUploading(false);

    if (error) {
      alert('업로드 실패!');
      console.error(error);
    } else {
      alert('업로드 성공!');
      console.log('업로드 데이터:', data);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">이미지 업로드 테스트</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="my-2"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {uploading ? '업로드 중...' : '이미지 업로드'}
      </button>
    </div>
  );
}
