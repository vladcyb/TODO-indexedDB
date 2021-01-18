import { Dispatch, FC, SetStateAction } from 'react';
import { createCn } from 'bem-react-classname';
import { useModal } from '../../shared/hooks/useModal';
import './style.css';
import { CurrentList } from '../../shared/constants';


const cn = createCn('header');

type PropsType = {
  state: CurrentList
  setState: Dispatch<SetStateAction<CurrentList>>
}

export const Header: FC<PropsType> = (
  {
    state,
    setState,
  }) => {

  /* hooks */
  const modalContext = useModal();

  /* methods */
  const openTasks = () => {
    setState(CurrentList.TASKS);
  };

  const openCategories = () => {
    setState(CurrentList.CATEGORIES);
  };

  const handleAddClick = () => {
    modalContext.setIsCreating(true);
  };

  /* vars */
  const isTasks = state === CurrentList.TASKS;
  const isCategories = state === CurrentList.CATEGORIES;

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
      <button className={cn('addTask')} onClick={handleAddClick}>
        Добавить {`${isTasks ? 'задачу' : 'категорию'}`}
      </button>
    </div>
  );
};
