import { Category, Task } from '../shared/types';

export type LoadDataStateType = {
  tasksLoaded: boolean
  categoriesLoaded: boolean
}

export type SimpleResponseType = {
  ok: boolean
}

export type LoadDataResponseType = {
  ok: true
  data: {
    categories: Category[]
    tasks: Task[]
  }
} | {
  ok: false
  error?: string
}

export type ResponseWithId = {
  ok: true
  id: IDBValidKey
} | {
  ok: false
}
