import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../shared/types';
import { actions } from './index';
import { API } from '../../API';

export const TasksThunk = {
  update: createAsyncThunk(
    'tasks/update',
    async (arg, { dispatch }) => {
      const result = await API.Tasks.update();
      if (result.ok) {
        dispatch(actions.setTasks(result.data));
      }
    },
  ),
  add: createAsyncThunk(
    'tasks/add',
    async (task: Task, { dispatch }) => {
      const request = await API.Tasks.add(task);
      if (request.ok) {
        dispatch(actions.add({
          id: request.id as number,
          ...task,
        }));
      }
    },
  ),
  edit: createAsyncThunk(
    'tasks/edit',
    async (task: Required<Task>, { dispatch }) => {
      const request = await API.Tasks.edit(task);
      if (request.ok) {
        dispatch(actions.edit(task));
      }
    },
  ),
  delete: createAsyncThunk(
    'tasks/drop',
    async (id: number, { dispatch }) => {
      const request = await API.Tasks.delete(id);
      if (request.ok) {
        dispatch(actions.deleteTask(id));
      }
    },
  ),
};
