import { FC, useEffect } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';
import { getTasks } from '../../store/tasksReducer/selectors';
import { getAppState } from '../../store/appReducer/selectors';
import { getCategories } from '../../store/categoriesReducer/selectors';
import { useIndexedDb } from '../../shared/hooks/useIndexedDb';
import './style.css';


const cn = createCn('list');


export const List: FC = () => {

  /* hooks */
  const state = useSelector(getAppState);
  const tasks = useSelector(getTasks);
  const categories = useSelector(getCategories);
  const getters = useIndexedDb();
  useEffect(() => {
    console.log(getters);
  }, [getters]);

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
