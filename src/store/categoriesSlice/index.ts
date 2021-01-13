import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../shared/types';
import { AddCategoryActionPayload } from './types';


const initialState: Category[] = [];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, { payload }: PayloadAction<AddCategoryActionPayload>) => {
      state.push(payload.category);
    },
  },
});

export const actions = categoriesSlice.actions;
