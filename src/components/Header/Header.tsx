import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { getAppState } from '../../store/appSlice/selectors';
import { createCn } from 'bem-react-classname';
import { useAppDispatch } from '../../store';
import { actions as appActions } from '../../store/appSlice';
import { ModalContext } from '../HOCs/ModalProvider';
import './style.css';
import { CurrentList } from '../../store/appSlice/types';


const cn = createCn('header');

export const Header: FC = () => {

  /* hooks */
  const state = useSelector(getAppState);
  const dispatch = useAppDispatch();
  const modalContext = useContext(ModalContext);

  /* methods */
  const openTasks = () => {
    dispatch(appActions.setState({ state: CurrentList.tasks }));
  };

  const openCategories = () => {
    dispatch(appActions.setState({ state: CurrentList.categories }));
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
                className={cn('navBtn', { opened: state === CurrentList.tasks })}
                onClick={openTasks}
              >
                Задачи
              </button>
            </li>
            <li>
              <button
                className={cn('navBtn', { opened: state === CurrentList.categories })}
                onClick={openCategories}
              >
                Категории
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <button className={cn('addTask')} onClick={handleAddClick}>
        Добавить {`${state === 'tasks' ? 'задачу' : 'категорию'}`}
      </button>
    </div>
  );
};
