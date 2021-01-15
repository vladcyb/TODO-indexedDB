import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../shared/types';


const initialState: Task[] = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<Required<Task>>) => {
      state.push(payload);
    },
    deleteTask: (state, { payload }: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === payload);
      if (index >= 0) {
        state.splice(
          index, 1,
        );
      }
    },
    edit: (state, { payload }: PayloadAction<Required<Task>>) => {
      const index = state.findIndex((task) => task.id === payload.id);
      if (index >= 0) {
        state[index] = payload;
      }
    },
    setTasks: (state, { payload }: PayloadAction<Task[]>) => {
      return payload;
    },
  },
});

export const actions = tasksSlice.actions;
