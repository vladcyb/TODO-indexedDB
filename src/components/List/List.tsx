import { FC } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import { Todo } from '../../shared/types';

const cn = createCn('list');

type PropsType = {}

const todos: Todo[] = [
  { id: '1', name: 'Задача1', description: 'Описание задачи, может быть длинным', categoryId: '1' },
  { id: '2', name: 'Задача2', description: 'description for todo 2', categoryId: '1' },
  { id: '3', name: 'Задача3', description: 'description for todo 3', categoryId: '2' },
  { id: '4', name: 'Задача4', description: 'description for todo 4', categoryId: '3' },
];


export const List: FC<PropsType> = () => (
  <div className={cn()}>
    {todos.map((item) => (
      <ListItem item={item} key={item.id} />
    ))}
  </div>
);
