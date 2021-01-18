export enum CurrentList {
  TASKS = 'TASKS',
  CATEGORIES = 'CATEGORIES',
}

export type StateType = {
  state: CurrentList
}

export type SetStatePayloadType = {
  state: CurrentList
}
