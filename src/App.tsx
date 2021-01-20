import React, { FC, useState } from 'react';
import { Header, List, ModalCategory, ModalDelete, ModalTask } from './components';
import { ModalActionType, ModalStateType, SectionType } from './shared/constants';
import './App.css';

const defaultModalState: ModalStateType = {
  isCreatingTask: false,
  isCreatingCategory: false,
  editingCategoryId: undefined,
  editingTaskId: undefined,
  deletingCategoryId: undefined,
  deletingTaskId: undefined,
};

export const App: FC = () => {

  /* state */
  const [sectionType, setSectionType] = useState<SectionType>(SectionType.TASKS);
  const [modalState, setModalState] = useState<ModalStateType>(defaultModalState);

  /* methods */
  const openTasks = () => {
    setSectionType(SectionType.TASKS);
  };

  const openCategories = () => {
    setSectionType(SectionType.CATEGORIES);
  };

  const handleCreateTask = () => {
    setModalState(() => ({
      ...defaultModalState,
      isCreatingTask: sectionType === SectionType.TASKS,
      isCreatingCategory: sectionType === SectionType.CATEGORIES,
    }));
  };

  const closeModal = () => {
    setModalState(defaultModalState)
  }

  const handleDelete = (id: number) => {
    const isCategories = sectionType === SectionType.CATEGORIES;
    setModalState(() => ({
      ...defaultModalState,
      deletingTaskId: isCategories ? undefined : id,
      deletingCategoryId: isCategories ? id : undefined,
    }));
  };

  const handleEdit = (id: number) => {
    const isCategories = sectionType === SectionType.CATEGORIES;
    setModalState(() => ({
      ...defaultModalState,
      editingTaskId: isCategories ? undefined : id,
      editingCategoryId: isCategories ? id : undefined,
    }));
  };


  return (
    <div className="app">
      <Header
        isTasks={sectionType === SectionType.TASKS}
        openCategories={openCategories}
        openTasks={openTasks}
        handleCreateTask={handleCreateTask}
      />
      <div className="app__listWrapper">
        <List
          sectionType={sectionType}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
      {modalState.isCreatingTask && (
        <ModalTask mode={ModalActionType.CREATE} onClose={closeModal} />
      )}
      {modalState.isCreatingCategory && (
        <ModalCategory mode={ModalActionType.CREATE} onClose={closeModal} />
      )}
      {modalState.deletingCategoryId && (
        <ModalDelete
          currentState={sectionType}
          onClose={closeModal}
          targetId={modalState.deletingCategoryId}
        />
      )}
      {modalState.deletingTaskId && (
        <ModalDelete
          currentState={sectionType}
          onClose={closeModal}
          targetId={modalState.deletingTaskId}
        />
      )}
      {modalState.editingTaskId && (
        <ModalTask
          mode={ModalActionType.EDIT}
          onClose={closeModal}
          id={modalState.editingTaskId}
          // initialName="" // TODO
          // initialCategoryId={undefined}
          // initialDescription=""
        />
      )}
      {modalState.editingCategoryId && (
        <ModalCategory
          mode={ModalActionType.EDIT}
          onClose={closeModal}
          // id={modalState.editingCategoryId} // TODO
          // initialName=""
          // initialDescription=""
        />
      )}
    </div>
  );
};
