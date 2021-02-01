import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../shared/types';
import { API } from '../../API';
import { actions } from './actions';

export const CategoriesThunk = {
  update: createAsyncThunk(
    'categories/update',
    async (arg, { dispatch }) => {
      const result = await API.Categories.update();
      if (result.ok) {
        dispatch(actions.set(result.data));
      }
    },
  ),
  add: createAsyncThunk(
    'categories/add',
    async (category: Category, { dispatch }) => {
      const request = await API.Categories.add(category);
      if (request.ok) {
        dispatch(actions.add({
          id: request.id as number,
          ...category,
        }));
      }
    },
  ),
  edit: createAsyncThunk(
    'categories/edit',
    async (category: Required<Category>, { dispatch }) => {
      const request = await API.Categories.edit(category);
      if (request.ok) {
        dispatch(actions.edit(category));
      }
    },
  ),
  delete: createAsyncThunk(
    'categories/drop',
    async (id: number, { dispatch }) => {
      const request = await API.Categories.delete(id);
      if (request.ok) {
        await dispatch(actions.delete(id));
      }
    },
  ),
};
