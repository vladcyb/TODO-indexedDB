import { Task } from '../../shared/types';

export type AddTaskPayloadType = {
  task: Task
}

export type DeleteTaskPayloadType = {
  id: string
}

export type EditTaskPayloadType = {
  task: Task
}
