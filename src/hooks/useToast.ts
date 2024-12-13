import toastAtom from '@/store/toastAtom';
import { useAtom } from 'jotai';

const useToast = () => {
  const [, setToastState] = useAtom(toastAtom);

  const showToast = (toastType: 'success' | 'error', toastMessage: string) => {
    setToastState({ toastProps: { toastType, toastMessage } });
    setTimeout(() => setToastState({ toastProps: null }));
  };
  return { showToast };
};

export default useToast;
