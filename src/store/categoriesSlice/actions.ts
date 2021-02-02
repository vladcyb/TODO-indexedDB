import { createAction } from '@reduxjs/toolkit';
import { Category, Task } from '../../shared/types';

const prefix = 'categories';

export const actions = {
  add: createAction<Partial<Task>>(`${prefix}/add`),
  delete: createAction<number>(`${prefix}/delete`),
  edit: createAction<Required<Category>>(`${prefix}/edit`),
  set: createAction<Category[]>(`${prefix}/set`),
};
