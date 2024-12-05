import useModal from '@/hooks/useModal';
import Button from '../Button';
import { useEffect } from 'react';

export default function ModalProvider() {
  const { modalState, closeModal } = useModal();
  const { modalType, modalProps } = modalState;

  useEffect(() => {
    const toggleBodyOverflow = (hidden: boolean) => {
      document.body.style.overflow = hidden ? 'hidden' : 'auto';
    };
    if (modalType) {
      toggleBodyOverflow(true);
    } else {
      toggleBodyOverflow(false);
    }
  }, [modalType]);

  if (!modalType) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-20 ">
      <div>
        <h1>This is Modal</h1>
        <Button onClick={closeModal}>모달 끄기</Button>
      </div>
    </div>
  );
}
