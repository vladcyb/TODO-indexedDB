import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { actions as tasksActions, tasksSlice } from './tasksSlice';
import { useDispatch } from 'react-redux';
import { actions as appActions, appSlice } from './appSlice';
import { actions as categoriesActions, categoriesSlice } from './categoriesSlice';

const store = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    tasks: tasksSlice.reducer,
    categories: categoriesSlice.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export const actions = {
  app: appActions,
  tasks: tasksActions,
  categories: categoriesActions,
};

export default store;
