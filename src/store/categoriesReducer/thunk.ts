import { SettersType } from '../../shared/hooks/useSetters';
import { AppDispatch } from '../index';
import { Category } from '../../shared/types';
import { API } from '../../API';
import { actions } from '.';

export const CategoriesThunk = (setters: SettersType) => {

  const addCategory = (category: Category) => (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = API.Categories.add(category);
    request.onsuccess = () => {
      dispatch(actions.addCategory(category));
      setters.setIsLoading(false);
    };

    request.onerror = () => {
      setters.setIsLoading(false);
      throw Error(JSON.stringify(request.result));
    };
  };

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
        console.log(getCategoriesRequest.result);
        dispatch(actions.setCategories(getCategoriesRequest.result));
      };
    };
  };

  return {
    addCategory,
    initialize,
  };
};
