import { Category, Task } from '../shared/types';

export const API = {
  Tasks: {
    add: (task: Task) => {
      const transaction = window.db.transaction('Item', 'readwrite');
      const tasks = transaction.objectStore('Item');
      return tasks.add(task);
    },
    edit: (task: Task) => {

    },
    delete: (id: number) => {

    },
  },
  Categories: {
    add: (category: Category) => {
      const transaction = window.db.transaction('Category', 'readwrite');
      const categories = transaction.objectStore('Category');
      return categories.add(category);
    },
    put: (category: Required<Category>) => {
      const transaction = window.db.transaction('Category', 'readwrite')
      const categories = transaction.objectStore('Category');
      return categories.put(category);
    },
  },
};
