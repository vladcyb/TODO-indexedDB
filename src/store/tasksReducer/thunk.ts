import { AppDispatch } from '../index';
import { SettersType } from '../../shared/hooks/useSetters';
import { Task } from '../../shared/types';
import { actions } from './index';
import { API } from '../../API';

declare global {
  interface Window {
    db: IDBDatabase
  }
}


export const TasksThunk = (setters: SettersType) => {

  const addTask = (task: Task) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = API.Tasks.add(task);
    request.onsuccess = () => {
      dispatch(actions.addTask(task));
      setters.setIsLoading(false);
    };

    request.onerror = () => {
      console.log(request.result);
      setters.setIsLoading(false);
    };
  };

  return {
    addTask,
  };
};
