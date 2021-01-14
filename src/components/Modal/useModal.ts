import { useContext } from 'react';
import { ModalContext } from '../HOCs/ModalProvider';

export const useModal = () => {
  return useContext(ModalContext);
};
