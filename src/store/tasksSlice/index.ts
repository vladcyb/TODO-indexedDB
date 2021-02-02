import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../shared/types';
import { TasksThunk } from './thunk';
import { StateType } from './types';
import { LoadingStatusType } from '../../shared/constants';

const initialState: StateType = {
  status: LoadingStatusType.LOADING,
  list: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<Required<Task>>) => {
      state.list.push(payload);
    },
    delete: (state, { payload }: PayloadAction<number>) => {
      const index = state.list.findIndex((item) => item.id === payload);
      if (index >= 0) {
        state.list.splice(index, 1);
      }
    },
    edit: (state, { payload }: PayloadAction<Required<Task>>) => {
      const index = state.list.findIndex((task) => task.id === payload.id);
      if (index >= 0) {
        state.list[index] = payload;
      }
    },
    set: (state, { payload }: PayloadAction<Task[]>) => {
      state.list = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TasksThunk.update.pending, (state) => {
        state.status = LoadingStatusType.LOADING;
      })
      .addCase(TasksThunk.update.fulfilled, (state) => {
        state.status = LoadingStatusType.IDLE;
      })
      .addCase(TasksThunk.add.pending, (state) => {
        state.status = LoadingStatusType.LOADING;
      })
      .addCase(TasksThunk.add.fulfilled, (state) => {
        state.status = LoadingStatusType.IDLE;
      })
      .addCase(TasksThunk.delete.pending, (state) => {
        state.status = LoadingStatusType.LOADING;
      })
      .addCase(TasksThunk.delete.fulfilled, (state) => {
        state.status = LoadingStatusType.IDLE;
      })
      .addCase(TasksThunk.edit.pending, (state) => {
        state.status = LoadingStatusType.LOADING;
      })
      .addCase(TasksThunk.edit.fulfilled, (state) => {
        state.status = LoadingStatusType.IDLE;
      });
  },
});

export const { actions } = tasksSlice;
