import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'negative';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  const buttonStyles = {
    primary:
      'bg-[#007BFF] text-white hover:bg-[#0056b3] active:bg-[#004085] rounded-xl border-none shadow-md focus:outline-none focus:ring-2 focus:ring-[#0056b3]',
    secondary:
      'bg-white text-[#333] border border-[#E0E0E0] hover:bg-[#e1e1e1] active:bg-[#E0E0E0] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C7C7C7]',
    negative:
      'bg-[#FF4D4D] text-white hover:bg-[#FF0000] active:bg-[#D00000] rounded-xl border-none shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF0000]',
  };

  return (
    <button
      className={`px-[16px] py-[10px] text-sm font-bold transition duration-300 ${buttonStyles[variant]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
