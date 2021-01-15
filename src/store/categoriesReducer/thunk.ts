import { SettersType } from '../../shared/hooks/useSetters';
import { AppDispatch } from '../index';
import { Category } from '../../shared/types';
import { API } from '../../API';
import { actions } from '.';

export const CategoriesThunk = (setters: SettersType) => {

  const initialize = () => (dispatch: AppDispatch) => {
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
      const db = DBOpenRequest.result;
      window.db = db;
      setters.setIsLoading(true);
      const getTransaction = db.transaction('Category', 'readwrite');
      const categories = getTransaction.objectStore('Category');
      const getCategoriesRequest = categories.getAll();
      getCategoriesRequest.onsuccess = () => {
        dispatch(actions.setCategories(getCategoriesRequest.result));
      };
    };
  };

  const add = (category: Category) => (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = API.Categories.add(category);
    request.onsuccess = () => {
      dispatch(actions.addCategory({
        id: request.result as number,
        ...category,
      }));
      setters.setIsLoading(false);
    };

    request.onerror = () => {
      setters.setIsLoading(false);
    };
  };

  const put = (category: Required<Category>) => (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = API.Categories.put(category);

    request.onsuccess = () => {
      setters.setIsLoading(false);
      dispatch(actions.editCategory(category));
    };

    request.onerror = () => {
      setters.setIsLoading(false);
    };
  };

  const drop = (id: number) => (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = API.Categories.drop(id);

    request.onsuccess = () => {
      setters.setIsLoading(false);
      dispatch(actions.deleteCategory(id));
    };

    request.onerror = () => {
      setters.setIsLoading(false);
    };
  };

  return {
    initialize,
    add,
    put,
    drop,
  };
};
