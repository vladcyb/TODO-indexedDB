import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../API';


export const AppThunk = {
  initialize: createAsyncThunk(
    'app/initialize',
    async () => {
      try {
        await API.App.initialize();
      } catch (e) {
        console.error(e);
      }
    },
  ),
};
