import { Category, Task } from '../shared/types';

export type LoadDataStateType = {
  tasksLoaded: boolean
  categoriesLoaded: boolean
}

export type SimpleResponseType = {
  ok: boolean
}

export type InitializeResponseType = {
  ok: true
} | {
  ok: false
  error: string
}

export type ResponseWithId = {
  ok: true
  id: IDBValidKey
} | {
  ok: false
  error: string
}

export type UpdateCategoriesResponseType = {
  ok: true
  data: Category[]
} | {
  ok: false
  error: Event
}

export type UpdateTasksResponseType = {
  ok: true
  data: Task[]
} | {
  ok: false
  error: Event
}
