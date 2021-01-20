import React, { FC, useState } from 'react';
import { Header, List, ModalCategory, ModalDelete, ModalTask } from './components';
import {
  EditCategoryModalStateType,
  EditTaskModalStateType,
  ModalActionType,
  ModalStateType,
  SectionType,
} from './shared/constants';
import { useSelector } from 'react-redux';
import { getTasks } from './store/tasksSlice/selectors';
import { getCategories } from './store/categoriesSlice/selectors';
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

  /* selectors */
  const tasks = useSelector(getTasks);
  const categories = useSelector(getCategories);

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
    setModalState(defaultModalState);
  };

  const handleDeleteItem = (id: number) => {
    const isCategories = sectionType === SectionType.CATEGORIES;
    setModalState(() => ({
      ...defaultModalState,
      deletingTaskId: isCategories ? undefined : id,
      deletingCategoryId: isCategories ? id : undefined,
    }));
  };

  const handleEditItem = (id: number) => {
    const isCategories = sectionType === SectionType.CATEGORIES;
    setModalState(() => ({
      ...defaultModalState,
      editingTaskId: isCategories ? undefined : id,
      editingCategoryId: isCategories ? id : undefined,
    }));
  };

  const getInitialModalTaskState = (id: number): EditTaskModalStateType => {

    const task = tasks.list.find((task) => task.id === id);

    return task ? {
      categoryId: task.categoryId,
      name: task.name,
      description: task.description,
    } : {
      categoryId: undefined,
      name: '',
      description: '',
    };
  };

  const getInitialModalCategoryState = (id: number): EditCategoryModalStateType => {
    const category = categories.list.find((category) => category.id === id)!;
    return {
      name: category.name,
      description: category.description,
    };
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
          onItemDelete={handleDeleteItem}
          onItemEdit={handleEditItem}
          tasks={tasks}
          categories={categories}
        />
      </div>
      {modalState.isCreatingTask && (
        <ModalTask
          mode={ModalActionType.CREATE}
          onClose={closeModal}
          categories={categories.list}
        />
      )}
      {modalState.isCreatingCategory && (
        <ModalCategory mode={ModalActionType.CREATE} onClose={closeModal} />
      )}
      {modalState.deletingCategoryId && (
        <ModalDelete
          currentState={sectionType}
          onClose={closeModal}
          targetId={modalState.deletingCategoryId}
          categories={categories.list}
          tasks={tasks.list}
        />
      )}
      {modalState.deletingTaskId && (
        <ModalDelete
          currentState={sectionType}
          onClose={closeModal}
          targetId={modalState.deletingTaskId}
          categories={categories.list}
          tasks={tasks.list}
        />
      )}
      {modalState.editingTaskId && (
        <ModalTask
          mode={ModalActionType.EDIT}
          onClose={closeModal}
          id={modalState.editingTaskId}
          categories={categories.list}
          initialState={getInitialModalTaskState(modalState.editingTaskId)}
        />
      )}
      {modalState.editingCategoryId && (
        <ModalCategory
          mode={ModalActionType.EDIT}
          onClose={closeModal}
          id={modalState.editingCategoryId}
          initialState={getInitialModalCategoryState(modalState.editingCategoryId)}
        />
      )}
    </div>
  );
};
