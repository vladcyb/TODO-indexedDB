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
import { SectionType, LoadingStatusType } from '../../shared/constants';
import { Preloader } from '../../Preloader';
import './style.css';


const cn = createCn('list');

type PropsType = {
  sectionType: SectionType
}

export const List: FC<PropsType> = (
  {
    sectionType,
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
  const isTasks = sectionType === SectionType.TASKS;
  const isLoading = tasks.status === LoadingStatusType.LOADING || categories.status === LoadingStatusType.LOADING;

  return (
    <div className={cn()}>
      {isTasks ? (
        tasks.list.length ? (
          tasks.list.map((item) => (
            <ListItem
              key={item.id}
              id={item.id!}
              name={item.name}
              description={item.description}
              categoryId={item.categoryId}
              currentState={SectionType.TASKS}
            />
          ))
        ) : (
          !isLoading && (
            <div className={cn('empty')}>
              (Пусто)
            </div>
          )
        )
      ) : (
        categories.list.length ? (
          categories.list.map((item) => (
            <ListItem
              key={item.id}
              id={item.id!}
              name={item.name}
              description={item.description}
              currentState={SectionType.CATEGORIES}
            />
          ))
        ) : (
          !isLoading && (
            <div className={cn('empty')}>
              (Пусто)
            </div>
          )
        )
      )}
      {isLoading && (
          <div className={cn('preloader')}>
          <Preloader />
        </div>
      )}
    </div>
  );
};
