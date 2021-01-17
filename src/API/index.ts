import { Category, Task } from '../shared/types';
import { createTransaction } from '../shared/methods';
import {
  InitializeResponseType,
  ResponseWithId,
  SimpleResponseType,
  UpdateCategoriesResponseType,
  UpdateTasksResponseType,
} from './types';
import { APIErrors } from '../shared/constants';


export const API = {
  App: {
    initialize: () => {
      return new Promise<InitializeResponseType>((resolve) => {
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
          resolve({ ok: true });
        };

        DBOpenRequest.onerror = () => {
          resolve({ ok: false, error: APIErrors.couldNotLoadIndexedDB });
        };
      });
    },
  },
  Tasks: {
    update: () => {
      return new Promise<UpdateTasksResponseType>((resolve) => {
        const tasks = createTransaction('Item', 'readonly').getAll();
        tasks.onsuccess = () => {
          resolve({ ok: true, data: tasks.result });
        };
        tasks.onerror = (e) => {
          resolve({ ok: false, error: e });
        };
      });
    },
    add: (task: Task) => {
      return new Promise<ResponseWithId>((resolve) => {
        const tasks = createTransaction('Item', 'readwrite');
        const request = tasks.add(task);

        request.onsuccess = () => {
          resolve({ ok: true, id: request.result });
        };

        request.onerror = (e: any) => {
          resolve({ ok: false, error: e });
        };
      });
    },
    edit: (task: Task) => {
      return new Promise<SimpleResponseType>((resolve, reject) => {
        const editTask = createTransaction('Item', 'readwrite');
        const request = editTask.put(task);

        request.onsuccess = () => {
          resolve({ ok: true });
        };

        request.onerror = () => {
          reject(Error('Что-то пошло не так'));
        };
      });
    },
    delete: (id: number) => {
      return new Promise<SimpleResponseType>((resolve, reject) => {
        const deleteTask = createTransaction('Item', 'readwrite');
        const request = deleteTask.delete(id);

        request.onsuccess = () => {
          resolve({ ok: true });
        };

        request.onerror = () => {
          reject(Error('Что-то пошло не так'));
        };
      });
    },
  },
  Categories: {
    update: () => {
      return new Promise<UpdateCategoriesResponseType>((resolve) => {
        const categories = createTransaction('Category', 'readonly').getAll();
        categories.onsuccess = () => {
          const { result } = categories;
          resolve({ ok: true, data: result });
        };
        categories.onerror = (e) => {
          resolve({ ok: false, error: e });
        };
      });
    },
    add: (category: Category) => {
      return new Promise<ResponseWithId>((resolve) => {
        const categories = createTransaction('Category', 'readwrite');
        const request = categories.add(category);

        request.onsuccess = () => {
          resolve({ ok: true, id: request.result });
        };

        request.onerror = () => {
          resolve({ ok: false, error: APIErrors.couldNotLoadIndexedDB });
        };
      });
    },
    edit: (category: Required<Category>) => {
      return new Promise<SimpleResponseType>((resolve) => {

        const categories = createTransaction('Category', 'readwrite');
        const request = categories.put(category);

        request.onsuccess = () => {
          resolve({ ok: true });
        };

        request.onerror = () => {
          resolve({ ok: false });
        };
      });
    },
    delete: (id: number) => {
      return new Promise<SimpleResponseType>((resolve) => {
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
              resolve({ ok: true });
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
