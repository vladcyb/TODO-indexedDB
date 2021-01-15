import { SettersType } from '../../shared/hooks/useSetters';
import { AppDispatch } from '../index';
import { createTransaction } from '../../shared/methods';
import { actions } from '../';

export const AppThunk = (setters: SettersType) => {

  const initialize = () => (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
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
        setters.setIsLoading(false);
      };

      getTasksRequest.onsuccess = () => {
        dispatch(actions.tasks.setTasks(getTasksRequest.result));
        setters.setIsLoading(false);
      };
    };
  };

  return {
    initialize,
  };
};
