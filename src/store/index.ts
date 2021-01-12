import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from './todosReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: combineReducers({
    todos: todosSlice.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
