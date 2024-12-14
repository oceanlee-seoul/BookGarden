import { atom } from 'jotai';

interface ToastState {
  toastType: 'success' | 'error' | null;
  toastMessage: string | null;
}

const toastAtom = atom<ToastState>({
  toastType: null,
  toastMessage: null,
});

export default toastAtom;
