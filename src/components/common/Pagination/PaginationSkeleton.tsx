import Button from '../Button';

export default function PaginationSkeleton({
  totalPages,
}: {
  totalPages: number;
}) {
  return (
    <div className="flex justify-center gap-5 mt-5">
      <Button variant="secondary" disabled>
        {'<'}
      </Button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className="w-[40px] h-[40px] rounded-xl bg-gray-200 animate-pulse"
          ></div>
        ))}
      </div>

      <Button variant="secondary" disabled>
        {'>'}
      </Button>
    </div>
  );
}
