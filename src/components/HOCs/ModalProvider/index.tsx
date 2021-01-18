import { createContext, FC, useState } from 'react';
import { ModalCategory, ModalDelete, ModalTask } from '../../Modal';
import { useSelector } from 'react-redux';
import { getTasks } from '../../../store/tasksSlice/selectors';
import { getCategories } from '../../../store/categoriesSlice/selectors';
import { ModalActionType, ModalTargetType } from '../../../shared/constants';
import { ModalContextType } from './types';

export const ModalContext = createContext<ModalContextType>(null as any);

export const ModalProvider: FC = ({ children }) => {

  /* state */
  const [deletingId, setDeletingId] = useState<undefined | number>(undefined);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<undefined | number>(undefined);

  /* hooks */
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
  const editingTask = tasks.list.find((task) => task.id === editingId);
  const editingCategory = categories.list.find((category) => category.id === editingId);
  // const isTasks = appState === 'TASKS';
  // const isCategories = appState === 'CATEGORIES';

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
      {/*{isTasks && deletingId && (*/}
      {/*  <ModalDelete type={ModalTargetType.TASK} onClose={cancelDeleting} />*/}
      {/*)}*/}
      {/*{isCategories && deletingId && (*/}
      {/*  <ModalDelete type={ModalTargetType.CATEGORY} onClose={cancelDeleting} />*/}
      {/*)}*/}
      {/*{isTasks && isCreating && (*/}
      {/*  <ModalTask*/}
      {/*    mode={ModalActionType.CREATE}*/}
      {/*    onClose={cancelCreating}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{isCategories && isCreating && (*/}
      {/*  <ModalCategory*/}
      {/*    mode={ModalActionType.CREATE}*/}
      {/*    onClose={cancelCreating}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{isTasks && editingId && (*/}
      {/*  <ModalTask*/}
      {/*    mode={ModalActionType.EDIT}*/}
      {/*    initialName={editingTask!.name}*/}
      {/*    initialDescription={editingTask!.description}*/}
      {/*    initialCategoryId={editingTask!.categoryId}*/}
      {/*    onClose={cancelEditing}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{isCategories && editingId && (*/}
      {/*  <ModalCategory*/}
      {/*    mode={ModalActionType.EDIT}*/}
      {/*    onClose={cancelEditing}*/}
      {/*    initialDescription={editingCategory!.description}*/}
      {/*    initialName={editingCategory!.name}*/}
      {/*  />*/}
      {/*)}*/}
      {children}
    </ModalContext.Provider>
  );
};
