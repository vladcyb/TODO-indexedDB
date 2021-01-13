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

  /* methods */
  const cancelCreating = () => {
    setIsCreating(false);
  };

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
      <ModalDelete
        type="task"
        open={!!deletingTaskId}
        target="target"
        onClose={() => {

        }}
        onConfirm={() => {

        }}
      />
      {appState === 'tasks' && isCreating && (
        <ModalTask
          type="create"
          onClose={cancelCreating}
          open
          onConfirm={() => {
          }}
          initialName={''}
          initialDescription={''}
          initialCategory={undefined}
        />
      )}
      {appState === 'categories' && isCreating && (
        <ModalCategory
          type="create"
          onClose={cancelCreating}
          open
          onConfirm={() => {
          }}
          initialName={''}
          initialDescription={''}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};
