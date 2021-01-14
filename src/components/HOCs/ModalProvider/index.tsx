import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';
import { ModalCategory, ModalDelete, ModalTask } from '../../Modal';
import { useSelector } from 'react-redux';
import { getAppState } from '../../../store/appReducer/selectors';
import { getTasks } from '../../../store/tasksReducer/selectors';
import { getCategories } from '../../../store/categoriesReducer/selectors';
import { ModalTargetType, Mode } from '../../../shared/constants';

export type ModalContextType = {
  deletingTaskId?: string
  deletingCategoryId?: string
  setDeletingCategoryId?: Dispatch<SetStateAction<string>>
  setDeletingTaskId?: Dispatch<SetStateAction<string>>
  isCreating?: boolean
  setIsCreating?: Dispatch<SetStateAction<boolean>>
  editingTaskId?: string
  setEditingTaskId?: Dispatch<SetStateAction<string>>
  editingCategoryId?: string
  setEditingCategoryId?: Dispatch<SetStateAction<string>>
}

export const ModalContext = createContext<ModalContextType>({});

export const ModalProvider: FC = ({ children }) => {

  /* state */
  const [deletingCategoryId, setDeletingCategoryId] = useState('');
  const [deletingTaskId, setDeletingTaskId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState('');

  /* hooks */
  const appState = useSelector(getAppState);
  const tasks = useSelector(getTasks);
  const categories = useSelector(getCategories);

  /* methods */
  const cancelCreating = () => {
    setIsCreating(false);
  };

  const cancelTaskEditing = () => {
    setEditingTaskId('');
  };

  const cancelCategoryEditing = () => {
    setEditingCategoryId('');
  };

  const cancelCategoryDeleting = () => {
    setDeletingCategoryId('');
  };

  const cancelTaskDeleting = () => {
    setDeletingTaskId('');
  };

  /* vars */
  const editingTask = tasks.find((task) => task.id === editingTaskId);
  const editingCategory = categories.find((category) => category.id === editingCategoryId);

  return (
    <ModalContext.Provider
      value={{
        deletingTaskId,
        setDeletingTaskId,
        deletingCategoryId,
        setDeletingCategoryId,
        isCreating,
        setIsCreating,
        editingTaskId,
        setEditingTaskId,
        editingCategoryId,
        setEditingCategoryId,
      }}
    >
      {appState === 'tasks' && deletingTaskId && (
        <ModalDelete type={ModalTargetType.task} onClose={cancelTaskDeleting} />
      )}
      {appState === 'categories' && deletingCategoryId && (
        <ModalDelete type={ModalTargetType.category} onClose={cancelCategoryDeleting} />
      )}
      {appState === 'tasks' && isCreating && (
        <ModalTask
          mode={Mode.create}
          onClose={cancelCreating}
        />
      )}
      {appState === 'categories' && isCreating && (
        <ModalCategory
          mode={Mode.create}
          onClose={cancelCreating}
        />
      )}
      {appState === 'tasks' && editingTaskId && (
        <ModalTask
          mode={Mode.edit}
          initialName={editingTask!.name}
          initialDescription={editingTask!.description}
          initialCategoryId={editingTask!.categoryId}
          onClose={cancelTaskEditing}
        />
      )}
      {appState === 'categories' && editingCategoryId && (
        <ModalCategory
          mode={Mode.edit}
          onClose={cancelCategoryEditing}
          initialDescription={editingCategory!.description}
          initialName={editingCategory!.name}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};
