import { useEffect, useState } from 'react';
import useToast from '@/hooks/useToast';

export default function ToastProvider() {
  const { toastState } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const { toastType, toastMessage } = toastState || {};

  useEffect(() => {
    if (toastType) setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, [toastType]);

  return (
    <div
      className={`fixed left-[50%] transform -translate-x-1/2 px-6 py-3 rounded-md 
        transition-all duration-500 ease-out z-20
        ${
          isVisible
            ? '-translate-x-1/2 translate-y-[0]'
            : '-translate-x-1/2 translate-y-[-100px]'
        }
        ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}
        ${toastMessage ? 'text-white' : ''}
      `}
    >
      {toastMessage}
    </div>
  );
}
