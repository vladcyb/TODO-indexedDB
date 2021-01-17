// TODO: enums
type CurrentStateType = 'tasks' | 'categories'

export type StateType = {
  state: CurrentStateType
}

export type SetStatePayloadType = {
  state: CurrentStateType
}
