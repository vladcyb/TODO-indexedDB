import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetStatePayloadType, StateType } from './types';

const initialState: StateType = {
  state: 'tasks',
  addingTask: false,
  addingCategory: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setState: (state, { payload }: PayloadAction<SetStatePayloadType>) => {
      state.state = payload.state;
    },
  },
});

export const actions = appSlice.actions;
