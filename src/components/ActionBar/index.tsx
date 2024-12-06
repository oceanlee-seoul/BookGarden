import Button from '@/components/Button';
import useModal from '@/hooks/useModal';

export default function ActionBar() {
  const { openModal } = useModal();

  return (
    <div className="mb-[15px] flex justify-end gap-5">
      <input
        type="text"
        placeholder="책 이름이나 작가 이름 검색하세요"
        className="w-[280px] px-4 py-3 pr-10 rounded-full border border-[#E0E0E0] bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-[#007BFF] transition duration-300 placeholder:text-[#A0A0A0]"
      />
      <Button onClick={() => openModal && openModal('addBook')}>
        책 추가하기
      </Button>
    </div>
  );
}
