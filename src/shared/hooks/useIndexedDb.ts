import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { useSetters } from './useSetters';
import { CategoriesThunk } from '../../store/categoriesReducer/thunk';

declare global {
  interface Window {
    db: IDBDatabase
  }
}


export const useIndexedDb = () => {


  const dispatch = useAppDispatch();
  const [getters, setters] = useSetters();
  const thunk = CategoriesThunk(setters);

  useEffect(() => {

    const DBOpenRequest = window.indexedDB.open('toDoList', 1);

    DBOpenRequest.onupgradeneeded = () => {
      const db = DBOpenRequest.result;
      if (!db.objectStoreNames.contains('Category')) {
        db.createObjectStore('Category', { keyPath: 'Id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('Item')) {
        db.createObjectStore('Item', { keyPath: 'Id', autoIncrement: true });
      }
    };

    DBOpenRequest.onsuccess = () => {
      const db = DBOpenRequest.result;
      window.db = db;
      setters.setIsLoading(true);
      const getTransaction = db.transaction('Category', 'readwrite');
      const categories = getTransaction.objectStore('Category')
      const getCategoriesRequest = categories.getAll()
      getCategoriesRequest.onsuccess = () => {
        console.log(getCategoriesRequest.result);
      }
    };

  }, []);
};
