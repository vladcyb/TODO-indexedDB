import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { useSetters } from './useSetters';
import { CategoriesThunk } from '../../store/categoriesReducer/thunk';

declare global {
  interface Window {
    db: IDBDatabase
  }
}

export const useIndexedDb = () => {

  const dispatch = useAppDispatch();
  const [, setters] = useSetters();
  const thunk = CategoriesThunk(setters);

  useEffect(() => {
    dispatch(thunk.initialize());
  }, []);
};
