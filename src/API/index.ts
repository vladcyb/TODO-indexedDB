import { Category, Task } from '../shared/types';
import { createTransaction } from '../shared/methods';
import {
  InitializeResponseType,
  ResponseWithId,
  SimpleResponseType,
  UpdateCategoriesResponseType,
  UpdateTasksResponseType,
} from './types';
import { APIErrors, timeout } from '../shared/constants';

export const API = {
  App: {
    initialize: () => new Promise<InitializeResponseType>((resolve) => {
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
        setTimeout(() => {
          resolve({ ok: true });
        }, timeout);
      };

      DBOpenRequest.onerror = () => {
        resolve({ ok: false, error: APIErrors.couldNotLoadIndexedDB });
      };
    }),
  },
  Tasks: {
    update: () => new Promise<UpdateTasksResponseType>((resolve) => {
      const tasks = createTransaction('Item', 'readonly').getAll();
      tasks.onsuccess = () => {
        setTimeout(() => {
          resolve({ ok: true, data: tasks.result });
        }, timeout);
      };
      tasks.onerror = (e) => {
        resolve({ ok: false, error: e });
      };
    }),
    add: (task: Task) => new Promise<ResponseWithId>((resolve) => {
      const tasks = createTransaction('Item', 'readwrite');
      const request = tasks.add(task);

      request.onsuccess = () => {
        setTimeout(() => {
          resolve({ ok: true, id: request.result });
        }, timeout);
      };

      request.onerror = (e: any) => {
        resolve({ ok: false, error: e });
      };
    }),
    edit: (task: Task) => new Promise<SimpleResponseType>((resolve, reject) => {
      const editTask = createTransaction('Item', 'readwrite');
      const request = editTask.put(task);

      request.onsuccess = () => {
        setTimeout(() => {
          resolve({ ok: true });
        }, timeout);
      };

      request.onerror = () => {
        reject(Error('Что-то пошло не так'));
      };
    }),
    delete: (id: number) => new Promise<SimpleResponseType>((resolve, reject) => {
      const deleteTask = createTransaction('Item', 'readwrite');
      const request = deleteTask.delete(id);

      request.onsuccess = () => {
        setTimeout(() => {
          resolve({ ok: true });
        }, timeout);
      };

      request.onerror = () => {
        reject(Error('Что-то пошло не так'));
      };
    }),
  },
  Categories: {
    update: () => new Promise<UpdateCategoriesResponseType>((resolve) => {
      const categories = createTransaction('Category', 'readonly').getAll();
      categories.onsuccess = () => {
        const { result } = categories;
        setTimeout(() => {
          resolve({ ok: true, data: result });
        }, timeout);
      };
      categories.onerror = (e) => {
        resolve({ ok: false, error: e });
      };
    }),
    add: (category: Category) => new Promise<ResponseWithId>((resolve) => {
      const categories = createTransaction('Category', 'readwrite');
      const request = categories.add(category);

      request.onsuccess = () => {
        setTimeout(() => {
          resolve({ ok: true, id: request.result });
        }, timeout);
      };

      request.onerror = () => {
        resolve({ ok: false, error: APIErrors.couldNotLoadIndexedDB });
      };
    }),
    edit: (category: Required<Category>) => new Promise<SimpleResponseType>((resolve) => {
      const categories = createTransaction('Category', 'readwrite');
      const request = categories.put(category);

      request.onsuccess = () => {
        setTimeout(() => {
          resolve({ ok: true });
        }, timeout);
      };

      request.onerror = () => {
        resolve({ ok: false });
      };
    }),
    delete: (id: number) => new Promise<SimpleResponseType>((resolve) => {
      const { db } = window;
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
            setTimeout(() => {
              resolve({ ok: true });
            }, timeout);
          }
        };

        editTasksRequest.onerror = () => {
          rootTransaction.abort();
        };
      };

      rootRequest.onerror = () => {
        resolve({ ok: false });
      };
    }),
  },
};
