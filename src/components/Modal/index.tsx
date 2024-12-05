import useModal from '@/hooks/useModal';
import { useEffect, useRef } from 'react';
import AddBookModal from './AddBookModal';
import DetailBookModal from './DetailBookModal';

export default function ModalProvider() {
  const { modalState, closeModal } = useModal();
  const { modalType, modalProps } = modalState;
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

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

  const modalComponents: Record<string, React.ElementType> = {
    addBook: AddBookModal,
    detailBook: DetailBookModal,
  };

  const SpecificModal = modalType ? modalComponents[modalType] : null;

  if (!SpecificModal) return null;

  return (
    SpecificModal && (
      <div
        onClick={handleClickOutside}
        ref={overlayRef}
        className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-60 "
      >
        <SpecificModal {...modalProps} />
      </div>
    )
  );
}
