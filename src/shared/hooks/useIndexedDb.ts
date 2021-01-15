import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { useSetters } from './useSetters';
import { AppThunk } from '../../store/appReducer/thunk';

declare global {
  interface Window {
    db: IDBDatabase
  }
}

export const useIndexedDb = () => {

  const dispatch = useAppDispatch();
  const [getters, setters] = useSetters();
  const thunk = AppThunk(setters);

  useEffect(() => {
    dispatch(thunk.initialize());
  }, []);
  return getters;
};
