import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddTaskPayloadType, DeleteTaskPayloadType, EditTaskPayloadType } from './types';
import { Task } from '../../shared/types';


const initialState: Task[] = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<AddTaskPayloadType>) => {
      state.push(payload.task);
    },
    deleteTask: (state, { payload }: PayloadAction<DeleteTaskPayloadType>) => {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index >= 0) {
        state.splice(
          index, 1,
        );
      }
    },
    editTask: (state, { payload }: PayloadAction<EditTaskPayloadType>) => {
      const index = state.findIndex((task) => task.id === payload.task.id);
      if (index >= 0) {
        state[index] = payload.task;
      }
    },
  },
});

export const actions = tasksSlice.actions;
