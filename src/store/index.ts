import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from './todosReducer';
import { useDispatch } from 'react-redux';
import { appSlice } from './appReducer';
import { categoriesSlice } from './categoriesSlice';

const store = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    todos: todosSlice.reducer,
    categories: categoriesSlice.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
