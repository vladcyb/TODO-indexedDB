export enum CurrentList {
  tasks = 'tasks',
  categories = 'categories',
}

export type StateType = {
  state: CurrentList
  loading: boolean
}

export type SetStatePayloadType = {
  state: CurrentList
}
