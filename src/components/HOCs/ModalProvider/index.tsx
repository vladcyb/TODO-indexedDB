import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';
import { ModalDelete } from '../../ModalDelete';
import { useSelector } from 'react-redux';
import { getAppState } from '../../../store/appReducer/selectors';
import { ModalTask } from '../../ModalTask';
import { ModalCategory } from '../../ModalCategory';

export type ModalContextType = {
  deletingTaskId?: string
  deletingCategoryId?: string
  setDeletingCategoryId?: Dispatch<SetStateAction<string>>
  setDeletingTaskId?: Dispatch<SetStateAction<string>>
  isCreating?: boolean
  setIsCreating?: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<ModalContextType>({});

export const ModalProvider: FC = ({ children }) => {

  /* state */
  const [deletingCategoryId, setDeletingCategoryId] = useState('');
  const [deletingTaskId, setDeletingTaskId] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  /* hooks */
  const appState = useSelector(getAppState);

  return (
    <ModalContext.Provider
      value={{
        deletingTaskId,
        setDeletingTaskId,
        deletingCategoryId,
        setDeletingCategoryId,
        isCreating,
        setIsCreating,
      }}
    >
      {appState === 'tasks' && deletingTaskId && (
        <ModalDelete type="task" />
      )}
      {appState === 'categories' && deletingCategoryId && (
        <ModalDelete type="category" />
      )}
      {appState === 'tasks' && isCreating && (
        <ModalTask
          type="create"
          initialName=""
          initialDescription=""
          initialCategoryId={undefined}
        />
      )}
      {appState === 'categories' && isCreating && (
        <ModalCategory
          type="create"
          initialName=""
          initialDescription=""
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};
