import { FC, useEffect } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import { useAppDispatch } from '../../store';
import { AppThunk } from '../../store/appSlice/thunk';
import { CategoriesThunk } from '../../store/categoriesSlice/thunk';
import { TasksThunk } from '../../store/tasksSlice/thunk';
import { LoadingStatusType, SectionType } from '../../shared/constants';
import { Preloader } from '../../Preloader';
import { StateType as Tasks } from '../../store/tasksSlice/types';
import { StateType as Categories } from '../../store/categoriesSlice/types';
import './style.css';


const cn = createCn('list');

type PropsType = {
  sectionType: SectionType
  handleDelete: (id: number) => void
  handleEdit: (id: number) => void
  categories: Categories
  tasks: Tasks
}

export const List: FC<PropsType> = (
  {
    sectionType,
    handleDelete,
    handleEdit,
    categories,
    tasks,
  }) => {

  /* hooks */
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

  /* methods */
  const getCategoryName = (id: number | undefined) => {
    if (!id) {
      return '';
    }
    return categories.list.find((category) => category.id === id)?.name;
  };

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
              categoryName={getCategoryName(item.categoryId)}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
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
              handleDelete={handleDelete}
              handleEdit={handleEdit}
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
