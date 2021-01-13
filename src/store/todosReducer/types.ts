import { Todo } from '../../shared/types';

export type AddTodoPayloadType = {
  todo: Todo
}

export type DeleteTodoPayloadType = {
  id: string
}
