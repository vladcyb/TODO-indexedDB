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
import { CurrentState, StatusType } from '../../shared/constants';
import { Preloader } from '../../Preloader';
import './style.css';


const cn = createCn('list');

type PropsType = {
  state: CurrentState
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

  /* vars */
  const isTasks = state === CurrentState.TASKS;

  return (
    <div className={cn()}>
      {isTasks ? (
        tasks.list.map((item) => (
          <ListItem
            key={item.id}
            id={item.id!}
            name={item.name}
            description={item.description}
            categoryId={item.categoryId}
            currentState={CurrentState.TASKS}
          />
        ))
      ) : (
        categories.list.map((item) => (
          <ListItem
            key={item.id}
            id={item.id!}
            name={item.name}
            description={item.description}
            currentState={CurrentState.CATEGORIES}
          />
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
