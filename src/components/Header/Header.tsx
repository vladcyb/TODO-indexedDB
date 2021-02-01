import React from 'react';
import { createCn } from 'bem-react-classname';
import './style.css';

const cn = createCn('header');

type PropsType = {
  isTasks: boolean
  openTasks: () => void
  openCategories: () => void
  handleCreateTask: () => void
};

export const Header = ({
  isTasks,
  openTasks,
  openCategories,
  handleCreateTask,
}: PropsType) => (
  <div className={cn()}>
    <div className={cn('left')}>
      <span className={cn('title')}>ToDo List</span>
      <nav>
        <ul className={cn('ul')}>
          <li>
            <button
              className={cn('navBtn', { opened: isTasks })}
              onClick={openTasks}
              type="button"
            >
              Задачи
            </button>
          </li>
          <li>
            <button
              className={cn('navBtn', { opened: !isTasks })}
              onClick={openCategories}
              type="button"
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
      type="button"
    >
      Добавить
      {' '}
      {`${isTasks ? 'задачу' : 'категорию'}`}
    </button>
  </div>
);
