import { FC } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import './style.css';
import { useSelector } from 'react-redux';
import { getTasks } from '../../store/todosReducer/selectors';
import { getAppState } from '../../store/appReducer/selectors';
import { getCategories } from '../../store/categoriesSlice/selectors';


const cn = createCn('list');

type PropsType = {}


export const List: FC<PropsType> = () => {

  /* hooks */
  const state = useSelector(getAppState);
  const tasks = useSelector(getTasks);
  const categories = useSelector(getCategories);

  return (
    <div className={cn()}>
      {state === 'tasks' ? (
        tasks.map((item) => (
          <ListItem item={item} key={item.id} />
        ))
      ) : (
        categories.map((item) => (
          <ListItem item={item} key={item.id} />
        ))
      )}
    </div>
  );
};
