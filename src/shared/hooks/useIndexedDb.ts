import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { useSetters } from './useSetters';
import { AppThunk } from '../../store/appSlice/thunk';

declare global {
  interface Window {
    db: IDBDatabase
  }
}

export const useIndexedDb = () => {

  const dispatch = useAppDispatch();
  const [getters, setters] = useSetters(true);
  const thunk = AppThunk(setters);

  useEffect(() => {
    setTimeout(() => {
      dispatch(thunk.update());
    }, 4000);
    // eslint-disable-next-line
  }, []);
  return getters;
};
