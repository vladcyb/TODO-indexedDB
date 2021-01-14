import { AddTaskPayloadType } from './types';
import { AppDispatch } from '../index';
import { SettersType } from '../../shared/hooks/useSetters';
import { actions } from './index';


export const TasksThunk = (setters: SettersType) => {

  const addTask = (props: AddTaskPayloadType) => async (dispatch: AppDispatch) => {
    dispatch(actions.addTask(props))
  };

  return {
    addTask,
  };
};
