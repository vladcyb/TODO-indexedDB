import { FC, useEffect, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';
import { getTasks } from '../../store/tasksSlice/selectors';
import { getCategories } from '../../store/categoriesSlice/selectors';
import { useAppDispatch } from '../../store';
import { AppThunk } from '../../store/appSlice/thunk';
import { CategoriesThunk } from '../../store/categoriesSlice/thunk';
import { TasksThunk } from '../../store/tasksSlice/thunk';
import { CurrentList, ModalTargetType, StatusType } from '../../shared/constants';
import { Preloader } from '../../Preloader';
import './style.css';


const cn = createCn('list');

type PropsType = {
  state: CurrentList
}

export const List: FC<PropsType> = (
  {
    state,
  }) => {

  /* state */
  const [deletingId, setDeletingId] = useState<undefined | number>(undefined);

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
  const isTasks = state === CurrentList.TASKS;
  const isCategories = state === CurrentList.CATEGORIES;

  /* methods */
  const cancelDelete = () => {

  };

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
          />
        ))
      ) : (
        categories.list.map((item) => (
          <ListItem
            key={item.id}
            id={item.id!}
            name={item.name}
            description={item.description}
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
