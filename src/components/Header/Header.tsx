import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getAppState } from '../../store/appReducer/selectors';
import { createCn } from 'bem-react-classname';
import { useAppDispatch } from '../../store';
import { actions as appActions } from '../../store/appReducer';
import './style.css';


const cn = createCn('header');

export const Header: FC = () => {

  /* hooks */
  const state = useSelector(getAppState);
  const dispatch = useAppDispatch();

  /* methods */
  const openTasks = () => {
    dispatch(appActions.setState({ state: 'tasks' }));
  };

  const openCategories = () => {
    dispatch(appActions.setState({ state: 'categories' }));
  };

  return (
    <div className={cn()}>
      <div className={cn('left')}>
        <span className={cn('title')}>ToDo List</span>
        <nav>
          <ul className={cn('ul')}>
            <li>
              <button
                className={cn('navBtn', { opened: state === 'tasks' })}
                onClick={openTasks}
              >
                Задачи
              </button>
            </li>
            <li>
              <button
                className={cn('navBtn', { opened: state === 'categories' })}
                onClick={openCategories}
              >
                Категории
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <button className={cn('addTask')}>
        Добавить задачу
      </button>
    </div>
  );
};
