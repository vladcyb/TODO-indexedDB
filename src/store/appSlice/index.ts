import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentList, SetStatePayloadType, StateType } from './types';

const initialState: StateType = {
  state: CurrentList.TASKS,
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
