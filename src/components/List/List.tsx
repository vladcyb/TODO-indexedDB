import { FC, useEffect } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';
import { getTasks } from '../../store/tasksSlice/selectors';
import { getAppLoading, getAppState } from '../../store/appSlice/selectors';
import { getCategories } from '../../store/categoriesSlice/selectors';
import { Preloader } from '../../Preloader';
import { useAppDispatch } from '../../store';
import { AppThunk } from '../../store/appSlice/thunk';
import { CategoriesThunk } from '../../store/categoriesSlice/thunk';
import { TasksThunk } from '../../store/tasksSlice/thunk';
import './style.css';


const cn = createCn('list');


export const List: FC = () => {

  /* hooks */
  const state = useSelector(getAppState);
  const isLoading = useSelector(getAppLoading);
  const tasks = useSelector(getTasks);
  const categories = useSelector(getCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function load() {
      try {
        await dispatch(AppThunk.initialize());
        await dispatch(TasksThunk.update());
        await dispatch(CategoriesThunk.update());
      }catch(e) {
        console.log(e);
      }
    }
    load();
    // eslint-disable-next-line
  }, []);


  return (
    <div className={cn()}>
      {isLoading ? (
        <div className={cn('preloader')}>
          <Preloader />
        </div>
      ) : (
        state === 'TASKS' ? (
          tasks.map((item) => (
            <ListItem {...item} key={item.id} />
          ))
        ) : (
          categories.map((item) => (
            <ListItem {...item} key={item.id} />
          ))
        ))}
    </div>
  );
};
