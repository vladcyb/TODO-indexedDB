// TODO: enums
type CurrentStateType = 'tasks' | 'categories'

export type StateType = {
  state: CurrentStateType
  loading: boolean
}

export type SetStatePayloadType = {
  state: CurrentStateType
}
