import { createContext, FC, useState } from 'react';
import { ModalCategory, ModalDelete, ModalTask } from '../../Modal';
import { useSelector } from 'react-redux';
import { getAppState } from '../../../store/appSlice/selectors';
import { getTasks } from '../../../store/tasksSlice/selectors';
import { getCategories } from '../../../store/categoriesSlice/selectors';
import { ModalTargetType, ModalType } from '../../../shared/constants';
import { ModalContextType } from '../../Modal/types';

export const ModalContext = createContext<ModalContextType>(null as any);

export const ModalProvider: FC = ({ children }) => {

  /* state */
  const [deletingId, setDeletingId] = useState<undefined | number>(undefined);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<undefined | number>(undefined);

  /* hooks */
  const appState = useSelector(getAppState);
  const tasks = useSelector(getTasks);
  const categories = useSelector(getCategories);

  /* methods */
  const cancelCreating = () => {
    setIsCreating(false);
  };

  const cancelEditing = () => {
    setEditingId(undefined);
  };

  const cancelDeleting = () => {
    setDeletingId(undefined);
  };

  /* vars */
  const editingTask = tasks.find((task) => task.id === editingId);
  const editingCategory = categories.find((category) => category.id === editingId);

  return (
    <ModalContext.Provider
      value={{
        isCreating,
        setIsCreating,
        editingId,
        setDeletingId,
        deletingId,
        setEditingId,
      }}
    >
      {appState === 'tasks' && deletingId && (
        <ModalDelete type={ModalTargetType.task} onClose={cancelDeleting} />
      )}
      {appState === 'categories' && deletingId && (
        <ModalDelete type={ModalTargetType.category} onClose={cancelDeleting} />
      )}
      {appState === 'tasks' && isCreating && (
        <ModalTask
          mode={ModalType.create}
          onClose={cancelCreating}
        />
      )}
      {appState === 'categories' && isCreating && (
        <ModalCategory
          mode={ModalType.create}
          onClose={cancelCreating}
        />
      )}
      {appState === 'tasks' && editingId && (
        <ModalTask
          mode={ModalType.edit}
          initialName={editingTask!.name}
          initialDescription={editingTask!.description}
          initialCategoryId={editingTask!.categoryId}
          onClose={cancelEditing}
        />
      )}
      {appState === 'categories' && editingId && (
        <ModalCategory
          mode={ModalType.edit}
          onClose={cancelEditing}
          initialDescription={editingCategory!.description}
          initialName={editingCategory!.name}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};
