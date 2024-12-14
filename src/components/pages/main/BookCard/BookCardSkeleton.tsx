export default function BookCardSkeleton() {
  return (
    <div
      style={{
        boxShadow:
          'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
      }}
      className="relative w-full pb-[147%] group bg-gray-300 animate-pulse"
    >
      <div className="w-full h-full bg-gray-400 rounded-lg"></div>
    </div>
  );
}
