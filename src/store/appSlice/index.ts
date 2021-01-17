import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetStatePayloadType, StateType } from './types';
import { AppThunk } from './thunk';

const initialState: StateType = {
  state: 'tasks',
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
    builder.addCase(AppThunk.update.pending, (state, actions) => {
      state.loading = true;
    });
    builder.addCase(AppThunk.update.fulfilled, (state, actions) => {
      state.loading = false;
    });
  },
});

export const actions = appSlice.actions;
