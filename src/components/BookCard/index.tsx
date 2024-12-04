import Image from 'next/image';

export default function BookCard({
  title,
  author,
}: {
  title: string;
  author: string;
}) {
  return (
    <div className="relative w-full pb-[147%] group shadow">
      <Image
        src="/james.jpg"
        alt="book"
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 25vw"
      />

      <div className="absolute inset-0 bg-gray-900 bg-opacity-80 opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center text-white group-hover:opacity-100">
        <h1 className="text-lg font-bold">{title}</h1>
        <h2 className="text-sm">{author}</h2>
      </div>
    </div>
  );
}
