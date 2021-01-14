import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddTaskPayloadType, DeleteTaskPayloadType } from './types';
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
  },
});

export const actions = tasksSlice.actions;
