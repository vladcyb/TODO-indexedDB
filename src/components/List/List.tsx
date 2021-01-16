import { FC } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';
import { getTasks } from '../../store/tasksSlice/selectors';
import { getAppState } from '../../store/appSlice/selectors';
import { getCategories } from '../../store/categoriesSlice/selectors';
import { useIndexedDb } from '../../shared/hooks/useIndexedDb';
import { Preloader } from '../../Preloader';
import './style.css';


const cn = createCn('list');


export const List: FC = () => {

  /* hooks */
  const state = useSelector(getAppState);
  const tasks = useSelector(getTasks);
  const categories = useSelector(getCategories);
  const getters = useIndexedDb();


  return (
    <div className={cn()}>
      {getters.isLoading && (
        <div className={cn('preloader')}>
          <Preloader />
        </div>
      )}
      {state === 'tasks' ? (
        tasks.map((item) => (
          <ListItem {...item} key={item.id} />
        ))
      ) : (
        categories.map((item) => (
          <ListItem {...item} key={item.id} />
        ))
      )}
    </div>
  );
};
