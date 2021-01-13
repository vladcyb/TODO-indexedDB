import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { actions as todosActions, todosSlice } from './todosReducer';
import { useDispatch } from 'react-redux';
import { actions as appActions, appSlice } from './appReducer';
import { actions as categoriesActions, categoriesSlice } from './categoriesSlice';


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

export const actions = {
  app: appActions,
  todos: todosActions,
  categories: categoriesActions,
};

export default store;
