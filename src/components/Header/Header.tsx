import { FC } from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';


const cn = createCn('header');

type PropsType = {
  isTasks: boolean
  openTasks: () => void
  openCategories: () => void
  handleCreateTask: () => void
}

export const Header: FC<PropsType> = (
  {
    isTasks,
    openTasks,
    openCategories,
    handleCreateTask,
  }) => (
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
              className={cn('navBtn', { opened: !isTasks })}
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
      onClick={handleCreateTask}
    >
      Добавить {`${isTasks ? 'задачу' : 'категорию'}`}
    </button>
  </div>
);
