import React, { FC, useState } from 'react';
import { Header, List, ModalCategory, ModalTask } from './components';
import './App.css';
import { ModalActionType, ModalStateType, SectionType } from './shared/constants';


export const App: FC = () => {

  /* state */
  const [sectionType, setSectionType] = useState<SectionType>(SectionType.TASKS);
  const [modalState, setModalState] = useState<ModalStateType>({
    isCreatingTask: false,
    isCreatingCategory: false,
  });

  /* methods */
  const openTasks = () => {
    setSectionType(SectionType.TASKS);
  };

  const openCategories = () => {
    setSectionType(SectionType.CATEGORIES);
  };

  const handleCreateTask = () => {
    setModalState({
      isCreatingTask: sectionType === SectionType.TASKS,
      isCreatingCategory: sectionType === SectionType.CATEGORIES,
    });
  };

  const stopCreating = () => {
    setModalState({
      isCreatingTask: false,
      isCreatingCategory: false,
    });
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
        <List sectionType={sectionType} />
      </div>
      {modalState.isCreatingTask && (
        <ModalTask mode={ModalActionType.CREATE} onClose={stopCreating} />
      )}
      {modalState.isCreatingCategory && (
        <ModalCategory mode={ModalActionType.CREATE} onClose={stopCreating} />
      )}
    </div>
  );
};
