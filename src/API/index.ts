import { Category, Task } from '../shared/types';
import { createTransaction } from '../shared/methods';


export const API = {
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
