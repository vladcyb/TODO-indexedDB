export enum CurrentList {
  TASKS = 'TASKS',
  CATEGORIES = 'CATEGORIES',
}

export type StateType = {
  state: CurrentList
  loading: boolean
}

export type SetStatePayloadType = {
  state: CurrentList
}
