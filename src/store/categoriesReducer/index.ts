import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../shared/types';
import { AddCategoryActionPayload, DeleteCategoryActionPayload, EditCategoryActionPayload } from './types';


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
    editCategory: (state, { payload }: PayloadAction<EditCategoryActionPayload>) => {
      const index = state.findIndex((item) => item.id === payload.category.id);
      if (index >= 0) {
        state[index] = payload.category;
      }
    },
  },
});

export const actions = categoriesSlice.actions;
