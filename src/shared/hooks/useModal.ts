import { useContext } from 'react';
import { ModalContext } from '../../components/HOCs/ModalProvider';

export const useModal = () => useContext(ModalContext);
