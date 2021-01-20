import { Task } from '../../shared/types';
import { LoadingStatusType } from '../../shared/constants';

export type StateType = {
  list: Task[]
  status: LoadingStatusType
}
