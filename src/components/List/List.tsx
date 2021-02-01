import React, { useEffect } from 'react';
import { createCn } from 'bem-react-classname';
import { ListItem } from './ListItem';
import { useAppDispatch } from '../../store';
import { AppThunk } from '../../store/appSlice/thunk';
import { CategoriesThunk } from '../../store/categoriesSlice/thunk';
import { TasksThunk } from '../../store/tasksSlice/thunk';
import { LoadingStatusType, SectionType } from '../../shared/constants';
// import { Preloader } from '../../Preloader';
import { StateType as Tasks } from '../../store/tasksSlice/types';
import { StateType as Categories } from '../../store/categoriesSlice/types';
import './style.css';

const cn = createCn('list');

type PropsType = {
  sectionType: SectionType
  onItemDelete: (id: number) => void
  onItemEdit: (id: number) => void
  categories: Categories
  tasks: Tasks
};

export const List = ({
  sectionType,
  onItemDelete,
  onItemEdit,
  categories,
  tasks,
}: PropsType) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* vars */
  const isTasks = sectionType === SectionType.TASKS;
  const isLoading = tasks.status === LoadingStatusType.LOADING
    || categories.status === LoadingStatusType.LOADING;

  /* methods */
  const getCategoryName = (id: number | undefined) => {
    if (!id) {
      return '';
    }
    return categories.list.find((category) => category.id === id)?.name;
  };

  const getList = () => {
    if (isTasks) {
      if (!isLoading && !tasks.list.length) {
        return (
          <div className={cn('empty')}>
            (Пусто)
          </div>
        );
      }
      return (
        tasks.list.map((item) => (
          <ListItem
            key={item.id}
            id={item.id!}
            name={item.name}
            description={item.description}
            categoryName={getCategoryName(item.categoryId)}
            onEdit={onItemEdit}
            onDelete={onItemDelete}
          />
        ))
      );
    }
    if (!isLoading && !categories.list.length) {
      return (
        <div className={cn('empty')}>
          (Пусто)
        </div>
      );
    }
    return (
      categories.list.map((item) => (
        <ListItem
          key={item.id}
          id={item.id!}
          name={item.name}
          description={item.description}
          onDelete={onItemDelete}
          onEdit={onItemEdit}
        />
      ))
    );
  };

  return (
    <div className={cn()}>
      {getList()}
    </div>
  );
};
