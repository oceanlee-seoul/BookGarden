import { atom } from 'jotai';

interface ToastProps {
  toastType: 'success' | 'error';
  toastMessage: string;
}

interface ToastState {
  toastProps: ToastProps | null;
}

const toastAtom = atom<ToastState>({
  toastProps: null,
});

export default toastAtom;
