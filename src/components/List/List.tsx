import { FC, useEffect } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';
import { getTasks } from '../../store/tasksSlice/selectors';
import { getCategories } from '../../store/categoriesSlice/selectors';
import { useAppDispatch } from '../../store';
import { AppThunk } from '../../store/appSlice/thunk';
import { CategoriesThunk } from '../../store/categoriesSlice/thunk';
import { TasksThunk } from '../../store/tasksSlice/thunk';
import './style.css';
import { CurrentList, StatusType } from '../../shared/constants';
import { Preloader } from '../../Preloader';


const cn = createCn('list');

type PropsType = {
  state: CurrentList
}

export const List: FC<PropsType> = (
  {
    state,
  }) => {

  /* hooks */
  const tasks = useSelector(getTasks);
  const categories = useSelector(getCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function load() {
      try {
        await dispatch(AppThunk.initialize());
        await dispatch(TasksThunk.update());
        await dispatch(CategoriesThunk.update());
      } catch (e) {
        console.log(e);
      }
    }

    load();
    // eslint-disable-next-line
  }, []);


  return (
    <div className={cn()}>
      {state === CurrentList.TASKS ? (
        tasks.list.map((item) => (
          <ListItem {...item} key={item.id} />
        ))
      ) : (
        categories.list.map((item) => (
          <ListItem {...item} key={item.id} />
        ))
      )}
      {(tasks.status === StatusType.LOADING || categories.status === StatusType.LOADING) && (
        <div className={cn('preloader')}>
          <Preloader />
        </div>
      )}
    </div>
  );
};
