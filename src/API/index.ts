import { Task } from '../shared/types';

export const API = {
  Tasks: {
    add: (task: Task) => {
      const transaction = window.db.transaction('Item', 'readwrite');
      const tasks = transaction.objectStore('Item');
      return tasks.add(task);
    },
    edit: (task: Task) => {

    },
    delete: (id: string) => {

    },
  },
};
