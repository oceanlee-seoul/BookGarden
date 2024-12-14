import toastAtom from '@/store/toastAtom';
import { useAtom } from 'jotai';

const useToast = () => {
  const [toastState, setToastState] = useAtom(toastAtom);

  const showToast = (toastType: 'success' | 'error', toastMessage: string) => {
    setToastState({ toastType, toastMessage });

    setTimeout(() => {
      setToastState({ toastType: null, toastMessage: null });
    }, 4000);
  };

  return { toastState, showToast };
};

export default useToast;
