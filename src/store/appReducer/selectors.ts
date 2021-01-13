import { RootState } from '../index';

export const getAppState = (state: RootState) => state.app.state
export const getAddingTaskState = (state: RootState) => state.app.addingTask
export const getAddingCategoryState = (state: RootState) => state.app.addingCategory
