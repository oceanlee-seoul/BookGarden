import { ComponentProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends ComponentProps<'input'> {
  id: string;
  label: string;
  errorMessage?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  register: UseFormRegisterReturn;
}

export default function Input({
  id,
  label,
  errorMessage = '',
  type = 'text',
  register,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
