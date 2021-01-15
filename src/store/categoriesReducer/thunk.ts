import { SettersType } from '../../shared/hooks/useSetters';
import { AppDispatch } from '../index';
import { Category } from '../../shared/types';
import { API } from '../../API';
import { actions } from '.';

type ResponseType = {
  ok: boolean
  request: IDBRequest
}

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

  const add = (category: Category) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Categories.add(category) as ResponseType;
    if (request.ok) {
      dispatch(actions.addCategory({
        id: request.request.result,
        ...category,
      }));
    }
    setters.setIsLoading(false);
  };

  const put = (category: Required<Category>) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Categories.put(category) as ResponseType;
    if (request.ok) {
      dispatch(actions.editCategory(category));
    }
    setters.setIsLoading(false);
  };

  const drop = (id: number) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Categories.drop(id) as ResponseType;

    if (request.ok) {
      dispatch(actions.deleteCategory(id));
    }

    setters.setIsLoading(false);
  };

  return {
    initialize,
    add,
    put,
    drop,
  };
};
