import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../shared/types';
import { AddCategoryActionPayload, DeleteCategoryActionPayload } from './types';


const initialState: Category[] = [];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, { payload }: PayloadAction<AddCategoryActionPayload>) => {
      state.push(payload.category);
    },
    deleteCategory: (state, { payload }: PayloadAction<DeleteCategoryActionPayload>) => {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index >= 0) {
        state.splice(
          index, 1,
        );
      }
    },
  },
});

export const actions = categoriesSlice.actions;
