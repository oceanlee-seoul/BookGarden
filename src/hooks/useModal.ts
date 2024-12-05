import modalAtom from '@/store/modalAtom';
import { useAtom } from 'jotai';
import { Book } from '@/types/books';

type ModalType = 'addBook' | 'detailBook' | 'modifyBook';

type ModalProps = {
  addBook: object;
  modifyBook: { book: Book };
  detailBook: { book: Book };
};

const useModal = () => {
  const [modalState, setModalState] = useAtom(modalAtom);

  const openModal = <T extends ModalType>(
    modalType: T,
    modalProps?: ModalProps[T]
  ) => {
    setModalState({
      modalType,
      modalProps: modalProps || ({} as ModalProps[T]),
    });
  };

  const closeModal = () => {
    setModalState({
      modalType: null,
      modalProps: {},
    });
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};

export default useModal;
