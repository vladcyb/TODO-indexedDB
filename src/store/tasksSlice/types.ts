import { Task } from '../../shared/types';
import { StatusType } from '../../shared/constants';

export type StateType = {
  list: Task[]
  status: StatusType
}
