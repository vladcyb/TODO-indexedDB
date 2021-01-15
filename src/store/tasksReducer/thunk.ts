import { AppDispatch } from '../index';
import { SettersType } from '../../shared/hooks/useSetters';
import { MyIDBResponse, Task } from '../../shared/types';
import { actions } from './index';
import { API } from '../../API';


export const TasksThunk = (setters: SettersType) => {

  const add = (task: Task) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Tasks.add(task) as MyIDBResponse;
    if (request.ok) {
      dispatch(actions.add({
        id: request.request.result,
        ...task,
      }));
    }
    setters.setIsLoading(false);
  };

  const edit = (task: Required<Task>) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Tasks.edit(task) as MyIDBResponse;
    if (request.ok) {
      dispatch(actions.edit(task));
    }
    setters.setIsLoading(false);
  };

  const drop = (id: number) => async (dispatch: AppDispatch) => {
    setters.setIsLoading(true);
    const request = await API.Tasks.drop(id) as MyIDBResponse;
    if (request.ok) {
      dispatch(actions.deleteTask(id));
    }
    setters.setIsLoading(false);
  };

  return {
    add,
    edit,
    drop,
  };
};
