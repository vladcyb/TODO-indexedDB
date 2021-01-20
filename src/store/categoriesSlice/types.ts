import { Category } from '../../shared/types';
import { LoadingStatusType } from '../../shared/constants';

export type StateType = {
  list: Category[]
  status: LoadingStatusType
}
