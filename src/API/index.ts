import { Category, Task } from '../shared/types';
import { createTransaction } from '../shared/methods';
import { APIErrors } from '../shared/constants';
import { LoadDataResponseType, LoadDataStateType } from './types';


export const API = {
  App: {
    loadData: () => {
      return new Promise<LoadDataResponseType>((resolve) => {
        const state: LoadDataStateType = {
          categoriesLoaded: false,
          tasksLoaded: false,
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
            state.categoriesLoaded = true;
            if (state.tasksLoaded) {
              resolve({
                ok: true,
                data: {
                  categories: getCategoriesRequest.result,
                  tasks: getTasksRequest.result,
                },
              });
            }
          };

          getCategoriesRequest.onerror = () => {
            resolve({ ok: false, error: APIErrors.couldNotLoadIndexedDB });
          };

          getTasksRequest.onsuccess = () => {
            state.tasksLoaded = true;
            if (state.categoriesLoaded) {
              resolve({
                ok: true,
                data: {
                  categories: getCategoriesRequest.result,
                  tasks: getTasksRequest.result,
                },
              });
            }
          };

          getTasksRequest.onerror = () => {
            resolve({ ok: false, error: APIErrors.couldNotLoadIndexedDB });
          };
        };

        DBOpenRequest.onerror = () => {
          resolve({ ok: false, error: APIErrors.couldNotLoadIndexedDB });
        };
      });
    },
  },
  Tasks: {
    add: (task: Task) => {
      return new Promise((resolve, reject) => {
        const tasks = createTransaction('Item', 'readwrite');
        const request = tasks.add(task);

        request.onsuccess = () => {
          resolve({ ok: true, request });
        };

        request.onerror = () => {
          reject(Error('Что-то пошло не так'));
        };
      });
    },
    edit: (task: Task) => {
      return new Promise((resolve, reject) => {
        const editTask = createTransaction('Item', 'readwrite');
        const request = editTask.put(task);

        request.onsuccess = () => {
          resolve({ ok: true, request });
        };

        request.onerror = () => {
          reject(Error('Что-то пошло не так'));
        };
      });
    },
    drop: (id: number) => {
      return new Promise((resolve, reject) => {
        const deleteTask = createTransaction('Item', 'readwrite');
        const request = deleteTask.delete(id);

        request.onsuccess = () => {
          resolve({ ok: true, request });
        };

        request.onerror = () => {
          reject(Error('Что-то пошло не так'));
        };
      });
    },
  },
  Categories: {
    add: (category: Category) => {
      return new Promise((resolve) => {
        const categories = createTransaction('Category', 'readwrite');
        const request = categories.add(category);

        request.onsuccess = () => {
          resolve({ ok: true, request });
        };

        request.onerror = () => {
          resolve({ ok: false });
        };
      });
    },
    edit: (category: Required<Category>) => {
      return new Promise((resolve) => {

        const categories = createTransaction('Category', 'readwrite');
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
        const db = window.db;
        const rootTransaction = db.transaction('Category', 'readwrite');
        const categories = rootTransaction.objectStore('Category');
        const rootRequest = categories.delete(id);

        rootRequest.onsuccess = () => {

          /* удаление categoryId из связанных тасков */
          const tasksTransaction = db.transaction('Item', 'readwrite');
          const tasks = tasksTransaction.objectStore('Item');
          const editTasksRequest = tasks.openCursor();

          editTasksRequest.onsuccess = async () => {
            const cursor = editTasksRequest.result;
            if (cursor) {
              const task: Task = cursor.value;
              if (task.categoryId === id) {
                const updateRequest = cursor.update({
                  ...task,
                  categoryId: undefined,
                } as Task);
                updateRequest.onerror = () => {
                  rootTransaction.abort();
                };
              }
              cursor.continue();
            } else {
              resolve({ ok: true, request: rootRequest });
            }
          };

          editTasksRequest.onerror = () => {
            rootTransaction.abort();
          };
        };

        rootRequest.onerror = () => {
          resolve({ ok: false });
        };
      });
    },
  },
};
