import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../shared/types';


const initialState: Category[] = [];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, { payload }: PayloadAction<Category>) => {
      state.push(payload);
    },
    deleteCategory: (state, { payload }: PayloadAction<string>) => {
      const index = state.findIndex((item) => item.id === payload);
      if (index >= 0) {
        state.splice(
          index, 1,
        );
      }
    },
    editCategory: (state, { payload }: PayloadAction<Category>) => {
      const index = state.findIndex((item) => item.id === payload.id);
      if (index >= 0) {
        state[index] = payload;
      }
    },
  },
});

export const actions = categoriesSlice.actions;
