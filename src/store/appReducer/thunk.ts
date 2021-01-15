import { SettersType } from '../../shared/hooks/useSetters';
import { AppDispatch } from '../index';
import { createTransaction } from '../../shared/methods';
import { actions } from '../';


type UpdateStateType = {
  tasksLoaded: boolean
  categoriesLoaded: boolean
}

const allEqualsTrue = (state: UpdateStateType) => {
  return Object.values(state).every((value) => value);
};

export const AppThunk = (setters: SettersType) => {

  const update = () => (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const state: UpdateStateType = {
      tasksLoaded: false,
      categoriesLoaded: false,
    };

    const DBOpenRequest = window.indexedDB.open('toDoList', 1);

    DBOpenRequest.onupgradeneeded = () => {
      const db = DBOpenRequest.result;
      if (!db.objectStoreNames.contains('Category')) {
        db.createObjectStore('Category', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('Item')) {
        db.createObjectStore('Item', { keyPath: 'id', autoIncrement: true });
      }
    };

    DBOpenRequest.onsuccess = () => {
      window.db = DBOpenRequest.result;
      const categories = createTransaction('Category', 'readonly');
      const tasks = createTransaction('Item', 'readonly');
      const getCategoriesRequest = categories.getAll();
      const getTasksRequest = tasks.getAll();

      getCategoriesRequest.onsuccess = () => {
        dispatch(actions.categories.setCategories(getCategoriesRequest.result));
        state.categoriesLoaded = true;
        if (allEqualsTrue(state)) {
          setters.setIsLoading(false);
        }
      };

      getTasksRequest.onsuccess = () => {
        dispatch(actions.tasks.setTasks(getTasksRequest.result));
        state.tasksLoaded = true;
        if (allEqualsTrue(state)) {
          setters.setIsLoading(false);
        }
      };
    };
  };

  return {
    update,
  };
};
