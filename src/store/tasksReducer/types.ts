import { Task } from '../../shared/types';

export type AddTaskPayloadType = {
  task: Task
}

export type DeleteTaskPayloadType = {
  id: string
}
