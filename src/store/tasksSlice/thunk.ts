import { Task } from '../../shared/types';
import { actions } from './index';
import { API } from '../../API';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const TasksThunk = {
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
  drop: createAsyncThunk(
    'tasks/drop',
    async (id: number, { dispatch }) => {
      const request = await API.Tasks.drop(id);
      if (request.ok) {
        dispatch(actions.deleteTask(id));
      }
    },
  ),
};
