import { useEffect } from 'react';

export const useIndexedDb = () => {
  useEffect(() => {

    const db = window.indexedDB.open('toDoList', 1);

    db.onsuccess = (e: any) => {
      console.log(e);
    }

  }, []);
};
