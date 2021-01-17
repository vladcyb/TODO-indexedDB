import { Category } from '../../shared/types';
import { API } from '../../API';
import { actions } from '.';
import { AppThunk } from '../appSlice/thunk';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const CategoriesThunk = {
  add: createAsyncThunk(
    'categories/add',
    async (category: Category, { dispatch }) => {
      const request = await API.Categories.add(category);
      if (request.ok) {
        dispatch(actions.addCategory({
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
        dispatch(actions.editCategory(category));
      }
    },
  ),
  drop: createAsyncThunk(
    'categories/drop',
    async (id: number, { dispatch }) => {
      const request = await API.Categories.drop(id);
      if (request.ok) {
        dispatch(actions.deleteCategory(id));
        // TODO
        dispatch(AppThunk.update());
      }
    },
  ),
};
