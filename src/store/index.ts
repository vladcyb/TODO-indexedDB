import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { categoriesSlice } from './categoriesSlice';
import { tasksSlice } from './tasksSlice';

const store = configureStore({
  reducer: combineReducers({
    tasks: tasksSlice.reducer,
    categories: categoriesSlice.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export const actions = {
  tasks: tasksSlice.actions,
  categories: categoriesSlice.actions,
};

export default store;
