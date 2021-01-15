import { Category, Task } from '../shared/types';

export const API = {
  Tasks: {
    add: (task: Task) => {
      return new Promise((resolve, reject) => {
        const transaction = window.db.transaction('Item', 'readwrite');
        const tasks = transaction.objectStore('Item');
        const request = tasks.add(task);

        request.onsuccess = () => {
          resolve({ ok: true });
        };

        request.onerror = () => {
          reject(Error('Что-то пошло не так'));
        };
      });
    },
    edit: (task: Task) => {

    },
    delete: (id: number) => {

    },
  },
  Categories: {
    add: (category: Category) => {
      return new Promise((resolve) => {
        const transaction = window.db.transaction('Category', 'readwrite');
        const categories = transaction.objectStore('Category');
        const request = categories.add(category);

        request.onsuccess = () => {
          resolve({ ok: true, request });
        };

        request.onerror = () => {
          resolve({ ok: false });
        };
      });
    },
    put: (category: Required<Category>) => {
      return new Promise((resolve) => {

        const transaction = window.db.transaction('Category', 'readwrite');
        const categories = transaction.objectStore('Category');
        const request = categories.put(category);

        request.onsuccess = () => {
          resolve({ ok: true, request });
        };

        request.onerror = () => {
          resolve({ ok: false });
        };
      });
    },
    drop: (id: number) => {
      return new Promise((resolve) => {
        const transaction = window.db.transaction('Category', 'readwrite');
        const categories = transaction.objectStore('Category');
        const request = categories.delete(id);

        request.onsuccess = () => {
          resolve({ ok: true, request });
        };

        request.onerror = () => {
          resolve({ ok: false });
        };
      });
    },
  },
};
