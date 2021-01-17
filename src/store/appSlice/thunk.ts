import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../API';
import { actions } from '../index';


export const AppThunk = {
  update: createAsyncThunk('app/loadData', async (arg, { dispatch }) => {
    try {
      const response = await API.App.loadData();
      if (response.ok) {
        dispatch(actions.tasks.setTasks(response.data.tasks));
        dispatch(actions.categories.setCategories(response.data.categories));
      }
    } catch (e) {
      console.error(e);
    }
  }),
};
