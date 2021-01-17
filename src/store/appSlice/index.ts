import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentList, SetStatePayloadType, StateType } from './types';
import { AppThunk } from './thunk';

const initialState: StateType = {
  state: CurrentList.tasks,
  loading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setState: (state, { payload }: PayloadAction<SetStatePayloadType>) => {
      state.state = payload.state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AppThunk.update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AppThunk.update.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const actions = appSlice.actions;
