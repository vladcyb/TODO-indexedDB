import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getAppState } from '../../store/appSlice/selectors';
import { createCn } from 'bem-react-classname';
import { useAppDispatch } from '../../store';
import { actions as appActions } from '../../store/appSlice';
import { CurrentList } from '../../store/appSlice/types';
import { useModal } from '../../shared/hooks/useModal';
import './style.css';


const cn = createCn('header');

export const Header: FC = () => {

  /* hooks */
  const state = useSelector(getAppState);
  const dispatch = useAppDispatch();
  const modalContext = useModal();

  /* methods */
  const openTasks = () => {
    dispatch(appActions.setState({ state: CurrentList.TASKS }));
  };

  const openCategories = () => {
    dispatch(appActions.setState({ state: CurrentList.CATEGORIES }));
  };

  const handleAddClick = () => {
    modalContext.setIsCreating(true);
  };

  return (
    <div className={cn()}>
      <div className={cn('left')}>
        <span className={cn('title')}>ToDo List</span>
        <nav>
          <ul className={cn('ul')}>
            <li>
              <button
                className={cn('navBtn', { opened: state === CurrentList.TASKS })}
                onClick={openTasks}
              >
                Задачи
              </button>
            </li>
            <li>
              <button
                className={cn('navBtn', { opened: state === CurrentList.CATEGORIES })}
                onClick={openCategories}
              >
                Категории
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <button className={cn('addTask')} onClick={handleAddClick}>
        Добавить {`${state === 'TASKS' ? 'задачу' : 'категорию'}`}
      </button>
    </div>
  );
};
