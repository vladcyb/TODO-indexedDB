import { useEffect } from 'react';

declare global {
  interface Window {
    db: IDBDatabase
  }
}


export const useIndexedDb = () => {


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
      window.db = DBOpenRequest.result;
    };

  }, []);
};
