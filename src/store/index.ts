import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from './todosReducer';
import { useDispatch } from 'react-redux';
import { appSlice } from './appReducer';

const store = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    todos: todosSlice.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

export default store;
