import { AppDispatch } from '../index';
import { SettersType } from '../../shared/hooks/useSetters';
import { MyIDBResponse, Task } from '../../shared/types';
import { actions } from './index';
import { API } from '../../API';


export const TasksThunk = (setters: SettersType) => {

  const addTask = (task: Task) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Tasks.add(task) as MyIDBResponse;
    if (request.ok) {
      dispatch(actions.addTask(task));
    }
    setters.setIsLoading(false);
  };

  const editTask = (task: Required<Task>) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Tasks.edit(task) as MyIDBResponse;
    if (request.ok) {
      dispatch(actions.editTask(task));
    }
    setters.setIsLoading(false);
  };

  return {
    addTask,
    editTask,
  };
};
