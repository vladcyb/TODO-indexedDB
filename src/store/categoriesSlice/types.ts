import { Category } from '../../shared/types';
import { StatusType } from '../../shared/constants';

export type StateType = {
  list: Category[]
  status: StatusType
}
