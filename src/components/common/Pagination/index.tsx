import Button from '@/components/common/Button';

export default function Pagination({
  page,
  totalPages,
  handlePageChange,
}: {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) {
  return (
    <div className="flex justify-center gap-5 mt-5">
      <Button
        disabled={page === 1}
        variant="secondary"
        onClick={() => {
          handlePageChange(page - 1);
        }}
      >
        {'<'}
      </Button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={` px-[16px] py-[10px] text-sm font-bold transition duration-300  border border-[#E0E0E0] hover:bg-[#e1e1e1] active:bg-[#E0E0E0] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C7C7C7] ${
              page === index + 1
                ? 'bg-[#007BFF] text-white pointer-events-none'
                : 'bg-white text-[#333]'
            }`}
            disabled={page === index + 1}
            key={index}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Button
        disabled={page === totalPages}
        variant="secondary"
        onClick={() => {
          handlePageChange(page + 1);
        }}
      >
        {'>'}
      </Button>
    </div>
  );
}
