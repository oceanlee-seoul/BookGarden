import { ReactNode, ButtonHTMLAttributes } from 'react';

export default function Button({
  children,
  ...buttonProps
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-[#E9E8ED] text-black px-[6px] py-[8px] rounded text-sm font-bold"
      {...buttonProps}
    >
      {children}
    </button>
  );
}
