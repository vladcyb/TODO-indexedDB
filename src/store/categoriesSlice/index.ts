import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../shared/types';
import { CategoriesThunk } from './thunk';
import { StateType } from './types';
import { LoadingStatusType } from '../../shared/constants';


const initialState: StateType = {
  status: LoadingStatusType.LOADING,
  list: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, { payload }: PayloadAction<Required<Category>>) => {
      state.list.push(payload);
    },
    deleteCategory: (state, { payload }: PayloadAction<number>) => {
      const index = state.list.findIndex((item) => item.id === payload);
      if (index >= 0) {
        state.list.splice(index, 1);
      }
    },
    editCategory: (state, { payload }: PayloadAction<Required<Category>>) => {
      const index = state.list.findIndex((item) => item.id === payload.id);
      if (index >= 0) {
        state.list[index] = payload;
      }
    },
    setCategories: (state, { payload }: PayloadAction<Category[]>) => {
      state.list = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CategoriesThunk.update.pending, (state) => {
        state.status = LoadingStatusType.LOADING;
      })
      .addCase(CategoriesThunk.update.fulfilled, (state) => {
        state.status = LoadingStatusType.IDLE;
      })
      .addCase(CategoriesThunk.add.pending, (state) => {
        state.status = LoadingStatusType.LOADING;
      })
      .addCase(CategoriesThunk.add.fulfilled, (state) => {
        state.status = LoadingStatusType.IDLE;
      })
      .addCase(CategoriesThunk.edit.pending, (state) => {
        state.status = LoadingStatusType.LOADING;
      })
      .addCase(CategoriesThunk.edit.fulfilled, (state) => {
        state.status = LoadingStatusType.IDLE;
      })
      .addCase(CategoriesThunk.delete.pending, (state) => {
        state.status = LoadingStatusType.LOADING;
      })
      .addCase(CategoriesThunk.delete.fulfilled, (state) => {
        state.status = LoadingStatusType.IDLE;
      });
  },
});

export const actions = categoriesSlice.actions;
