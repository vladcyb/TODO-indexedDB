import { Dispatch, FC, SetStateAction, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { CurrentState, ModalActionType } from '../../shared/constants';
import { ModalCategory, ModalTask } from '../Modal';
import './style.css';


const cn = createCn('header');

type PropsType = {
  state: CurrentState
  setState: Dispatch<SetStateAction<CurrentState>>
}

type StateType = {
  isCreatingTask: boolean
  isCreatingCategory: boolean
}

export const Header: FC<PropsType> = (
  {
    state,
    setState,
  }) => {

  /* state */
  const [modalState, setModalState] = useState<StateType>({
    isCreatingTask: false,
    isCreatingCategory: false,
  });

  /* methods */
  const openTasks = () => {
    setState(CurrentState.TASKS);
  };

  const openCategories = () => {
    setState(CurrentState.CATEGORIES);
  };

  const startCreatingTask = () => {
    setModalState({
      isCreatingTask: state === CurrentState.TASKS,
      isCreatingCategory: state === CurrentState.CATEGORIES,
    });
  };

  const stopCreating = () => {
    setModalState({
      isCreatingTask: false,
      isCreatingCategory: false,
    });
  };

  /* vars */
  const isTasks = state === CurrentState.TASKS;
  const isCategories = state === CurrentState.CATEGORIES;

  return (
    <div className={cn()}>
      <div className={cn('left')}>
        <span className={cn('title')}>ToDo List</span>
        <nav>
          <ul className={cn('ul')}>
            <li>
              <button
                className={cn('navBtn', { opened: isTasks })}
                onClick={openTasks}
              >
                Задачи
              </button>
            </li>
            <li>
              <button
                className={cn('navBtn', { opened: isCategories })}
                onClick={openCategories}
              >
                Категории
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className={cn('addTask')}
        onClick={startCreatingTask}
      >
        Добавить {`${isTasks ? 'задачу' : 'категорию'}`}
      </button>
      {modalState.isCreatingTask && (
        <ModalTask mode={ModalActionType.CREATE} onClose={stopCreating} />
      )}
      {modalState.isCreatingCategory && (
        <ModalCategory mode={ModalActionType.CREATE} onClose={stopCreating} />
      )}
    </div>
  );
};
