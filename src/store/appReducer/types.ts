export type CurrentStateType = 'tasks' | 'categories'

export type StateType = {
  state: CurrentStateType
  addingTask: boolean
  addingCategory: boolean
}

export type SetStatePayloadType = {
  state: CurrentStateType
}
